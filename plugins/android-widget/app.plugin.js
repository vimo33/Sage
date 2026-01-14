/**
 * Expo Config Plugin for Android Daily Wisdom Widget
 *
 * This plugin generates the necessary Android native files for a home screen widget
 * that displays daily wisdom quotes with Material Design styling.
 */

const {
  withAndroidManifest,
  withDangerousMod,
  withMainApplication,
  withPlugins,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const WIDGET_PROVIDER_CLASS = 'DailyWisdomWidgetProvider';
const WIDGET_SERVICE_CLASS = 'DailyWisdomWidgetService';

/**
 * Get the package name from the manifest
 */
function getPackageName(config) {
  return config.android?.package || 'com.sage.wisdom';
}

/**
 * Add widget receiver and service to AndroidManifest.xml
 */
function withWidgetManifest(config) {
  return withAndroidManifest(config, async (config) => {
    const manifest = config.modResults;
    const packageName = getPackageName(config);

    // Find or create application element
    const application = manifest.manifest.application?.[0];
    if (!application) {
      throw new Error('Could not find application element in AndroidManifest.xml');
    }

    // Add widget receiver
    if (!application.receiver) {
      application.receiver = [];
    }

    // Check if receiver already exists
    const receiverExists = application.receiver.some(
      (r) => r.$?.['android:name'] === `.${WIDGET_PROVIDER_CLASS}`
    );

    if (!receiverExists) {
      application.receiver.push({
        $: {
          'android:name': `.${WIDGET_PROVIDER_CLASS}`,
          'android:exported': 'true',
          'android:label': 'Daily Wisdom',
        },
        'intent-filter': [
          {
            action: [
              {
                $: {
                  'android:name': 'android.appwidget.action.APPWIDGET_UPDATE',
                },
              },
            ],
          },
        ],
        'meta-data': [
          {
            $: {
              'android:name': 'android.appwidget.provider',
              'android:resource': '@xml/daily_wisdom_widget_info',
            },
          },
        ],
      });
    }

    // Add widget service
    if (!application.service) {
      application.service = [];
    }

    const serviceExists = application.service.some(
      (s) => s.$?.['android:name'] === `.${WIDGET_SERVICE_CLASS}`
    );

    if (!serviceExists) {
      application.service.push({
        $: {
          'android:name': `.${WIDGET_SERVICE_CLASS}`,
          'android:exported': 'false',
          'android:permission': 'android.permission.BIND_JOB_SERVICE',
        },
      });
    }

    return config;
  });
}

/**
 * Generate Android widget source files
 */
function withWidgetSourceFiles(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const platformRoot = config.modRequest.platformProjectRoot;
      const packageName = getPackageName(config);
      const packagePath = packageName.replace(/\./g, '/');

      // Paths
      const mainPath = path.join(platformRoot, 'app/src/main');
      const javaPath = path.join(mainPath, `java/${packagePath}`);
      const resPath = path.join(mainPath, 'res');
      const xmlPath = path.join(resPath, 'xml');
      const layoutPath = path.join(resPath, 'layout');
      const drawablePath = path.join(resPath, 'drawable');
      const valuesPath = path.join(resPath, 'values');

      // Ensure directories exist
      [javaPath, xmlPath, layoutPath, drawablePath, valuesPath].forEach((dir) => {
        fs.mkdirSync(dir, { recursive: true });
      });

      // Generate widget provider class
      const widgetProviderCode = generateWidgetProviderCode(packageName);
      fs.writeFileSync(
        path.join(javaPath, `${WIDGET_PROVIDER_CLASS}.kt`),
        widgetProviderCode
      );

      // Generate widget service class
      const widgetServiceCode = generateWidgetServiceCode(packageName);
      fs.writeFileSync(
        path.join(javaPath, `${WIDGET_SERVICE_CLASS}.kt`),
        widgetServiceCode
      );

      // Generate widget data manager
      const widgetDataManagerCode = generateWidgetDataManagerCode(packageName);
      fs.writeFileSync(
        path.join(javaPath, 'WidgetDataManager.kt'),
        widgetDataManagerCode
      );

      // Generate widget info XML
      const widgetInfoXml = generateWidgetInfoXml();
      fs.writeFileSync(
        path.join(xmlPath, 'daily_wisdom_widget_info.xml'),
        widgetInfoXml
      );

      // Generate widget layout XML
      const widgetLayoutXml = generateWidgetLayoutXml();
      fs.writeFileSync(
        path.join(layoutPath, 'widget_daily_wisdom.xml'),
        widgetLayoutXml
      );

      // Generate widget background drawable
      const widgetBackgroundXml = generateWidgetBackgroundDrawable();
      fs.writeFileSync(
        path.join(drawablePath, 'widget_background.xml'),
        widgetBackgroundXml
      );

      // Generate widget button background
      const widgetButtonBgXml = generateWidgetButtonBackground();
      fs.writeFileSync(
        path.join(drawablePath, 'widget_button_background.xml'),
        widgetButtonBgXml
      );

      // Add/update widget colors
      const widgetColorsXml = generateWidgetColorsXml();
      fs.writeFileSync(
        path.join(valuesPath, 'widget_colors.xml'),
        widgetColorsXml
      );

      // Add widget dimens
      const widgetDimensXml = generateWidgetDimensXml();
      fs.writeFileSync(
        path.join(valuesPath, 'widget_dimens.xml'),
        widgetDimensXml
      );

      return config;
    },
  ]);
}

/**
 * Generate the widget provider Kotlin code
 */
function generateWidgetProviderCode(packageName) {
  return `package ${packageName}

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.RemoteViews
import android.os.Build

/**
 * Daily Wisdom Widget Provider
 * Displays wisdom quotes with Material Design styling and deep links to app
 */
class ${WIDGET_PROVIDER_CLASS} : AppWidgetProvider() {

    companion object {
        const val ACTION_REFRESH = "${packageName}.WIDGET_REFRESH"
        const val ACTION_OPEN_APP = "${packageName}.WIDGET_OPEN_APP"

        /**
         * Trigger widget update from React Native
         */
        fun updateWidget(context: Context) {
            val intent = Intent(context, ${WIDGET_PROVIDER_CLASS}::class.java).apply {
                action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
            }
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, ${WIDGET_PROVIDER_CLASS}::class.java)
            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds)
            context.sendBroadcast(intent)
        }
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)

        when (intent.action) {
            ACTION_REFRESH -> {
                // Refresh wisdom content
                WidgetDataManager.refreshDailyWisdom(context)

                // Update all widgets
                val appWidgetManager = AppWidgetManager.getInstance(context)
                val componentName = ComponentName(context, ${WIDGET_PROVIDER_CLASS}::class.java)
                val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)
                onUpdate(context, appWidgetManager, appWidgetIds)
            }
            ACTION_OPEN_APP -> {
                // Deep link to app
                openApp(context)
            }
        }
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        // First widget added - initialize data
        WidgetDataManager.initializeIfNeeded(context)
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        // Last widget removed - cleanup if needed
    }

    private fun updateAppWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int
    ) {
        val views = RemoteViews(context.packageName, R.layout.widget_daily_wisdom)

        // Get current wisdom data
        val wisdomData = WidgetDataManager.getDailyWisdom(context)

        // Update text views
        views.setTextViewText(R.id.widget_wisdom_content, wisdomData.content)
        views.setTextViewText(R.id.widget_wisdom_source, wisdomData.source)

        // Set up click handlers

        // Main content opens app with deep link
        val openAppIntent = Intent(context, ${WIDGET_PROVIDER_CLASS}::class.java).apply {
            action = ACTION_OPEN_APP
        }
        val openAppPendingIntent = PendingIntent.getBroadcast(
            context,
            0,
            openAppIntent,
            getPendingIntentFlags()
        )
        views.setOnClickPendingIntent(R.id.widget_content_container, openAppPendingIntent)

        // Refresh button
        val refreshIntent = Intent(context, ${WIDGET_PROVIDER_CLASS}::class.java).apply {
            action = ACTION_REFRESH
        }
        val refreshPendingIntent = PendingIntent.getBroadcast(
            context,
            1,
            refreshIntent,
            getPendingIntentFlags()
        )
        views.setOnClickPendingIntent(R.id.widget_refresh_button, refreshPendingIntent)

        // Update widget
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }

    private fun openApp(context: Context) {
        // Create deep link intent
        val deepLinkUri = Uri.parse("sage://explore")
        val intent = Intent(Intent.ACTION_VIEW, deepLinkUri).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            setPackage(context.packageName)
        }

        // Fallback to main activity if deep link fails
        try {
            context.startActivity(intent)
        } catch (e: Exception) {
            val launchIntent = context.packageManager.getLaunchIntentForPackage(context.packageName)
            launchIntent?.let {
                it.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                context.startActivity(it)
            }
        }
    }

    private fun getPendingIntentFlags(): Int {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
        } else {
            PendingIntent.FLAG_UPDATE_CURRENT
        }
    }
}
`;
}

/**
 * Generate the widget service Kotlin code
 */
function generateWidgetServiceCode(packageName) {
  return `package ${packageName}

import android.app.job.JobParameters
import android.app.job.JobService
import android.appwidget.AppWidgetManager
import android.content.ComponentName

/**
 * Background service for updating widget at midnight
 */
class ${WIDGET_SERVICE_CLASS} : JobService() {

    companion object {
        const val JOB_ID = 1001
    }

    override fun onStartJob(params: JobParameters?): Boolean {
        // Refresh wisdom data
        WidgetDataManager.refreshDailyWisdom(applicationContext)

        // Update all widgets
        val appWidgetManager = AppWidgetManager.getInstance(applicationContext)
        val componentName = ComponentName(applicationContext, ${WIDGET_PROVIDER_CLASS}::class.java)
        val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)

        if (appWidgetIds.isNotEmpty()) {
            val provider = ${WIDGET_PROVIDER_CLASS}()
            provider.onUpdate(applicationContext, appWidgetManager, appWidgetIds)
        }

        // Job is complete
        return false
    }

    override fun onStopJob(params: JobParameters?): Boolean {
        // Return true to reschedule if interrupted
        return true
    }
}
`;
}

/**
 * Generate the widget data manager Kotlin code
 */
function generateWidgetDataManagerCode(packageName) {
  return `package ${packageName}

import android.content.Context
import android.content.SharedPreferences
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*

/**
 * Manages widget data storage and synchronization with React Native
 */
object WidgetDataManager {

    private const val PREFS_NAME = "SageWidgetPrefs"
    private const val KEY_WISDOM_CONTENT = "wisdom_content"
    private const val KEY_WISDOM_SOURCE = "wisdom_source"
    private const val KEY_WISDOM_BOOK = "wisdom_book"
    private const val KEY_LAST_UPDATE = "last_update"
    private const val KEY_WISDOM_ID = "wisdom_id"

    data class WisdomData(
        val content: String,
        val source: String,
        val book: String = "",
        val id: String = ""
    )

    private val defaultWisdoms = listOf(
        WisdomData(
            content = "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction.",
            source = "Bhagavad Gita 2.47",
            book = "Bhagavad Gita"
        ),
        WisdomData(
            content = "The mind is everything. What you think you become.",
            source = "Dhammapada",
            book = "Dhammapada"
        ),
        WisdomData(
            content = "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
            source = "Bhagavad Gita 6.19",
            book = "Bhagavad Gita"
        ),
        WisdomData(
            content = "Peace comes from within. Do not seek it without.",
            source = "Buddha",
            book = "Buddhist Teachings"
        ),
        WisdomData(
            content = "The Self is not born, nor does it die. It has not come from anywhere, and it has not become anything.",
            source = "Katha Upanishad",
            book = "Upanishads"
        )
    )

    private fun getPrefs(context: Context): SharedPreferences {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }

    fun initializeIfNeeded(context: Context) {
        val prefs = getPrefs(context)
        if (!prefs.contains(KEY_WISDOM_CONTENT)) {
            refreshDailyWisdom(context)
        }
    }

    fun getDailyWisdom(context: Context): WisdomData {
        val prefs = getPrefs(context)
        val content = prefs.getString(KEY_WISDOM_CONTENT, null)
        val source = prefs.getString(KEY_WISDOM_SOURCE, null)

        if (content == null || source == null) {
            // Return a default wisdom
            val defaultWisdom = defaultWisdoms[0]
            return defaultWisdom
        }

        return WisdomData(
            content = content,
            source = source,
            book = prefs.getString(KEY_WISDOM_BOOK, "") ?: "",
            id = prefs.getString(KEY_WISDOM_ID, "") ?: ""
        )
    }

    fun refreshDailyWisdom(context: Context) {
        val prefs = getPrefs(context)

        // Get a random default wisdom for now
        // This will be updated from React Native with actual DB content
        val wisdom = defaultWisdoms.random()

        prefs.edit().apply {
            putString(KEY_WISDOM_CONTENT, wisdom.content)
            putString(KEY_WISDOM_SOURCE, wisdom.source)
            putString(KEY_WISDOM_BOOK, wisdom.book)
            putString(KEY_LAST_UPDATE, getCurrentDateString())
            apply()
        }
    }

    /**
     * Update widget data from React Native
     */
    fun updateFromReactNative(context: Context, jsonData: String) {
        try {
            val json = JSONObject(jsonData)
            val prefs = getPrefs(context)

            prefs.edit().apply {
                putString(KEY_WISDOM_CONTENT, json.optString("content", ""))
                putString(KEY_WISDOM_SOURCE, json.optString("sourceRef", ""))
                putString(KEY_WISDOM_BOOK, json.optString("book", ""))
                putString(KEY_WISDOM_ID, json.optString("id", ""))
                putString(KEY_LAST_UPDATE, getCurrentDateString())
                apply()
            }

            // Trigger widget update
            ${WIDGET_PROVIDER_CLASS}.updateWidget(context)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun getCurrentDateString(): String {
        val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.US)
        return dateFormat.format(Date())
    }

    fun shouldRefresh(context: Context): Boolean {
        val prefs = getPrefs(context)
        val lastUpdate = prefs.getString(KEY_LAST_UPDATE, null) ?: return true
        val currentDate = getCurrentDateString()
        return lastUpdate != currentDate
    }
}
`;
}

/**
 * Generate widget info XML
 */
function generateWidgetInfoXml() {
  return `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="250dp"
    android:minHeight="110dp"
    android:targetCellWidth="4"
    android:targetCellHeight="2"
    android:minResizeWidth="180dp"
    android:minResizeHeight="80dp"
    android:maxResizeWidth="530dp"
    android:maxResizeHeight="400dp"
    android:updatePeriodMillis="86400000"
    android:initialLayout="@layout/widget_daily_wisdom"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen"
    android:previewLayout="@layout/widget_daily_wisdom"
    android:description="@string/app_name" />
`;
}

/**
 * Generate widget layout XML with Material Design
 */
function generateWidgetLayoutXml() {
  return `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/widget_container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/widget_background"
    android:orientation="vertical"
    android:padding="@dimen/widget_padding">

    <!-- Header with badge and refresh button -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_vertical"
        android:orientation="horizontal">

        <!-- Daily Wisdom Badge -->
        <TextView
            android:id="@+id/widget_badge"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="@drawable/widget_button_background"
            android:paddingStart="@dimen/widget_badge_padding_horizontal"
            android:paddingTop="@dimen/widget_badge_padding_vertical"
            android:paddingEnd="@dimen/widget_badge_padding_horizontal"
            android:paddingBottom="@dimen/widget_badge_padding_vertical"
            android:text="DAILY WISDOM"
            android:textColor="@color/widget_primary"
            android:textSize="10sp"
            android:textStyle="bold"
            android:letterSpacing="0.05" />

        <View
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_weight="1" />

        <!-- Refresh Button -->
        <ImageButton
            android:id="@+id/widget_refresh_button"
            android:layout_width="32dp"
            android:layout_height="32dp"
            android:background="?android:attr/selectableItemBackgroundBorderless"
            android:contentDescription="Refresh wisdom"
            android:src="@android:drawable/ic_popup_sync"
            android:tint="@color/widget_text_secondary" />
    </LinearLayout>

    <!-- Content Container (clickable for deep link) -->
    <LinearLayout
        android:id="@+id/widget_content_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:gravity="center_vertical"
        android:orientation="vertical"
        android:paddingTop="@dimen/widget_content_padding_top"
        android:paddingBottom="@dimen/widget_content_padding_bottom">

        <!-- Wisdom Quote -->
        <TextView
            android:id="@+id/widget_wisdom_content"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:ellipsize="end"
            android:fontFamily="serif"
            android:lineSpacingMultiplier="1.3"
            android:maxLines="4"
            android:text="Loading wisdom..."
            android:textColor="@color/widget_text_primary"
            android:textSize="@dimen/widget_content_text_size"
            tools:text="You have the right to work, but never to the fruit of work." />

        <!-- Source Reference -->
        <TextView
            android:id="@+id/widget_wisdom_source"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="@dimen/widget_source_margin_top"
            android:text="— Source"
            android:textColor="@color/widget_primary"
            android:textSize="@dimen/widget_source_text_size"
            android:textStyle="italic"
            tools:text="— Bhagavad Gita 2.47" />
    </LinearLayout>

    <!-- Tap hint -->
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:text="Tap to open Sage"
        android:textColor="@color/widget_text_muted"
        android:textSize="10sp" />

</LinearLayout>
`;
}

/**
 * Generate widget background drawable with Material Design styling
 */
function generateWidgetBackgroundDrawable() {
  return `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <!-- Dark forest background matching app theme -->
    <solid android:color="@color/widget_background" />
    <!-- Rounded corners for Material Design -->
    <corners android:radius="@dimen/widget_corner_radius" />
    <!-- Subtle border -->
    <stroke
        android:width="1dp"
        android:color="@color/widget_border" />
</shape>
`;
}

/**
 * Generate widget button background drawable
 */
function generateWidgetButtonBackground() {
  return `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <solid android:color="@color/widget_primary_light" />
    <corners android:radius="4dp" />
</shape>
`;
}

/**
 * Generate widget colors XML
 */
function generateWidgetColorsXml() {
  return `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- Widget colors matching Sage app theme -->
    <color name="widget_background">#132210</color>
    <color name="widget_surface">#1d271c</color>
    <color name="widget_primary">#37ec13</color>
    <color name="widget_primary_light">#1A37ec13</color>
    <color name="widget_text_primary">#FFFFFF</color>
    <color name="widget_text_secondary">#A3A3A3</color>
    <color name="widget_text_muted">#737373</color>
    <color name="widget_border">#2a3829</color>
</resources>
`;
}

/**
 * Generate widget dimensions XML
 */
function generateWidgetDimensXml() {
  return `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <dimen name="widget_padding">16dp</dimen>
    <dimen name="widget_corner_radius">16dp</dimen>
    <dimen name="widget_badge_padding_horizontal">8dp</dimen>
    <dimen name="widget_badge_padding_vertical">4dp</dimen>
    <dimen name="widget_content_padding_top">8dp</dimen>
    <dimen name="widget_content_padding_bottom">8dp</dimen>
    <dimen name="widget_content_text_size">15sp</dimen>
    <dimen name="widget_source_text_size">12sp</dimen>
    <dimen name="widget_source_margin_top">8dp</dimen>
</resources>
`;
}

/**
 * Generate React Native Module Kotlin code
 */
function generateWidgetModuleCode(packageName) {
  return `package ${packageName}

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

/**
 * React Native Module for Widget communication
 * Allows JS to update widget data and trigger refreshes
 */
class WidgetModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "SageWidgetModule"

    /**
     * Update widget with new wisdom data from JS
     */
    @ReactMethod
    fun updateWidget(data: ReadableMap, promise: Promise) {
        try {
            val jsonData = StringBuilder()
            jsonData.append("{")

            data.getString("content")?.let { jsonData.append("\\"content\\":\\"").append(escapeJson(it)).append("\\",") }
            data.getString("sourceRef")?.let { jsonData.append("\\"sourceRef\\":\\"").append(escapeJson(it)).append("\\",") }
            data.getString("book")?.let { jsonData.append("\\"book\\":\\"").append(escapeJson(it)).append("\\",") }
            data.getString("id")?.let { jsonData.append("\\"id\\":\\"").append(escapeJson(it)).append("\\"") }

            // Remove trailing comma if present
            var json = jsonData.toString()
            if (json.endsWith(",")) {
                json = json.dropLast(1)
            }
            json += "}"

            WidgetDataManager.updateFromReactNative(reactApplicationContext, json)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("WIDGET_UPDATE_ERROR", e.message, e)
        }
    }

    /**
     * Force refresh all widgets
     */
    @ReactMethod
    fun refreshWidgets(promise: Promise) {
        try {
            ${WIDGET_PROVIDER_CLASS}.updateWidget(reactApplicationContext)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("WIDGET_REFRESH_ERROR", e.message, e)
        }
    }

    /**
     * Check if widget should be refreshed (daily check)
     */
    @ReactMethod
    fun shouldRefresh(promise: Promise) {
        try {
            val shouldRefresh = WidgetDataManager.shouldRefresh(reactApplicationContext)
            promise.resolve(shouldRefresh)
        } catch (e: Exception) {
            promise.reject("WIDGET_CHECK_ERROR", e.message, e)
        }
    }

    private fun escapeJson(text: String): String {
        return text
            .replace("\\\\", "\\\\\\\\")
            .replace("\\"", "\\\\\\"")
            .replace("\\n", "\\\\n")
            .replace("\\r", "\\\\r")
            .replace("\\t", "\\\\t")
    }
}
`;
}

/**
 * Generate React Native Package Kotlin code
 */
function generateWidgetPackageCode(packageName) {
  return `package ${packageName}

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * React Native Package for Widget Module
 */
class WidgetPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(WidgetModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
`;
}

/**
 * Add widget module registration to MainApplication
 */
function withWidgetModuleRegistration(config) {
  return withMainApplication(config, async (config) => {
    const packageName = getPackageName(config);

    // Add import for WidgetPackage
    if (!config.modResults.contents.includes('import ' + packageName + '.WidgetPackage')) {
      config.modResults.contents = config.modResults.contents.replace(
        /^(package .+\n)/m,
        `$1\nimport ${packageName}.WidgetPackage\n`
      );
    }

    // Add WidgetPackage to getPackages()
    // Look for the packages list and add WidgetPackage
    if (!config.modResults.contents.includes('WidgetPackage()')) {
      // Find the getPackages override and add our package
      config.modResults.contents = config.modResults.contents.replace(
        /(override fun getPackages\(\): List<ReactPackage> \{[\s\S]*?packages\.apply \{)/,
        '$1\n                add(WidgetPackage())'
      );

      // Alternative pattern for different MainApplication structures
      if (!config.modResults.contents.includes('WidgetPackage()')) {
        config.modResults.contents = config.modResults.contents.replace(
          /(PackageList\(this\)\.packages\.apply \{)/,
          '$1\n                add(WidgetPackage())'
        );
      }
    }

    return config;
  });
}

/**
 * Add module source files generation
 */
function withWidgetModuleFiles(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const platformRoot = config.modRequest.platformProjectRoot;
      const packageName = getPackageName(config);
      const packagePath = packageName.replace(/\./g, '/');

      const javaPath = path.join(platformRoot, 'app/src/main', `java/${packagePath}`);
      fs.mkdirSync(javaPath, { recursive: true });

      // Generate React Native Module
      const moduleCode = generateWidgetModuleCode(packageName);
      fs.writeFileSync(
        path.join(javaPath, 'WidgetModule.kt'),
        moduleCode
      );

      // Generate Package class
      const packageCode = generateWidgetPackageCode(packageName);
      fs.writeFileSync(
        path.join(javaPath, 'WidgetPackage.kt'),
        packageCode
      );

      return config;
    },
  ]);
}

/**
 * Main plugin function
 */
function withAndroidWidget(config) {
  return withPlugins(config, [
    withWidgetManifest,
    withWidgetSourceFiles,
    withWidgetModuleFiles,
    withWidgetModuleRegistration,
  ]);
}

module.exports = withAndroidWidget;

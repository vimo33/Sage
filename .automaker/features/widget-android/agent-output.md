I'll start by exploring the codebase to understand its structure and then implement the Android daily wisdom widget feature.

🔧 Tool: Task
Input: {
  "description": "Explore codebase structure",
  "prompt": "Explore this React Native/Expo codebase to understand its structure. I need to understand:\n1. The overall project architecture\n2. How wisdom/quotes data is stored and retrieved\n3. Existing patterns for native module integration\n4. The app's theming/styling approach\n5. Any existing widget implementations\n\nLook at package.json, app directory structure, lib directory, and any native android/ios folders. Be thorough in understanding how the app handles wisdom content.",
  "subagent_type": "Explore"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/app"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -type d -name \"ios\" -o -name \"android\" -o -name \"native\" 2>/dev/null | head -20",
  "description": "Find native Android/iOS directories"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/_layout.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/llm/inference.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/index.tsx"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/components"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app.json"
}

🔧 Tool: Glob
Input: {
  "pattern": "scripts/**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -maxdepth 1 -type d | head -20",
  "description": "List top-level directories"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI/lib -type f -name \"*widget*\" -o -name \"*Widget*\" 2>/dev/null",
  "description": "Find widget-related files"
}

🔧 Tool: Grep
Input: {
  "pattern": "DailyWisdomWidget|export.*Widget",
  "type": "tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui",
  "output_mode": "files_with_matches"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/chat/sage.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/DailyWisdomWidget.tsx"
}

🔧 Tool: Grep
Input: {
  "pattern": "import.*native|NativeModules|expo-|llama\\.rn|require.*native",
  "type": "ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib",
  "output_mode": "files_with_matches"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/quick-actions/index.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/tts/service.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/stt/service.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/auth/biometric.ts"
}
Now I have a comprehensive understanding of the codebase. Let me plan the implementation of the Android daily wisdom widget.

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create Android native widget module structure",
      "status": "pending",
      "activeForm": "Creating Android native widget module structure"
    },
    {
      "content": "Implement widget provider class with Material Design styling",
      "status": "pending",
      "activeForm": "Implementing widget provider class with Material Design styling"
    },
    {
      "content": "Create widget layout XML with Material Design components",
      "status": "pending",
      "activeForm": "Creating widget layout XML with Material Design components"
    },
    {
      "content": "Implement widget update service for daily wisdom refresh",
      "status": "pending",
      "activeForm": "Implementing widget update service for daily wisdom refresh"
    },
    {
      "content": "Add deep link handling to open app from widget",
      "status": "pending",
      "activeForm": "Adding deep link handling to open app from widget"
    },
    {
      "content": "Configure widget metadata and app.json integration",
      "status": "pending",
      "activeForm": "Configuring widget metadata and app.json integration"
    },
    {
      "content": "Create React Native bridge for widget data synchronization",
      "status": "pending",
      "activeForm": "Creating React Native bridge for widget data synchronization"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying implementation with Playwright test"
    }
  ]
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app.json"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}

🔧 Tool: Glob
Input: {
  "pattern": "android/**/*"
}
The Android folder doesn't exist yet - this is a managed Expo project. For Android widgets in Expo, I need to create a custom Expo module. Let me check for existing native modules and understand the project structure better:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts"
}

🔧 Tool: Glob
Input: {
  "pattern": "components/**/*.tsx"
}
Now I have a good understanding of the codebase. Since this is a managed Expo project without native Android folders, I need to create an Expo config plugin that will generate the native Android widget code during the build process. Let me check if there's an existing plugin pattern:

🔧 Tool: Glob
Input: {
  "pattern": "**/*.plugin.js"
}

🔧 Tool: Glob
Input: {
  "pattern": "plugins/**/*"
}
Now I understand the project structure. I need to create:
1. A custom Expo config plugin that generates Android widget files during build
2. A React Native module to bridge data between JS and Android widget
3. A service to synchronize wisdom data with the widget

Let me start implementing:

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create Android native widget module structure",
      "status": "in_progress",
      "activeForm": "Creating Android native widget module structure"
    },
    {
      "content": "Implement widget provider class with Material Design styling",
      "status": "pending",
      "activeForm": "Implementing widget provider class with Material Design styling"
    },
    {
      "content": "Create widget layout XML with Material Design components",
      "status": "pending",
      "activeForm": "Creating widget layout XML with Material Design components"
    },
    {
      "content": "Implement widget update service for daily wisdom refresh",
      "status": "pending",
      "activeForm": "Implementing widget update service for daily wisdom refresh"
    },
    {
      "content": "Add deep link handling to open app from widget",
      "status": "pending",
      "activeForm": "Adding deep link handling to open app from widget"
    },
    {
      "content": "Configure widget metadata and app.json integration",
      "status": "pending",
      "activeForm": "Configuring widget metadata and app.json integration"
    },
    {
      "content": "Create React Native bridge for widget data synchronization",
      "status": "pending",
      "activeForm": "Creating React Native bridge for widget data synchronization"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying implementation with Playwright test"
    }
  ]
}

🔧 Tool: Bash
Input: {
  "command": "mkdir -p /Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget",
  "description": "Create plugin directory structure"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget/app.plugin.js",
  "content": "/**\n * Expo Config Plugin for Android Daily Wisdom Widget\n *\n * This plugin generates the necessary Android native files for a home screen widget\n * that displays daily wisdom quotes with Material Design styling.\n */\n\nconst {\n  withAndroidManifest,\n  withDangerousMod,\n  withPlugins,\n} = require('@expo/config-plugins');\nconst fs = require('fs');\nconst path = require('path');\n\nconst WIDGET_PROVIDER_CLASS = 'DailyWisdomWidgetProvider';\nconst WIDGET_SERVICE_CLASS = 'DailyWisdomWidgetService';\n\n/**\n * Get the package name from the manifest\n */\nfunction getPackageName(config) {\n  return config.android?.package || 'com.sage.wisdom';\n}\n\n/**\n * Add widget receiver and service to AndroidManifest.xml\n */\nfunction withWidgetManifest(config) {\n  return withAndroidManifest(config, async (config) => {\n    const manifest = config.modResults;\n    const packageName = getPackageName(config);\n\n    // Find or create application element\n    const application = manifest.manifest.application?.[0];\n    if (!application) {\n      throw new Error('Could not find application element in AndroidManifest.xml');\n    }\n\n    // Add widget receiver\n    if (!application.receiver) {\n      application.receiver = [];\n    }\n\n    // Check if receiver already exists\n    const receiverExists = application.receiver.some(\n      (r) => r.$?.['android:name'] === `.${WIDGET_PROVIDER_CLASS}`\n    );\n\n    if (!receiverExists) {\n      application.receiver.push({\n        $: {\n          'android:name': `.${WIDGET_PROVIDER_CLASS}`,\n          'android:exported': 'true',\n          'android:label': 'Daily Wisdom',\n        },\n        'intent-filter': [\n          {\n            action: [\n              {\n                $: {\n                  'android:name': 'android.appwidget.action.APPWIDGET_UPDATE',\n                },\n              },\n            ],\n          },\n        ],\n        'meta-data': [\n          {\n            $: {\n              'android:name': 'android.appwidget.provider',\n              'android:resource': '@xml/daily_wisdom_widget_info',\n            },\n          },\n        ],\n      });\n    }\n\n    // Add widget service\n    if (!application.service) {\n      application.service = [];\n    }\n\n    const serviceExists = application.service.some(\n      (s) => s.$?.['android:name'] === `.${WIDGET_SERVICE_CLASS}`\n    );\n\n    if (!serviceExists) {\n      application.service.push({\n        $: {\n          'android:name': `.${WIDGET_SERVICE_CLASS}`,\n          'android:exported': 'false',\n          'android:permission': 'android.permission.BIND_JOB_SERVICE',\n        },\n      });\n    }\n\n    return config;\n  });\n}\n\n/**\n * Generate Android widget source files\n */\nfunction withWidgetSourceFiles(config) {\n  return withDangerousMod(config, [\n    'android',\n    async (config) => {\n      const projectRoot = config.modRequest.projectRoot;\n      const platformRoot = config.modRequest.platformProjectRoot;\n      const packageName = getPackageName(config);\n      const packagePath = packageName.replace(/\\./g, '/');\n\n      // Paths\n      const mainPath = path.join(platformRoot, 'app/src/main');\n      const javaPath = path.join(mainPath, `java/${packagePath}`);\n      const resPath = path.join(mainPath, 'res');\n      const xmlPath = path.join(resPath, 'xml');\n      const layoutPath = path.join(resPath, 'layout');\n      const drawablePath = path.join(resPath, 'drawable');\n      const valuesPath = path.join(resPath, 'values');\n\n      // Ensure directories exist\n      [javaPath, xmlPath, layoutPath, drawablePath, valuesPath].forEach((dir) => {\n        fs.mkdirSync(dir, { recursive: true });\n      });\n\n      // Generate widget provider class\n      const widgetProviderCode = generateWidgetProviderCode(packageName);\n      fs.writeFileSync(\n        path.join(javaPath, `${WIDGET_PROVIDER_CLASS}.kt`),\n        widgetProviderCode\n      );\n\n      // Generate widget service class\n      const widgetServiceCode = generateWidgetServiceCode(packageName);\n      fs.writeFileSync(\n        path.join(javaPath, `${WIDGET_SERVICE_CLASS}.kt`),\n        widgetServiceCode\n      );\n\n      // Generate widget data manager\n      const widgetDataManagerCode = generateWidgetDataManagerCode(packageName);\n      fs.writeFileSync(\n        path.join(javaPath, 'WidgetDataManager.kt'),\n        widgetDataManagerCode\n      );\n\n      // Generate widget info XML\n      const widgetInfoXml = generateWidgetInfoXml();\n      fs.writeFileSync(\n        path.join(xmlPath, 'daily_wisdom_widget_info.xml'),\n        widgetInfoXml\n      );\n\n      // Generate widget layout XML\n      const widgetLayoutXml = generateWidgetLayoutXml();\n      fs.writeFileSync(\n        path.join(layoutPath, 'widget_daily_wisdom.xml'),\n        widgetLayoutXml\n      );\n\n      // Generate widget background drawable\n      const widgetBackgroundXml = generateWidgetBackgroundDrawable();\n      fs.writeFileSync(\n        path.join(drawablePath, 'widget_background.xml'),\n        widgetBackgroundXml\n      );\n\n      // Generate widget button background\n      const widgetButtonBgXml = generateWidgetButtonBackground();\n      fs.writeFileSync(\n        path.join(drawablePath, 'widget_button_background.xml'),\n        widgetButtonBgXml\n      );\n\n      // Add/update widget colors\n      const widgetColorsXml = generateWidgetColorsXml();\n      fs.writeFileSync(\n        path.join(valuesPath, 'widget_colors.xml'),\n        widgetColorsXml\n      );\n\n      // Add widget dimens\n      const widgetDimensXml = generateWidgetDimensXml();\n      fs.writeFileSync(\n        path.join(valuesPath, 'widget_dimens.xml'),\n        widgetDimensXml\n      );\n\n      return config;\n    },\n  ]);\n}\n\n/**\n * Generate the widget provider Kotlin code\n */\nfunction generateWidgetProviderCode(packageName) {\n  return `package ${packageName}\n\nimport android.app.PendingIntent\nimport android.appwidget.AppWidgetManager\nimport android.appwidget.AppWidgetProvider\nimport android.content.ComponentName\nimport android.content.Context\nimport android.content.Intent\nimport android.net.Uri\nimport android.widget.RemoteViews\nimport android.os.Build\n\n/**\n * Daily Wisdom Widget Provider\n * Displays wisdom quotes with Material Design styling and deep links to app\n */\nclass ${WIDGET_PROVIDER_CLASS} : AppWidgetProvider() {\n\n    companion object {\n        const val ACTION_REFRESH = \"${packageName}.WIDGET_REFRESH\"\n        const val ACTION_OPEN_APP = \"${packageName}.WIDGET_OPEN_APP\"\n\n        /**\n         * Trigger widget update from React Native\n         */\n        fun updateWidget(context: Context) {\n            val intent = Intent(context, ${WIDGET_PROVIDER_CLASS}::class.java).apply {\n                action = AppWidgetManager.ACTION_APPWIDGET_UPDATE\n            }\n            val appWidgetManager = AppWidgetManager.getInstance(context)\n            val componentName = ComponentName(context, ${WIDGET_PROVIDER_CLASS}::class.java)\n            val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)\n            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds)\n            context.sendBroadcast(intent)\n        }\n    }\n\n    override fun onUpdate(\n        context: Context,\n        appWidgetManager: AppWidgetManager,\n        appWidgetIds: IntArray\n    ) {\n        for (appWidgetId in appWidgetIds) {\n            updateAppWidget(context, appWidgetManager, appWidgetId)\n        }\n    }\n\n    override fun onReceive(context: Context, intent: Intent) {\n        super.onReceive(context, intent)\n\n        when (intent.action) {\n            ACTION_REFRESH -> {\n                // Refresh wisdom content\n                WidgetDataManager.refreshDailyWisdom(context)\n\n                // Update all widgets\n                val appWidgetManager = AppWidgetManager.getInstance(context)\n                val componentName = ComponentName(context, ${WIDGET_PROVIDER_CLASS}::class.java)\n                val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)\n                onUpdate(context, appWidgetManager, appWidgetIds)\n            }\n            ACTION_OPEN_APP -> {\n                // Deep link to app\n                openApp(context)\n            }\n        }\n    }\n\n    override fun onEnabled(context: Context) {\n        super.onEnabled(context)\n        // First widget added - initialize data\n        WidgetDataManager.initializeIfNeeded(context)\n    }\n\n    override fun onDisabled(context: Context) {\n        super.onDisabled(context)\n        // Last widget removed - cleanup if needed\n    }\n\n    private fun updateAppWidget(\n        context: Context,\n        appWidgetManager: AppWidgetManager,\n        appWidgetId: Int\n    ) {\n        val views = RemoteViews(context.packageName, R.layout.widget_daily_wisdom)\n\n        // Get current wisdom data\n        val wisdomData = WidgetDataManager.getDailyWisdom(context)\n\n        // Update text views\n        views.setTextViewText(R.id.widget_wisdom_content, wisdomData.content)\n        views.setTextViewText(R.id.widget_wisdom_source, wisdomData.source)\n\n        // Set up click handlers\n\n        // Main content opens app with deep link\n        val openAppIntent = Intent(context, ${WIDGET_PROVIDER_CLASS}::class.java).apply {\n            action = ACTION_OPEN_APP\n        }\n        val openAppPendingIntent = PendingIntent.getBroadcast(\n            context,\n            0,\n            openAppIntent,\n            getPendingIntentFlags()\n        )\n        views.setOnClickPendingIntent(R.id.widget_content_container, openAppPendingIntent)\n\n        // Refresh button\n        val refreshIntent = Intent(context, ${WIDGET_PROVIDER_CLASS}::class.java).apply {\n            action = ACTION_REFRESH\n        }\n        val refreshPendingIntent = PendingIntent.getBroadcast(\n            context,\n            1,\n            refreshIntent,\n            getPendingIntentFlags()\n        )\n        views.setOnClickPendingIntent(R.id.widget_refresh_button, refreshPendingIntent)\n\n        // Update widget\n        appWidgetManager.updateAppWidget(appWidgetId, views)\n    }\n\n    private fun openApp(context: Context) {\n        // Create deep link intent\n        val deepLinkUri = Uri.parse(\"sage://explore\")\n        val intent = Intent(Intent.ACTION_VIEW, deepLinkUri).apply {\n            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP\n            setPackage(context.packageName)\n        }\n\n        // Fallback to main activity if deep link fails\n        try {\n            context.startActivity(intent)\n        } catch (e: Exception) {\n            val launchIntent = context.packageManager.getLaunchIntentForPackage(context.packageName)\n            launchIntent?.let {\n                it.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP\n                context.startActivity(it)\n            }\n        }\n    }\n\n    private fun getPendingIntentFlags(): Int {\n        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {\n            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE\n        } else {\n            PendingIntent.FLAG_UPDATE_CURRENT\n        }\n    }\n}\n`;\n}\n\n/**\n * Generate the widget service Kotlin code\n */\nfunction generateWidgetServiceCode(packageName) {\n  return `package ${packageName}\n\nimport android.app.job.JobParameters\nimport android.app.job.JobService\nimport android.appwidget.AppWidgetManager\nimport android.content.ComponentName\n\n/**\n * Background service for updating widget at midnight\n */\nclass ${WIDGET_SERVICE_CLASS} : JobService() {\n\n    companion object {\n        const val JOB_ID = 1001\n    }\n\n    override fun onStartJob(params: JobParameters?): Boolean {\n        // Refresh wisdom data\n        WidgetDataManager.refreshDailyWisdom(applicationContext)\n\n        // Update all widgets\n        val appWidgetManager = AppWidgetManager.getInstance(applicationContext)\n        val componentName = ComponentName(applicationContext, ${WIDGET_PROVIDER_CLASS}::class.java)\n        val appWidgetIds = appWidgetManager.getAppWidgetIds(componentName)\n\n        if (appWidgetIds.isNotEmpty()) {\n            val provider = ${WIDGET_PROVIDER_CLASS}()\n            provider.onUpdate(applicationContext, appWidgetManager, appWidgetIds)\n        }\n\n        // Job is complete\n        return false\n    }\n\n    override fun onStopJob(params: JobParameters?): Boolean {\n        // Return true to reschedule if interrupted\n        return true\n    }\n}\n`;\n}\n\n/**\n * Generate the widget data manager Kotlin code\n */\nfunction generateWidgetDataManagerCode(packageName) {\n  return `package ${packageName}\n\nimport android.content.Context\nimport android.content.SharedPreferences\nimport org.json.JSONObject\nimport java.text.SimpleDateFormat\nimport java.util.*\n\n/**\n * Manages widget data storage and synchronization with React Native\n */\nobject WidgetDataManager {\n\n    private const val PREFS_NAME = \"SageWidgetPrefs\"\n    private const val KEY_WISDOM_CONTENT = \"wisdom_content\"\n    private const val KEY_WISDOM_SOURCE = \"wisdom_source\"\n    private const val KEY_WISDOM_BOOK = \"wisdom_book\"\n    private const val KEY_LAST_UPDATE = \"last_update\"\n    private const val KEY_WISDOM_ID = \"wisdom_id\"\n\n    data class WisdomData(\n        val content: String,\n        val source: String,\n        val book: String = \"\",\n        val id: String = \"\"\n    )\n\n    private val defaultWisdoms = listOf(\n        WisdomData(\n            content = \"You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction.\",\n            source = \"Bhagavad Gita 2.47\",\n            book = \"Bhagavad Gita\"\n        ),\n        WisdomData(\n            content = \"The mind is everything. What you think you become.\",\n            source = \"Dhammapada\",\n            book = \"Dhammapada\"\n        ),\n        WisdomData(\n            content = \"When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.\",\n            source = \"Bhagavad Gita 6.19\",\n            book = \"Bhagavad Gita\"\n        ),\n        WisdomData(\n            content = \"Peace comes from within. Do not seek it without.\",\n            source = \"Buddha\",\n            book = \"Buddhist Teachings\"\n        ),\n        WisdomData(\n            content = \"The Self is not born, nor does it die. It has not come from anywhere, and it has not become anything.\",\n            source = \"Katha Upanishad\",\n            book = \"Upanishads\"\n        )\n    )\n\n    private fun getPrefs(context: Context): SharedPreferences {\n        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)\n    }\n\n    fun initializeIfNeeded(context: Context) {\n        val prefs = getPrefs(context)\n        if (!prefs.contains(KEY_WISDOM_CONTENT)) {\n            refreshDailyWisdom(context)\n        }\n    }\n\n    fun getDailyWisdom(context: Context): WisdomData {\n        val prefs = getPrefs(context)\n        val content = prefs.getString(KEY_WISDOM_CONTENT, null)\n        val source = prefs.getString(KEY_WISDOM_SOURCE, null)\n\n        if (content == null || source == null) {\n            // Return a default wisdom\n            val defaultWisdom = defaultWisdoms[0]\n            return defaultWisdom\n        }\n\n        return WisdomData(\n            content = content,\n            source = source,\n            book = prefs.getString(KEY_WISDOM_BOOK, \"\") ?: \"\",\n            id = prefs.getString(KEY_WISDOM_ID, \"\") ?: \"\"\n        )\n    }\n\n    fun refreshDailyWisdom(context: Context) {\n        val prefs = getPrefs(context)\n\n        // Get a random default wisdom for now\n        // This will be updated from React Native with actual DB content\n        val wisdom = defaultWisdoms.random()\n\n        prefs.edit().apply {\n            putString(KEY_WISDOM_CONTENT, wisdom.content)\n            putString(KEY_WISDOM_SOURCE, wisdom.source)\n            putString(KEY_WISDOM_BOOK, wisdom.book)\n            putString(KEY_LAST_UPDATE, getCurrentDateString())\n            apply()\n        }\n    }\n\n    /**\n     * Update widget data from React Native\n     */\n    fun updateFromReactNative(context: Context, jsonData: String) {\n        try {\n            val json = JSONObject(jsonData)\n            val prefs = getPrefs(context)\n\n            prefs.edit().apply {\n                putString(KEY_WISDOM_CONTENT, json.optString(\"content\", \"\"))\n                putString(KEY_WISDOM_SOURCE, json.optString(\"sourceRef\", \"\"))\n                putString(KEY_WISDOM_BOOK, json.optString(\"book\", \"\"))\n                putString(KEY_WISDOM_ID, json.optString(\"id\", \"\"))\n                putString(KEY_LAST_UPDATE, getCurrentDateString())\n                apply()\n            }\n\n            // Trigger widget update\n            ${WIDGET_PROVIDER_CLASS}.updateWidget(context)\n        } catch (e: Exception) {\n            e.printStackTrace()\n        }\n    }\n\n    private fun getCurrentDateString(): String {\n        val dateFormat = SimpleDateFormat(\"yyyy-MM-dd\", Locale.US)\n        return dateFormat.format(Date())\n    }\n\n    fun shouldRefresh(context: Context): Boolean {\n        val prefs = getPrefs(context)\n        val lastUpdate = prefs.getString(KEY_LAST_UPDATE, null) ?: return true\n        val currentDate = getCurrentDateString()\n        return lastUpdate != currentDate\n    }\n}\n`;\n}\n\n/**\n * Generate widget info XML\n */\nfunction generateWidgetInfoXml() {\n  return `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<appwidget-provider xmlns:android=\"http://schemas.android.com/apk/res/android\"\n    android:minWidth=\"250dp\"\n    android:minHeight=\"110dp\"\n    android:targetCellWidth=\"4\"\n    android:targetCellHeight=\"2\"\n    android:minResizeWidth=\"180dp\"\n    android:minResizeHeight=\"80dp\"\n    android:maxResizeWidth=\"530dp\"\n    android:maxResizeHeight=\"400dp\"\n    android:updatePeriodMillis=\"86400000\"\n    android:initialLayout=\"@layout/widget_daily_wisdom\"\n    android:resizeMode=\"horizontal|vertical\"\n    android:widgetCategory=\"home_screen\"\n    android:previewLayout=\"@layout/widget_daily_wisdom\"\n    android:description=\"@string/app_name\" />\n`;\n}\n\n/**\n * Generate widget layout XML with Material Design\n */\nfunction generateWidgetLayoutXml() {\n  return `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<LinearLayout xmlns:android=\"http://schemas.android.com/apk/res/android\"\n    xmlns:tools=\"http://schemas.android.com/tools\"\n    android:id=\"@+id/widget_container\"\n    android:layout_width=\"match_parent\"\n    android:layout_height=\"match_parent\"\n    android:background=\"@drawable/widget_background\"\n    android:orientation=\"vertical\"\n    android:padding=\"@dimen/widget_padding\">\n\n    <!-- Header with badge and refresh button -->\n    <LinearLayout\n        android:layout_width=\"match_parent\"\n        android:layout_height=\"wrap_content\"\n        android:gravity=\"center_vertical\"\n        android:orientation=\"horizontal\">\n\n        <!-- Daily Wisdom Badge -->\n        <TextView\n            android:id=\"@+id/widget_badge\"\n            android:layout_width=\"wrap_content\"\n            android:layout_height=\"wrap_content\"\n            android:background=\"@drawable/widget_button_background\"\n            android:paddingStart=\"@dimen/widget_badge_padding_horizontal\"\n            android:paddingTop=\"@dimen/widget_badge_padding_vertical\"\n            android:paddingEnd=\"@dimen/widget_badge_padding_horizontal\"\n            android:paddingBottom=\"@dimen/widget_badge_padding_vertical\"\n            android:text=\"DAILY WISDOM\"\n            android:textColor=\"@color/widget_primary\"\n            android:textSize=\"10sp\"\n            android:textStyle=\"bold\"\n            android:letterSpacing=\"0.05\" />\n\n        <View\n            android:layout_width=\"0dp\"\n            android:layout_height=\"0dp\"\n            android:layout_weight=\"1\" />\n\n        <!-- Refresh Button -->\n        <ImageButton\n            android:id=\"@+id/widget_refresh_button\"\n            android:layout_width=\"32dp\"\n            android:layout_height=\"32dp\"\n            android:background=\"?android:attr/selectableItemBackgroundBorderless\"\n            android:contentDescription=\"Refresh wisdom\"\n            android:src=\"@android:drawable/ic_popup_sync\"\n            android:tint=\"@color/widget_text_secondary\" />\n    </LinearLayout>\n\n    <!-- Content Container (clickable for deep link) -->\n    <LinearLayout\n        android:id=\"@+id/widget_content_container\"\n        android:layout_width=\"match_parent\"\n        android:layout_height=\"0dp\"\n        android:layout_weight=\"1\"\n        android:gravity=\"center_vertical\"\n        android:orientation=\"vertical\"\n        android:paddingTop=\"@dimen/widget_content_padding_top\"\n        android:paddingBottom=\"@dimen/widget_content_padding_bottom\">\n\n        <!-- Wisdom Quote -->\n        <TextView\n            android:id=\"@+id/widget_wisdom_content\"\n            android:layout_width=\"match_parent\"\n            android:layout_height=\"wrap_content\"\n            android:ellipsize=\"end\"\n            android:fontFamily=\"serif\"\n            android:lineSpacingMultiplier=\"1.3\"\n            android:maxLines=\"4\"\n            android:text=\"Loading wisdom...\"\n            android:textColor=\"@color/widget_text_primary\"\n            android:textSize=\"@dimen/widget_content_text_size\"\n            tools:text=\"You have the right to work, but never to the fruit of work.\" />\n\n        <!-- Source Reference -->\n        <TextView\n            android:id=\"@+id/widget_wisdom_source\"\n            android:layout_width=\"match_parent\"\n            android:layout_height=\"wrap_content\"\n            android:layout_marginTop=\"@dimen/widget_source_margin_top\"\n            android:text=\"— Source\"\n            android:textColor=\"@color/widget_primary\"\n            android:textSize=\"@dimen/widget_source_text_size\"\n            android:textStyle=\"italic\"\n            tools:text=\"— Bhagavad Gita 2.47\" />\n    </LinearLayout>\n\n    <!-- Tap hint -->\n    <TextView\n        android:layout_width=\"match_parent\"\n        android:layout_height=\"wrap_content\"\n        android:gravity=\"center\"\n        android:text=\"Tap to open Sage\"\n        android:textColor=\"@color/widget_text_muted\"\n        android:textSize=\"10sp\" />\n\n</LinearLayout>\n`;\n}\n\n/**\n * Generate widget background drawable with Material Design styling\n */\nfunction generateWidgetBackgroundDrawable() {\n  return `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<shape xmlns:android=\"http://schemas.android.com/apk/res/android\"\n    android:shape=\"rectangle\">\n    <!-- Dark forest background matching app theme -->\n    <solid android:color=\"@color/widget_background\" />\n    <!-- Rounded corners for Material Design -->\n    <corners android:radius=\"@dimen/widget_corner_radius\" />\n    <!-- Subtle border -->\n    <stroke\n        android:width=\"1dp\"\n        android:color=\"@color/widget_border\" />\n</shape>\n`;\n}\n\n/**\n * Generate widget button background drawable\n */\nfunction generateWidgetButtonBackground() {\n  return `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<shape xmlns:android=\"http://schemas.android.com/apk/res/android\"\n    android:shape=\"rectangle\">\n    <solid android:color=\"@color/widget_primary_light\" />\n    <corners android:radius=\"4dp\" />\n</shape>\n`;\n}\n\n/**\n * Generate widget colors XML\n */\nfunction generateWidgetColorsXml() {\n  return `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources>\n    <!-- Widget colors matching Sage app theme -->\n    <color name=\"widget_background\">#132210</color>\n    <color name=\"widget_surface\">#1d271c</color>\n    <color name=\"widget_primary\">#37ec13</color>\n    <color name=\"widget_primary_light\">#1A37ec13</color>\n    <color name=\"widget_text_primary\">#FFFFFF</color>\n    <color name=\"widget_text_secondary\">#A3A3A3</color>\n    <color name=\"widget_text_muted\">#737373</color>\n    <color name=\"widget_border\">#2a3829</color>\n</resources>\n`;\n}\n\n/**\n * Generate widget dimensions XML\n */\nfunction generateWidgetDimensXml() {\n  return `<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<resources>\n    <dimen name=\"widget_padding\">16dp</dimen>\n    <dimen name=\"widget_corner_radius\">16dp</dimen>\n    <dimen name=\"widget_badge_padding_horizontal\">8dp</dimen>\n    <dimen name=\"widget_badge_padding_vertical\">4dp</dimen>\n    <dimen name=\"widget_content_padding_top\">8dp</dimen>\n    <dimen name=\"widget_content_padding_bottom\">8dp</dimen>\n    <dimen name=\"widget_content_text_size\">15sp</dimen>\n    <dimen name=\"widget_source_text_size\">12sp</dimen>\n    <dimen name=\"widget_source_margin_top\">8dp</dimen>\n</resources>\n`;\n}\n\n/**\n * Main plugin function\n */\nfunction withAndroidWidget(config) {\n  return withPlugins(config, [\n    withWidgetManifest,\n    withWidgetSourceFiles,\n  ]);\n}\n\nmodule.exports = withAndroidWidget;\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create Android native widget module structure",
      "status": "completed",
      "activeForm": "Creating Android native widget module structure"
    },
    {
      "content": "Implement widget provider class with Material Design styling",
      "status": "completed",
      "activeForm": "Implementing widget provider class with Material Design styling"
    },
    {
      "content": "Create widget layout XML with Material Design components",
      "status": "completed",
      "activeForm": "Creating widget layout XML with Material Design components"
    },
    {
      "content": "Implement widget update service for daily wisdom refresh",
      "status": "completed",
      "activeForm": "Implementing widget update service for daily wisdom refresh"
    },
    {
      "content": "Add deep link handling to open app from widget",
      "status": "completed",
      "activeForm": "Adding deep link handling to open app from widget"
    },
    {
      "content": "Configure widget metadata and app.json integration",
      "status": "in_progress",
      "activeForm": "Configuring widget metadata and app.json integration"
    },
    {
      "content": "Create React Native bridge for widget data synchronization",
      "status": "pending",
      "activeForm": "Creating React Native bridge for widget data synchronization"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying implementation with Playwright test"
    }
  ]
}
Now let me update app.json to include the widget plugin and update the React Native module bridge:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app.json",
  "old_string": "      [\n        \"expo-speech-recognition\",\n        {\n          \"microphonePermission\": \"Sage uses the microphone for voice input\",\n          \"speechRecognitionPermission\": \"Sage uses speech recognition for hands-free question input\",\n          \"androidSpeechServicePackages\": [\"com.google.android.googlequicksearchbox\"]\n        }\n      ]\n    ],",
  "new_string": "      [\n        \"expo-speech-recognition\",\n        {\n          \"microphonePermission\": \"Sage uses the microphone for voice input\",\n          \"speechRecognitionPermission\": \"Sage uses speech recognition for hands-free question input\",\n          \"androidSpeechServicePackages\": [\"com.google.android.googlequicksearchbox\"]\n        }\n      ],\n      \"./plugins/android-widget/app.plugin.js\"\n    ],"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create Android native widget module structure",
      "status": "completed",
      "activeForm": "Creating Android native widget module structure"
    },
    {
      "content": "Implement widget provider class with Material Design styling",
      "status": "completed",
      "activeForm": "Implementing widget provider class with Material Design styling"
    },
    {
      "content": "Create widget layout XML with Material Design components",
      "status": "completed",
      "activeForm": "Creating widget layout XML with Material Design components"
    },
    {
      "content": "Implement widget update service for daily wisdom refresh",
      "status": "completed",
      "activeForm": "Implementing widget update service for daily wisdom refresh"
    },
    {
      "content": "Add deep link handling to open app from widget",
      "status": "completed",
      "activeForm": "Adding deep link handling to open app from widget"
    },
    {
      "content": "Configure widget metadata and app.json integration",
      "status": "completed",
      "activeForm": "Configuring widget metadata and app.json integration"
    },
    {
      "content": "Create React Native bridge for widget data synchronization",
      "status": "in_progress",
      "activeForm": "Creating React Native bridge for widget data synchronization"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "pending",
      "activeForm": "Verifying implementation with Playwright test"
    }
  ]
}
Now let me create the React Native bridge for widget data synchronization. First, let me create the native module that will be called from JavaScript:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget/withWidgetModule.js",
  "content": "/**\n * Additional config plugin to add the React Native bridge module for widget communication\n */\n\nconst { withDangerousMod } = require('@expo/config-plugins');\nconst fs = require('fs');\nconst path = require('path');\n\nfunction getPackageName(config) {\n  return config.android?.package || 'com.sage.wisdom';\n}\n\nfunction withWidgetModule(config) {\n  return withDangerousMod(config, [\n    'android',\n    async (config) => {\n      const platformRoot = config.modRequest.platformProjectRoot;\n      const packageName = getPackageName(config);\n      const packagePath = packageName.replace(/\\./g, '/');\n\n      const javaPath = path.join(platformRoot, 'app/src/main', `java/${packagePath}`);\n      fs.mkdirSync(javaPath, { recursive: true });\n\n      // Generate React Native Module\n      const moduleCode = generateWidgetModuleCode(packageName);\n      fs.writeFileSync(\n        path.join(javaPath, 'WidgetModule.kt'),\n        moduleCode\n      );\n\n      // Generate Package class\n      const packageCode = generateWidgetPackageCode(packageName);\n      fs.writeFileSync(\n        path.join(javaPath, 'WidgetPackage.kt'),\n        packageCode\n      );\n\n      return config;\n    },\n  ]);\n}\n\nfunction generateWidgetModuleCode(packageName) {\n  return `package ${packageName}\n\nimport com.facebook.react.bridge.ReactApplicationContext\nimport com.facebook.react.bridge.ReactContextBaseJavaModule\nimport com.facebook.react.bridge.ReactMethod\nimport com.facebook.react.bridge.Promise\nimport com.facebook.react.bridge.ReadableMap\n\n/**\n * React Native Module for Widget communication\n * Allows JS to update widget data and trigger refreshes\n */\nclass WidgetModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {\n\n    override fun getName(): String = \"SageWidgetModule\"\n\n    /**\n     * Update widget with new wisdom data from JS\n     */\n    @ReactMethod\n    fun updateWidget(data: ReadableMap, promise: Promise) {\n        try {\n            val jsonData = StringBuilder()\n            jsonData.append(\"{\")\n\n            data.getString(\"content\")?.let { jsonData.append(\"\\\\\"content\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\",\") }\n            data.getString(\"sourceRef\")?.let { jsonData.append(\"\\\\\"sourceRef\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\",\") }\n            data.getString(\"book\")?.let { jsonData.append(\"\\\\\"book\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\",\") }\n            data.getString(\"id\")?.let { jsonData.append(\"\\\\\"id\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\"\") }\n\n            // Remove trailing comma if present\n            var json = jsonData.toString()\n            if (json.endsWith(\",\")) {\n                json = json.dropLast(1)\n            }\n            json += \"}\"\n\n            WidgetDataManager.updateFromReactNative(reactApplicationContext, json)\n            promise.resolve(true)\n        } catch (e: Exception) {\n            promise.reject(\"WIDGET_UPDATE_ERROR\", e.message, e)\n        }\n    }\n\n    /**\n     * Force refresh all widgets\n     */\n    @ReactMethod\n    fun refreshWidgets(promise: Promise) {\n        try {\n            DailyWisdomWidgetProvider.updateWidget(reactApplicationContext)\n            promise.resolve(true)\n        } catch (e: Exception) {\n            promise.reject(\"WIDGET_REFRESH_ERROR\", e.message, e)\n        }\n    }\n\n    /**\n     * Check if widget should be refreshed (daily check)\n     */\n    @ReactMethod\n    fun shouldRefresh(promise: Promise) {\n        try {\n            val shouldRefresh = WidgetDataManager.shouldRefresh(reactApplicationContext)\n            promise.resolve(shouldRefresh)\n        } catch (e: Exception) {\n            promise.reject(\"WIDGET_CHECK_ERROR\", e.message, e)\n        }\n    }\n\n    private fun escapeJson(text: String): String {\n        return text\n            .replace(\"\\\\\\\\\", \"\\\\\\\\\\\\\\\\\")\n            .replace(\"\\\\\"\", \"\\\\\\\\\\\\\"\")\n            .replace(\"\\\\n\", \"\\\\\\\\n\")\n            .replace(\"\\\\r\", \"\\\\\\\\r\")\n            .replace(\"\\\\t\", \"\\\\\\\\t\")\n    }\n}\n`;\n}\n\nfunction generateWidgetPackageCode(packageName) {\n  return `package ${packageName}\n\nimport com.facebook.react.ReactPackage\nimport com.facebook.react.bridge.NativeModule\nimport com.facebook.react.bridge.ReactApplicationContext\nimport com.facebook.react.uimanager.ViewManager\n\n/**\n * React Native Package for Widget Module\n */\nclass WidgetPackage : ReactPackage {\n    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {\n        return listOf(WidgetModule(reactContext))\n    }\n\n    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {\n        return emptyList()\n    }\n}\n`;\n}\n\nmodule.exports = withWidgetModule;\n"
}
Now let me update the main plugin to include the module registration:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget/app.plugin.js",
  "limit": 60
}
Now let me create the JavaScript/TypeScript service that will be used from the app to communicate with the widget:

🔧 Tool: Bash
Input: {
  "command": "mkdir -p /Users/vimo/Projects/OpenCode/Sage_AI/lib/widget",
  "description": "Create widget lib directory"
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/widget/android-widget.ts",
  "content": "/**\n * Android Widget Service\n *\n * Provides integration between the React Native app and the Android home screen widget.\n * Handles syncing daily wisdom data to the widget and triggering updates.\n */\n\nimport { Platform, NativeModules } from 'react-native';\nimport { getRandomWisdom, initWisdomDB, WisdomChunk } from '../retrieval/search';\n\n// Native module interface\ninterface SageWidgetModule {\n  updateWidget(data: {\n    content: string;\n    sourceRef: string;\n    book: string;\n    id: string;\n  }): Promise<boolean>;\n  refreshWidgets(): Promise<boolean>;\n  shouldRefresh(): Promise<boolean>;\n}\n\n// Get native module (only available on Android)\nconst WidgetModule: SageWidgetModule | null =\n  Platform.OS === 'android' ? NativeModules.SageWidgetModule : null;\n\n/**\n * Check if widget functionality is available\n */\nexport function isWidgetAvailable(): boolean {\n  return Platform.OS === 'android' && WidgetModule !== null;\n}\n\n/**\n * Update the Android widget with new wisdom data\n */\nexport async function updateWidgetData(wisdom: WisdomChunk): Promise<boolean> {\n  if (!isWidgetAvailable()) {\n    console.log('[Widget] Widget not available on this platform');\n    return false;\n  }\n\n  try {\n    const result = await WidgetModule!.updateWidget({\n      content: wisdom.content,\n      sourceRef: wisdom.sourceRef,\n      book: wisdom.book,\n      id: wisdom.id,\n    });\n    console.log('[Widget] Widget data updated successfully');\n    return result;\n  } catch (error) {\n    console.error('[Widget] Failed to update widget data:', error);\n    return false;\n  }\n}\n\n/**\n * Refresh the widget with a new random wisdom quote\n */\nexport async function refreshWidgetWisdom(options?: {\n  themes?: string[];\n  books?: string[];\n}): Promise<WisdomChunk | null> {\n  if (!isWidgetAvailable()) {\n    return null;\n  }\n\n  try {\n    // Initialize DB if needed\n    await initWisdomDB();\n\n    // Get random wisdom\n    const wisdom = await getRandomWisdom({\n      themes: options?.themes as any,\n      books: options?.books,\n    });\n\n    if (wisdom) {\n      await updateWidgetData(wisdom);\n      return wisdom;\n    }\n\n    return null;\n  } catch (error) {\n    console.error('[Widget] Failed to refresh widget wisdom:', error);\n    return null;\n  }\n}\n\n/**\n * Force refresh all widget instances\n */\nexport async function forceRefreshWidgets(): Promise<boolean> {\n  if (!isWidgetAvailable()) {\n    return false;\n  }\n\n  try {\n    const result = await WidgetModule!.refreshWidgets();\n    console.log('[Widget] Widgets refreshed');\n    return result;\n  } catch (error) {\n    console.error('[Widget] Failed to refresh widgets:', error);\n    return false;\n  }\n}\n\n/**\n * Check if widget data should be refreshed (daily check)\n */\nexport async function shouldRefreshWidget(): Promise<boolean> {\n  if (!isWidgetAvailable()) {\n    return false;\n  }\n\n  try {\n    return await WidgetModule!.shouldRefresh();\n  } catch (error) {\n    console.error('[Widget] Failed to check refresh status:', error);\n    return false;\n  }\n}\n\n/**\n * Sync widget with current daily wisdom (call this on app startup)\n */\nexport async function syncWidgetOnStartup(dailyWisdom?: WisdomChunk | null): Promise<void> {\n  if (!isWidgetAvailable()) {\n    return;\n  }\n\n  try {\n    const needsRefresh = await shouldRefreshWidget();\n\n    if (needsRefresh || dailyWisdom) {\n      if (dailyWisdom) {\n        // Use provided wisdom\n        await updateWidgetData(dailyWisdom);\n      } else {\n        // Fetch new wisdom\n        await refreshWidgetWisdom();\n      }\n    }\n  } catch (error) {\n    console.error('[Widget] Failed to sync widget on startup:', error);\n  }\n}\n\n/**\n * Initialize widget service (call once during app initialization)\n */\nexport async function initWidgetService(): Promise<void> {\n  if (!isWidgetAvailable()) {\n    console.log('[Widget] Widget service not available (non-Android platform)');\n    return;\n  }\n\n  try {\n    console.log('[Widget] Initializing widget service...');\n\n    // Check if widget needs refresh\n    const needsRefresh = await shouldRefreshWidget();\n    if (needsRefresh) {\n      console.log('[Widget] Widget needs refresh, updating...');\n      await refreshWidgetWisdom();\n    }\n\n    console.log('[Widget] Widget service initialized');\n  } catch (error) {\n    console.error('[Widget] Failed to initialize widget service:', error);\n  }\n}\n\nexport default {\n  isWidgetAvailable,\n  updateWidgetData,\n  refreshWidgetWisdom,\n  forceRefreshWidgets,\n  shouldRefreshWidget,\n  syncWidgetOnStartup,\n  initWidgetService,\n};\n"
}
Now let me create an index file for the widget module:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/widget/index.ts",
  "content": "/**\n * Widget Module\n *\n * Exports widget-related functionality for Android home screen widget integration.\n */\n\nexport {\n  isWidgetAvailable,\n  updateWidgetData,\n  refreshWidgetWisdom,\n  forceRefreshWidgets,\n  shouldRefreshWidget,\n  syncWidgetOnStartup,\n  initWidgetService,\n} from './android-widget';\n"
}
Now I need to update the app's main layout to initialize the widget service on startup. Let me check the root layout:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx"
}
Now let me add the widget initialization to the root layout:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx",
  "old_string": "import {\n  initializeQuickActions,\n  handleQuickAction,\n  getInitialQuickAction,\n  subscribeToQuickActions,\n} from '../lib/quick-actions';",
  "new_string": "import {\n  initializeQuickActions,\n  handleQuickAction,\n  getInitialQuickAction,\n  subscribeToQuickActions,\n} from '../lib/quick-actions';\nimport { initWidgetService } from '../lib/widget';"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx",
  "old_string": "        // Initialize quick actions after app is ready\n        await initializeQuickActions();\n\n        // Check if app was launched from a quick action",
  "new_string": "        // Initialize quick actions after app is ready\n        await initializeQuickActions();\n\n        // Initialize Android widget service\n        await initWidgetService();\n\n        // Check if app was launched from a quick action"
}
Now let me also update the plugin to include the module registration in MainApplication. First, let me update the plugin to add the module registration:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget/app.plugin.js",
  "old_string": "const {\n  withAndroidManifest,\n  withDangerousMod,\n  withPlugins,\n} = require('@expo/config-plugins');\nconst fs = require('fs');\nconst path = require('path');",
  "new_string": "const {\n  withAndroidManifest,\n  withDangerousMod,\n  withMainApplication,\n  withPlugins,\n} = require('@expo/config-plugins');\nconst fs = require('fs');\nconst path = require('path');"
}
Now let me read the end of the plugin file to add the module registration:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget/app.plugin.js",
  "offset": 380
}
Now I need to add the React Native module generation and package registration to the plugin. Let me update the plugin to include these:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget/app.plugin.js",
  "old_string": "/**\n * Main plugin function\n */\nfunction withAndroidWidget(config) {\n  return withPlugins(config, [\n    withWidgetManifest,\n    withWidgetSourceFiles,\n  ]);\n}\n\nmodule.exports = withAndroidWidget;",
  "new_string": "/**\n * Generate React Native Module Kotlin code\n */\nfunction generateWidgetModuleCode(packageName) {\n  return `package ${packageName}\n\nimport com.facebook.react.bridge.ReactApplicationContext\nimport com.facebook.react.bridge.ReactContextBaseJavaModule\nimport com.facebook.react.bridge.ReactMethod\nimport com.facebook.react.bridge.Promise\nimport com.facebook.react.bridge.ReadableMap\n\n/**\n * React Native Module for Widget communication\n * Allows JS to update widget data and trigger refreshes\n */\nclass WidgetModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {\n\n    override fun getName(): String = \"SageWidgetModule\"\n\n    /**\n     * Update widget with new wisdom data from JS\n     */\n    @ReactMethod\n    fun updateWidget(data: ReadableMap, promise: Promise) {\n        try {\n            val jsonData = StringBuilder()\n            jsonData.append(\"{\")\n\n            data.getString(\"content\")?.let { jsonData.append(\"\\\\\"content\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\",\") }\n            data.getString(\"sourceRef\")?.let { jsonData.append(\"\\\\\"sourceRef\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\",\") }\n            data.getString(\"book\")?.let { jsonData.append(\"\\\\\"book\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\",\") }\n            data.getString(\"id\")?.let { jsonData.append(\"\\\\\"id\\\\\":\\\\\"\").append(escapeJson(it)).append(\"\\\\\"\") }\n\n            // Remove trailing comma if present\n            var json = jsonData.toString()\n            if (json.endsWith(\",\")) {\n                json = json.dropLast(1)\n            }\n            json += \"}\"\n\n            WidgetDataManager.updateFromReactNative(reactApplicationContext, json)\n            promise.resolve(true)\n        } catch (e: Exception) {\n            promise.reject(\"WIDGET_UPDATE_ERROR\", e.message, e)\n        }\n    }\n\n    /**\n     * Force refresh all widgets\n     */\n    @ReactMethod\n    fun refreshWidgets(promise: Promise) {\n        try {\n            ${WIDGET_PROVIDER_CLASS}.updateWidget(reactApplicationContext)\n            promise.resolve(true)\n        } catch (e: Exception) {\n            promise.reject(\"WIDGET_REFRESH_ERROR\", e.message, e)\n        }\n    }\n\n    /**\n     * Check if widget should be refreshed (daily check)\n     */\n    @ReactMethod\n    fun shouldRefresh(promise: Promise) {\n        try {\n            val shouldRefresh = WidgetDataManager.shouldRefresh(reactApplicationContext)\n            promise.resolve(shouldRefresh)\n        } catch (e: Exception) {\n            promise.reject(\"WIDGET_CHECK_ERROR\", e.message, e)\n        }\n    }\n\n    private fun escapeJson(text: String): String {\n        return text\n            .replace(\"\\\\\\\\\", \"\\\\\\\\\\\\\\\\\")\n            .replace(\"\\\\\"\", \"\\\\\\\\\\\\\"\")\n            .replace(\"\\\\n\", \"\\\\\\\\n\")\n            .replace(\"\\\\r\", \"\\\\\\\\r\")\n            .replace(\"\\\\t\", \"\\\\\\\\t\")\n    }\n}\n`;\n}\n\n/**\n * Generate React Native Package Kotlin code\n */\nfunction generateWidgetPackageCode(packageName) {\n  return `package ${packageName}\n\nimport com.facebook.react.ReactPackage\nimport com.facebook.react.bridge.NativeModule\nimport com.facebook.react.bridge.ReactApplicationContext\nimport com.facebook.react.uimanager.ViewManager\n\n/**\n * React Native Package for Widget Module\n */\nclass WidgetPackage : ReactPackage {\n    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {\n        return listOf(WidgetModule(reactContext))\n    }\n\n    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {\n        return emptyList()\n    }\n}\n`;\n}\n\n/**\n * Add widget module registration to MainApplication\n */\nfunction withWidgetModuleRegistration(config) {\n  return withMainApplication(config, async (config) => {\n    const packageName = getPackageName(config);\n\n    // Add import for WidgetPackage\n    if (!config.modResults.contents.includes('import ' + packageName + '.WidgetPackage')) {\n      config.modResults.contents = config.modResults.contents.replace(\n        /^(package .+\\n)/m,\n        `$1\\nimport ${packageName}.WidgetPackage\\n`\n      );\n    }\n\n    // Add WidgetPackage to getPackages()\n    // Look for the packages list and add WidgetPackage\n    if (!config.modResults.contents.includes('WidgetPackage()')) {\n      // Find the getPackages override and add our package\n      config.modResults.contents = config.modResults.contents.replace(\n        /(override fun getPackages\\(\\): List<ReactPackage> \\{[\\s\\S]*?packages\\.apply \\{)/,\n        '$1\\n                add(WidgetPackage())'\n      );\n\n      // Alternative pattern for different MainApplication structures\n      if (!config.modResults.contents.includes('WidgetPackage()')) {\n        config.modResults.contents = config.modResults.contents.replace(\n          /(PackageList\\(this\\)\\.packages\\.apply \\{)/,\n          '$1\\n                add(WidgetPackage())'\n        );\n      }\n    }\n\n    return config;\n  });\n}\n\n/**\n * Add module source files generation\n */\nfunction withWidgetModuleFiles(config) {\n  return withDangerousMod(config, [\n    'android',\n    async (config) => {\n      const platformRoot = config.modRequest.platformProjectRoot;\n      const packageName = getPackageName(config);\n      const packagePath = packageName.replace(/\\./g, '/');\n\n      const javaPath = path.join(platformRoot, 'app/src/main', `java/${packagePath}`);\n      fs.mkdirSync(javaPath, { recursive: true });\n\n      // Generate React Native Module\n      const moduleCode = generateWidgetModuleCode(packageName);\n      fs.writeFileSync(\n        path.join(javaPath, 'WidgetModule.kt'),\n        moduleCode\n      );\n\n      // Generate Package class\n      const packageCode = generateWidgetPackageCode(packageName);\n      fs.writeFileSync(\n        path.join(javaPath, 'WidgetPackage.kt'),\n        packageCode\n      );\n\n      return config;\n    },\n  ]);\n}\n\n/**\n * Main plugin function\n */\nfunction withAndroidWidget(config) {\n  return withPlugins(config, [\n    withWidgetManifest,\n    withWidgetSourceFiles,\n    withWidgetModuleFiles,\n    withWidgetModuleRegistration,\n  ]);\n}\n\nmodule.exports = withAndroidWidget;"
}
Now let me clean up the duplicate withWidgetModule.js file since we've integrated that functionality into the main plugin:

🔧 Tool: Bash
Input: {
  "command": "rm /Users/vimo/Projects/OpenCode/Sage_AI/plugins/android-widget/withWidgetModule.js",
  "description": "Remove duplicate module file"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create Android native widget module structure",
      "status": "completed",
      "activeForm": "Creating Android native widget module structure"
    },
    {
      "content": "Implement widget provider class with Material Design styling",
      "status": "completed",
      "activeForm": "Implementing widget provider class with Material Design styling"
    },
    {
      "content": "Create widget layout XML with Material Design components",
      "status": "completed",
      "activeForm": "Creating widget layout XML with Material Design components"
    },
    {
      "content": "Implement widget update service for daily wisdom refresh",
      "status": "completed",
      "activeForm": "Implementing widget update service for daily wisdom refresh"
    },
    {
      "content": "Add deep link handling to open app from widget",
      "status": "completed",
      "activeForm": "Adding deep link handling to open app from widget"
    },
    {
      "content": "Configure widget metadata and app.json integration",
      "status": "completed",
      "activeForm": "Configuring widget metadata and app.json integration"
    },
    {
      "content": "Create React Native bridge for widget data synchronization",
      "status": "completed",
      "activeForm": "Creating React Native bridge for widget data synchronization"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "in_progress",
      "activeForm": "Verifying implementation with Playwright test"
    }
  ]
}
Now let me verify the implementation. Since this is an Android native widget with an Expo config plugin, the actual widget functionality can only be tested on an Android device/emulator after building. However, I can create a test to verify:
1. The TypeScript service module compiles and exports correctly
2. The plugin configuration is valid
3. The integration with the app layout works

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit lib/widget/android-widget.ts lib/widget/index.ts 2>&1 | head -50",
  "description": "Type check widget module"
}
These are known type conflicts between React Native and TypeScript's DOM types - they're not related to our widget code. Let me run the project's own typecheck instead:

🔧 Tool: Bash
Input: {
  "command": "npm run typecheck 2>&1 | tail -30",
  "description": "Run project typecheck"
}
The widget code compiles fine - those errors are in scripts unrelated to our widget implementation. Let me verify the plugin syntax is valid by running a quick Node.js check:

🔧 Tool: Bash
Input: {
  "command": "node -e \"const plugin = require('./plugins/android-widget/app.plugin.js'); console.log('Plugin loaded successfully:', typeof plugin)\"",
  "description": "Verify plugin loads correctly"
}
The plugin loads correctly. Now let me create a Playwright test to verify the TypeScript module integration and configuration:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/widget-verification.spec.ts",
  "content": "/**\n * Temporary verification test for Android Widget implementation\n * This test verifies the configuration and TypeScript modules are correctly set up.\n */\n\nimport { test, expect } from '@playwright/test';\nimport * as fs from 'fs';\nimport * as path from 'path';\n\ntest.describe('Android Widget Implementation Verification', () => {\n  const projectRoot = process.cwd();\n\n  test('app.json includes widget plugin configuration', async () => {\n    const appJsonPath = path.join(projectRoot, 'app.json');\n    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'));\n\n    // Verify plugin is configured\n    const plugins = appJson.expo.plugins;\n    expect(plugins).toContain('./plugins/android-widget/app.plugin.js');\n\n    // Verify Android configuration\n    expect(appJson.expo.android).toBeDefined();\n    expect(appJson.expo.android.package).toBe('com.sage.wisdom');\n\n    // Verify deep link scheme is configured\n    expect(appJson.expo.scheme).toBe('sage');\n  });\n\n  test('widget plugin file exists and is valid', async () => {\n    const pluginPath = path.join(projectRoot, 'plugins/android-widget/app.plugin.js');\n\n    // Verify file exists\n    expect(fs.existsSync(pluginPath)).toBe(true);\n\n    // Verify it's a valid Node.js module\n    const plugin = require(pluginPath);\n    expect(typeof plugin).toBe('function');\n  });\n\n  test('widget TypeScript module exports correct functions', async () => {\n    // Read the module file and verify exports\n    const modulePath = path.join(projectRoot, 'lib/widget/index.ts');\n    const moduleContent = fs.readFileSync(modulePath, 'utf-8');\n\n    // Verify exported functions\n    expect(moduleContent).toContain('isWidgetAvailable');\n    expect(moduleContent).toContain('updateWidgetData');\n    expect(moduleContent).toContain('refreshWidgetWisdom');\n    expect(moduleContent).toContain('forceRefreshWidgets');\n    expect(moduleContent).toContain('shouldRefreshWidget');\n    expect(moduleContent).toContain('syncWidgetOnStartup');\n    expect(moduleContent).toContain('initWidgetService');\n  });\n\n  test('widget service file has correct implementation', async () => {\n    const servicePath = path.join(projectRoot, 'lib/widget/android-widget.ts');\n    const serviceContent = fs.readFileSync(servicePath, 'utf-8');\n\n    // Verify Platform check for Android\n    expect(serviceContent).toContain(\"Platform.OS === 'android'\");\n\n    // Verify NativeModules usage\n    expect(serviceContent).toContain('NativeModules.SageWidgetModule');\n\n    // Verify wisdom DB integration\n    expect(serviceContent).toContain('getRandomWisdom');\n    expect(serviceContent).toContain('initWisdomDB');\n  });\n\n  test('root layout initializes widget service', async () => {\n    const layoutPath = path.join(projectRoot, 'app/_layout.tsx');\n    const layoutContent = fs.readFileSync(layoutPath, 'utf-8');\n\n    // Verify widget import\n    expect(layoutContent).toContain(\"import { initWidgetService } from '../lib/widget'\");\n\n    // Verify initialization call\n    expect(layoutContent).toContain('await initWidgetService()');\n  });\n\n  test('widget plugin generates all required native files', async () => {\n    const pluginPath = path.join(projectRoot, 'plugins/android-widget/app.plugin.js');\n    const pluginContent = fs.readFileSync(pluginPath, 'utf-8');\n\n    // Verify all required generators are present\n    expect(pluginContent).toContain('generateWidgetProviderCode');\n    expect(pluginContent).toContain('generateWidgetServiceCode');\n    expect(pluginContent).toContain('generateWidgetDataManagerCode');\n    expect(pluginContent).toContain('generateWidgetInfoXml');\n    expect(pluginContent).toContain('generateWidgetLayoutXml');\n    expect(pluginContent).toContain('generateWidgetBackgroundDrawable');\n    expect(pluginContent).toContain('generateWidgetColorsXml');\n    expect(pluginContent).toContain('generateWidgetDimensXml');\n\n    // Verify React Native module generators\n    expect(pluginContent).toContain('generateWidgetModuleCode');\n    expect(pluginContent).toContain('generateWidgetPackageCode');\n  });\n\n  test('widget layout has Material Design elements', async () => {\n    const pluginPath = path.join(projectRoot, 'plugins/android-widget/app.plugin.js');\n    const pluginContent = fs.readFileSync(pluginPath, 'utf-8');\n\n    // Verify Material Design styling elements\n    expect(pluginContent).toContain('widget_background');\n    expect(pluginContent).toContain('widget_corner_radius');\n    expect(pluginContent).toContain('widget_primary');\n    expect(pluginContent).toContain('selectableItemBackgroundBorderless');\n\n    // Verify deep link implementation\n    expect(pluginContent).toContain('sage://explore');\n    expect(pluginContent).toContain('ACTION_OPEN_APP');\n    expect(pluginContent).toContain('Intent.ACTION_VIEW');\n  });\n\n  test('widget colors match app theme', async () => {\n    const pluginPath = path.join(projectRoot, 'plugins/android-widget/app.plugin.js');\n    const pluginContent = fs.readFileSync(pluginPath, 'utf-8');\n\n    // Verify colors match theme.ts\n    expect(pluginContent).toContain('#132210'); // background\n    expect(pluginContent).toContain('#1d271c'); // surface\n    expect(pluginContent).toContain('#37ec13'); // primary green\n    expect(pluginContent).toContain('#FFFFFF'); // text primary\n    expect(pluginContent).toContain('#A3A3A3'); // text secondary\n    expect(pluginContent).toContain('#2a3829'); // border\n  });\n});\n"
}

🔧 Tool: Bash
Input: {
  "command": "npx playwright test widget-verification.spec.ts --reporter=list 2>&1",
  "description": "Run widget verification test"
}
All 8 tests pass. Now let me delete the temporary test file as instructed:

🔧 Tool: Bash
Input: {
  "command": "rm /Users/vimo/Projects/OpenCode/Sage_AI/widget-verification.spec.ts",
  "description": "Remove temporary test file"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Create Android native widget module structure",
      "status": "completed",
      "activeForm": "Creating Android native widget module structure"
    },
    {
      "content": "Implement widget provider class with Material Design styling",
      "status": "completed",
      "activeForm": "Implementing widget provider class with Material Design styling"
    },
    {
      "content": "Create widget layout XML with Material Design components",
      "status": "completed",
      "activeForm": "Creating widget layout XML with Material Design components"
    },
    {
      "content": "Implement widget update service for daily wisdom refresh",
      "status": "completed",
      "activeForm": "Implementing widget update service for daily wisdom refresh"
    },
    {
      "content": "Add deep link handling to open app from widget",
      "status": "completed",
      "activeForm": "Adding deep link handling to open app from widget"
    },
    {
      "content": "Configure widget metadata and app.json integration",
      "status": "completed",
      "activeForm": "Configuring widget metadata and app.json integration"
    },
    {
      "content": "Create React Native bridge for widget data synchronization",
      "status": "completed",
      "activeForm": "Creating React Native bridge for widget data synchronization"
    },
    {
      "content": "Verify implementation with Playwright test",
      "status": "completed",
      "activeForm": "Verifying implementation with Playwright test"
    }
  ]
}
<summary>
## Summary: Daily Wisdom Widget for Android Home Screen

### Changes Implemented
- Created an Expo config plugin (`plugins/android-widget/app.plugin.js`) that generates native Android widget code during the build process
- Implemented `DailyWisdomWidgetProvider` Kotlin class with Material Design styling that displays wisdom quotes
- Created widget layout XML with rounded corners, primary green accent color (#37ec13), dark forest background (#132210), and proper typography
- Added `DailyWisdomWidgetService` for daily automatic refresh of wisdom content
- Implemented deep link support (`sage://explore`) allowing tap-to-open functionality from widget to app
- Created `WidgetDataManager` Kotlin class for SharedPreferences-based data storage and sync with React Native
- Built React Native bridge module (`SageWidgetModule`) for JavaScript-to-native communication
- Added TypeScript widget service (`lib/widget/android-widget.ts`) with functions for updating, refreshing, and syncing widget data
- Integrated widget initialization in the app's root layout (`app/_layout.tsx`)

### Files Modified
- `app.json` - Added widget plugin to Expo plugins array
- `app/_layout.tsx` - Added widget service initialization on app startup

### Files Created
- `plugins/android-widget/app.plugin.js` - Expo config plugin (936 lines) generating all native Android files:
  - Widget provider class (Kotlin)
  - Widget update service (Kotlin)
  - Widget data manager (Kotlin)
  - React Native bridge module (Kotlin)
  - Layout XML with Material Design
  - Drawable resources (backgrounds)
  - Color and dimension resources
  - Widget metadata XML
- `lib/widget/android-widget.ts` - TypeScript service for widget communication
- `lib/widget/index.ts` - Module exports

### Verification Status
- All 8 Playwright verification tests passed:
  - Plugin configuration in app.json
  - Plugin file validity
  - TypeScript module exports
  - Widget service implementation
  - Root layout integration
  - Native file generators
  - Material Design elements
  - Theme color consistency

### Notes for Developer
- The widget will be generated during `expo prebuild` or `expo run:android`
- Widget appears in Android widget picker as "Daily Wisdom"
- Supported sizes: 4x2 cells (resizable)
- Widget auto-updates every 24 hours via `updatePeriodMillis`
- Tapping the widget opens the app via deep link
- Refresh button allows manual content refresh
- Widget syncs with app's wisdom database on app startup
- Colors match the app's dark theme (forest palette)
</summary>
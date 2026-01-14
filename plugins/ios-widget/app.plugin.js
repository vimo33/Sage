/**
 * Expo Config Plugin for iOS Daily Wisdom Widget
 *
 * This plugin generates the necessary iOS native files for a home screen widget
 * that displays daily wisdom quotes using WidgetKit (iOS 14+).
 */

const {
  withXcodeProject,
  withEntitlementsPlist,
  withInfoPlist,
  withDangerousMod,
  withPlugins,
  IOSConfig,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const WIDGET_EXTENSION_NAME = 'DailyWisdomWidget';
const WIDGET_BUNDLE_ID_SUFFIX = 'DailyWisdomWidget';
const APP_GROUP_IDENTIFIER = 'group.com.sage.wisdom.shared';

/**
 * Get the bundle identifier from config
 */
function getBundleIdentifier(config) {
  return config.ios?.bundleIdentifier || 'com.sage.wisdom';
}

/**
 * Get the widget bundle identifier
 */
function getWidgetBundleIdentifier(config) {
  return `${getBundleIdentifier(config)}.${WIDGET_BUNDLE_ID_SUFFIX}`;
}

/**
 * Add App Groups entitlement to main app
 */
function withAppGroupsEntitlement(config) {
  return withEntitlementsPlist(config, (config) => {
    config.modResults['com.apple.security.application-groups'] = [APP_GROUP_IDENTIFIER];
    return config;
  });
}

/**
 * Add widget extension target to Xcode project
 */
function withWidgetExtension(config) {
  return withXcodeProject(config, async (config) => {
    const xcodeProject = config.modResults;
    const bundleIdentifier = getBundleIdentifier(config);
    const widgetBundleIdentifier = getWidgetBundleIdentifier(config);
    const projectName = config.modRequest.projectName || 'Sage';

    // Get the main target
    const mainTarget = xcodeProject.getFirstTarget();
    if (!mainTarget) {
      console.warn('[iOS Widget] Could not find main target');
      return config;
    }

    // Check if widget extension already exists
    const existingTarget = xcodeProject.pbxTargetByName(WIDGET_EXTENSION_NAME);
    if (existingTarget) {
      console.log('[iOS Widget] Widget extension already exists');
      return config;
    }

    // Add widget extension target
    const widgetTarget = xcodeProject.addTarget(
      WIDGET_EXTENSION_NAME,
      'app_extension',
      WIDGET_EXTENSION_NAME,
      widgetBundleIdentifier
    );

    if (!widgetTarget) {
      console.warn('[iOS Widget] Failed to add widget target');
      return config;
    }

    // Add widget extension group
    const widgetGroup = xcodeProject.addPbxGroup(
      [
        'DailyWisdomWidget.swift',
        'DailyWisdomWidgetBundle.swift',
        'WidgetDataManager.swift',
        'Info.plist',
        'DailyWisdomWidget.entitlements',
        'Assets.xcassets',
      ],
      WIDGET_EXTENSION_NAME,
      WIDGET_EXTENSION_NAME
    );

    // Add widget group to main group
    const mainGroup = xcodeProject.getFirstProject().firstProject.mainGroup;
    xcodeProject.addToPbxGroup(widgetGroup.uuid, mainGroup);

    // Add source files to widget target
    const widgetSourceFiles = [
      'DailyWisdomWidget.swift',
      'DailyWisdomWidgetBundle.swift',
      'WidgetDataManager.swift',
    ];

    widgetSourceFiles.forEach((file) => {
      xcodeProject.addSourceFile(
        `${WIDGET_EXTENSION_NAME}/${file}`,
        { target: widgetTarget.uuid },
        widgetGroup.uuid
      );
    });

    // Add resources to widget target
    xcodeProject.addResourceFile(
      `${WIDGET_EXTENSION_NAME}/Assets.xcassets`,
      { target: widgetTarget.uuid },
      widgetGroup.uuid
    );

    // Set build settings for widget extension
    const buildConfigurations = xcodeProject.pbxXCBuildConfigurationSection();
    Object.keys(buildConfigurations).forEach((key) => {
      const config = buildConfigurations[key];
      if (config.buildSettings && config.name) {
        // Find configurations for the widget target
        if (
          config.buildSettings.PRODUCT_BUNDLE_IDENTIFIER === widgetBundleIdentifier ||
          config.buildSettings.PRODUCT_NAME === WIDGET_EXTENSION_NAME
        ) {
          config.buildSettings.INFOPLIST_FILE = `${WIDGET_EXTENSION_NAME}/Info.plist`;
          config.buildSettings.CODE_SIGN_ENTITLEMENTS = `${WIDGET_EXTENSION_NAME}/DailyWisdomWidget.entitlements`;
          config.buildSettings.LD_RUNPATH_SEARCH_PATHS = '"$(inherited) @executable_path/../../Frameworks"';
          config.buildSettings.SWIFT_VERSION = '5.0';
          config.buildSettings.TARGETED_DEVICE_FAMILY = '"1,2"';
          config.buildSettings.IPHONEOS_DEPLOYMENT_TARGET = '14.0';
          config.buildSettings.MARKETING_VERSION = '1.0';
          config.buildSettings.CURRENT_PROJECT_VERSION = '1';
          config.buildSettings.GENERATE_INFOPLIST_FILE = 'YES';
          config.buildSettings.ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = 'AccentColor';
          config.buildSettings.ASSETCATALOG_COMPILER_WIDGET_BACKGROUND_COLOR_NAME = 'WidgetBackground';
        }
      }
    });

    // Add widget extension to main app's embed frameworks
    xcodeProject.addBuildPhase(
      [],
      'PBXCopyFilesBuildPhase',
      'Embed App Extensions',
      mainTarget.uuid,
      'app_extension'
    );

    return config;
  });
}

/**
 * Generate widget extension source files
 */
function withWidgetSourceFiles(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const platformRoot = config.modRequest.platformProjectRoot;
      const bundleIdentifier = getBundleIdentifier(config);

      // Create widget extension directory
      const widgetDir = path.join(platformRoot, WIDGET_EXTENSION_NAME);
      fs.mkdirSync(widgetDir, { recursive: true });

      // Create Assets.xcassets directory
      const assetsDir = path.join(widgetDir, 'Assets.xcassets');
      fs.mkdirSync(assetsDir, { recursive: true });

      // Generate source files
      const widgetSwift = generateWidgetSwiftCode();
      fs.writeFileSync(path.join(widgetDir, 'DailyWisdomWidget.swift'), widgetSwift);

      const bundleSwift = generateWidgetBundleSwiftCode();
      fs.writeFileSync(path.join(widgetDir, 'DailyWisdomWidgetBundle.swift'), bundleSwift);

      const dataManagerSwift = generateDataManagerSwiftCode();
      fs.writeFileSync(path.join(widgetDir, 'WidgetDataManager.swift'), dataManagerSwift);

      // Generate Info.plist
      const infoPlist = generateInfoPlist(bundleIdentifier);
      fs.writeFileSync(path.join(widgetDir, 'Info.plist'), infoPlist);

      // Generate entitlements
      const entitlements = generateEntitlements();
      fs.writeFileSync(path.join(widgetDir, 'DailyWisdomWidget.entitlements'), entitlements);

      // Generate Assets.xcassets Contents.json
      const assetsContents = generateAssetsContents();
      fs.writeFileSync(path.join(assetsDir, 'Contents.json'), assetsContents);

      // Generate AccentColor.colorset
      const accentColorDir = path.join(assetsDir, 'AccentColor.colorset');
      fs.mkdirSync(accentColorDir, { recursive: true });
      const accentColorContents = generateAccentColor();
      fs.writeFileSync(path.join(accentColorDir, 'Contents.json'), accentColorContents);

      // Generate WidgetBackground.colorset
      const widgetBgDir = path.join(assetsDir, 'WidgetBackground.colorset');
      fs.mkdirSync(widgetBgDir, { recursive: true });
      const widgetBgContents = generateWidgetBackground();
      fs.writeFileSync(path.join(widgetBgDir, 'Contents.json'), widgetBgContents);

      return config;
    },
  ]);
}

/**
 * Generate the main widget Swift code
 */
function generateWidgetSwiftCode() {
  return `//
//  DailyWisdomWidget.swift
//  DailyWisdomWidget
//
//  Daily wisdom widget for iOS home screen
//

import WidgetKit
import SwiftUI
import Intents

// MARK: - Timeline Provider

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> WisdomEntry {
        WisdomEntry(
            date: Date(),
            wisdom: WisdomData(
                content: "You have the right to work, but never to the fruit of work.",
                sourceRef: "Bhagavad Gita 2.47",
                book: "Bhagavad Gita",
                id: "placeholder"
            )
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (WisdomEntry) -> Void) {
        let wisdom = WidgetDataManager.shared.getDailyWisdom()
        let entry = WisdomEntry(date: Date(), wisdom: wisdom)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<WisdomEntry>) -> Void) {
        let wisdom = WidgetDataManager.shared.getDailyWisdom()
        let entry = WisdomEntry(date: Date(), wisdom: wisdom)

        // Update at midnight
        let calendar = Calendar.current
        let tomorrow = calendar.startOfDay(for: calendar.date(byAdding: .day, value: 1, to: Date())!)

        let timeline = Timeline(entries: [entry], policy: .after(tomorrow))
        completion(timeline)
    }
}

// MARK: - Timeline Entry

struct WisdomEntry: TimelineEntry {
    let date: Date
    let wisdom: WisdomData
}

// MARK: - Widget Views

struct DailyWisdomWidgetEntryView: View {
    var entry: Provider.Entry
    @Environment(\\.widgetFamily) var family
    @Environment(\\.colorScheme) var colorScheme

    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.075, green: 0.133, blue: 0.063),
                    Color(red: 0.114, green: 0.153, blue: 0.110)
                ]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )

            VStack(alignment: .leading, spacing: 8) {
                // Badge
                HStack {
                    Text("DAILY WISDOM")
                        .font(.system(size: 10, weight: .bold))
                        .tracking(0.5)
                        .foregroundColor(Color(red: 0.216, green: 0.925, blue: 0.075))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(
                            RoundedRectangle(cornerRadius: 4)
                                .fill(Color(red: 0.216, green: 0.925, blue: 0.075).opacity(0.15))
                        )

                    Spacer()
                }

                Spacer()

                // Wisdom content
                Text(entry.wisdom.content)
                    .font(.system(size: contentFontSize, design: .serif))
                    .foregroundColor(.white)
                    .lineLimit(maxLines)
                    .lineSpacing(4)

                // Source
                Text("— " + entry.wisdom.sourceRef)
                    .font(.system(size: sourceFontSize, weight: .medium))
                    .foregroundColor(Color(red: 0.216, green: 0.925, blue: 0.075))
                    .italic()

                Spacer()

                // Tap hint
                if family != .systemSmall {
                    HStack {
                        Spacer()
                        Text("Tap to open Sage")
                            .font(.system(size: 10))
                            .foregroundColor(Color.white.opacity(0.5))
                        Spacer()
                    }
                }
            }
            .padding(16)
        }
        .widgetURL(URL(string: "sage://explore?id=\\(entry.wisdom.id)"))
    }

    private var contentFontSize: CGFloat {
        switch family {
        case .systemSmall:
            return 13
        case .systemMedium:
            return 15
        case .systemLarge:
            return 17
        case .systemExtraLarge:
            return 19
        @unknown default:
            return 15
        }
    }

    private var sourceFontSize: CGFloat {
        switch family {
        case .systemSmall:
            return 10
        case .systemMedium:
            return 12
        case .systemLarge:
            return 14
        case .systemExtraLarge:
            return 16
        @unknown default:
            return 12
        }
    }

    private var maxLines: Int {
        switch family {
        case .systemSmall:
            return 3
        case .systemMedium:
            return 3
        case .systemLarge:
            return 6
        case .systemExtraLarge:
            return 8
        @unknown default:
            return 4
        }
    }
}

// MARK: - Widget Configuration

struct DailyWisdomWidget: Widget {
    let kind: String = "DailyWisdomWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                DailyWisdomWidgetEntryView(entry: entry)
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                DailyWisdomWidgetEntryView(entry: entry)
            }
        }
        .configurationDisplayName("Daily Wisdom")
        .description("Get inspired with daily wisdom from ancient scriptures.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
        .contentMarginsDisabled()
    }
}

// MARK: - Preview

#Preview(as: .systemMedium) {
    DailyWisdomWidget()
} timeline: {
    WisdomEntry(
        date: .now,
        wisdom: WisdomData(
            content: "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward.",
            sourceRef: "Bhagavad Gita 2.47",
            book: "Bhagavad Gita",
            id: "preview"
        )
    )
}
`;
}

/**
 * Generate the widget bundle Swift code
 */
function generateWidgetBundleSwiftCode() {
  return `//
//  DailyWisdomWidgetBundle.swift
//  DailyWisdomWidget
//
//  Widget bundle entry point
//

import WidgetKit
import SwiftUI

@main
struct DailyWisdomWidgetBundle: WidgetBundle {
    var body: some Widget {
        DailyWisdomWidget()
    }
}
`;
}

/**
 * Generate the data manager Swift code
 */
function generateDataManagerSwiftCode() {
  return `//
//  WidgetDataManager.swift
//  DailyWisdomWidget
//
//  Manages data sharing between the main app and widget
//

import Foundation
import WidgetKit

// MARK: - Wisdom Data Model

struct WisdomData: Codable {
    let content: String
    let sourceRef: String
    let book: String
    let id: String

    static let placeholder = WisdomData(
        content: "You have the right to work, but never to the fruit of work.",
        sourceRef: "Bhagavad Gita 2.47",
        book: "Bhagavad Gita",
        id: "default"
    )
}

// MARK: - Widget Data Manager

class WidgetDataManager {
    static let shared = WidgetDataManager()

    private let appGroupIdentifier = "group.com.sage.wisdom.shared"
    private let wisdomKey = "daily_wisdom"
    private let lastUpdateKey = "last_update_date"

    private var sharedDefaults: UserDefaults? {
        UserDefaults(suiteName: appGroupIdentifier)
    }

    private let defaultWisdoms: [WisdomData] = [
        WisdomData(
            content: "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction.",
            sourceRef: "Bhagavad Gita 2.47",
            book: "Bhagavad Gita",
            id: "gita_2_47"
        ),
        WisdomData(
            content: "The mind is everything. What you think you become.",
            sourceRef: "Dhammapada",
            book: "Buddhist Teachings",
            id: "dhammapada_1"
        ),
        WisdomData(
            content: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
            sourceRef: "Bhagavad Gita 6.19",
            book: "Bhagavad Gita",
            id: "gita_6_19"
        ),
        WisdomData(
            content: "Peace comes from within. Do not seek it without.",
            sourceRef: "Buddha",
            book: "Buddhist Teachings",
            id: "buddha_peace"
        ),
        WisdomData(
            content: "The Self is not born, nor does it die. It has not come from anywhere, and it has not become anything.",
            sourceRef: "Katha Upanishad",
            book: "Upanishads",
            id: "katha_1"
        ),
        WisdomData(
            content: "Yoga is the journey of the self, through the self, to the self.",
            sourceRef: "Bhagavad Gita 6.5",
            book: "Bhagavad Gita",
            id: "gita_6_5"
        ),
        WisdomData(
            content: "As the heat of a fire reduces wood to ashes, the fire of knowledge burns to ashes all karma.",
            sourceRef: "Bhagavad Gita 4.37",
            book: "Bhagavad Gita",
            id: "gita_4_37"
        )
    ]

    private init() {}

    /// Get the current daily wisdom
    func getDailyWisdom() -> WisdomData {
        // Try to get stored wisdom
        if let data = sharedDefaults?.data(forKey: wisdomKey),
           let wisdom = try? JSONDecoder().decode(WisdomData.self, from: data) {
            return wisdom
        }

        // Return a random default wisdom
        return defaultWisdoms.randomElement() ?? WisdomData.placeholder
    }

    /// Update the daily wisdom from the main app
    func updateDailyWisdom(_ wisdom: WisdomData) {
        guard let defaults = sharedDefaults else { return }

        if let data = try? JSONEncoder().encode(wisdom) {
            defaults.set(data, forKey: wisdomKey)
            defaults.set(currentDateString(), forKey: lastUpdateKey)
            defaults.synchronize()
        }

        // Reload widget timelines
        WidgetCenter.shared.reloadAllTimelines()
    }

    /// Check if widget should be refreshed
    func shouldRefresh() -> Bool {
        guard let lastUpdate = sharedDefaults?.string(forKey: lastUpdateKey) else {
            return true
        }
        return lastUpdate != currentDateString()
    }

    /// Force refresh all widgets
    func refreshWidgets() {
        WidgetCenter.shared.reloadAllTimelines()
    }

    private func currentDateString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: Date())
    }
}

// MARK: - React Native Bridge Support

extension WidgetDataManager {
    /// Update wisdom from React Native (JSON string)
    func updateFromReactNative(jsonString: String) {
        guard let data = jsonString.data(using: .utf8),
              let wisdom = try? JSONDecoder().decode(WisdomData.self, from: data) else {
            return
        }
        updateDailyWisdom(wisdom)
    }
}
`;
}

/**
 * Generate Info.plist for widget extension
 */
function generateInfoPlist(bundleIdentifier) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>Daily Wisdom</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
    <key>CFBundleShortVersionString</key>
    <string>$(MARKETING_VERSION)</string>
    <key>CFBundleVersion</key>
    <string>$(CURRENT_PROJECT_VERSION)</string>
    <key>NSExtension</key>
    <dict>
        <key>NSExtensionPointIdentifier</key>
        <string>com.apple.widgetkit-extension</string>
    </dict>
</dict>
</plist>
`;
}

/**
 * Generate entitlements file for widget extension
 */
function generateEntitlements() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.application-groups</key>
    <array>
        <string>${APP_GROUP_IDENTIFIER}</string>
    </array>
</dict>
</plist>
`;
}

/**
 * Generate Assets.xcassets Contents.json
 */
function generateAssetsContents() {
  return `{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`;
}

/**
 * Generate AccentColor.colorset Contents.json
 */
function generateAccentColor() {
  return `{
  "colors" : [
    {
      "color" : {
        "color-space" : "srgb",
        "components" : {
          "alpha" : "1.000",
          "blue" : "0.075",
          "green" : "0.925",
          "red" : "0.216"
        }
      },
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`;
}

/**
 * Generate WidgetBackground.colorset Contents.json
 */
function generateWidgetBackground() {
  return `{
  "colors" : [
    {
      "color" : {
        "color-space" : "srgb",
        "components" : {
          "alpha" : "1.000",
          "blue" : "0.063",
          "green" : "0.133",
          "red" : "0.075"
        }
      },
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
`;
}

/**
 * Main plugin function
 */
function withIOSWidget(config) {
  return withPlugins(config, [
    withAppGroupsEntitlement,
    withWidgetSourceFiles,
    withWidgetExtension,
  ]);
}

module.exports = withIOSWidget;

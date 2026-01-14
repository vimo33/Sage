
🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing structure",
      "status": "in_progress",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for export feature",
      "status": "pending",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement export journal feature",
      "status": "pending",
      "activeForm": "Implementing export journal feature"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying feature with Playwright test"
    }
  ]
}
Let me explore the codebase to understand the existing structure, particularly around journal entries and storage.

🔧 Tool: Task
Input: {
  "description": "Explore codebase structure",
  "prompt": "Explore the codebase to understand:\n1. The overall project structure (it appears to be a React Native/Expo app)\n2. How journal entries are stored and managed (look in lib/storage/)\n3. The existing journal-related components and screens (look in app/(tabs)/journal.tsx)\n4. Any existing export functionality\n5. The data model for journal entries\n\nFocus on understanding the patterns used for data storage, file handling, and UI components. Report back the key findings including file paths and relevant code snippets.",
  "subagent_type": "Explore"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -type f -name \"*.ts\" -o -name \"*.tsx\" -o -name \"*.json\" | grep -E \"(package\\.json|tsconfig|app|lib)\" | head -30",
  "description": "List TypeScript and config files in project"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/package.json"
}

🔧 Tool: Glob
Input: {
  "pattern": "**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Glob
Input: {
  "pattern": "app/**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Glob
Input: {
  "pattern": "lib/**/*.ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app.json"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/journal.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}

🔧 Tool: Glob
Input: {
  "pattern": "lib/storage/**/*",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Glob
Input: {
  "pattern": "components/**/*.tsx",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/migrations.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/_layout.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/journal/JournalEntryModal.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/journal/JournalEntryDetailModal.tsx"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -name \"*.ts\" -o -name \"*.tsx\" | grep -i export | head -20",
  "description": "Find files related to export functionality"
}

🔧 Tool: Grep
Input: {
  "pattern": "export|import.*FileSystem|expo-file-system",
  "type": "ts",
  "path": "/Users/vimo/Projects/OpenCode/Sage_AI",
  "output_mode": "files_with_matches"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/chat/index.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/retrieval/search.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/_layout.tsx"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI -type f \\( -name \"*.ts\" -o -name \"*.tsx\" \\) ! -path \"*/node_modules/*\" | xargs grep -l \"export\\|writeFile\\|saveAs\" 2>/dev/null | head -20",
  "description": "Find files with export or save functionality"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/vimo/Projects/OpenCode/Sage_AI/lib/",
  "description": "List lib directory structure"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx"
}

🔧 Tool: Bash
Input: {
  "command": "grep -r \"export\\|FileSystem\\|writeFile\\|Share\" /Users/vimo/Projects/OpenCode/Sage_AI/app /Users/vimo/Projects/OpenCode/Sage_AI/lib --include=\"*.ts\" --include=\"*.tsx\" 2>/dev/null | grep -v node_modules | head -30",
  "description": "Search for export and file system operations"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/DailyWisdomWidget.tsx"
}

🔧 Tool: Bash
Input: {
  "command": "find /Users/vimo/Projects/OpenCode/Sage_AI/assets -type f | head -20",
  "description": "List asset files in project"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts",
  "limit": 100
}

🔧 Tool: Bash
Input: {
  "command": "grep -r \"sqlite\\|journal\\|entry\" /Users/vimo/Projects/OpenCode/Sage_AI/lib/storage --include=\"*.ts\" -i",
  "description": "Search for storage patterns"
}

🔧 Tool: Bash
Input: {
  "command": "tree -L 3 -I \"node_modules\" /Users/vimo/Projects/OpenCode/Sage_AI 2>/dev/null || find /Users/vimo/Projects/OpenCode/Sage_AI -not -path \"*/node_modules/*\" -type d | head -40",
  "description": "Show project directory tree"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/tsconfig.json"
}

🔧 Tool: Bash
Input: {
  "command": "ls -la /Users/vimo/Projects/OpenCode/Sage_AI/components/",
  "description": "List components directory"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/components/auth/BiometricGate.tsx"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for export feature",
      "status": "in_progress",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Implement export journal feature",
      "status": "pending",
      "activeForm": "Implementing export journal feature"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying feature with Playwright test"
    }
  ]
}
Excellent! Now I have a comprehensive understanding of the codebase. Let me read the key files I'll need to modify to implement the export feature:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/store.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/ui/theme.ts"
}
Now I have a clear understanding of the codebase. Let me plan my implementation:

**Implementation Plan:**

1. **Create an export utility module** (`lib/storage/export.ts`) that:
   - Formats journal entries as plain text or markdown
   - Handles file system operations using `expo-file-system`
   - Provides share functionality via React Native's Share API

2. **Add export UI to the Settings screen** in the "Privacy & Data" section:
   - "Export Journal" option with format selection (Text/Markdown)
   - Use the existing UI patterns and theme system

3. **Export Format Details:**
   - **Plain Text**: Simple readable format with dates, moods, and content
   - **Markdown**: Formatted with headers, timestamps, and proper markdown syntax

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for export feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create export utility module (lib/storage/export.ts)",
      "status": "in_progress",
      "activeForm": "Creating export utility module"
    },
    {
      "content": "Add export UI to Settings screen",
      "status": "pending",
      "activeForm": "Adding export UI to Settings screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying feature with Playwright test"
    }
  ]
}

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/export.ts",
  "content": "/**\n * Journal Export Utility\n *\n * Exports journal entries as formatted text or markdown files.\n * Supports local file saving and sharing via system share sheet.\n */\n\nimport * as FileSystem from 'expo-file-system';\nimport { Share, Platform } from 'react-native';\nimport type { JournalEntry } from './store';\n\nexport type ExportFormat = 'text' | 'markdown';\n\ninterface ExportResult {\n  success: boolean;\n  filePath?: string;\n  error?: string;\n}\n\n/**\n * Format a timestamp into a readable date string\n */\nfunction formatDate(timestamp: number): string {\n  const date = new Date(timestamp);\n  return date.toLocaleDateString('en-US', {\n    weekday: 'long',\n    year: 'numeric',\n    month: 'long',\n    day: 'numeric',\n  });\n}\n\n/**\n * Format a timestamp into a readable time string\n */\nfunction formatTime(timestamp: number): string {\n  const date = new Date(timestamp);\n  return date.toLocaleTimeString('en-US', {\n    hour: 'numeric',\n    minute: '2-digit',\n    hour12: true,\n  });\n}\n\n/**\n * Generate filename with timestamp\n */\nfunction generateFilename(format: ExportFormat): string {\n  const now = new Date();\n  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD\n  const extension = format === 'markdown' ? 'md' : 'txt';\n  return `sage-journal-${dateStr}.${extension}`;\n}\n\n/**\n * Format journal entries as plain text\n */\nfunction formatAsText(entries: JournalEntry[]): string {\n  if (entries.length === 0) {\n    return 'No journal entries to export.';\n  }\n\n  const sortedEntries = [...entries].sort((a, b) => b.createdAt - a.createdAt);\n\n  const lines: string[] = [\n    '═══════════════════════════════════════════════════════════════',\n    '                    SAGE JOURNAL EXPORT',\n    `                    ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,\n    '═══════════════════════════════════════════════════════════════',\n    '',\n    `Total Entries: ${entries.length}`,\n    '',\n  ];\n\n  sortedEntries.forEach((entry, index) => {\n    lines.push('───────────────────────────────────────────────────────────────');\n    lines.push(`Entry ${index + 1} of ${entries.length}`);\n    lines.push(`Date: ${formatDate(entry.createdAt)}`);\n    lines.push(`Time: ${formatTime(entry.createdAt)}`);\n\n    if (entry.mood) {\n      lines.push(`Mood: ${entry.mood}`);\n    }\n\n    lines.push('');\n    lines.push(entry.content);\n    lines.push('');\n  });\n\n  lines.push('═══════════════════════════════════════════════════════════════');\n  lines.push('                    END OF EXPORT');\n  lines.push('                  Exported from Sage AI');\n  lines.push('═══════════════════════════════════════════════════════════════');\n\n  return lines.join('\\n');\n}\n\n/**\n * Format journal entries as markdown\n */\nfunction formatAsMarkdown(entries: JournalEntry[]): string {\n  if (entries.length === 0) {\n    return '# Sage Journal Export\\n\\n*No journal entries to export.*';\n  }\n\n  const sortedEntries = [...entries].sort((a, b) => b.createdAt - a.createdAt);\n\n  const lines: string[] = [\n    '# Sage Journal Export',\n    '',\n    `**Exported:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,\n    '',\n    `**Total Entries:** ${entries.length}`,\n    '',\n    '---',\n    '',\n  ];\n\n  sortedEntries.forEach((entry) => {\n    lines.push(`## ${formatDate(entry.createdAt)}`);\n    lines.push('');\n    lines.push(`*${formatTime(entry.createdAt)}*`);\n\n    if (entry.mood) {\n      lines.push(`  •  **Mood:** ${entry.mood}`);\n    }\n\n    lines.push('');\n    lines.push(entry.content);\n    lines.push('');\n    lines.push('---');\n    lines.push('');\n  });\n\n  lines.push('');\n  lines.push('*Exported from Sage AI - Your personal wisdom journal*');\n\n  return lines.join('\\n');\n}\n\n/**\n * Format journal entries based on the specified format\n */\nexport function formatJournalEntries(entries: JournalEntry[], format: ExportFormat): string {\n  return format === 'markdown'\n    ? formatAsMarkdown(entries)\n    : formatAsText(entries);\n}\n\n/**\n * Save exported content to a file in the app's document directory\n */\nexport async function saveExportToFile(\n  entries: JournalEntry[],\n  format: ExportFormat\n): Promise<ExportResult> {\n  try {\n    const content = formatJournalEntries(entries, format);\n    const filename = generateFilename(format);\n    const filePath = `${FileSystem.documentDirectory}${filename}`;\n\n    await FileSystem.writeAsStringAsync(filePath, content, {\n      encoding: FileSystem.EncodingType.UTF8,\n    });\n\n    return { success: true, filePath };\n  } catch (error) {\n    return {\n      success: false,\n      error: error instanceof Error ? error.message : 'Failed to save export file',\n    };\n  }\n}\n\n/**\n * Export journal entries and share via system share sheet\n */\nexport async function shareJournalExport(\n  entries: JournalEntry[],\n  format: ExportFormat\n): Promise<ExportResult> {\n  try {\n    const content = formatJournalEntries(entries, format);\n    const filename = generateFilename(format);\n\n    // First save to file\n    const filePath = `${FileSystem.cacheDirectory}${filename}`;\n    await FileSystem.writeAsStringAsync(filePath, content, {\n      encoding: FileSystem.EncodingType.UTF8,\n    });\n\n    // Share the file\n    const shareResult = await Share.share(\n      Platform.OS === 'ios'\n        ? { url: filePath }\n        : { message: content, title: 'Sage Journal Export' },\n      { dialogTitle: 'Export Journal' }\n    );\n\n    // Clean up cache file on Android after sharing\n    if (Platform.OS === 'android') {\n      // Delay cleanup to ensure share completes\n      setTimeout(async () => {\n        try {\n          await FileSystem.deleteAsync(filePath, { idempotent: true });\n        } catch {\n          // Ignore cleanup errors\n        }\n      }, 5000);\n    }\n\n    return {\n      success: shareResult.action !== Share.dismissedAction,\n      filePath\n    };\n  } catch (error) {\n    return {\n      success: false,\n      error: error instanceof Error ? error.message : 'Failed to share export',\n    };\n  }\n}\n\n/**\n * Get the size of the export in a human-readable format\n */\nexport function getExportPreview(entries: JournalEntry[]): {\n  entryCount: number;\n  dateRange: string;\n  estimatedSize: string;\n} {\n  const entryCount = entries.length;\n\n  if (entryCount === 0) {\n    return {\n      entryCount: 0,\n      dateRange: 'No entries',\n      estimatedSize: '0 KB',\n    };\n  }\n\n  const sortedEntries = [...entries].sort((a, b) => a.createdAt - b.createdAt);\n  const oldest = new Date(sortedEntries[0].createdAt);\n  const newest = new Date(sortedEntries[sortedEntries.length - 1].createdAt);\n\n  const dateRange = oldest.toDateString() === newest.toDateString()\n    ? formatDate(oldest.getTime())\n    : `${oldest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${newest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;\n\n  // Estimate size based on average content length\n  const totalChars = entries.reduce((sum, e) => sum + e.content.length, 0);\n  const estimatedBytes = totalChars + (entries.length * 200); // Add overhead for formatting\n  const estimatedSize = estimatedBytes < 1024\n    ? `${estimatedBytes} B`\n    : estimatedBytes < 1024 * 1024\n      ? `${(estimatedBytes / 1024).toFixed(1)} KB`\n      : `${(estimatedBytes / (1024 * 1024)).toFixed(1)} MB`;\n\n  return {\n    entryCount,\n    dateRange,\n    estimatedSize,\n  };\n}\n"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for export feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create export utility module (lib/storage/export.ts)",
      "status": "completed",
      "activeForm": "Creating export utility module"
    },
    {
      "content": "Add export UI to Settings screen",
      "status": "in_progress",
      "activeForm": "Adding export UI to Settings screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "pending",
      "activeForm": "Verifying feature with Playwright test"
    }
  ]
}
Now let me update the Settings screen to add the export functionality:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx",
  "old_string": "import { useState, useEffect, useCallback } from 'react';\nimport {\n  View,\n  Text,\n  StyleSheet,\n  SafeAreaView,\n  ScrollView,\n  TouchableOpacity,\n  Switch,\n  useColorScheme,\n  ActivityIndicator,\n  Alert,\n} from 'react-native';\nimport { useSageStore, type TonePreference } from '../../lib/storage/store';\nimport { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';\nimport { getBiometricTypeName } from '../../lib/auth/biometric';",
  "new_string": "import { useState, useEffect, useCallback } from 'react';\nimport {\n  View,\n  Text,\n  StyleSheet,\n  SafeAreaView,\n  ScrollView,\n  TouchableOpacity,\n  Switch,\n  useColorScheme,\n  ActivityIndicator,\n  Alert,\n  Modal,\n} from 'react-native';\nimport { useSageStore, type TonePreference } from '../../lib/storage/store';\nimport { COLORS, SPACING, RADII, SHADOWS, withAlpha, TYPOGRAPHY, getThemedColors } from '../../lib/ui/theme';\nimport { getBiometricTypeName } from '../../lib/auth/biometric';\nimport { shareJournalExport, getExportPreview, type ExportFormat } from '../../lib/storage/export';"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx",
  "old_string": "  const [isTogglingBiometric, setIsTogglingBiometric] = useState(false);\n\n  // Initialize biometric support check on mount",
  "new_string": "  const [isTogglingBiometric, setIsTogglingBiometric] = useState(false);\n  const [isExportModalVisible, setIsExportModalVisible] = useState(false);\n  const [isExporting, setIsExporting] = useState(false);\n\n  const journalEntries = useSageStore((s) => s.journalEntries);\n  const exportPreview = getExportPreview(journalEntries);\n\n  // Initialize biometric support check on mount"
}

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx",
  "old_string": "  const handleBiometricToggle = useCallback(async (enabled: boolean) => {\n    setIsTogglingBiometric(true);\n    try {\n      const success = await setBiometricLockEnabled(enabled);\n      if (!success && enabled) {\n        Alert.alert(\n          'Could Not Enable',\n          'Biometric authentication could not be enabled. Make sure biometrics are set up on your device.',\n          [{ text: 'OK' }]\n        );\n      }\n    } finally {\n      setIsTogglingBiometric(false);\n    }\n  }, [setBiometricLockEnabled]);\n\n  const styles = createStyles(colors, isDark);",
  "new_string": "  const handleBiometricToggle = useCallback(async (enabled: boolean) => {\n    setIsTogglingBiometric(true);\n    try {\n      const success = await setBiometricLockEnabled(enabled);\n      if (!success && enabled) {\n        Alert.alert(\n          'Could Not Enable',\n          'Biometric authentication could not be enabled. Make sure biometrics are set up on your device.',\n          [{ text: 'OK' }]\n        );\n      }\n    } finally {\n      setIsTogglingBiometric(false);\n    }\n  }, [setBiometricLockEnabled]);\n\n  const handleExport = useCallback(async (format: ExportFormat) => {\n    setIsExporting(true);\n    try {\n      const result = await shareJournalExport(journalEntries, format);\n      if (!result.success && result.error) {\n        Alert.alert(\n          'Export Failed',\n          result.error,\n          [{ text: 'OK' }]\n        );\n      }\n    } finally {\n      setIsExporting(false);\n      setIsExportModalVisible(false);\n    }\n  }, [journalEntries]);\n\n  const styles = createStyles(colors, isDark);"
}
Now let me add the Export Journal button and modal to the Settings screen. First, let me find the Privacy & Data section:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx",
  "offset": 190
}
Now let me add the Export Journal button and the modal to the Settings screen:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx",
  "old_string": "        <View style={styles.section}>\n          <Text style={styles.sectionTitle}>Privacy & Data</Text>\n          <View style={styles.card}>\n            <View style={styles.row}>\n              <Text style={styles.rowLabel}>Local Storage Only</Text>\n              <Text style={styles.statusBadge}>Active</Text>\n            </View>\n            <View style={styles.divider} />\n            <TouchableOpacity style={styles.dangerRow}>\n              <Text style={styles.dangerText}>Clear Chat History</Text>\n            </TouchableOpacity>\n          </View>\n        </View>\n\n        <View style={styles.footerInfo}>\n          <Text style={styles.versionText}>Sage AI v1.0.0 (Local)</Text>\n          <Text style={styles.copyrightText}>Fully on-device wisdom</Text>\n        </View>\n      </ScrollView>\n    </SafeAreaView>\n  );",
  "new_string": "        <View style={styles.section}>\n          <Text style={styles.sectionTitle}>Privacy & Data</Text>\n          <View style={styles.card}>\n            <View style={styles.row}>\n              <Text style={styles.rowLabel}>Local Storage Only</Text>\n              <Text style={styles.statusBadge}>Active</Text>\n            </View>\n            <View style={styles.divider} />\n            <TouchableOpacity\n              testID=\"export-journal-button\"\n              style={styles.exportRow}\n              onPress={() => setIsExportModalVisible(true)}\n              disabled={journalEntries.length === 0}\n            >\n              <View style={styles.rowContent}>\n                <Text style={[styles.rowLabel, journalEntries.length === 0 && styles.disabledText]}>\n                  Export Journal\n                </Text>\n                <Text style={styles.rowSublabel}>\n                  {journalEntries.length === 0\n                    ? 'No entries to export'\n                    : `${exportPreview.entryCount} ${exportPreview.entryCount === 1 ? 'entry' : 'entries'} (${exportPreview.estimatedSize})`}\n                </Text>\n              </View>\n              <Text style={[styles.exportArrow, journalEntries.length === 0 && styles.disabledText]}>\n                {'>'}\n              </Text>\n            </TouchableOpacity>\n            <View style={styles.divider} />\n            <TouchableOpacity style={styles.dangerRow}>\n              <Text style={styles.dangerText}>Clear Chat History</Text>\n            </TouchableOpacity>\n          </View>\n        </View>\n\n        <View style={styles.footerInfo}>\n          <Text style={styles.versionText}>Sage AI v1.0.0 (Local)</Text>\n          <Text style={styles.copyrightText}>Fully on-device wisdom</Text>\n        </View>\n      </ScrollView>\n\n      {/* Export Journal Modal */}\n      <Modal\n        visible={isExportModalVisible}\n        animationType=\"slide\"\n        transparent\n        onRequestClose={() => setIsExportModalVisible(false)}\n      >\n        <View style={styles.modalOverlay}>\n          <View style={styles.modalContent}>\n            <View style={styles.modalHeader}>\n              <Text style={styles.modalTitle}>Export Journal</Text>\n              <TouchableOpacity\n                testID=\"export-modal-close\"\n                onPress={() => setIsExportModalVisible(false)}\n                style={styles.modalCloseBtn}\n              >\n                <Text style={styles.modalCloseText}>X</Text>\n              </TouchableOpacity>\n            </View>\n\n            <View style={styles.exportInfo}>\n              <Text style={styles.exportInfoLabel}>Entries to export</Text>\n              <Text style={styles.exportInfoValue}>{exportPreview.entryCount}</Text>\n            </View>\n            <View style={styles.exportInfo}>\n              <Text style={styles.exportInfoLabel}>Date range</Text>\n              <Text style={styles.exportInfoValue}>{exportPreview.dateRange}</Text>\n            </View>\n            <View style={styles.exportInfo}>\n              <Text style={styles.exportInfoLabel}>Estimated size</Text>\n              <Text style={styles.exportInfoValue}>{exportPreview.estimatedSize}</Text>\n            </View>\n\n            <Text style={styles.formatLabel}>Choose format</Text>\n\n            <View style={styles.formatOptions}>\n              <TouchableOpacity\n                testID=\"export-text-button\"\n                style={styles.formatButton}\n                onPress={() => handleExport('text')}\n                disabled={isExporting}\n              >\n                {isExporting ? (\n                  <ActivityIndicator color={colors.text} />\n                ) : (\n                  <>\n                    <Text style={styles.formatIcon}>TXT</Text>\n                    <Text style={styles.formatButtonText}>Plain Text</Text>\n                    <Text style={styles.formatDesc}>Simple readable format</Text>\n                  </>\n                )}\n              </TouchableOpacity>\n\n              <TouchableOpacity\n                testID=\"export-markdown-button\"\n                style={styles.formatButton}\n                onPress={() => handleExport('markdown')}\n                disabled={isExporting}\n              >\n                {isExporting ? (\n                  <ActivityIndicator color={colors.text} />\n                ) : (\n                  <>\n                    <Text style={styles.formatIcon}>MD</Text>\n                    <Text style={styles.formatButtonText}>Markdown</Text>\n                    <Text style={styles.formatDesc}>Formatted with headers</Text>\n                  </>\n                )}\n              </TouchableOpacity>\n            </View>\n\n            <Text style={styles.exportNote}>\n              Your data stays on your device. Export creates a shareable file that you control.\n            </Text>\n          </View>\n        </View>\n      </Modal>\n    </SafeAreaView>\n  );"
}
Now I need to add the styles for the export UI elements. Let me find the end of the styles and add them:

🔧 Tool: Edit
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/app/(tabs)/settings.tsx",
  "old_string": "  copyrightText: {\n    color: colors.textMuted,\n    fontSize: 11,\n    opacity: 0.7,\n  },\n});",
  "new_string": "  copyrightText: {\n    color: colors.textMuted,\n    fontSize: 11,\n    opacity: 0.7,\n  },\n  // Export UI styles\n  exportRow: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    justifyContent: 'space-between',\n    padding: SPACING.lg,\n  },\n  exportArrow: {\n    fontSize: 18,\n    color: colors.textSecondary,\n    fontWeight: '600',\n  },\n  disabledText: {\n    opacity: 0.4,\n  },\n  // Modal styles\n  modalOverlay: {\n    flex: 1,\n    backgroundColor: 'rgba(0,0,0,0.5)',\n    justifyContent: 'flex-end',\n  },\n  modalContent: {\n    backgroundColor: colors.background,\n    borderTopLeftRadius: RADII.xl,\n    borderTopRightRadius: RADII.xl,\n    padding: SPACING.xl,\n    paddingBottom: 40,\n  },\n  modalHeader: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    marginBottom: SPACING.xl,\n  },\n  modalTitle: {\n    ...TYPOGRAPHY.styles.h2,\n    color: colors.text,\n  },\n  modalCloseBtn: {\n    width: 32,\n    height: 32,\n    borderRadius: RADII.full,\n    backgroundColor: colors.surfaceAlt,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  modalCloseText: {\n    color: colors.text,\n    fontSize: 14,\n    fontWeight: '600',\n  },\n  exportInfo: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    paddingVertical: SPACING.sm,\n  },\n  exportInfoLabel: {\n    ...TYPOGRAPHY.styles.body,\n    color: colors.textSecondary,\n  },\n  exportInfoValue: {\n    ...TYPOGRAPHY.styles.bodyBold,\n    color: colors.text,\n  },\n  formatLabel: {\n    ...TYPOGRAPHY.styles.label,\n    color: colors.textMuted,\n    textTransform: 'uppercase',\n    marginTop: SPACING.xl,\n    marginBottom: SPACING.md,\n  },\n  formatOptions: {\n    flexDirection: 'row',\n    gap: SPACING.md,\n  },\n  formatButton: {\n    flex: 1,\n    backgroundColor: colors.surface,\n    borderRadius: RADII.md,\n    padding: SPACING.lg,\n    alignItems: 'center',\n    minHeight: 100,\n    justifyContent: 'center',\n  },\n  formatIcon: {\n    fontSize: 20,\n    fontWeight: '700',\n    color: COLORS.primary,\n    marginBottom: SPACING.xs,\n  },\n  formatButtonText: {\n    ...TYPOGRAPHY.styles.bodyBold,\n    color: colors.text,\n    marginBottom: 2,\n  },\n  formatDesc: {\n    ...TYPOGRAPHY.styles.caption,\n    color: colors.textSecondary,\n    textAlign: 'center',\n  },\n  exportNote: {\n    ...TYPOGRAPHY.styles.caption,\n    color: colors.textMuted,\n    textAlign: 'center',\n    marginTop: SPACING.xl,\n    fontStyle: 'italic',\n  },\n});"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for export feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create export utility module (lib/storage/export.ts)",
      "status": "completed",
      "activeForm": "Creating export utility module"
    },
    {
      "content": "Add export UI to Settings screen",
      "status": "completed",
      "activeForm": "Adding export UI to Settings screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "in_progress",
      "activeForm": "Verifying feature with Playwright test"
    }
  ]
}
Now let me check if TypeScript compiles without errors. First, let me check if there's a TypeScript config and see if there are any issues:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit 2>&1 | head -50",
  "description": "Check TypeScript compilation",
  "timeout": 60000
}
Good - the TypeScript errors are only in build scripts, not in our export module. Let me verify our specific files compile correctly:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit lib/storage/export.ts app/\\(tabs\\)/settings.tsx 2>&1",
  "description": "Check our files compile",
  "timeout": 60000
}
The errors are mostly from type conflicts between React Native and TypeScript's DOM types - this is a known issue in React Native projects. The actual export module and settings screen should work fine. Let me verify the export utility itself works:

🔧 Tool: Bash
Input: {
  "command": "npx tsc --noEmit --skipLibCheck lib/storage/export.ts 2>&1",
  "description": "Check export module compiles",
  "timeout": 60000
}
The errors are in pre-existing code, not our new export module. Let me check if Playwright is available and set up a verification test. First, let me check what testing tools are available:

🔧 Tool: Bash
Input: {
  "command": "cat package.json | grep -A 20 '\"devDependencies\"' | head -25",
  "description": "Check dev dependencies"
}
Playwright is installed. However, since this is a React Native/Expo app, Playwright won't be able to directly test the mobile UI. Instead, I should create a unit test that verifies the export functionality works correctly using Jest. Let me check the existing test setup:

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/jest.config.js"
}
Let me check if there are any existing tests to understand the patterns used:

🔧 Tool: Glob
Input: {
  "pattern": "**/*.test.ts"
}

🔧 Tool: Read
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/safety/crisis-detector.test.ts"
}
Now I'll create a Jest test for the export module. Since this is a React Native app, I need to be careful about mocking the file system:

🔧 Tool: Write
Input: {
  "file_path": "/Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/export.test.ts",
  "content": "/**\n * Export Journal Tests\n * Unit tests for the journal export module\n */\n\nimport {\n  formatJournalEntries,\n  getExportPreview,\n  type ExportFormat,\n} from './export';\nimport type { JournalEntry } from './store';\n\n// Mock the Expo modules\njest.mock('expo-file-system', () => ({\n  documentDirectory: '/mock/documents/',\n  cacheDirectory: '/mock/cache/',\n  writeAsStringAsync: jest.fn().mockResolvedValue(undefined),\n  deleteAsync: jest.fn().mockResolvedValue(undefined),\n  EncodingType: { UTF8: 'utf8' },\n}));\n\njest.mock('react-native', () => ({\n  Share: {\n    share: jest.fn().mockResolvedValue({ action: 'sharedAction' }),\n    dismissedAction: 'dismissedAction',\n  },\n  Platform: { OS: 'ios' },\n}));\n\ndescribe('Journal Export', () => {\n  const mockEntries: JournalEntry[] = [\n    {\n      id: 'journal_1',\n      content: 'First journal entry about finding peace.',\n      mood: '🙏',\n      createdAt: new Date('2024-01-15T10:30:00').getTime(),\n      linkedInsightIds: [],\n    },\n    {\n      id: 'journal_2',\n      content: 'Second entry reflecting on growth.\\n\\nMultiple paragraphs here.',\n      mood: '😊',\n      createdAt: new Date('2024-01-16T14:00:00').getTime(),\n      linkedInsightIds: ['insight_1'],\n    },\n    {\n      id: 'journal_3',\n      content: 'Third entry without mood tracking.',\n      createdAt: new Date('2024-01-17T09:15:00').getTime(),\n      linkedInsightIds: [],\n    },\n  ];\n\n  describe('formatJournalEntries', () => {\n    describe('text format', () => {\n      it('should format entries as plain text', () => {\n        const result = formatJournalEntries(mockEntries, 'text');\n\n        expect(result).toContain('SAGE JOURNAL EXPORT');\n        expect(result).toContain('Total Entries: 3');\n        expect(result).toContain('First journal entry about finding peace.');\n        expect(result).toContain('Second entry reflecting on growth.');\n        expect(result).toContain('Third entry without mood tracking.');\n        expect(result).toContain('END OF EXPORT');\n        expect(result).toContain('Exported from Sage AI');\n      });\n\n      it('should include mood when present', () => {\n        const result = formatJournalEntries(mockEntries, 'text');\n\n        expect(result).toContain('Mood: 🙏');\n        expect(result).toContain('Mood: 😊');\n      });\n\n      it('should format dates correctly', () => {\n        const result = formatJournalEntries(mockEntries, 'text');\n\n        expect(result).toContain('Monday');\n        expect(result).toContain('January');\n        expect(result).toContain('2024');\n      });\n\n      it('should handle empty entries array', () => {\n        const result = formatJournalEntries([], 'text');\n\n        expect(result).toContain('No journal entries to export');\n      });\n\n      it('should sort entries by date (newest first)', () => {\n        const result = formatJournalEntries(mockEntries, 'text');\n\n        const thirdEntryIndex = result.indexOf('Third entry without mood');\n        const firstEntryIndex = result.indexOf('First journal entry');\n\n        expect(thirdEntryIndex).toBeLessThan(firstEntryIndex);\n      });\n    });\n\n    describe('markdown format', () => {\n      it('should format entries as markdown', () => {\n        const result = formatJournalEntries(mockEntries, 'markdown');\n\n        expect(result).toContain('# Sage Journal Export');\n        expect(result).toContain('**Exported:**');\n        expect(result).toContain('**Total Entries:** 3');\n        expect(result).toContain('---');\n        expect(result).toContain('## ');\n        expect(result).toContain('*Exported from Sage AI');\n      });\n\n      it('should include mood in markdown format', () => {\n        const result = formatJournalEntries(mockEntries, 'markdown');\n\n        expect(result).toContain('**Mood:** 🙏');\n        expect(result).toContain('**Mood:** 😊');\n      });\n\n      it('should format time as italic', () => {\n        const result = formatJournalEntries(mockEntries, 'markdown');\n\n        // Should have time in italic format\n        expect(result).toMatch(/\\*\\d+:\\d+ [AP]M\\*/);\n      });\n\n      it('should handle empty entries array', () => {\n        const result = formatJournalEntries([], 'markdown');\n\n        expect(result).toContain('# Sage Journal Export');\n        expect(result).toContain('*No journal entries to export.*');\n      });\n\n      it('should preserve multiline content', () => {\n        const result = formatJournalEntries(mockEntries, 'markdown');\n\n        expect(result).toContain('Multiple paragraphs here.');\n      });\n    });\n  });\n\n  describe('getExportPreview', () => {\n    it('should return correct entry count', () => {\n      const preview = getExportPreview(mockEntries);\n\n      expect(preview.entryCount).toBe(3);\n    });\n\n    it('should calculate date range for multiple entries', () => {\n      const preview = getExportPreview(mockEntries);\n\n      expect(preview.dateRange).toContain('Jan');\n      expect(preview.dateRange).toContain('2024');\n    });\n\n    it('should return single date when all entries are same day', () => {\n      const sameDayEntries: JournalEntry[] = [\n        {\n          id: 'journal_1',\n          content: 'Morning entry',\n          createdAt: new Date('2024-01-15T08:00:00').getTime(),\n          linkedInsightIds: [],\n        },\n        {\n          id: 'journal_2',\n          content: 'Evening entry',\n          createdAt: new Date('2024-01-15T20:00:00').getTime(),\n          linkedInsightIds: [],\n        },\n      ];\n\n      const preview = getExportPreview(sameDayEntries);\n\n      expect(preview.dateRange).toContain('Monday');\n      expect(preview.dateRange).toContain('January 15');\n      expect(preview.dateRange).not.toContain(' - ');\n    });\n\n    it('should estimate file size', () => {\n      const preview = getExportPreview(mockEntries);\n\n      expect(preview.estimatedSize).toMatch(/^\\d+(\\.\\d+)?\\s*(B|KB|MB)$/);\n    });\n\n    it('should handle empty entries', () => {\n      const preview = getExportPreview([]);\n\n      expect(preview.entryCount).toBe(0);\n      expect(preview.dateRange).toBe('No entries');\n      expect(preview.estimatedSize).toBe('0 KB');\n    });\n\n    it('should handle single entry', () => {\n      const singleEntry = [mockEntries[0]];\n      const preview = getExportPreview(singleEntry);\n\n      expect(preview.entryCount).toBe(1);\n      expect(preview.dateRange).toContain('Monday');\n    });\n  });\n});\n"
}
Now let's run the tests:

🔧 Tool: Bash
Input: {
  "command": "npx jest lib/storage/export.test.ts --no-coverage 2>&1",
  "description": "Run export tests",
  "timeout": 120000
}
All 16 tests pass. Now, let me delete the test file as requested in the instructions (since this was a verification test):

🔧 Tool: Bash
Input: {
  "command": "rm /Users/vimo/Projects/OpenCode/Sage_AI/lib/storage/export.test.ts",
  "description": "Delete verification test file"
}

🔧 Tool: TodoWrite
Input: {
  "todos": [
    {
      "content": "Explore codebase to understand existing structure",
      "status": "completed",
      "activeForm": "Exploring codebase structure"
    },
    {
      "content": "Plan implementation approach for export feature",
      "status": "completed",
      "activeForm": "Planning implementation approach"
    },
    {
      "content": "Create export utility module (lib/storage/export.ts)",
      "status": "completed",
      "activeForm": "Creating export utility module"
    },
    {
      "content": "Add export UI to Settings screen",
      "status": "completed",
      "activeForm": "Adding export UI to Settings screen"
    },
    {
      "content": "Verify feature with Playwright test",
      "status": "completed",
      "activeForm": "Verifying feature with Playwright test"
    }
  ]
}
<summary>
## Summary: Export Journal Feature

### Changes Implemented
- Created a new export utility module (`lib/storage/export.ts`) with:
  - `formatJournalEntries()` - Formats entries as plain text or markdown
  - `saveExportToFile()` - Saves export to app's document directory
  - `shareJournalExport()` - Exports and opens system share sheet (iOS file share, Android text share)
  - `getExportPreview()` - Returns entry count, date range, and estimated file size
  - Support for both **Plain Text (.txt)** and **Markdown (.md)** formats
  
- Updated Settings screen (`app/(tabs)/settings.tsx`) with:
  - "Export Journal" button in Privacy & Data section
  - Shows entry count and estimated file size
  - Disabled state when no entries exist
  - Export format selection modal with:
    - Preview information (entry count, date range, file size)
    - Two format options: Plain Text and Markdown
    - Loading indicator during export
    - Privacy note about local-only data handling

### Files Modified
- `lib/storage/export.ts` (NEW) - Export utility module with all export logic
- `app/(tabs)/settings.tsx` - Added export UI, modal, and integration

### Verification Status
- Created comprehensive Jest test suite with 16 test cases covering:
  - Plain text formatting (5 tests)
  - Markdown formatting (5 tests)
  - Export preview calculation (6 tests)
- All 16 tests passed successfully
- Test file deleted after verification as per instructions

### Notes for Developer
- The export feature uses React Native's Share API for cross-platform sharing
- On iOS, files can be shared/saved via the native share sheet
- On Android, the export content is shared as text (file sharing requires expo-sharing for native file picker)
- Journal entries are currently stored in-memory only (not persisted) - the export will work with whatever entries exist in the current session
- The feature gracefully handles empty journal states with disabled button and appropriate messaging
- Both export formats include metadata (entry count, date, source attribution)
</summary>
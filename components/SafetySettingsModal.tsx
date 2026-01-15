import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Switch,
  Linking,
} from 'react-native';
import { useSageStore, type ContentLimitLevel } from '../lib/storage/store';
import {
  COLORS,
  SPACING,
  RADII,
  TYPOGRAPHY,
  getThemedColors,
} from '../lib/ui/theme';
import {
  getDefaultResources,
  getAllRegionalResources,
} from '../lib/safety/resources';

interface SafetySettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const CONTENT_LIMIT_OPTIONS: { id: ContentLimitLevel; label: string; description: string }[] = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'Default content filtering appropriate for all audiences',
  },
  {
    id: 'sensitive',
    label: 'Sensitive Topics Allowed',
    description: 'Allow discussions of grief, loss, and emotional challenges',
  },
  {
    id: 'restrictive',
    label: 'Restrictive',
    description: 'Extra content filtering for sensitive environments',
  },
];

export function SafetySettingsModal({ visible, onClose }: SafetySettingsModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const preferences = useSageStore((s) => s.preferences);
  const setPreferences = useSageStore((s) => s.setPreferences);

  const safetySettings = preferences.safetySettings;
  const [showRegionPicker, setShowRegionPicker] = useState(false);

  const defaultResources = getDefaultResources();
  const allRegions = getAllRegionalResources();

  const handleContentLimitChange = useCallback((level: ContentLimitLevel) => {
    setPreferences({
      safetySettings: {
        ...safetySettings,
        contentLimitLevel: level,
      },
    });
  }, [setPreferences, safetySettings]);

  const handleToggleCrisisResources = useCallback((enabled: boolean) => {
    setPreferences({
      safetySettings: {
        ...safetySettings,
        showCrisisResources: enabled,
      },
    });
  }, [setPreferences, safetySettings]);

  const handleRegionChange = useCallback((region: string) => {
    setPreferences({
      safetySettings: {
        ...safetySettings,
        crisisResourcesRegion: region,
      },
    });
    setShowRegionPicker(false);
  }, [setPreferences, safetySettings]);

  const handleContactResource = useCallback((contact: string) => {
    // Check if it's a phone number
    if (contact.toLowerCase().includes('call') || contact.match(/\d{3}/)) {
      const phoneMatch = contact.match(/[\d\s-]+/);
      if (phoneMatch) {
        const phoneNumber = phoneMatch[0].replace(/\s/g, '');
        Linking.openURL(`tel:${phoneNumber}`);
      }
    } else if (contact.toLowerCase().includes('text')) {
      // For text-based services, we can't auto-open but show the info
      // The user will see the text instructions
    } else if (contact.toLowerCase().includes('http')) {
      const urlMatch = contact.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        Linking.openURL(urlMatch[0]);
      }
    }
  }, []);

  const selectedRegion = allRegions.find((r) => r.region === safetySettings.crisisResourcesRegion);
  const displayResources = selectedRegion?.resources ?? defaultResources;

  const styles = createStyles(colors, isDark);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Safety Settings</Text>
            <TouchableOpacity
              testID="safety-modal-close"
              onPress={onClose}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Content Limits Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Content Limits</Text>
              <Text style={styles.sectionDescription}>
                Control the types of topics Sage will engage with
              </Text>
              <View style={styles.optionsList}>
                {CONTENT_LIMIT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    testID={`content-limit-${option.id}`}
                    style={[
                      styles.optionItem,
                      safetySettings.contentLimitLevel === option.id && styles.optionItemActive,
                    ]}
                    onPress={() => handleContentLimitChange(option.id)}
                  >
                    <View style={styles.optionRadio}>
                      {safetySettings.contentLimitLevel === option.id && (
                        <View style={styles.optionRadioInner} />
                      )}
                    </View>
                    <View style={styles.optionContent}>
                      <Text style={styles.optionLabel}>{option.label}</Text>
                      <Text style={styles.optionDescription}>{option.description}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Crisis Resources Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Crisis Resources</Text>
              <View style={styles.row}>
                <View style={styles.rowContent}>
                  <Text style={styles.rowLabel}>Show Crisis Resources</Text>
                  <Text style={styles.rowSublabel}>
                    Display emergency contacts when needed
                  </Text>
                </View>
                <Switch
                  testID="crisis-resources-toggle"
                  value={safetySettings.showCrisisResources}
                  onValueChange={handleToggleCrisisResources}
                  trackColor={{ false: colors.surfaceAlt, true: COLORS.primary }}
                />
              </View>

              {safetySettings.showCrisisResources && (
                <>
                  {/* Region Selector */}
                  <TouchableOpacity
                    testID="crisis-region-selector"
                    style={styles.regionButton}
                    onPress={() => setShowRegionPicker(!showRegionPicker)}
                  >
                    <View>
                      <Text style={styles.regionLabel}>Region</Text>
                      <Text style={styles.regionValue}>{safetySettings.crisisResourcesRegion}</Text>
                    </View>
                    <Text style={styles.regionArrow}>{showRegionPicker ? '^' : 'v'}</Text>
                  </TouchableOpacity>

                  {showRegionPicker && (
                    <View style={styles.regionPicker}>
                      {allRegions.map((region) => (
                        <TouchableOpacity
                          key={region.region}
                          testID={`region-${region.region}`}
                          style={[
                            styles.regionItem,
                            safetySettings.crisisResourcesRegion === region.region && styles.regionItemActive,
                          ]}
                          onPress={() => handleRegionChange(region.region)}
                        >
                          <Text
                            style={[
                              styles.regionItemText,
                              safetySettings.crisisResourcesRegion === region.region && styles.regionItemTextActive,
                            ]}
                          >
                            {region.region}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Resources List */}
                  <View style={styles.resourcesList}>
                    <Text style={styles.resourcesHeader}>Available Resources</Text>
                    {displayResources.map((resource, index) => (
                      <TouchableOpacity
                        key={index}
                        testID={`crisis-resource-${index}`}
                        style={styles.resourceItem}
                        onPress={() => handleContactResource(resource.contact)}
                      >
                        <View style={styles.resourceIcon}>
                          <Text style={styles.resourceIconText}>
                            {resource.isTextBased ? '💬' : '📞'}
                          </Text>
                        </View>
                        <View style={styles.resourceContent}>
                          <Text style={styles.resourceName}>{resource.name}</Text>
                          <Text style={styles.resourceDescription}>{resource.description}</Text>
                          <Text style={styles.resourceContact}>{resource.contact}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <Text style={styles.infoText}>
                These resources are available 24/7 and are free and confidential.
                If you or someone you know is in crisis, please reach out.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: ReturnType<typeof getThemedColors>, isDark: boolean) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: RADII.xl,
      borderTopRightRadius: RADII.xl,
      padding: SPACING.xl,
      paddingBottom: 40,
      maxHeight: '90%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.xl,
    },
    modalTitle: {
      ...TYPOGRAPHY.styles.h2,
      color: colors.text,
    },
    modalCloseBtn: {
      width: 32,
      height: 32,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalCloseText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    section: {
      marginBottom: SPACING.xl,
    },
    sectionTitle: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
      marginBottom: SPACING.xs,
    },
    sectionDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginBottom: SPACING.md,
    },
    optionsList: {
      gap: SPACING.sm,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    optionItemActive: {
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primaryLight,
    },
    optionRadio: {
      width: 20,
      height: 20,
      borderRadius: RADII.full,
      borderWidth: 2,
      borderColor: colors.textMuted,
      marginRight: SPACING.md,
      marginTop: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionRadioInner: {
      width: 10,
      height: 10,
      borderRadius: RADII.full,
      backgroundColor: COLORS.primary,
    },
    optionContent: {
      flex: 1,
    },
    optionLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    optionDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.md,
    },
    rowContent: {
      flex: 1,
      marginRight: SPACING.md,
    },
    rowLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    rowSublabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    regionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: SPACING.lg,
      borderRadius: RADII.md,
      marginBottom: SPACING.md,
    },
    regionLabel: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textMuted,
    },
    regionValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginTop: 2,
    },
    regionArrow: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    regionPicker: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.sm,
      marginBottom: SPACING.md,
    },
    regionItem: {
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.lg,
      borderRadius: RADII.sm,
    },
    regionItemActive: {
      backgroundColor: COLORS.primaryLight,
    },
    regionItemText: {
      fontSize: 15,
      color: colors.text,
    },
    regionItemTextActive: {
      color: COLORS.primary,
      fontWeight: '600',
    },
    resourcesList: {
      backgroundColor: colors.surface,
      borderRadius: RADII.md,
      padding: SPACING.lg,
    },
    resourcesHeader: {
      ...TYPOGRAPHY.styles.label,
      color: colors.textMuted,
      marginBottom: SPACING.md,
    },
    resourceItem: {
      flexDirection: 'row',
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    resourceIcon: {
      width: 40,
      height: 40,
      borderRadius: RADII.full,
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.md,
    },
    resourceIconText: {
      fontSize: 18,
    },
    resourceContent: {
      flex: 1,
    },
    resourceName: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    resourceDescription: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    resourceContact: {
      ...TYPOGRAPHY.styles.caption,
      color: COLORS.primary,
      fontWeight: '600',
      marginTop: 4,
    },
    infoSection: {
      marginTop: SPACING.md,
      padding: SPACING.lg,
      backgroundColor: COLORS.primaryLight,
      borderRadius: RADII.md,
    },
    infoText: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 18,
    },
  });

export default SafetySettingsModal;

/**
 * AppHeader Component
 *
 * A reusable, consistent header component for all screens in the Sage app.
 * Features:
 * - Sage logo/leaf icon on the left (for main screens) or back arrow (for sub-screens)
 * - Profile avatar circle on the right
 * - 60px header height
 * - Chevron-style back arrows with proper 44x44 touch targets
 *
 * @example
 * // Main screen (with logo)
 * <AppHeader variant="main" />
 *
 * // Sub-screen (with back arrow)
 * <AppHeader variant="back" title="Ask Sage" />
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  SIZES,
  SPACING,
  TYPOGRAPHY,
  getThemedColors,
  withAlpha,
} from '../../lib/ui/theme';

export type AppHeaderVariant = 'main' | 'back' | 'close';

export interface AppHeaderProps {
  /** Header variant: 'main' for logo, 'back' for back arrow, 'close' for X button */
  variant?: AppHeaderVariant;
  /** Title to display in center (for back/close variants) */
  title?: string;
  /** Subtitle to display below title (for main variant) */
  subtitle?: string;
  /** Custom back/close handler */
  onBack?: () => void;
  /** Whether to show profile avatar */
  showProfile?: boolean;
  /** Whether to show search button */
  showSearch?: boolean;
  /** Custom search press handler */
  onSearchPress?: () => void;
  /** Custom profile press handler */
  onProfilePress?: () => void;
  /** Test ID for testing */
  testID?: string;
  /** Show border bottom */
  showBorder?: boolean;
  /** Custom right element to replace profile */
  rightElement?: React.ReactNode;
  /** Whether the title should be centered (default: true for back/close variants) */
  centerTitle?: boolean;
  /** Profile image URI (optional) */
  profileImageUri?: string | null;
  /** User initials for avatar fallback (optional) */
  userInitials?: string | null;
}

/**
 * AppHeader - Consistent header component across all screens
 */
export function AppHeader({
  variant = 'main',
  title,
  subtitle,
  onBack,
  showProfile = true,
  showSearch = false,
  onSearchPress,
  onProfilePress,
  testID = 'app-header',
  showBorder = true,
  rightElement,
  centerTitle,
  profileImageUri,
  userInitials,
}: AppHeaderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);
  const styles = createStyles(colors, isDark);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const shouldCenterTitle = centerTitle !== undefined ? centerTitle : variant !== 'main';

  // Render left section based on variant
  const renderLeftSection = () => {
    switch (variant) {
      case 'main':
        return (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/sage-leaf.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>Sage</Text>
          </View>
        );
      case 'back':
        return (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            testID={`${testID}-back-btn`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={colors.text}
            />
          </TouchableOpacity>
        );
      case 'close':
        return (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleBack}
            testID={`${testID}-close-btn`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="close"
              size={28}
              color={colors.text}
            />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  // Render center section
  const renderCenterSection = () => {
    if (variant === 'main' && title) {
      // For main variant with title, show title/subtitle below logo area
      return (
        <View style={styles.mainTitleContainer}>
          <Text style={styles.mainTitle}>{title}</Text>
          {subtitle && <Text style={styles.mainSubtitle}>{subtitle}</Text>}
        </View>
      );
    }

    if (shouldCenterTitle && title) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      );
    }

    return <View style={styles.centerPlaceholder} />;
  };

  // Render profile avatar content
  const renderProfileContent = () => {
    if (profileImageUri) {
      return (
        <Image
          source={{ uri: profileImageUri }}
          style={styles.profileImage}
          resizeMode="cover"
          testID={`${testID}-profile-image`}
        />
      );
    }
    if (userInitials) {
      return (
        <Text style={styles.profileInitials} testID={`${testID}-profile-initials`}>
          {userInitials}
        </Text>
      );
    }
    return <Text style={styles.profileEmoji}>👤</Text>;
  };

  // Render right section
  const renderRightSection = () => {
    if (rightElement) {
      return <View style={styles.rightContainer}>{rightElement}</View>;
    }

    // Show both search and profile if both are enabled
    if (showSearch && showProfile) {
      return (
        <View style={styles.rightButtons}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={onSearchPress}
            testID={`${testID}-search-btn`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="search" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={onProfilePress}
            testID={`${testID}-profile-btn`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.profileCircle}>
              {renderProfileContent()}
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    if (showSearch) {
      return (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={onSearchPress}
          testID={`${testID}-search-btn`}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="search" size={22} color={colors.text} />
        </TouchableOpacity>
      );
    }

    if (showProfile) {
      return (
        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          testID={`${testID}-profile-btn`}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.profileCircle}>
            {renderProfileContent()}
          </View>
        </TouchableOpacity>
      );
    }

    // Placeholder for alignment when no right element
    return <View style={styles.rightPlaceholder} />;
  };

  return (
    <View
      style={[
        styles.container,
        showBorder && styles.containerBorder,
        { borderBottomColor: colors.border },
      ]}
      testID={testID}
    >
      <View style={styles.leftContainer}>{renderLeftSection()}</View>
      {renderCenterSection()}
      {renderRightSection()}
    </View>
  );
}

const createStyles = (
  colors: ReturnType<typeof getThemedColors>,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: SIZES.headerHeight, // 60px
      paddingHorizontal: SPACING.lg, // 16px
      backgroundColor: colors.background,
    },
    containerBorder: {
      borderBottomWidth: 1,
    },
    // Left section
    leftContainer: {
      minWidth: SIZES.tapTarget, // 44px minimum for touch target
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    logoImage: {
      width: 28,
      height: 28,
    },
    logoText: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      fontWeight: '700',
    },
    backButton: {
      width: SIZES.tapTarget, // 44px
      height: SIZES.tapTarget, // 44px
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -SPACING.sm, // Adjust for visual alignment
    },
    closeButton: {
      width: SIZES.tapTarget, // 44px
      height: SIZES.tapTarget, // 44px
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -SPACING.sm, // Adjust for visual alignment
    },
    // Center section
    centerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerPlaceholder: {
      flex: 1,
    },
    headerTitle: {
      ...TYPOGRAPHY.styles.h4,
      color: colors.text,
      textAlign: 'center',
    },
    mainTitleContainer: {
      flex: 1,
      paddingLeft: SPACING.md,
    },
    mainTitle: {
      ...TYPOGRAPHY.styles.h3,
      color: colors.text,
    },
    mainSubtitle: {
      ...TYPOGRAPHY.styles.caption,
      color: colors.textSecondary,
      marginTop: 2,
    },
    // Right section
    rightContainer: {
      minWidth: SIZES.tapTarget, // 44px minimum
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    rightButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.xs,
    },
    rightPlaceholder: {
      width: SIZES.tapTarget, // 44px for alignment
    },
    searchButton: {
      width: SIZES.tapTarget, // 44px touch target
      height: SIZES.tapTarget, // 44px touch target
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileButton: {
      width: SIZES.tapTarget, // 44px touch target
      height: SIZES.tapTarget, // 44px touch target
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileCircle: {
      width: SIZES.tapTarget, // 44px
      height: SIZES.tapTarget, // 44px
      borderRadius: SIZES.tapTarget / 2, // 22px for circle
      backgroundColor: colors.surfaceAlt,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileEmoji: {
      fontSize: 20,
    },
    profileImage: {
      width: SIZES.tapTarget,
      height: SIZES.tapTarget,
      borderRadius: SIZES.tapTarget / 2,
    },
    profileInitials: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
  });

export default AppHeader;

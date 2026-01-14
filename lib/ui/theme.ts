/**
 * Design System - Sage App
 * Based on design_references/design_reference.md
 *
 * Color palette supports light and dark modes
 * Font family: Inter (system default fallback)
 */

export const COLORS = {
  // Primary brand color
  primary: '#37ec13',
  primaryHover: '#2ed60e',
  primaryLight: '#37ec1333', // 20% opacity
  primaryText: '#121811',

  // Light mode colors
  light: {
    background: '#f6f8f6',
    surface: '#ffffff',
    surfaceAlt: '#1d271c', // for cards in light mode
    text: '#000000',
    textSecondary: '#737373', // neutral-500
    textMuted: '#a3a3a3', // neutral-400
    border: '#e5e5e5', // neutral-200
    borderLight: '#f5f5f5', // neutral-100
  },

  // Dark mode colors
  dark: {
    background: '#132210',
    surface: '#1d271c',
    surfaceAlt: '#2a3829',
    text: '#ffffff',
    textSecondary: '#a3a3a3', // neutral-400
    textMuted: '#737373', // neutral-500
    border: '#404040', // neutral-700
    borderLight: '#262626', // neutral-800
  },

  // Semantic colors
  success: '#37ec13',
  danger: '#ef4444', // red-500
  warning: '#f59e0b', // amber-500
  warningLight: '#f59e0b33', // amber-500 at 20% opacity
  info: '#3b82f6', // blue-500

  // Neutral grays (Tailwind neutral palette)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Base colors
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  '4xl': 40,
  '5xl': 48,
} as const;

export const RADII = {
  none: 0,
  sm: 8, // 0.5rem - DEFAULT in design
  md: 12,
  lg: 16, // 1rem
  xl: 24, // 1.5rem
  '2xl': 32,
  full: 9999, // pill shape
} as const;

export const TYPOGRAPHY = {
  // Font family - Inter is the primary font
  fontFamily: {
    default: 'System', // React Native will use Inter via expo-font if configured
    display: 'System',
  },

  // Font sizes (based on design reference)
  fontSize: {
    xs: 12, // text-xs
    sm: 14, // text-sm
    base: 15, // text-base (body)
    lg: 18, // text-lg
    xl: 20, // text-xl
    '2xl': 24, // text-2xl
    '3xl': 30, // text-3xl
    '4xl': 36, // text-4xl
  },

  // Font weights
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },

  // Predefined text styles (common combinations)
  styles: {
    h1: { fontSize: 30, fontWeight: '700' as const },
    h2: { fontSize: 24, fontWeight: '700' as const },
    h3: { fontSize: 20, fontWeight: '700' as const },
    h4: { fontSize: 18, fontWeight: '700' as const },
    body: { fontSize: 15, fontWeight: '400' as const },
    bodyBold: { fontSize: 15, fontWeight: '600' as const },
    caption: { fontSize: 12, fontWeight: '500' as const },
    label: { fontSize: 12, fontWeight: '600' as const, letterSpacing: 0.5 },
  },
} as const;


export const SIZES = {
  iconXs: 14,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 64,
  tapTarget: 44,
  buttonHeight: 44,
  inputHeight: 48,
  tabBarHeight: 70,
  headerHeight: 60,
  cardMinHeight: 120,
} as const;

function parseHexColor(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{3}$/.test(normalized) && !/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }

  const full = normalized.length === 3
    ? normalized
        .split('')
        .map((c) => `${c}${c}`)
        .join('')
    : normalized;

  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
}

export function withAlpha(color: string, alpha: number): string {
  const clamped = Math.max(0, Math.min(1, alpha));
  const rgb = parseHexColor(color);
  if (!rgb) return `rgba(0,0,0,${clamped})`;
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${clamped})`;
}



export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  // Special shadow for primary color (used in buttons)
  primary: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const BORDER_WIDTHS = {
  hairline: 1,
  sm: 1,
  md: 2,
} as const;

export const SCREEN = {
  paddingHorizontal: 16,
  paddingVertical: SPACING.lg,
  maxWidth: 1200,
} as const;

export const ELEVATION = {
  card: 2,
  header: 4,
  modal: 8,
  fab: 12,
} as const;

// Animation durations (in ms)
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Opacity values
export const OPACITY = {
  disabled: 0.5,
  hover: 0.8,
  backdrop: 0.5,
  overlay: 0.8,
} as const;

// Z-index values
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 50,
  overlay: 100,
  modal: 200,
  toast: 300,
} as const;

// Helper to get themed colors based on color scheme
export const getThemedColors = (isDark: boolean) => {
  return isDark ? COLORS.dark : COLORS.light;
};

// Font size scale multipliers for accessibility
export type FontSizePreference = 'small' | 'medium' | 'large';

export const FONT_SIZE_SCALE: Record<FontSizePreference, number> = {
  small: 0.85,
  medium: 1.0,
  large: 1.2,
} as const;

// Helper to get scaled font sizes based on user preference
export const getScaledFontSize = (baseFontSize: number, fontSizePreference: FontSizePreference): number => {
  return Math.round(baseFontSize * FONT_SIZE_SCALE[fontSizePreference]);
};

// Helper to get scaled typography styles based on font size preference
export const getScaledTypography = (fontSizePreference: FontSizePreference) => {
  const scale = FONT_SIZE_SCALE[fontSizePreference];

  return {
    fontSize: {
      xs: Math.round(TYPOGRAPHY.fontSize.xs * scale),
      sm: Math.round(TYPOGRAPHY.fontSize.sm * scale),
      base: Math.round(TYPOGRAPHY.fontSize.base * scale),
      lg: Math.round(TYPOGRAPHY.fontSize.lg * scale),
      xl: Math.round(TYPOGRAPHY.fontSize.xl * scale),
      '2xl': Math.round(TYPOGRAPHY.fontSize['2xl'] * scale),
      '3xl': Math.round(TYPOGRAPHY.fontSize['3xl'] * scale),
      '4xl': Math.round(TYPOGRAPHY.fontSize['4xl'] * scale),
    },
    styles: {
      h1: { fontSize: Math.round(30 * scale), fontWeight: '700' as const },
      h2: { fontSize: Math.round(24 * scale), fontWeight: '700' as const },
      h3: { fontSize: Math.round(20 * scale), fontWeight: '700' as const },
      h4: { fontSize: Math.round(18 * scale), fontWeight: '700' as const },
      body: { fontSize: Math.round(15 * scale), fontWeight: '400' as const },
      bodyBold: { fontSize: Math.round(15 * scale), fontWeight: '600' as const },
      caption: { fontSize: Math.round(12 * scale), fontWeight: '500' as const },
      label: { fontSize: Math.round(12 * scale), fontWeight: '600' as const, letterSpacing: 0.5 },
    },
  };
};

// Accent color palette for user customization
export type AccentColorKey = 'green' | 'blue' | 'purple' | 'orange' | 'pink' | 'teal';

export interface AccentColorDefinition {
  key: AccentColorKey;
  name: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
}

export const ACCENT_COLORS: Record<AccentColorKey, AccentColorDefinition> = {
  green: {
    key: 'green',
    name: 'Forest',
    primary: '#37ec13',
    primaryHover: '#2ed60e',
    primaryLight: '#37ec1333',
  },
  blue: {
    key: 'blue',
    name: 'Ocean',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryLight: '#3b82f633',
  },
  purple: {
    key: 'purple',
    name: 'Amethyst',
    primary: '#a855f7',
    primaryHover: '#9333ea',
    primaryLight: '#a855f733',
  },
  orange: {
    key: 'orange',
    name: 'Sunset',
    primary: '#f97316',
    primaryHover: '#ea580c',
    primaryLight: '#f9731633',
  },
  pink: {
    key: 'pink',
    name: 'Rose',
    primary: '#ec4899',
    primaryHover: '#db2777',
    primaryLight: '#ec489933',
  },
  teal: {
    key: 'teal',
    name: 'Lagoon',
    primary: '#14b8a6',
    primaryHover: '#0d9488',
    primaryLight: '#14b8a633',
  },
} as const;

// Get accent color values for the selected accent color
export const getAccentColor = (accentColorKey: AccentColorKey): AccentColorDefinition => {
  return ACCENT_COLORS[accentColorKey] ?? ACCENT_COLORS.green;
};

// Get dynamic primary colors based on accent selection
export const getDynamicPrimaryColors = (accentColorKey: AccentColorKey) => {
  const accent = getAccentColor(accentColorKey);
  return {
    primary: accent.primary,
    primaryHover: accent.primaryHover,
    primaryLight: accent.primaryLight,
  };
};

// Theme object for easier access
export const theme = {
  colors: COLORS,
  spacing: SPACING,
  radii: RADII,
  typography: TYPOGRAPHY,
  sizes: SIZES,
  shadows: SHADOWS,
  borderWidths: BORDER_WIDTHS,
  screen: SCREEN,
  elevation: ELEVATION,
  animation: ANIMATION,
  opacity: OPACITY,
  zIndex: Z_INDEX,
  utils: {
    withAlpha,
    getThemedColors,
  },
} as const;

export type Theme = typeof theme;

/**
 * Usage Examples:
 *
 * // Import theme tokens
 * import { COLORS, SPACING, RADII, TYPOGRAPHY } from '@/lib/ui/theme';
 *
 * // Using in styles
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: COLORS.light.background,
 *     padding: SPACING.lg,
 *     borderRadius: RADII.lg,
 *   },
 *   title: {
 *     ...TYPOGRAPHY.styles.h1,
 *     color: COLORS.light.text,
 *   },
 *   button: {
 *     backgroundColor: COLORS.primary,
 *     paddingHorizontal: SPACING.xl,
 *     paddingVertical: SPACING.md,
 *     borderRadius: RADII.lg,
 *     ...SHADOWS.primary,
 *   },
 * });
 *
 * // Dark mode support
 * import { useColorScheme } from 'react-native';
 * import { getThemedColors } from '@/lib/ui/theme';
 *
 * const MyComponent = () => {
 *   const colorScheme = useColorScheme();
 *   const isDark = colorScheme === 'dark';
 *   const colors = getThemedColors(isDark);
 *
 *   return (
 *     <View style={{ backgroundColor: colors.background }}>
 *       <Text style={{ color: colors.text }}>Hello</Text>
 *     </View>
 *   );
 * };
 */

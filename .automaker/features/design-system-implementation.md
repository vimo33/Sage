# Design System Implementation

## Overview
Implement the updated design system from `lib/ui/theme.ts` across all components and screens in the Sage AI app. The design system is now based on the design reference and includes proper light/dark mode support.

## Status
**Priority:** High
**Status:** Not Started
**Created:** 2026-01-13

## Goals
1. Update all existing components to use the new design system tokens
2. Ensure consistent dark/light mode support across the app
3. Fix all TypeScript errors related to the theme update
4. Apply the design reference visual style consistently

## Design System Changes

### Color System
- **Old:** Flat color structure (`COLORS.background`, `COLORS.surface`)
- **New:** Nested structure with light/dark modes (`COLORS.light.background`, `COLORS.dark.background`)
- Added neutral color palette (50-900)
- Added semantic colors (success, danger, warning, info)
- Added primary color variants (hover, light, text)

### Typography
- **Old:** Simple styles (`TYPOGRAPHY.title`, `TYPOGRAPHY.body`)
- **New:** Comprehensive system with:
  - Font sizes (xs to 4xl)
  - Font weights (light to bold)
  - Line heights (tight to loose)
  - Letter spacing
  - Predefined styles (`TYPOGRAPHY.styles.h1`, etc.)

### Other Updates
- Added `RADII.full` (replaces old `RADII.pill`)
- Expanded spacing scale (added 4xl, 5xl)
- Enhanced shadow system (added lg, primary)
- New constants: ANIMATION, OPACITY, Z_INDEX
- Helper functions: `getThemedColors(isDark)`

## Files Requiring Updates

### App Screens (Priority: High)
- [ ] `app/(tabs)/index.tsx` - Home screen
- [ ] `app/(tabs)/insights.tsx` - Insights screen
- [ ] `app/(tabs)/journal.tsx` - Journal screen
- [ ] `app/(tabs)/settings.tsx` - Settings screen
- [ ] `app/onboarding.tsx` - Onboarding flow
- [ ] `app/ask.tsx` - Ask/Chat screen
- [ ] `app/debug.tsx` - Debug screen

### UI Components (Priority: High)
- [ ] `lib/ui/DailyWisdomWidget.tsx` - Daily wisdom card
- [ ] `components/ModelErrorScreen.tsx` - Error screen
- [ ] All components in `components/chat/`
- [ ] All components in `components/common/`
- [ ] All components in `components/journal/`

### Migration Pattern

#### Before (Old System):
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  text: {
    color: COLORS.textMuted,
    ...TYPOGRAPHY.body,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADII.pill,
  },
});
```

#### After (New System):
```typescript
import { useColorScheme } from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY, getThemedColors } from '@/lib/ui/theme';

const MyComponent = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = getThemedColors(isDark);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: SPACING.lg,
    },
    text: {
      color: colors.textMuted,
      ...TYPOGRAPHY.styles.body,
    },
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderRadius: RADII.full,
    },
  });

  return <View style={styles.container}>...</View>;
};
```

## Testing Requirements
- [ ] Verify all screens render correctly in light mode
- [ ] Verify all screens render correctly in dark mode
- [ ] Verify color scheme transitions smoothly
- [ ] Check that all text is readable (proper contrast)
- [ ] Verify buttons and interactive elements have proper touch targets
- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Run `npm run typecheck` - must pass with 0 errors
- [ ] Run `npm test` - all tests must pass

## Implementation Strategy

### Phase 1: Core Screens (Week 1)
1. Update home screen (`app/(tabs)/index.tsx`)
2. Update journal screen (`app/(tabs)/journal.tsx`)
3. Update insights screen (`app/(tabs)/insights.tsx`)
4. Update settings screen (`app/(tabs)/settings.tsx`)

### Phase 2: Components (Week 2)
1. Update `DailyWisdomWidget.tsx`
2. Update chat components
3. Update common components
4. Update journal components

### Phase 3: Auxiliary Screens (Week 3)
1. Update onboarding flow
2. Update ask/chat screen
3. Update debug screen
4. Update error screens

### Phase 4: Polish & Testing (Week 4)
1. Visual QA on all screens
2. Fix any remaining styling issues
3. Ensure consistent spacing and alignment
4. Add animations where appropriate
5. Final accessibility check

## Design Reference Elements to Implement

Based on `design_references/design_reference.md`, key UI patterns:

### Header Pattern
- Sticky header with blur effect
- Profile avatar on left (40px, with online indicator)
- App title centered
- Settings icon on right
- Background: semi-transparent with backdrop blur

### Card Pattern
- White background in light mode, `#1d271c` in dark mode
- Rounded corners (16-24px)
- Subtle shadows
- Primary color accent stripe for featured cards

### Button Pattern
- Primary: Green background (`#37ec13`), dark text (`#121811`)
- Hover state: Slightly darker green (`#2ed60e`)
- Shadow with primary color tint
- Active state: Scale down slightly (0.95)

### Typography Pattern
- Headings: Bold (700), tight line-height (1.25)
- Body: Regular (400), normal line-height (1.5)
- Captions: Medium (500), small size (12px)
- Labels: Semi-bold (600), uppercase, letter-spacing (0.5)

## Notes
- Keep the old color constants as fallbacks temporarily during migration
- Use `getThemedColors(isDark)` helper for dynamic color switching
- Consider creating reusable themed components (ThemedView, ThemedText, etc.)
- All new components MUST use the new design system from day one
- Test dark mode on actual devices as simulator colors may differ

## Related Files
- Design System: `lib/ui/theme.ts`
- Design Reference: `design_references/design_reference.md`
- Components: `components/`
- Screens: `app/`

## Success Criteria
✅ All TypeScript errors resolved
✅ All screens render correctly in light/dark mode
✅ Consistent visual language across the app
✅ Smooth theme transitions
✅ Accessible (proper contrast ratios)
✅ All tests passing
✅ No visual regressions

import {
  ACCENT_COLORS,
  getAccentColor,
  getDynamicPrimaryColors,
  type AccentColorKey,
} from '../lib/ui/theme';

describe('Theme Color Customization', () => {
  describe('ACCENT_COLORS palette', () => {
    it('should have all 6 accent colors defined', () => {
      const colorKeys: AccentColorKey[] = ['green', 'blue', 'purple', 'orange', 'pink', 'teal'];

      for (const key of colorKeys) {
        expect(ACCENT_COLORS[key]).toBeDefined();
        expect(ACCENT_COLORS[key].key).toBe(key);
        expect(ACCENT_COLORS[key].name).toBeTruthy();
        expect(ACCENT_COLORS[key].primary).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(ACCENT_COLORS[key].primaryHover).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(ACCENT_COLORS[key].primaryLight).toMatch(/^#[0-9a-fA-F]{8}$/);
      }
    });

    it('should have unique names for each color', () => {
      const names = Object.values(ACCENT_COLORS).map(c => c.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should have unique primary colors', () => {
      const primaries = Object.values(ACCENT_COLORS).map(c => c.primary);
      const uniquePrimaries = new Set(primaries);
      expect(uniquePrimaries.size).toBe(primaries.length);
    });
  });

  describe('getAccentColor', () => {
    it('should return the correct accent color for valid keys', () => {
      expect(getAccentColor('green').name).toBe('Forest');
      expect(getAccentColor('blue').name).toBe('Ocean');
      expect(getAccentColor('purple').name).toBe('Amethyst');
      expect(getAccentColor('orange').name).toBe('Sunset');
      expect(getAccentColor('pink').name).toBe('Rose');
      expect(getAccentColor('teal').name).toBe('Lagoon');
    });

    it('should return green as fallback for invalid key', () => {
      // @ts-expect-error - Testing invalid input
      const result = getAccentColor('invalid');
      expect(result.key).toBe('green');
    });
  });

  describe('getDynamicPrimaryColors', () => {
    it('should return dynamic color tokens for each accent color', () => {
      const blueColors = getDynamicPrimaryColors('blue');

      expect(blueColors.primary).toBe(ACCENT_COLORS.blue.primary);
      expect(blueColors.primaryHover).toBe(ACCENT_COLORS.blue.primaryHover);
      expect(blueColors.primaryLight).toBe(ACCENT_COLORS.blue.primaryLight);
    });

    it('should return different colors for different accent selections', () => {
      const greenColors = getDynamicPrimaryColors('green');
      const purpleColors = getDynamicPrimaryColors('purple');

      expect(greenColors.primary).not.toBe(purpleColors.primary);
      expect(greenColors.primaryHover).not.toBe(purpleColors.primaryHover);
      expect(greenColors.primaryLight).not.toBe(purpleColors.primaryLight);
    });
  });

  describe('Color format validation', () => {
    it('should have primary colors in correct hex format', () => {
      for (const color of Object.values(ACCENT_COLORS)) {
        // Primary and hover should be 6-character hex
        expect(color.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(color.primaryHover).toMatch(/^#[0-9a-fA-F]{6}$/);
        // Primary light should be 8-character hex (with alpha)
        expect(color.primaryLight).toMatch(/^#[0-9a-fA-F]{8}$/);
      }
    });

    it('should have primaryLight colors at 20% opacity', () => {
      for (const color of Object.values(ACCENT_COLORS)) {
        // The last two characters should be '33' for 20% opacity
        expect(color.primaryLight.slice(-2)).toBe('33');
      }
    });
  });
});

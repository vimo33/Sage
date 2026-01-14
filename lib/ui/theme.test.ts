import {
  FONT_SIZE_SCALE,
  getScaledFontSize,
  getScaledTypography,
  type FontSizePreference,
} from './theme';

describe('Font Size Scaling', () => {
  describe('FONT_SIZE_SCALE', () => {
    it('should have correct scale factors', () => {
      expect(FONT_SIZE_SCALE.small).toBe(0.85);
      expect(FONT_SIZE_SCALE.medium).toBe(1.0);
      expect(FONT_SIZE_SCALE.large).toBe(1.2);
    });
  });

  describe('getScaledFontSize', () => {
    it('should return smaller font size for small preference', () => {
      const baseFontSize = 16;
      const scaled = getScaledFontSize(baseFontSize, 'small');
      expect(scaled).toBe(14); // 16 * 0.85 = 13.6, rounded to 14
    });

    it('should return same font size for medium preference', () => {
      const baseFontSize = 16;
      const scaled = getScaledFontSize(baseFontSize, 'medium');
      expect(scaled).toBe(16); // 16 * 1.0 = 16
    });

    it('should return larger font size for large preference', () => {
      const baseFontSize = 16;
      const scaled = getScaledFontSize(baseFontSize, 'large');
      expect(scaled).toBe(19); // 16 * 1.2 = 19.2, rounded to 19
    });
  });

  describe('getScaledTypography', () => {
    it('should return scaled font sizes for small preference', () => {
      const scaledTypography = getScaledTypography('small');

      // Base font size is 15, scaled by 0.85 = 12.75, rounded to 13
      expect(scaledTypography.styles.body.fontSize).toBe(13);
      // H1 is 30, scaled by 0.85 = 25.5, rounded to 26
      expect(scaledTypography.styles.h1.fontSize).toBe(26);
    });

    it('should return original font sizes for medium preference', () => {
      const scaledTypography = getScaledTypography('medium');

      // Base font size is 15
      expect(scaledTypography.styles.body.fontSize).toBe(15);
      // H1 is 30
      expect(scaledTypography.styles.h1.fontSize).toBe(30);
    });

    it('should return scaled font sizes for large preference', () => {
      const scaledTypography = getScaledTypography('large');

      // Base font size is 15, scaled by 1.2 = 18
      expect(scaledTypography.styles.body.fontSize).toBe(18);
      // H1 is 30, scaled by 1.2 = 36
      expect(scaledTypography.styles.h1.fontSize).toBe(36);
    });

    it('should preserve font weights and line heights', () => {
      const fontSizes: FontSizePreference[] = ['small', 'medium', 'large'];

      fontSizes.forEach((size) => {
        const scaledTypography = getScaledTypography(size);

        // All sizes should preserve font weights
        expect(scaledTypography.styles.body.fontWeight).toBe('400');
        expect(scaledTypography.styles.bodyBold.fontWeight).toBe('600');
        expect(scaledTypography.styles.h1.fontWeight).toBe('700');

        // All sizes should preserve line heights
        expect(scaledTypography.styles.body.lineHeight).toBe(1.5);
        expect(scaledTypography.styles.h1.lineHeight).toBe(1.25);
      });
    });

    it('should return all typography styles', () => {
      const scaledTypography = getScaledTypography('medium');

      expect(scaledTypography.styles).toHaveProperty('h1');
      expect(scaledTypography.styles).toHaveProperty('h2');
      expect(scaledTypography.styles).toHaveProperty('h3');
      expect(scaledTypography.styles).toHaveProperty('h4');
      expect(scaledTypography.styles).toHaveProperty('body');
      expect(scaledTypography.styles).toHaveProperty('bodyBold');
      expect(scaledTypography.styles).toHaveProperty('caption');
      expect(scaledTypography.styles).toHaveProperty('label');
    });

    it('should return all fontSize options', () => {
      const scaledTypography = getScaledTypography('medium');

      expect(scaledTypography.fontSize).toHaveProperty('xs');
      expect(scaledTypography.fontSize).toHaveProperty('sm');
      expect(scaledTypography.fontSize).toHaveProperty('base');
      expect(scaledTypography.fontSize).toHaveProperty('lg');
      expect(scaledTypography.fontSize).toHaveProperty('xl');
      expect(scaledTypography.fontSize).toHaveProperty('2xl');
      expect(scaledTypography.fontSize).toHaveProperty('3xl');
      expect(scaledTypography.fontSize).toHaveProperty('4xl');
    });
  });
});

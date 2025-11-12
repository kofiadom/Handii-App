// Theme based on Handii-figma design system
export const Colors = {
  light: {
    background: '#ffffff',
    foreground: '#030213',
    card: '#ffffff',
    cardForeground: '#030213',
    primary: '#030213',
    primaryForeground: '#ffffff',
    secondary: '#f3f3f5',
    secondaryForeground: '#030213',
    muted: '#ececf0',
    mutedForeground: '#717182',
    accent: '#e9ebef',
    accentForeground: '#030213',
    destructive: '#d4183d',
    destructiveForeground: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)',
    input: '#f3f3f5',
    ring: '#b5b5b5',
  },
  dark: {
    background: '#030213',
    foreground: '#fafafa',
    card: '#030213',
    cardForeground: '#fafafa',
    primary: '#fafafa',
    primaryForeground: '#1a1a1a',
    secondary: '#2a2a2a',
    secondaryForeground: '#fafafa',
    muted: '#2a2a2a',
    mutedForeground: '#b5b5b5',
    accent: '#2a2a2a',
    accentForeground: '#fafafa',
    destructive: '#d4183d',
    destructiveForeground: '#fca5a5',
    border: '#2a2a2a',
    input: '#2a2a2a',
    ring: '#6b6b6b',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const FontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
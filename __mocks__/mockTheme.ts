// https://reactnavigation.org/docs/themes/
const common = {
  gradient: {
    primary: ['#FF4EC7', '#FF8A34'],
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },

  typography: {
    display: {
      fontFamily: 'Inter-Bold',
      fontSize: 32,
      lineHeight: 40,
    },
    title: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 20,
      lineHeight: 28,
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      lineHeight: 22,
    },
    caption: {
      fontFamily: 'Inter-Light',
      fontSize: 13,
      lineHeight: 18,
    },
    aiQuote: {
      fontFamily: 'SpaceGrotesk-Regular',
      fontSize: 14,
      fontStyle: 'italic',
      lineHeight: 20,
    },
  },
};

const darkTheme = {
  colors: {
    primary: '#FF4EC7',
    secondary: '#FF8A34',
    divider: '#FF8A34',
    background: '#0A0A10',
    card: '#14141A',
    surface: '#1C1C24',
    border: '#2E2E3A',
    text: '#FFFFFF',
    textPrimary: '#FFFFFF',
    textSecondary: '#C2C2CE',
    success: '#8AF8A2',
    error: '#FF5D5D',
  },
  ...common,
};

export const mockTheme = {
  ...darkTheme,
};
// No need to mock both themes at this time 11/25/2025

type Colors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  divider: string;
  success: string;
  error: string;
};
type Gradient = {
  primary: string[];
};
type Radius = {
  sm: number;
  md: number;
  lg: number;
};
type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};
interface DefaultTypography {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontStyle?: string;
}

interface Theme {
  colors: Colors;
  gradient: Gradient;
  radius: Radius;
  spacing: Spacing;
  typography: {
    display: DefaultTypography;
    title: DefaultTypography;
    body: DefaultTypography;
    caption: DefaultTypography;
    aiQuote: DefaultTypography;
  };
}
export const theme: Theme = {
  colors: {
    primary: '#7C3AED',
    secondary: '#00C6FF',
    background: '#0B0B14',
    surface: '#141427',
    textPrimary: '#F5F5F7',
    textSecondary: '#9CA3AF',
    divider: '#2C2C3A',
    success: '#2DD4BF',
    error: '#FB7185',
  },
  gradient: {
    primary: ['#7C3AED', '#00C6FF'],
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

export const darkTheme = {
  ...theme,
  mode: 'dark',
};
export const lightTheme = {
  ...theme,
  mode: 'light',
  colors: {
    ...theme.colors,
    background: '#FAFAFA',
    surface: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#4A4A4A',
    divider: '#E3E3E3',
  },
};

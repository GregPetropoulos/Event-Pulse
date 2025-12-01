// https://reactnavigation.org/docs/themes/
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
// type Colors = {
//   primary: string;
//   secondary: string;
//   background: string;
//   surface: string;
//   textPrimary: string;
//   textSecondary: string;
//   divider: string;
//   success: string;
//   error: string;
// };
// type Gradient = {
//   primary: string[];
// };
// type Radius = {
//   sm: number;
//   md: number;
//   lg: number;
// };
// type Spacing = {
//   xs: number;
//   sm: number;
//   md: number;
//   lg: number;
//   xl: number;
// };
// interface DefaultTypography {
//   fontFamily: string;
//   fontSize: number;
//   lineHeight: number;
//   fontStyle?: string;
// }

// interface Theme {
//   colors: Colors;
//   gradient: Gradient;
//   radius: Radius;
//   spacing: Spacing;
//   typography: {
//     display: DefaultTypography;
//     title: DefaultTypography;
//     body: DefaultTypography;
//     caption: DefaultTypography;
//     aiQuote: DefaultTypography;
//   };
// }
export type ThemeMode = 'light' | 'dark';
const common = {
  gradient: {
    // primary: ['#7C3AED', '#00C6FF'],
    primary: ['#FF4EC7', '#FF8A34'],
    secondary: ['#00C7FF', '#7C3AED'],
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
  components: {
    secondaryButton: {
      xs: {
        fontFamily: 'Inter-Light',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 600,
      },
      sm: {
        fontFamily: 'Inter-Light',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 600,
      },
      md: {
        fontFamily: 'Inter-Light',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 600,
      },
      lg: {
        fontFamily: 'Inter-Light',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 600,
      },
    },
    primaryButton: {
      xs: {
        fontFamily: 'Inter-Light',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 600,
      },
      sm: {
        fontFamily: 'Inter-Light',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 600,
      },
      md: {
        fontFamily: 'Inter-Light',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 600,
      },
      lg: {
        fontFamily: 'Inter-Light',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 600,
      },
    },
    cancelButton: {
      xs: {
        fontFamily: 'Inter-Light',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 600,
      },
      sm: {
        fontFamily: 'Inter-Light',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 600,
      },
      md: {
        fontFamily: 'Inter-Light',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 600,
      },
      lg: {
        fontFamily: 'Inter-Light',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 600,
      },
    },
  },
} as const;

const darkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    // primary: '#7C3AED', // stays the same in both themes
    // secondary: '#00C6FF', // stays the same in both themes
    // background: '#0B0B14',
    // card: '#141427',
    // surface: '#141427',
    // text: '#F5F5F7', // Due to RNavigation
    // textPrimary: '#F5F5F7',
    // textSecondary: '#9CA3AF',
    // divider: '#2C2C3A',
    // border: '#2C2C3A',
    // success: '#2DD4BF',
    // error: '#FB7185',
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
  // fonts:{
  //   ...defaultFont
  // }
};

const lightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#7C3AED', // stays the same in both themes
    // secondary: '#00C6FF',
    primary: '#FF4EC7',
    secondary: '#FF8A34',
    background: '#FAFAFA',
    card: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textPrimary: '#1A1A1A',
    textSecondary: '#4A4A4A',
    divider: '#FF8A34',
    border: '#E3E3E3',
    success: '#8AF8A2',
    error: '#FF5D5D',
  },
  ...common,
  // fonts:{
  //   ...defaultFont
  // }
};

export const THEMES = {
  light: lightTheme,
  dark: darkTheme,
};

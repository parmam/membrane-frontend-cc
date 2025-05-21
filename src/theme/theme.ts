// Define el tema de la aplicación usando CSS variables

interface Breakpoint {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface Color {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}

interface Palette {
  primary: Color;
  secondary: Color;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  common: {
    black: string;
    white: string;
  };
  success: Color;
  error: Color;
  divider: string;
}

interface Typography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    bold: number;
  };
}

export interface Theme {
  breakpoints: Breakpoint;
  palette: Palette;
  typography: Typography;
}

export type ThemeMode = 'light' | 'dark';

// Define temas light y dark
const themeConfig = {
  breakpoints: {
    xs: 600,
    sm: 900,
    md: 1200,
    lg: 1536,
    xl: 1920,
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  palettes: {
    light: {
      primary: {
        main: '#BD790B',
        light: '#E5A040',
        dark: '#8A5A0A',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FF9A4E',
        light: '#FFBC85',
        dark: '#DD7E2D',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F5F5F5',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
      common: {
        black: '#0D0604',
        white: '#FFFFFF',
      },
      success: {
        main: '#18D22B',
        light: '#5AE768',
        dark: '#0FAD21',
        contrastText: '#FFFFFF',
      },
      error: {
        main: '#D32F2F',
        light: '#EF5350',
        dark: '#B71C1C',
        contrastText: '#FFFFFF',
      },
      divider: '#E0E0E0',
    },
    dark: {
      primary: {
        main: '#BD790B',
        light: '#E5A040',
        dark: '#8A5A0A',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FF9A4E',
        light: '#FFBC85',
        dark: '#DD7E2D',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#0D0604',
        paper: '#322E2C',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#CCCCCC',
      },
      common: {
        black: '#0D0604',
        white: '#FFFFFF',
      },
      success: {
        main: '#18D22B',
        light: '#5AE768',
        dark: '#0FAD21',
        contrastText: '#FFFFFF',
      },
      error: {
        main: '#D32F2F',
        light: '#EF5350',
        dark: '#B71C1C',
        contrastText: '#FFFFFF',
      },
      divider: 'rgb(87, 72, 49)',
    },
  },
};

const theme: Theme = {
  breakpoints: themeConfig.breakpoints,
  palette: themeConfig.palettes.dark,
  typography: themeConfig.typography,
};

export const getLightTheme = (): Theme => ({
  breakpoints: themeConfig.breakpoints,
  palette: themeConfig.palettes.light,
  typography: themeConfig.typography,
});

export const getDarkTheme = (): Theme => ({
  breakpoints: themeConfig.breakpoints,
  palette: themeConfig.palettes.dark,
  typography: themeConfig.typography,
});

export default theme;

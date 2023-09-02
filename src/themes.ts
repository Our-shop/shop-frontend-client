import { createTheme } from '@mui/material';

export const colors = {
  lightViolet: '#8976e9ad',
  middleBlue: '#9487E1',
  darkViolet: '#645d8d',
  green: '#00FF00',
  black: '#000000',
  dark: '#140A03',
  lightGrey: '#F3F5F7',
  slightGrey: '#e4e4ed',
  white: '#FFFFFF',
  lightOrange: '#E27B3A',
  error: '#FF0000',
  warning: '#FFD700',
};

const themes = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: colors.lightViolet,
      main: colors.darkViolet,
      dark: colors.darkViolet,
    },
    error: {
      light: colors.error,
      main: colors.error,
      dark: colors.error,
    },
    warning: {
      light: colors.warning,
      main: colors.warning,
      dark: colors.warning,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 5,
  },
});

export default themes;

import { createTheme } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#0a499b' : '#FECD55',
        light: '#FFD87D',
        dark: '#FEBE2D',
        contrastText: mode === 'light' ? '#FFFFFF' : '#1F1E1C',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });

export default getTheme;

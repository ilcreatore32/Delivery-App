/* Material UI */
import { createTheme } from "@mui/material/styles";

export const Dark = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#000',
          contrastText: '#fff',
        },
      },
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#2aebc9',
    },
    secondary: {
      main: '#6547e2',
    },
    background: {
      default: '#1e1f22',
      paper: '#0c0d0f',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.5)',
      hint: 'rgba(255,255,255,0.5)',
    },
    success: {
      main: '#33cc96',
      light: '#5bd6ab',
      dark: '#238e69',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    divider: 'rgba(255,255,255,0.12)',
    info: {
      main: '#2196f3',
    },
    error: {
      main: '#e94544',
    },
  },
});

export const Light = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#fff",
          contrastText: "#000",
        },
      },
    },
    /* MuiIconButton: {
      styleOverrides: {
        root: {
          background: "#e0e0e0",
          boxShadow: [
            "inset 20px 20px 60px #bebebe",
            "inset -20px -20px 60px #ffffff",
          ],
        },
      },
    }, */
  },
  palette: {
    type: 'light',
    primary: {
      main: '#5e44d8',
    },
    secondary: {
      main: '#07d494',
    },
    background: {
      default: '#f4f3f8',
      paper: '#fefeff',
    },
    error: {
      main: '#fc4938',
    },
  },
});

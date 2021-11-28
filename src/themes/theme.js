/* Material UI */
import { createTheme } from "@mui/material/styles";

export const Dark = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#000",
          contrastText: "#fff",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#5b36b4",
    },
    secondary: {
      main: "#33cc96",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)",
      disabled: "rgba(255,255,255,0.5)",
      hint: "rgba(255,255,255,0.5)",
    },
    success: {
      main: "#33cc96",
      light: "#5bd6ab",
      dark: "#238e69",
      contrastText: "rgba(0,0,0,0.87)",
    },
    divider: "rgba(255,255,255,0.12)",
    info: {
      main: "#2196f3",
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
  },
  palette: {
    type: "light",
    primary: {
      main: "#5b36b4",
    },
    secondary: {
      main: "#33cc96",
    },
  },
});

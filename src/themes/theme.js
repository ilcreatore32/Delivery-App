/* Material UI */
import { createTheme } from "@mui/material/styles";

export const Dark = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          body: {
            backgroundColor: "#0c0d0f !important",
          },
        },
        body: {
          backgroundColor: "#0c0d0f !important",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#202128",
          contrastText: "#fff",
        },
        root: {
          borderBottom: "1px solid #2aebc987",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "#2aebc9 !important",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        colorPrimary: {
          color: "inherit !important",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "inherit !important",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#6547e2",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#2aebc980 !important",
          "&:hover": {
            backgroundColor: "#5e44d80f",
            color: "#2aebc987",
          },
          "&.Mui-selected": {
            color: "#2aebc9 !important",
            backgroundColor: "#5e44d80f",
          },
        },
      },
    },
  },
  palette: {
    type: "dark",
    background: {
      default: "#0c0d0f"
    },
    primary: {
      main: "#2aebc9",
    },
    secondary: {
      main: "#6547e2",
    },
    background: {
      default: "#1e1f22",
      paper: "#0c0d0f",
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
    error: {
      main: "#e94544",
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
        root: {
          borderBottom: "1px solid #5e44d88a",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-outlined": {
            padding: ".3rem .8rem !important",
            height: "fit-content !important",
            borderRadius: "4px !important",
            border: "1px solid #5e44d88a",
          },
          "&:hover": {
            border: "1px solid #5e44d8",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "#5e44d8 !important",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "inherit !important",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#5e44d8cc !important",
          "&:hover": {
            backgroundColor: "#07d4940d",
            color: "#2aebc987",
          },
          "&.Mui-selected": {
            color: "#5e44d8 !important",
            backgroundColor: "#07d4940d",
          },
        },
      },
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#5e44d8",
    },
    secondary: {
      main: "#07d494",
    },
    background: {
      default: "#f4f3f8",
      paper: "#fefeff",
    },
    error: {
      main: "#fc4938",
    },
  },
});

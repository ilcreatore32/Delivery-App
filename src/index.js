import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* Material UI */
import { createTheme, ThemeProvider } from "@mui/material/styles";

/* React-Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#23272a",
    },
    secondary: {
      main: "#4a44f8",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* Material UI */
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

/* Themes */
import { Light, Dark } from "./styles/theme";

/* React-Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={Dark}>
        <App />
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById("root")
);

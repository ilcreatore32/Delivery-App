import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* Context */
import {userContext} from './context/userContext';

/* Material UI */
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

/* Themes */
// eslint-disable-next-line
import { Light, Dark } from "./themes/theme";

/* React-Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <userContext.Provider>
    <ThemeProvider theme={Light}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    </userContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

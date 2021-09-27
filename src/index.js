import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* Redux */
import store from './config/store';
import { Provider } from "react-redux";

/* Material UI */
import { createTheme, ThemeProvider } from "@mui/material/styles";

/* React-Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";

const DarkTheme = createTheme({
  palette: {
    dark: {
      main: "#212121",
    },
    secondary: {
      main: "#00e55f",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={DarkTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

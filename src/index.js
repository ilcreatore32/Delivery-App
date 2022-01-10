import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* Material UI */
import { CssBaseline } from "@mui/material";
import UserProvider from "./context/UserContextT";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <CssBaseline />
    <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

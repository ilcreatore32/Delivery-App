import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* Material UI */
import UserProvider from "./context/UserContextT";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <App/>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

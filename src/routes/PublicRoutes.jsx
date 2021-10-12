import React from "react";

/* React-Router */
import { Route } from "react-router-dom";

/* Public Routes */
import Home from "../pages/Home/Home";

function PublicRoutes() {
  return (
    <>
      <Route path="/" exact component={Home} />
    </>
  );
}

export default PublicRoutes;

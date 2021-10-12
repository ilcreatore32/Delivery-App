import React from "react";

/* Routes */
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

function Routes({ auth }) {
  return (
    <>
      <PublicRoutes />
      <PrivateRoutes auth={auth} />
    </>
  );
}

export default Routes;

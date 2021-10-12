import React from "react";

/* React-Router */
import { Route, Redirect } from "react-router-dom";

/* Private Pages */

/* Envios */
import Envios from "../pages/Envios/Envios";
import EnviosDetails from "../pages/Envios/EnviosDetails/EnviosDetails";
import Asumidos from "../pages/Asumidos/Asumidos";

/* Servicios */
import Servicios from "../pages/Servicios/Servicios";
import ServiciosDetails from "../pages/Servicios/ServiciosDetails/ServiciosDetails";
import Edit from "../pages/Servicios/Edit/Edit";

/* Vehiculos */
import Vehiculos from "../pages/Vehiculos/Vehiculos";

/* Cuenta */
import Cuenta from "../pages/Cuenta/Cuenta";
import EditarCuenta from "../pages/Cuenta/EditarCuenta/EditarCuenta";

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
};

function PrivateRoutes({auth}) {
  return (
    <>
      <PrivateRoute path="/Envios" exact component={Envios} auth={auth} />
      <PrivateRoute
        path="/Envios/Detalles/:id"
        exact
        component={EnviosDetails}
        auth={auth}
      />
      {/* Cuenta */}
      <PrivateRoute path="/Cuenta" exact component={Cuenta} auth={auth} />
      <PrivateRoute
        path="/Cuenta/Editar"
        exact
        component={EditarCuenta}
        auth={auth}
      />
      {/* Transportista */}
      <PrivateRoute path={`/Asumidos`} exact component={Asumidos} auth={auth} />
      <PrivateRoute
        path={`/Servicios`}
        exact
        component={Servicios}
        auth={auth}
      />
      <PrivateRoute
        path={`/Servicios/Detalles/:id`}
        exact
        component={ServiciosDetails}
        auth={auth}
      />
      <PrivateRoute
        path={`/Servicios/Editar/:id`}
        exact
        component={Edit}
        auth={auth}
      />
      <PrivateRoute
        path={`/Vehiculos`}
        exact
        component={Vehiculos}
        auth={auth}
      />
    </>
  );
}

export default PrivateRoutes;

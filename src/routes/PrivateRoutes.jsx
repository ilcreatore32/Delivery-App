import React from "react";

/* React-Router */
import { Route, Redirect } from "react-router-dom";

/* Private Pages */

/* Envios */
import Envios from "../pages/Envios/Envios";
import { default as EnviosDetails } from "../pages/Envios/Details/Details";
import Asumidos from "../pages/Asumidos/Asumidos";

/* Servicios */
import Servicios from "../pages/Servicios/Servicios";
import { default as ServiciosAdd } from "../pages/Servicios/Add/Add";
import { default as ServiciosDetails } from "../pages/Servicios/Details/Details";
import { default as ServiciosEdit } from "../pages/Servicios/Edit/Edit";

/* Vehiculos */
import Vehiculos from "../pages/Vehiculos/Vehiculos";

/* Usuarios */
import Usuarios from "../pages/Usuarios/Usuarios";

/* Pagos */
import Pagos from "../pages/Pagos/Pagos";

/* Cuenta */
import Cuenta from "../pages/Cuenta/Cuenta";
import { default as CuentaEdit } from "../pages/Cuenta/Edit/Edit";

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

function PrivateRoutes({ auth }) {
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
        path="/Cuenta/Editar/:id"
        exact
        component={CuentaEdit}
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
        path={`/Servicios/Añadir`}
        exact
        component={ServiciosAdd}
        auth={auth}
      />
      <PrivateRoute
        path={`/Servicios/Editar/:id`}
        exact
        component={ServiciosEdit}
        auth={auth}
      />
      <PrivateRoute
        path={`/Vehiculos`}
        exact
        component={Vehiculos}
        auth={auth}
      />
      <PrivateRoute path={`/Usuarios`} exact component={Usuarios} auth={auth} />
      <PrivateRoute path={`/Pagos`} exact component={Pagos} auth={auth} />
    </>
  );
}

export default PrivateRoutes;

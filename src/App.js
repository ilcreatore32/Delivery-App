import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

/* App Pages */
import Envios from "./pages/Envios/Envios";
/* Cuenta */
import Cuenta from './pages/Cuenta/Cuenta';
import EditarCuenta from './pages/Cuenta/EditarCuenta/EditarCuenta';
/* Transportista*/
import Vehiculos from "./pages/Vehiculos/Vehiculos";
import Servicios from "./pages/Servicios/Servicios";
import Asumidos from "./pages/Asumidos/Asumidos";
import NoMatch from "./pages/NoMatch";

/* CSS */
import "./styles/App.css";
import "./styles/Responsive.css";

function App() {
  const tran = "/Transportista";

  return (
    <>
      <Router>
        <header className="header">
          <h2>Delivery App</h2>
          <div className="header-nav">
            <div className="header-nav-link">
              <div className="header-nav-link-left">
                <NavLink to="/" activeClassName="active-link" className="link">
                  Envios
                </NavLink>
                <NavLink to="/" activeClassName="active-link" className="link">
                  Transporte
                </NavLink>
              </div>
              <div className="header-nav-link-right">
                <NavLink to="/" activeClassName="active-link" className="link">
                  Usuario
                </NavLink>
              </div>
            </div>
          </div>
        </header>

        <div className="app-page wrapper">
          <Switch>
            <Route path="/" exact component={Envios} />
            {/* Cuenta */}
            <Route path="/Cuenta" exact component={Cuenta} />
            <Route path="/Cuenta/Editar" exact component={EditarCuenta} />
            {/* Transportista */}
            <Route path={`${tran}/Asumidos`} exact component={Asumidos} />
            <Route path={`${tran}/Servicios`} exact component={Servicios} />
            <Route path={`${tran}/Vehiculos`} exact component={Vehiculos} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;

import { React } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

/* App Pages*/
import Services from "./pages/Services";
import Products from "./pages/Products";
import Account from "./pages/Account";
import NoMatch from "./pages/NoMatch";

import "./styles/App.css";

function App() {
  return (
    <>
      <Router>
        <header className="header">
          <h1>Delivery App</h1>
        </header>
        <main className="app-div container wrapper">
          <div className="border">
            <nav>
              <ul className="tabs-div">
                <NavLink
                  to="/"
                  exact
                  activeClassName="tab-active"
                  className="tab"
                >
                  <h2>Servicios de Transporte</h2>
                </NavLink>
                <NavLink
                  to="/products"
                  activeClassName="tab-active"
                  className="tab"
                >
                  <h2>Envíos</h2>
                </NavLink>
                <NavLink
                  to="/account"
                  activeClassName="tab-active"
                  className="tab"
                >
                  <h2>Manejo de Cuenta</h2>
                </NavLink>
              </ul>
            </nav>
            <div className="app-page wrapper">
              <Switch>
                <Route path="/" exact component={Services} />
                <Route path="/products" component={Products} />
                <Route path="/account" component={Account} />
                <Route path="*" component={NoMatch} />
              </Switch>
            </div>
          </div>
        </main>
      </Router>
    </>
  );
}

export default App;

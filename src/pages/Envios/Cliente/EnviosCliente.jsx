import React from "react";

/* React-Router */
import { Link } from "react-router-dom";

/* React-Bootstrap */
import NavDropdown from "react-bootstrap/NavDropdown";

/* Components */
import RightSideComponent from "../../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../../components/LeftSideComponent/LeftSideComponent";

function EnviosCliente() {
  return (
    <>
      <div className="cliente-view">
        <div className="dashboard-menu">
          <div className="menu"></div>
          <div className="account-menu">
            <NavDropdown
              className="dark-dropdown"
              title="Cuenta"
              menuVariant="dark"
            >
              <NavDropdown.Item href="">Cambiar a Cliente</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/Cuenta">Su Cuenta</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">Salir</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <h1  className="text-center">Envios</h1>
        <div className="dashboard">
          <div className="dashboard-left-side-component">
            <LeftSideComponent envios={true} />
          </div>
          <div className="dashboard-right-side-component">
            <RightSideComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default EnviosCliente;

import React from "react";

/* DataTable Columns */
import { EnviosColumns } from "../../Models/DataTableColums";

/* React-Bootstrap */
import NavDropdown from "react-bootstrap/NavDropdown";

/* React-Router */
import { Link } from "react-router-dom";

/* Components */
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Asumidos() {
  const url = "/Transportista";

  return (
    <>
      <div className="transportista-view">
        <div className="dashboard-menu">
          <div className="menu">
            <NavDropdown
              className="dark-dropdown"
              title="Menu"
              menuVariant="dark"
            >
              <NavDropdown.Item>
                <Link to="/">Descubrir</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={`${url}/Servicios`}>Sus Servicios</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>Asumidos</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={`${url}/Vehiculos`}>Sus Vehiculos</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
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
        <h1 className="text-center">Envios Asumidos</h1>
        <div className="dashboard">
          <div className="dashboard-left-side-component">
            <LeftSideComponent envios={true} asumidos={true} />
          </div>
          <div className="dashboard-right-side-component">
            <RightSideComponent columns={EnviosColumns} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Asumidos;

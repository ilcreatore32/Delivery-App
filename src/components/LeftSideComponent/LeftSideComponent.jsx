import React from "react";

/* Components */
import Envios from "./Envios/Envios";
import Servicios from "./Servicios/Servicios";
import Vehiculos from "./Vehiculos/Vehiculos";

/* CSS*/
import "./LeftSideComponent.css";

function LeftSideComponent({ envios, servicios, vehiculos, asumidos, admin }) {
  return (
    <>
      <div className="left-side-component">
        {envios ? (
          <Envios asumidos={asumidos} admin={admin} />
        ) : servicios ? (
          <Servicios admin={admin} />
        ) : vehiculos ? (
          <Vehiculos admin={admin} />
        ) : null}
      </div>
    </>
  );
}

export default LeftSideComponent;

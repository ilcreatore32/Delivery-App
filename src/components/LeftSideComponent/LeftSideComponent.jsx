import React from "react";

/* Components */
import Envios from "./Envios/Envios";
import Servicios from "./Servicios/Servicios";
import Vehiculos from "./Vehiculos/Vehiculos";

/* CSS*/
import "./LeftSideComponent.css";

function LeftSideComponent({ envios, servicios, vehiculos, asumidos }) {
  return (
    <>
      <div className="left-side-component">
        {envios ? (
          <Envios asumidos={asumidos} />
        ) : servicios ? (
          <Servicios />
        ) : vehiculos ? (
          <Vehiculos />
        ) : (
          null
        )}
      </div>
    </>
  );
}

export default LeftSideComponent;

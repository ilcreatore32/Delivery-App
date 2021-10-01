import React from "react";

/* Material UI */
import { Paper } from "@mui/material";

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
        <Paper variant="outlined" sx={{ backgroundColor: "#2a232317" }}>
          {envios ? (
            <Envios asumidos={asumidos} admin={admin} />
          ) : servicios ? (
            <Servicios admin={admin} />
          ) : vehiculos ? (
            <Vehiculos admin={admin} />
          ) : null}
        </Paper>
      </div>
    </>
  );
}

export default LeftSideComponent;

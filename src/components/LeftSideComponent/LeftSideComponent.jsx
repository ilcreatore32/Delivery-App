import React from "react";

/* Material UI */
import { Paper } from "@mui/material";

/* Components */
import Envios from "./Envios/Envios";
import Servicios from "./Servicios/Servicios";
import Vehiculos from "./Vehiculos/Vehiculos";
import Pagos from "./Pagos/Pagos";
import Usuarios from "./Usuarios/Usuarios";

/* CSS*/
import "./LeftSideComponent.css";

function LeftSideComponent({
  envios,
  servicios,
  vehiculos,
  asumidos,
  pagos,
  usuarios,
  admin,
}) {
  return (
    <>
      <div className="left-side-component">
        <Paper elevation={8}>
          {envios ? (
            <Envios asumidos={asumidos} admin={admin} />
          ) : servicios ? (
            <Servicios admin={admin} />
          ) : vehiculos ? (
            <Vehiculos admin={admin} />
          ) : pagos ? (
            <Pagos admin={admin} />
          ) : usuarios ? (
            <Usuarios admin={admin} />
          ) : null}
        </Paper>
      </div>
    </>
  );
}

export default LeftSideComponent;

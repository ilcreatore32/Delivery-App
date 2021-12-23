import { useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";

/* Material UI */
import { Paper, Collapse } from "@mui/material";

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
  const FilterMenuContext = useContext(filterMenuContext);
  return (
    <>
      <Collapse in={FilterMenuContext.filterMenu}>
        <Paper variant="outlined">
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
      </Collapse>
    </>
  );
}

export default LeftSideComponent;

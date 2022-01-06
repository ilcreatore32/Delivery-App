import { useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";
import { userContext } from "../../context/userContext";

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
}) {
  const FilterMenuContext = useContext(filterMenuContext);
  const UserContext = useContext(userContext);
  const permissions = UserContext?.user?.Usuario_Permisos;
  return (
    <>
      <Collapse in={FilterMenuContext.filterMenu}>
        <Paper variant="outlined">
          {envios ? (
            <Envios asumidos={asumidos} admin={permissions} />
          ) : servicios ? (
            <Servicios admin={permissions} />
          ) : vehiculos ? (
            <Vehiculos admin={permissions} />
          ) : pagos ? (
            <Pagos admin={permissions} />
          ) : usuarios ? (
            <Usuarios admin={permissions} />
          ) : null}
        </Paper>
      </Collapse>
    </>
  );
}

export default LeftSideComponent;

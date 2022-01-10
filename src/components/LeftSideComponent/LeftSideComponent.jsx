import { useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";
/* import { userContext } from "../../context/userContext"; */

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
import { UserContext } from "../../context/UserContextT";

function LeftSideComponent({
  envios,
  servicios,
  vehiculos,
  asumidos,
  pagos,
  usuarios,
}) {
  const FilterMenuContext = useContext(filterMenuContext);
  /* const UserContext = useContext(userContext);
  const permissions = UserContext?.user?.Usuario_Permisos; */
  const { view_type } = useContext(UserContext);

  return (
    <>
      <Collapse in={FilterMenuContext.filterMenu}>
        <Paper variant="outlined">
          {envios ? (
            <Envios asumidos={asumidos} admin={view_type} />
          ) : servicios ? (
            <Servicios admin={view_type} />
          ) : vehiculos ? (
            <Vehiculos admin={view_type} />
          ) : pagos ? (
            <Pagos admin={view_type} />
          ) : usuarios ? (
            <Usuarios admin={view_type} />
          ) : null}
        </Paper>
      </Collapse>
    </>
  );
}

export default LeftSideComponent;

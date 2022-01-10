import { useContext } from "react";

/* Context */
import { userContext } from "../../context/userContext";
import { UserContext } from "../../context/UserContextT";

/* Types */
import EnviosTransportista from "./Transportista/EnviosTransportista";
import EnviosCliente from "./Cliente/EnviosCliente";

/* CSS */
import "./Envios.css";

function Envios() {
  const { view_type } = useContext(UserContext);/* 
  const UserContext = useContext(userContext);
  const permissions = UserContext?.user?.Usuario_Permisos; */

  return (
    <>
      {view_type === "A" ? <EnviosTransportista /> : null}
      {view_type === "C" ? <EnviosCliente /> : null}
      {view_type === "T" ? <EnviosTransportista /> : null}
    </>
  );
}

export default Envios;

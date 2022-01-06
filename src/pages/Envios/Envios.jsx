import { useContext } from "react";

/* Context */
import { userContext } from "../../context/userContext";

/* Types */
import EnviosTransportista from "./Transportista/EnviosTransportista";
import EnviosCliente from "./Cliente/EnviosCliente";

/* CSS */
import "./Envios.css";

function Envios() {
  const UserContext = useContext(userContext);
  const permissions = UserContext?.user?.Usuario_Permisos;

  return (
    <>
      {permissions === "A" ? <EnviosTransportista /> : null}
      {permissions === "C" ? <EnviosCliente /> : null}
      {permissions === "T" ? <EnviosTransportista /> : null}
    </>
  );
}

export default Envios;

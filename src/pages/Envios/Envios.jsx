import { useContext } from "react";

/* Context */
import { UserContext } from "../../context/UserContextT";

/* Types */
import EnviosTransportista from "./Transportista/EnviosTransportista";

function Envios() {
  const { view_type } = useContext(UserContext);

  return (
    <>
      {view_type && <EnviosTransportista /> }
    </>
  );
}

export default Envios;

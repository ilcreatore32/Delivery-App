import React from "react";
import { useState, useEffect } from "react";

/* Types */
import EnviosTransportista from "./Transportista/EnviosTransportista";
import EnviosCliente from "./Cliente/EnviosCliente";

/* CSS */
import "./Envios.css";

function Envios() {
  const [Type, setType] = useState(null);

  useEffect(() => {
    /* Haz la petición GET del User y dependiendo del tipo de usuario
      Asigna el estatus Type de la vista para renderizar: 
        <EnviosCliente />
        o
        <EnviosTransportista />
    */
    // setType(true);
    setType(false);
  }, []);

  return (
    <>
      {Type ? (
        <>
          <EnviosCliente />
        </>
      ) : (
        <>
          <EnviosTransportista />
        </>
      )}
    </>
  );
}

export default Envios;

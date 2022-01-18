import axios from "axios";

/* Instancia de Axios */
const Api = axios.create({
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json",
  },
});

/* Configuracion de la instancia de Axios 
   para que envie el token en cada peticion 
   y que envie los parametros segun el usuario  */

export const tokenAuth = (token) => {
  if (token) {
    Api.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete Api.defaults.headers.common["x-auth-token"];
  }
};

export default Api;

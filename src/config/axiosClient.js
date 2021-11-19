import axios from "axios";
import getToken from "./getToken";
// import getParams from "./getParams";

/* Obtencion del token */
let token = getToken();

/* Obtencion de Parametros */
// let params = getParams();

/* Instancia de Axios */
const Api = axios.create({
  baseURL: "http://localhost:4001",
  headers: {
    "Content-Type": "application/json",
  },
});

/* Configuracion de la instancia de Axios 
   para que envie el token en cada peticion 
   y que envie los parametros segun el usuario 
*/
Api.interceptors.request.use((config) => {
  if (token) {
    config.headers = {
      "x-auth-token": token,
    };
  }
  /* if (params) {
    config.params = {
      params,
    };
  }
  */
  return config;
});

export default Api;

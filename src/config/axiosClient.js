import axios from "axios";
import getToken from "./getToken";
// import getParams from "./getParams";
// import getUser from "./getUser";


/* Obtencion del User */
// let user = getUser(token);

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
   
   export const tokenAuth = token => {
     if (token) {
      Api.defaults.headers.common['x-auth-token'] = token;
     } else {
       delete Api.defaults.headers.common['x-auth-token'];
     }
   }
   /*
Api.interceptors.request.use((config) => {
   Obtencion del token 
let token = getToken();
  if (token) {
    config.headers = {
      "x-auth-token": token,
    };
  }
  // if (user) {
  //   config.params = {
  //      Obtencion de Parametros 
  //     "view_option": getParams(user.permission),
  //   };
  // }
  return config;
});*/

export default Api;

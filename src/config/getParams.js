/* Obtencion de Parametros segun el User local */
export default function getParams() {
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  let params;
  if (user.Usuario_Permisos === "A") {
    return {
      view_option: "admin",
    };
  }
  if (user.Usuario_Permisos === "C") {
    return {
      view_option: "cliente",
    };
  }
  if (user.Usuario_Permisos === "T") {
    return {
      view_option: "transportista",
    };
  }
  return params;
}

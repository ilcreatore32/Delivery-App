/* Obtencion de Parametros segun el User local */
export default function getParams(permission) {
  let view_option = "cliente";
  if (permission === "A") {
    return (view_option = "admin");
  }
  if (permission === "C") {
    return (view_option = "cliente");
  }
  return view_option;
}

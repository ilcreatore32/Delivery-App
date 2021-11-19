/* Obtencion de Parametros segun el User local */
export default function getParams(permission) {
  console.log(permission);
  let view_option = "cliente";
  if (permission === "A") {
    return (view_option = "admin");
  }
  if (permission === "C") {
    return (view_option = "cliente");
  }
  console.log(view_option);
  return view_option;
}

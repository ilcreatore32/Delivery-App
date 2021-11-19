/* Obtencion del token local */
export default function getToken() {
  let auth = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  return auth.token;
}

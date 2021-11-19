/* Obtencion del token local */
export default function getToken() {
  let auth = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  console.log(auth.token);
  return auth.token;
}

import jwt from "jwt-simple";

/* decode el token y devuelve el payload
con informacion del usuario */
export default async function getUser(token) {
  if (token) {
    try {
      let user = await jwt.decode(token.token, process.env.SECRETA);
      await localStorage.setItem("user", user);
      await console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

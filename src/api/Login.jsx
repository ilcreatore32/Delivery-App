import Api from "../config/axiosClient";

export async function Login(values) {
  const token = await Api.post(`/auth`, values)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return false;
    })
  return token;
}

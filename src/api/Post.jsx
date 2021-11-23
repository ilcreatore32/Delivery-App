import Api from "../config/axiosClient";

/* Envios */
export function PostOneEnvio(id) {
  Api.post(`/Envios/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Servicios */
export function PostOneServicio(id) {
  Api.post(`/Servicios/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Vehiculos */
export function PostOneVehiculo(id) {
  Api.post(`/Vehiculos/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Registro de Usuario */
export async function PostUser({
  person_id,
  type_id,
  email,
  password,
  name,
  lastname,
  file,
}) {
  const payment = await Api.post(`/register`, {
    body: {
      person_id,
      type_id,
      email,
      password,
      name,
      lastname,
      file,
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error.msg);
    });
  return payment;
}

import Api from "../config/axiosClient";

/* Envios */
export async function DeleteOneEnvio(id) {
  const result = await Api.delete(`/shippment/${id}`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return result;
}

export async function DeleteAsociatedService(id) {
  const shippmentResult = await Api.delete(
    `/shippment/deleteAsociateService/${id}`
  )
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return shippmentResult;
}

/* Servicios */
export async function DeleteOneServicio(id) {
  const result = await Api.delete(`/service/${id}`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return result;
}
/* Pagos */
export async function DeleteOnePago(id) {
  const result = await Api.delete(`/payment/${id}`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return result;
}

/* Vehiculos */
export function DeleteOneVehiculo(id) {
  Api.delete(`/Vehiculos/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

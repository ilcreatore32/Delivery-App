import Api from "../config/axiosClient";

/* Envios */
export function DeleteOneEnvio(id) {
  Api.delete(`/Envios/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function DeleteAsociatedService(id) {
  const shippmentResult = await Api.delete(`/shippment/deleteAsociateService/${id}`)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return shippmentResult;
}

/* Servicios */
export function DeleteOneServicio(id) {
  Api.delete(`/Servicios/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
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

import Api from "../config/axiosClient";

/* Envios */
export async function PutEnvio(id, shippmentDetails) {
  const shippmentsResult = await Api.put(`/shippment/${id}`, shippmentDetails)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error
    });
  console.log(shippmentsResult);
  return shippmentsResult;
}

export function PutOneEnvio(id) {
  Api.put(`/Envios/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Servicios */
export function PutOneServicio(id) {
  Api.put(`/Servicios/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Vehiculos */
export function PutOneVehiculo(id) {
  Api.put(`/Vehiculos/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

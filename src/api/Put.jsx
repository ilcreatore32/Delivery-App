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
export async function PutServicio(id, service) {
  const serviceResult = await Api.put(`/service/${id}`, service)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error
    });
  console.log(serviceResult);
  return serviceResult;
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

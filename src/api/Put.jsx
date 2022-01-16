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

export async function PutEnvioStatus(id, status) {
  const shippmentsResult = await Api.put(`/shippment/status/${id}`, status)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error
    });
  return shippmentsResult;
}

export async function PutOfertaStatus(id, status) {
  if (!id || !status || !status.status || !status.serviceId) return
  const shippmentsResult = await Api.put(`/shippment/serviceStatus/${id}`, status)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error
    });
  return shippmentsResult;
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
  return serviceResult;
}

/* Vehiculos */
export function PutVehiculo(id, vehicle) {
  const serviceResult = Api.put(`/vehicle/${id}`, vehicle)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error
  });
  return serviceResult;
}

/* Pagos */

export async function PutPago(id,paymentDetails,headers) {
  const payment = await Api.put(`/payment/${id}`,paymentDetails, headers)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return payment;
}

/* Usuarios */

export async function PutUser(id, userDetails) {
  const user = await Api.put(`/user/${id}`,userDetails, {
    "Content-Type": "multipart/form-data",
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return user;
}
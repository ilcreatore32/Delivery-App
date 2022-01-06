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

export async function PostEnvio(shippmentDetails) {
  const shippmentsResult = await Api.post(`/shippment/`, shippmentDetails)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  console.log(shippmentsResult);
  return shippmentsResult;
}

/* Servicios */
export async function PostServicio(serviceDetails) {
  const serviceResult = await Api.post(`/service/`, serviceDetails)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return serviceResult;
}

/* Vehiculos */
export async function PostVehiculo(vehicleDetails) {
  const vehicleResults = await Api.post(`/vehicle/`, vehicleDetails)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  console.log(vehicleResults);
  return vehicleResults;
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

/* Pagos */

export async function PostPago(paymentDetails,headers) {
  for (var key of paymentDetails.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
  const payment = await Api.post(`/payment`,paymentDetails, headers)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return payment;
}

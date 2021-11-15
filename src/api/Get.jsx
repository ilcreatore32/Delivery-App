import Api from "../config/axiosClient";

/* Envios */
export function GetEnvios() {
  Api.get("/Envios")
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function GetOneEnvio(id) {
  Api.get(`/Envios/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Servicios */
export async function GetService() {
  const service = await Api.get("/service", {
    params: {
      "view_option": "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log("Error al consultar los servicios");
    });
  return service;
}

export function GetOneService(id) {
  Api.get(`/service/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* Vehiculos */
export function GetVehiculos() {
  Api.get("/Vehiculos")
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function GetOneVehiculo(id) {
  Api.get(`/Vehiculos/${id}`)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

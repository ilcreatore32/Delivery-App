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
export function GetServicios() {
  Api.get("/Servicios")
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function GetOneServicio(id) {
  Api.get(`/Servicios/${id}`)
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

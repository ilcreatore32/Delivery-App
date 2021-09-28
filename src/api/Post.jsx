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

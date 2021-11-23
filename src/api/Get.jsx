import Api from "../config/axiosClient";

/* Envios */
export async function GetShippments() {
  const shippments = await Api.get("/shippment", {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log("Error al consultar los Envios");
    });
  return shippments;
}

export async function GetOneShippment(id) {
  const shippment = await Api.get(`/shippment/${id}`, {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar el Envio: #${id}`);
    });
  return shippment;
}

/* Servicios */
export async function GetServices() {
  const service = await Api.get("/service", {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log("Error al consultar los Servicios");
    });
  return service;
}

export async function GetOneService(id) {
  const service = await Api.get(`/service/${id}`, {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar el Servicio: #${id}`);
    });
  return service;
}

/* Vehiculos */
export async function GetVehicles() {
  const vehicles = await Api.get("/vehicle", {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log("Error al consultar los vehiculos");
    });
  return vehicles;
}

export async function GetOneVehicle(id) {
  const vehicle = await Api.get(`/vehicle/${id}`, {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar el Vehiculo: #${id}`);
    });
  return vehicle;
}

/* Pagos */
export async function GetPayments() {
  const payments = await Api.get("/payment", {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log("Error al consultar los Pagos");
    });
  return payments;
}

export async function GetOnePayment(id) {
  const payment = await Api.get(`/payment/${id}`, {
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar el Pago: #${id}`);
    });
  return payment;
}

/* Opciones */
export async function GetOptions(option) {
  const payment = await Api.get(`/options`, {
    params: {
      option,
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar la opción: #${option}`);
    });
  return payment;
}

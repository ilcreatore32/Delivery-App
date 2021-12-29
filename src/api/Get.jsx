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

export async function GetOneShippmentToEdit(id) {
  const shippment = await Api.get(`/shippment/edit/${id}`, {
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

/* Usuarios */
export async function GetUsers() {
  /* Hace falta la ruta en la API */
  const users = await Api.get(`/user`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar los Usuarios`);
    });
  return users;
}

/* Opciones */
export async function GetUbication(option, federal_entity, municipality) {
  const ubication = await Api.get(`/options/ubication`, {
    params: {
      option,
      federal_entity: federal_entity,
      municipality: municipality
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar la opción: #${option}`);
    });
  return ubication;
}

export async function GetProducts(option, type_product) {
  const products = await Api.get(`/options/products`, {
    params: {
      option,
      type_product: type_product,
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar la opción: #${option}`);
    });
  return products;
}

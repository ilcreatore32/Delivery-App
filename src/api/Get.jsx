import Api from "../config/axiosClient";

/* Envios */
export async function GetShippments(view_option, params) {

  const shippments = await Api.get("/shippment", {
    params: {
      view_option: view_option,
      ...params,
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
  const shippment = await Api.get(`/shippment/${id}`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
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

export async function GetOneServiceToEdit(id) {
  const service = await Api.get(`/service/edit/${id}`, {
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
      return error;
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
  const users = await Api.get(`/user`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar los Usuarios`);
    });
  return users;
}
export async function GetOneUser(id) {
  const user = await Api.get(`/user/${id}`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar el Usuario`);
    });
  return user;
}

export async function GetUserEdit(id) {
  const user = await Api.get(`/user/edit/${id}`,{
    params: {
      view_option: "admin",
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar el Usuario`);
    });
  return user;
}

export async function GetAuthenticatedUser() {
  const user = await Api.get(`/auth`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar el usuario autenticado`);
    });
  return user;
}

/* Opciones */
export async function GetUbication(option, federal_entity, municipality) {
  const ubication = await Api.get(`/options/ubication`, {
    params: {
      option,
      federal_entity: federal_entity,
      municipality: municipality,
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

export async function GetConveyances() {
  const conveyance = await Api.get(`/options/conveyance`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al obtener el medio de transporte`);
    });
  return conveyance;
}

export async function GetVehiclesOption(conveyance, personaId) {
  const vehicles = await Api.get(`/options/vehicles`, {
    params: {
      conveyance,
      personaId,
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al obtener el medio de transporte`);
    });
  return vehicles;
}

/* Suscriptions */

export async function GetSuscriptions(id) {
  const suscription = await Api.get(`/options/suscription`, {
    params: {
      id
    },
  })
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(`Error al consultar las suscripciones`);
    });
  return suscription;
}
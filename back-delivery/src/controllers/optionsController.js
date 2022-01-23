import pool from "../database";

/* Get form options */
export const getUbication = async (req, res) => {
  /* extract the query params */
  let {
    option, // E.g. federal_entity, municipality, etc.
    federal_entity = "", // E.g. '1', '2', etc.
    municipality = "", // E.g. '1', '2', etc.
  } = req.query;
  let query = "";

  let condition;

  switch (option) {
    /* Get all federal entities */
    case "federal_entity":
      query = `
            SELECT EF_Id, EF_Nombre FROM entidadesfederales
            `;
      break;
    /* Get all municipalities by federal entity */
    case "municipality":
      if (!federal_entity) break;
      condition = federal_entity;
      query = `
            SELECT Municipio_Id, Municipio_Nombre FROM municipios WHERE Municipio_EFId = ?
            `;
      break;
    /* Get all parish by municipality */
    case "parish":
      if (!municipality) break;
      condition = municipality;
      query = `
            SELECT Parroquia_Id, Parroquia_Nombre FROM Parroquias WHERE Parroquia_MunicipioId = ?
            `;
      break;
    default:
      query = "";
  }

  try {
    /* Get all data */
    await pool.query(query, [condition], function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res
          .status(404)
          .json({ error: "No es posible mostrar la opcion." });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};
/* Get form options */
export const getProducts = async (req, res) => {
  /* extract the query params */
  let {
    option, // E.g. type_product, product, etc.
    type_product, // E.g. 'Harinas'.
  } = req.query;
  let query = "";

  switch (option) {
    /* Get all federal entities */
    case "type_product":
      query = `
          SELECT Producto_Tipo FROM productos GROUP BY Producto_Tipo ORDER BY Producto_Tipo ASC  
          `;
      break;
    /* Get all municipalities by federal entity */
    case "product":
      query = `
          SELECT * FROM productos
          ${type_product && `WHERE Producto_Tipo = '${type_product}'`}
          `;
      break;
    default:
      query = "";
  }

  try {
    /* Get all data */
    await pool.query(query, function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res
          .status(404)
          .json({ error: "No es posible mostrar la opcion." });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

export const getConveyance = async (req, res) => {
  let query = "SELECT * FROM mediotransporte";

  try {
    /* Get all data */
    await pool.query(query, function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res
          .status(404)
          .json({ error: "No es posible mostrar la opcion." });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

export const getVehicles = async (req, res) => {
  /* extract the query params */
  let {
    conveyance, // E.g. '1'.
    personaId, // E.g. '1'.
  } = req.query;

  let id =  req.user.id; 

  if (personaId) id = personaId;

  let query = "SELECT * FROM vehiculos WHERE Vehiculo_PersonaId = ?";
  if (conveyance) {
    query = `
    SELECT * FROM vehiculos WHERE Vehiculo_PersonaId = ? AND Vehiculo_MTId = ?
    `;
  }

  try {
    /* Get all data */
    await pool.query(query, [id, conveyance], function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res.status(404).json({ error: "No posee vehiculos" });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

export const getContact = async (req, res) => {
  const id = req.user.id;
  let query = "SELECT * FROM contacto WHERE Contacto_PersonaId = ?";

  try {
    /* Get all data */
    await pool.query(query, [id], function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res.status(404).json({ error: "No posee vehiculos" });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

export const getSuscriptions = async (req, res) => {
  let {id} = req.query
  let query = "SELECT * FROM tipo_suscripcion ";
  if (id) query += "WHERE TS_Id = ?";
  try {
    /* Get all data */
    await pool.query(query, [id], function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res.status(404).json({ error: "No existe la suscripción" });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
        /* error in the server */
        console.log(err);
        res.status(500).send("Error en el servidor");
  }
}

export const getServicesOffer = async (req, res) => {
  let query = `
  SELECT ST_Id, ST_HorarioIni, ST_HorarioFin, MT_Nombre, ST_Precio,

  CONCAT(Vehiculo_Marca, ' ',Vehiculo_Modelo) AS DatosMedio

  FROM serviciotransporte
  
  JOIN mediotransporte
  		ON MT_Id = ST_MTId
	LEFT JOIN vehiculos
		ON ST_VehiculoId = Vehiculo_Id
	
	WHERE ST_PersonaId = ? AND ST_Status <> 'E' AND ST_Status <> 'N'

  GROUP BY ST_Id`;

  try {
    /* Get all data */
    await pool.query(query, [req.user.id], function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res.status(404).json({ error: "No posee servicios" });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};
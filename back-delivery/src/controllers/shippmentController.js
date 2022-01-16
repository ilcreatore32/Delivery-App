import moment from "moment";
import XLSX from "xlsx";
import pool from "../database";
import promisedPool from "../promisedPool";
import path from "path";
import fs from "fs";
import { withTransaction } from "../helpers/transaction";

/* Get all shippments */
export const getShippments = async (req, res) => {
  /* extract the query params */
  let {
    view_option, // E.g. 'admin', 'carrier', 'client'.
    federal_entity = "", // 1
    municipality = "", // 1
    parish = "", // 1
    min_date = "", // '2019-01-01'
    max_date = "", // '2019-01-01'
    min_value = "", // 23.00
    max_value = "", // 23.00
    min_weight = "", // 23.00
    max_weight = "", // 23.00
    person_id = "", // 20000000
    person_name = "", // 'Juan'
    person_lastname = "", // 'Perez'
    status = "", // 'E'
  } = req.query;
  let queryShippment = "";

  /* validate the format of the dates */

  if (min_date) {
    min_date = moment(min_date).format("YYYY-MM-DD");
  }
  if (max_date) {
    max_date = moment(max_date).format("YYYY-MM-DD");
  }

  /* Depending of the view option, the query will be different */

  switch (view_option) {
    /* Client's all shippments data */
    case "client":
      /* Query to get all shippments */
      queryShippment = `
          SELECT DISTINCT SE_Id, SE_Fecha, SE_ValorTotal, SE_PesoTotal, SE_Fecha,
          GROUP_CONCAT('x', ProductoSE_Cantidad, ' ', Producto_Nombre, ' ', 
          Producto_Peso, 'kg ' SEPARATOR ', ') AS Productos_Envio, 
          EF_Nombre, Municipio_Nombre

          From solicitudesenvio
          
          LEFT JOIN producto_has_se 
            ON SE_Id = ProductoSE_SEId
          LEFT JOIN productos 
            ON ProductoSE_ProductoId = Producto_Id
          JOIN parroquias
            ON SE_ParroquiaId = Parroquia_Id
          JOIN municipios
            ON Parroquia_MunicipioId = Municipio_Id	
          JOIN entidadesfederales
            ON Municipio_EFId = EF_Id
          
          WHERE SE_Status <> 'E' AND SE_PersonaId = ${req.user.id}
          ${
            parish
              ? `AND SE_ParroquiaId = ${parish}`
              : municipality !== ""
              ? `AND Parroquia_MunicipioId = ${municipality}`
              : federal_entity
              ? `AND Municipio_EFId = ${federal_entity}`
              : ""
          }
          ${
            min_value
              ? max_value
                ? `AND SE_ValorTotal between ${min_value} and ${max_value}`
                : `AND SE_ValorTotal >= ${min_value} `
              : max_value
              ? `AND SE_ValorTotal <= ${max_value} `
              : ""
          }
          ${
            min_date
              ? max_date
                ? `AND SE_Fecha between '${min_date}' and '${max_date}'`
                : `AND SE_Fecha >= '${min_date}' `
              : max_date
              ? `AND SE_Fecha <= '${max_date}' `
              : ""
          }
          ${
            min_weight
              ? max_weight
                ? `AND SE_PesoTotal between ${min_weight} and ${max_weight}`
                : `AND SE_PesoTotal >= ${min_weight} `
              : max_weight
              ? `AND SE_PesoTotal <= ${max_weight} `
              : ""
          }
          ${status ? `AND SE_Status = '${status}'` : ""}
          GROUP BY SE_ID
          `;
      break;

    /* Admin all shippments data */
    case "admin":
      /* Check user's permissions'*/
      if (req.user.permission !== "A") {
        return res.status(403).json({
          message: "No autorizado",
        });
      }
      /* Query to get all shippments */
      queryShippment = `
          SELECT DISTINCT SE_Id, SE_Fecha, SE_ValorTotal, SE_PesoTotal,
          GROUP_CONCAT('x', ProductoSE_Cantidad, ' ', Producto_Nombre, ' ', 
          Producto_Peso, 'kg ' SEPARATOR ', ') AS Productos_Envio, 
          EF_Nombre, Municipio_Nombre

          From solicitudesenvio

          LEFT JOIN producto_has_se 
            ON SE_Id = ProductoSE_SEId
          LEFT JOIN productos 
            ON ProductoSE_ProductoId = Producto_Id
          JOIN parroquias
            ON SE_ParroquiaId = Parroquia_Id
          JOIN municipios
            ON Parroquia_MunicipioId = Municipio_Id	
          JOIN entidadesfederales
            ON Municipio_EFId = EF_Id
          JOIN personas
            ON SE_PersonaId = Persona_Id

            
            WHERE 1=1
            ${
              parish
                ? `AND SE_ParroquiaId = ${parish}`
                : municipality !== ""
                ? `AND Parroquia_MunicipioId = ${municipality}`
                : federal_entity
                ? `AND Municipio_EFId = ${federal_entity}`
                : ""
            }
            ${
              min_value
                ? max_value
                  ? `AND SE_ValorTotal between ${min_value} and ${max_value}`
                  : `AND SE_ValorTotal >= ${min_value} `
                : max_value
                ? `AND SE_ValorTotal <= ${max_value} `
                : ""
            }
            ${
              min_date
                ? max_date
                  ? `AND SE_Fecha between '${min_date}' and '${max_date}'`
                  : `AND SE_Fecha >= '${min_date}' `
                : max_date
                ? `AND SE_Fecha <= '${max_date}' `
                : ""
            }
            ${
              min_weight
                ? max_weight
                  ? `AND SE_PesoTotal between ${min_weight} and ${max_weight}`
                  : `AND SE_PesoTotal >= ${min_weight} `
                : max_weight
                ? `AND SE_PesoTotal <= ${max_weight} `
                : ""
            }
            ${person_id ? `AND SE_PersonaId = ${person_id}` : ""}
            ${
              person_name
                ? `AND Persona_Nombre LIKE '%${person_name.trim()}%'`
                : ""
            }
          ${
            person_lastname
              ? `AND Persona_Apellido LIKE '%${person_lastname.trim()}%'`
              : ""
          }
          
          ${status ? `AND SE_Status = '${status}'` : ""}
          
          GROUP BY SE_ID
          `;
      break;

    /* Carrier's all shippments data */
    case "carrier_taken":
      /* Query to get all shippments */
      queryShippment = `
          SELECT DISTINCT SE_Id, SE_Fecha, SE_ValorTotal, SE_PesoTotal, SE_Fecha,
          GROUP_CONCAT('x', ProductoSE_Cantidad, ' ', Producto_Nombre, ' ', 
          Producto_Peso, 'kg ' SEPARATOR ', ') AS Productos_Envio, 
          EF_Nombre, Municipio_Nombre

          From solicitudesenvio

          JOIN producto_has_se 
            ON SE_Id = ProductoSE_SEId 
          JOIN productos 
            ON ProductoSE_ProductoId = Producto_Id
          JOIN parroquias
            ON SE_ParroquiaId = Parroquia_Id
          JOIN municipios
            ON Parroquia_MunicipioId = Municipio_Id	
          JOIN entidadesfederales
            ON Municipio_EFId = EF_Id
          JOIN personas
            ON SE_PersonaId = Persona_Id
          JOIN se_has_st
            ON SEST_SEId = SE_Id 
          JOIN (SELECT ST_Id FROM serviciotransporte WHERE ST_PersonaId = ${
            req.user.id
          }) ST
            ON SEST_STId = ST.ST_id
          
          WHERE SE_Status <> 'E'
          ${
            parish
              ? `AND SE_ParroquiaId = ${parish}`
              : municipality !== ""
              ? `AND Parroquia_MunicipioId = ${municipality}`
              : federal_entity
              ? `AND Municipio_EFId = ${federal_entity}`
              : ""
          }
          ${
            min_value
              ? max_value
                ? `AND SE_ValorTotal between ${min_value} and ${max_value}`
                : `AND SE_ValorTotal >= ${min_value} `
              : max_value
              ? `AND SE_ValorTotal <= ${max_value} `
              : ""
          }
          ${
            min_date
              ? max_date
                ? `AND SE_Fecha between '${min_date}' and '${max_date}'`
                : `AND SE_Fecha >= '${min_date}' `
              : max_date
              ? `AND SE_Fecha <= '${max_date}' `
              : ""
          }
          ${
            min_weight
              ? max_weight
                ? `AND SE_PesoTotal between ${min_weight} and ${max_weight}`
                : `AND SE_PesoTotal >= ${min_weight} `
              : max_weight
              ? `AND SE_PesoTotal <= ${max_weight} `
              : ""
          }
          ${status ? `AND SE_Status = '${status}'` : ""}
          GROUP BY SE_ID
          `;
      break;

    /** Carrier's all available shippments data */
    case "carrier_available":
      queryShippment = `
          SELECT DISTINCT SE_Id, SE_Fecha, SE_ValorTotal, SE_PesoTotal, SE_Fecha,
          GROUP_CONCAT('x', ProductoSE_Cantidad, ' ', Producto_Nombre, ' ', 
          Producto_Peso, 'kg ' SEPARATOR ', ') AS Productos_Envio, 
          EF_Nombre, Municipio_Nombre

          From solicitudesenvio

          JOIN producto_has_se 
            ON SE_Id = ProductoSE_SEId 
          JOIN productos 
            ON ProductoSE_ProductoId = Producto_Id
          JOIN parroquias
            ON SE_ParroquiaId = Parroquia_Id
          JOIN municipios
            ON Parroquia_MunicipioId = Municipio_Id	
          JOIN entidadesfederales
            ON Municipio_EFId = EF_Id
          JOIN personas
            ON SE_PersonaId = Persona_Id
          
          WHERE SE_Status='P'
          ${
            parish
              ? `AND SE_ParroquiaId = ${parish}`
              : municipality !== ""
              ? `AND Parroquia_MunicipioId = ${municipality}`
              : federal_entity
              ? `AND Municipio_EFId = ${federal_entity}`
              : ""
          }
          ${
            min_value
              ? max_value
                ? `AND SE_ValorTotal between ${min_value} and ${max_value}`
                : `AND SE_ValorTotal >= ${min_value} `
              : max_value
              ? `AND SE_ValorTotal <= ${max_value} `
              : ""
          }
          ${
            min_date
              ? max_date
                ? `AND SE_Fecha between '${min_date}' and '${max_date}'`
                : `AND SE_Fecha >= '${min_date}' `
              : max_date
              ? `AND SE_Fecha <= '${max_date}' `
              : ""
          }
          ${
            min_weight
              ? max_weight
                ? `AND SE_PesoTotal between ${min_weight} and ${max_weight}`
                : `AND SE_PesoTotal >= ${min_weight} `
              : max_weight
              ? `AND SE_PesoTotal <= ${max_weight} `
              : ""
          }
          GROUP BY SE_ID
          `;
      break;
    default:
      queryShippment = "";
  }

  try {
    /* Get all data */
    await pool.query(queryShippment, function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].SE_Id === null)
        return res
          .status(404)
          .json({ error: "No posee solicitud de envío de productos" });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

/* Get one shippment details */
export const getOneShippment = async function (req, res) {
  /* Extract shippment's id */
  const { id } = req.params;
  /* query to get all shippment's details */
  let query_shippment = `
  SELECT SE_Id, SE_Fecha, SE_Status, SE_ValorTotal, SE_PesoTotal, SE_PersonaId, Persona_Nombre, 
  Persona_Apellido, GROUP_CONCAT(Contacto_Info SEPARATOR ';') Contacto_Persona, Parroquia_Nombre,
  Municipio_Nombre, EF_Nombre, SEST_STId
  
  FROM solicitudesenvio
  
  JOIN parroquias
     ON SE_ParroquiaId = Parroquia_Id
  JOIN municipios
     ON Parroquia_MunicipioId = Municipio_Id	
  JOIN entidadesfederales
     ON Municipio_EFId = EF_Id
  JOIN personas
     ON SE_PersonaId = Persona_Id
  LEFT JOIN contacto
     ON Contacto_PersonaId = Persona_Id
  LEFT JOIN (SELECT SEST_SEId, SEST_STId FROM se_has_st WHERE SEST_Status = 'A') SEST
     ON SEST_SEId = SE_Id 
  
  WHERE SE_Id = ${id}
  
  `;
  /* Query to get all shippment's products */
  let query_products = `
  SELECT Producto_Nombre, Producto_Tipo,
  Producto_Tamano, Producto_Peso, Producto_Precio, ProductoSE_Cantidad 

  FROM producto_has_se 

  JOIN productos
    ON Producto_Id = ProductoSE_ProductoId

  WHERE ProductoSE_SEId = ?
  `;
  /* Query to get shippment's asociated service*/
  let query_detail_service = `
  SELECT ST_Id, ST_HorarioIni, ST_HorarioFin, MT_Nombre, ST_Precio,
  GROUP_CONCAT(Contacto_Info ORDER BY Contacto_Tipo SEPARATOR ';') Contacto_Persona, 
  Persona_Nombre, Persona_Apellido, ST_PersonaId,
  CONCAT (Vehiculo_Marca, ' ',Vehiculo_Modelo) AS DatosMedio

  FROM serviciotransporte
  
  JOIN mediotransporte
  		ON MT_Id = ST_MTId
	LEFT JOIN vehiculos
		ON ST_VehiculoId = Vehiculo_Id
  
	JOIN personas
     ON ST_PersonaId = Persona_Id
	LEFT JOIN contacto
     ON Contacto_PersonaId = Persona_Id
  
  WHERE ST_Id = ?
  `;
  /* Query to get all shippment's unasociated services */
  let query_services = `
  SELECT ST_Id, ST_HorarioIni, ST_HorarioFin, MT_Nombre, ST_Precio, ST_PersonaId, SEST_Status,

  CONCAT(Vehiculo_Marca, ' ',Vehiculo_Modelo) AS DatosMedio

  FROM se_has_st
  
  JOIN serviciotransporte
  		ON SEST_STId = ST_Id
  JOIN mediotransporte
  		ON MT_Id = ST_MTId
	LEFT JOIN vehiculos
		ON ST_VehiculoId = Vehiculo_Id
	
	WHERE SEST_SEId = ? AND SEST_Status <> 'A'

  GROUP BY ST_Id
  
  `;

  try {
    /* Get all shippment's details */
    await pool.query(
      query_shippment,
      async function (errShippment, shippmentDetails) {
        /* if error in the query */
        if (errShippment)
          return res
            .status(400)
            .json({ error: "Error al consultar en la base de datos" });
        /* if there is no data */
        if (shippmentDetails.length === 0 || shippmentDetails[0].SE_Id === null)
          return res
            .status(404)
            .json({ error: "No posee solicitud de envío de productos" });

        /* Get all shippment's products */
        await pool.query(
          query_products,
          shippmentDetails[0].SE_Id,
          async function (errProduct, products) {
            /* if error in the query */
            if (errProduct)
              return res
                .status(400)
                .json({ error: "Error al consultar en la base de datos" });
            /* if there is no data */
            if (products.length === 0 || products[0].SE_Id === null)
              return res
                .status(404)
                .json({ error: "No posee solicitud de envío de productos" });

            /* Check if there is an selected service for this shippment */
            if (shippmentDetails[0].SEST_STId !== null) {
              /* Return the details about the selected service */
              await pool.query(
                query_detail_service,
                shippmentDetails[0].SEST_STId,
                function (errServiceD, serviceD) {
                  /* if error in the query */
                  if (errServiceD)
                    return res.status(400).json({
                      error: "Error al consultar en la base de datos",
                    });
                  /* if there is no data */
                  if (serviceD.length === 0 || serviceD[0].ST_Id === null)
                    return res.status(404).json({
                      error: "No posee solicitud de envío de productos",
                    });
                  /* send results */
                  res.status(200).json({
                    shippmentDetails: shippmentDetails[0],
                    productsList: products,
                    serviceDetails: serviceD[0],
                  });
                }
              );
            } else {
              /* Return other available services */
              await pool.query(
                query_services,
                shippmentDetails[0].SE_Id,
                function (errServices, servicesAvailable) {
                  /* if error in the query */
                  if (errServices)
                    return res.status(400).json({
                      error: "Error al consultar en la base de datos",
                    });
                  /* if there is no available services send results */
                  if (
                    servicesAvailable.length === 0 ||
                    servicesAvailable[0].ST_Id === null
                  )
                    return res.status(200).json({
                      shippmentDetails: shippmentDetails[0],
                      productsList: products,
                    });
                  /* if there is available services send them with the results */
                  res.status(200).json({
                    shippmentDetails: shippmentDetails[0],
                    productsList: products,
                    servicesAvailable: servicesAvailable,
                  });
                }
              );
            }
          }
        );
      }
    );
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

/* Get details for editing a shippment */
export const editShippment = async function (req, res) {
  /* Extract shippment's id */
  const { id } = req.params;
  console.log(id);
  /* Query to get shippment's details */
  let query_shippment = `
  SELECT SE_Id, SE_Fecha, SE_Status, SE_ValorTotal, SE_PesoTotal, EF_Id, 
  EF_Nombre, Municipio_Id, Municipio_Nombre, SE_ParroquiaId, Parroquia_Nombre, SEST_Status,
  SEST_STId, Persona_Id, Persona_TipoId, Persona_Nombre, Persona_Apellido
  
  FROM solicitudesenvio
  
  JOIN parroquias
     ON SE_ParroquiaId = Parroquia_Id
  JOIN municipios
     ON Parroquia_MunicipioId = Municipio_Id	
  JOIN entidadesfederales
     ON Municipio_EFId = EF_Id
  JOIN personas
     ON Persona_Id = SE_PersonaId 
  LEFT JOIN (SELECT SEST_SEId, SEST_Status, SEST_STId FROM se_has_st WHERE SEST_Status = 1) SEST
     ON SEST_SEId = SE_Id 
  
  WHERE SE_Id = ?
  `;
  /* Query to get all shippment's products */
  let query_products = `
  SELECT Producto_Id, Producto_Nombre, Producto_Tipo,
  Producto_Tamano, Producto_Peso, Producto_Precio, ProductoSE_Cantidad 

  FROM producto_has_se 

  JOIN productos
    ON Producto_Id = ProductoSE_ProductoId

  WHERE ProductoSE_SEId = ?
  `;
  /* Query to get person's contact information */
  let query_contact = `
  SELECT Contacto_Tipo AS contact_type, Contacto_Info AS contactInfo from contacto WHERE Contacto_PersonaId = ?
  `;

  try {
    /* Get all shippment's details */
    await pool.query(
      query_shippment,
      [id],
      async function (errShippment, shippmentDetails) {
        /* if error in the query */
        if (errShippment)
          return res
            .status(400)
            .json({ error: "Error al consultar en la base de datos" });
        /* if there is no data */
        if (shippmentDetails.length === 0 || shippmentDetails[0].SE_Id === null)
          return res
            .status(404)
            .json({ error: "No posee solicitud de envío de productos" });

        /* Get all shippment's products */
        await pool.query(
          query_products,
          shippmentDetails[0].SE_Id,
          async function (errProduct, products) {
            /* if error in the query */
            if (errProduct)
              return res
                .status(400)
                .json({ error: "Error al consultar en la base de datos" });
            /* if there is no data */
            if (products.length === 0 || products[0].SE_Id === null)
              return res
                .status(404)
                .json({ error: "Este envío no posee productos" });
            await pool.query(
              query_contact,
              shippmentDetails[0].Persona_Id,
              async function (errContact, contact) {
                /* if error in the query */
                if (errContact)
                  return res
                    .status(400)
                    .json({ error: "Error al consultar en la base de datos" });
                /* if there is no data */
                if (contact.length === 0 || contact[0].contactInfo === null)
                  return res.status(404).json({
                    error: "Esta persona no posee información de contacto",
                  });
                /* send results */
                res.status(200).json({
                  ...shippmentDetails[0],
                  productsList: products,
                  contactInfo: contact,
                });
              }
            );
          }
        );
      }
    );
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

/* Update details of a shippment */
export const saveShippment = async function (req, res) {
  /* Extract shippment's id (if any)*/
  const { id } = req.params;

  /* extract the query body */
  let {
    SE_Id, // 14
    SE_Fecha, // '2020-05-01'
    SE_Status, // 'D'
    SE_ValorTotal, // 20.00
    SE_PesoTotal, // 20.00
    SE_ParroquiaId, // 1
    productsList, // [ [1,1,1],[1,1,1] ]  ProductoId, SEId, Cantidad
    Persona_Id, // 20000000
    Persona_TipoId, // v
    Persona_Nombre, // 'Juan'
    Persona_Apellido, // 'Perez'
    ContactInformation, // [ [4242843235, 'T', 20000000], ['email@email.com', 'C', 20000000] ] Info, Type, PersonaId
  } = req.body;

  console.log(req.body);

  /* Create an object with the properties */
  const shippmentDetails = {
    SE_Id: SE_Id || id,
    SE_Fecha,
    SE_Status,
    SE_ValorTotal,
    SE_PesoTotal,
    SE_ParroquiaId,
    SE_PersonaId: Persona_Id,
  };

  const person = {
    Persona_Id,
    Persona_TipoId,
    Persona_Nombre,
    Persona_Apellido,
  };

  /* Get the keys of the object */
  const keysShippment = Object.keys(shippmentDetails);

  /* Query to check if the person exists*/
  let queryCheckPerson = `SELECT Persona_Id, Usuario_Id, Usuario_Status 
  FROM personas LEFT JOIN usuarios ON Persona_Id = Usuario_Id
  WHERE Persona_Id = ?
  `;
  /* Query to add or update person */
  let queryPerson = ``;
  /* Query to delete the contact information */
  let queryDeleteContactInfo = ``;
  /* Query insert the contact information */
  let queryContactInfo = ``;

  /* Check it person is already in the system and decide whether to update or insert*/
  try {
    let personCheck = await pool.query(queryCheckPerson, [Persona_Id]);
    if (personCheck.length === 0) {
      queryPerson = `
        INSERT INTO personas set ?
      `;
      queryContactInfo = `
        INSERT INTO contacto (Contacto_Info, Contacto_Tipo , Contacto_PersonaId) VALUES ?
      `;
    } else if (
      personCheck[0].Usuario_Status === null ||
      personCheck[0].Usuario_Status === "P"
    ) {
      queryPerson = `
        UPDATE personas set ? WHERE Persona_Id = ?
      `;

      queryDeleteContactInfo = `
      DELETE FROM contacto WHERE Contacto_PersonaId = ?; 
    `;
      queryContactInfo = `
      INSERT INTO contacto (Contacto_Info, Contacto_Tipo , Contacto_PersonaId) VALUES ?
    `;
    }
  } catch (error) {
    /* error in the server */
    console.log(error);
    res.status(500).send("Error en el servidor");
  }

  /* Query to add or update shippment */
  let queryShippment = ``;
  if (req.method === "POST") {
    queryShippment = `
      INSERT INTO solicitudesenvio set ?
    `;
  } else if (req.method === "PUT") {
    queryShippment = `
      UPDATE solicitudesenvio set ? where SE_Id = ?
    `;
  }

  /* Query to delete the products */
  let queryDeleteProducts = `
    DELETE FROM producto_has_se WHERE ProductoSE_SEId = ?; 
  `;
  /* Query insert the products */
  let queryProducts = `
    INSERT INTO producto_has_se (ProductoSE_ProductoId, ProductoSE_SEId, ProductoSE_Cantidad) VALUES ?
  `;

  try {
    let transactionResult;
    if (req.method === "POST") {
      /* Get connection */
      const connection = await promisedPool.getConnection();

      /* Start transaction */
      transactionResult = await withTransaction(connection, res, async () => {
        if (queryPerson)
          await connection.query(queryPerson, [person, Persona_Id]);

        if (queryDeleteContactInfo)
          await connection.query(queryDeleteContactInfo, [Persona_Id]);
        if (queryContactInfo)
          await connection.query(queryContactInfo, [ContactInformation]);
        if (queryShippment)
          await connection.query(queryShippment, shippmentDetails);
        if (queryProducts)
          await connection.query(queryProducts, [productsList]);
      });
    } else if (req.method === "PUT") {
      /* Get connection */
      const connection = await promisedPool.getConnection();

      /* Start transaction */
      transactionResult = await withTransaction(connection, res, async () => {
        if (queryPerson)
          await connection.query(queryPerson, [person, Persona_Id]);
        if (queryDeleteContactInfo)
          await connection.query(queryDeleteContactInfo, [Persona_Id]);
        if (queryContactInfo)
          await connection.query(queryContactInfo, [ContactInformation]);
        if (queryShippment)
          await connection.query(queryShippment, [shippmentDetails, id]);
        if (queryDeleteProducts)
          await connection.query(queryDeleteProducts, [SE_Id]);
        if (queryProducts)
          await connection.query(queryProducts, [productsList]);
      });
    }
    if (transactionResult) {
      res.status(200).json({
        message: "Solicitud de envío actualizada",
      });
    }
  } catch (error) {
    /* error in the server */
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

/* Delete shippment */
export const deleteShippment = async function (req, res) {
  /* Get the id of the shippment */
  const { id } = req.params;
  /* Query to delete the shippment */
  let queryUpdateStatus = `
    UPDATE solicitudesenvio
    SET SE_Status = 'E'
    WHERE SE_Id = ${id};
  `;

  try {
    /* Delete the shippment */
    await pool.query(
      queryUpdateStatus,
      function (errShippment, shippmentResult) {
        /* if error in the query */
        if (errShippment)
          return res
            .status(400)
            .json({ error: "Error al consultar en la base de datos" });
        /* Send the response */
        res.status(200).json({ message: "Solicitud Eliminada" });
      }
    );
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

export const updateStatusShippment = async function (req, res) {
  /* Get the id of the shippment */
  const { id } = req.params;
  /* Get the status of the shippment */
  const { status } = req.body;
  /* Query to update the status of the shippment */
  let queryUpdateStatus = `
    UPDATE solicitudesenvio
    SET SE_Status = ?
    WHERE SE_Id = ?;
  `;

  try {
    /* Update the status of the shippment */
    await pool.query(
      queryUpdateStatus,
      [status, id],
      function (errShippment, shippmentResult) {
        /* if error in the query */
        if (errShippment)
          return res
            .status(400)
            .json({ error: "Error al consultar en la base de datos" });
        /* Send the response */
        res.status(200).json({ message: "Solicitud Actualizada" });
      }
    );
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

export const updateServicesAsociatedStatus = async function (req, res) {
  /* Get the id of the shippment */
  const { id } = req.params;
  /* Get the status of the shippment */
  const { status, serviceId } = req.body;
  /* Query to update the status of the shippment */
  let queryUpdateStatus = `
    UPDATE se_has_st
    SET SEST_Status = ?
    WHERE SEST_SEId = ? AND SEST_STId = ?;
  `;

  try {
    /* Update the status of the shippment */
    await pool.query(
      queryUpdateStatus,
      [status, id, serviceId],
      function (errShippment, shippmentResult) {
        /* if error in the query */
        if (errShippment)
          return res
            .status(400)
            .json({ error: "Error al consultar en la base de datos" });
        /* Send the response */
        res
          .status(200)
          .json({ message: "Estatus de la oferta de servicio actualizada" });
      }
    );
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

export const asociateNewService = async function (req, res) {
  const {
    SEST_SEId,
    SEST_STId,
    SEST_Status = 'P'
  } = req.body;
  /* Query to update the status of the shippment */
  let queryInsertService = `
    INSERT INTO se_has_st (SEST_SEId, SEST_STId, SEST_Status) VALUES (?, ?, ?);
  `;
  try {
    await pool.query(queryInsertService, [SEST_SEId, SEST_STId, SEST_Status], function (errShippment, shippmentResult) {
      /* if error in the query */
      if (errShippment)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* Send the response */
      res.status(200).json({ message: "Oferta de servicio asociada" });
    }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
    
}

export const deleteAsociateService = async function (req, res) {
  const {id} = req.params;

  let queryDelete = `DELETE FROM se_has_st WHERE SEST_STId = ?`

  if (!id) {
    return res.status(400).json({
      error: "Faltan parámetros"
    })
  }
  try {
    //query to delete
    await pool.query(queryDelete, [id], function (error, result)  {
      /* if error in the query */
      if (error) return res.status(400).json(error)
      /* Send the response */
      res.status(200).json( {message: "Operación Exitosa"} )
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}
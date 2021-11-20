import moment from "moment";
import XLSX from "xlsx";
import pool from "../database";
import path from "path";
import fs from "fs";

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
          
          WHERE SE_PersonaId = ${req.user.id}
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

    /* Admin all shippments data */
    case "admin":
      /* Check user's permissions'*/
      if (req.user.permission !== "A") {
        return res.status(401).json({
          message: "No autorizado",
        });
      }
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
          
          WHERE SE_Status=1
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

export const addShippments = async (req, res) => {
  if (req.file == undefined) {
    return res.status(400).send("Por favor sube un archivo de excel");
  }
  let pathExcel = path.join(__dirname, "../files/excel/" + req.file.filename);
  try {
    //let path = __dirname + "../files/excel" + req.file.filename;
    let workbook = XLSX.readFile(pathExcel);
    
    Object.values(workbook.Sheets).forEach(val => console.log(val));

    /* for (const sheetName in workbook.Sheets) {
      if (Object.hasOwnProperty.call(workbook.Sheets, sheetName)) {
        const element = workbook.Sheets[sheetName];
        console.log(element);
      }
    } */
    /*
    let Content = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]]
    );
    
    readXlsxFile(pathExcel, { getSheets: true }).then((sheets) => {
      console.log(req.file);
      console.log(sheets);
      // skip header
       rows.shift();
 
      let tutorials = [];

      rows.forEach((row) => {
        let tutorial = {
          id: row[0],
          title: row[1],
          description: row[2],
          published: row[3],
        };

        tutorials.push(tutorial);
      });

      Tutorial.bulkCreate(tutorials)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        }); 
    });*/
  } catch (error) {
    fs.unlink(pathExcel, function(err) {
      if(err && err.code == 'ENOENT') {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
      } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
      } else {
          console.info(`removed excel file`);
      }
    });
    console.log(error); 
    res.status(500).send({ msg: "Error en el servidor" });
  }
};

/* Get one shippment details */
export const getOneShippment = async function (req, res) {
  /* Extract shippment's id */
  const { id } = req.params;
  /* query to get all shippment's details */
  let query_shippment = `
  SELECT SE_Id, SE_Fecha, SE_Status, SE_ValorTotal, SE_PesoTotal, SE_PersonaId, Persona_Nombre, 
  Persona_Apellido, GROUP_CONCAT(Telefono_Numero SEPARATOR ';') Telefonos_Persona, SEST_STId
  
  FROM solicitudesenvio
  
  JOIN parroquias
     ON SE_ParroquiaId = Parroquia_Id
  JOIN municipios
     ON Parroquia_MunicipioId = Municipio_Id	
  JOIN entidadesfederales
     ON Municipio_EFId = EF_Id
  JOIN personas
     ON SE_PersonaId = Persona_Id
  LEFT JOIN telefonos
     ON Telefono_PersonaId = Persona_Id
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
  GROUP_CONCAT(Telefono_Numero SEPARATOR ';') Telefonos_Persona, 
  Persona_Nombre, Persona_Apellido,
  CONCAT (Vehiculo_Marca, ' ',Vehiculo_Modelo) AS DatosMedio

  FROM serviciotransporte
  
  JOIN mediotransporte
  		ON MT_Id = ST_MTId
	LEFT JOIN vehiculos
		ON ST_VehiculoId = Vehiculo_Id
  
	JOIN personas
     ON ST_PersonaId = Persona_Id
	LEFT JOIN telefonos
     ON Telefono_PersonaId = Persona_Id
  
  WHERE ST_Id = ?
  `;
  /* Query to get all shippment's unasociated services */
  let query_services = `
  SELECT ST_Id, ST_HorarioIni, ST_HorarioFin, MT_Nombre, ST_Precio,

  CONCAT(Vehiculo_Marca, ' ',Vehiculo_Modelo) AS DatosMedio

  FROM se_has_st
  
  JOIN serviciotransporte
  		ON SEST_STId
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
                    return res
                      .status(400)
                      .json({
                        error: "Error al consultar en la base de datos",
                      });
                  /* if there is no data */
                  if (serviceD.length === 0 || serviceD[0].ST_Id === null)
                    return res
                      .status(404)
                      .json({
                        error: "No posee solicitud de envío de productos",
                      });
                  /* send results */
                  res
                    .status(200)
                    .json({
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
                    return res
                      .status(400)
                      .json({
                        error: "Error al consultar en la base de datos",
                      });
                  /* if there is no available services send results */
                  if (
                    servicesAvailable.length === 0 ||
                    servicesAvailable[0].ST_Id === null
                  )
                  return res
                  .status(200)
                  .json({
                    shippmentDetails: shippmentDetails[0],
                    productsList: products
                  });
                  /* if there is available services send them with the results */
                  res
                    .status(200)
                    .json({
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
  /* Query to get shippment's details */
  let query_shippment = `
  SELECT SE_Id, SE_Fecha, SE_Status, SE_ValorTotal, SE_PesoTotal, EF_Id, 
  EF_Nombre, Municipio_Id, Municipio_Nombre, Parroquia_Id, Parroquia_Nombre, SEST_Status,
  SEST_STId

  
  FROM solicitudesenvio
  
  JOIN parroquias
     ON SE_ParroquiaId = Parroquia_Id
  JOIN municipios
     ON Parroquia_MunicipioId = Municipio_Id	
  JOIN entidadesfederales
     ON Municipio_EFId = EF_Id
  LEFT JOIN (SELECT SEST_SEId, SEST_Status, SEST_STId FROM se_has_st WHERE SEST_Status = 1) SEST
     ON SEST_SEId = SE_Id 
  
  WHERE SE_Id = ${id}
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
            /* send results */
            res
              .status(200)
              .json({
                shippmentDetails: shippmentDetails[0],
                productsList: products,
              });
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
export const updateShippment = async function (req, res) {
  /* Extract shippment's id */
  const { id } = req.params;
  /* extract the query body */
  let {
    SE_Fecha, // '2020-05-01'
    SE_Status, // 'D'
    SE_ValorTotal, // 20.00
    SE_PesoTotal, // 20.00
    SE_ParroquiaId, // 1
    SEST_STId, // 1
    SEST_Status, // 'A'
    productsList, // [ [1,1,1],[1,1,1] ]  ProductoId, SEId, Cantidad
  } = req.body;

  /* Create an object with the properties */
  const shippmentDetails = {
    SE_Fecha,
    SE_Status,
    SE_ValorTotal,
    SE_PesoTotal,
    SE_ParroquiaId,
  };

  /* Get the keys of the object */
  const keysShippment = Object.keys(shippmentDetails);

  /* Query to update shippment's details */
  let queryUpdateDetails = `
    UPDATE solicitudesenvio
    SET 
    ${keysShippment.map((key) =>
      shippmentDetails[key] === SE_Fecha
        ? `${key}= '${shippmentDetails[key]}'`
        : `${key} = ${shippmentDetails[key]}`
    )}
    WHERE SE_Id = ${id};
  `;
  /* Query to update the status of the services */
  let queryUpdateStatus = `
    UPDATE se_has_st
    SET 
    ${SEST_Status ? `SEST_Status = ${SEST_Status}` : ""}
    WHERE SEST_SEId = ${id} AND SEST_STId = ${SEST_STId};
  `;
  /* Query to delete the products */
  let queryDeleteProducts = `
    DELETE FROM producto_has_se WHERE ProductoSE_SEId = ${id}; 
  `;
  /* Query insert the products */
  let queryUpdateProducts = `
  INSERT INTO producto_has_se (ProductoSE_ProductoId, ProductoSE_SEId, ProductoSE_Cantidad) VALUES ?
  `;
  try {
    /* Get connection */
    pool.getConnection(function (err, connection) {
      /* if error in the connection */
      if (err) {
        console.log(err);
        return res.status(500).send("Error en el servidor");
      }
      /* Start transaction */
      connection.beginTransaction(function (err) {
        /* if error in the transaction */
        if (err) {
          /* Rollback the transaction */
          connection.rollback(function () {
            connection.release();
          });
        } else {
          /* Update shippment's details */
          connection.query(
            queryUpdateDetails,
            function (err, updateDetailsResult) {
              /* if error in the query */
              if (err) {
                /* Rollback the transaction */
                connection.rollback(function () {
                  connection.release();
                  res
                    .status(400)
                    .json({
                      error: "Error al actualizar la solicitud de envío",
                    });
                });
              } else {
                /* If there is an asociated service */
                if (SEST_Status && SEST_STId) {
                  connection.query(
                    queryUpdateStatus,
                    function (err, updateStatusResult) {
                      /* if error in the query */
                      if (err) {
                        /* Rollback the transaction */
                        connection.rollback(function () {
                          connection.release();
                          res
                            .status(400)
                            .json({
                              error:
                                "Error al actualizar la solicitud de envío",
                            });
                        });
                      } else {
                        /* Delete the products */
                        connection.query(
                          queryDeleteProducts,
                          function (err, deleteProductsResult) {
                            /* if error in the query */
                            if (err) {
                              /* Rollback the transaction */
                              connection.rollback(function () {
                                connection.release();
                                res
                                  .status(400)
                                  .json({
                                    error:
                                      "Error al actualizar la solicitud de envío",
                                  });
                              });
                            } else {
                              /* Insert the products */
                              connection.query(
                                queryUpdateProducts,
                                [productsList],
                                function (err, updateProductsResult) {
                                  /* if error in the query */
                                  if (err) {
                                    /* Rollback the transaction */
                                    connection.rollback(function () {
                                      connection.release();
                                      res
                                        .status(400)
                                        .json({
                                          error:
                                            "Error al actualizar la solicitud de envío",
                                        });
                                    });
                                  } else {
                                    /* Commit the transaction */
                                    connection.commit(function (err) {
                                      /* if error in the commit */
                                      if (err) {
                                        /* Rollback the transaction */
                                        connection.rollback(function () {
                                          connection.release();
                                          res
                                            .status(400)
                                            .json({
                                              error:
                                                "Error al actualizar la solicitud de envío",
                                            });
                                        });
                                      } else {
                                        /* Send the response */
                                        res
                                          .status(200)
                                          .json({
                                            message: "Solicitud Actualizada",
                                          });
                                      }
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  /* Delete the products */
                  connection.query(
                    queryDeleteProducts,
                    function (err, deleteProductsResult) {
                      /* if error in the query */
                      if (err) {
                        /* Rollback the transaction */
                        connection.rollback(function () {
                          connection.release();
                          res
                            .status(400)
                            .json({
                              error:
                                "Error al actualizar la solicitud de envío",
                            });
                        });
                      } else {
                        /* Insert the products */
                        connection.query(
                          queryUpdateProducts,
                          [productsList],
                          function (err, updateProductsResult) {
                            /* if error in the query */
                            if (err) {
                              /* Rollback the transaction */
                              connection.rollback(function () {
                                connection.release();
                                res
                                  .status(400)
                                  .json({
                                    error:
                                      "Error al actualizar la solicitud de envío",
                                  });
                              });
                            } else {
                              /* Commit the transaction */
                              connection.commit(function (err) {
                                /* if error in the commit */
                                if (err) {
                                  /* Rollback the transaction */
                                  connection.rollback(function () {
                                    connection.release();
                                    res
                                      .status(400)
                                      .json({
                                        error:
                                          "Error al actualizar la solicitud de envío",
                                      });
                                  });
                                } else {
                                  /* Send the response */
                                  res
                                    .status(200)
                                    .json({ message: "Solicitud Actualizada" });
                                }
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            }
          );
        }
      });
    });
  } catch (error) {
    /* error in the server */
    console.log(err);
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
    SET SE_Status = 0
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

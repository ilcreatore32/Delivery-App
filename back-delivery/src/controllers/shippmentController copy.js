import moment from "moment";
import XLSX from "xlsx";
import pool from "../database";
import path from "path";
import fs from "fs";

/* Update details of a shippment */
export const saveShippment = async function (req, res) {
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
    Persona_Id, // 20000000
    Persona_TipoId, // v
    Persona_Nombre, // 'Juan'
    Persona_Apellido, // 'Perez'
    Telefonos, // [ [424, 2843235], [416, 2231237] ]
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


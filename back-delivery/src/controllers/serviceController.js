import pool from "../database";

/* Get all services */
export const getServices = async (req, res) => {
    /* extract the query params */
    let { 
      view_option, // E.g. 'admin', 'carrier'.
      federal_entity='', // E.g. 'Distrito Capital'.
      municipality='', // E.g. 'libertádor'.
      parish='', // E.g. 'Sucre'.
      min_value='', // E.g. '0'.
      max_value='', // E.g. '30'
      min_hour='', // E.g. '11:00:00'.
      max_hour='', // E.g. '23:50:00'.
      conveyance='', // E.g. '1' (type of transport)
      availability='', // E.g. 'D'
      person_id='', // E.g. '28044244'
      person_name='', // E.g. 'Jesus'
      person_lastname='', // E.g. 'Rivas'
    } = req.query;
    try {
      if (federal_entity) {
        federal_entity = await pool.query('SELECT EF_Nombre FROM entidadesfederales WHERE EF_Id = ?', [federal_entity]);
        federal_entity = federal_entity[0].EF_Nombre;
      }
      if (municipality) {
        municipality = await pool.query('SELECT Municipio_Nombre FROM municipios WHERE Municipio_Id = ?', [municipality]);
        municipality = municipality[0].Municipio_Nombre;
      }
      if (parish) {
        parish = await pool.query('SELECT Parroquia_Nombre FROM parroquias WHERE Parroquia_Id = ?', [parish]);
        parish = parish[0].Parroquia_Nombre;
      }
    } catch (err) {
      /* error in the server */
      console.log(err);
      res.status(500).send('Error en el servidor') 
    }
    
    let queryServices = "";
    /* Depending of the view option, the query will be different */
    
    switch (view_option) {
        /* Admin all services data */
        case "admin":
          /* Check user's permissions'*/
          if (req.user.permission !== 'A') {
            return res.status(403).json({
              message: "No autorizado"
            });
          }
          /* Query to get all services */
          queryServices =
          `
          SELECT DISTINCT ST_Id, ST_HorarioIni, ST_HorarioFin, ST_Precio, ST_Status, 
          GROUP_CONCAT(  
			    'PARROQUIA: ',COALESCE(Parroquia_Nombre, ''), ',', 
			    'MUNICIPIO: ',COALESCE(Municipio_Nombre, ''), ',',
          'ENTIDAD FEDERAL: ',COALESCE(EF_Nombre, '')
          SEPARATOR '; ') AS areaoperacion, MT_Nombre

          FROM serviciotransporte

          LEFT JOIN personas
            ON ST_PersonaId = Persona_Id
          LEFT JOIN mediotransporte
            ON MT_Id = ST_MTId
          LEFT JOIN (SELECT EF_Nombre, Municipio_Nombre, Parroquia_Nombre, AO_STId
                  FROM areaoperaciones
                  LEFT JOIN entidadesfederales
                    ON AO_EFId = EF_Id
                  LEFT JOIN municipios
                    ON AO_MunicipioId = Municipio_Id
                  LEFT JOIN parroquias
                    ON AO_ParroquiaId = Parroquia_Id) AS areasoperaciones
            ON ST_Id = AO_STId
          
          WHERE 1=1
          ${
            min_value 
            ? max_value 
              ? `AND ST_Precio between ${min_value} and ${max_value}` 
              : `AND ST_Precio >= ${min_value} `
            : max_value 
              ?  `AND ST_Precio <= ${max_value} ` 
              : ''
          }
          ${
            min_hour 
            ? `AND ST_HorarioIni >= '${min_hour}'` 
            : ''
          }
          ${
            max_hour 
            ? `AND ST_HorarioFin <= '${max_hour}'` 
            : ''
          }
          ${
            conveyance 
            ? `AND ST_MTId = ${conveyance}` 
            : ''
          }
          ${
            availability 
            ? `AND ST_Status = '${availability}'` 
            : ''
          }
          ${
            person_id
              ? `AND ST_PersonaId = ${person_id}` 
              : ''
          }
          ${
            person_name
              ? `AND Persona_Nombre LIKE '%${person_name.trim()}%'` 
              : ''
          }
          ${
            person_lastname
              ? `AND Persona_Apellido LIKE '%${person_lastname.trim()}%'`  
              : ''
          }
          GROUP BY ST_Id
          HAVING 1=1 
          ${
            parish
              ? `AND areaoperacion LIKE '%PARROQUIA: ${parish}%'` 
              : ''
          }
          ${
            municipality !== ''
            ? `AND areaoperacion LIKE '%MUNICIPIO: ${municipality}%'` 
            : '' 
          }
          ${
            federal_entity 
            ? `AND areaoperacion LIKE '%ENTIDAD FEDERAL: ${federal_entity}%'` 
            : ''
          }
          `;
          break;
        /* Carrier's all services data */
        case 'carrier':
          /* Query to get all services */
          queryServices =
          `
          SELECT DISTINCT ST_Id, ST_HorarioIni, ST_HorarioFin, ST_Precio, ST_Status, 
          GROUP_CONCAT(  
			    'PARROQUIA: ',COALESCE(Parroquia_Nombre, ''), ',', 
			    'MUNICIPIO: ',COALESCE(Municipio_Nombre, ''), ',',
          'ENTIDAD FEDERAL: ',COALESCE(EF_Nombre, '')
          SEPARATOR '; ') AS areaoperacion, MT_Nombre

          FROM serviciotransporte

          LEFT JOIN personas
            ON ST_PersonaId = Persona_Id
          LEFT JOIN mediotransporte
            ON MT_Id = ST_MTId
          LEFT JOIN (SELECT EF_Nombre, Municipio_Nombre, Parroquia_Nombre, AO_STId
                  FROM areaoperaciones
                  LEFT JOIN entidadesfederales
                    ON AO_EFId = EF_Id
                  LEFT JOIN municipios
                    ON AO_MunicipioId = Municipio_Id
                  LEFT JOIN parroquias
                    ON AO_ParroquiaId = Parroquia_Id) AS areasoperaciones
            ON ST_Id = AO_STId
          
          WHERE ST_PersonaId = ${req.user.id} AND ST_Status <> 'E'
          ${ 
            min_value 
            ? max_value 
              ? `AND ST_Precio between ${min_value} and ${max_value}` 
              : `AND ST_Precio >= ${min_value} `
            : max_value 
              ?  `AND ST_Precio <= ${max_value} ` 
              : ''
          }
          ${
            min_hour 
            ? `AND ST_HorarioIni >= '${min_hour}'` 
            : ''
          }
          ${
            max_hour 
            ? `AND ST_HorarioFin <= '${max_hour}'` 
            : ''
          }
          ${
            conveyance 
            ? `AND ST_MTId = ${conveyance}` 
            : ''
          }
          ${ 
            availability 
            ? `AND ST_Status = '${availability}'` 
            : ''
          }
          GROUP BY ST_Id
          HAVING 1=1 
          ${
            parish
              ? `AND areaoperacion LIKE '%PARROQUIA: ${parish}%'` 
              : ''
          }
          ${
            municipality !== ''
            ? `AND areaoperacion LIKE '%MUNICIPIO: ${municipality}%'` 
            : '' 
          }
          ${
            federal_entity 
            ? `AND areaoperacion LIKE '%ENTIDAD FEDERAL: ${federal_entity}%'` 
            : ''
          }
          `;
          break;
        default:
          queryServices = '';
    }

    try {
      /* Get all data */
      await pool.query(queryServices , function (error, results) {
        /* if error in the query */
        if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
        /* if there is no data */
        if (results.length === 0 || results[0].ST_Id === null) return res.status(404).json({error: "No posee servicios de transporte"})
        /* send results */
        res.status(200).json( results )
      });
    } catch (err) {
      /* error in the server */
      console.log(err);
      res.status(500).send('Error en el servidor') 
    }
};

/* Get one service details */
export const getOneService = async function (req, res) {
  /* Extract service's id */
  const { id } = req.params;
  /* extract the query params */
  let { 
    view_option, // E.g. 'client' 'admin' or 'carrier'
  } = req.query;

  /* query to get all service's details */
  let query_service = `
  SELECT ST_Id, ST_HorarioIni, ST_HorarioFin, ST_Precio, ST_Status, ST_Descripcion,
  Vehiculo_Marca, Vehiculo_Modelo, Vehiculo_Anio, Vehiculo_Pasajeros, Vehiculo_CapacidadCarga,
  MT_Nombre, Persona_Nombre, Persona_Apellido, Persona_Id, 
  GROUP_CONCAT(Contacto_Info SEPARATOR '; ') AS ContactoInfo

  FROM serviciotransporte

  LEFT JOIN personas
    ON ST_PersonaId = Persona_Id
  LEFT JOIN contacto
    ON Contacto_PersonaId = Persona_Id
  LEFT JOIN vehiculos
    ON ST_VehiculoId = Vehiculo_Id
  LEFT JOIN mediotransporte
    ON ST_MTId = MT_Id
  
  WHERE ST_Id = ${id} ${view_option !== 'admin' ? `AND ST_Status <> 'E'` : ''} 
  
  `;
  /* query to get all service's areas */
  let query_areas = `
  SELECT EF_Nombre, Municipio_Nombre, Parroquia_Nombre
  FROM areaoperaciones

  LEFT JOIN entidadesfederales
    ON AO_EFId = EF_Id
  LEFT JOIN municipios
    ON AO_MunicipioId = Municipio_Id
  LEFT JOIN parroquias
    ON AO_ParroquiaId = Parroquia_Id
    
  WHERE AO_STId = ?
  `;
  /* query to get all service's shippments */
  let query_shippments = `
  SELECT DISTINCT SE_Id, SE_Fecha, SE_ValorTotal, SE_PesoTotal, SE_Fecha, SE_Status,
  GROUP_CONCAT('x', ProductoSE_Cantidad, ' ', Producto_Nombre, ' ', 
  Producto_Peso, 'kg ' SEPARATOR ', ') AS Productos_Envio, 
  EF_Nombre, Municipio_Nombre, Parroquia_Nombre

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
  JOIN (SELECT ST_Id FROM serviciotransporte WHERE ST_PersonaId = ?) ST
    ON SEST_STId = ST.ST_Id
    WHERE ST_Id = ?
  GROUP BY SE_Id
  `

  try {
    /* Get all service's details */
    await pool.query(query_service, async function (errService, serviceDetails) {
      console.log(errService)
      /* if error in the query */
      if (errService) return res.status(400).json({error: "Error al consultar en la base de datos"})
      /* if there is no data */
      console.log(serviceDetails)
      if (serviceDetails.length === 0 || serviceDetails[0].ST_Id === null) return res.status(404).json({error: "No posee servicios de transporte"})
      
      /* Get all service's areas */
      await pool.query(query_areas, serviceDetails[0].ST_Id, async function (errAreas, areas) {
        /* if error in the query */
        console.log(areas)
        if (errAreas) return res.status(400).json({error: "Error al consultar en la base de datos"})
        /* if there is no data */
        if (areas.length === 0 || areas[0].AO_EFId === null) return res.status(404).json({error: "No posee servicios de transporte"})
        
        /* check view option */
        if (view_option === 'client') {
          /* send results */
          res.status(200).json( {serviceDetails: serviceDetails[0], areas: areas}  )
        } else {
          /* Get all service's shippments */
          await pool.query(query_shippments, [serviceDetails[0].Persona_Id, id], function (errShippment, shippments){
            /* if error in the query */
            if (errShippment) return res.status(400).json({error: "Error al consultar en la base de datos"})
            /* send results */
            res.status(200).json( {serviceDetails: serviceDetails[0], areas: areas, shippments: shippments}  )
          })
        }
        
      })
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}

/* Get details for editing a service */
export const editService = async function (req, res) {
  /* Extract service's id */
  const { id } = req.params;
  /* Query to get service's details */
  let query_service = `
  SELECT DISTINCT ST_Id, ST_Horarioini, ST_Horariofin, ST_Status, ST_Precio,
  ST_Descripcion, ST_MTId, MT_Nombre, ST_VehiculoId, Vehiculo_Marca, Vehiculo_Modelo,
  Vehiculo_Pasajeros, Vehiculo_CapacidadCarga, ST_PersonaId
    
  FROM serviciotransporte

  LEFT JOIN mediotransporte
    ON MT_Id = ST_MTId
  LEFT JOIN vehiculos
    ON Vehiculo_Id = ST_VehiculoId

  WHERE ST_Id = ${id} 
  `;
  /* Query to get all service's areas */
  let query_areas = `
  SELECT EF_Id, EF_Nombre, Municipio_Id, Municipio_Nombre, Parroquia_Id, Parroquia_Nombre
  FROM areaoperaciones

  LEFT JOIN entidadesfederales
    ON AO_EFId = EF_Id
  LEFT JOIN municipios
    ON AO_MunicipioId = Municipio_Id
  LEFT JOIN parroquias
    ON AO_ParroquiaId = Parroquia_Id
    
  WHERE AO_STId = ?
  `;


  try {
    /* Get all service's details */
    await pool.query(query_service, async function (errService, serviceDetails) {
      /* if error in the query */
      if (errService) return res.status(400).json({error: "Error al consultar en la base de datos"})
      /* if there is no data */
      if (serviceDetails.length === 0 || serviceDetails[0].ST_Id === null) return res.status(404).json({error: "No posee servicios de transporte"})
      
      /* Get all service's areas */
      await pool.query(query_areas, serviceDetails[0].ST_Id, async function (errAreas, areas) {
        /* if error in the query */
        if (errAreas) return res.status(400).json({error: "Error al consultar en la base de datos"})
        /* if there is no data */
        if (areas.length === 0 || areas[0].AO_EFId === null) return res.status(404).json({error: "No posee servicios de transporte"})
        /* send results */
        res.status(200).json( {...serviceDetails[0], areasList: areas}  )
        
      })
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}

/* Save a service's information */
export const saveService = async function (req, res) {
  /* Extract service's id */
  let { id } = req.params
  /* extract the query body */
  let { 
    ST_Horarioini, // E.g. '11:45:57'
    ST_Horariofin,  // E.g. '23:46:03'
    ST_Status = "D",  // E.g. 'D'
    ST_Precio,  // E.g. '30.00'
    ST_Descripcion, // E.g. 'Example'
    ST_MTId, // E.g. '1'
    ST_VehiculoId,  // E.g. '2'
    ST_PersonaId=req.user.id, // E.g. '28044244'
    areasList // E.g. [[1,1,1],[1,4,2]] 'EF_Id, Municipio_Id, Parroquia_Id'
  } = req.body

  /* Create an object with the properties */
  const serviceDetails = {
    ST_Horarioini,
    ST_Horariofin,
    ST_Precio,
    ST_Status,
    ST_Descripcion,
    ST_MTId,
    ST_PersonaId,
    ST_VehiculoId
  }
  
  /* Get the keys of the object */
  const keysService = Object.keys(serviceDetails)

  /* If there is an id, push that id in each area's array */
  if (id) {
    areasList.map((area) => area.push(parseInt(id)))
  }

  /* Query to update service's details */
  let queryDetails = `
    UPDATE serviciotransporte
    SET ? WHERE ST_Id = ${id};
  `;
  /* if method is post, then insert a new service */
  if (req.method === 'POST') {
    queryDetails = `
      INSERT INTO serviciotransporte SET ? 
    `
  }
  /* Query to delete service's areas */
  let queryDeleteAreas = `
    DELETE FROM areaoperaciones WHERE AO_STId = ?; 
  `;
  /* Query to insert service's areas */
  let queryUpdateAreas = `
    INSERT INTO areaoperaciones (AO_EFId, AO_MunicipioId, AO_ParroquiaId, AO_STId) VALUES ?
  `;

  try {
    /* Get connection */
    pool.getConnection(function(err, connection) {
      /* if error in the connection */
      if (err) {
        console.log(err);
        return res.status(500).send('Error en el servidor')
      }
      /* Start transaction */
      connection.beginTransaction(function(err) {
          /* if error in the transaction */
          if (err) { 
              /* Rollback the transaction */
              connection.rollback(function() {
                  connection.release();
                  res.status(400).json( {error: "Error al guardar el servicio de transporte"} )
                });
            } else {
              /* save service's details */
              connection.query(queryDetails, serviceDetails, function(err, saveDetailsResult) {
                  /* if error in the query */
                  if (err) { 
                      /* Rollback the transaction */
                      connection.rollback(function() {
                          connection.release();
                          res.status(400).json( {error: "Error al guardar el servicio de transporte"} )
                      });
                  } else { 
                    /* If there is an inserted service (New service) push the id in each area's array */
                    if (saveDetailsResult.insertId) {
                      id = saveDetailsResult.insertId;
                      areasList.map((area) => area.push(parseInt(id)))
                    }
                    /* Delete areas */
                    connection.query(queryDeleteAreas, id, function(err, deleteAreasResult) {
                      /* if error in the query */
                      if (err) {
                        /* Rollback the transaction */
                        connection.rollback(function() {
                          connection.release();
                          res.status(400).json( {error: "Error al guardar el servicio de transporte"} )
                        });
                      } else {
                        /* If there is an areas list save them, else finish the transaction */
                        if (areasList.length > 0) {
                          console.log(areasList)
                          /* Insert areas */
                          connection.query(queryUpdateAreas,[areasList], function(err, updateAreasResult) {
                            /* if error in the query */
                            if (err) {
                              /* Rollback the transaction */
                              connection.rollback(function() {
                                connection.release();
                                res.status(400).json( {error: "Error al guardar el servicio de transporte"} )
                              });
                            } else {
                              /* Commit the transaction */
                              connection.commit(function(err) {
                                /* if error in the commit */
                                if (err) {
                                  /* Rollback the transaction */
                                  connection.rollback(function() {
                                    connection.release();
                                    res.status(400).json( {error: "Error al guardar el servicio de transporte"} )
                                  });
                                } else {
                                  /* Send the response */
                                  res.status(200).json( {message: "Servicio Actualizado"} )
                                }
                              });
                            }
                          })
                        } else {
                          /* Commit the transaction */
                          connection.commit(function(err) {
                            /* if error in the commit */
                            if (err) {
                              /* Rollback the transaction */
                              connection.rollback(function() {
                                connection.release();
                                res.status(400).json( {error: "Error al guardar el servicio de transporte"} )
                              });
                            } else {
                              /* Send the response */
                              res.status(200).json( {message: "Servicio Actualizado"} )
                            }
                          });
                        }
                      }
                    })
                  }
              });
          }    
      });
    });
  } catch (error) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}

/* Delete service */
export const deleteService = async function (req, res) {
  /* Get the id of the service */
  const { id } = req.params
  /* Query to delete the service */
  let queryUpdateStatus = `
    UPDATE serviciotransporte
    SET ST_Status = 'E'
    WHERE ST_Id = ${id};
  `;

  try {
    /* Delete the service */
    await pool.query(queryUpdateStatus, function (errShippment, shippmentResult) {
      /* if error in the query */
      if (errShippment) return res.status(400).json({error: "Error al consultar en la base de datos"})
      /* Send the response */
      res.status(200).json( {shippmentResult}  )
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}
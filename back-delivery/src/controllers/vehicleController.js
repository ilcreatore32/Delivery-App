import pool from "../database";

/* Get all vehicles */
export const getVehicles = async (req, res) => {
    /* extract the query params */
    let { 
      view_option, // E.g. 'admin', 'carrier'.
      conveyance='', // 1
      brand='', // Toyota
      model='', // Corolla
      min_year='', // 2000
      max_year='', // 2020
      min_passengers='', // 1
      max_passengers='', // 5
      min_weight='', // 10.00
      max_weight='', // 50.00
      plate='', // ABC123
      person_id='', // 20000000
      person_name='', // John
      person_lastname='', // Doe
    } = req.query;
    let queryVehicles = "";
    
    /* Depending of the view option, the query will be different */
    switch (view_option) {
        /* Admin all vehicles data */
        case "admin":
          /* Check user's permissions'*/
          if (req.user.permission !== 'A') {
            return res.status(403).json({
              message: "No autorizado"
            });
          }
          /* Query to get all vehicles */
          queryVehicles =
          `
          SELECT Vehiculo_Id, Vehiculo_Matricula, Vehiculo_Marca, Vehiculo_Modelo, Vehiculo_Anio, 
          Vehiculo_Pasajeros, Vehiculo_CapacidadCarga, MT_Nombre, Vehiculo_PersonaId,Persona_Nombre,
          Persona_Apellido
          FROM vehiculos
          JOIN mediotransporte 
            ON Vehiculo_MTId = MT_Id
          JOIN personas ON 
            Persona_Id = Vehiculo_PersonaId
            
          WHERE 1=1 
          ${
            conveyance 
            ? `AND MT_Id = ${conveyance}` 
            : ''
          }
          ${
            brand 
            ? `AND Vehiculo_Marca LIKE '%${brand.trim()}%'` 
            : ''
          }
          ${
            model 
            ? `AND Vehiculo_Modelo LIKE '%${model.trim()}%'` 
            : ''
          }
          ${
            min_year 
            ? max_year 
            ? `AND Vehiculo_Anio between ${min_year} and ${max_year}` 
            : `AND Vehiculo_Anio >= ${min_year}`
            : max_year 
            ?  `AND Vehiculo_Anio <= ${max_year}` 
            : ''
          }
          ${
            min_passengers 
            ? max_passengers 
              ? `AND Vehiculo_Pasajeros between ${min_passengers} and ${max_passengers}` 
              : `AND Vehiculo_Pasajeros >= ${min_passengers} `
            : max_passengers 
              ?  `AND Vehiculo_Pasajeros <= ${max_passengers} ` 
              : ''
          }
          ${
            min_weight 
            ? max_weight  
              ? `AND Vehiculo_CapacidadCarga between ${min_weight} and ${max_weight }` 
              : `AND Vehiculo_CapacidadCarga >= ${min_weight} `
            : max_weight  
              ?  `AND Vehiculo_CapacidadCarga <= ${max_weight } ` 
              : ''
          }
          ${
            person_id
            ? `AND Vehiculo_PersonaId = ${person_id}` 
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
          ${
            plate
            ? `AND Vehiculo_Matricula LIKE '${plate.trim()}%'`
            : ''
          }
          `;
          break;
        /* Carrier's all vehicles data */
        case 'carrier':
          /* Query to get all vehicles */
          queryVehicles =
          `
          SELECT Vehiculo_Id, Vehiculo_Matricula, Vehiculo_Marca, Vehiculo_Modelo, Vehiculo_Anio, 
          Vehiculo_Pasajeros, Vehiculo_CapacidadCarga, MT_Nombre, Vehiculo_PersonaId, Persona_Nombre,
          Persona_Apellido
          FROM vehiculos
          JOIN mediotransporte 
            ON Vehiculo_MTId = MT_Id
          JOIN personas ON 
            Persona_Id = Vehiculo_PersonaId
            
          WHERE Vehiculo_PersonaId = ${person_id} 
          ${
            conveyance 
            ? `AND MT_Id = ${conveyance}` 
            : ''
          }
          ${
            brand 
            ? `AND Vehiculo_Marca LIKE '%${brand.trim()}%'` 
            : ''
          }
          ${
            model 
            ? `AND Vehiculo_Modelo LIKE '%${model.trim()}%'` 
            : ''
          }
          ${
            min_year 
            ? max_year 
            ? `AND Vehiculo_Anio between ${min_year} and ${max_year}` 
            : `AND Vehiculo_Anio >= ${min_year}`
            : max_year 
            ?  `AND Vehiculo_Anio <= ${max_year}` 
            : ''
          }
          ${
            min_passengers 
            ? max_passengers 
              ? `AND Vehiculo_Pasajeros between ${min_passengers} and ${max_passengers}` 
              : `AND Vehiculo_Pasajeros >= ${min_passengers} `
            : max_passengers 
              ?  `AND Vehiculo_Pasajeros <= ${max_passengers} ` 
              : ''
          }
          ${
            min_weight 
            ? max_weight  
              ? `AND Vehiculo_CapacidadCarga between ${min_weight} and ${max_weight }` 
              : `AND Vehiculo_CapacidadCarga >= ${min_weight} `
            : max_weight  
              ?  `AND Vehiculo_CapacidadCarga <= ${max_weight } ` 
              : ''
          }
          ${
            plate
            ? `AND Vehiculo_Matricula LIKE '${plate.trim()}%'`
            : ''
          }
          `;
          break;
        default:
          queryVehicles = '';
    }

    try {
      /* Get all data */
      await pool.query(queryVehicles, function (error, results) {
        /* if error in the query */
        if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
        /* if there is no data */
        if (results.length === 0 || results[0].Vehiculo_Id === null) return res.status(404).json({error: "No posee vehiculos"})
        /* send results */
        res.status(200).json( results )
      });
    } catch (err) {
      /* error in the server */
      console.log(err);
      res.status(500).send('Error en el servidor') 
    }
};

/* Get one vehicle details */
export const getOneVehicle = async function (req, res) {
  /* Extract vehicle's id */
  const { id } = req.params;

  /* extract the query params */
  let queryVehicles = `
    SELECT Vehiculo_Id, Vehiculo_Matricula, MT_Nombre, Vehiculo_Marca, Vehiculo_Modelo, Vehiculo_Anio, 
    Vehiculo_Pasajeros, Vehiculo_CapacidadCarga
    FROM vehiculos
    JOIN mediotransporte 
      ON Vehiculo_MTId = MT_Id
    WHERE Vehiculo_Id = ?
  `;
  try {
    /* Get all data */
    await pool.query(queryVehicles, id, function (error, results) {
      /* if error in the query */
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      /* if there is no data */
      if (results.length === 0 || results[0].Vehiculo_Id === null) return res.status(404).json({error: "No posee vehiculos"})
      /* send results */
      res.status(200).json( results[0] )
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}

/* Save a vehicle's information */
export const saveVehicle = async function (req, res) {
  /* Extract vehicle's id */
  let { id } = req.params

  /* extract the query body */
  /*let {
    Vehiculo_Matricula, // E.g. 'admin', 'carrier'.
    Vehiculo_Marca, // Toyota
    Vehiculo_Modelo, // Corolla
    Vehiculo_Anio, // 2019
    Vehiculo_Pasajeros, // 4
    Vehiculo_CapacidadCarga, // 50.00
    Vehiculo_PersonaId, // 20000000
    Vehiculo_MTId // 1
  } = req.body*/

  /* Create an object with the properties */
  /*const vehicleDetails = {
    Vehiculo_Matricula, 
    Vehiculo_Marca, 
    Vehiculo_Modelo, 
    Vehiculo_Anio, 
    Vehiculo_Pasajeros, 
    Vehiculo_CapacidadCarga, 
    Vehiculo_PersonaId, 
    Vehiculo_MTId 
  }*/
  
  /* Query to update vehicle's details */
  let queryDetails = `
    UPDATE vehiculos
    SET ? WHERE Vehiculo_Id = ${id};
  `;
  /* if method is post, then insert a new vehicle */
  if (req.method === 'POST') {
    queryDetails = `
      INSERT INTO vehiculos SET ? 
    `
  }
  try {
    /* Get connection */
    pool.getConnection(function(err, connection) {
      connection.beginTransaction(function(err) {
          /* if error in the connection */
          if (err) {
              connection.rollback(function() {
                  connection.release();
                  res.status(400).json( {error: "Error al guardar el servicio de transporte"} )
              });
          } else {
              /* save vehicle's details */
              connection.query(queryDetails, req.body, function(err, saveDetailsResult) {
                  /* if error in the query */
                  if (err) {
                      /* Rollback the transaction */
                      connection.rollback(function() {
                          connection.release();
                          res.status(400).json( err )
                      });
                  } else { 
                    /* Commit the transaction */
                    connection.commit(function(err) {
                      /* if error in the commit */
                      if (err) {
                        /* Rollback the transaction */
                        connection.rollback(function() {
                          connection.release();
                          res.status(400).json( err )
                        });
                      } else {
                        /* Send the response */
                        res.status(200).json( {message: "Operación Exitosa"} )
                      }
                    });
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

/* Delete vehicle */
export const deleteVehicle = async function (req, res) {
  /* Get the id of the vehicle */
  const { id } = req.params

  /* Query to delete the vehicle */
  let queryDelete = `
    DELETE FROM vehiculos WHERE Vehiculo_Id = ${id}
  `;

  try {
    /* Delete the vehicle */
    await pool.query(queryDelete, function (error, result)  {
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
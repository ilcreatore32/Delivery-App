import moment from 'moment'
import pool from "../database";

/* Get all payments */
export const getPayments = async (req, res) => {
    /* extract the query params */
    let { 
      view_option, // E.g 'admin', 'carrier'
      method='', // E.g 'T'
      min_date='', // E.g '2019-01-01'
      max_date='', // E.g '2019-12-31'
      min_amount='', // E.g '0'
      max_amount='', // E.g '100.00'
      status='', // E.g 'P'
      reference='', // E.g '123456789'
      person_id='', // E.g '123456789'
      person_name='', // E.g 'John'
      person_lastname='', // E.g 'Doe'
    } = req.query;
    let queryPayments = "";
    /* format the dates */
    if (min_date) {
      min_date = moment(min_date).format("YYYY-MM-DD")
    }
    if (max_date) { 
      max_date = moment(max_date).format("YYYY-MM-DD")
    }
    /* Depending of the view option, the query will be different */
    switch (view_option) {
        /* Admin all payments data */
        case "admin":
          /* Check user's permissions'*/
          if (req.user.permission !== 'A') {
            return res.status(401).json({
              message: "No autorizado"
            });
          }
          /* Query to get all payments */
          queryPayments =
          `
          SELECT PS_Id, PS_Metodo, PS_Fecha, PS_Monto, PS_Status, Persona_Nombre, Persona_Apellido, Persona_Id
          FROM pago_suscripcion 
          JOIN suscripcion ON
            PS_SuscripcionId = Suscripcion_Id
          JOIN personas ON
            Suscripcion_PersonaId = Persona_Id
            
          WHERE 1=1 
          ${
            method 
            ? `AND PS_Metodo = '${method}'` 
            : ''
          }
          ${
            min_date
            ? max_date 
              ? `AND PS_Fecha between '${min_date}' and '${max_date}'` 
              : `AND PS_Fecha >= '${min_date}'`
            : max_date 
              ?  `AND PS_Fecha <= '${max_date}'` 
              : ''
          }
          ${
            min_amount 
            ? max_amount 
              ? `AND PS_Monto between ${min_amount} and ${max_amount}` 
              : `AND PS_Monto >= ${min_amount} `
            : max_amount 
              ?  `AND PS_Monto <= ${max_amount} ` 
              : ''
          }
          ${
            status 
            ? `AND PS_Status = '${status}'` 
            : ''
          }
          ${
            reference  
            ? `AND PS_Referencia LIKE '%${reference .trim()}%'` 
            : ''
          }
          ${
            person_id
            ? `AND Persona_Id = ${person_id}` 
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
          `;
          break;
        /* Carrier's all payments data */
        case 'carrier':
          /* Query to get all payments */
          queryPayments =
          `
          SELECT PS_Id, PS_Metodo, PS_Fecha, PS_Status
          FROM pago_suscripcion 
          JOIN suscripcion ON
            PS_SuscripcionId = Suscripcion_Id
            
          WHERE Suscripcion_PersonaId = ${person_id}
          `;
          break;
        default:
          queryPayments = '';
    }

    try {
      /* Get all data */
      await pool.query(queryPayments, function (error, results) {
        /* if error in the query */
        if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
        /* if there is no data */
        if (results.length === 0 || results[0].PS_Id === null) return res.status(404).json({error: "No posee pagos"})
        /* send results */
        res.status(200).json( results )
      });
    } catch (err) {
      /* error in the server */
      console.log(err);
      res.status(500).send('Error en el servidor') 
    }
};

/* Get one payment details */
export const getOnePayment = async function (req, res) {
  /* Extract payment's id */
  const { id } = req.params;

  /* extract the query params */
  let queryPayments = `
    SELECT PS_Id, PS_Status, PS_Metodo, PS_Fecha, PS_Monto, PS_Referencia, PS_ArchivoReferencia, PS_SuscripcionId
    FROM pago_suscripcion 
    WHERE PS_Id = ?
  `;
  try {
    /* Get all data */
    await pool.query(queryPayments, id, function (error, results) {
      /* if error in the query */
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      /* if there is no data */
      if (results.length === 0 || results[0].PS_Id === null) return res.status(404).json({error: "No posee pagos"})
      if (results[0].PS_ArchivoReferencia) results[0].PS_ArchivoReferencia = results[0].PS_ArchivoReferencia.toString("base64")
      /* send results */
      res.status(200).json( results[0] )
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}

/* Save a payment's information */
export const savePayment = async function (req, res) {
  /* Extract payment's id */
  let { id } = req.params

  /* extract the query body */
  let {
    PS_Status = "P", // E.g 'P'
    PS_Metodo, // E.g 'T'
    PS_Fecha, // E.g '2020-01-01'
    PS_Monto, // E.g '50.00'
    PS_Referencia, // E.g '123456789'
    PS_SuscripcionId // E.g '7'
  } = req.body
  /* Create an object with the properties */
  const paymentDetail = {
    PS_Status,
    PS_Metodo,
    PS_Fecha,
    PS_Monto,
    PS_Referencia,
    PS_ArchivoReferencia: req.file ? req.file.buffer : null,
    PS_SuscripcionId
  }
  
  /* Query to update payment's details */
  let queryPayments = `
    UPDATE pago_suscripcion
    SET ? WHERE PS_Id = ${id};
  `;
  /* if method is post, then insert a new payment */
  if (req.method === 'POST') {
    queryPayments = `
      INSERT INTO pago_suscripcion SET ? 
    `
  }
  try {
    /* Save payment */
    await pool.query(queryPayments, paymentDetail, function (error, results) {
      /* if error in the query */
      if (error) return res.status(400).json(error)
      /* send results */
      res.status(200).json( {message: "Operación Exitosa"} )
    });
  } catch (error) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}

/* Delete payment */
export const deletePayment = async function (req, res) {
  /* Get the id of the payment */
  const { id } = req.params

  /* Query to delete the payment */
  let queryDelete = `
    DELETE FROM pago_suscripcion WHERE PS_Id = ${id}
  `;

  try {
    //query to delete
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
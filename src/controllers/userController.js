import pool from "../database";

/* Get all payments */
export const getUsers = async (req, res) => {
    /* Check user's permissions'*/
    if (req.user.permission !== 'A') {
        return res.status(403).json({
            message: "No autorizado"
        });
    }
    /* extract the query params */
    let {
        person_id = '', // E.g '123456789'
        person_name = '', // E.g 'John'
        person_lastname = '', // E.g 'Doe'
        email, // Example: "example@example.com"
        suscription_type, // Example: "1"
        suscription_status, // Example: "S"
    } = req.query;
    /* build the query */
    let queryUsers = `
        SELECT Persona_Nombre, Persona_Apellido, Persona_Id, Usuario_Correo, Suscripcion_Id, 
        Suscripcion_Status, TS_Id, TS_Nombre
        FROM personas
            RIGHT JOIN usuarios ON Persona_Id = Usuario_Id
            LEFT JOIN suscripcion ON Persona_Id = Suscripcion_PersonaId
            LEFT JOIN tipo_suscripcion ON Suscripcion_TSId = TS_Id
        WHERE 1=1
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
          ${
            email
            ? `AND Usuario_Correo LIKE '%${email.trim()}%'`  
            : ''
          }
          ${
            suscription_type 
            ? `AND TS_Id = ${suscription_type}` 
            : ''
          }
          ${
            suscription_status 
            ? `AND Suscripcion_Status = '${suscription_status}'` 
            : ''
          }
    `;
    try {
        /* Get all data */
        await pool.query(queryUsers, function (error, results) {
            /* if error in the query */
            if (error) return res.status(400).json({ error: "Error al consultar en la base de datos" })
            /* if there is no data */
            if (results.length === 0 || results[0].PS_Id === null) return res.status(404).json({ error: "No hay usuarios en el sistema" })
            /* send results */
            res.status(200).json(results)
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
    SELECT PS_Id, PS_Status, PS_Metodo, PS_Fecha, PS_Monto, PS_Referencia, PS_ArchivoReferencia
    FROM pago_suscripcion 
    WHERE PS_Id = ${id}
  `;
    try {
        /* Get all data */
        await pool.query(queryPayments, id, function (error, results) {
            /* if error in the query */
            if (error) return res.status(400).json({ error: "Error al consultar en la base de datos" })
            /* if there is no data */
            if (results.length === 0 || results[0].PS_Id === null) return res.status(404).json({ error: "No posee pagos" })
            /* send results */
            res.status(200).json(results[0])
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
        PS_ArchivoReferencia,
        PS_SuscripcionId // E.g 1
    } = req.body

    /* Create an object with the properties */
    const paymentDetail = {
        PS_Status,
        PS_Metodo,
        PS_Fecha,
        PS_Monto,
        PS_Referencia,
        PS_ArchivoReferencia,
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
            res.status(200).json({ message: "Operación Exitosa" })
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
        await pool.query(queryDelete, function (error, result) {
            /* if error in the query */
            if (error) return res.status(400).json(error)
            /* Send the response */
            res.status(200).json({ message: "Operación Exitosa" })
        });
    } catch (err) {
        /* error in the server */
        console.log(err);
        res.status(500).send('Error en el servidor')
    }
}
import moment from "moment";
import pool from "../database";
import { withTransaction } from "../helpers/transaction";
import promisedPool from "../promisedPool";

/* Get all users */
export const getUsers = async (req, res) => {
  /* Check user's permissions'*/
  if (req.user.permission !== "A") {
    return res.status(403).json({
      message: "No autorizado",
    });
  }
  /* extract the query params */
  let {
    person_id = "", // E.g '123456789'
    person_name = "", // E.g 'John'
    person_lastname = "", // E.g 'Doe'
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
        ${person_id ? `AND Persona_Id = ${person_id}` : ""}
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
          ${email ? `AND Usuario_Correo LIKE '%${email.trim()}%'` : ""}
          ${suscription_type ? `AND TS_Id = ${suscription_type}` : ""}
          ${
            suscription_status
              ? `AND Suscripcion_Status = '${suscription_status}'`
              : ""
          }
    `;
  try {
    /* Get all data */
    await pool.query(queryUsers, function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      /* if there is no data */
      if (results.length === 0 || results[0].PS_Id === null)
        return res.status(404).json({ error: "No hay usuarios en el sistema" });
      /* send results */
      res.status(200).json(results);
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

/* Get one user details */
export const getOneUser = async function (req, res) {
  /* Extract payment's id */
  const { id } = req.params;

  /* extract the query params */
  let queryUserDetails = `
    SELECT Persona_Id, Persona_Nombre, Persona_Apellido, 
    Usuario_Correo, TS_Nombre , Suscripcion_Id, Suscripcion_Monto, Suscripcion_Status,
    Suscripcion_FechaI,Suscripcion_FechaV
    FROM personas
    JOIN usuarios ON Persona_Id = Usuario_Id
    LEFT JOIN suscripcion ON Persona_Id = Suscripcion_PersonaId
    LEFT JOIN tipo_suscripcion ON Suscripcion_TSId = TS_Id

    WHERE Persona_Id = ?
  `;
  let queryContact = `
    SELECT Contacto_Tipo, Contacto_Info FROM contacto
    WHERE Contacto_PersonaId = ?
  `;
  let queryPayments = `
    SELECT PS_Metodo, PS_Fecha, PS_Status 
    FROM pago_suscripcion
    WHERE PS_SuscripcionId = ?
  `;
  try {
    /* Get connection */
    const connection = await promisedPool.getConnection();
    /* Get all data */
    let transactionResult = await withTransaction(connection, res ,async () => {
        const [user, fields] = await connection.query(queryUserDetails, id);
        const [contact, fields2] = await connection.query(queryContact, id);
        const [payments, fields3] = await connection.query(queryPayments, user[0].Suscripcion_Id);
        return {user : user[0], contact : contact, payments : payments};
    })
    if (transactionResult) {
        res
          .status(200)
          .json(transactionResult);
      }
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

/* Get one user details to edit */
export const editUser = async function (req, res) {
    /* Extract user's id */
    const { id } = req.params;
    /* extract the request query */
    const {view_option} = req.query;
    if (view_option === 'admin' && req.user.permission !== "A") {
        return res.status(403).json({
            message: "No autorizado",
        });
    }
  
    /* extract the query params */
    let queryUserDetails = `
      SELECT Persona_Id, Persona_TipoId Persona_Nombre, Persona_Apellido, 
      Usuario_Correo, TS_Id, TS_Nombre, Suscripcion_Monto,
      ${
          view_option === 'admin' 
          ? `Suscripcion_Status,
          Suscripcion_FechaI, Suscripcion_FechaV,` 
          : ''
      }
      Suscripcion_Id 
      FROM personas
      JOIN usuarios ON Persona_Id = Usuario_Id
      LEFT JOIN suscripcion ON Persona_Id = Suscripcion_PersonaId
      LEFT JOIN tipo_suscripcion ON Suscripcion_TSId = TS_Id
  
      WHERE Persona_Id = ?
    `;
    let queryContact = `
      SELECT Contacto_Tipo, Contacto_Info FROM contacto
      WHERE Contacto_PersonaId = ?
    `;
    try {
      /* Get connection */
      const connection = await promisedPool.getConnection();
      /* Get all data */
      let transactionResult = await withTransaction(connection, res ,async () => {
          const [user, fields] = await connection.query(queryUserDetails, id);
          const [contact, fields2] = await connection.query(queryContact, id);
          return {user : user[0], contact : contact};
      })
      if (transactionResult) {
          res
            .status(200)
            .json(transactionResult);
        }
    } catch (err) {
      /* error in the server */
      console.log(err);
      res.status(500).send("Error en el servidor");
    }
  };

/* Save a payment's information */
export const saveUser = async function (req, res) {
  /* Extract payment's id */
  let { id } = req.params;
  /* extract the query body */
  let {
    Persona_Id,
    Persona_TipoId,
    Persona_Nombre,
    Persona_Apellido,
    Usuario_Correo,
    TS_Id,
    Suscripcion_Id,
    Suscripcion_Monto,
    Suscripcion_Status = "P",
    Suscripcion_FechaI = moment().format("YYYY-MM-DD"),
    Suscripcion_FechaV = moment().add(1, 'month').format("YYYY-MM-DD"), 
    contactos
  } = req.body;

  /* Create an object with the properties */
  const person = {
    Persona_Id,
    Persona_TipoId,
    Persona_Nombre,
    Persona_Apellido,
  };/* 
  const suscrition = {
    Suscripcion_Id,
    Suscripcion_Monto,
    Suscripcion_Status,
    Suscripcion_FechaI,
    Suscripcion_FechaV
  } */

  let queryUpdatePerson = `
    UPDATE personas SET ? WHERE Persona_Id = ?
  `;

  let queryUser = `
    UPDATE usuarios SET Usuario_Id = ?, Usuario_Correo = ? WHERE Usuario_PersonaId = ?
  `;

  let queryTypeSuscription = `
    SELECT TS_Monto FROM tipo_suscripcion WHERE TS_Id = ?
  `;

  const queryInsertSuscription = `
    INSERT INTO suscripcion SET ?
  `;

  const queryUpdateSuscription = `
    UPDATE suscripcion SET ? WHERE Suscripcion_Id = ?
  `;

  /* Query to update payment's details */
  let queryPayments = `
    UPDATE pago_suscripcion
    SET ? WHERE PS_Id = ${id};
  `;
  /* if method is post, then insert a new payment */
  if (req.method === "POST") {
    queryPayments = `
      INSERT INTO pago_suscripcion SET ? 
    `;
  }

  try {
    /* Get connection */
    const connection = await promisedPool.getConnection();
    /* Get all data */
    let transactionResult = await withTransaction(connection, res ,async () => {
        console.log(Suscripcion_FechaI, Suscripcion_FechaV);
        if (!Suscripcion_Id && TS_Id) {
            const [typeSuscription, fields] = await connection.query(queryTypeSuscription, TS_Id);
            const newSuscription = {
                Suscripcion_PersonaId: Persona_Id,
                Suscripcion_TSId: TS_Id,
                Suscripcion_Monto: typeSuscription[0].TS_Monto,
                Suscripcion_Status: Suscripcion_Status,
                Suscripcion_FechaI: Suscripcion_FechaI,
                Suscripcion_FechaV: Suscripcion_FechaV
            }
            const [suscriptionResult] = await connection.query(queryInsertSuscription, newSuscription);
            console.log(suscriptionResult);
            await connection.rollback()

        } else if (Suscripcion_Id && TS_Id) {

        } else if (!Suscripcion_Id && !TS_Id) {

        } else if (Suscripcion_Id && !TS_Id) {

        }

        const [user, fields] = await connection.query(queryUserDetails, id);
        const [contact, fields2] = await connection.query(queryContact, id);
        return {user : user[0], contact : contact};
    }) 
    if (transactionResult) {
        res
          .status(200)
          .json(transactionResult);
      }
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

/* Delete payment */
export const deletePayment = async function (req, res) {
  /* Get the id of the payment */
  const { id } = req.params;

  /* Query to delete the payment */
  let queryDelete = `
    DELETE FROM pago_suscripcion WHERE PS_Id = ${id}
  `;

  try {
    //query to delete
    await pool.query(queryDelete, function (error, result) {
      /* if error in the query */
      if (error) return res.status(400).json(error);
      /* Send the response */
      res.status(200).json({ message: "Operación Exitosa" });
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

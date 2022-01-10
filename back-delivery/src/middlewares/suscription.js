import pool from "../database";

export const suscriptionMiddleware = async (req, res, next) => {
  const { id } = req.user;

  let queryUpdateStatus = `
    UPDATE suscripcion
    SET Suscripcion_Status = 'V' WHERE Suscripcion_PersonaId = ? AND Suscripcion_FechaV < CURDATE()`;
  let queryStatus = `
    SELECT Suscripcion_Status FROM suscripcion 
    WHERE Suscripcion_PersonaId = ? AND (Suscripcion_Status <> 'V' OR 1=1)
    ORDER BY Suscripcion_FechaV DESC
    LIMIT 1`;
  try {
    /* Get all data */
    await pool.query(queryUpdateStatus, [id], async function (error, results) {
      /* if error in the query */
      if (error)
        return res
          .status(400)
          .json({ error: "Error al consultar en la base de datos" });
      await pool.query(queryStatus, [id], async function (error, results) {
        /* if error in the query */
        if (error)
          return res
            .status(400)
            .json({ error: "Error al consultar en la base de datos" });
        /* if the user is suscribed */
        if (results.length > 0) {
          req.status = results[0].Suscripcion_Status;
        }
        next();
      });
    });
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send("Error en el servidor");
  }
};

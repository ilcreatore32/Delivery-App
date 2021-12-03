import pool from "../database";

/* Get form options */
export const getOptions = async (req, res) => {
    /* extract the query params */
    let { 
      option, // E.g. federal_entity, municipality, etc.
      federal_entity='', // E.g. '1', '2', etc.
      municipality='', // E.g. '1', '2', etc.
    } = req.query;
    let query = "";

    switch (option) {
        /* Get all federal entities */
        case "federal_entity":
            query =
            `
            SELECT EF_Id, EF_Nombre FROM entidadesfederales
            `;
            break;
        /* Get all municipalities by federal entity */
        case "municipality":
            query =
            `
            SELECT Municipio_Id, Municipio_Nombre FROM municipios 
            ${
                federal_entity 
                ? `WHERE Municipio_EFId = ${federal_entity}` 
                : ''
            }
            `;
            break;
        /* Get all parish by municipality */
        case "parish":
            query =
            `
            SELECT Parroquia_Id, Parroquia_Nombre FROM Parroquias 
            ${
                municipality 
                ? `WHERE Parroquia_MunicipioId = ${municipality}` 
                : ''
            }
            `;
            break;
        default:
            query = '';
    }

    try {
      /* Get all data */
      await pool.query(query, function (error, results) {
        /* if error in the query */
        if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
        /* if there is no data */
        if (results.length === 0 || results[0].SE_Id === null) return res.status(404).json({error: "No es posible mostrar la opcion."})
        /* send results */
        res.status(200).json( results )
      });
    } catch (err) {
      /* error in the server */
      console.log(err);
      res.status(500).send('Error en el servidor') 
    }
  }; 

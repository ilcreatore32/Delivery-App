import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addRequestProduct = async (req, res) => {

  try {
    //get all data
    const {
      cantidad,
      idProductos,
      idSolicitudEnvio
    } = req.body;
    //new object to save
    const newRequestProduct = {
      cantidad,
      idProductos,
      idSolicitudEnvio
    };
    /* Search for Product Requests */

    await pool.query('SELECT EXISTS(SELECT 1 FROM productos WHERE idProductos = ?)',
    [idProductos], async function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no values
      if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Producto no encontrada" })

      /* Search for Services */

      await pool.query('SELECT EXISTS(SELECT 1 FROM solicitudesenvioproductos WHERE idSolicitudEnvio = ?)',
      [idSolicitudEnvio], async function (error, results, fields) {
        //if error in the query
        if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
        //if there is no values
        if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Solicitud de envío de producto no encontrada" })

        /* Validate if services and requests are not in the same row already */

        await pool.query('SELECT EXISTS(SELECT 1 FROM productos_por_solicitudes_envio WHERE idProductos = ? AND idSolicitudEnvio = ?)',
        [idProductos, idSolicitudEnvio], async function (error, results, fields) {
            //if error in the query
            if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
            //if the row exits
            if ( Object.values(results[0])[0] === 1 ) return res.status(400).json({ error: "Solicitud y producto ya enlazados" })

            /* query to insert new data */

            await pool.query('INSERT INTO productos_por_solicitudes_envio set ?', [newRequestProduct], function (error, results, fields) {
              //if error in the query
              if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
              //all correct
              res.status(200).json( { message: 'Solicitud y producto relacionados satisfactoriamente' } )
            });
        });
      });
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneRequestProduct = async (req, res) => {
  try {
    //get ids
    const { product, request } = req.params;

    //query to get all data
    await pool.query('SELECT * FROM productos_por_solicitudes_envio WHERE idProductos = ? AND idSolicitudEnvio = ?', [ product, request ],
    function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({message: "No encontrado"})
      //send result
      res.json( results[0] )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllRequestOrProductPerID = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    const { option } = req.query;

    //cases option in /:id?option=OptionInURL
    switch (option) {
      case "allrequests":
        //query to get all requests associated to a product
        await pool.query(`SELECT *
          FROM solicitudesenvioproductos
          WHERE EXISTS
            (
            SELECT  NULL
            FROM productos_por_solicitudes_envio
            WHERE idProductos = ?
            AND productos_por_solicitudes_envio.idSolicitudEnvio = solicitudesenvioproductos.idSolicitudEnvio
            )`, id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentran solicitudes de envío para este producto"})
          //send result
          res.json( results )
        });

        break ;
      case "allproducts":
        //query to get all products associated to a request
        await pool.query(`SELECT *
          FROM productos
          WHERE EXISTS
            (
            SELECT  NULL
            FROM productos_por_solicitudes_envio
            WHERE idSolicitudEnvio = ?
            AND productos_por_solicitudes_envio.idProductos = productos.idProductos
            )`, id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentran productos asociados a esta solicitud de envío"})
          //send result
          res.json( results )
        });
        break ;
      case "relationByRequest":
        //query to get all related request and products by request ID
        await pool.query(`SELECT * FROM productos_por_solicitudes_envio WHERE idSolicitudEnvio = ?`,
          id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentra ningún producto asociado a esta solicitud de envío"})
          //send result
          res.json( results )
        });
        break;
      case "relationByProduct":
        //query to get all related request and products by products ID
        await pool.query(`SELECT * FROM productos_por_solicitudes_envio WHERE idProductos = ?`, id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentra ninguna solicitud de envío asociada a este producto"})
          //send result
          res.json( results )
        });
        break;
      default:
        res.status(400).json({error: "Opcion no valida"})
        return;
    }

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateRequestProduct = async (req, res) => {
  try {
    //get ids
    const { product, request } = req.params;

    //get all data
    const {
      cantidad
    } = req.body;

    //new object to save
    const newRequestProduct = {
      cantidad
    };

    //query to update one row
    await pool.query("UPDATE productos_por_solicitudes_envio set ? WHERE idProductos = ? AND idSolicitudEnvio = ?", [newRequestProduct, product, request], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //send result
      res.json({ message: 'Actualizado Correctamente' })
    });

  } catch (err) {
    //error in the server
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteRequestProduct = async (req, res) => {
  try {
    //get id
    const { product, request } = req.params;
    //query to delete one row
    await pool.query("DELETE FROM productos_por_solicitudes_envio WHERE idProductos = ? AND idSolicitudEnvio = ?", [ product, request ], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al eliminar en la base de datos"})
      //send result
      res.json({ message: 'Exito al eliminar' })
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

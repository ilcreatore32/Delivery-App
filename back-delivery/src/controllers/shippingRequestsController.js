import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addShippingRequest = async (req, res) => {

  try {
    //get all data
    const {
      idSolicitudEnvio,
      descripcion,
      fecha,
      status,
      estado,
      municipio,
      ciudad,
      parroquia,
      avenida	= null,
      calle	= null,
      edificio = null,
      piso = null,
      referencia_extra = null,
      personas_cedula
    } = req.body;
    //new object to save
    const newShippingRequest = {
      idSolicitudEnvio,
      descripcion,
      fecha,
      status,
      estado,
      municipio,
      ciudad,
      parroquia,
      avenida,
      calle,
      edificio,
      piso,
      referencia_extra,
      personas_cedula
    };
    //query to insert new data
    await pool.query('INSERT INTO solicitudesenvioproductos set ?', [newShippingRequest], function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //all correct
      res.status(200).json( { message: 'Añadida la solicitud de envío de productos' } )
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllShippingRequests = async (req, res) => {
  try {
    //query to get all data
    await pool.query('SELECT * FROM solicitudesenvioproductos', function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "No posee solicitud de envío de productos"})
      //send result
      res.status(200).json( results )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneShippingRequest = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM solicitudesenvioproductos WHERE idSolicitudEnvio = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "Solicitud de envío de productos no encontrada"})
      //send result
      res.status(200).json(results[0])
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateShippingRequest = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //get all data
    const {
      descripcion,
      fecha,
      status,
      estado,
      municipio,
      ciudad,
      parroquia,
      avenida	= null,
      calle	= null,
      edificio = null,
      piso = null,
      referencia_extra = null,
      personas_cedula
    } = req.body;
    //new object to save
    const newShippingRequest = {
      descripcion,
      fecha,
      status,
      estado,
      municipio,
      ciudad,
      parroquia,
      avenida,
      calle,
      edificio,
      piso,
      referencia_extra,
      personas_cedula
    };
    //query to update one row
    await pool.query("UPDATE solicitudesenvioproductos set ? WHERE idSolicitudEnvio = ?", [newShippingRequest, id], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //send result
      res.status(200).json({ message: 'Solicitud de envío de productos actualizada' })
    });

  } catch (err) {
    //error in the server
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteShippingRequest = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //query to delete one row
    await pool.query("DELETE FROM solicitudesenvioproductos WHERE idSolicitudEnvio = ?", id, function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al eliminar en la base de datos"})
      //send result
      res.status(200).json({ message: 'Exito al eliminar' })
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

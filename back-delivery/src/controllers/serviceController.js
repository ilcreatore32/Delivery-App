import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addService = async (req, res) => {

  try {
    //get all data
    const {
      medio_de_transporte,
      inicio_de_horario,
      fin_de_horario,
      coste_por_kilometros,
      disponibilidad
    } = req.body;
    //generate id
    const idServicioTransporte = uuid()
    //new object to save
    const newService = {
      idServicioTransporte,
      medio_de_transporte,
      inicio_de_horario,
      fin_de_horario,
      coste_por_kilometros,
      disponibilidad
    };
    //query to insert new data
    await pool.query('INSERT INTO ofertasserviciotransporte set ?', [newService], function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //all correct
      res.json( { message: 'Añadido el servicio de transporte' } )
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllServices = async (req, res) => {
  try {
    //query to get all data
    await pool.query('SELECT * FROM ofertasserviciotransporte', function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({message: "No posee servicios de transporte"})
      //send result
      res.json( results )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};
// in case id is numeric
//let isnum = /^\d+$/.test(id)
// if (isnum) {
//   console.log('Solo numeros han ingresado');
// }
export const getOneService = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM ofertasserviciotransporte WHERE idServicioTransporte = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({message: "Servicio de transporte no encontrada"})
      //send result
      res.json({ servicio: results[0] })
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateService = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //get all data
    const {
      medio_de_transporte,
      inicio_de_horario,
      fin_de_horario,
      coste_por_kilometros,
      disponibilidad
    } = req.body;
    //new object to save
    const newService = {
      medio_de_transporte,
      inicio_de_horario,
      fin_de_horario,
      coste_por_kilometros,
      disponibilidad
    };
    //query to update one row
    await pool.query("UPDATE ofertasserviciotransporte set ? WHERE idServicioTransporte = ?", [newService, id], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //send result
      res.json({ message: 'Servicio de transporte actualizado' })
    });

  } catch (err) {
    //error in the server
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteService = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //query to delete one row
    await pool.query("DELETE FROM ofertasserviciotransporte WHERE idServicioTransporte = ?", id, function (error, results, fields) {
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

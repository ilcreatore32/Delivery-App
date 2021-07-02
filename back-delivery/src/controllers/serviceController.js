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
      disponibilidad,
      idVehiculos
    } = req.body;
    await pool.query('SELECT EXISTS(SELECT 1 FROM vehiculos WHERE idVehiculos = ?)',
    [idVehiculos], async function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no values
      if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Vehiculo no encontrado" })
      //generate id
      const idServicioTransporte = uuid()
      //new object to save
      const newService = {
        idServicioTransporte,
        medio_de_transporte,
        inicio_de_horario,
        fin_de_horario,
        coste_por_kilometros,
        disponibilidad,
        idVehiculos
      };
      //query to insert new data
      await pool.query('INSERT INTO ofertasserviciotransporte set ?', [newService], function (error, results, fields) {
        //if error in the query
        if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
        //all correct
        res.status(200).json( { message: 'Añadido el servicio de transporte' } )
      });
    })
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
      if (results.length === 0) return res.status(404).json({error: "No posee servicios de transporte"})
      //send result
      res.status(200).json( results )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneService = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM ofertasserviciotransporte WHERE idServicioTransporte = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "Servicio de transporte no encontrada"})
      //send result
      res.status(200).json(results[0])
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
      disponibilidad,
      idVehiculos
    } = req.body;
    await pool.query('SELECT EXISTS(SELECT 1 FROM vehiculos WHERE idVehiculos = ?)',
    [idVehiculos], async function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no values
      if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Vehiculo no encontrado" })
      //new object to save
      const newService = {
        medio_de_transporte,
        inicio_de_horario,
        fin_de_horario,
        coste_por_kilometros,
        disponibilidad,
        idVehiculos
      };
      //query to update one row
      await pool.query("UPDATE ofertasserviciotransporte set ? WHERE idServicioTransporte = ?", [newService, id], function (error, results, fields) {
        //if error in the query or no row affected
        if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
        //send result
        res.status(200).json({ message: 'Servicio de transporte actualizado' })
      });
    })

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
      res.status(200).json({ message: 'Exito al eliminar' })
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

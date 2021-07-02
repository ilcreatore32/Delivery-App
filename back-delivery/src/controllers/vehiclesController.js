import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addVehicle = async (req, res) => {
  try {
    //get all data
    const { tipo_vehiculos, modelo, year, cantidad_pasajeros, capacidad_carga, kilometros } = req.body;
    //generate id
    const idVehiculos = uuid()
    //new object to save
    const newVehicle = {
      idVehiculos,
      tipo_vehiculos,
      modelo,
      year,
      cantidad_pasajeros,
      capacidad_carga,
      kilometros
    };
    //query to insert new data
    await pool.query('INSERT INTO vehiculos set ?', [newVehicle], function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //all correct
      res.status(200).json( { message: 'Añadido el Vehiculo' } )
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    //query to get all data
    await pool.query('SELECT * FROM vehiculos', function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "No posee vehiculos"})
      //send result
      res.status(200).json( results )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneVehicle = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM vehiculos WHERE idVehiculos = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "Vehiculo no encontrado"})
      //send result
      res.status(200).json({ results[0] })
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateVehicle = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //get all data
    const {
      tipo_vehiculos,
      modelo,
      year,
      cantidad_pasajeros,
      capacidad_carga,
      kilometros
    } = req.body;
    //new object to save
    const newVehicle = {
      tipo_vehiculos,
      modelo,
      year,
      cantidad_pasajeros,
      capacidad_carga,
      kilometros
    };
    //query to update one row
    await pool.query("UPDATE vehiculos set ? WHERE idVehiculos = ?", [newVehicle, id], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //send result
      res.status(200).json({ message: 'Actualizado el Vehiculo' })
    });

  } catch (err) {
    //error in the server
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //query to delete one row
    await pool.query("DELETE FROM vehiculos WHERE idVehiculos = ?", id, function (error, results, fields) {
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

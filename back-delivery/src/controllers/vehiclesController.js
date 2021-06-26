import { v4 as uuid } from 'uuid';

import pool from "../database";

export const addVehicle = async (req, res) => {
  try {
    const { tipo_vehiculos, modelo, year, cantidad_pasajeros, capacidad_carga, kilometros } = req.body;
    const idVehiculos = uuid()
    const newVehicle = {
      idVehiculos,
      tipo_vehiculos,
      modelo,
      year,
      cantidad_pasajeros,
      capacidad_carga,
      kilometros
    };
    await pool.query('INSERT INTO vehiculos set ?', [newVehicle], function (error, results, fields) {
      if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
      res.json( results )
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllVehicles = async (req, res) => {
  try {

    await pool.query('SELECT * FROM vehiculos', function (error, results) {
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      if (results.length === 0) return res.status(404).json({message: "No posee vehiculos"})
      res.json( results )
    });

  } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneVehicle = async (req, res) => {
  try {
    // TODO: Como el id es númerico, por defecto mysql va a convertir cualquier id que
    //no sea un numero a 0, por tanto si se pasa 'ps' como parametro, automaticamente
    //se convierte a 0, entonces hay que cambiar el id a char y generarlo con uuid
    //y que sea unico

    const { id } = req.params;
    let isnum = /^\d+$/.test(id)
    if (isnum) {
      console.log('Solo numeros han ingresado');
    }
    console.log(id);
    await pool.query('SELECT * FROM vehiculos WHERE idVehiculos = ?', id, function (error, results) {
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      if (results.length === 0) return res.status(404).json({message: "Vehiculo no encontrado"})
      res.json({ vehicle: results[0] })
    });

  } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateVehicle = async (req, res) => {
  try {

    const { id } = req.params;
    const {
      tipo_vehiculos,
      modelo,
      year,
      cantidad_pasajeros,
      capacidad_carga,
      kilometros
    } = req.body;

    const newVehicle = {
      tipo_vehiculos,
      modelo,
      year,
      cantidad_pasajeros,
      capacidad_carga,
      kilometros
    };
    await pool.query("UPDATE vehiculos set ? WHERE idVehiculos = ?", [newVehicle, id], function (error, results, fields) {
      if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
      res.json({ message: 'Exito al actualizar' })
    });

  } catch (err) {
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM vehiculos WHERE idVehiculos = ?", id, function (error, results, fields) {
      if (error) return res.status(400).json({error: "Error al eliminar en la base de datos"})
      res.json({ message: 'Exito al eliminar' })
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

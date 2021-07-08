import { v4 as uuid } from 'uuid';
import pool from "../database";

export const getOnePerson = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM personas WHERE cedula = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "Persona no encontrada"})
      //send result
      res.status(200).json(results[0])
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};
export const getPeople = async (req, res) => {
  try {
    //query to get all people
    await pool.query('SELECT * FROM personas', function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "Personas no encontradas"})
      //send result
      res.status(200).json(results)
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addArea = async (req, res) => {
  try {
    //get all data
    const { estado, municipio, ciudad, parroquia } = req.body;
    //generate id
    const idAreaOperaciones = uuid()
    //new object to save
    const newArea = {
      idAreaOperaciones,
      estado,
      municipio,
      ciudad,
      parroquia
    };
    //query to insert new data
    await pool.query('INSERT INTO areaoperaciones set ?', [newArea], function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //all correct
      res.json( { message: 'Añadida el área de operaciones' } )
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllAreas = async (req, res) => {
  try {
    //query to get all data
    await pool.query('SELECT * FROM areaoperaciones', function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({message: "No posee área de operaciones"})
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
export const getOneArea = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM areaoperaciones WHERE idAreaOperaciones = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({message: "Área de operaciones no encontrada"})
      //send result
      res.json({ area: results[0] })
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateArea = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //get all data
    const {
      estado,
      municipio,
      ciudad,
      parroquia
    } = req.body;
    //new object to save
    const newArea = {
      estado,
      municipio,
      ciudad,
      parroquia
    };
    //query to update one row
    await pool.query("UPDATE areaoperaciones set ? WHERE idAreaOperaciones = ?", [newArea, id], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //send result
      res.json({ message: 'Area Actualizada' })
    });

  } catch (err) {
    //error in the server
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteArea = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //query to delete one row
    await pool.query("DELETE FROM areaoperaciones WHERE idAreaOperaciones = ?", id, function (error, results, fields) {
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

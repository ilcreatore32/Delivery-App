import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addArea = async (req, res) => {
  try {
    //get all data
    const {
      estado,
      municipio = null,
      ciudad,
      parroquia = null,
      idServicioTransporte
    } = req.body;
    await pool.query('SELECT EXISTS(SELECT 1 FROM ofertasserviciotransporte WHERE idServicioTransporte = ?)',
    [idServicioTransporte], async function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no values
      if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Servicio de transporte no encontrado" })
      //generate id
      const idAreaOperaciones = uuid()
      //new object to save
      const newArea = {
        idAreaOperaciones,
        estado,
        municipio,
        ciudad,
        parroquia,
        idServicioTransporte
      };
      //query to insert new data
      await pool.query('INSERT INTO areaoperaciones set ?', [newArea], function (error, results, fields) {
        //if error in the query
        if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
        //all correct
        res.status(200).json( { message: 'Añadida el área de operaciones' } )
      });
    })
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
      if (results.length === 0) return res.status(404).json({error: "No posee área de operaciones"})
      //send result
      res.status(200).json( results )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneArea = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM areaoperaciones WHERE idAreaOperaciones = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "Área de operaciones no encontrada"})
      //send result
      res.status(200).json(results[0])
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
      parroquia,
      idServicioTransporte
    } = req.body;
    await pool.query('SELECT EXISTS(SELECT 1 FROM ofertasserviciotransporte WHERE idServicioTransporte = ?)',
    [idServicioTransporte], async function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no values
      if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Servicio de transporte no encontrado" })
      //new object to save
      const newArea = {
        estado,
        municipio,
        ciudad,
        parroquia,
        idServicioTransporte
      };
      //query to update one row
      await pool.query("UPDATE areaoperaciones set ? WHERE idAreaOperaciones = ?", [newArea, id], function (error, results, fields) {
        //if error in the query or no row affected
        if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
        //send result
        res.status(200).json({ message: 'Area Actualizada' })
      });
    })

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
      res.status(200).json({ message: 'Exito al eliminar' })
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

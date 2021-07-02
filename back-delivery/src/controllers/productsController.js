import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addProduct = async (req, res) => {

  try {
    //get all data
    const {
      nombre_producto,
      tipo_producto,
      tamaño,
      peso,
      precio
    } = req.body;
    //generate id
    const idProductos = uuid()
    //new object to save
    const newProduct = {
      idProductos,
      nombre_producto,
      tipo_producto,
      tamaño,
      peso,
      precio
    };
    //query to insert new data
    await pool.query('INSERT INTO productos set ?', [newProduct], function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //all correct
      res.status(200).json( { message: 'Añadido el producto' } )
    });
  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllProducts = async (req, res) => {
  try {
    //query to get all data
    await pool.query('SELECT * FROM productos', function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "No posee productos"})
      //send result
      res.status(200).json( results )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneProduct = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    //query to get one row
    await pool.query('SELECT * FROM productos WHERE idProductos = ?', id, function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "Producto no encontrado"})
      //send result
      res.status(200).json({ results[0] })
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateProduct = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //get all data
    const {
      nombre_producto,
      tipo_producto,
      tamaño,
      peso,
      precio
    } = req.body;
    //new object to save
    const newProduct = {
      nombre_producto,
      tipo_producto,
      tamaño,
      peso,
      precio
    };
    //query to update one row
    await pool.query("UPDATE productos set ? WHERE idProductos = ?", [newProduct, id], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //send result
      res.status(200).json({ message: 'Solicitud producto actualizado' })
    });

  } catch (err) {
    //error in the server
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteProduct = async (req, res) => {
  try {
    //get id
    const { id } = req.params;
    //query to delete one row
    await pool.query("DELETE FROM productos WHERE idProductos = ?", id, function (error, results, fields) {
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

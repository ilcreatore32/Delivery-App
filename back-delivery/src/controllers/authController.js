import bcryptjs from 'bcryptjs';
import pool from "../database";
import jwt from 'jsonwebtoken';

/* Authenticate user */
export const authenticateUser = async (req, res) => {
  /* extract email and password from body */
  const { email, password } = req.body;
  try {
    /* get user */
    pool.query('SELECT * FROM usuarios WHERE Usuario_Correo = ?', [email], (error, results, fields) => {
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      /* if user not found */
      if (!results[0]) {
        return res.status(404).json({error: "El usuario no existe"})
      }
      /* check password */
      const passCorrect = bcryptjs.compareSync(password, results[0].Usuario_Clave)
      if (!passCorrect) {
        return res.status(400).json({error: "Password incorrecto"})
      }
      /* create payload */
      const payload = {
        user: {
          id: results[0].Usuario_Id,
          permission: results[0].Usuario_Permisos
        }
      }
  
      /* create token */
      jwt.sign(payload, process.env.SECRETA, {
        expiresIn: 3600 // 1 hora
      }, (error, token) => {
        if (error) throw error;
        /* send token */
        res.json({ token })
      })
    })
  } catch (error) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}

export const getAuthenticatedUser = async (req, res) => {
  try {
    /* get user */
    pool.query('SELECT * FROM usuarios WHERE Usuario_Id = ?', [req.user.id], (error, results, fields) => {
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      /* if user not found */
      if (!results[0]) {
        return res.status(404).json({error: "El usuario no existe"})
      }
      /* send user */
      res.json(results[0])
    })
  } catch (err) {
    /* error in the server */
    console.log(err);
    res.status(500).send('Error en el servidor') 
  }
}


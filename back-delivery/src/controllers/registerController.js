import bcryptjs from 'bcryptjs';
import pool from "../database";
import jwt from 'jsonwebtoken';

/* Create a new user */
export const registerUser = async (req, res) => {
    /* extract the query params */
    let { 
        person_id, // Example: 20000000
        type_id, // Example: V
        email, // Example: "example@example.com"
        password, // Example: "example"
        name, // Example: "jesus"
        lastname, // Example: "rivas"
        file
    } = req.body;
    /* Create an object with the user's properties */
    const newUser = {
        Usuario_Id: person_id,
        Usuario_Correo: email,
        Usuario_Clave: password
    };
    /* Create an object with the person's properties */
    const newPerson = {
        Persona_Id: person_id,
        Persona_TipoId: type_id,
        Persona_Nombre: name, 
        Persona_Apellido: lastname,
        Persona_Archivo: file
    }
    try {
        /* Checl if the user exists */
        pool.query('SELECT Usuario_Id FROM usuarios WHERE Usuario_Correo = ? OR Usuario_Id = ?', [email, person_id], async (error, results) => {
            if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})

            /* Check if the user exists */
            if (results.length) {
                return res.status(460).json({ msg: 'El usuario ya existe' });
            }

            /* If the user does not exist then encrypt password */
            const salt = await bcryptjs.genSalt(10);
            newUser.Usuario_Clave = await bcryptjs.hash(password, salt)
            
            /* Check if the person exists*/
            pool.query('SELECT COUNT(1) FROM personas WHERE Persona_Id = ?', [person_id], (error, results) => {
                /* if error in the query */
                if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})

                /* if the person exists then update the person and create the user */
                if (results[0]['COUNT(1)'] > 0) {
                    
                    pool.getConnection((error, connection) => {
                        if (error) return res.status(400).json({error: "Error al conectar con la base de datos"})
                        connection.beginTransaction(error => {
                            /* if error in the connection */
                            if (error) return res.status(400).json({error: "Error al conectar con la base de datos"})
                            /* Update the person */
                            connection.query('UPDATE personas SET ? WHERE Persona_Id = ?', [newPerson, person_id], (error, results) => {
                                /* if error in the query */
                                if (error) return res.status(400).json({error: "Error al actualizar la persona"})
                                connection.query('INSERT INTO usuarios SET ?', [newUser], (error, results) => {
                                    /* if error in the query */
                                    if (error) return res.status(400).json({error: "Error al crear el usuario"})
                                    /* Commit the transaction */
                                    connection.commit(function(err) {
                                        /* if error in the commit */
                                        if (err) {
                                          /* Rollback the transaction */
                                          connection.rollback(function() {
                                            connection.release();
                                            res.status(400).json( {error: "Error al actualizar la solicitud de envío"} )
                                          });
                                        } else {
                                          /* create payload */
                                          const payload = {
                                            usuario: {
                                                id: person_id
                                            }
                                          }
                                          /* create the token */
                                          jwt.sign(payload, process.env.SECRETA, {
                                            expiresIn: 3600 
                                            }, (error, token) => {
                                            if (error) throw error;
                                            /* send token  */
                                            return res.status(200).json({ token , msg: 'Usuario creado'})
                                          })
                                        }
                                    });
                                });
                            });
                        });
                    });
                } else {
                    /* If the person does not exist then create the person and the user */
                    pool.getConnection((error, connection) => {
                        /* if error in the connection */
                        if (error) return res.status(400).json({error: "Error al conectar con la base de datos"})
                        connection.beginTransaction(error => {
                            /* if error in the transaction */
                            if (error) return res.status(400).json({error: "Error al conectar con la base de datos"})
                            /* Create the person */
                            connection.query('INSERT INTO personas SET ?', [newPerson], (error, results) => {
                                /* if error in the query */
                                if (error) return res.status(400).json({error: "Error al crear la persona"})
                                /* Create the user */
                                connection.query('INSERT INTO usuarios SET ?', [newUser], (error, results) => {
                                    /* if error in the query */
                                    if (error) return res.status(400).json({error: "Error al crear el usuario"})
                                    connection.release();
                                    /* create payload */
                                    const payload = {
                                        usuario: {
                                            id: person_id
                                        }
                                    }
                                    /* create the token */
                                    jwt.sign(payload, process.env.SECRETA, {
                                        expiresIn: 3600 
                                        }, (error, token) => {
                                        if (error) throw error;
                                        /* send token  */
                                        return res.status(200).json({ token , msg: 'Usuario creado'})
                                    })
                                });
                            })
                        });
                    });
                }
            })
        });

    } catch (error) {
       /* error in the server */
        console.log(err);
        res.status(500).send('Error en el servidor') 
    }
};

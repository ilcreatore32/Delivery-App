import { v4 as uuid } from 'uuid';
import pool from "../database";


export const addServicesRequests = async (req, res) => {

  try {
    //get all data
    const {
      status,
      mensaje_status,
      idSolicitudEnvio,
      idServicioTransporte
    } = req.body;
    //new object to save
    const newServicesRequests = {
      status,
      mensaje_status,
      idSolicitudEnvio,
      idServicioTransporte
    };
    /* Search for Product Requests */

    await pool.query('SELECT EXISTS(SELECT 1 FROM solicitudesenvioproductos WHERE idSolicitudEnvio = ?)',
    [idSolicitudEnvio], async function (error, results, fields) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no values
      if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Solicitud no encontrada" })

      /* Search for Services */

      await pool.query('SELECT EXISTS(SELECT 1 FROM ofertasserviciotransporte WHERE idServicioTransporte = ?)',
      [idServicioTransporte], async function (error, results, fields) {
        //if error in the query
        if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
        //if there is no values
        if ( Object.values(results[0])[0] !== 1 ) return res.status(404).json({ error: "Servicio no encontrado" })

        /* Validate if services and requests are not in the same row already */

        await pool.query('SELECT EXISTS(SELECT 1 FROM servicios_por_solicitudes WHERE idSolicitudEnvio = ? AND idServicioTransporte = ?)',
        [idSolicitudEnvio, idServicioTransporte], async function (error, results, fields) {
            //if error in the query
            if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
            //if the row exits
            if ( Object.values(results[0])[0] === 1 ) return res.status(400).json({ error: "Servicio y solicitud ya enlazados" })

            /* query to insert new data */

            await pool.query('INSERT INTO servicios_por_solicitudes set ?', [newServicesRequests], function (error, results, fields) {
              //if error in the query
              if (error) return res.status(400).json({error: "Error al guardar en la base de datos"})
              //all correct
              res.status(200).json( { message: 'Solicitud y Servicio relacionados satisfactoriamente' } )
            });
        });
      });
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getOneServicesRequests = async (req, res) => {
  try {
    //get ids
    const { request, service } = req.params;

    //query to get all data
    await pool.query('SELECT * FROM servicios_por_solicitudes WHERE idSolicitudEnvio = ? AND idServicioTransporte = ?', [ request, service ] , function (error, results) {
      //if error in the query
      if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
      //if there is no data
      if (results.length === 0) return res.status(404).json({error: "No encontrado"})
      //send result
      res.status(200).json( results[0] )
    });

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const getAllServicesOrRequestsPerID = async (req, res) => {
  try {

    //get id
    const { id } = req.params;
    const { option } = req.query;
    //cases option in /:id?option=OptionInURL
    switch (option) {
      case "allservices":
        //query to get all services associated to a request
        await pool.query(`SELECT *
          FROM ofertasserviciotransporte
          WHERE EXISTS
            (
            SELECT  NULL
            FROM servicios_por_solicitudes
            WHERE idSolicitudEnvio = ?
            AND servicios_por_solicitudes.idServicioTransporte = ofertasserviciotransporte.idServicioTransporte
            )`, id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentran servicios de transporte"})
          //send result
          res.status(200).json( results )
        });

        break ;
      case "allrequests":
        //query to get all requests associated to a service
        await pool.query(`SELECT *
          FROM solicitudesenvioproductos
          WHERE EXISTS
            (
            SELECT  NULL
            FROM servicios_por_solicitudes
            WHERE idServicioTransporte = ?
            AND servicios_por_solicitudes.idSolicitudEnvio = solicitudesenvioproductos.idSolicitudEnvio
            )`, id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentran solicitudes de envío"})
          //send result
          res.status(200).json( results )
        });
        break ;
      case "relationByService":
        //query to get all related services and request by service ID
        await pool.query(`SELECT * FROM servicios_por_solicitudes WHERE idServicioTransporte = ?`,
          id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentra ninguna solicitud de envío asociada a este servicio de transporte"})
          //send result
          res.status(200).json( results )
        });
        break;
      case "relationByRequest":
        //query to get all related services and request by request ID
        await pool.query(`SELECT * FROM servicios_por_solicitudes WHERE idSolicitudEnvio = ?`, id, function (error, results) {
          //if error in the query
          if (error) return res.status(400).json({error: "Error al consultar en la base de datos"})
          //if there is no data
          if (results.length === 0) return res.status(404).json({error: "No se encuentra ningún servicio de transporte asociado a esta solicitud de envío"})
          //send result
          res.status(200).json( results )
        });
        break;
      default:
        res.status(400).json({error: "Opcion no valida"})
        return;
    }

  } catch (err) {
    //error in the server
    console.log(err);
    res.status(500).send('Error en el servidor')
  }
};

export const updateServicesRequests = async (req, res) => {
  try {
    //get ids
    const { request, service } = req.params;

    //get all data
    const {
      status,
      mensaje_status
    } = req.body;

    //new object to save
    const newServiceRequest = {
      status,
      mensaje_status
    };

    //query to update one row
    await pool.query("UPDATE servicios_por_solicitudes set ? WHERE idSolicitudEnvio = ? AND idServicioTransporte = ?", [newServiceRequest, request, service], function (error, results, fields) {
      //if error in the query or no row affected
      if (error || (results.affectedRows === 0)) return res.status(400).json({error: "Error al guardar en la base de datos"})
      //send result
      res.status(200).json({ message: 'Actualizado Correctamente' })
    });

  } catch (err) {
    //error in the server
      console.log(err);
      res.status(500).send('Error en el servidor')
  }
};

export const deleteServicesRequests = async (req, res) => {
  try {
    //get id
    const { request, service } = req.params;
    //query to delete one row
    await pool.query("DELETE FROM servicios_por_solicitudes WHERE idSolicitudEnvio = ? AND idServicioTransporte = ?", [request, service], function (error, results, fields) {
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

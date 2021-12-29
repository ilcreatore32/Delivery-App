export async function withTransaction( connection, res, callback ) {
    let result
    try {
      await connection.beginTransaction();
      result = await callback();
      await connection.commit();
    } catch ( err ) {
      await connection.rollback();
      console.error( err );
      res.status(500).send({
        error: "Hubo un error al consultar en la base de datos"
      });
      throw err;
    } finally {
      await connection.release();
      return result || true
    }
  }
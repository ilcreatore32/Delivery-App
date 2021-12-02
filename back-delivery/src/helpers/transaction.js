export async function withTransaction( connection, res, callback ) {
    try {
      await connection.beginTransaction();
      await callback();
      await connection.commit();
    } catch ( err ) {
      await connection.rollback();
      res.status(500).json({
        error: "Hubo un error al consultar en la base de datos"
      });
      throw err;
    } finally {
      await connection.release();
      return true
    }
  }
import mysql from "mysql2";
import { promisify } from "util";
import config from "./config";

/* Extract DB Options */
const { db_options } = config;

/* Create Pool */
const pool = mysql.createPool(db_options);

/* Start connection */
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      return console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      return console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      return console.error("Database connection was refused");
    }
  } 

  if (connection) connection.release();
  console.log("DB is Connected");

  return;
});


// Promisify Pool Querys
pool.query = promisify(pool.query);
// Promisify Pool Connections
pool.getConnection = promisify(pool.getConnection) 

export default pool;

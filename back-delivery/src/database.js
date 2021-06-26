import mysql from "mysql";
import { promisify } from "util";
import config from "./config";

const { db_options } = config;


const pool = mysql.createPool(db_options);

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

export default pool;

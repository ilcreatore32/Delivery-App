/**
 * Reading Environment Variables
 */
import { config } from "dotenv";
config();
/* Database Config */
export default {
  db_options : {
    connectionLimit: 10,
    host : process.env.DATABASE_HOST || "localhost",
		user : process.env.DATABASE_USER || "root",
		password : process.env.DATABASE_PASSWORD || "",
		database : process.env.DATABASE_NAME || "delivery",
  },
  port : process.env.DATABASE_PORT || 3306,
};

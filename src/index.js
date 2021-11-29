import express from "express";
import cors from 'cors';
import routes from "./routes";

// create express app
const app = express();

//use cors
app.use(cors())

//use json
app.use(express.json({ extended: true }))

/* // Static files
app.use(express.static(path.join(__dirname, '/files'))); */

app.set("port", 4001);

app.listen(app.get("port"));

// Routes
app.use(routes);

console.log("Servidor Encendido, en el puerto:", app.get("port"));
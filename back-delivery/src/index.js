import express from "express";
//const conectarDB = require('./config/db');
import cors from 'cors'
import routes from "./routes";
// crear el servidor

const app = express();

//conectar a la base de datos
//conectarDB();

//habilitar cors
app.use(cors())

//habilitar express.json
app.use(express.json({ extended: true }))

app.set("port", 4000);

app.listen(app.get("port"));

// Routes
app.use(routes);

console.log("Servidor Encendido, en el puerto:", app.get("port"));

//Para usar las librerias tenemos que importarlas

//Forma antigua (commonjs)
/*
const express = require("express");

const app = express();

console.log(express);
console.log(app);
*/

//Forma moderna (modules) modulesjs

// En el archivo package.json debemos añadir "type": "module" para poder usar la sintaxis de importación
//"main": "index.js",
//"type": "module",
/*
import express from "express";
const app = express();

console.log(express);
console.log(app);

console.log(1 + 1);
*/


//Armado de aplicación
import express from "express";

//Tenemos que decirle a Node que vamos a usar variables de entorno y las entienda
import dotenv from "dotenv";

//Importamos la función connectDB desde el archivo config/db.js
import { connectDB } from "./config/db.js";

import UsuariosRouter from "./routes/usuario.js"; //Importamos las rutas de usuario

const app = express();
dotenv.config(); //Cargar las variables de entorno desde el archivo .env

//Asignación de puerto
//El puerto es un número que identifica un proceso en ejecución en el sistema operativo
const port = 3000;

connectDB(); //Llamamos a la función connectDB para conectar a la base de datos

app.use(express.json({ extended: true })); //Middleware para parsear el cuerpo de las peticiones en formato JSON

//Crea un servidor web que escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});

//Definimos las rutas de la aplicación
app.use('/api/usuarios', UsuariosRouter); //Asociamos las rutas de usuario al prefijo /api/usuarios
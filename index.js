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

const app = express();
//Asignación de puerto
//El puerto es un número que identifica un proceso en ejecución en el sistema operativo
const port = 3000;

//Crea un servidor web que escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
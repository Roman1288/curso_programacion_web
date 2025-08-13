//En index.js se defininen las rutas de la aplicación y se configura el servidor web. La ruta raiz y el controlador que va a manejar esa ruta.
import express from "express";

import { 
  autenticarUsuario 
} from "../controllers/authController.js";

const router = express.Router(); //Creamos un enrutador de Express

//verbo
router.post("/login", autenticarUsuario); //Definimos la ruta para autenticar un usuario.

export default router; //Exportamos el enrutador para que pueda ser utilizado en otros archivos, como index.js
//Esto permite que las rutas definidas en este archivo se puedan usar en el servidor principal de la aplicación.
//De esta manera, separamos la lógica de las rutas de la lógica del controlador, lo que facilita el mantenimiento y la escalabilidad de la aplicación.
//El enrutador se encargará de manejar las peticiones relacionadas con los usuarios, como crear un usuario, obtener todos los usuarios, actualizar un usuario, eliminar un usuario, etc.
//En resumen, este archivo define las rutas relacionadas con los usuarios y las asocia con los controladores correspondientes para manejar las peticiones HTTP.
//Esto es parte de la arquitectura MVC (Modelo-Vista-Controlador), donde el enrutador actúa como el controlador de las rutas y la lógica de negocio se maneja en los controladores específicos.
//Esto permite que las rutas sean más organizadas y fáciles de mantener, especialmente en aplicaciones más grandes y complejas.


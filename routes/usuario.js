//En index.js se defininen las rutas de la aplicación y se configura el servidor web. La ruta raiz y el controlador que va a manejar esa ruta.
import express from "express";

import { 
  crearUsuario,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario
} from "../controllers/usuariosController.js";

const router = express.Router(); //Creamos un enrutador de Express

//verbo
router.post('/', crearUsuario); //Definimos la ruta para crear un usuario. Cuando se haga una petición POST a /api/usuarios, se ejecutará la función crearUsuario del controlador usuariosController.js

router.get('/', obtenerUsuarios); //Definimos la ruta para obtener todos los usuarios. Cuando se haga una petición GET a /api/usuarios, se ejecutará la función obtenerUsuarios del controlador usuariosController.js

router.delete('/:id', eliminarUsuario); //Definimos la ruta para eliminar un usuario. Cuando se haga una petición DELETE a /api/usuarios/:id, se ejecutará la función eliminarUsuario del controlador usuariosController.js
//El :id es un parámetro de ruta que se puede usar para identificar el usuario a eliminar. También podriamos decir que es una variable.
//En Postman, se puede probar enviando una petición DELETE a http://localhost:3000/api/usuarios/1234567890, donde 1234567890 es el id del usuario a eliminar.

router.put("/:id", actualizarUsuario); //Definimos la ruta para actualizar un usuario. Cuando se haga una petición PUT a /api/usuarios/:id, se ejecutará la función actualizarUsuario del controlador usuariosController.js
//El :id es un parámetro de ruta que se puede usar para identificar el usuario a actualizar. También podriamos decir que es una variable.
//En Postman, se puede probar enviando una petición PUT a http://localhost:3000/api/usuarios/1234567890, donde 1234567890 es el id del usuario a actualizar.
//El cuerpo de la petición debe contener los datos a actualizar en formato JSON, por ejemplo: { "nombre": "Nuevo Nombre", "correo": " 

export default router; //Exportamos el enrutador para que pueda ser utilizado en otros archivos, como index.js
//Esto permite que las rutas definidas en este archivo se puedan usar en el servidor principal de la aplicación.
//De esta manera, separamos la lógica de las rutas de la lógica del controlador, lo que facilita el mantenimiento y la escalabilidad de la aplicación.
//El enrutador se encargará de manejar las peticiones relacionadas con los usuarios, como crear un usuario, obtener todos los usuarios, actualizar un usuario, eliminar un usuario, etc.
//En resumen, este archivo define las rutas relacionadas con los usuarios y las asocia con los controladores correspondientes para manejar las peticiones HTTP.
//Esto es parte de la arquitectura MVC (Modelo-Vista-Controlador), donde el enrutador actúa como el controlador de las rutas y la lógica de negocio se maneja en los controladores específicos.
//Esto permite que las rutas sean más organizadas y fáciles de mantener, especialmente en aplicaciones más grandes y complejas.


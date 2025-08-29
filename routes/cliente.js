import express from "express";

import { 
  crearCliente,
  obtenerTodosLosClientes,
  obtenerCliente,
  eliminarCliente,
  actualizarCliente
} from "../controllers/clienteController.js";

const router = express.Router(); //Creamos un enrutador de Express

//verbo
router.get("/", obtenerTodosLosClientes); //Ruta para obtener todos los clientes
router.get("/:id", obtenerCliente); //Ruta para obtener un cliente por su ID
router.post("/", crearCliente); //Ruta para crear un nuevo cliente
//El verbo HTTP POST se utiliza para enviar datos al servidor para crear un nuevo recurso. En este caso, se utiliza para crear un nuevo cliente en la base de datos.
router.delete("/:id", eliminarCliente); //Ruta para eliminar un cliente por su ID
//El verbo HTTP DELETE se utiliza para eliminar un recurso en el servidor. En este caso, se utiliza para eliminar un cliente de la base de datos utilizando su ID.
router.put("/:id", actualizarCliente); //Ruta para actualizar un cliente por su ID
//El verbo HTTP PUT se utiliza para actualizar un recurso existente en el servidor. En este caso, se utiliza para actualizar los datos de un cliente en la base de datos utilizando su ID.

export default router; //Exportamos el enrutador para que pueda ser utilizado en otros archivos, como index.js
//Esto permite que las rutas definidas en este archivo se puedan usar en el servidor principal de la aplicación.
//De esta manera, separamos la lógica de las rutas de la lógica del controlador, lo que facilita el mantenimiento y la escalabilidad de la aplicación.
//El enrutador se encargará de manejar las peticiones relacionadas con los usuarios, como crear un usuario, obtener todos los usuarios, actualizar un usuario, eliminar un usuario, etc.
//En resumen, este archivo define las rutas relacionadas con los usuarios y las asocia con los controladores correspondientes para manejar las peticiones HTTP.
//Esto es parte de la arquitectura MVC (Modelo-Vista-Controlador), donde el enrutador actúa como el controlador de las rutas y la lógica de negocio se maneja en los controladores específicos.
//Esto permite que las rutas sean más organizadas y fáciles de mantener, especialmente en aplicaciones más grandes y complejas.


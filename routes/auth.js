//En index.js se defininen las rutas de la aplicación y se configura el servidor web. La ruta raiz y el controlador que va a manejar esa ruta.
import express from "express";

//En este archivo se definen las rutas relacionadas con la autenticación de usuarios, como el inicio de sesión y la obtención del perfil del usuario.
//Estas rutas se encargan de manejar las peticiones HTTP relacionadas con la autenticación, como el inicio de sesión y la obtención del perfil del usuario.
//Se importan los controladores que manejarán las peticiones a estas rutas.
import { 
  autenticarUsuario,
  perfil
} from "../controllers/authController.js";

//Importamos el middleware de autenticación que verificará si el usuario está autenticado antes de permitir el acceso a ciertas rutas.
//Este middleware se encargará de verificar el token JWT enviado en las cabeceras de la petición y asegurarse de que el usuario esté autenticado antes de permitir el acceso a las rutas protegidas.
import checkAuth from "../middleware/auth.js"; 

const router = express.Router(); //Creamos un enrutador de Express

//verbo
router.post("/login", autenticarUsuario); //Definimos la ruta para autenticar un usuario.
router.get("/perfil", checkAuth, perfil); //Definimos la ruta para obtener el perfil del usuario autenticado. Esta ruta está protegida por el middleware de autenticación.


export default router; //Exportamos el enrutador para que pueda ser utilizado en otros archivos, como index.js
//Esto permite que las rutas definidas en este archivo se puedan usar en el servidor principal de la aplicación.
//De esta manera, separamos la lógica de las rutas de la lógica del controlador, lo que facilita el mantenimiento y la escalabilidad de la aplicación.
//El enrutador se encargará de manejar las peticiones relacionadas con los usuarios, como crear un usuario, obtener todos los usuarios, actualizar un usuario, eliminar un usuario, etc.
//En resumen, este archivo define las rutas relacionadas con los usuarios y las asocia con los controladores correspondientes para manejar las peticiones HTTP.
//Esto es parte de la arquitectura MVC (Modelo-Vista-Controlador), donde el enrutador actúa como el controlador de las rutas y la lógica de negocio se maneja en los controladores específicos.
//Esto permite que las rutas sean más organizadas y fáciles de mantener, especialmente en aplicaciones más grandes y complejas.


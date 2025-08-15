//Vamos a importar nuestra libreria de JWT y el modelo de usuario
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

//Vamos a crear una funcion que verifique si el usuario esta autenticado
const checkAuth = async (req, res, next) => {
  let token = '';

  //Lo que vamos a hacer es verificar que el token este viajando en los headers o cabeceras
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //console.log("Autorizado");
    //console.log(req.headers);

    //Lo que aparece en la consola con las lineas de arriba es un objeto con toda la informacion de las cabeceras, entre ellas authorization. Ahi aparece el token. Lo que se va a hacer es recortar el texto del token para quedarnos solo con el token y no con la palabra Bearer
    
    try {
      //recortar el texto
      token = req.headers.authorization.split(" ")[1];
      console.log(token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET); //Verificamos el token con la clave secreta que tenemos en las variables de entorno

      console.log(decoded); //Mostramos el token decodificado en la consola. Aqui aparece el id del usuario y la fecha de expiracion del token
      
      req.usuario = await Usuario.findById(decoded.id).select("-password"); //Buscamos el usuario por su id y le quitamos el password para que no viaje en la respuesta
      //Esto es para que el usuario que viaja en la peticion sea el usuario que esta autenticado y no cualquier otro usuario
      
      //req.usuario = await Usuario.findById(decoded.id).select("-password -correo");
      //Si quiero quitar otro campo, como el correo, lo puedo hacer de la misma manera. Solo tengo que agregar el campo que quiero quitar en el select.

      console.log(req.usuario); //Mostramos el usuario en la consola

      //Para pasarnos al controlador, tenemos que llamar a next()
      return next(); //Llamamos a next() para que la peticion continue al siguiente
    } catch (error) {
      console.log(error);
      return res.status(403).jason({ msg: "Hubo un error al autenticar" });
    }
  }

  if (!token) {
    res.status(403).json({ msg: "Token no válido o inexistente" });
  }

  next(); //Si no hay token, pasamos al siguiente middleware o controlador
  //Esto es para que la peticion continue al siguiente middleware o controlador, en caso de que no haya token o el token no sea valido.
  //Si no hay token, se devuelve un error 403 (Forbidden) indicando que el token no es válido o inexistente.
  //Si hay token, se verifica si es válido y se obtiene el usuario asociado al token
  //Si el token es válido, se obtiene el usuario asociado al token y se agrega a la petición para que pueda ser utilizado en los siguientes middlewares o controladores.
  //Si el token es válido, se permite el acceso a la ruta solicitada; de lo contrario, se devuelve un error indicando que el usuario no está autenticado.
  //Esto es una práctica común en aplicaciones web para proteger rutas que requieren autenticación, como el acceso a perfiles de usuario, paneles de administración, etc.
  //El middleware se encargará de interceptar las peticiones a estas rutas y verificar la autenticación del usuario antes de permitir el acceso a los controladores correspondientes.
  //Esto permite que las rutas protegidas solo sean accesibles para usuarios autenticados, mejorando la seguridad de la aplicación.
  //Esto es parte de la arquitectura MVC (Modelo-Vista-Controlador), donde el middleware actúa como el controlador de las rutas y la lógica de negocio se maneja en los controladores específicos.
  //Esto permite que las rutas sean más organizadas y fáciles de mantener, especialmente en aplicaciones más grandes y complejas.
  //El middleware se encargará de interceptar las peticiones a estas rutas y verificar la autenticación del usuario antes de permitir el acceso a los controladores correspondientes.
  //Esto permite que las rutas protegidas solo sean accesibles para usuarios autenticados, mejorando la seguridad de la aplicación.
  
};

export default checkAuth;

/*
  console.log("Autorizado");
  console.log(req.headers);

Esta función se encargará de verificar si el usuario está autenticado antes de permitir el acceso a ciertas rutas.
Para ello, se verificará el token JWT enviado en las cabeceras de la petición y se asegurará de que el usuario esté autenticado antes de permitir el acceso a las rutas protegidas.
Si el token es válido, se permitirá el acceso a la ruta solicitada; de lo contrario, se devolverá un error indicando que el usuario no está autenticado.
Esta es una práctica común en aplicaciones web para proteger rutas que requieren autenticación, como el acceso a perfiles de usuario, paneles de administración, etc.
El middleware se encargará de interceptar las peticiones a estas rutas y verificar la autenticación del usuario antes de permitir el acceso a los controladores correspondientes.
Esto permite que las rutas protegidas solo sean accesibles para usuarios autenticados, mejorando la seguridad de la aplicación.
*/
//Los controladores son los intermediarios entre el modelo y la vista. Aqui haremos las consultas a la base de datos y retornaremos los datos necesarios para las vistas. (CRUD)
//En este caso, el controlador de usuarios se encargará de manejar las peticiones relacionadas con los usuarios.

import Usuario from '../models/Usuario.js';

//req es la petición que viene del cliente (frontend), y res es la respuesta que se enviará al cliente (frontend).
//En postman es usar POST
export const crearUsuario = async (req, res) => {
  try {
    const { correo } = req.body; //req.body es un objeto que contiene los datos enviados en el cuerpo de la petición. Y se le hace destructuring para obtener el correo.

    //Verificar si el correo ya existe en la base de datos. findOne es un método de mongoose que busca un documento en la colección.
    const existeCorreo = await Usuario.findOne({ correo });
    //La lineas que siguen no se ejecutan hasta que se resuelva la promesa de findOne. Esot por el await.

    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo ya está registrado" });
    }

    //Si el correo no existe, se crea un nuevo usuario.
    const usuario = new Usuario(req.body); //req.body contiene los datos del usuario que se envían en la petición. Se crea una instancia del modelo Usuario con esos datos.
    
    //En el archivo del modelo Usuario.js, se ejecuta primero la linea 38 (usuarioSchema.pre('save', async function(next)) que es una función para encriptar la contraseña antes de guardar el usuario en la base de datos.
    //Esta función se ejecuta antes de guardar el usuario en la base de datos. Ya se ejecuta la siguiente línea.
    //El middleware pre de mongoose se usa para ejecutar una función antes de guardar un documento en la base de datos. En este caso, se usa para encriptar la contraseña del usuario antes de guardarla en la base de datos.
    
    await usuario.save(); //Se guarda el usuario en la base de datos.
    res.json(usuario); //Se envía el usuario creado como respuesta en formato JSON.

  } catch (error) {
    console.log(error);
    res.statatus(500).send("Error al crear el usuario");
  }
}

//En postman es usar GET
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); //find() sin parámetros devuelve todos los documentos de la colección Usuario.
    
    if(usuarios.length === 0) {
      return res.status(400).send({ msg: "No hay usuarios registrados" });
    }

    res.json(usuarios); //Se envía la lista de usuarios como respuesta en formato JSON.
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor al obtener los usuarios");
  }
}

//En postman es usar DELETE
//Y la URL debe ser http://localhost:4000/api/usuarios/:id(67765drfs545445sf67be7bd7f6)
//El :id es un parámetro de la ruta que se usa para identificar el usuario a eliminar.
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params; //req.params es un objeto que contiene los parámetros de la ruta. En este caso, se obtiene el id del usuario a eliminar.
    const usuario = await Usuario.findById(id); //findById es un método de mongoose que busca un documento por su id.

    if (!usuario) {
      //Not found
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await Usuario.findByIdAndDelete({ _id: id }); //Si el usuario existe, se elimina de la base de datos.

    res.json({ msg: "Usuario eliminado correctamente" }); //Se envía un mensaje de éxito como respuesta.
    //res.json(usuario); //También podríamos enviar el usuario eliminado como respuesta.

    console.log(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor al eliminar el usuario");
  }
}

//En postman es usar PUT
//Y la URL debe ser http://localhost:4000/api/usuarios/:id(67765drfs545445sf67be7bd7f6)
//Solo lo que voy a modificar en el JSON, por ejemplo 
/*
  {
    "nombre": "Nuevo Nombre",
    "apellidos": "Nuevos Apellidos",
  }
*/
export const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, apellidos, correo, password } = req.body; //Desestructuramos los datos del usuario que se envían en el cuerpo de la petición.
    const { id } = req.params; //Obtenemos el id del usuario a actualizar
    const usuarioActualizar = {}; //Creamos un objeto vacío para almacenar los datos a actualizar.

    if (nombre) {
      usuarioActualizar.nombre = nombre; //Si se envió un nombre, lo agregamos al objeto usuarioActualizar.
    }

    //Otra forma de escribir los if:
    if (apellidos) usuarioActualizar.apellidos = apellidos; //Si se envió un apellido, lo agregamos al objeto usuarioActualizar.

    if (correo) usuarioActualizar.correo = correo; //Si se envió un correo, lo agregamos al objeto usuarioActualizar.

    if (password) {
      usuarioActualizar.password = password; //Si se envió una contraseña, lo agregamos al objeto usuarioActualizar.
    }

    console.log(usuarioActualizar); //Mostramos el objeto usuarioActualizar en la consola para verificar los datos a actualizar.

    //Verificar si el usuario existe en la base de datos.
    let usuarioExiste = await Usuario.findById(id); //Buscamos el usuario por su id.

    if (!usuarioExiste) {
      return res.status(404).json({ msg: "Usuario no encontrado" }); //Si no se encuentra el usuario, enviamos un mensaje de error.
    }

    //Si el usuario existe, actualizamos sus datos.
    usuarioExiste = await Usuario.findByIdAndUpdate(
      { _id: id },
      { $set: usuarioActualizar }, //Si escuchamos a MongoDB, el $set es un operador que se usa para actualizar campos específicos de un documento.
      { new: true } //new: true indica que queremos que se nos devuelva el documento actualizado.
    ); //findByIdAndUpdate es un método de mongoose que actualiza un documento por su id. Le pasamos el id del usuario, el objeto con los datos a actualizar y un objeto vacío para usar las opciones por defecto.

    res.json(usuarioExiste); //Enviamos el usuario actualizado como respuesta en formato JSON.  
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor al actualizar el usuario"); //Manejamos cualquier error que ocurra durante el proceso.
  }
}
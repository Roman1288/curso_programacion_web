//Los controladores son los intermediarios entre el modelo y la vista. Aqui haremos las consultas a la base de datos y retornaremos los datos necesarios para las vistas. (CRUD)
//En este caso, el controlador de usuarios se encargará de manejar las peticiones relacionadas con los usuarios.

import Usuario from '../models/Usuario.js';

//req es la petición que viene del cliente (frontend), y res es la respuesta que se enviará al cliente (frontend).
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
    await usuario.save(); //Se guarda el usuario en la base de datos.
    res.json(usuario); //Se envía el usuario creado como respuesta en formato JSON.

  } catch (error) {
    console.log(error);
    res.statatus(500).send("Error al crear el usuario");
  }
}


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
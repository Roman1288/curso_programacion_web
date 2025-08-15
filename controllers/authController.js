//Importamos el generador de JWT desde helpers

import generarJWT from "../helpers/generarJWT.js"; 

//Importamos el modelo de Usuario
import Usuario from "../models/Usuario.js";

//Para crear una autenticación necesitamos un correo y una contraseña válidos
//Si el usuario no existe o la contraseña es incorrecta, se devuelve un error

export const autenticarUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;

    //Validamos que el correo exista
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ msg: "El usuario no existe" });

    //En el caso que si exista, validamos la contraseña
    if (await usuario.comprobarPassword(password)) {
      //Si la contraseña es correcta, vamos a retornar un JWT
      res.json({ token: generarJWT(usuario._id) });      
    } else {
      return res.status(403).json({ msg: "La contraseña es incorrecta" });
    }

  }catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al autenticar al usuario");
  }
};

export const perfil = async (req, res) => {
  try {
    const { usuario } = req; //Obtenemos el usuario del request, que fue agregado por el middleware de autenticación

    //Retornamos el perfil del usuario
    res.json(usuario); //Enviamos el usuario como respuesta, sin la contraseña
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener el perfil del usuario");
  }
};
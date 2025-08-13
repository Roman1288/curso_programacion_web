//Importamos el Json Web Token de la dependencia o libreria jsonwebtoken
import jwt from 'jsonwebtoken';

const generarJWT = id => {
  // Generamos un token con el id del usuario
  // y lo firmamos con una clave secreta
  //La firma es la información que se va a encriptar y que solo el servidor conoce
  //El token se genera con un tiempo de expiración de 30 días

  //El id es el identificador del usuario que se va a autenticar
  //El proceso de firma se realiza con la clave secreta que se encuentra en el archivo .env. Es un medio de seguridad para evitar que otras personas puedan generar tokens válidos.
  //El token se genera con un tiempo de expiración de 30 días
  //Si alguien hackea, por el tiempo de expiración, el token dejará de ser válido después de 30 días
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}

export default generarJWT;
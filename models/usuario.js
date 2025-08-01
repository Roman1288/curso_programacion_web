//Declaración de un modelo y los campos que tendrá en la base de datos.
//Un modelo es una representación de los datos que se guardan en la base de datos.
import mongoose from "mongoose";

//Esquema de usuario. Cuando esta en la base de datos se le conoce como colección.
//El esquema es la estructura de los datos que se guardan en la base de datos.
const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true //Elimina espacios al inicio y al final
  },
  apellidos: {
    type: String,
    required: true,
    trim: true //Elimina espacios al inicio y al final
  },
  correo: {
    type: String,
    required: true,
    unique: true, //No se pueden repetir los correos
    trim: true //Elimina espacios al inicio y al final
  },
  password: {
    type: String,
    required: true,
    trim: true //Elimina espacios al inicio y al final
  },
  token: {
    type: String
  }
},
{
  timestamps: true //Crea los campos createdAt y updatedAt automáticamente
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
//Exportamos el modelo para poder usarlo en otros archivos. El modelo es la representación de los datos en la base de datos.
//El modelo es una clase que nos permite crear, leer, actualizar y eliminar datos de la base de datos.
//El modelo se crea a partir del esquema. El esquema es la estructura de los datos que se guardan en la base de datos.
//El modelo se usa para interactuar con la base de datos. Se usa para crear, leer, actualizar y eliminar datos de la base de datos.
//El modelo se usa para crear instancias de los datos. Las instancias son los objetos que se crean a partir del modelo.
//El modelo se usa para validar los datos antes de guardarlos en la base de datos.

//Diferencia entre export y export default:
//- export: Se usa para exportar múltiples cosas de un archivo. Se usa cuando se quiere exportar varias funciones, variables o clases.
//- export default: Se usa para exportar una sola cosa de un archivo. Se usa cuando se quiere exportar una sola función, variable o clase. Es la forma más común de exportar un modelo en Mongoose.
//En el archivo donde se importa usando export, sería por ejemplo:
//import { connectDB, otraFuncion } from './models/usuario.js';
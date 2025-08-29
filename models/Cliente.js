//Importamos moongose y un Schema
import mongoose, { Schema } from "mongoose";

//Creamos el schema de Cliente
//En telefono se pone string porque es solo informativo, no se hacen operaciones matematicas con el
//En estatus puede tener solo dos valores como verdadero y falso. Pero puede tener más valores, para eso se puede poner un enum, los cuales son valores predefinidos. Normalmente los valores de un enum son cadenas de texto y podemos poner el valor por defecto con default
//El trim elimina los espacios en blanco al inicio y al final
//unique es para que no se repita el valor
//lowercase convierte todo a minusculas
const clienteSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  telefono: {
    type: String,
    trim: true,
    unique: true
  },
  empresa: {
    type: String,
    trim: true,
  },
  industria: {
    type: String
  },
  fuente: {
    type: String,
  },
  estatus: {
    type: String,
    enum: ["lead", "prospecto", "cliente"],
    default: "lead"
  },
  direccion: {
    type: String
  },
  //Relacionar el cliente con un usuario, es decir, el propietario del cliente. Referencias
  propietarioId: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Cliente", clienteSchema);
//export default mongoose.model('Cliente', clienteSchema);
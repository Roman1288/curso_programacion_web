import Cliente from "../models/Cliente.js";

//Crear un nuevo cliente
export const crearCliente = async (req, res) => {
  try {
    const { correo, telefono } = req.body;
    //Validar que el correo no exista ni el telefono
    const existeCorreo = await Cliente.findOne({ correo });
    const existeTelefono = await Cliente.findOne({ telefono });

    if (existeCorreo) return res.status(400).json({ msg: "Ya hay un cliente con este correo registrado." });
    if (existeTelefono) return res.status(400).json({ msg: "Ya hay un cliente con este número de teléfono registrado." });

    //Guardamos cliente
    const cliente = new Cliente(req.body);
    //Obtenemos el objeto completo del usuario propietarioId para saber a quién pertenece el cliente
    cliente.populate("propietarioId");
    //Guardamos en la base de datos
    await cliente.save();
    res.json(cliente); 

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error en el servidor al crear el cliente');
  }
};

export const obtenerTodosLosClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({}).populate("propietarioId");

    //Quiero saber a quien pertenece ese cliente
    if (clientes.length === 0) return res.status(400).json({ msg: "No hay clientes registrados." });
    res.json(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error en el servidor al obtener todos los clientes');
  }
};

export const obtenerCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id).populate("propietarioId");

    //Si no hay ningun cliente con ese id
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor al obtener el cliente");
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);

    //Si no hay ningun cliente con ese id
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

    await Cliente.findByIdAndDelete(id);
    res.json({ msg: "Cliente eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor al eliminar el cliente");
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);

    //Si no hay ningun cliente con ese id
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

    //Campos que tenemos declarados en el modelo
    const camposPermitidos = [
      "nombre",
      "correo",
      "telefono",
      "empresa",
      "industria",
      "fuente",
      "estatus",
      "direccion",
      "propietarioId"
    ];

    //El Object.fromEntries() método transforma una lista de pares clave-valor en un objeto.
    //El Object.entries() método devuelve una matriz de una propiedad enumerable [key, value]
    //Crea o permite que sea iterable el objeto.
    const datosActualizados = Object.fromEntries(
      Object.entries(req.body).filter(
        ([key, value]) => camposPermitidos.includes(key) && value !== undefined
      )
    );

    console.log(datosActualizados);

    //Si lo anterior regresa un objeto vacío, significa que no hay campos válidos para actualizar.
    if (Object.keys(datosActualizados).length === 0) {
      return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar." });
    }

    //Si todo está bien, actualizamos
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      {$set: datosActualizados},
      {new: true} //Para que me regrese el objeto actualizado y no el viejo
    );
    res.json(clienteActualizado);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor al actualizar el cliente");
  }
};
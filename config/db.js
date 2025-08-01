//Aquí hacemos la conexión a la base de datos
import mongoose from "mongoose";

//Asincronismo o promesa es lo mismo, es una petición que puede retornar un valor o un error
//Con export exportamos la función connectDB para que pueda ser usada en otros archivos. Si no tiene export, quiere decir que es una función privada y no puede ser usada en otros archivos.
//Con async hacemos que la función sea asíncrona, es decir, que puede esperar
export const connectDB = async () => {
  
    //Excepciones o manejador de errores
    //try delimita todo lo que se hace si es correcta la conexión, si la conexión es exitosa, regresa una respuesta
    //catch delimita todo lo que se hace si hay un error en la conexión, si el error existe, la aplicación no truena pero nos dice que error hay.
    try{
      //Con await esperamos a que se resuelva la promesa, esperamos a que mongoose.connect me regrese una 
      //respuesta. La URL puede que no exista, hay un error de conexión, se cayó la base de datos, etc.
      //Si no se resuelve la promesa, se lanza un error
      //const { connection } = await mongoose.connect('url');

      //La URL la saque desde Compass, en el cluster esta la opción de copiar el string de conexión (URL)
      //Para hacerlo más seguro, usamos una variable de entorno
      //En el archivo .env agregamos la variable de entorno MONGO_URI y su valor que es la URL de conexión.
      const { connection } = await mongoose.connect(process.env.MONGO_URI);  

      //Si la conexión es exitosa, se imprime en consola el mensaje de conexión
      const url = `${connection.host} ${connection.port}`;
      console.log(`Conectado a la base de datos en: ${url}`);
    } catch (error) {
      console.log(error);
          
      process.exit(1); //Termina el proceso con un código de error 1
    }

  
} 
const fs = require("fs");

/* 
fs.promises.writeFile = Para escribir contenido en un archivo. Si el archivo no existe, lo crea. Si existe, lo sobreescribe.
fs.promises.readFile  = Para obtener el contenido de un archivo.
fs.promises.appendFile = Para añadir contenido a un archivo. ¡No se sobreescribe!
fs.promises.unlink= Es el “delete” de los archivos. eliminará todo el archivo, no sólo el contenido.

*/


const asyncOperation = async () => {
  // Escribir un archivo
  await fs.promises.writeFile("./data/test.txt", "Mensaje 1");

  let message = await fs.promises.readFile("./data/test.txt", "utf-8");
  console.log(message);

  await fs.promises.appendFile("./data/test.txt", " - Mensaje 2");

  message = await fs.promises.readFile("./data/test.txt", "utf-8");
  console.log(message);

  await fs.promises.unlink("./data/test.txt");
}

asyncOperation();
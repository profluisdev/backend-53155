const fs = require("fs"); // Obtenemos el paquete File System al igual que lo hacemos con los import

/* 
Las principales operaciones que podemos hacer con fs síncrono son:
writeFileSync = Para escribir contenido en un archivo. Si el archivo no existe, lo crea. Si existe, lo sobreescribe.
readFileSync = Para obtener el contenido de un archivo.
appendFileSync = Para añadir contenido a un archivo. ¡No se sobreescribe!
unlinkSync = Es el “delete” de los archivos. eliminará todo el archivo, no sólo el contenido.
existsSync = Corrobora que un archivo exista!
*/

// Crear un archivo con un texto
fs.writeFileSync("./data/test.txt", "Este es un texto de prueba");

// Verificamos si existe el archivo
if(fs.existsSync("./data/test.txt")) {
  
    // Leer el archivo
    let message = fs.readFileSync("./data/test.txt", "utf-8") // utf-8 es el tipo de codificación que usamos para leer el archivo
    console.log(`Mensaje: ${message}`);
    
    // Colocar un texto a al final de un archivo, en caso de que el archivo no exista lo creara
    fs.appendFileSync("./data/test.txt", " - Otro mensaje");
    message = fs.readFileSync("./data/test.txt", "utf-8")
    console.log(`Mensaje: ${message}`);

    // Eliminar el archivo 
    fs.unlinkSync("./data/test.txt")
}

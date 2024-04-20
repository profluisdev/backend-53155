const http = require("http");

const server = http.createServer( (request, response) => {
    response.end("Primera respuesta de mi primer servidor Backend !!!")
} )

server.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
})
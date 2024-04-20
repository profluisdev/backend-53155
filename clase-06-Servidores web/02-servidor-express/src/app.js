import express from "express";

// Inicializamos express y la variable app contendrá todas las funcionalidades de express
const app = express();

/* 
urlencoded nos permite que el servidor pueda interpretar mejor los datos complejos que viajen desde la url, 
y mapearlos correctamente en el req.query.
Es importante destacar que siempre tiene que ir por encima de las rutas, ya que es un middleware (ya veremos que es 
más adelante en el curso) que se ejecuta para procesar la información de los endpoints.
*/

app.use(express.urlencoded({ extended: true }));

// Apertura de un "Endpoint", en el cual el cliente va a realizar una petición http, en este caso una petición get
app.get("/saludo", (req, res) => {
  // Respuesta de nuestro servidor al cliente
  res.send("Mi primera respuesta del servidor con express");
});

// Actividad
app.get("/bienvenida", (req, res) => {
  res.send(`<h1 style="color:blue;">¡Bienvenido a mi primer servidor express!</h1>`);
});

app.get("/usuario", (req, res) => {
  res.send({
    nombre: "Juan",
    apellido: "Perez",
    edad: 33,
    correo: "jp@gmail.com",
  });
});

// req.params

// Peticiones GET con un parámetro
app.get("/parametros/:parametro", (req, res) => {
  const param = req.params.parametro;

  res.send(`El parámetro recibido por parte del cliente en el servidor es: ${param}`);
});

// Peticiones GET con dos parámetros
app.get("/parametros/:nombre/:apellido", (req, res) => {
  // Desestructuramos los parámetros
  const { nombre, apellido } = req.params;

  res.send(`Datos ingresados por ${nombre} ${apellido}`);
});

// Actividad 2

const usuarios = [
  { id: 1, nombre: "Miguel", apellido: "Castro", edad: 54 },
  { id: 2, nombre: "Juan", apellido: "Perez", edad: 33 },
  { id: 3, nombre: "Pepe", apellido: "Sapo", edad: 21 },
];

app.get("/usuarios", (req, res) => {
  res.send(usuarios);
});

app.get("/usuarios/:idUsuario", (req, res) => {
  // Obtenemos el parámetro enviado por el cliente
  const { idUsuario } = req.params; // Todos los parámetros que recibimos del lado del cliente siempre son tipo string

  //Buscamos el usuario en el array
  const usuario = usuarios.find((user) => user.id === Number(idUsuario));
  // Utilizamos el método Number() para transformar el parámetro recibido a formato numérico

  // Verificamos si el usuario existe, si no existe retornamos una respuesta con un error
  if (!usuario) return res.send(`Error no se encuentra el usuario con el id ${idUsuario}`);

  // En caso que el usuario exista, devolvemos una respuesta con el usuario indicado
  res.send(usuario);
});

// req.query

app.get("/queries/", (req, res) => {
    // Obtenemos lo que el cliente ingrese por query ej: /queries?nombre=Juan
    // Para más de un dato se concatenan la query con un & ej: /queries?nombre=Juan&apellido=Perez&edad=30
    const consultas = req.query;

    res.send(consultas);
    
})

//  Manejo de query determinadas
app.get("/queries2/", (req, res) => {
    // Desestructuramos solo la información que necesitamos de la query
    const {nombre, apellido} = req.query;

    res.send({nombre, apellido });
    
})

// Actividad 3 
const usuarios2 = [
    { id: 1, nombre: "Miguel", apellido: "Castro", edad: 54, genero: "M" },
    { id: 2, nombre: "Juan", apellido: "Perez", edad: 33, genero: "M" },
    { id: 3, nombre: "Pepe", apellido: "Sapo", edad: 21, genero: "M" },
    { id: 4, nombre: "Maria", apellido: "Diaz", edad: 26, genero: "F" },
    { id: 5, nombre: "Emilia", apellido: "Gomez", edad: 36, genero: "F" },
    { id: 6, nombre: "Julia", apellido: "Lopez", edad: 44, genero: "F" },
  ];

app.get("/usuarios2", (req, res) => {
  // Obtenemos la query enviada por el cliente 
  const { genero } = req.query;
  console.log(genero);
  // Verificamos si el cliente envía la query y si se envía en el formato correcto, sino le retornamos todos los usuarios sin filtrar
  if(!genero || ( genero !== "M" && genero !== "F" )) return res.send(usuarios2)

  // En caso que la query llegue bien respondemos al usuario con los usuarios filtrados
  const usuariosFiltrados = usuarios2.filter(usuario => usuario.genero === genero);
  res.send(usuariosFiltrados);

})

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

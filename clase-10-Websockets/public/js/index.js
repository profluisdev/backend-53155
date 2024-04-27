
const socket = io();

socket.emit("message", "Hola servidor te estoy enviando un mensaje");

socket.on("socket-individual", (data) => {
  console.log(data);
})

socket.on("socket-excluye-actua", (data) => {
  console.log(data);
})

socket.on("socket-todos", (data) => {
  console.log(data);
})
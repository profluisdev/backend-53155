const socket = io();

let user;

let chatBox = document.getElementById("chatBox");

// Alerta  para ingresar los datos
Swal.fire({
  title: "Indentificate",
  input: "text",
  text: "Ingrese el usuario para identificarse en el chat",
  inputValidator: (value) => {
    return !value && "Por favor ingrese un nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("newUser", user);
});

// Recibimos el usuarios conectado y mostramos la notificación a todos los usuarios
socket.on("newUser", (data) => {
  Swal.fire({
    text: `Se conecto ${data}`,
    toast: true,
    position: "top-right",
    timer: 3000,
  });
});

// Enviar mensaje al servidor
chatBox.addEventListener("keyup", (event) => {
  // Verificamos si el usuario aprieta la tecla enter
  if (event.key === "Enter") {
    // verificar que el input tenga al menos 1 carácter
    if (chatBox.value.trim().length > 0) {
      // enviamos el mensaje al servidor
      socket.emit("message", { user: user, message: chatBox.value });
      // limpiamos el input
      chatBox.value = "";
    }
  }
});


// Recibir los mensajes del servidor y mostrar en pantalla
socket.on("messageLog", (data) => {
  let messagesLogs = document.getElementById("messagesLog");
  let messages = "";

  data.forEach(message => {
    messages = messages + `${message.user} dice: ${message.message} </br>`
  });

  messagesLogs.innerHTML = messages;
})
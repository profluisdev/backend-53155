
const temporizador = (callback) => {

  setTimeout( () => {
    callback();
  }, 5000 ); // 5 seg

}

let operation1 = () => {
  console.log("Operación 1");
}

let operation2 = () => {
  console.log("Operación 2");
}

console.log("Inicia el programa"); // Sync

temporizador(operation1); // Async
temporizador(operation2); // Async

console.log("Programa finalizado"); // sync
let contador = () => {
  let counter = 1;

  console.log("Realizando operación"); // Sync

  let timer = setInterval(() => {

    console.log(counter++);  // Async
    if (counter > 5) {
      clearInterval(timer); // Hacemos que se termine el intervalo después de contar 5
    }
  }, 1000);
};

console.log("Inicia el programa"); // Sync

contador();

console.log("Finaliza el programa"); // Sync

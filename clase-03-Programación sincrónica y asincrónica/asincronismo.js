

console.log("Inicio del proceso");

function dos() {
  setTimeout( () => {
    console.log("Dos");
  }, 0)
}

function uno() {
  setTimeout(() => {
    console.log("Uno");
  }, 0)

  dos();

  console.log("Tres");
}

uno();

console.log("Fin del proceso");


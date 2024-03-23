console.log("");
console.log("---------- Promesas ----------");
console.log("");
/* 
Es un objeto especial que nos permitirá encapsular una operación, la cual reaccionará a 
dos posibles situaciones dentro de una promesa:
¿Qué debería hacer si la promesa se cumple?
¿Qué debería hacer si la promesa no se cumple?
Al prometerse algo, es una promesa en estado pendiente (pending), no sabemos cuándo se resolverá esa promesa. 
Sin embargo, cuando llega el momento, se nos notifica si la promesa se cumplió (Fulfilled, también 
lo encontramos como Resolved) o tal vez, a pesar del tiempo, al final nos notifiquen que la promesa 
no pudo cumplirse, se rechazó (Rejected).
*/

const dividir = (dividendo, divisor) => {
  return new Promise((resolve, reject) => {
    if (divisor === 0) {
      reject("No se puede hacer divisiones entre 0");
    } else {
      resolve(dividendo / divisor);
    }
  });
};

dividir(9, 3)
  .then((resp) => console.log(resp)) // Cuando se resuelve la promesa
  .catch((error) => console.log(error)); // Cuando la promesa es rechazada

dividir(3, 0)
  .then((resp) => console.log(resp)) // Cuando se resuelve la promesa
  .catch((error) => console.log(error)); // Cuando la promesa es rechazada


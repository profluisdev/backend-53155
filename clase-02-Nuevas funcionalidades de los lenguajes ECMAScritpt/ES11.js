console.log("");
console.log("---------- ES11 Nullish y Variables privadas en clases ---------- ");
console.log("");

/* 
Operador nullish. Sirve para poder colocar un valor por default a variables que podrían ser nulas o indefinidas, a diferencia del operador ||, éstas filtran “falseys”
Variables privadas dentro de las clases, esto permite que algunas variables no sean accesibles desde el entorno de instancia de una clase y sólo sea utilizada de manera interna.
*/

let variablePrueba = 0;

let variableAsignable = variablePrueba || "Sin valor";
console.log(variableAsignable);

let variableConNullish = variablePrueba ?? "Sin valor";
console.log(variableConNullish);

// Variables privadas en las clases

class Person {

  #fullName; // El # indica que es una variable privada.

  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
    this.#fullName = `${this.name} ${this.lastName}`; 
  }

  getFullName() {
    console.log(this.#fullName);
  }
}

const pedro = new Person("Pedro", "Juarez");

console.log(pedro);

pedro.fullName = "Otro";
console.log(pedro);

pedro.getFullName();






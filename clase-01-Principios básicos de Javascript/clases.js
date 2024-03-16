class Person {
  // El constructor es el método (función) que se ejecuta al instanciar una clase
  constructor(name, lastName, age) {
    /* 
    Los atributos de la clase son variables internas, que se le puede asignar un valor inicial por defecto o 
    asignarle un valor al momento de instanciar una clase, se le antepone la palabra this para determinar que 
    la variable que pertenece a la clase.
    */

    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.active = true;
  }

   toggleActive() {
    // Si está en false lo cambia a true y si está en true lo cambia a false
    this.active = !this.active;
  }

  changeName(name) {
    this.name = name;
  }

}

const person1 = new Person("Juan", "Perez", 33);

console.log(person1);
const person2 = new Person("Pepe", "Sapo", 20);
console.log(person2); // true
person2.toggleActive();

console.log(person2); // false

person1.changeName("Pedro");
console.log(person1);



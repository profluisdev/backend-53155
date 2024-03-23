
console.log("");
console.log("---------- ES8 Objet.entries, Objet.values y Objet.keys ---------- ");
console.log("");

/* 
Async await para mejor control asíncrono, sobre este ahondaremos más en futuras clases.
Object.entries, Object.values, Object.keys para un mejor control interno sobre las propiedades de un objeto.
*/

let person = {
  id: 1,
  first_name: "Luz",
  last_name: "Escalante",
  age: 25,
  gender: "F",
};

// Objet.entries nos devuelve un array con arrays de dos elementos, en la posición 0 está la key y en la posición 1 el value
// console.log(Object.entries(person));

// Objet.keys nos devuelve un array con todas las key del objeto
// console.log(Object.keys(person));
// console.log(Object.keys(person).includes("age"));

// Objet.values nos devuelve un array con todos los values del objeto
console.log(Object.values(person));
console.log(Object.values(person).includes("Luz"));


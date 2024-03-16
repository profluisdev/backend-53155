/* 
Las funciones son bloques de instrucciones que trabajan sobre un scope interno 
(conocido como scope local). Pueden encontrarse en su sintaxis básica o en su 
notación flecha.
*/

// let result;

// function sum(num1, num2) {
//   console.log(num1 + num2);
//   result = num1 + num2;
// };

// sum(3, 6);
// console.log(result);

function sum(num1, num2) {
  return num1 + num2;
}

const result = sum(9, 6);

// console.log(result);

// Funciones con retorno

function showName(name) {
  return name;
}

// showName("Juan");

// console.log(showName("Juan"));
// console.log(showName("Juan"));

// const name = showName() ? showName() : "No tiene nombre";

// console.log(name);

// Funciones flecha

// const showLastName = lastName =>  {

//   return lastName
// };
// const showLastName = lastName => {
//   // Desarrollo de código
//   return lastName
// }
const showLastName = lastName => lastName;

console.log(showLastName("Perez"));



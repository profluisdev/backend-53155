console.log("");
console.log("---------- ES9 Operadores rest y spreed ---------- ");
console.log("");
/* 
Las principales funcionalidades de este release son:
Resolvedores de promesas con .finally(), para atender una promesa, se cumpla o no se cumpla. (Lo veremos más adelante)
Mayor control a los objetos con operadores rest y spread (aplicable también a arrays)
*/

// Operador spreed
let objet1 = {
  prop1: 1,
  prop2: 2,
};

console.log(objet1);

let objet2 = {
  ...objet1,
};

console.log(objet2);

let objet3 = {
  ...objet1,
  prop3: 3,
};

console.log(objet3);

let objet4 = {
  ...objet3,
  prop2: 5
}

console.log(objet4);

// Operador rest
console.log("------------ operador rest ------------");
let { prop2, ...otros  } = objet4;
console.log(otros);

const user = {
  name: "Juan",
  email: "juan@gmail.com",
  password: "1234"
}

const {password, ...userInfo } = user;
// const {password, name, ...userInfo } = user;
console.log(userInfo);

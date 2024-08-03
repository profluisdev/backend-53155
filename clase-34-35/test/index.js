// const suma = (...nums) => {
//   if(nums.length === 0) return 0

//   let validInput = true;

//   for(let i = 0; i < nums.length; i++) {
//     if(typeof nums[i] !== "number") {
//       validInput = false;
//     }
//   }
//   if(!validInput) return null;

//   let result = 0;

//   for(let i = 0; i < nums.length; i++) {
//     result += nums[i];
//   }

//   return result;

// };

// Refactorización

const suma = (...nums) => {
  if (nums.length === 0) return 0;

  if (!nums.every((num) => typeof num === "number")) return null;

  return nums.reduce((acc, num) => acc + num, 0);
};

let testsPasados = 0;

// 1 - La función suma debe devolver un null si algún parámetro no es un número
console.log("Test 1: La función suma debe devolver un null si algún parámetro no es un número");
let resultTest1 = suma("30", 3);

if (resultTest1 === null) {
  console.log("Test 1 pasado");
  testsPasados++;
} else {
  console.log(`Test 1 fallado, se recibió: ${resultTest1}, se esperaba: null`);
}

// 2 - La función suma debe devolver 0 si no se le pasa ningún parámetro
console.log("Test 2: La función suma debe devolver 0 si no se le pasa ningún parámetro");
let resultTest2 = suma();

if (resultTest2 === 0) {
  console.log("Test 2 pasado");
  testsPasados++;
} else {
  console.log(`Test 2 fallado, se recibió: ${resultTest2}, se esperaba: 0`);
}

// 3 - La función suma debe poder sumar dos números correctamente
console.log("Test 3: La función suma debe poder sumar dos números correctamente");

let resultTest3 = suma(10, 5);

if (resultTest3 === 15) {
  console.log("Test 3 pasado");
  testsPasados++;
} else {
  console.log(`Test 3 fallado, se recibió: ${resultTest3}, se esperaba: 15`);
}

// 4 - La función suma debe poder sumar debe poder hacer la suma de varios números
console.log("Test 4: La función suma debe poder sumar debe poder hacer la suma de varios números");

let resultTest4 = suma(10, 5, 2, 5);

if (resultTest4 === 22) {
  console.log("Test 4 pasado");
  testsPasados++;
} else {
  console.log(`Test 4 fallado, se recibió: ${resultTest4}, se esperaba: 22`);
}

console.log("");
// Verificamos si pasaron todos los test
if (testsPasados === 4) {
  console.log("Todos los test pasaron");
} else {
  console.log(`Tests pasado ${testsPasados} de 4`);
}

console.log("");
console.log("Find de los test");


// var, let y const y problemas de scope

function testVar() {
  var name = "Juan";

  if(true) {
    var name = "Pedro";
  }

  console.log(`El valor de var es: ${name}`);
}


// testVar();

function testLet() {
  let name = "Juan";
  
  if(true) {
    let name = "Pedro";
    console.log(`El scope del if es ${name}`);
  }

  console.log(`El valor de let es : ${name}`);
}

// testLet();

function testConst() {
  const name = "Juan";
  
  if(true) {
    const name = "Pedro";
    console.log(`El scope del if es ${name}`);
  }

  console.log(`El valor de const es : ${name}`);
}

// testConst();


// const lastName = "Perez";
// lastName = "Diaz";

// console.log(lastName);

const person = {
  name: "Juan",
  lastName: "Perez"
};


console.log(person);

// Mutación 
person.name = "Pedro";
person.age = 33;

console.log(person);

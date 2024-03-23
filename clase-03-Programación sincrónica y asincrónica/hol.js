
const suma = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a + b === 0) {
      reject("Operación innecesaria");
    } else if (a + b < 0) {
      reject("La calculadora solo debe devolver números positivos");
    } else {
      resolve(a + b);
    }
  });
};

const resta = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a - b === 0) {
      reject("Operación inválida");
    } else if (a - b < 0) {
      reject("La calculadora solo debe devolver números positivos");
    } else {
      resolve(a - b);
    }
  });
};

const multiplicacion = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) {
      reject("Solo se admiten números positivos");
    } else if (a * b < 0) {
      reject("La calculadora solo debe devolver números positivos");
    } else {
      resolve(a * b);
    }
  });
};

const division = (dividendo, divisor) => {
  return new Promise((resolve, reject) => {
    if (divisor === 0) {
      reject("No se puede hacer divisiones entre 0");
    } else {
      resolve(dividendo / divisor);
    }
  });
};

const calculo = async (operacion, a, b) => {
  try {
    if(operacion === "suma") {
      let resultadoSuma = await suma(a, b);
      console.log(`El resultado de la suma es: ${resultadoSuma}`);
    }
    
    if(operacion === "resta") {
      let resultadoResta = await resta(a, b);
      console.log(`El resultado de la resta es: ${resultadoResta}`);
    }

    if(operacion === "multiplicacion") {
      let resultadoMultiplicacion = await multiplicacion(a, b);
      console.log(`El resultado de la multiplicacion es: ${resultadoMultiplicacion}`);
    }
    
    if(operacion === "division") {
      let resultadoDivision = await division(a, b);
      console.log(`El resultado de la division es: ${resultadoDivision}`);
    }

  } catch(error) {
    console.log(`Erro: ${error}`);
  }

}

calculo("suma", 5, 5);
calculo("resta", 5, 5);
calculo("multiplicacion", 5, 5);
calculo("division", 5, 5);
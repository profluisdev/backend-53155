import { request, response } from "express";
import joi from "joi";

export const checkLogin = async (req = request, res = response, next) => {
  try {

    const schema = joi.object({
      email: joi.string().email().required().messages({
        "string.email": "Tiene que ser un email",
        "any.required": "El email es obligatorio"
      }),
      password: joi.string().min(3).required().messages({
        "string.min": "Tiene que tener al menos 3 caracteres",
        "any.required": "El password es obligatorio"
      })
    }) 

    const { error } = schema.validate(req.body)
    if( error ) {
      return res.status(400).json({error: error.details[0].message})
    }

    next();
    
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
}

// https://joi.dev/

/* 
any.required: El campo es obligatorio y no se proporcionó ningún valor.

string.base: Indica que el valor no es una cadena de texto.

string.empty: El valor proporcionado es una cadena vacía cuando no se permite.

string.min: El valor proporcionado es menor que el mínimo permitido en longitud de caracteres.

string.max: El valor proporcionado excede el máximo permitido en longitud de caracteres.

any.required: El campo es obligatorio y no se proporcionó ningún valor.

number.base: Indica que el valor no es un número.

number.integer: El valor proporcionado no es un número entero.

number.min: El valor proporcionado es menor que el mínimo permitido.

number.max: El valor proporcionado es mayor que el máximo permitido.

string.email: El valor proporcionado no es un correo electrónico válido.

string.pattern.base: El valor no coincide con el patrón especificado.

date.base: El valor proporcionado no es una fecha válida.

date.format: El valor proporcionado no coincide con el formato de fecha esperado.

array.base: Indica que el valor no es un arreglo.

array.min: El arreglo proporcionado tiene menos elementos que el mínimo permitido.

array.max: El arreglo proporcionado tiene más elementos que el máximo permitido.

boolean.base: Indica que el valor no es un booleano.

boolean.truthy: El valor booleano es requerido pero no se proporcionó un valor verdadero (true).

boolean.falsy: El valor booleano es requerido pero no se proporcionó un valor falso (false).

alternatives.base: Ninguna de las alternativas especificadas coincidió.
*/
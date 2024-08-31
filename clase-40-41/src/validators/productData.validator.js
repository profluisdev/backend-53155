import { body, validationResult } from "express-validator";

export const productDataValidator = [
  body("title")
    .isString()
    .withMessage("El título tiene que ser un texto")
    .isEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("Tiene que tener al menos 3 caracteres"),
  body("description")
    .isString()
    .withMessage("La descripción tiene que ser un texto")
    .isEmpty()
    .withMessage("La descripción es obligatorio")
    .isLength({ min: 3 })
    .withMessage("Tiene que tener al menos 3 caracteres"),
  body("thumbnail").isArray().withMessage("Tiene que ser un array"),
  body("code")
    .isString()
    .withMessage("El título tiene que ser un texto")
    .isEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("Tiene que tener al menos 3 caracteres"),
  body("stock")
    .isNumeric()
    .withMessage("Tiene que ser un número")
    .isLength({min: 1})
    .withMessage("Tiene que tener al menos un carácter")
    .isEmpty()
    .withMessage("El stock es obligatorio"),
  body("status")
    .isBoolean(),
  body("price")
    .isNumeric()
    .withMessage("Tiene que ser un número")
    .isLength({min: 1})
    .withMessage("Tiene que tener al menos un carácter")
    .isEmpty()
    .withMessage("El precio es obligatorio"),
  body("category")
    .isString()
    .withMessage("La categoría tiene que ser un texto")
    .isEmpty()
    .withMessage("La categoría es obligatorio")
    .isLength({ min: 3 })
    .withMessage("Tiene que tener al menos 3 caracteres"),
    (req, res, next) => {
      const errors = validationResult(req); // Validamos lo que recibimos por request
      // Verificar si hay algún error
      if (!errors.isEmpty()) {
        // formateamos la respuesta de errores
        const formatErrors = errors.array().map( e => {
          return { msg: e.msg, data: e.path }
        } )
  
        // si error no viene vacío
        return res.status(400).json({ status: "error", errors: formatErrors });
      }
  
      // Si no hay errores continuamos
      next();
    },
];

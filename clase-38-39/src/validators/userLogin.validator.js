import { body, validationResult } from "express-validator";

export const userLoginValidator = [
  body("email")
  .isEmail().withMessage("El correo debe ser un email válido")
  .notEmpty().withMessage("El correo es obligatorio"),
  body("password")
  .notEmpty().withMessage("La contraseña es obligatoria"),
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

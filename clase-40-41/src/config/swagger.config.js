
import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../dirname.js"

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de API E-commerce",
            version: "1.0.1",
            description: "API E-commerce"
        },
    },
    apis:[`${__dirname}/src/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions);
import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  // Esta función inicializa las estrategias que configuremos
  // Para passport solo existen estas dos propiedades que puede recibir username y password
  passport.use(
    "register", 
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
       /* 
      "register" es el nombre de la estrategia que estamos creando.
      passReqToCallback: true, nos permite acceder a la request en la función de autenticación.
      usernameField: "email", nos permite definir el campo que usaremos como username de passport.
      done es una función que debemos llamar cuando terminamos de procesar la autenticación.
      Nota: passport recibe dos datos el username y el password, en caso de que no tengamos un campo username en nuestro formulario, podemos usar usernameField para definir el campo que usaremos como username.
      */
      async (req, username, password, done) => {
        try {

          const { first_name, last_name, email, age } = req.body;
          const user = await userDao.getByEmail(username);
          if(user) return done(null, false, { message: "El usuario ya existe"});

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
          }

          const createUser = await userDao.create(newUser);
          return done(null, createUser);
          
        } catch (error) {
          return done(error)
        }
      }
    ));

  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {

      try {

        const user = await userDao.getByEmail(username);
        if(!user || !isValidPassword(user, password)) return done(null, false, { message: "email o password inválidos" });

        // Si están bien los datos del usuario 
        return done(null, user);
        
      } catch (error) {
        done(error)
      }
      
    })
  )

  // Serialización y deserialización de usuarios
 /* 
  La serialización y deserialización de usuarios es un proceso que nos permite almacenar y recuperar información del usuario en la sesión.
  La serialización es el proceso de convertir un objeto de usuario en un identificador único.
  La deserialización es el proceso de recuperar un objeto de usuario a partir de un identificador único.
  Los datos del user se almacenan en la sesión y se recuperan en cada petición.
  */

  passport.serializeUser( (user, done) => {
        done(null, user._id)
  } );

  passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id);
    done(null, user);
  })

};

export default initializePassport;

import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import envs from "./config/env.config.js";
import cors from "cors";


connectMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(envs.CODE_SECRET));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: envs.MONGO_URL,
      ttl: 15,
    }),
    secret: envs.CODE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport();
app.use(cors());

app.use("/api", router);

app.listen(envs.PORT, () => {
  console.log(`Escuchando el servidor en el puerto ${envs.PORT}`);
});

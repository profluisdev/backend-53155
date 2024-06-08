import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import viewRoutes from "./routes/views.routes.js";
import session from "express-session";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(session({
  secret: "secretCoder",
  resave: true,
  saveUninitialized: true
}))

app.use("/", viewRoutes);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

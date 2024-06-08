import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import viewRoutes from "./routes/views.routes.js";
import cookieParser from "cookie-parser";


const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(cookieParser("ClaveSecreta"));


app.use("/", viewRoutes);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

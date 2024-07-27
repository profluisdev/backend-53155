import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import viewRoutes from "./routes/views.routes.js";
import compression from "express-compression";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use("/", viewRoutes);

app.get("/string", (req, res) => {
  let string = "Texto ridiculamente largo";

  for (let i = 0; i < 5e4; i++) {
    string += "Texto ridiculamente largo";
  }

  res.send(string);
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

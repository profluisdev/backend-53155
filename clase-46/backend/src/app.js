import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/payments", paymentRoutes);

app.listen(8080, () => {
  console.log("Server on port 8080");
});

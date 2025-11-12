import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import coursesRoutes from "./routes/courses";
import paymentRoutes from "./routes/payment";
import servicesRoutes from "./routes/services";

const app = express();

dotenv.config();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use("/payment", paymentRoutes);
app.use("/services", servicesRoutes);
app.use("/courses", coursesRoutes);
app.get("/", (_, res) => {
  res.send("✅ Testing Railway");
});

export default app;

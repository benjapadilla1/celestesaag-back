import cors from "cors";
import express from "express";
import morgan from "morgan";
import coursesRoutes from "./routes/courses";
import paymentRoutes from "./routes/payment";
import servicesRoutes from "./routes/services";

const app = express();

// Add startup logging
console.log("🚀 Starting application...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", process.env.PORT);
console.log("Firebase key present:", !!process.env.FIREBASE_ADMIN_KEY);

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use("/payment", paymentRoutes);
app.use("/services", servicesRoutes);
app.use("/courses", coursesRoutes);

// Health check endpoints
app.get("/", (_, res) => {
  res.send("✅ Testing Railway");
});

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
);

export default app;

import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

// Add startup logging
console.log("🚀 Starting minimal application...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", process.env.PORT);
console.log("Firebase key present:", !!process.env.FIREBASE_ADMIN_KEY);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Basic routes that don't depend on Firebase
app.get("/", (_, res) => {
  res.json({
    message: "✅ Backend is running on Railway",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    firebase: !!process.env.FIREBASE_ADMIN_KEY,
  });
});

// Test endpoint
app.get("/test", (_, res) => {
  res.json({ message: "Test endpoint working" });
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
    res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
);

export default app;

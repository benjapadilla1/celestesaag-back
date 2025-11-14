import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

// Add startup logging
console.log("🚀 Starting full application...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", process.env.PORT);
console.log("Firebase key present:", !!process.env.FIREBASE_ADMIN_KEY);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Safe route imports - wrap in try-catch to prevent startup crashes
let routesLoaded = false;
try {
  const coursesRoutes = require("./routes/courses").default;
  const paymentRoutes = require("./routes/payment").default;
  const servicesRoutes = require("./routes/services").default;

  app.use("/payment", paymentRoutes);
  app.use("/services", servicesRoutes);
  app.use("/courses", coursesRoutes);

  routesLoaded = true;
  console.log("✅ All routes loaded successfully");
} catch (error) {
  console.error("❌ Error loading routes:", error);
  console.warn("⚠️ App will continue with basic routes only");
}

// Basic routes that always work
app.get("/", (_, res) => {
  res.json({
    message: "✅ Backend is running on Railway",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    routesLoaded,
    firebase: !!process.env.FIREBASE_ADMIN_KEY,
  });
});

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    firebase: !!process.env.FIREBASE_ADMIN_KEY,
    routesLoaded,
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

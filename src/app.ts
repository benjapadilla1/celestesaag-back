import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

// Add startup logging
console.log("🚀 Starting application...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", process.env.PORT);
console.log("Firebase key present:", !!process.env.FIREBASE_ADMIN_KEY);

// Configure CORS for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://celestesaag.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.path} - Headers:`, {
    host: req.headers.host,
    "x-forwarded-proto": req.headers["x-forwarded-proto"],
    "user-agent": req.headers["user-agent"],
  });
  next();
});

// Add health check BEFORE any other middleware that might fail
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    firebase: !!process.env.FIREBASE_ADMIN_KEY,
    environment: process.env.NODE_ENV || "development",
    routesLoaded: typeof routesLoaded !== "undefined" ? routesLoaded : false,
  });
});

// Root endpoint
app.get("/", (_, res) => {
  res.json({
    message: "✅ Backend is running on Railway",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Simple test endpoints for debugging
app.get("/test", (_, res) => {
  res.json({
    message: "Test endpoint working",
    timestamp: new Date().toISOString(),
  });
});

app.get("/debug", (_, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    host: process.env.HOST,
    firebase: !!process.env.FIREBASE_ADMIN_KEY,
    uptime: process.uptime(),
    nodeVersion: process.version,
    platform: process.platform,
  });
});

// Security headers for HTTPS - disabled temporarily for debugging
// app.use((req, res, next) => {
//   // Force HTTPS in production
//   if (
//     process.env.NODE_ENV === "production" &&
//     req.header("x-forwarded-proto") !== "https"
//   ) {
//     res.redirect(`https://${req.header("host")}${req.url}`);
//   } else {
//     next();
//   }
// });

// Load routes immediately but with error handling
let routesLoaded = false;
try {
  console.log("Loading routes...");
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

  // Add fallback routes for error cases
  app.get("/courses", (req, res) => {
    res.status(503).json({
      error: "Service temporarily unavailable",
      message: "Routes are loading, please try again in a moment",
    });
  });

  app.get("/services", (req, res) => {
    res.status(503).json({
      error: "Service temporarily unavailable",
      message: "Routes are loading, please try again in a moment",
    });
  });

  app.use("/payment", (req, res) => {
    res.status(503).json({
      error: "Service temporarily unavailable",
      message: "Routes are loading, please try again in a moment",
    });
  });
}

// 404 handler for undefined routes
app.use((req, res) => {
  console.warn(`⚠️ 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} does not exist`,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware - MUST be last
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("❌ Unhandled error:", {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });

    // Don't expose internal errors in production
    res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : err.message,
      timestamp: new Date().toISOString(),
    });
  }
);

export default app;

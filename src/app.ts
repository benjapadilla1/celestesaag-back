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

// Add health check BEFORE any other middleware that might fail
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    firebase: !!process.env.FIREBASE_ADMIN_KEY,
    environment: process.env.NODE_ENV || "development",
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

// Security headers for HTTPS
app.use((req, res, next) => {
  // Force HTTPS in production
  if (
    process.env.NODE_ENV === "production" &&
    req.header("x-forwarded-proto") !== "https"
  ) {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});

// Load routes asynchronously to prevent blocking app startup
setTimeout(() => {
  try {
    console.log("Loading routes...");
    const coursesRoutes = require("./routes/courses").default;
    const paymentRoutes = require("./routes/payment").default;
    const servicesRoutes = require("./routes/services").default;

    app.use("/payment", paymentRoutes);
    app.use("/services", servicesRoutes);
    app.use("/courses", coursesRoutes);

    console.log("✅ All routes loaded successfully");
  } catch (error) {
    console.error("❌ Error loading routes:", error);
    console.warn("⚠️ App will continue with basic routes only");
  }
}, 100);

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

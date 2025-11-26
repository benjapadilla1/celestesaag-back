import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

// Add startup logging
console.log("🚀 Starting application...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", process.env.PORT);
console.log("Firebase key present:", !!process.env.FIREBASE_ADMIN_KEY);

// Configure CORS for production - allow multiple origins
export const allowedOrigins = [
  "https://celestesaag.vercel.app",
  "https://www.celestesaag.com",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean); // Remove undefined values

console.log("🔐 CORS allowed origins:", allowedOrigins);

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      console.log("✅ Request with no origin - allowing");
      return callback(null, true);
    }

    console.log(`🔍 Checking origin: ${origin}`);

    if (allowedOrigins.includes(origin)) {
      console.log(`✅ Origin allowed: ${origin}`);
      callback(null, true);
    } else {
      console.warn(`⚠️ Origin not in whitelist: ${origin}`);
      // Allow it anyway but log the warning
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicit CORS headers middleware as fallback
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else if (!origin) {
      res.setHeader("Access-Control-Allow-Origin", "*");
    } else {
      // Allow anyway but log
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept, Origin"
    );
    res.setHeader("Access-Control-Max-Age", "86400");

    // Handle preflight
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }

    next();
  }
);

app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" })); // Add size limit
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request timeout and logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();

  // Set timeout for requests (30 seconds)
  req.setTimeout(30000);
  res.setTimeout(30000);

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `\u2713 ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
  });

  next();
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`🌐 Incoming: ${req.method} ${req.path}`, {
    origin: req.headers.origin || "no-origin",
    host: req.headers.host,
    referer: req.headers.referer,
    userAgent: req.headers["user-agent"]?.substring(0, 50),
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

  app.get("/turns/:userId", (req, res) => {
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
app.use((req, res, next) => {
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
      headers: req.headers,
    });

    // Prevent sending headers twice
    if (res.headersSent) {
      return next(err);
    }

    // Ensure CORS headers are set even on error
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Send error response
    res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong. Please try again later."
          : err.message,
      timestamp: new Date().toISOString(),
    });
  }
);

export default app;

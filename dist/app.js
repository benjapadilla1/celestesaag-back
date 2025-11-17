"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// Add startup logging
console.log("🚀 Starting application...");
console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", process.env.PORT);
console.log("Firebase key present:", !!process.env.FIREBASE_ADMIN_KEY);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// Safely load routes with error handling
try {
    console.log("Loading routes...");
    const coursesRoutes = require("./routes/courses").default;
    const paymentRoutes = require("./routes/payment").default;
    const servicesRoutes = require("./routes/services").default;
    app.use("/payment", paymentRoutes);
    app.use("/services", servicesRoutes);
    app.use("/courses", coursesRoutes);
    console.log("✅ All routes loaded successfully");
}
catch (error) {
    console.error("❌ Error loading routes:", error);
    console.warn("⚠️ App will continue with basic routes only");
}
// Health check endpoints
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
        environment: process.env.NODE_ENV || "development",
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});
exports.default = app;

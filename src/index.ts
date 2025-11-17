import "dotenv/config";
import app from "./app";

// Railway provides PORT automatically, fallback to 5000 for local dev
const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0"; // Always bind to 0.0.0.0 for Railway

console.log("🔧 Starting server...");

const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on ${HOST}:${PORT}`);
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  console.log(
    `🌐 Health check: ${protocol}://celestesaag-production.up.railway.app/health`
  );
  console.log("🚀 Server is ready to accept connections");
});

// Handle server errors
server.on("error", (error: any) => {
  console.error("❌ Server error:", error);
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  // Give time to log before exiting
  setTimeout(() => process.exit(1), 1000);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("📤 SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("🔄 Process terminated");
    process.exit(0);
  });
});

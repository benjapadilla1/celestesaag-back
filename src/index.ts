import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || "0.0.0.0";

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
server.on('error', (error: any) => {
  console.error('❌ Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📤 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('🔄 Process terminated');
  });
});

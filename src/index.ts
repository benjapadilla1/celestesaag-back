import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || "0.0.0.0";

console.log("🔧 Starting server...");

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on ${HOST}:${PORT}`);
  console.log(`🌐 Health check: http://${HOST}:${PORT}/health`);
});

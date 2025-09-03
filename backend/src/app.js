import express from "express";
import cors from "cors";
// import upload from "./config/multer.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";
import { config } from "./config/config.js";
import { initDatabase } from "./config/database.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Ensure uploads directory exists (public/schoolImages)
const publicDir = path.join(__dirname, "public");
const imagesDir = path.join(publicDir, "schoolImages");

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Static serving for images - serve from public directory
app.use(express.static(publicDir));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Database health check endpoint
app.get("/health/db", async (req, res) => {
  try {
    const { initDatabase } = await import("./config/database.js");
    const conn = await initDatabase();
    await conn.execute("SELECT 1 as test");
    await conn.end();
    res.json({ status: "OK", message: "Database connection successful" });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Routes
app.use("/", routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      message: "File too large. Maximum size allowed is 5MB.",
    });
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      message: "Unexpected field name for file upload.",
    });
  }

  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    console.log("Database initialized successfully");

    // Start server only in development (not on Vercel)
    if (process.env.NODE_ENV !== "production") {
      app.listen(config.port, () => {
        console.log(`Server is running on http://localhost:${config.port}`);
      });
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
};

// Start database initialization
startServer();

// Export app for Vercel
export default app;

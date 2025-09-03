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
app.use(express.json());

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

// Routes
app.use("/", routes);

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

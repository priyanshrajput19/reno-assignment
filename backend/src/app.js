import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import routes from "./routes/routes.js";
import { config } from "./config/config.js";
import { initDatabase } from "./config/database.js";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files only in local development
if (!config.isVercel) {
  const publicDir = path.join(process.cwd(), "src", "public");
  const imagesDir = path.join(publicDir, "schoolImages");

  // Ensure directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Serve static files from public directory
  app.use(express.static(publicDir));
  console.log("Static file serving enabled for local development");
}

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

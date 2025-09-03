import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "school_database",
  },
  // Environment detection
  isProduction: process.env.NODE_ENV === "production",
  isVercel: process.env.VERCEL === "1",
};

import mysql from "mysql2/promise";
import { config } from "./config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initDatabase = async () => {
  try {
    const { host, user, password, database } = config.db;

    console.log("Database config:", {
      host,
      user,
      database,
      password: password ? "***" : "empty",
    });

    // 1) Connect without DB
    console.log("Connecting to MySQL server...");
    const connect = await mysql.createConnection({ host, user, password });
    console.log("MySQL server connected successfully");

    // 2) Create DB if missing
    console.log(`Creating database '${database}' if it doesn't exist...`);
    await connect.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connect.end();
    console.log("Database created/verified successfully");

    // 3) Connect to that DB
    console.log(`Connecting to database '${database}'...`);
    const conn = await mysql.createConnection({ host, user, password, database });
    console.log("Database connection established successfully");

    // 4) Create tables from schema
    console.log("Creating tables from schema...");
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSQL = fs.readFileSync(schemaPath, "utf-8");
    await conn.execute(schemaSQL);
    console.log("Tables created/verified successfully");

    return conn;
  } catch (error) {
    console.error("=== DATABASE INITIALIZATION ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error stack:", error.stack);
    throw error;
  }
};

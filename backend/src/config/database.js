import mysql from "mysql2/promise";
import { config } from "./config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initDatabase = async () => {
  const { host, user, password, database } = config.db;

  // 1) Connect without DB
  const connect = await mysql.createConnection({ host, user, password });
  console.log("server connected successfully");

  // 2) Create DB if missing
  await connect.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  await connect.end();
  console.log("database created successfully");

  // 3) Connect to that DB
  const conn = await mysql.createConnection({ host, user, password, database });
  console.log("database connected successfully");

  // 4) Create tables from schema
  const schemaPath = path.join(__dirname, "schema.sql");
  const schemaSQL = fs.readFileSync(schemaPath, "utf-8");
  await conn.execute(schemaSQL);
  console.log("tables created successfully");

  return conn;
};

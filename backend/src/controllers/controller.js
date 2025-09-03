import path from "path";
import { initDatabase } from "../config/database.js";

export const addSchool = async (req, res) => {
  console.log("=== ADD SCHOOL REQUEST ===");
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  const { name, address, city, state, contact, email_id } = req.body;

  // Validate required fields
  if (!name || !address || !city || !state || !contact || !email_id) {
    console.log("Missing required fields:", { name, address, city, state, contact, email_id });
    return res.status(400).json({ message: "Missing required fields" });
  }

  let conn;
  try {
    console.log("Initializing database connection...");
    conn = await initDatabase();
    console.log("Database connection established");

    // Handle image path
    const imageRelativePath = req.file ? `schoolImages/${req.file.filename}` : "";
    console.log("Image relative path:", imageRelativePath);
    console.log(
      "File details:",
      req.file
        ? {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
          }
        : "No file uploaded"
    );

    const values = [name, address, city, state, contact, imageRelativePath, email_id];
    console.log("Values array for insert:", values);

    console.log("Executing INSERT query...");
    const [result] = await conn.execute("INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)", values);
    console.log("Insert result:", result);

    const newSchool = {
      id: result.insertId,
      name,
      address,
      city,
      state,
      contact,
      image: imageRelativePath,
      email_id,
    };

    console.log("School created successfully:", newSchool);
    res.status(200).json(newSchool);
  } catch (error) {
    console.error("=== ERROR ADDING SCHOOL ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error stack:", error.stack);

    // Return more detailed error in development
    const errorMessage = process.env.NODE_ENV === "development" ? `Failed to add school: ${error.message}` : "Failed to add school";

    res.status(500).json({
      message: errorMessage,
      ...(process.env.NODE_ENV === "development" && {
        error: error.message,
        code: error.code,
      }),
    });
  } finally {
    // Ensure connection is closed
    if (conn) {
      try {
        await conn.end();
        console.log("Database connection closed");
      } catch (closeError) {
        console.error("Error closing database connection:", closeError);
      }
    }
  }
};

export const getSchools = async (req, res) => {
  try {
    const conn = await initDatabase();
    const [rows] = await conn.execute("SELECT * FROM schools ORDER BY created_at DESC");
    await conn.end();
    res.json(rows);
  } catch (error) {
    console.error("Error getting schools:", error);
    res.status(500).json({ message: "Failed to get schools" });
  }
};

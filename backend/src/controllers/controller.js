import path from "path";
import { initDatabase } from "../config/database.js";

export const addSchool = async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const conn = await initDatabase();

    // Debug logging

    const imageRelativePath = req.file ? path.join("schoolImages", req.file.filename) : "";
    console.log("imageRelativePath:", imageRelativePath);

    const values = [name, address, city, state, contact, imageRelativePath, email_id];
    console.log("values array:", values);

    const [result] = await conn.execute("INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)", values);

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

    await conn.end();
    res.status(200).json(newSchool);
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ message: "Failed to add school" });
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

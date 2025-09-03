import path from "path";
import fs from "fs";
import { initDatabase } from "../config/database.js";
import { config } from "../config/config.js";

export const addSchool = async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  if (!name || !address || !city || !state || !contact || !email_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const conn = await initDatabase();

    let imageUrl = "";

    // Handle file upload based on environment
    if (req.file) {
      if (config.isVercel) {
        // Use Base64 for production/Vercel
        const base64String = req.file.buffer.toString("base64");
        imageUrl = `data:${req.file.mimetype};base64,${base64String}`;
        console.log("Image stored as Base64 data URL for production");
      } else {
        // Use local file storage for development
        const publicDir = path.join(process.cwd(), "src", "public");
        const imagesDir = path.join(publicDir, "schoolImages");

        // Ensure directory exists
        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir, { recursive: true });
        }

        // Generate unique filename
        const fileExtension = path.extname(req.file.originalname);
        const fileName = `school-${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
        const filePath = path.join(imagesDir, fileName);

        // Save file locally
        fs.writeFileSync(filePath, req.file.buffer);

        // Create relative path for local development
        imageUrl = `schoolImages/${fileName}`;
        console.log("Image saved locally:", imageUrl);
      }
    }

    const values = [name, address, city, state, contact, imageUrl, email_id];
    console.log("values array:", values);

    const [result] = await conn.execute("INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)", values);

    const newSchool = {
      id: result.insertId,
      name,
      address,
      city,
      state,
      contact,
      image: imageUrl,
      email_id,
    };

    await conn.end();
    res.status(200).json(newSchool);
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ message: "Failed to add school", error: error.message });
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

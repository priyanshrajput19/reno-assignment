import express from "express";
import multer from "multer";
import { addSchool, getSchools } from "../controllers/controller.js";
import upload from "../config/multer.js";

const router = express.Router();

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
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
  }
  if (err.message === "Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed!") {
    return res.status(400).json({
      message: "Invalid file type. Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed.",
    });
  }
  next(err);
};

// Business data routes
router.post("/addSchool", upload.single("image"), handleMulterError, addSchool);
router.get("/getSchools", getSchools);

export default router;

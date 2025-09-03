import express from "express";
import { addSchool, getSchools } from "../controllers/controller.js";
import upload from "../config/multer.js";

const router = express.Router();

// Business data routes
router.post("/addSchool", upload.single("image"), addSchool);
router.get("/getSchools", getSchools);

export default router;

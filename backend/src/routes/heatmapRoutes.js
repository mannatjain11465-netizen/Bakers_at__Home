import { protect, authorize } from "../middleware/authMiddleware.js";
import express from "express";
import { getHeatmapData } from "../controllers/heatmapController.js";

const router = express.Router();

router.get("/", protect, authorize("owner"), getHeatmapData);

export default router;
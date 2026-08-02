import { protect, authorize } from "../middleware/authMiddleware.js";
import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, authorize("owner"), getDashboard);

export default router;
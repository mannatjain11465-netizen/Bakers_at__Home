import {protect, authorize} from "../middleware/authMiddleware.js";
import express from "express";
import { getCalendarOrders } from "../controllers/calendarController.js";

const router = express.Router();

router.get("/", protect, authorize("owner", "employee"), getCalendarOrders);

export default router;
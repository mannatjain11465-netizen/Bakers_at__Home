import express from "express";
import { getCalendarOrders } from "../controllers/calendarController.js";

const router = express.Router();

router.get("/", getCalendarOrders);

export default router;
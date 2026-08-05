import { protect, authorize } from "../middleware/authMiddleware.js";
import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/",protect, authorize("owner", "employee"), createOrder);
router.get("/", protect, authorize("owner", "employee"), getAllOrders);
router.get("/:id", protect, authorize("owner", "employee"), getOrderById);
router.put("/:id", protect, authorize("owner"), updateOrder);
router.put("/:id/status", protect, authorize("owner", "employee"), updateOrderStatus);
router.delete("/:id", protect, authorize("owner"), deleteOrder);

export default router;
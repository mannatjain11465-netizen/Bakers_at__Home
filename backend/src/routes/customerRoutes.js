import { protect, authorize } from "../middleware/authMiddleware.js";
import express from "express";
import {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getCustomerProfile,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/", protect, authorize("owner"), createCustomer);
router.get("/", protect, authorize("owner", "employee"), getAllCustomers);
router.get("/:id", protect, authorize("owner", "employee"), getCustomerById);
router.put("/:id", protect, authorize("owner"), updateCustomer);
router.delete("/:id", protect, authorize("owner"), deleteCustomer);
router.get("/:id/profile", protect, authorize("owner", "employee"), getCustomerProfile);

export default router;
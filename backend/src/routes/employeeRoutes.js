import express from "express";
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employeeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.use(protect);
router.use(authorize("owner"));
router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
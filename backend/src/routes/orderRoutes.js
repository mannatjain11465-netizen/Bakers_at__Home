const express = require("express");
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder,

} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
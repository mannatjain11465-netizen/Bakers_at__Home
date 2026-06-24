const Order = require("../models/Orders");

const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.log("CREATE ORDER ERROR:");
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("customer").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.log("GET ALL ORDERS ERROR:");
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.log("GET ORDER BY ID ERROR:");
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({
            success: false,
            message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.log("UPDATE ORDER ERROR:");
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status : req.body.status
            },

            {
                new : true,
                runValidators : true
            }
        );
        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        res.status(200).json({
            success: true,
            data: order
        });
    }
    catch{
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.log("DELETE ORDER ERROR:");
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
};
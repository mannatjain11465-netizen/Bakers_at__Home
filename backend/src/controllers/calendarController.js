const Order = require("../models/Orders");

const getCalendarOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            deliveryDate: {
                $gte: new Date()
            },

            status: {
                $nin: ["Cancelled", "Delivered"]
            }
        })
        .populate("customer")
        .sort({ deliveryDate: 1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getCalendarOrders
};
import Order from "../models/Orders.js";

const getCalendarOrders = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const orders = await Order.find({
            deliveryDate: {
                $gte: today
            },
            status: {
                $nin: ["Cancelled", "Delivered"]
            }
        })
        .select("occasion deliveryDate deliveryTime status items customer")
        .populate("customer", "name")
        .sort({ deliveryDate: 1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { getCalendarOrders };
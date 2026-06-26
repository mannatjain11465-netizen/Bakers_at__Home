const Order = require("../models/Orders");
const Customer = require("../models/Customer");

const getDashboard = async (req, res) => {
    try {

        const totalCustomers =
            await Customer.countDocuments();

        const totalOrders =
            await Order.countDocuments();

        const activeOrders =
            await Order.countDocuments({
                status: {
                    $in: [
                        "Inquiry",
                        "Confirmed",
                        "In Progress",
                        "Ready"
                    ]
                }
            });

        const inquiryOrders = 
            await Order.countDocuments({
                status: "Inquiry"
            });

        const completedOrders =
            await Order.countDocuments({
                status: "Delivered"
            });

        const orders = await Order.find();

        const totalRevenue = orders.reduce(
            (sum, order) =>
                sum + order.payment.totalAmount,
            0
        );

        const revenueReceived = orders.reduce(
            (sum, order) =>
                sum + order.payment.advancePaid,
            0
        );

        const pendingPayments = orders.reduce(
            (sum, order) =>
                sum + order.payment.remainingAmount,
            0
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingOrders = await Order.find({
            deliveryDate: {
                $gte: today
            }
        }).populate("customer")
            .sort({ deliveryDate: 1 })
            .limit(5);

        res.status(200).json({
            success: true,

            data: {
                totalCustomers,
                totalOrders,
                activeOrders,
                inquiryOrders,
                completedOrders,
                totalRevenue,
                revenueReceived,
                pendingPayments,
                upcomingOrders
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getDashboard
};
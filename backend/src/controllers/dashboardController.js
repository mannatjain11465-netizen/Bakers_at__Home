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

        const orders = await Order.find().select("payment");

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

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayOrders =
            await Order.countDocuments({
                deliveryDate: {
                    $gte: today,
                    $lt: tomorrow
                },
                status: {
                    $nin: [
                        "Cancelled",
                        "Delivered"
                    ]
                }
            });

        const dayAfterTomorrow = new Date(tomorrow);
        dayAfterTomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const upcomingOrders = await Order.find({
            deliveryDate: {
                $gte: today
            }
        })
            .populate("customer")
            .sort({ deliveryDate: 1 })
            .limit(5);

        const tomorrowOrders =
            await Order.countDocuments({
                deliveryDate: {
                    $gte: tomorrow,
                    $lt: dayAfterTomorrow
                },
                status: {
                    $nin: [
                        "Cancelled",
                        "Delivered"
                    ]
                }
            });

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
                upcomingOrders,
                todayOrders,
                tomorrowOrders
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
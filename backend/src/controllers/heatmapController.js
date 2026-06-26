const Order = require("../models/Orders");

const formatDate = (date) => {

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;

};

const getHeatmapData = async (req, res) => {
    try {

        const orders = await Order.find({
            status: {
                $nin: ["Cancelled"]
            }
        })
        .select("deliveryDate")
        .sort({ deliveryDate: 1 });

        if (orders.length === 0) {
            return res.status(200).json({
                success: true,
                data: []
            });
        }

        // Count orders for each date
        const heatmap = {};

        orders.forEach((order) => {

            const date = formatDate(order.deliveryDate);

            if (!heatmap[date]) {
                heatmap[date] = 0;
            }

            heatmap[date]++;

        });

        // First order date
        const firstDate = new Date(orders[0].deliveryDate);
        firstDate.setHours(0, 0, 0, 0);

        // Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Generate complete timeline
        const heatmapData = [];

        const currentDate = new Date(firstDate);

        while (currentDate <= today) {

            const dateString = formatDate(currentDate);

            heatmapData.push({
                date: dateString,
                orderCount: heatmap[dateString] || 0
            });

            currentDate.setDate(
                currentDate.getDate() + 1
            );

        }

        res.status(200).json({
            success: true,
            data: heatmapData
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getHeatmapData
};
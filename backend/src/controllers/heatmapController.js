const Order = require("../models/Orders");

const getHeatmapData = async (req, res) => {
    try {

        const orders = await Order.find({
            status: {
                $nin: ["Cancelled"]
            }
        });

        const heatmap = {};

        orders.forEach((order) => {

            const date = order.deliveryDate
                .toISOString()
                .split("T")[0];

            if (!heatmap[date]) {
                heatmap[date] = 0;
            }

            heatmap[date]++;

        });

        const heatmapData = Object.entries(heatmap).map(
            ([date, orderCount]) => ({
                date,
                orderCount
            })
        );

        heatmapData.sort(
            (a, b) =>
                new Date(a.date) - new Date(b.date)
        );

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
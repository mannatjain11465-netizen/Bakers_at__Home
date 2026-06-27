function Heatmap({ heatmapData }) {

    if (heatmapData.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow-md p-6">

                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Order Heatmap
                </h2>

                <p className="text-gray-500">
                    No activity found.
                </p>

            </div>

        );

    }

    const maxOrders = Math.max(
        ...heatmapData.map((day) => day.orderCount),
        1
    );

    const getColor = (orderCount) => {

        const alpha =
            0.2 + (orderCount / maxOrders) * 0.8;

        return `rgba(236,72,153,${alpha})`;

    };

    const graphData = [];

    const firstDate = new Date(heatmapData[0].date);

    let firstDay = firstDate.getDay();

    if (firstDay === 0)
        firstDay = 7;

    for (let i = 1; i < firstDay; i++) {
        graphData.push(null);
    }

    heatmapData.forEach((day) => {
        graphData.push(day);
    });

    while (graphData.length % 7 !== 0) {
        graphData.push(null);
    }

    const weeks = [];

    for (let i = 0; i < graphData.length; i += 7) {
        weeks.push(graphData.slice(i, i + 7));
    }

    const weekdays = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

    const months = weeks.map((week) => {

        const firstDay = week.find(day => day !== null);

        if (!firstDay) return "";

        return new Date(firstDay.date)
            .toLocaleString("default", {
                month: "short"
            });

    });

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold text-gray-800">
                    Order Heatmap
                </h2>

                <p className="text-sm text-gray-500">
                    Daily Activity
                </p>

            </div>

            {/* Month Labels */}

            <div className="flex ml-11 mb-3 gap-1">

                {months.map((month, index) => (

                    <div
                        key={index}
                        className="
                            w-4
                            text-center
                            text-xs
                            font-semibold
                            text-gray-500
                        "
                    >
                        {
                            index === 0 ||
                            month !== months[index - 1]
                                ? month
                                : ""
                        }

                    </div>

                ))}

            </div>

            <div className="flex gap-3 items-start">

                {/* Weekdays */}

                <div className="flex flex-col gap-1">

                    {weekdays.map((day) => (

                        <div
                            key={day}
                            className="
                                w-8
                                h-4
                                flex
                                items-center
                                text-xs
                                text-gray-500
                            "
                        >
                            {day}

                        </div>

                    ))}

                </div>

                {/* Heatmap */}

                {weeks.map((week, weekIndex) => (

                    <div
                        key={weekIndex}
                        className="flex flex-col gap-1"
                    >

                        {week.map((day, dayIndex) => (

                            day ? (

                                <div
                                    key={day.date}
                                    title={`${new Date(day.date).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        }
                                    )} • ${
                                        day.orderCount === 1
                                            ? "1 Order"
                                            : `${day.orderCount} Orders`
                                    }`}
                                    className="
                                        w-4
                                        h-4
                                        rounded
                                        cursor-pointer
                                        hover:scale-110
                                        transition-transform
                                        duration-200
                                    "
                                    style={{
                                        backgroundColor: getColor(
                                            day.orderCount
                                        )
                                    }}
                                />

                            ) : (

                                <div
                                    key={dayIndex}
                                    className="w-4 h-4"
                                />

                            )

                        ))}

                    </div>

                ))}

            </div>

            {/* Legend */}

            <div className="flex items-center gap-2 mt-6 text-xs text-gray-500">

                <span>Less</span>

                {[0, 1, 2, 3, 4].map((level) => (

                    <div
                        key={level}
                        className="w-4 h-4 rounded"
                        style={{
                            backgroundColor: getColor(
                                (level / 4) * maxOrders
                            )
                        }}
                    />

                ))}

                <span>More</span>

            </div>

        </div>

    );

}

export default Heatmap;
function Heatmap({ heatmapData }) {

    if (heatmapData.length === 0) {

        return (

            <div
                className="
                    bg-white
                    rounded-3xl
                    border
                    border-pink-100
                    shadow-md
                    p-8
                "
            >

                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    Order Heatmap
                </h2>

                <div className="text-center py-10">

                    <p className="text-5xl mb-4">
                        📅
                    </p>

                    <h3 className="text-lg font-semibold text-slate-700">
                        No Order Activity
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Create your first order to start building your bakery heatmap.
                    </p>

                </div>

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

        <div
            className="
                bg-white
                rounded-3xl
                border
                border-pink-100
                shadow-md
                p-8
            "
        >

            <div className="flex justify-between items-start mb-8">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Order Heatmap
                    </h2>

                    <p className="text-sm text-gray-500 leading-relaxed mt-2">
                        Track bakery workload across the year.
                    </p>

                </div>

                                <p
                    className="
                        bg-pink-100
                        text-pink-700
                        text-sm
                        font-semibold
                        px-4
                        py-2
                        rounded-full
                    "
                >
                    Daily Activity
                </p>

            </div>

            <div className="flex ml-11 mb-4 gap-1">

                {months.map((month, index) => (

                    <div
                        key={index}
                        className="
                            w-4
                            text-center
                            text-[10px]
                            font-semibold
                            tracking-wide
                            text-gray-400
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

            <div className="flex gap-5 items-start">

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
                                text-gray-400
                            "
                        >
                            {day}

                        </div>

                    ))}

                </div>

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
                                        rounded-md
                                        cursor-pointer
                                        hover:scale-110
                                        hover:shadow-md
                                        hover:ring-2
                                        hover:ring-pink-200
                                        transition-all
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

                        <div
                className="
                    flex
                    items-center
                    gap-2
                    mt-8
                    text-xs
                    text-gray-500
                "
            >

                <span>Less Activity</span>

                {[0, 1, 2, 3, 4].map((level) => (

                    <div
                        key={level}
                        className="
                            w-5
                            h-5
                            rounded-md
                        "
                        style={{
                            backgroundColor: getColor(
                                (level / 4) * maxOrders
                            )
                        }}
                    />

                ))}

                <span>More Activity</span>

            </div>

        </div>

    );

}

export default Heatmap;
function Heatmap({ heatmapData }) {

    if (heatmapData.length === 0) {
        return (
            <>
                <hr />
                <h2>Order Activity</h2>
                <p>No activity found.</p>
            </>
        );
    }

    const maxOrders = Math.max(
        ...heatmapData.map((day) => day.orderCount),
        1
    );

    const getColor = (orderCount) => {

        const alpha =
            0.2 + (orderCount / maxOrders) * 0.8;

        return `rgba(236, 72, 153, ${alpha})`;

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

        const firstDay = week.find((day) => day !== null);

        if (!firstDay) return "";

        return new Date(firstDay.date)
            .toLocaleString("default", {
                month: "short"
            });

    });

    return (
        <>
            <hr />

            <h2>Order Heatmap</h2>

            <div
                style={{
                    display: "flex",
                    marginLeft: "43px",
                    marginBottom: "12px",
                    gap: "4px"
                }}
            >
                {months.map((month, index) => (

                    <div
                        key={index}
                        style={{
                            width: "16px",
                            textAlign: "center",
                            fontSize: "12px",
                            fontWeight: "bold"
                        }}
                    >
                        {
                            index === 0 || month !== months[index - 1]
                                ? month
                                : ""
                        }
                    </div>

                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px"
                    }}
                >
                    {weekdays.map((day) => (

                        <div
                            key={day}
                            style={{
                                width: "35px",
                                height: "16px",
                                fontSize: "12px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {day}
                        </div>

                    ))}
                </div>

                {weeks.map((week, weekIndex) => (

                    <div
                        key={weekIndex}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px"
                        }}
                    >

                        {week.map((day, dayIndex) => (

                            day ? (

                                <div
                                    key={day.date}
                                    title={`${new Date(day.date).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                    ${day.orderCount === 1 ? "1 Order" : `${day.orderCount} Orders`}`}
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        backgroundColor: getColor(day.orderCount),
                                        borderRadius: "3px",
                                        cursor: "pointer"
                                    }}
                                />

                            ) : (

                                <div
                                    key={dayIndex}
                                    style={{
                                        width: "16px",
                                        height: "16px"
                                    }}
                                />

                            )

                        ))}

                    </div>

                ))}

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "16px",
                    fontSize: "12px"
                }}
            >

                <span>Less</span>

                {[0, 1, 2, 3, 4].map((level) => (

                    <div
                        key={level}
                        style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "3px",
                            backgroundColor: getColor(
                                (level / 4) * maxOrders
                            )
                        }}
                    />

                ))}

                <span>More</span>

            </div>

        </>
    );

}

export default Heatmap;
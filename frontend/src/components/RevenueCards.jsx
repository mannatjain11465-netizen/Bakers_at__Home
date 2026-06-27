import {
    FiDollarSign,
    FiCheckCircle,
    FiClock
} from "react-icons/fi";

function RevenueCards({
    totalRevenue,
    revenueReceived,
    pendingPayments
}) {

    const cards = [
        {
            title: "Total Revenue",
            value: `₹${totalRevenue}`,
            icon: <FiDollarSign size={24} />,
            iconColor: "text-pink-500"
        },
        {
            title: "Revenue Received",
            value: `₹${revenueReceived}`,
            icon: <FiCheckCircle size={24} />,
            iconColor: "text-green-500"
        },
        {
            title: "Pending Payments",
            value: `₹${pendingPayments}`,
            icon: <FiClock size={24} />,
            iconColor: "text-amber-500"
        }
    ];

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
                Revenue
            </h2>

            <div className="flex flex-col gap-4">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="
                            border
                            border-pink-100
                            rounded-xl
                            p-4
                            hover:shadow-md
                            transition-all
                            duration-200
                        "
                    >

                        <div className="flex items-center justify-between">

                            <span className={card.iconColor}>
                                {card.icon}
                            </span>

                            <span className="text-2xl font-bold text-gray-800">
                                {card.value}
                            </span>

                        </div>

                        <p className="mt-3 text-sm text-gray-500">
                            {card.title}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default RevenueCards;
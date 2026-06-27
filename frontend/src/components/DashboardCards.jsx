import {
    FiUsers,
    FiPackage,
    FiActivity,
    FiCheckCircle
} from "react-icons/fi";

function DashboardCards({
    totalCustomers,
    totalOrders,
    activeOrders,
    completedOrders
}) {

    const cards = [
        {
            title: "Total Customers",
            value: totalCustomers,
            icon: <FiUsers size={24} />
        },
        {
            title: "Total Orders",
            value: totalOrders,
            icon: <FiPackage size={24} />
        },
        {
            title: "Active Orders",
            value: activeOrders,
            icon: <FiActivity size={24} />
        },
        {
            title: "Completed Orders",
            value: completedOrders,
            icon: <FiCheckCircle size={24} />
        }
    ];

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
                Overview
            </h2>

            <div className="grid grid-cols-2 gap-4">

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

                            <span className="text-pink-500">
                                {card.icon}
                            </span>

                            <span className="text-3xl font-bold text-gray-800">
                                {card.value}
                            </span>

                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            {card.title}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default DashboardCards;
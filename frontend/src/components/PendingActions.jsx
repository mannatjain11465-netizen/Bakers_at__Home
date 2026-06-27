import {
    FiAlertCircle,
    FiClock,
    FiCalendar,
    FiCreditCard
} from "react-icons/fi";

function PendingActions({
    inquiryOrders,
    pendingPayments,
    todayOrders,
    tomorrowOrders
}) {

    const actions = [
        {
            title: "Inquiry Orders",
            value: inquiryOrders,
            icon: <FiAlertCircle size={22} />,
            iconColor: "text-pink-500"
        },
        {
            title: "Pending Payments",
            value: `₹${pendingPayments}`,
            icon: <FiCreditCard size={22} />,
            iconColor: "text-amber-500"
        },
        {
            title: "Today's Orders",
            value: todayOrders,
            icon: <FiCalendar size={22} />,
            iconColor: "text-blue-500"
        },
        {
            title: "Tomorrow's Orders",
            value: tomorrowOrders,
            icon: <FiClock size={22} />,
            iconColor: "text-purple-500"
        }
    ];

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
                Pending Actions
            </h2>

            <div className="flex flex-col gap-4">

                {actions.map((action) => (

                    <div
                        key={action.title}
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

                            <span className={action.iconColor}>
                                {action.icon}
                            </span>

                            <span className="text-2xl font-bold text-gray-800">
                                {action.value}
                            </span>

                        </div>

                        <p className="mt-3 text-sm text-gray-500">
                            {action.title}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default PendingActions;
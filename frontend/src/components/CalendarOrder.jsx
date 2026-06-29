import { useNavigate } from "react-router-dom";
import {
    FiCalendar,
    FiClock,
    FiUser,
    FiArrowRight
} from "react-icons/fi";

function CalendarOrders({ selectedOrders, selectedDate }) {

    const navigate = useNavigate();

    const statusColors = {
        Inquiry: "bg-yellow-100 text-yellow-700",
        Discussion: "bg-orange-100 text-orange-700",
        Confirmed: "bg-blue-100 text-blue-700",
        "In Progress": "bg-purple-100 text-purple-700",
        Ready: "bg-emerald-100 text-emerald-700",
        Delivered: "bg-green-100 text-green-700",
        Cancelled: "bg-red-100 text-red-700"
    };

    return (
        <>

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Orders
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {selectedDate.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </p>

                </div>

                <div
                    className="
                        bg-pink-100
                        text-pink-700
                        font-semibold
                        px-4
                        py-2
                        rounded-full
                        text-sm
                    "
                >
                    {selectedOrders.length} Order
                    {selectedOrders.length !== 1 && "s"}
                </div>

            </div>

            {selectedOrders.length === 0 ? (

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-center
                        py-16
                    "
                >

                    <FiCalendar className="text-6xl text-pink-300 mb-4" />

                    <h3 className="text-xl font-semibold text-slate-700">
                        No Orders
                    </h3>

                    <p className="text-gray-500 mt-2">
                        No deliveries scheduled for this date.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                                        {selectedOrders.map((order) => (

                        <div
                            key={order._id}
                            className="
                                bg-pink-50/40
                                border
                                border-pink-100
                                rounded-2xl
                                p-5
                                hover:shadow-md
                                transition-all
                                hover:border-pink-200
                            "
                        >

                            <div className="flex items-start justify-between mb-5">

                                <div>

                                    <h3 className="text-xl font-bold text-slate-800">
                                        {order.items[0].name}
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        {order.occasion}
                                    </p>

                                </div>

                                <span
                                    className={`
                                        px-4
                                        py-1.5
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        ${statusColors[order.status] || "bg-gray-100 text-gray-700"}
                                    `}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div className="flex items-center gap-3">

                                    <FiUser className="text-pink-600 text-lg" />

                                    <div>

                                        <p className="text-xs uppercase text-gray-400">
                                            Customer
                                        </p>

                                        <p className="font-semibold text-slate-700">
                                            {order.customer.name}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <FiClock className="text-pink-600 text-lg" />

                                    <div>

                                        <p className="text-xs uppercase text-gray-400">
                                            Delivery Time
                                        </p>

                                        <p className="font-semibold text-slate-700">
                                            {order.deliveryTime}
                                        </p>

                                    </div>

                                </div>

                            </div>

                                                        <div className="flex justify-end mt-6">

                                <button
                                    onClick={() =>
                                        navigate(`/orders/${order._id}`)
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        bg-pink-600
                                        hover:bg-pink-700
                                        text-white
                                        px-5
                                        py-2.5
                                        rounded-xl
                                        font-semibold
                                        transition-all
                                        cursor-pointer
                                    "
                                >

                                    View Order

                                    <FiArrowRight />

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </>

    );

}

export default CalendarOrders;
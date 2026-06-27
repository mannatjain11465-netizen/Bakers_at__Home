import { FiCalendar, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function UpcomingOrders({ orders }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
                Upcoming Orders
            </h2>

            {orders.length === 0 ? (

                <div className="flex flex-col items-center justify-center py-10">

                    <FiCalendar
                        size={42}
                        className="text-pink-300 mb-3"
                    />

                    <p className="text-gray-500">
                        No upcoming orders 🎉
                    </p>

                </div>

            ) : (

                <>

                    <div className="flex flex-col gap-4">

                        {orders.map((order) => (

                            <div
                                key={order._id}
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

                                <div className="flex justify-between items-center">

                                    <div>

                                        <h3 className="font-semibold text-gray-800">
                                            {order.occasion}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {order.customer.name}
                                        </p>

                                    </div>

                                    <FiPackage
                                        size={24}
                                        className="text-pink-500"
                                    />

                                </div>

                                <div className="mt-4 flex justify-between text-sm text-gray-500">

                                    <span>
                                        {new Date(order.deliveryDate).toLocaleDateString()}
                                    </span>

                                    <span>
                                        {order.deliveryTime}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                    <button
                        onClick={() => navigate("/orders")}
                        className="
                            mt-5
                            w-full
                            bg-pink-500
                            hover:bg-pink-600
                            text-white
                            py-3
                            rounded-xl
                            font-medium
                            transition-all
                            duration-200
                        "
                    >
                        Manage Orders
                    </button>

                </>

            )}

        </div>

    );

}

export default UpcomingOrders;
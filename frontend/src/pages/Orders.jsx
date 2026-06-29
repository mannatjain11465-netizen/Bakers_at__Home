import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
    FiUser,
    FiGift,
    FiCalendar,
    FiClock,
    FiTruck,
    FiPackage,
    FiDollarSign,
    FiArrowRight
} from "react-icons/fi";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const navigate = useNavigate();

    useEffect(() => {

        API.get("/orders")
            .then((response) => {
                setOrders(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const filteredOrders = orders.filter((order) => {

        const customerName = order.customer.name.toLowerCase();
        const occasion = order.occasion.toLowerCase();

        const itemNames = order.items
            .map((item) => item.name)
            .join(" ")
            .toLowerCase();

        const search = searchTerm.toLowerCase();

        const matchesSearch =
            customerName.includes(search) ||
            occasion.includes(search) ||
            itemNames.includes(search);

        const matchesStatus =
            statusFilter === "All" ||
            order.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    const statusColors = {
        Inquiry: "bg-yellow-100 text-yellow-700",
        Confirmed: "bg-blue-100 text-blue-700",
        "In Progress": "bg-purple-100 text-purple-700",
        Ready: "bg-green-100 text-green-700",
        Delivered: "bg-emerald-100 text-emerald-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    return (

        <Layout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-5xl font-bold text-slate-800">
                        Orders
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Manage all your bakery orders.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/create-order")}
                    className="
                        bg-pink-600
                        hover:bg-pink-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                        shadow-md
                        transition-all
                        cursor-pointer
                    "
                >
                    + New Order
                </button>

            </div>

            <p className="text-gray-500 mb-6">

                Showing{" "}

                <span className="font-semibold text-slate-800">
                    {filteredOrders.length}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-800">
                    {orders.length}
                </span>

                {" "}orders

            </p>

            <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

                <div className="flex gap-4">

                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="
                            flex-1
                            px-5
                            py-3
                            rounded-xl
                            border
                            border-pink-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-pink-300
                        "
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="
                            w-56
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-pink-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-pink-300
                            cursor-pointer
                        "
                    >
                        <option value="All">All Status</option>
                        <option value="Inquiry">Inquiry</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                </div>

            </div>

            <div className="space-y-6">
                {filteredOrders.map((order) => (

                    <div
                        key={order._id}
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-5
                            hover:-translate-y-1
                            hover:shadow-xl
                            transition-all
                            duration-300
                        "
                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <div className="flex items-center gap-4">

                                    <div
                                        className="
                                            w-12
                                            h-12
                                            rounded-xl
                                            bg-pink-50
                                            border
                                            border-pink-200
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <FiPackage
                                            size={24}
                                            className="text-pink-600"
                                        />

                                    </div>

                                    <h2 className="text-3xl font-bold text-slate-800">

                                        {
                                            order.items.length === 1
                                                ? order.items[0].name
                                                : `${order.items[0].name} +${order.items.length - 1} more`
                                        }

                                    </h2>

                                </div>

                                <div className="mt-3 space-y-2">

                                    <div className="flex items-center gap-2 text-gray-700">

                                        <FiUser
                                            size={16}
                                            className="text-pink-500"
                                        />

                                        <span className="font-semibold">
                                            {order.customer.name}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 text-gray-500">

                                        <FiGift
                                            size={16}
                                            className="text-pink-500"
                                        />

                                        <span>
                                            {order.occasion}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <span
                                className={`
                                    px-4
                                    py-2
                                    rounded-full
                                    text-[15px]
                                    font-semibold
                                    shadow-sm
                                    ${statusColors[order.status]}
                                `}
                            >
                                {order.status}
                            </span>

                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-6">

                            <div>

                                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">

                                    <FiCalendar />

                                    Delivery Date

                                </div>

                                <p className="font-medium text-slate-700 mt-2">
                                    {new Date(order.deliveryDate).toLocaleDateString()}
                                </p>

                            </div>

                            <div>

                                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">

                                    <FiClock />

                                    Time

                                </div>

                                <p className="font-semibold text-slate-700 mt-2">
                                    {order.deliveryTime}
                                </p>

                            </div>

                            <div>

                                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">

                                    <FiTruck />

                                    Order Type

                                </div>

                                <span
                                    className={`
                                        inline-flex
                                        mt-2
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        font-medium
                                        ${
                                            order.orderType === "Delivery"
                                                ? "bg-pink-50 border border-pink-200 text-pink-700"
                                                : "bg-blue-50 border border-blue-200 text-blue-700"
                                        }
                                    `}
                                >
                                    {order.orderType}
                                </span>

                            </div>

                            <div className="flex flex-col items-end">

                                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">

                                    <FiDollarSign />

                                    Amount

                                </div>

                                <p className="text-3xl font-bold text-pink-600 mt-2">
                                    ₹{order.payment.totalAmount}
                                </p>

                                <button
                                    onClick={() => navigate(`/orders/${order._id}`)}
                                    className="
                                        mt-5
                                        inline-flex
                                        items-center
                                        gap-2
                                        bg-pink-600
                                        hover:bg-pink-700
                                        hover:scale-105
                                        text-white
                                        px-5
                                        py-2.5
                                        rounded-xl
                                        font-semibold
                                        transition-all
                                        cursor-pointer
                                    "
                                >
                                    View Details

                                    <FiArrowRight size={18} />

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </Layout>

    );

}

export default Orders;



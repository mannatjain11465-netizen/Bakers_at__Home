import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import {
    FiArrowLeft,
    FiPhone,
    FiHome,
    FiFileText,
    FiShoppingBag,
    FiEdit2,
    FiTrash2,
    FiArrowRight,
    FiCalendar,
    FiDollarSign,
    FiPackage,
} from "react-icons/fi";

function CustomerProfile() {
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        API.get(`/customers/${customerId}/profile`)
            .then((response) => {
                setCustomer(response.data.customer);
                setStats(response.data.stats);
                setOrders(response.data.orders);
            })
            .catch((error) => console.log(error));
    }, [customerId]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Delete "${customer.name}"?
            This action cannot be undone.
            All customer information will be permanently removed.`
            );

        if (!confirmDelete) return;

        try {
            const response = await API.delete(`/customers/${customerId}`);

            alert(`${customer.name} deleted successfully.`);

            navigate("/customers");
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                    "Failed to delete customer."
            );
        }
    };

    if (!customer || !stats) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[60vh]">
                    <p className="text-xl font-medium text-gray-500">
                        Loading...
                    </p>
                </div>
            </Layout>
        );
    }

   return (
    <Layout>

        <button
            onClick={() => navigate("/customers")}
            className="
                flex
                items-center
                gap-2
                text-pink-600
                hover:text-pink-700
                font-semibold
                mb-6
                cursor-pointer
            "
        >
            <FiArrowLeft />
            Back to Customers
        </button>

        <div className="flex justify-between items-start mb-8">

            <div>

                <h1 className="text-5xl font-bold text-slate-800">
                    {customer.name}
                </h1>

                <p className="text-gray-500 text-lg mt-2">
                    Customer Profile
                </p>

            </div>

            <div className="flex gap-3">

                <button
                    onClick={() =>
                        navigate(`/customers/${customerId}/edit`)
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        bg-pink-600
                        hover:bg-pink-700
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all
                        cursor-pointer
                    "
                >
                    <FiEdit2 />
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="
                        flex
                        items-center
                        gap-2
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all
                        cursor-pointer
                    "
                >
                    <FiTrash2 />
                    Delete
                </button>

            </div>

        </div>

        <div className="bg-white rounded-3xl border border-pink-100 shadow-md p-8 mb-8">

            <div className="grid md:grid-cols-2 gap-8">

                <div className="space-y-5">

                    <div className="flex items-center gap-3">

                        <FiPhone className="text-pink-600 text-xl" />

                        <span className="text-lg text-slate-700">
                            {customer.phone}
                        </span>

                    </div>

                    <div className="flex items-start gap-3">

                        <FiHome className="text-pink-600 text-xl mt-1" />

                        <div>

                            <p className="text-slate-700">
                                {customer.building}
                            </p>

                            <p className="text-gray-500">
                                Flat {customer.flatNumber}
                            </p>

                        </div>

                    </div>

                </div>

                <div>

                    <div className="flex items-start gap-3">

                        <FiFileText className="text-pink-600 text-xl mt-1" />

                        <div>

                            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                                Notes
                            </p>

                            <p className="text-slate-700">
                                {customer.notes || "No notes available"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-2xl border border-pink-100 shadow-md p-6">

                <p className="text-sm uppercase text-gray-400">
                    Total Orders
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {stats.totalOrders}
                </h2>

            </div>

            <div className="bg-white rounded-2xl border border-pink-100 shadow-md p-6">

                <p className="text-sm uppercase text-gray-400">
                    Total Spent
                </p>

                <h2 className="text-3xl font-bold text-pink-600 mt-2">
                    ₹{stats.totalSpent}
                </h2>

            </div>

            <div className="bg-white rounded-2xl border border-pink-100 shadow-md p-6">

                <p className="text-sm uppercase text-gray-400">
                    Last Order
                </p>

                <h2 className="text-lg font-semibold text-slate-700 mt-3">
                    {stats.lastOrderDate
                        ? new Date(stats.lastOrderDate).toLocaleDateString()
                        : "No Orders Yet"}
                </h2>

            </div>

        </div>

        <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold text-slate-800">
                Order History
            </h2>

            <button
                onClick={() =>
                    navigate(`/create-order?customer=${customer._id}`)
                }
                className="
                    flex
                    items-center
                    gap-2
                    bg-pink-600
                    hover:bg-pink-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition-all
                    cursor-pointer
                "
            >
                <FiShoppingBag />
                Create Order
            </button>

        </div>

                {orders.length === 0 ? (

            <div className="bg-white rounded-2xl border border-pink-100 shadow-md p-10 text-center">

                <FiShoppingBag className="mx-auto text-5xl text-pink-300 mb-4" />

                <h3 className="text-2xl font-bold text-slate-700">
                    No Orders Yet
                </h3>

                <p className="text-gray-500 mt-2">
                    This customer hasn't placed any orders yet.
                </p>

            </div>

        ) : (

            <div className="space-y-6">

                {orders.map((order) => {

                    const statusColors = {
                        Inquiry: "bg-yellow-100 text-yellow-700",
                        Confirmed: "bg-blue-100 text-blue-700",
                        "In Progress": "bg-purple-100 text-purple-700",
                        Ready: "bg-green-100 text-green-700",
                        Delivered: "bg-emerald-100 text-emerald-700",
                        Cancelled: "bg-red-100 text-red-700",
                    };

                    return (

                        <div
                            key={order._id}
                            className="
                                bg-white
                                rounded-2xl
                                border
                                border-pink-100
                                shadow-md
                                p-6
                                hover:shadow-xl
                                transition-all
                            "
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h3 className="text-2xl font-bold text-slate-800">

                                        {order.items.length === 1
                                            ? order.items[0].name
                                            : `${order.items[0].name} +${order.items.length - 1} more`
                                        }

                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        {order.occasion}
                                    </p>

                                </div>

                                <span
                                    className={`
                                        px-4
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        ${statusColors[order.status]}
                                    `}
                                >
                                    {order.status}
                                </span>

                            </div>

                            <div className="grid grid-cols-3 gap-6 mt-6">

                                <div>

                                    <p className="text-xs uppercase text-gray-400 flex items-center gap-2">
                                        <FiCalendar />
                                        Delivery Date
                                    </p>

                                    <p className="font-semibold text-slate-700 mt-1">
                                        {new Date(order.deliveryDate).toLocaleDateString()}
                                    </p>

                                </div>

                                <div>

                                    <p className="text-xs uppercase text-gray-400 flex items-center gap-2">
                                        <FiDollarSign />
                                        Amount
                                    </p>

                                    <p className="text-xl font-bold text-pink-600 mt-1">
                                        ₹{order.payment.totalAmount}
                                    </p>

                                </div>

                                <div className="flex justify-end items-end">

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

                        </div>

                    );

                })}

            </div>

        )}

    </Layout>
);
}

export default CustomerProfile;
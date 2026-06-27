import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";

import {
    FiArrowLeft,
    FiEdit,
    FiTrash2,
    FiUser,
    FiPhone,
    FiMapPin,
    FiGift,
    FiUsers,
    FiHeart
} from "react-icons/fi";

function SingleOrder() {

    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState("");

    const { orderId } = useParams();
    const navigate = useNavigate();

    const handleStatusUpdate = () => {

        API.put(`/orders/${orderId}/status`, { status })

            .then((response) => {

                setOrder(response.data.data);

                alert("Status updated successfully!");

            })

            .catch((error) => {

                console.log(error);

                alert("Failed to update status.");

            });

    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/orders/${orderId}`);

            alert("Order deleted successfully!");

            navigate("/orders");

        }

        catch (error) {

            console.log(error);

            alert("Failed to delete order.");

        }

    };

    useEffect(() => {

        API.get(`/orders/${orderId}`)

            .then((response) => {

                setOrder(response.data.data);

                setStatus(response.data.data.status);

            })

            .catch((error) => {

                console.log(error);

            });

    }, [orderId]);

    if (!order) {

        return (

            <Layout>

                <h1 className="text-3xl font-bold">
                    Loading...
                </h1>

            </Layout>

        );

    }

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

            <button
                onClick={() => navigate("/orders")}
                className="
                    flex
                    items-center
                    gap-2
                    text-pink-600
                    hover:text-pink-700
                    font-medium
                    mb-6
                "
            >

                <FiArrowLeft />

                Back to Orders

            </button>

            <div className="flex justify-between items-start mb-10">

                <div>

                    <h1 className="text-5xl font-bold text-slate-800">

                        {
                            order.items.length === 1
                                ? order.items[0].name
                                : `${order.items[0].name} +${order.items.length - 1} more`
                        }

                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">

                        {order.customer.name}

                        {" • "}

                        {order.occasion}

                    </p>

                </div>

                <div className="flex items-center gap-3">

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

                    <button
                        onClick={() =>
                            navigate(`/orders/${orderId}/edit`)
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
                        "
                    >

                        <FiEdit />

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
                            py-2.5
                            rounded-xl
                            font-semibold
                        "
                    >

                        <FiTrash2 />

                        Delete

                    </button>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6">

                <div
                    className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        border
                        border-pink-100
                        p-6
                    "
                >

                    <h2 className="text-2xl font-bold mb-6">

                        Customer

                    </h2>

                    <div className="space-y-5">

                        <div className="flex items-center gap-3">

                            <FiUser className="text-pink-500" />

                            <span>

                                {order.customer.name}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FiPhone className="text-pink-500" />

                            <span>

                                {order.customer.phone}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <span>

                                {order.orderType === "Delivery" && (
                                    <>
                                        <FiMapPin className="text-pink-500" />
                                        <p>Address</p>
                                        <p>{order.address}</p>
                                    </>
                                )}

                            </span>

                        </div>

                    </div>

                </div>

                <div
                    className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        border
                        border-pink-100
                        p-6
                    "
                >

                    <h2 className="text-2xl font-bold mb-6">

                        Celebration

                    </h2>

                    <div className="space-y-5">

                        <div className="flex items-center gap-3">

                            <FiGift className="text-pink-500" />

                            <span>

                                {order.occasion}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FiHeart className="text-pink-500" />

                            <span>

                                {order.celebrant.name}

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FiUsers className="text-pink-500" />

                            <span>

                                {order.celebrant.age} Years

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FiUser className="text-pink-500" />

                            <span>

                                {order.celebrant.gender}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">

                <div
                    className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        border
                        border-pink-100
                        p-6
                    "
                >

                    <h2 className="text-2xl font-bold mb-6">

                        Order Items

                    </h2>

                    <div className="space-y-5">

                        {order.items.map((item, index) => (

                            <div
                                key={index}
                                className="
                                    border
                                    border-pink-100
                                    rounded-xl
                                    p-4
                                "
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h3 className="text-xl font-semibold text-slate-800">

                                            {item.name}

                                        </h3>

                                        <p className="text-gray-500 mt-1">

                                            {item.category}

                                        </p>

                                    </div>

                                    <span
                                        className="
                                            bg-pink-50
                                            text-pink-700
                                            border
                                            border-pink-200
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                        "
                                    >

                                        {item.quantity}

                                        {" "}

                                        {item.unit}

                                    </span>

                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-5">

                                    <div>

                                        <p className="text-xs uppercase text-gray-400">

                                            Weight

                                        </p>

                                        <p className="font-medium">

                                            {item.weight || "-"}{" kgs"}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase text-gray-400">

                                            Flavour

                                        </p>

                                        <p className="font-medium">

                                            {item.flavour || "-"}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase text-gray-400">

                                            Price

                                        </p>

                                        <p className="font-bold text-pink-600">

                                            ₹{item.unitPrice}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="space-y-6">

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <h2 className="text-2xl font-bold mb-6">

                            Payment Summary

                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between">

                                <span>Total Amount</span>

                                <span className="font-bold">

                                    ₹{order.payment.totalAmount}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Advance Paid</span>

                                <span className="font-bold text-green-600">

                                    ₹{order.payment.advancePaid}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Remaining</span>

                                <span className="font-bold text-red-500">

                                    ₹{order.payment.remainingAmount}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Method</span>

                                <span>

                                    {order.payment.paymentMethod}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Status</span>

                                <span
                                    className="
                                        bg-pink-50
                                        text-pink-700
                                        border
                                        border-pink-200
                                        rounded-full
                                        px-3
                                        py-1
                                        text-sm
                                    "
                                >

                                    {order.payment.paymentStatus}

                                </span>

                            </div>

                        </div>

                    </div>

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <h2 className="text-2xl font-bold mb-6">

                            Delivery Details

                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between">

                                <span>Date</span>

                                <span className="font-medium">

                                    {new Date(order.deliveryDate).toLocaleDateString()}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Time</span>

                                <span className="font-medium">

                                    {order.deliveryTime}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Type</span>

                                <span
                                    className="
                                        bg-pink-50
                                        text-pink-700
                                        border
                                        border-pink-200
                                        rounded-full
                                        px-3
                                        py-1
                                        text-sm
                                    "
                                >

                                    {order.orderType}

                                </span>

                            </div>

                            <div>

                                <p className="text-xs uppercase text-gray-400 mb-2">

                                    Address

                                </p>

                                <p className="text-gray-700">

                                    {order.address || "Pickup"}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">

                <div
                    className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        border
                        border-pink-100
                        p-6
                    "
                >

                    <h2 className="text-2xl font-bold mb-6">

                        Discussion Notes

                    </h2>

                    <div
                        className="
                            bg-pink-50
                            rounded-xl
                            p-5
                            border
                            border-pink-100
                            min-h-28
                        "
                    >

                        <p className="text-gray-700 leading-7">

                            {
                                order.discussionNotes
                                    ? order.discussionNotes
                                    : "No discussion notes available."
                            }

                        </p>

                    </div>

                </div>

                <div className="space-y-6">

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <h2 className="text-2xl font-bold mb-6">

                            Update Status

                        </h2>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="
                                w-full
                                border
                                border-pink-100
                                rounded-xl
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-300
                            "
                        >

                            <option>Inquiry</option>
                            <option>Confirmed</option>
                            <option>In Progress</option>
                            <option>Ready</option>
                            <option>Delivered</option>

                        </select>

                        <button
                            onClick={handleStatusUpdate}
                            className="
                                w-full
                                mt-5
                                bg-pink-600
                                hover:bg-pink-700
                                text-white
                                py-3
                                rounded-xl
                                font-semibold
                                transition-all
                            "
                        >

                            Update Status

                        </button>

                    </div>

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <h2 className="text-2xl font-bold mb-6">

                            Reference Images

                        </h2>

                        <div
                            className="
                                h-40
                                rounded-xl
                                border-2
                                border-dashed
                                border-pink-200
                                flex
                                items-center
                                justify-center
                                text-gray-400
                            "
                        >

                            Images Coming Soon

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default SingleOrder;




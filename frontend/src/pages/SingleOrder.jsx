import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function SingleOrder() {
const [order, setOrder] = useState(null);
const { orderId } = useParams();
const [status, setStatus] = useState("");
const navigate = useNavigate();

const handleStatusUpdate = () => {
    API.put(`/orders/${orderId}/status`, { status })
        .then((response) => {
            console.log(response.data);
            setOrder(response.data.data);
            alert("Status updated successfully!");
        }
        )
        .catch((error) => {
            console.log(error);
            alert("Failed to update status.");
        });
};

const handleDelete = async () => {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this order"
    );
    if(!confirmDelete)
            return;
    try{
        await API.delete(`/orders/${orderId}`);
        alert ("Order deleted successfully!");
        navigate("/orders");
    }
    catch(error){
        console.log(error);
        alert("Failed to delete order");
    }
}

useEffect(() => {
    API.get(`/orders/${orderId}`)
        .then((response) => {
            console.log(response.data);
            setOrder(response.data.data);
            setStatus(response.data.data.status);
        })
        .catch((error) => {
            console.log(error);
        });
}, [orderId]);

if (!order) {
    return (
        <>
            <Sidebar />
            <h1>Loading...</h1>
        </>
    );
}

return (
    <>
        <Sidebar />

        <h1>Single Order</h1>

        <hr />

        <h2>Order Details</h2>

        <p>
            <strong>Occasion:</strong> {order.occasion}
        </p>

        <p>
            <strong>Customer:</strong> {order.customer.name}
        </p>

        <p>
            <strong>Delivery Date:</strong>{" "}
            {new Date(order.deliveryDate).toLocaleDateString()}
        </p>

        <p>
            <strong>Delivery Time:</strong> {order.deliveryTime}
        </p>

        <p>
            <strong>Order Type:</strong> {order.orderType}
        </p>

        <p>
            <strong>Status:</strong> {order.status}
        </p>

        <h2>Update Status</h2>

        <select 
        value={status}
        onChange={(e) => setStatus(e.target.value)}>
            <option>Inquiry</option>
            <option>Confirmed</option>
            <option>In Progress</option>
            <option>Ready</option>
            <option>Delivered</option>
        </select>

        <button onClick={handleStatusUpdate}>Update Status</button>

        <p>
            <strong>Amount:</strong> ₹{order.payment.totalAmount}
        </p>

        <hr />

        <h2>Celebrant Details</h2>

        <p>
            <strong>Name:</strong> {order.celebrant.name}
        </p>

        <p>
            <strong>Relation:</strong> {order.celebrant.relation}
        </p>

        <p>
            <strong>Gender:</strong> {order.celebrant.gender}
        </p>

        <p>
            <strong>Age:</strong> {order.celebrant.age}
        </p>

        <hr />

        <h2>Address</h2>

        <p>
            {order.address || "Pickup"}
        </p>

        <hr />

        <h2>Items</h2>

        {order.items.map((item, index) => (
            <div key={index}>
                <p>
                    <strong>Category:</strong> {item.category}
                </p>

                <p>
                    <strong>Item Name:</strong> {item.name}
                </p>

                <p>
                    <strong>Quantity:</strong> {item.quantity}
                </p>

                <p>
                    <strong>Weight:</strong> {item.weight}
                </p>

                <p>
                    <strong>Flavour:</strong> {item.flavour}
                </p>

                <p>
                    <strong>Price:</strong> ₹{item.unitPrice}
                </p>

                <hr />
            </div>
        ))}

        <h2>Payment Details</h2>

        <p>
            <strong>Total Amount:</strong> ₹{order.payment.totalAmount}
        </p>

        <p>
            <strong>Advance Paid:</strong> ₹{order.payment.advancePaid}
        </p>

        <p>
            <strong>Remaining Amount:</strong> ₹{order.payment.remainingAmount}
        </p>

        <p>
            <strong>Payment Method:</strong> {order.payment.paymentMethod}
        </p>

        <p>
            <strong>Payment Status:</strong> {order.payment.paymentStatus}
        </p>

        <hr />

        <h2>Discussion Notes</h2>

        <p>
            {order.discussionNotes || "No notes"}
        </p>

        <button onClick={() => navigate(`/orders/${orderId}/edit`)}>
            Edit Order
        </button>

        <button onClick={handleDelete}>Delete Order</button>
    </>
);

}

export default SingleOrder;

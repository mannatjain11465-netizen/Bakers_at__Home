import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function CustomerProfile() {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [stats, setStats] =useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        API.get(`/customers/${customerId}/profile`)
            .then((response) => {
                console.log(response.data);

                setCustomer(response.data.customer);
                setStats(response.data.stats);
                setOrders(response.data.orders);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [customerId]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );
        if (!confirmDelete) return;
        try {
            await API.delete(`/customers/${customerId}`);
            alert("Customer deleted successfully!");
            navigate("/customers");
        } 
        catch (error) {
            console.log(error);
            alert("Failed to delete customer.");
        }

    };

    if (!customer || !stats) {
        return (
            <>
                <Sidebar />
                <h2>Loading...</h2>
            </>
        );
    }

    return (
        <>
            <Sidebar />

            <h1>Customer Profile</h1>

            <h2>{customer.name}</h2>

            <p>Phone : {customer.phone}</p>

            <p>Building : {customer.building}</p>

            <p>Flat Number : {customer.flatNumber}</p>

            <p>Notes : {customer.notes}</p>

            <hr />

            <h2>Quick Actions</h2>

            <button
                onClick={() =>
                    navigate(`/create-order?customer=${customer._id}`)
                }>
                Create New Order
            </button>

            <button
                onClick={() =>
                    navigate(`/customers/${customerId}/edit`)
                }>
                Edit Customer
            </button>

            <button
                onClick={handleDelete}>
                Delete Customer
            </button>

            <hr />

            <h2>Statistics</h2>

            <p>Total Orders : {stats.totalOrders}</p>

            <p>Total Spent : ₹{stats.totalSpent}</p>

            <p>
                Last Order :{" "}
                {stats.lastOrderDate
                    ? new Date(stats.lastOrderDate).toLocaleDateString()
                    : "No Orders Yet"}
            </p>

            <hr />

            <h2>Order History</h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id}>

                        <h3>{order.items[0].name}</h3>

                        <p>Occasion : {order.occasion}</p>

                        <p>
                            Delivery Date :{" "}
                            {new Date(order.deliveryDate).toLocaleDateString()}
                        </p>

                        <p>
                            Amount : ₹{order.payment.totalAmount}
                        </p>

                        <p>
                            Status : {order.status}
                        </p>

                        <button
                            onClick={() => navigate(`/orders/${order._id}`)}
                        >
                            View Details
                        </button>

                        <hr />

                    </div>
                ))
            )}
        </>
    );
}

export default CustomerProfile;
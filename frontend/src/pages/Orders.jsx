import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Orders() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        API.get("/orders")
            .then((response) => {

                console.log(response.data);

                setOrders(response.data.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    const filteredOrders = orders.filter((order) => {
        const customerName = order.customer.name.toLowerCase();
        const occasion = order.occasion.toLowerCase();
        const search = searchTerm.toLowerCase();
        const matchesSearch = customerName.includes(search) || occasion.includes(search)
        const matchesStatus = statusFilter === "All" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    })

    return (
        <>
            <Sidebar />

            <h1>Orders Page</h1>

            <h2>
                Showing {filteredOrders.length} of {orders.length} orders
            </h2>

            <input
                type="text"
                placeholder="Search by customer or occasion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Inquiry">Inquiry</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
            </select>

            {
                filteredOrders.map((order) => (

                    <div key={order._id}>

                        <h3>
                            {order.occasion}
                        </h3>

                        <p>
                            Customer :{" "}
                            {order.customer.name}
                        </p>

                        <p>
                            Delivery Date :{" "}
                            {new Date(order.deliveryDate).toLocaleDateString()}
                        </p>

                        <p>
                            Delivery Time :{" "}
                            {order.deliveryTime}
                        </p>

                        <p>
                            Order Type :{order.orderType}
                        </p>

                        <p>
                            Amount :₹{order.payment.totalAmount}
                        </p>

                        <p>
                            Status :{" "}
                            {order.status}
                        </p>

                        <button onClick={() => navigate(`/orders/${order._id}`)}>
                            View Details
                        </button>

                        <hr />

                    </div>

                ))
            }

        </>
    );
}

export default Orders;
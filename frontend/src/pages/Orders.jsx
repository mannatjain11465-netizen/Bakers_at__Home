import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Orders() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

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

    return (
        <>
            <Sidebar />

            <h1>Orders Page</h1>

            <h2>
                Total Orders: {orders.length}
            </h2>

            {
                orders.map((order) => (

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
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);
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
        </>
    );
}

export default Orders;
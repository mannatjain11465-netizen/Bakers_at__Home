import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({});

    useEffect(() => {

        API.get("/dashboard/stats")
            .then((response) => {

                setStats(response.data.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (
        <>
            <Sidebar />

            <h1>Dashboard</h1>

            <h2>
                Total Customers : {stats.totalCustomers}
            </h2>

            <h2>
                Total Orders : {stats.totalOrders}
            </h2>

            <h2>
                Pending Orders : {stats.pendingOrders}
            </h2>

            <h2>
                Completed Orders : {stats.completedOrders}
            </h2>

            <h2>
                Total Revenue : ₹{stats.totalRevenue}
            </h2>

            <h2>
                Revenue Received : ₹{stats.revenueReceived}
            </h2>

            <h2>
                Pending Payments : ₹{stats.pendingPayments}
            </h2>

        </>
    );
}

export default Dashboard;
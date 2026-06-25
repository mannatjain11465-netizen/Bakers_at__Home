import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import DashboardCards from "../components/DashboardCards";
import RevenueCards from "../components/RevenueCards";
import UpcomingOrders from "../components/UpcomingOrders";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        API.get("/dashboard")
            .then((response) => {

                console.log(response.data);

                setDashboardData(response.data.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    if (!dashboardData) {
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

            <h1>Dashboard</h1>

            <DashboardCards
                totalCustomers={dashboardData.totalCustomers}
                totalOrders={dashboardData.totalOrders}
                pendingOrders={dashboardData.pendingOrders}
                completedOrders={dashboardData.completedOrders}/>

            <RevenueCards
                totalRevenue={dashboardData.totalRevenue}
                revenueReceived={dashboardData.revenueReceived}
                pendingPayments={dashboardData.pendingPayments}/>

            <UpcomingOrders
                orders={dashboardData.upcomingOrders}/>

            <button
                onClick={() => navigate(`/orders/${order._id}`)}>
                View Details</button>

        </>
    );
}

export default Dashboard;
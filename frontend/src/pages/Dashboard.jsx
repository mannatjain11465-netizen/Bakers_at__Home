import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import DashboardCards from "../components/DashboardCards";
import RevenueCards from "../components/RevenueCards";
import PendingActions from "../components/PendingActions";
import UpcomingOrders from "../components/UpcomingOrders";
import Heatmap from "../components/Heatmap";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    const [heatmapData, setHeatmapData] = useState([]);
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

    useEffect(() => {

        API.get("/heatmap")
            .then((response) => {

                console.log(response.data);

                setHeatmapData(response.data.data);

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
                activeOrders={dashboardData.activeOrders}
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

            <PendingActions 
                inquiryOrders={dashboardData.inquiryOrders}
                pendingPayments={dashboardData.pendingPayments}
                todayOrders = {dashboardData.todayOrders}
                tomorrowOrders={dashboardData.tomorrowOrders}/>

            <Heatmap
                heatmapData={heatmapData}/>

        </>
    );
}

export default Dashboard;
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import DashboardCards from "../components/DashboardCards";
import RevenueCards from "../components/RevenueCards";
import PendingActions from "../components/PendingActions";
import UpcomingOrders from "../components/UpcomingOrders";
import Heatmap from "../components/Heatmap";

function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    const [heatmapData, setHeatmapData] = useState([]);

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

            <Layout>

                <h2>Loading...</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="mb-8">
                <h1 className="text-5xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome back! Here's what's happening in your bakery today.
                </p>

            </div>

            <div className="grid grid-cols-2 gap-6">

                <DashboardCards
                    totalCustomers={dashboardData.totalCustomers}
                    totalOrders={dashboardData.totalOrders}
                    activeOrders={dashboardData.activeOrders}
                    completedOrders={dashboardData.completedOrders}
                />

                <RevenueCards
                    totalRevenue={dashboardData.totalRevenue}
                    revenueReceived={dashboardData.revenueReceived}
                    pendingPayments={dashboardData.pendingPayments}
                />

            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">

                <UpcomingOrders
                    orders={dashboardData.upcomingOrders}
                />

                <PendingActions
                    inquiryOrders={dashboardData.inquiryOrders}
                    pendingPayments={dashboardData.pendingPayments}
                    todayOrders={dashboardData.todayOrders}
                    tomorrowOrders={dashboardData.tomorrowOrders}
                />

            </div>

            <div className="mt-6">

                <Heatmap
                    heatmapData={heatmapData}
                />

            </div>

        </Layout>

    );

}

export default Dashboard;
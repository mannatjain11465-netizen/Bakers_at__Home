import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarOrders from "../components/CalendarOrder";
import API from "../services/api";
import { FiCalendar } from "react-icons/fi";
import "../styles/calendar.css";

function Calendar() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        API.get("/calendar")
            .then((response) => {

                setOrders(response.data.orders);

            })
            .catch((error) => {

                alert("Failed to load calendar.");

            });

    }, []);

    const selectedOrders = orders.filter((order) => {

        return (
            new Date(order.deliveryDate).toDateString() ===
            selectedDate.toDateString()
        );

    });

    return (

        <Layout>

            <div className="mb-8">

                <div className="flex items-center gap-3">

                    <FiCalendar className="text-pink-600 text-4xl" />

                    <div>

                        <h1 className="text-5xl font-bold text-slate-800">
                            Calendar
                        </h1>

                        <p className="text-gray-500 text-lg mt-2">
                            Manage deliveries and bakery workload.
                        </p>

                    </div>

                </div>

            </div>

            <div className="grid xl:grid-cols-3 gap-8">

                <div
                    className="
                        xl:col-span-2
                        bg-white
                        rounded-3xl
                        border
                        border-pink-100
                        shadow-md
                        p-6
                    "
                >

                    <ReactCalendar
                        className="bakery-calendar" 
                        value={selectedDate}
                        onChange={setSelectedDate}
                    />

                </div>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        border
                        border-pink-100
                        shadow-md
                        p-6
                    "
                >

                    <CalendarOrders
                        selectedOrders={selectedOrders}
                        selectedDate={selectedDate}
                    />

                </div>

            </div>

        </Layout>

    );

}

export default Calendar;
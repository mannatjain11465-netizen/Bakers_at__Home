import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarOrders from "../components/CalendarOrder";
import API from "../services/api";

function Calendar() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        API.get("/calendar")
            .then((response) => {

                console.log(response.data);

                setOrders(response.data.orders);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    const selectedOrders = orders.filter((order) => 
        { 
            return ( 
                new Date(order.deliveryDate).toDateString() 
                    === selectedDate.toDateString() 
            ); 
        });

    return (
        <>
            <Sidebar />

            <h1>Calendar</h1>

            <ReactCalendar
                value={selectedDate}
                onChange={setSelectedDate}
            />

            <CalendarOrders
                selectedOrders={selectedOrders}
                selectedDate={selectedDate}/>

        </>
    );
}

export default Calendar;
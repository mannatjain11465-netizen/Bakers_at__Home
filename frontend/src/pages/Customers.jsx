import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        API.get("/customers")
            .then((response) => {

                console.log(response.data);

                setCustomers(response.data.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (
        <>
            <Sidebar />

            <h1>Customers Page</h1>

            <h2>
                Total Customers : {customers.length}
            </h2>

            {
                 customers.map((customer) => (

                    <div key={customer._id}>

                     <h3>
                        {customer.name}
                     </h3>

                     <p>
                        Phone : {customer.phone}
                     </p>

                     <p>
                        Building : {customer.building}
                     </p>

                     <p>
                        Flat Number : {customer.flatNumber}
                     </p>

                     <p>
                        Notes : {customer.notes}
                     </p>

                     <hr />

                    </div>

        ))
    }

        </>
    );
}

export default Customers;
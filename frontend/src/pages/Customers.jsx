import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

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

    const filteredCustomers = customers.filter((customer) => {
        const search = searchTerm.toLowerCase();
        return (
            customer.name.toLowerCase().includes(search) ||
            customer.phone.includes(search) ||
            customer.building.toLowerCase().includes(search)
        );
    });

    return (
        <>
            <Layout>

            <h1>Customers Page</h1>

            <input
                type="text"
                placeholder="Search by name, phone or building..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h2>
                Showing {filteredCustomers.length} of {customers.length} customers
            </h2>

            {
                filteredCustomers.length === 0 ? (

                <p>No customers found.</p>

            ): (
                 filteredCustomers.map((customer) => (

                    <div 
                        key={customer._id}
                        onClick={() => navigate(`/customers/${customer._id}`)}
                    >

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
             )
            }

        </Layout>
        </>
    );
}

export default Customers;
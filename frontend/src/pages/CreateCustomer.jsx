import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import CustomerForm from "../components/CustomerForm";
import { useNavigate } from "react-router-dom";
function CreateCustomer() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        building: "",
        flatNumber: "",
        notes: ""
    });
    const navigate = useNavigate();

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        API.post("/customers", formData)
            .then((response) => {

            console.log(response.data);

            alert("Customer created successfully!");


            navigate(`/customers/${response.data.data._id}`);

        })
            .catch((error) => {

                console.log("Failed to create customer.");

        });

    };

    return (
        <>
            <Layout>

            <CustomerForm 
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                heading= "Create Customer"
                buttonText="Create Customer"
            />
        </Layout>
        </>
    );
}

export default CreateCustomer;
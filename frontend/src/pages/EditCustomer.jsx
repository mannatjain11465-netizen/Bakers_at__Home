import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import CustomerForm from "../components/CustomerForm";
import API from "../services/api";

function EditCustomer() {

    const { customerId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        building: "",
        flatNumber: "",
        notes: ""
    });

    useEffect(() => {

        API.get(`/customers/${customerId}`)
            .then((response) => {

                console.log(response.data);

                setFormData(response.data.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, [customerId]);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        API.put(`/customers/${customerId}`, formData)
            .then((response) => {

                console.log(response.data);

                alert("Customer updated successfully!");

                navigate(`/customers/${customerId}`);

            })
            .catch((error) => {

                console.log(error);

                alert("Failed to update customer.");

            });

    };

    if (!formData.name) {
        return (
            <>
                <Layout>
                <h2>Loading...</h2>
                </Layout>
            </>
        );
    }

    return (
        <>
            <Layout>

            <CustomerForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                heading="Edit Customer"
                buttonText="Update Customer"
            />
        </Layout>
        </>
    );

}

export default EditCustomer;
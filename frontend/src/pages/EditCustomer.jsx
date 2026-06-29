import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import CustomerForm from "../components/CustomerForm";
import API from "../services/api";
import { FiArrowLeft } from "react-icons/fi";

function EditCustomer() {

    const { customerId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

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
                setLoading(false);

            })
            .catch((error) => {

                console.log(error);
                setLoading(false);

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

                alert(
                    error.response?.data?.message ||
                    "Failed to update customer."
                );

            });

    };

    if (loading) {

        return (

            <Layout>

                <div
                    className="
                        flex
                        items-center
                        justify-center
                        h-[60vh]
                        text-2xl
                        font-semibold
                        text-pink-600
                    "
                >
                    Loading...
                </div>

            </Layout>

        );

    }

        return (

        <Layout>

            <div className="max-w-5xl mx-auto">

                <button
                    onClick={() => navigate(`/customers/${customerId}`)}
                    className="
                        flex
                        items-center
                        gap-2
                        text-pink-600
                        hover:text-pink-700
                        font-medium
                        mb-6
                        transition-colors
                    "
                >
                    <FiArrowLeft className="text-lg" />
                    Back to Customer
                </button>

                <div className="mb-8">

                    <h1 className="text-5xl font-bold text-slate-800">
                        Edit Customer
                    </h1>

                    <p className="text-lg text-gray-500 mt-2">
                        Update customer information below.
                    </p>

                </div>

                <CustomerForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading=""
                    buttonText="Update Customer"
                    onCancel={() =>
                        navigate(`/customers/${customerId}`)
                    }
                />

            </div>

        </Layout>

    );

}
export default EditCustomer;
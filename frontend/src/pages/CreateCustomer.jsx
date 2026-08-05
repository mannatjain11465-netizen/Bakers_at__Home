import { useEffect, useState } from "react";
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
    
    const user = JSON.parse(localStorage.getItem("user"));
    const isOwner = user && user.role === "owner";
    
    useEffect(() => {
        if(!isOwner){
            alert("You are not authorized to create customers");
            navigate("/customers");
        }
    }, [isOwner, navigate]);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isOwner) return;
        API.post("/customers", formData)
            .then((response) => {
                alert("Customer created successfully!");
                navigate(`/customers/${response.data.data._id}`);
            })
            .catch((error) => {
                alert("Failed to create customer.");
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
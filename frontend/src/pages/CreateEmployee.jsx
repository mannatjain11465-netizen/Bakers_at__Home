import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";
import API from "../services/api";

function CreateEmployee() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isOwner = user && user.role === "owner";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    useEffect(() => {

        if (!isOwner) {

            alert("You are not authorized to create employees.");

            navigate("/employees");

        }

    }, [isOwner, navigate]);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await API.post("/employees", formData);

            alert("Employee created successfully!");

            navigate("/employees");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create employee."
            );

        }

    };

    return (

        <Layout>

            <EmployeeForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                heading="Create Employee"
                buttonText="Create Employee"
                onCancel={() => navigate("/employees")}
            />

        </Layout>

    );

}

export default CreateEmployee;
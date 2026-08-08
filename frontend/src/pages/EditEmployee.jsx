import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import EmployeeForm from "../components/EmployeeForm";
import API from "../services/api";

import { FiArrowLeft } from "react-icons/fi";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isOwner = user && user.role === "owner";

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {

        if (!isOwner) {

            alert("You are not authorized to edit employees.");
            navigate("/employees");

        }

    }, [isOwner, navigate]);

    useEffect(() => {

        if (!isOwner) return;

        API.get(`/employees/${id}`)
            .then((response) => {

                setFormData({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    phone: response.data.data.phone
                });

                setLoading(false);

            })
            .catch(() => {

                setLoading(false);

                alert("Failed to load employee.");

            });

    }, [id, isOwner]);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await API.put(`/employees/${id}`, {
                name: formData.name,
                phone: formData.phone
            });

            alert("Employee updated successfully!");

            navigate("/employees");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update employee."
            );

        }

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
                    onClick={() => navigate("/employees")}
                    className="
                        flex
                        items-center
                        gap-2
                        text-pink-600
                        hover:text-pink-700
                        font-medium
                        mb-6
                        transition-colors
                        cursor-pointer
                    "
                >
                    <FiArrowLeft className="text-lg" />
                    Back to Employees
                </button>

                <EmployeeForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit Employee"
                    buttonText="Save Changes"
                    showPassword={false}
                    onCancel={() => navigate("/employees")}
                />

            </div>

        </Layout>

    );

}

export default EditEmployee;
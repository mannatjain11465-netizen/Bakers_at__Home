import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import API from "../services/api";

import {
    FiArrowLeft,
    FiUser,
    FiMail,
    FiPhone,
    FiShield,
    FiCalendar,
    FiEdit,
    FiTrash2
} from "react-icons/fi";

function EmployeeProfile() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        API.get(`/employees/${id}`)
            .then((response) => {

                setEmployee(response.data.data);

                setLoading(false);

            })
            .catch(() => {

                alert("Failed to load employee.");

                setLoading(false);

            });

    }, [id]);

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/employees/${id}`);

            alert("Employee deleted successfully!");

            navigate("/employees");

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete employee."
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

    if (!employee) {

        return (

            <Layout>

                <div className="text-center mt-20 text-red-500">

                    Employee not found.

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
                        cursor-pointer
                    "
                >
                    <FiArrowLeft />

                    Back to Employees

                </button>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        border
                        border-pink-100
                        p-10
                    "
                >

                    <div className="flex justify-between items-start">

                        <div>

                            <h1
                                className="
                                    text-4xl
                                    font-bold
                                    text-gray-800
                                "
                            >
                                {employee.name}
                            </h1>

                            <p className="text-gray-500 mt-2">

                                Employee Profile

                            </p>

                        </div>

                        <div className="flex gap-3">

                            <button
                                onClick={() =>
                                    navigate(`/employees/${id}/edit`)
                                }
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-pink-500
                                    hover:bg-pink-600
                                    text-white
                                    px-5
                                    py-3
                                    rounded-xl
                                    font-medium
                                    transition
                                    cursor-pointer
                                "
                            >

                                <FiEdit />

                                Edit

                            </button>

                            <button
                                onClick={handleDelete}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-red-500
                                    hover:bg-red-600
                                    text-white
                                    px-5
                                    py-3
                                    rounded-xl
                                    font-medium
                                    transition
                                    cursor-pointer
                                "
                            >

                                <FiTrash2 />

                                Delete

                            </button>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-8 mt-10">

                        <div
                            className="
                                bg-pink-50
                                rounded-2xl
                                p-6
                            "
                        >

                            <div className="flex items-center gap-3">

                                <FiMail className="text-pink-500 text-xl" />

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Email

                                    </p>

                                    <p className="font-semibold">

                                        {employee.email}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div
                            className="
                                bg-pink-50
                                rounded-2xl
                                p-6
                            "
                        >

                            <div className="flex items-center gap-3">

                                <FiPhone className="text-pink-500 text-xl" />

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Phone

                                    </p>

                                    <p className="font-semibold">

                                        {employee.phone}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div
                            className="
                                bg-pink-50
                                rounded-2xl
                                p-6
                            "
                        >

                            <div className="flex items-center gap-3">

                                <FiShield className="text-pink-500 text-xl" />

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Role

                                    </p>

                                    <p className="font-semibold capitalize">

                                        {employee.role}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div
                            className="
                                bg-pink-50
                                rounded-2xl
                                p-6
                            "
                        >

                            <div className="flex items-center gap-3">

                                <FiCalendar className="text-pink-500 text-xl" />

                                <div>

                                    <p className="text-gray-500 text-sm">

                                        Joined On

                                    </p>

                                    <p className="font-semibold">

                                        {new Date(employee.createdAt).toLocaleDateString()}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default EmployeeProfile;
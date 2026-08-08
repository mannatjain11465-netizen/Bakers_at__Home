import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FiArrowLeft,
    FiUser,
    FiMail,
    FiPhone,
    FiEdit,
    FiTrash2
} from "react-icons/fi";
import Layout from "../components/Layout";
import API from "../services/api";

function SingleEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isOwner = user && user.role === "owner";

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        API.get(`/employees/${id}`)
            .then((response) => {

                setEmployee(response.data.data);

            })
            .catch(() => {

                alert("Failed to load employee.");

                navigate("/employees");

            });

    }, [id, navigate]);

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) return;

        try {

            await API.delete(`/employees/${id}`);

            alert("Employee deleted successfully!");

            navigate("/employees");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete employee."
            );

        }

    };

    if (!employee) {

        return (

            <Layout>

                <div
                    className="
                        flex
                        justify-center
                        items-center
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

                            <div
                                className="
                                    w-20
                                    h-20
                                    rounded-full
                                    bg-pink-100
                                    flex
                                    items-center
                                    justify-center
                                    mb-6
                                "
                            >

                                <FiUser
                                    size={40}
                                    className="text-pink-600"
                                />

                            </div>

                            <h1 className="text-4xl font-bold text-slate-800">
                                {employee.name}
                            </h1>

                            <span
                                className="
                                    inline-block
                                    mt-3
                                    px-4
                                    py-1
                                    rounded-full
                                    bg-pink-100
                                    text-pink-600
                                    font-semibold
                                "
                            >
                                {employee.role}
                            </span>

                        </div>

                        {

                            isOwner && (

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            navigate(`/employees/${id}/edit`)
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            px-5
                                            py-3
                                            rounded-xl
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
                                            bg-red-600
                                            hover:bg-red-700
                                            text-white
                                            px-5
                                            py-3
                                            rounded-xl
                                            cursor-pointer
                                        "
                                    >

                                        <FiTrash2 />

                                        Delete

                                    </button>

                                </div>

                            )

                        }

                    </div>

                    <div className="mt-10 grid md:grid-cols-2 gap-6">

                        <div
                            className="
                                bg-pink-50
                                rounded-2xl
                                p-5
                            "
                        >

                            <div className="flex items-center gap-3 mb-2">

                                <FiMail className="text-pink-600" />

                                <h2 className="font-semibold">
                                    Email
                                </h2>

                            </div>

                            <p className="text-gray-700">
                                {employee.email}
                            </p>

                        </div>

                        <div
                            className="
                                bg-pink-50
                                rounded-2xl
                                p-5
                            "
                        >

                            <div className="flex items-center gap-3 mb-2">

                                <FiPhone className="text-pink-600" />

                                <h2 className="font-semibold">
                                    Phone
                                </h2>

                            </div>

                            <p className="text-gray-700">
                                {employee.phone}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default SingleEmployee;
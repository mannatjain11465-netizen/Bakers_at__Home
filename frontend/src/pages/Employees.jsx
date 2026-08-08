import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiUser,
    FiMail,
    FiPhone,
    FiArrowRight,
    FiSearch,
} from "react-icons/fi";

import Layout from "../components/Layout";
import API from "../services/api";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isOwner = user && user.role === "owner";

    useEffect(() => {

        API.get("/employees")
            .then((response) => {

                setEmployees(response.data.data);

            })
            .catch(() => {

                alert("Failed to load employees.");

            });

    }, []);

    const filteredEmployees = employees.filter((employee) => {

        const search = searchTerm.toLowerCase();

        return (

            employee.name.toLowerCase().includes(search) ||

            employee.email.toLowerCase().includes(search) ||

            employee.phone.includes(search)

        );

    });

    return (

        <Layout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-5xl font-bold text-slate-800">
                        Employees
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Manage your bakery staff.
                    </p>

                </div>

                {
                    isOwner && (

                        <button
                            onClick={() => navigate("/create-employee")}
                            className="
                                bg-pink-600
                                hover:bg-pink-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                shadow-md
                                transition-all
                                cursor-pointer
                            "
                        >
                            + Add Employee
                        </button>

                    )
                }

            </div>

            <p className="text-gray-500 mb-6">

                Showing{" "}

                <span className="font-semibold text-slate-800">

                    {filteredEmployees.length}

                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-800">

                    {employees.length}

                </span>

                {" "}employees

            </p>

            <div className="bg-white rounded-2xl shadow-md p-5 mb-8">

                <div className="relative">

                    <FiSearch
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                            text-lg
                        "
                    />

                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="
                            w-full
                            pl-12
                            pr-4
                            py-3
                            rounded-xl
                            border
                            border-pink-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-pink-300
                        "
                    />

                </div>

            </div>

            <div className="space-y-5">

                {
                    filteredEmployees.length === 0 ? (

                        <div
                            className="
                                bg-white
                                rounded-2xl
                                shadow-md
                                border
                                border-pink-100
                                p-12
                                text-center
                            "
                        >

                            <FiUser
                                size={48}
                                className="mx-auto text-pink-300 mb-4"
                            />

                            <h2 className="text-2xl font-semibold text-slate-700">
                                No Employees Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Try changing your search or add a new employee.
                            </p>

                        </div>

                    ) : (

                        filteredEmployees.map((employee) => (

                            <div
                                key={employee._id}
                                onClick={() =>
                                    navigate(`/employees/${employee._id}`)
                                }
                                className="
                                    bg-white
                                    rounded-2xl
                                    shadow-md
                                    border
                                    border-pink-100
                                    hover:border-pink-300
                                    px-6
                                    py-5
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                    transition-all
                                    duration-300
                                    cursor-pointer
                                "
                            >

                                <div className="flex justify-between items-center">

                                    <div className="flex gap-5">

                                        <div
                                            className="
                                                w-14
                                                h-14
                                                rounded-xl
                                                bg-pink-50
                                                border
                                                border-pink-200
                                                flex
                                                items-center
                                                justify-center
                                                shrink-0
                                            "
                                        >

                                            <FiUser
                                                size={26}
                                                className="text-pink-600"
                                            />

                                        </div>

                                        <div>

                                            <h2 className="text-2xl font-bold text-slate-800">
                                                {employee.name}
                                            </h2>

                                            <div className="flex items-center gap-2 mt-2 text-gray-600">

                                                <FiMail
                                                    size={16}
                                                    className="text-pink-500"
                                                />

                                                <span>
                                                    {employee.email}
                                                </span>

                                            </div>

                                            <div className="flex items-center gap-2 mt-3 text-gray-600">

                                                <FiPhone
                                                    size={16}
                                                    className="text-pink-500"
                                                />

                                                <span>
                                                    {employee.phone}
                                                </span>

                                            </div>

                                            <div className="mt-4">

                                                <span
                                                    className="
                                                        inline-block
                                                        bg-pink-50
                                                        text-pink-600
                                                        border
                                                        border-pink-200
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-sm
                                                        font-semibold
                                                    "
                                                >
                                                    {employee.role}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            navigate(`/employees/${employee._id}`);

                                        }}
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            bg-pink-600
                                            hover:bg-pink-700
                                            text-white
                                            px-5
                                            py-2.5
                                            rounded-xl
                                            font-semibold
                                            transition-all
                                            cursor-pointer
                                        "
                                    >

                                        View Profile

                                        <FiArrowRight size={18} />

                                    </button>

                                </div>

                            </div>

                        ))

                    )
                }

            </div>

        </Layout>

    );

}

export default Employees;
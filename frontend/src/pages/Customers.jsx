import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiUser,
    FiPhone,
    FiMapPin,
    FiArrowRight,
    FiSearch,
    FiHome,
    FiFileText,
} from "react-icons/fi";

import Layout from "../components/Layout";
import API from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        API.get("/customers")
            .then((response) => {

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

        <Layout>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-5xl font-bold text-slate-800">
                        Customers
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Manage all your bakery customers.
                    </p>

                </div>

                <button
                    onClick={() => navigate("/create-customer")}
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
                    + New Customer
                </button>

            </div>

            <p className="text-gray-500 mb-6">

                Showing{" "}

                <span className="font-semibold text-slate-800">
                    {filteredCustomers.length}
                </span>

                {" "}of{" "}

                <span className="font-semibold text-slate-800">
                    {customers.length}
                </span>

                {" "}customers

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
                        placeholder="Search by name, phone or building..."
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

                {filteredCustomers.length === 0 ? (

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
                            No Customers Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your search or add a new customer.
                        </p>

                    </div>

                ) : (

                    filteredCustomers.map((customer) => (

                        <div
                            key={customer._id}
                            onClick={() => navigate(`/customers/${customer._id}`)}
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

                                <div className="flex gap-5  ">

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
                                            {customer.name}
                                        </h2>

                                        <div className="flex items-center gap-2 mt-2 text-gray-600">

                                            <FiPhone
                                                size={16}
                                                className="text-pink-500"
                                            />

                                            <a
                                                href={`tel:${customer.phone}`}
                                                className="hover:text-pink-600">
                                                    {customer.phone}
                                            </a>

                                        </div>

                                        <div className="flex items-start gap-2 mt-3 text-gray-600">

                                            <FiHome
                                                size={16}
                                                className="text-pink-500 mt-1"
                                            />

                                            <div>

                                                <p className="font-medium">
                                                    {customer.building}
                                                </p>

                                                {
                                                    customer.flatNumber && (
                                                        <p className="text-sm text-gray-500">
                                                            Flat {customer.flatNumber}
                                                        </p>
                                                    )
                                                }

                                            </div>

                                        </div>

                                                                                {
                                            customer.notes && (

                                                <div
                                                    className="
                                                        flex
                                                        items-start
                                                        gap-2
                                                        mt-4
                                                        bg-pink-50
                                                        border
                                                        border-pink-100
                                                        rounded-xl
                                                        px-4
                                                        py-3
                                                    "
                                                >

                                                    <FiFileText
                                                        size={16}
                                                        className="text-pink-500 mt-1 shrink-0"
                                                    />

                                                    <div>

                                                        <p className="text-xs uppercase tracking-wide text-pink-500 font-semibold">
                                                            Notes
                                                        </p>

                                                        <p className="text-gray-600 mt-1">
                                                            {customer.notes}
                                                        </p>

                                                    </div>

                                                </div>

                                            )

                                        }

                                    </div>

                                </div>

                                <button
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        navigate(`/customers/${customer._id}`);

                                    }}
                                    className="
                                        flex
                                        self-center
                                        gap-2
                                        self-center
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

                )}

            </div>

        </Layout>

    );

}

export default Customers;
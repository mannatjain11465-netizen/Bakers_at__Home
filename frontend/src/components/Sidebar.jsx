import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import {
    FiHome,
    FiPackage,
    FiUsers,
    FiCalendar
} from "react-icons/fi";

function Sidebar() {

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: <FiHome size={20} />
        },
        {
            name: "Orders",
            path: "/orders",
            icon: <FiPackage size={20} />
        },
        {
            name: "Customers",
            path: "/customers",
            icon: <FiUsers size={20} />
        },
        {
            name: "Calendar",
            path: "/calendar",
            icon: <FiCalendar size={20} />
        }
    ];

    return (

        <div
            className="
                w-72
                h-screen
                sticky
                top-0
                bg-white
                border-r
                border-pink-100
                shadow-md
            "
        >

            {/* Logo */}

            <div className="py-8 flex justify-center border-b border-pink-100">

                <img
                    src={logo}
                    alt="Bakers_at_Home Logo"
                    className="w-24 h-24 object-contain"
                />

            </div>

            {/* Navigation */}

            <div className="px-4 py-6">

                <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                    Navigation
                </p>

                <div className="flex flex-col gap-2">

                    {menuItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-lg
                                transition-all
                                duration-200
                                ease-in-out
                                ${
                                    location.pathname === item.path
                                        ? "bg-pink-100 text-pink-600 font-semibold border-l-4 border-pink-500"
                                        : "text-gray-700 hover:bg-pink-50 hover:text-pink-600 hover:translate-x-1"
                                }
                            `}
                        >

                            {item.icon}

                            <span>{item.name}</span>

                        </Link>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Sidebar;
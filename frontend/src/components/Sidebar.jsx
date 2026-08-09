import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiPackage,
    FiUsers,
    FiCalendar,
    FiLogOut,
    FiUserCheck,
} from "react-icons/fi";

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const isOwner = user?.role === "owner";

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FiHome size={20} />,
        },
        {
            name: "Orders",
            path: "/orders",
            icon: <FiPackage size={20} />,
        },
        {
            name: "Customers",
            path: "/customers",
            icon: <FiUsers size={20} />,
        },
        {
            name: "Calendar",
            path: "/calendar",
            icon: <FiCalendar size={20} />,
        },

        ...(isOwner
            ? [
                  {
                      name: "Employees",
                      path: "/employees",
                      icon: <FiUserCheck size={20} />,
                  },
              ]
            : []),
    ];

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div
            className="
                relative
                w-72
                h-screen
                sticky
                top-0
                bg-white
                border-r
                border-pink-100
                shadow-md
                flex
                flex-col
            "
        >

            <div className="py-8 flex justify-center border-b border-pink-100">

                <img
                    src={logo}
                    alt="Bakers_at_Home Logo"
                    className="w-24 h-24 object-contain"
                />

            </div>

            <div className="flex-1 px-4 py-6">

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

            <div className="p-4 border-t border-pink-100">

                <button
                    onClick={handleLogout}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-lg
                        text-red-500
                        hover:bg-red-50
                        hover:text-red-600
                        transition-all
                        duration-200
                    "
                >

                    <FiLogOut size={20} />

                    <span className="font-medium">
                        Logout
                    </span>

                </button>

            </div>

        </div>

    );

}

export default Sidebar;
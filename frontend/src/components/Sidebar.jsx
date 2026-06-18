import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div>

            <h2>Bakers_at_Home</h2>

            <Link to="/">
                Dashboard
            </Link>

            <br />

            <Link to="/orders">
                Orders
            </Link>

            <br />

            <Link to="/customers">
                Customers
            </Link>

            <br />

            <Link to="/calendar">
                Calendar
            </Link>

        </div>
    );
}

export default Sidebar;
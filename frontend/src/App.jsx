import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Calendar from "./pages/Calendar";
import CreateOrder from "./pages/CreateOrder";
import EditOrder from "./pages/EditOrder";
import SingleOrder from "./pages/SingleOrder";
import CreateCustomer from "./pages/CreateCustomer";
import CustomerProfile from "./pages/CustomerProfile";
import EditCustomer from "./pages/EditCustomer";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeProfile from "./pages/EmployeeProfile";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-customer"
                    element={
                        <ProtectedRoute>
                            <CreateCustomer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customers/:customerId"
                    element={
                        <ProtectedRoute>
                            <CustomerProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customers/:customerId/edit"
                    element={
                        <ProtectedRoute>
                            <EditCustomer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-order"
                    element={
                        <ProtectedRoute>
                            <CreateOrder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders/:orderId"
                    element={
                        <ProtectedRoute>
                            <SingleOrder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders/:orderId/edit"
                    element={
                        <ProtectedRoute>
                            <EditOrder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        <ProtectedRoute>
                            <Calendar />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Employees />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-employee"
                    element={
                        <ProtectedRoute>
                            <CreateEmployee />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/:id/edit"
                    element={
                        <ProtectedRoute>
                            <EditEmployee />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/:id"
                    element={
                        <ProtectedRoute>
                            <EmployeeProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/:id"
                    element={
                        <ProtectedRoute>
                            <EmployeeProfile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
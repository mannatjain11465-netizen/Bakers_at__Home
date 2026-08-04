import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Calendar from "./pages/Calendar";
import CreateOrder from "./pages/CreateOrder";
import CreateCustomer from "./pages/CreateCustomer";
import SingleOrder from "./pages/SingleOrder";
import EditOrder from "./pages/EditOrder";
import CustomerProfile from "./pages/CustomerProfile";
import EditCustomer from "./pages/EditCustomer";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}

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
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
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
                    path="/create-order"
                    element={
                        <ProtectedRoute>
                            <CreateOrder />
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

            </Routes>

        </BrowserRouter>
    );
}

export default App;
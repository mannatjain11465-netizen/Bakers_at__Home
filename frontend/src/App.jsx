import { BrowserRouter, Routes, Route } from "react-router-dom";

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

        <Route path="/" element={<Dashboard />} />

        <Route path="/customers" element={<Customers />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/create-order" element={<CreateOrder />} />

        <Route path="/create-customer" element={<CreateCustomer />} />

        <Route path="/orders/:orderId" element={<SingleOrder />} />

        <Route path= "/orders/:orderId/edit" element={<EditOrder/>}/>

        <Route path= "/customers/:customerId" element={<CustomerProfile/>}/>

        <Route path="/customers/:customerId/edit" element={<EditCustomer />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
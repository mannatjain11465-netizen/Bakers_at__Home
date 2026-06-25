import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import OrderForm from "../components/OrderForm";
import API from "../services/api";

function EditOrder(){
    const {orderId} = useParams();
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const customerResponse = await API.get("/customers");
                setCustomers(customerResponse.data.data);
                const orderResponse = await API.get(`/orders/${orderId}`);
                setFormData(orderResponse.data.data);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();
    }, [orderId]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleCelebrantChange = (event) => {
        setFormData({
            ...formData,
            celebrant: {
                ...formData.celebrant,
                [event.target.name]: event.target.value
            }
        });
    };

    const handleItemChange = (event) => {
        let value = event.target.value;
        if(
            event.target.name === "quantity" ||
            event.target.name === "weight" ||
            event.target.name === "unitPrice"
        ){
            value = value === "" ? "" : Number(value);
        }
    setFormData({
        ...formData,
        items: [
                {
                    ...formData.items[0],
                    [event.target.name]: value
                }
            ]
        });
};

    const handlePaymentChange = (e) => {
        const updatedPayment = {
            ...formData.payment,
            [e.target.name]: e.target.value
        };

        updatedPayment.remainingAmount = 
        Number(updatedPayment.totalAmount)-
        Number(updatedPayment.advancePaid);

        setFormData({
            ...formData,
            payment: updatedPayment
        });
    };

    const handleSubmit =async (event) => {
        event.preventDefault();
        const selectedCustomer = customers.find(
            (customer) => customer._id === formData.customer
        );
        let address = "";
        if (formData.orderType === "Delivery") {
            if(!selectedCustomer){
                alert("Please select a customer");
                return;
            }
            if (formData.deliveryAddressType === "Home") {
                address = `${selectedCustomer.building}, Flat ${selectedCustomer.flatNumber}`;
            } 
            else {
                address = formData.deliveryAddress;
            }
        }
        const payload = {
            ...formData,
            address: address
        };
        try{
            await API.put(`/orders/${orderId}`,payload);
            alert("Order updated successfully");
            navigate(`/orders/${orderId}`);
        }
        catch(error){
            console.log(error.response?.data || error);
            alert("Failed to update Order");
        }
    };

    if(!formData){
        return(
            <>
            <Sidebar/>
            <h1>Loading...</h1>
            </>
        )
    }

    return (
        <>
                <Sidebar/>
                <OrderForm
                    formData={formData}
                    customers={customers}
                    handleChange={handleChange}
                    handleCelebrantChange={handleCelebrantChange}
                    handleItemChange={handleItemChange}
                    handlePaymentChange={handlePaymentChange}
                    handleSubmit={handleSubmit}
                    heading="Edit Order"
                    buttonText="Save Changes"
                />
            </>
    )

}
export default EditOrder;
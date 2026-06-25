import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import OrderForm from "../components/OrderForm";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";

function CreateOrder() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedCustomerId = searchParams.get("customer");
    const initialFormData = {
        customer: "",

        occasion: "",

        celebrant: {
            name: "",
            relation: "",
            gender: "",
            age: ""
        },

        deliveryDate: "",

        deliveryTime: "",

        orderType: "Pickup",

        deliveryAddressType: "Home",
        deliveryAddress: "",

        items: [
        {
            category: "",
            name: "",
            quantity: 1,
            unit: "",
            weight: "",
            flavour: "",
            unitPrice: ""
        }
        ],

        payment: {
            totalAmount: "",
            advancePaid: "",
            remainingAmount: "",
            paymentMethod: "Cash",
            paymentStatus: "Pending"
        },

        status: "Inquiry",

        discussionNotes: ""
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if(selectedCustomerId){
            setFormData((prev) => ({
                ...prev,
                customer: selectedCustomerId
            }));
        }
    }, [selectedCustomerId])

    useEffect(() => {
        API.get("/customers")
            .then((response) => {
                setCustomers(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
        if(
            formData.orderType==="Delivery" && !selectedCustomer
        ){
            alert("Please select a customer")
            return;
        }
        if (formData.orderType === "Delivery") {
            if (formData.deliveryAddressType === "Home") {
                address = `${selectedCustomer.building}, Flat ${selectedCustomer.flatNumber}`;
            } else {
                address = formData.deliveryAddress;
            }
        }
        const payload = {
            ...formData,
            address: address
        };
        try{
            const response = await API.post("/orders", payload);
            setFormData({
                ...initialFormData,
                customer: selectedCustomerId || ""
            });
            alert("Order created successfully!");
            navigate(`/orders/${response.data.data._id}`);
        }
        catch(error){
            console.log(error.response.data);
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <Sidebar />

            <OrderForm 
                formData={formData}
                customers={customers}
                handleChange={handleChange}
                handleCelebrantChange={handleCelebrantChange}
                handleItemChange={handleItemChange}
                handlePaymentChange={handlePaymentChange}
                handleSubmit={handleSubmit}
                heading="Create Order"          
                buttonText="Create Order"
            />
        </>
    );
}

export default CreateOrder;
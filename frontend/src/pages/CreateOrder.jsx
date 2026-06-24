import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

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
            setFormData(initialFormData);
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

            <h1>Create Order</h1>

            <form onSubmit={handleSubmit}>
                <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Customer
                    </option>

                    {customers.map((customer) => (
                        <option
                            key={customer._id}
                            value={customer._id}
                        >
                            {customer.name}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <input
                    type="text"
                    name="occasion"
                    placeholder="Occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="name"
                    placeholder="Celebrant Name"
                    value={formData.celebrant.name}
                    onChange={handleCelebrantChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="relation"
                    placeholder="Relation"
                    value={formData.celebrant.relation}
                    onChange={handleCelebrantChange}
                />

                <br />
                <br />

                <select
                    name="gender"
                    value={formData.celebrant.gender}
                    onChange={handleCelebrantChange}
                >
                    <option value="">
                        Select Gender
                    </option>

                    <option value="Boy">
                        Boy
                    </option>

                    <option value="Girl">
                        Girl
                    </option>
                </select>

                <br />
                <br />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.celebrant.age}
                    onChange={handleCelebrantChange}
                />

                <br />
                <br />

                <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="deliveryTime"
                    placeholder="Delivery Time"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                />

                <br />
                <br />

                <select
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleChange}
                >
                    <option value="Pickup">
                        Pickup
                    </option>

                    <option value="Delivery">
                        Delivery
                    </option>
                </select>

                <br/>
                <br/>

                    {
                        formData.orderType === "Delivery" && (
                            <>
                            <h2>Delivery Address</h2>
                            <select
                                name="deliveryAddressType"
                                value={formData.deliveryAddressType}
                                onChange={handleChange}
                            >
                                <option value="Home">
                                    Home
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                                <br/>
                                <br/>
                            </>
                        )
                    }

                    <br/>
                    <br/>

                    {
                        formData.orderType === "Delivery" && formData.deliveryAddressType === "Other" && (
                            <>
                            <textarea
                                name="deliveryAddress"
                                placeholder="Delivery Address"
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                            />
                            <br/>
                            <br/>
                            </>
                        )
                    }


                <br/>
                <br/>

                <h2>Item Details</h2>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.items[0].category}
                    onChange={handleItemChange}
                />
                <br/>
                <br/>

                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    value={formData.items[0].name}  
                    onChange={handleItemChange}
                />

                <br/>
                <br/>

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.items[0].quantity}
                    onChange={handleItemChange}
                />

                <br/>
                <br/>

                <select
                    name="unit"
                    value={formData.items[0].unit}
                    onChange={handleItemChange}
                >
                    <option value="">
                        Select Unit
                    </option>

                    <option value="cake">
                        Cake
                    </option>

                    <option value="box">
                        Box
                    </option>
                    
                    <option value="jar">
                        Jar
                    </option>

                    <option value="piece">
                        Piece
                    </option>
                </select>

                <br/>
                <br/>

                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (in kg)"
                    value={formData.items[0].weight}
                    onChange={handleItemChange}
                />

                <br/>
                <br/>

                <input
                    type="text"
                    name="flavour"
                    placeholder="Flavour"
                    value={formData.items[0].flavour}
                    onChange={handleItemChange}
                />

                <br/>
                <br/>

                <input
                    type="number"
                    name="unitPrice"
                    placeholder="Unit Price"
                    value={formData.items[0].unitPrice}
                    onChange={handleItemChange}
                />

                <br />
                <br />

                <h2>Payment Details</h2>
                <input
                    type="number"
                    name="totalAmount"
                    placeholder="Total Amount"
                    value={formData.payment.totalAmount}
                    onChange={handlePaymentChange}
                />

                <br />
                <br />

                <input
                    type="number"
                    name="advancePaid"
                    placeholder="Advance Paid"
                    value={formData.payment.advancePaid}
                    onChange={handlePaymentChange}
                />

                <br />
                <br />

               <h3>
                    Remaining Amount: ₹{formData.payment.remainingAmount}
                </h3>

                <br />
                <br />
                <select
                    name="paymentMethod"
                    value={formData.payment.paymentMethod}
                    onChange={handlePaymentChange}
                >
                    <option value="Cash">
                        Cash
                    </option>
                    <option value="Google Pay">
                        Google Pay
                    </option>
                </select>

                <br />
                <br />

                <select
                    name="paymentStatus"
                    value={formData.payment.paymentStatus}
                    onChange={handlePaymentChange}
                >
                    <option value="Pending">
                        Pending
                    </option>
                    <option value="Partially Paid">
                        Partially Paid
                    </option>
                    <option value="Paid">
                        Paid
                    </option>
                </select>

                <br />
                <br />

                <h2>Order Status</h2>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Inquiry">
                        Inquiry
                    </option>
                    <option value="Discussion">
                        Discussion
                    </option>
                    <option value="Confirmed">
                        Confirmed
                    </option>
                    <option value="In Progress">
                        In Progress
                    </option>
                    <option value="Ready">
                        Ready
                    </option>
                    <option value="Delivered">
                        Delivered
                    </option>
                </select>

                <br />
                <br />

                <h2>Discussion Notes</h2>
                <textarea
                    name="discussionNotes"
                    placeholder="Discussion Notes"
                    value={formData.discussionNotes}
                    onChange={handleChange}
                />

                <br></br>
                <button type="submit">
                    Create Order
                </button>
            </form>
        </>
    );
}

export default CreateOrder;
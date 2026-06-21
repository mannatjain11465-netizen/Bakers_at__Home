import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function CreateOrder() {
    const [customers, setCustomers] = useState([]);

    const [formData, setFormData] = useState({
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

        orderType: "",

        items: [
        {
            category: "",
            name: "",
            quantity: "",
            unit: "",
            weight: "",
            flavour: "",
            unitPrice: ""
        }
        ]
    });

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

    setFormData({

        ...formData,

        items: [
                {
                    ...formData.items[0],

                    [event.target.name]: event.target.value
                }
            ]

        });

};

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formData);
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
                    <option value="">
                        Select Order Type
                    </option>

                    <option value="Pickup">
                        Pickup
                    </option>

                    <option value="Delivery">
                        Delivery
                    </option>
                </select>

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

                <button type="submit">
                    Create Order
                </button>
            </form>
        </>
    );
}

export default CreateOrder;
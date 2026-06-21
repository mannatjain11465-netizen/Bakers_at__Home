import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function CreateCustomer() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        building: "",
        flatNumber: "",
        notes: ""
    });

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        API.post("/customers", formData)
            .then((response) => {

            console.log(response.data);

            setFormData({
                name: "",
                phone: "",
                building: "",
                flatNumber: "",
                notes: ""
            });

        })
            .catch((error) => {

                console.log(error);

        });

    };

    return (
        <>
            <Sidebar />

            <h1>Create Customer</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Customer Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="building"
                    placeholder="Building"
                    value={formData.building}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="flatNumber"
                    placeholder="Flat Number"
                    value={formData.flatNumber}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit">
                    Create Customer
                </button>

            </form>

        </>
    );
}

export default CreateCustomer;
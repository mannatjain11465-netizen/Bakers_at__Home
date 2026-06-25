function CustomerForm({
    formData,
    handleChange,
    handleSubmit,
    heading,
    buttonText
}) {
    return (
        <>
            <h1>{heading}</h1>

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
                    {buttonText}
                </button>

            </form>
        </>
    );
}

export default CustomerForm;
import {
    FiUser,
    FiGift,
    FiTruck,
    FiPackage,
    FiDollarSign,
    FiFileText
} from "react-icons/fi";

function OrderForm({
    formData,
    customers,
    handleChange,
    handleCelebrantChange,
    handleItemChange,
    handlePaymentChange,
    handleSubmit,
    heading,
    buttonText,
}) {

    const inputStyle = `
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-pink-100
        focus:outline-none
        focus:ring-2
        focus:ring-pink-300
    `;

    return (

        <>

            <div className="mb-8">

                <h1 className="text-5xl font-bold text-slate-800">
                    {heading}
                </h1>

                <p className="text-gray-500 mt-2 text-lg">
                    Fill in the order details below.
                </p>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >

                <div className="grid grid-cols-2 gap-6">

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <FiUser
                                size={24}
                                className="text-pink-600"
                            />

                            <h2 className="text-2xl font-bold text-slate-800">
                                Customer Information
                            </h2>

                        </div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Customer *
                        </label>

                        <select
                            name="customer"
                            value={formData.customer}
                            onChange={handleChange}
                            className={inputStyle}
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

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Occasion *
                        </label>

                        <input
                            type="text"
                            name="occasion"
                            placeholder="Birthday, Anniversary..."
                            value={formData.occasion}
                            onChange={handleChange}
                            className={inputStyle}
                        />

                    </div>

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <FiGift
                                size={24}
                                className="text-pink-600"
                            />

                            <h2 className="text-2xl font-bold text-slate-800">
                                Celebration Details
                            </h2>

                        </div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Celebrant Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Celebrant Name"
                            value={formData.celebrant.name}
                            onChange={handleCelebrantChange}
                            className={inputStyle}
                        />

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Relation
                        </label>

                        <input
                            type="text"
                            name="relation"
                            placeholder="Son, Daughter, Friend..."
                            value={formData.celebrant.relation}
                            onChange={handleCelebrantChange}
                            className={inputStyle}
                        />

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={formData.celebrant.gender}
                                    onChange={handleCelebrantChange}
                                    className={inputStyle}
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

                            </div>

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Age
                                </label>

                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={formData.celebrant.age}
                                    onChange={handleCelebrantChange}
                                    className={inputStyle}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <FiTruck
                                size={24}
                                className="text-pink-600"
                            />

                            <h2 className="text-2xl font-bold text-slate-800">
                                Delivery Details
                            </h2>

                        </div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Delivery Date
                        </label>

                        <input
                            type="date"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            className={inputStyle}
                        />

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Delivery Time
                        </label>

                        <input
                            type="text"
                            name="deliveryTime"
                            placeholder="e.g. 6:30 PM"
                            value={formData.deliveryTime}
                            onChange={handleChange}
                            className={inputStyle}
                        />

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Order Type
                        </label>

                        <select
                            name="orderType"
                            value={formData.orderType}
                            onChange={handleChange}
                            className={inputStyle}
                        >

                            <option value="Pickup">
                                Pickup
                            </option>

                            <option value="Delivery">
                                Delivery
                            </option>

                        </select>

                        {
                            formData.orderType === "Delivery" && (

                                <>

                                    <label className="block mt-6 mb-2 font-medium text-gray-700">
                                        Delivery Address Type
                                    </label>

                                    <select
                                        name="deliveryAddressType"
                                        value={formData.deliveryAddressType}
                                        onChange={handleChange}
                                        className={inputStyle}
                                    >

                                        <option value="Home">
                                            Home
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </>

                            )
                        }

                        {
                            formData.orderType === "Delivery" &&
                            formData.deliveryAddressType === "Other" && (

                                <>

                                    <label className="block mt-6 mb-2 font-medium text-gray-700">
                                        Delivery Address
                                    </label>

                                    <textarea
                                        name="deliveryAddress"
                                        placeholder="Enter delivery address..."
                                        value={formData.deliveryAddress}
                                        onChange={handleChange}
                                        rows={4}
                                        className={inputStyle}
                                    />

                                </>

                            )
                        }

                    </div>

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <FiPackage
                                size={24}
                                className="text-pink-600"
                            />

                            <h2 className="text-2xl font-bold text-slate-800">
                                Item Details
                            </h2>

                        </div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            placeholder="Cake, Brownie..."
                            value={formData.items[0].category}
                            onChange={handleItemChange}
                            className={inputStyle}
                        />

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Item Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Chocolate Truffle Cake"
                            value={formData.items[0].name}
                            onChange={handleItemChange}
                            className={inputStyle}
                        />

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.items[0].quantity}
                                    onChange={handleItemChange}
                                    className={inputStyle}
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Unit
                                </label>

                                <select
                                    name="unit"
                                    value={formData.items[0].unit}
                                    onChange={handleItemChange}
                                    className={inputStyle}
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

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Weight
                                </label>

                                <input
                                    type="number"
                                    name="weight"
                                    placeholder="1.5"
                                    value={formData.items[0].weight}
                                    onChange={handleItemChange}
                                    className={inputStyle}
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Flavour
                                </label>

                                <input
                                    type="text"
                                    name="flavour"
                                    placeholder="Chocolate"
                                    value={formData.items[0].flavour}
                                    onChange={handleItemChange}
                                    className={inputStyle}
                                />

                            </div>

                        </div>

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Unit Price
                        </label>

                        <input
                            type="number"
                            name="unitPrice"
                            placeholder="₹"
                            value={formData.items[0].unitPrice}
                            onChange={handleItemChange}
                            className={inputStyle}
                        />

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <FiDollarSign
                                size={24}
                                className="text-pink-600"
                            />

                            <h2 className="text-2xl font-bold text-slate-800">
                                Payment Details
                            </h2>

                        </div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Total Amount
                        </label>

                        <input
                            type="number"
                            name="totalAmount"
                            value={formData.payment.totalAmount}
                            onChange={handlePaymentChange}
                            className={inputStyle}
                        />

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Advance Paid
                        </label>

                        <input
                            type="number"
                            name="advancePaid"
                            value={formData.payment.advancePaid}
                            onChange={handlePaymentChange}
                            className={inputStyle}
                        />

                        <div className="mt-6 bg-pink-50 rounded-xl p-4">

                            <p className="text-sm text-gray-500">
                                Remaining Amount
                            </p>

                            <h3 className="text-3xl font-bold text-pink-600 mt-1">
                                ₹{formData.payment.remainingAmount}
                            </h3>

                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Payment Method
                                </label>

                                <select
                                    name="paymentMethod"
                                    value={formData.payment.paymentMethod}
                                    onChange={handlePaymentChange}
                                    className={inputStyle}
                                >

                                    <option value="Cash">
                                        Cash
                                    </option>

                                    <option value="Google Pay">
                                        Google Pay
                                    </option>

                                </select>

                            </div>

                            <div>

                                <label className="block mb-2 font-medium text-gray-700">
                                    Payment Status
                                </label>

                                <select
                                    name="paymentStatus"
                                    value={formData.payment.paymentStatus}
                                    onChange={handlePaymentChange}
                                    className={inputStyle}
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

                            </div>

                        </div>

                    </div>

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            shadow-md
                            border
                            border-pink-100
                            p-6
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <FiFileText
                                size={24}
                                className="text-pink-600"
                            />

                            <h2 className="text-2xl font-bold text-slate-800">
                                Order Details
                            </h2>

                        </div>

                        <label className="block mb-2 font-medium text-gray-700">
                            Order Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={inputStyle}
                        >

                            <option value="Inquiry">
                                Inquiry
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

                        <label className="block mt-6 mb-2 font-medium text-gray-700">
                            Discussion Notes
                        </label>

                        <textarea
                            name="discussionNotes"
                            rows={8}
                            placeholder="Add customer preferences, design notes, delivery instructions..."
                            value={formData.discussionNotes}
                            onChange={handleChange}
                            className={inputStyle}
                        />

                    </div>

                </div>

                <div className="flex justify-end gap-4 pt-4">

                    <button
                        type="reset"
                        className="
                            px-6
                            py-3
                            rounded-xl
                            border
                            border-pink-200
                            text-gray-700
                            hover:bg-pink-50
                            transition-all
                            cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="
                            px-8
                            py-3
                            rounded-xl
                            bg-pink-600
                            hover:bg-pink-700
                            text-white
                            font-semibold
                            shadow-md
                            transition-all
                            cursor-pointer
                        "
                    >
                        {buttonText}
                    </button>

                </div>

            </form>

        </>

    );

}

export default OrderForm;



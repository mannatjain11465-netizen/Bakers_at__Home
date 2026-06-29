function CustomerForm({
    formData,
    handleChange,
    handleSubmit,
    heading,
    buttonText,
    onCancel,
}) {
    return (

        <div className="max-w-4xl mx-auto">

            {heading && (

            <div className="mb-8">

                <h1 className="text-5xl font-bold text-slate-800">
                    {heading}
                </h1>

                <p className="text-gray-500 text-lg mt-2">
                    Enter customer information below.
                </p>

            </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="
                    bg-white
                    rounded-3xl
                    border
                    border-pink-100
                    shadow-md
                    p-8
                    space-y-8
                "
            >

                <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Customer Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter customer name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                            w-full
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-pink-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-pink-300
                        "
                    />

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-pink-100
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-300
                            "
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Building
                        </label>

                        <input
                            type="text"
                            name="building"
                            placeholder="Building Name"
                            value={formData.building}
                            onChange={handleChange}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-pink-100
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-300
                            "
                        />

                    </div>

                </div>

                                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Flat Number
                        </label>

                        <input
                            type="text"
                            name="flatNumber"
                            placeholder="Flat Number"
                            value={formData.flatNumber}
                            onChange={handleChange}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-pink-100
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-300
                            "
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Notes
                        </label>

                        <textarea
                            name="notes"
                            placeholder="Additional notes about the customer..."
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-pink-100
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-300
                                resize-none
                            "
                        />

                    </div>

                </div>

                <div className="flex justify-end gap-4 pt-4">

                    {onCancel && (

                        <button
                            type="button"
                            onClick={onCancel}
                            className="
                                px-7
                                py-3
                                rounded-xl
                                border
                                border-gray-300
                                text-gray-700
                                hover:bg-gray-100
                                font-semibold
                                transition-all
                                cursor-pointer
                            "
                        >
                            Cancel
                        </button>

                    )}

                    <button
                        type="submit"
                        className="
                            bg-pink-600
                            hover:bg-pink-700
                            text-white
                            px-8
                            py-3
                            rounded-xl
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

        </div>

    );
}

export default CustomerForm;
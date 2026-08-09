function EmployeeForm({
    formData,
    handleChange,
    handleSubmit,
    heading,
    buttonText,
    onCancel,
    showPassword = true
}) {

    return (

        <div className="max-w-5xl mx-auto">

            {heading && (

                <div className="mb-8">

                    <h1 className="text-5xl font-bold text-slate-800">
                        {heading}
                    </h1>

                    <p className="text-lg text-gray-500 mt-2">
                        Fill in the employee details below.
                    </p>

                </div>

            )}

            <form
                onSubmit={handleSubmit}
                className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    border
                    border-pink-100
                    p-10
                    space-y-8
                "
            >

                <div>

                    <label className="block font-semibold mb-2">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-pink-300
                        "
                    />

                </div>

                <div>

                    <label className="block font-semibold mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-pink-300
                        "
                    />

                </div>

                <div>

                    <label className="block font-semibold mb-2">
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-pink-300
                        "
                    />

                </div>

                {showPassword && (

                    <div>

                        <label className="block font-semibold mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-300
                            "
                        />

                    </div>

                )}

                <div className="flex justify-end gap-4 pt-4">

                    {onCancel && (

                        <button
                            type="button"
                            onClick={onCancel}
                            className="
                                px-6
                                py-3
                                rounded-xl
                                border
                                border-gray-300
                                hover:bg-gray-100
                                transition
                                cursor-pointer
                            "
                        >
                            Cancel
                        </button>

                    )}

                    <button
                        type="submit"
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-pink-600
                            hover:bg-pink-700
                            text-white
                            font-semibold
                            transition
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

export default EmployeeForm;
import User from "../models/User.js";

export const getEmployees = async (req, res) => {
    try {

        const employees = await User.find({
            role: "employee"
        }).select("-password");

        return res.status(200).json({
            success: true,
            data: employees
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const createEmployee = async (req, res) => {
    try {

        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { phone }
            ]
        });

        if (existingUser) {

            return res.status(409).json({
                success: false,
                message:
                    existingUser.email === email.toLowerCase()
                        ? "Email already exists"
                        : "Phone number already exists"
            });

        }

        const employee = await User.create({
            name,
            email: email.toLowerCase(),
            phone,
            password,
            role: "employee"
        });

        return res.status(201).json({
            success: true,
            data: {
                id: employee._id,
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                role: employee.role
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const updateEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        const employee = await User.findOne({
            _id: id,
            role: "employee"
        });

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        const { name, email, phone } = req.body;

        // Duplicate email check
        const emailExists = await User.findOne({
            email: email.toLowerCase(),
            _id: { $ne: id }
        });

        if (emailExists) {

            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });

        }

        // Duplicate phone check
        const phoneExists = await User.findOne({
            phone,
            _id: { $ne: id }
        });

        if (phoneExists) {

            return res.status(409).json({
                success: false,
                message: "Phone number already exists"
            });

        }

        employee.name = name;
        employee.email = email.toLowerCase();
        employee.phone = phone;

        await employee.save();

        return res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        const employee = await User.findOneAndDelete({
            _id: id,
            role: "employee"
        });

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getEmployeeById = async (req, res) => {

    try {

        const { id } = req.params;

        const employee = await User.findOne({
            _id: id,
            role: "employee"
        }).select("-password");

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });

        }

        return res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
    import jwt from 'jsonwebtoken';
    import User from "../models/User.js";

    const generateToken = (user) => {
        return jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
    };

    export const register = async (req, res) => {
        console.log(req.headers);
        console.log(req.body);
        try {
            const { name, email, password, phone } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists",
                });
            }

            const user = await User.create({
                name,
                email,
                password,
                phone,
            });

            const token = generateToken(user);

            return res.status(201).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                },
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    export const login = async (req, res) => {
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email: email?.toLowerCase()}).select("+password");
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }
            const token = generateToken(user);
            return res.status(200).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                },
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    export const getMe = async (req, res) => {

    };
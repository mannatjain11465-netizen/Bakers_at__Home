import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await API.post("/api/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-rose-600">
                        🎂 Bakers_at_Home
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Homemade with Love ❤️
                    </p>

                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                        Welcome Back!
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Login to manage your bakery
                    </p>

                </div>

                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <div className="flex items-center rounded-xl border px-4 py-3 focus-within:ring-2 focus-within:ring-rose-400">

                            <FaEnvelope className="mr-3 text-gray-400" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full outline-none"
                                required
                            />

                        </div>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <div className="flex items-center rounded-xl border px-4 py-3 focus-within:ring-2 focus-within:ring-rose-400">

                            <FaLock className="mr-3 text-gray-400" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full outline-none"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="text-gray-500 hover:text-rose-500"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                    </div>

                    {error && (
                        <p className="text-center text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-rose-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
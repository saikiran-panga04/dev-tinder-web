import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ChangePwd = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChangePassword = async () => {

        // Basic validation
        if (!password || !confirmPassword) {
            setError("Please enter both password fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setIsLoading(true);
            setError("");
            setSuccess("");

            const response = await axios.post(
                `${BASE_URL}/profile/reset-password`,
                {
                    password
                },
                {
                    // Browser automatically sends reset_token cookie
                    withCredentials: true
                }
            );

            setSuccess(
                response.data?.message ||
                "Password changed successfully."
            );

            // Give the user a moment to see success message
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to reset password. Please try again."
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-panel enter-soft p-5 sm:p-8">

                {/* Header */}
                <div className="mb-8 text-center">

                    <div className="
                        mx-auto
                        mb-4
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary
                        text-3xl
                        shadow-lg
                    ">
                        🔐
                    </div>

                    <h1 className="text-2xl font-bold">
                        Create New Password
                    </h1>

                    <p className="
                        mt-2
                        text-sm
                        text-base-content/60
                    ">
                        Enter a new password for your account.
                    </p>

                </div>


                {/* Error */}
                {error && (
                    <div className="alert alert-error mb-5 rounded-xl">
                        <span>{error}</span>
                    </div>
                )}


                {/* Success */}
                {success && (
                    <div className="alert alert-success mb-5 rounded-xl">
                        <span>{success}</span>
                    </div>
                )}


                {/* New Password */}
                <fieldset className="fieldset mb-4">

                    <legend className="fieldset-legend">
                        New Password
                    </legend>

                    <input
                        type="password"
                        className="
                            input
                            input-bordered
                            w-full
                            rounded-lg
                        "
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </fieldset>


                {/* Confirm Password */}
                <fieldset className="fieldset mb-6">

                    <legend className="fieldset-legend">
                        Confirm Password
                    </legend>

                    <input
                        type="password"
                        className="
                            input
                            input-bordered
                            w-full
                            rounded-lg
                        "
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />

                </fieldset>


                {/* Change Password */}
                <button
                    className="
                        btn
                        btn-primary
                        w-full
                        rounded-lg
                        text-base
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                    "
                    onClick={handleChangePassword}
                    disabled={isLoading}
                >

                    {isLoading ? (
                        <>
                            <span className="
                                loading
                                loading-spinner
                                loading-sm
                            "></span>

                            Updating Password...
                        </>
                    ) : (
                        <>
                            🔒 Change Password
                        </>
                    )}

                </button>


                {/* Back to login */}
                <button
                    className="
                        btn
                        btn-ghost
                        mt-3
                        w-full
                    "
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </button>

            </div>

        </div>
    );
};

export default ChangePwd;


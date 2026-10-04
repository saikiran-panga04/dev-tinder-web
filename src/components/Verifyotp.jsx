import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Verifyotp = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const emailId = location.state?.emailId;

    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleOtpChange = (e) => {
        const value = e.target.value;

        // Allow only numbers
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
        }
    };

    const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
        setError("Please enter a 6-digit OTP.");
        return;
    }

    try {
        setIsLoading(true);
        setError("");

        await axios.post(
            `${BASE_URL}/profile/verify-reset-otp`,
            {
                emailId,
                otp
            },
            {
                withCredentials: true
            }
        );

        // No reset token here.
        // Backend has already stored it in an HTTP-only cookie.

        navigate("/change-password");

    } catch (err) {
        console.error(err);

        setError(
            err.response?.data?.message ||
            "Invalid or expired OTP."
        );
    } finally {
        setIsLoading(false);
    }
};

    // User shouldn't directly open /verify-otp
    if (!emailId) {
        return (
            <div className="auth-page">
                <div className="surface-panel enter-soft w-full max-w-md p-6 text-center sm:p-8">
                    <p className="mb-4">
                        Invalid password reset session.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Go to Forgot Password
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">

            <div className="auth-panel enter-soft p-5 text-center sm:p-8">

                {/* Icon */}
                <div className="
                    mx-auto
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary
                    text-3xl
                    shadow-lg
                ">
                    🔐
                </div>

                <h1 className="text-2xl font-bold">
                    Verify OTP
                </h1>

                <p className="
                    mt-2
                    text-sm
                    text-base-content/60
                ">
                    Enter the 6-digit OTP sent to
                </p>

                <p className="mt-1 font-semibold">
                    {emailId}
                </p>

                {/* Error */}
                {error && (
                    <div className="
                        alert
                        alert-error
                        mt-5
                        text-sm
                    ">
                        <span>{error}</span>
                    </div>
                )}

                {/* OTP */}
                <div className="my-8 flex justify-center">

                    <input
                        type="text"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        maxLength="6"
                        pattern="[0-9]{6}"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="000000"
                        className="
                            input
                            input-bordered
                            w-full
                            text-center
                            text-2xl
                            font-bold
                            tracking-[0.5em]
                            rounded-lg
                        "
                    />

                </div>

                {/* Verify button */}
                <button
                    className="
                        btn
                        btn-primary
                        w-full
                        rounded-lg
                    "
                    disabled={isLoading || otp.length !== 6}
                    onClick={handleVerifyOtp}
                >

                    {isLoading ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    )}

                </button>

                <button
                    className="
                        btn
                        btn-ghost
                        mt-3
                        w-full
                    "
                    onClick={() => navigate("/forgot-password")}
                >
                    Change email
                </button>

            </div>

        </div>
    );
};

export default Verifyotp;
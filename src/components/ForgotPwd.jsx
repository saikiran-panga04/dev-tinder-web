import { use, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ForgotPwd = () => {
  const [emailId, setEmailId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const handleGetOTP = async (e) => {
    e.preventDefault();
    if (!emailId) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${BASE_URL}/profile/forgot-password`,
        { emailId }
      );
      setMessage({
        type: "success",
        text: response.data?.message || "OTP sent successfully to your email!",
      });
      
      navigate("/verify-otp", { state: { emailId } });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to send OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6">
      <form
        onSubmit={handleGetOTP}
        className="w-full max-w-sm flex flex-col gap-4 bg-base-100 p-6 rounded-xl shadow-md border border-base-200"
      >
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your registered email to receive a password reset OTP.
        </p>

        {message.text && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            } text-sm py-2`}
          >
            <span>{message.text}</span>
          </div>
        )}

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            className="input input-bordered w-full"
            type="email"
            required
            placeholder="mail@site.com"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !emailId}
          className="btn btn-primary w-full mt-2"
        >
          {loading ? <span className="loading loading-spinner"></span> : "Get an OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPwd;
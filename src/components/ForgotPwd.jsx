import { useState } from "react";
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
    <div className="auth-page">
      <form
        onSubmit={handleGetOTP}
        className="auth-panel enter-soft flex flex-col gap-4 p-5 sm:p-8"
      >
        <h2 className="page-title text-center">Forgot Password</h2>
        <p className="text-center text-sm text-base-content/65">
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
            className="input input-bordered w-full rounded-lg"
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
          className="btn btn-primary mt-2 w-full rounded-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          {loading ? <span className="loading loading-spinner"></span> : "Get an OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPwd;

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("tanjiro.kamado@gmail.com");
    const [password, setPassword] = useState("Tanjiro@123");

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {

        try {
            setError('');
            setIsLoading(true);

            const response = await axios.post(
                `${BASE_URL}/login`,
                {
                    emailId,
                    password
                },
                {
                    withCredentials: true
                }
            );

            dispatch(addUser(response.data));
            navigate('/');

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                'Invalid email or password. Please try again.'
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* Login Card */}
            <div className="auth-panel enter-soft p-5 sm:p-8">

                {/* Logo / Heading */}
                <div className="mb-8 text-center">

                    <div className="
                        mx-auto
                        mb-4
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
                        💻
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Welcome to{' '}
                        <span className="text-primary">
                            DevTinder
                        </span>
                    </h1>

                    <p className="mt-2 text-sm text-base-content/60">
                        Connect with developers and build meaningful connections.
                    </p>

                </div>


                {/* Error */}
                {error && (
                    <div className="
                        alert
                        alert-error
                        mb-5
                            rounded-lg
                        text-sm
                    ">
                        <span>{error}</span>
                    </div>
                )}


                {/* Email */}
                <fieldset className="fieldset mb-4">

                    <legend className="fieldset-legend text-sm font-semibold">
                        Email Address
                    </legend>

                    <label className="
                        input
                        input-bordered
                        flex
                        w-full
                        items-center
                        gap-3
                            rounded-lg
                    ">

                        <span className="text-lg opacity-60">
                            ✉️
                        </span>

                        <input
                            type="email"
                            className="grow"
                            placeholder="Enter your email"
                            value={emailId}
                            onChange={(e) =>
                                setEmailId(e.target.value)
                            }
                        />

                    </label>

                </fieldset>


                {/* Password */}
                <fieldset className="fieldset mb-6">

                    <legend className="fieldset-legend text-sm font-semibold">
                        Password
                    </legend>

                    <label className="
                        input
                        input-bordered
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                    ">

                        <span className="text-lg opacity-60">
                            🔒
                        </span>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            className="grow"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="text-lg opacity-60 transition hover:opacity-100"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>

                    </label>

                </fieldset>
                <button
                        className="
                            mt-2
                            font-semibold
                            text-primary
                            transition-colors
                            hover:underline
                        "
                        onClick={() => navigate('/ForgotPwd')}
                    >
                        forgot password →
                    </button>


                {/* Login Button */}
                <button
                    className="
                        btn
                        btn-primary
                        w-full
                        rounded-xl
                        text-base
                        shadow-md
                        transition-all
                        duration-200
                        hover:scale-[1.02]
                        hover:shadow-lg
                    "
                    onClick={handleLogin}
                    disabled={isLoading}
                >

                    {isLoading ? (
                        <>
                            <span className="
                                loading
                                loading-spinner
                                loading-sm
                            "></span>

                            Signing in...
                        </>
                    ) : (
                        <>
                            🔐 Sign In
                        </>
                    )}

                </button>


                {/* Divider */}
                <div className="divider my-6">
                    OR
                </div>


                {/* Signup */}
                <div className="text-center">

                    <p className="text-sm text-base-content/60">
                        Don't have an account?
                    </p>

                    <button
                        className="
                            mt-2
                            font-semibold
                            text-primary
                            transition-colors
                            hover:underline
                        "
                        onClick={() => navigate('/signup')}
                    >
                        Create an account →
                    </button>

                </div>


                {/* Footer */}
                <p className="
                    mt-8
                    text-center
                    text-xs
                    text-base-content/40
                ">
                    Connect • Code • Collaborate
                </p>

            </div>

        </div>
    );
};

export default Login;

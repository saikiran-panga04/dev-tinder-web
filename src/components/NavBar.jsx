import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                `${BASE_URL}/logout`,
                {},
                { withCredentials: true }
            );

            dispatch(removeUser());
            navigate('/login');
        }
        catch (err) {
            console.error(err);
        }
    };

    const user = useSelector((state) => state.user);

    return (
        <div className="
            navbar
            sticky
            top-0
            z-50
            border-b
            border-base-300/60
            bg-base-100/80
            px-3
            shadow-sm
            backdrop-blur-md
        ">

            {/* Logo */}
            <div className="flex-1">

                <Link
                    to="/"
                    className="
                        btn
                        btn-ghost
                        text-xl
                        font-extrabold
                        sm:text-2xl
                    "
                >
                    <span className="text-primary">
                        Dev
                    </span>
                    <span>
                        Tinder
                    </span>
                </Link>

            </div>

            {/* User Section */}
            {user && (
                <div className="flex items-center gap-2 sm:gap-4">

                    {/* Welcome message */}
                    <div className="hidden sm:block text-right">

                        <p className="text-xs text-base-content/60">
                            Welcome back 👋
                        </p>

                        <p className="font-semibold">
                            {user?.firstName}
                        </p>

                    </div>

                    {/* Profile Dropdown */}
                    <div className="dropdown dropdown-end">

                        <div
                            tabIndex={0}
                            role="button"
                            className="
                                btn
                                btn-ghost
                                btn-circle
                                avatar
                                ring-1
                                ring-base-content/15
                                transition-all
                                duration-300
                                hover:ring-primary/60
                            "
                        >
                            <div className="w-11 rounded-full">

                                <img
                                    src={
                                        user?.photoURL ||
                                        "https://daisyui.com/images/stock/photo-1535713875002-d1d0cf377fde.webp"
                                    }
                                    alt={`${user?.firstName || 'User'} profile`}
                                />

                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <ul
                            tabIndex={0}
                            className="
                                menu
                                menu-sm
                                dropdown-content
                                z-[100]
                                mt-4
                                w-60
                                rounded-xl
                                border
                                border-base-300/70
                                bg-base-100/95
                                p-2
                                shadow-xl
                                backdrop-blur-xl
                            "
                        >

                            {/* User info */}
                            <li className="mb-2">

                                <div className="
                                    pointer-events-none
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    bg-base-200
                                    p-3
                                ">

                                    <div className="avatar">

                                        <div className="w-10 rounded-full">

                                            <img
                                                src={
                                                    user?.photoURL ||
                                                    "https://daisyui.com/images/stock/photo-1535713875002-d1d0cf377fde.webp"
                                                }
                                                alt="Profile"
                                            />

                                        </div>

                                    </div>

                                    <div>
                                        <p className="font-bold">
                                            {user?.firstName} {user?.lastName}
                                        </p>

                                        <p className="text-xs text-base-content/60">
                                            Developer
                                        </p>
                                    </div>

                                </div>

                            </li>

                            <div className="divider my-1"></div>

                            {/* Profile */}
                            <li>
                                <Link
                                    to="/profile"
                                    className="rounded-xl py-3"
                                >
                                    <span>👤</span>
                                    Profile
                                </Link>
                            </li>

                            {/* Connections */}
                            <li>
                                <Link
                                    to="/connection"
                                    className="rounded-xl py-3"
                                >
                                    <span>🤝</span>
                                    Connections
                                </Link>
                            </li>

                            {/* Requests */}
                            <li>
                                <Link
                                    to="/requests"
                                    className="rounded-xl py-3"
                                >
                                    <span>💌</span>
                                    Requests
                                </Link>
                            </li>

                            <div className="divider my-1"></div>
                             <li>
                                <Link
                                    to="/premium"
                                    className="rounded-xl py-3"
                                >
                                    <span>💎</span>
                                    Premium
                                </Link>
                            </li>

                            {/* Logout */}
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="
                                        rounded-xl
                                        py-3
                                        text-error
                                        hover:bg-error/10
                                    "
                                >
                                    <span>🚪</span>
                                    Logout
                                </button>
                            </li>

                        </ul>

                    </div>

                </div>
            )}

        </div>
    );
};

export default NavBar;
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { createPortal } from 'react-dom';

const UserCard = ({ user, showActions = true }) => {
    const {
        _id,
        firstName,
        lastName,
        photoURL,
        age,
        gender,
        about
    } = user;

    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const handleSendRequest = async (status) => {
        await axios.post(
            `${BASE_URL}/request/send/${status}/${_id}`,
            {},
            { withCredentials: true }
        );

        dispatch(removeFeed(_id));

        if (status === 'interested') {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <div className="group relative">

            {/* Main Card */}
            <div
                className="
                    w-96
                    overflow-hidden
                    rounded-3xl
                    bg-base-100
                    shadow-xl
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-2xl
                "
            >

                {/* Image Section */}
                <div className="relative h-80 overflow-hidden">

                    <img
                        src={photoURL || "https://daisyui.com"}
                        alt={firstName || "User"}
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                    />

                    {/* Gradient overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-black/10
                            to-transparent
                        "
                    />

                    {/* Name on image */}
                    <div className="absolute bottom-5 left-5 text-white">
                        <h2 className="text-2xl font-bold drop-shadow-lg">
                            {firstName} {lastName}
                        </h2>

                        {age && (
                            <p className="text-sm opacity-90">
                                {age} years old
                            </p>
                        )}
                    </div>

                    {/* Online badge */}
                    <div className="absolute right-4 top-4">
                        <span className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 text-sm text-white backdrop-blur-md">
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
                            Active
                        </span>
                    </div>
                </div>

                {/* Card Content */}
                <div className="card-body gap-4">

                    {/* About */}
                    <div>
                        <p className="line-clamp-3 text-sm leading-relaxed text-base-content/70">
                            {about || "No bio available."}
                        </p>
                    </div>

                    {/* User information */}
                    <div className="flex gap-2">

                        {gender && (
                            <span className="badge badge-outline">
                                {gender}
                            </span>
                        )}

                        {age && (
                            <span className="badge badge-outline">
                                {age} years
                            </span>
                        )}

                    </div>

                    {/* Actions */}
                    {showActions && (
                        <div className="mt-2 grid grid-cols-2 gap-3">

                            <button
                                className="
                                    btn
                                    btn-outline
                                    rounded-xl
                                    border-base-300
                                    transition-all
                                    duration-200
                                    hover:scale-[1.03]
                                "
                                onClick={() =>
                                    handleSendRequest('ignored')
                                }
                            >
                                ✕ Ignore
                            </button>

                            <button
                                className="
                                    btn
                                    btn-secondary
                                    rounded-xl
                                    shadow-md
                                    transition-all
                                    duration-200
                                    hover:scale-[1.03]
                                    hover:shadow-lg
                                "
                                onClick={() =>
                                    handleSendRequest('interested')
                                }
                            >
                                ❤️ Interest
                            </button>

                        </div>
                    )}
                </div>
            </div>

            {/* Toast */}
            {showToast &&
                createPortal(
                    <div className="toast toast-top toast-center z-[9999]">
                        <div className="alert alert-success rounded-2xl shadow-xl">
                            <span>
                                ❤️ Interested request sent successfully!
                            </span>
                        </div>
                    </div>,
                    document.body
                )
            }

        </div>
    );
};

export default UserCard;
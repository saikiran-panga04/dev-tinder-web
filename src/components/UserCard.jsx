import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user, showActions = true, onInterested }) => {
    const {
        _id,
        firstName,
        lastName,
        photoURL,
        age,
        gender,
        about
    } = user;

    const dispatch = useDispatch();

    const handleSendRequest = async (status) => {
        await axios.post(
            `${BASE_URL}/request/send/${status}/${_id}`,
            {},
            { withCredentials: true }
        );

        if (status === 'interested') {
            onInterested?.();
        }

        dispatch(removeFeed(_id));
    };

    return (
        <div className="group relative">

            {/* Main Card */}
            <div
                className="
                    w-full
                    max-w-md
                    overflow-hidden
                    rounded-2xl
                    border
                    border-base-300/60
                    bg-base-100
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-primary/30
                    hover:shadow-xl
                "
            >

                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">

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
                            <span className="size-2 rounded-full bg-success"></span>
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
                                    rounded-lg
                                    border-base-300
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
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
                                    rounded-lg
                                    shadow-md
                                    transition-all
                                    duration-300
                                    hover:-translate-y-0.5
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

        </div>
    );
};

export default UserCard;
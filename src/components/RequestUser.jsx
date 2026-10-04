import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
const RequestUser = ({ requestId, userData }) => {
    const { firstName, lastName, age, gender, about, photoURL } = userData;
    const _id = requestId;
    const [toast, setToast] = useState(false);
    const [stat,setStat]=useState("");
    const dispatch = useDispatch();

    const handleRequest = async (_id, action) => {
        try {
            const status = action === 'ignore' ? 'rejected' : 'accepted';

            await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
            setStat(status);
            dispatch(removeRequest(_id));
            setToast(true);
            setTimeout(() => setToast(false), 3000);

        } catch (error) {
            // This will print the actual validation message from your backend
            console.error("Server validation error:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            {/* Added 'max-w-xl', 'w-full', and 'mx-auto' to control the width and center it */}
            <div className="card card-side surface-panel mx-auto my-2 w-full max-w-3xl gap-1 p-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 sm:p-3">
                <figure className="shrink-0 p-2 sm:p-3">
                    {/* Fixed the Tailwind width bug ('w-42' doesn't exist by default, used 'w-32 h-32') */}
                    {/* Added 'rounded-xl' and 'aspect-square' for a clean, modern look */}
                    <img
                        className="aspect-square size-20 rounded-lg object-cover sm:size-28"
                        src={photoURL}
                        alt={`${firstName} ${lastName}`}
                    />
                </figure>
                <div className="card-body min-w-0 justify-center gap-2 p-2 sm:p-4">
                    <h2 className="card-title text-base font-bold sm:text-lg">{firstName} {lastName}{age ? `, ${age}` : ''}</h2>
                    <p className="text-sm text-base-content/65">{gender && <span className="capitalize">{gender}</span>}</p>
                    <p className="line-clamp-2 text-sm text-base-content/75">{about}</p>
                    <div className="card-actions mt-1 justify-end">
                        <button className="btn btn-sm btn-ghost text-error transition-all hover:bg-error/10" onClick={() => handleRequest(_id, 'ignore')}>Ignore</button>
                        <button className="btn btn-sm btn-primary px-4 transition-all hover:-translate-y-0.5" onClick={() => handleRequest(_id, 'interested')}>Accept</button>
                    </div>
                </div>
            </div>
            {toast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Connection {stat} successfully.</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestUser;

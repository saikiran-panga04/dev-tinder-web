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

            const response = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
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
            <div className="card card-side bg-base-100 shadow-md max-w-xl w-full mx-auto my-4 border border-base-200">
                <figure className="p-4 flex-shrink-0">
                    {/* Fixed the Tailwind width bug ('w-42' doesn't exist by default, used 'w-32 h-32') */}
                    {/* Added 'rounded-xl' and 'aspect-square' for a clean, modern look */}
                    <img
                        className="w-32 h-32 object-cover rounded-xl aspect-square shadow-sm"
                        src={photoURL}
                        alt={`${firstName} ${lastName}`}
                    />
                </figure>
                <div className="card-body justify-center py-4">
                    <h2 className="card-title text-xl font-bold">{firstName} {lastName}, {age}</h2>
                    <p className="text-sm opacity-75">Gender: <span className="capitalize">{gender}</span></p>
                    <p className="text-sm line-clamp-2">About: {about}</p>
                    <div className="card-actions justify-end mt-2">
                        <button className="btn btn-sm btn-ghost text-error" onClick={() => handleRequest(_id, 'ignore')}>Ignore</button>
                        <button className="btn btn-sm btn-primary px-4" onClick={() => handleRequest(_id, 'interested')}>Accept</button>
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

import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

import { createPortal } from 'react-dom';

const UserCard = ({ user, showActions = true }) => {
    const { _id, firstName, lastName, photoURL, age, gender, about } = user;
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();


    const handleSendRequest = async (status) => {
        await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
        dispatch(removeFeed(_id));

        if (status === 'interested') {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    }

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                {/* w-full stops DaisyUI from forcing the image to stretch horizontally */}
                <figure className="w-full pt-6 flex justify-center">
                    <img
                        className="w-50 h-50 object-cover "
                        src={photoURL || "https://daisyui.com"}
                        alt={firstName || "User"}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{about}</p>
                    {age && <p>Age: {age}</p>}
                    {gender && <p>Gender: {gender}</p>}
                    {showActions && (
                        <div className="flex card-actions justify-center">
                            <button className="btn btn-primary" onClick={() => handleSendRequest('ignored')}>Ignore</button>
                            <button className="btn btn-secondary" onClick={() => handleSendRequest('interested')}>Interest</button>
                        </div>
                    )}
                </div>
            </div>
            {showToast && createPortal(
                <div className="toast toast-top toast-center z-[9999]">
                    <div className="alert alert-success shadow-lg">
                        <span>Interested request sent successfully.</span>
                    </div>
                </div>,
                document.body 
            )}

        </div>

    )
}

export default UserCard
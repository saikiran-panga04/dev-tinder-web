import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user }) => {
    console.log("UserCard user:", user);


    const handleInterested = async() => {
        const response = await axios.post(`${BASE_URL}/request/send/interested/${user?.id}`,{withCredentials: true});
        console.log("Interested response:", response.data);
    }

    return (

        <div className="card bg-base-100 w-96 shadow-sm">
            {/* w-full stops DaisyUI from forcing the image to stretch horizontally */}
            <figure className="w-full pt-6 flex justify-center">
                <img
                    className="w-32 h-32 object-cover rounded-full"
                    src={user?.photoURL || "https://daisyui.com"}
                    alt={user?.firstName || "User"}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
                <p>{user?.about}</p>
                <div className="flex card-actions justify-center">
                    
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary" onClick={handleInterested}>Interest</button>
                </div>
            </div>
        </div>

    )
}

export default UserCard
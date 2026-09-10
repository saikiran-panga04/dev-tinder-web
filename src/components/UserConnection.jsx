import React from 'react'

const UserConnection = ({ connections }) => {
    const {firstName,lastName,photoURL,age,gender,about} = connections;
    return (
    
    <div className="card bg-base-200 shadow-sm w-96"> 
        <figure>
            {/* Removed the fixed w-48 h-48 to let the image span the card width */}
            <img className="w-full h-48 object-cover"
                src={photoURL}
                alt="Profile" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName} {lastName}</h2>
            <p>Age: {age}, Gender: {gender}</p>
            <p>About: {about}</p>
        </div>
    </div>
)
}

export default UserConnection
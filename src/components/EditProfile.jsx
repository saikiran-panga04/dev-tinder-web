import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {


    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();


    const handleSave = async () => {
        const response = await axios.post(`${BASE_URL}/profile/edit`, {
            firstName,
            lastName,
            age,
            gender,
            about,
            photoURL
        }, { withCredentials: true });
        dispatch(addUser(response.data?.data))
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }

    return (
        <>
            <div className="flex justify-center my-5 "> <div>
                <div className="card card-border bg-base-300 w-96  mx-5">
                    <div className="card-body justify-center ">
                        <h2 className="card-title justify-center">Profile</h2>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">firstName</legend>
                                <input type="text" className="input" placeholder="Type here" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">lastName</legend>
                                <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">age</legend>
                                <input type="number" className="input" placeholder="Type here" value={age} onChange={(e) => setAge(e.target.value)} />
                            </fieldset>
                            <div className="dropdown">
                                <p>Select your gender:</p>
                                <div tabIndex={0} role="button" className="btn m-1">{gender || "Select Gender"}</div>
                                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><a onClick={() => setGender("Male")}>Male</a></li>
                                    <li><a onClick={() => setGender("Female")}>Female</a></li>
                                </ul>
                            </div>
                            <textarea className="textarea" placeholder="Bio" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">photoURL</legend>
                                <input type="text" className="input" placeholder="Type here" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
                            </fieldset>

                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary " onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
                <div className="mx-5">
                    <UserCard user={{ firstName, lastName, age, gender, about, photoURL }} showActions={false} />
                </div>
            </div>
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>
            )}

        </>
    )

};

export default EditProfile;
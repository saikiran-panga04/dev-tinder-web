import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || '');
    const [about, setAbout] = useState(user.about || '');
    const [photoURL, setPhotoURL] = useState(user.photoURL || '');

    const [showToast, setShowToast] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const dispatch = useDispatch();

    const handleSave = async () => {

        try {
            setIsSaving(true);

            const response = await axios.post(
                `${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoURL
                },
                { withCredentials: true }
            );

            dispatch(addUser(response.data?.data));

            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 3000);

        } catch (error) {
            console.error('Profile update failed:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="app-page">

            {/* Page heading */}
            <div className="app-container mb-8 text-center">

                <h1 className="page-title">
                    Edit Your Profile
                </h1>

                <p className="mt-2 text-base-content/60">
                    Update your information and see how your profile looks
                </p>

            </div>


            {/* Main content */}
            <div className="
                mx-auto
                flex
                max-w-5xl
                flex-col
                items-center
                justify-center
                gap-8
                lg:flex-row
                lg:items-start
            ">

                {/* ================= FORM ================= */}
                <div className="surface-panel w-full max-w-md p-5 sm:p-7">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold">
                            Profile Information
                        </h2>

                        <p className="mt-1 text-sm text-base-content/60">
                            Keep your profile up to date.
                        </p>

                    </div>


                    {/* First Name */}
                    <fieldset className="fieldset mb-3">

                        <legend className="fieldset-legend">
                            First Name
                        </legend>

                        <input
                            type="text"
                            className="input input-bordered w-full rounded-lg"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(e.target.value)
                            }
                        />

                    </fieldset>


                    {/* Last Name */}
                    <fieldset className="fieldset mb-3">

                        <legend className="fieldset-legend">
                            Last Name
                        </legend>

                        <input
                            type="text"
                            className="input input-bordered w-full rounded-lg"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) =>
                                setLastName(e.target.value)
                            }
                        />

                    </fieldset>


                    {/* Age */}
                    <fieldset className="fieldset mb-3">

                        <legend className="fieldset-legend">
                            Age
                        </legend>

                        <input
                            type="number"
                            className="input input-bordered w-full rounded-lg"
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) =>
                                setAge(e.target.value)
                            }
                        />

                    </fieldset>


                    {/* Gender */}
                    <fieldset className="fieldset mb-3">

                        <legend className="fieldset-legend">
                            Gender
                        </legend>

                        <select
                            className="select select-bordered w-full rounded-lg"
                            value={gender}
                            onChange={(e) =>
                                setGender(e.target.value)
                            }
                        >
                            <option value="" disabled>
                                Select your gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                        </select>

                    </fieldset>


                    {/* About */}
                    <fieldset className="fieldset mb-3">

                        <legend className="fieldset-legend">
                            About
                        </legend>

                        <textarea
                            className="
                                textarea
                                textarea-bordered
                                h-28
                                w-full
                                rounded-lg
                            "
                            placeholder="Tell something about yourself..."
                            value={about}
                            onChange={(e) =>
                                setAbout(e.target.value)
                            }
                        />

                    </fieldset>


                    {/* Photo URL */}
                    <fieldset className="fieldset mb-6">

                        <legend className="fieldset-legend">
                            Profile Photo URL
                        </legend>

                        <input
                            type="text"
                            className="input input-bordered w-full rounded-lg"
                            placeholder="https://example.com/photo.jpg"
                            value={photoURL}
                            onChange={(e) =>
                                setPhotoURL(e.target.value)
                            }
                        />

                    </fieldset>


                    {/* Save button */}
                    <button
                        className="
                            btn
                            btn-primary
                            w-full
                            rounded-lg
                            text-base
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                        "
                        onClick={handleSave}
                        disabled={isSaving}
                    >

                        {isSaving ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Saving...
                            </>
                        ) : (
                            <>
                                💾 Save Profile
                            </>
                        )}

                    </button>

                </div>


                {/* ================= PREVIEW ================= */}
                <div className="w-full max-w-md">

                    <div className="mb-4 text-center">

                        <h2 className="text-xl font-bold">
                            Live Preview
                        </h2>

                        <p className="mt-1 text-sm text-base-content/60">
                            This is how others will see you.
                        </p>

                    </div>

                    <div className="flex justify-center">

                        <UserCard
                            user={{
                                _id: user._id,
                                firstName,
                                lastName,
                                age,
                                gender,
                                about,
                                photoURL
                            }}
                            showActions={false}
                        />

                    </div>

                </div>

            </div>


            {/* ================= SUCCESS TOAST ================= */}
            {showToast && (
                <div className="toast toast-top toast-center z-[9999]">

                    <div className="
                        alert
                        alert-success
                        rounded-2xl
                        shadow-xl
                    ">
                        <span>
                            ✅ Profile updated successfully!
                        </span>
                    </div>

                </div>
            )}

        </div>
    );
};

export default EditProfile;
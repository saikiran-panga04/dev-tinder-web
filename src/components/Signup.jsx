import { useState } from "react";
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [skills, setSkills] = useState([]);
  const [about, setAbout] = useState("");

  const handleSignUp = async () => {
    try {
      await axios.post(`${BASE_URL}/signup`, {
        firstName, lastName, emailId, password, gender, age, photoURL, skills, about
      }, { withCredentials: true });
      navigate('/profile');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-container flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-2">Create an Account</h2>
        
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium">First Name</span>
            <input type="text" placeholder="First Name" className="input input-bordered input-md w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium">Last Name</span>
            <input type="text" placeholder="Last Name" className="input input-bordered input-md w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>

        {/* Email & Password */}
        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Email</span>
          <input type="email" placeholder="mail@site.com" className="input input-bordered input-md w-full" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
        </label>
        
        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Password</span>
          <input type="password" placeholder="Your Password" className="input input-bordered input-md w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {/* Gender & Age Row */}
        <div className="grid grid-cols-2 gap-4">
          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium">Gender</span>
            <select className="select select-bordered w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-1 font-medium">Age</span>
            <input type="number" placeholder="Your Age" className="input input-bordered input-md w-full" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
        </div>

        {/* Photo URL */}
        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Photo URL</span>
          <input type="text" placeholder="Photo URL" className="input input-bordered w-full" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
        </label>

        {/* Skills */}
        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">Skills</span>
          <input type="text" placeholder="Skills (comma separated)" className="input input-bordered w-full" value={skills.join(", ")} onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))} />
        </label>

        {/* About */}
        <label className="form-control w-full">
          <span className="label-text mb-1 font-medium">About</span>
          <textarea placeholder="About You" className="textarea textarea-bordered h-24 w-full" value={about} onChange={(e) => setAbout(e.target.value)} />
        </label>

        {/* Action Button */}
        <div className="mt-4">
          <button className="btn btn-info w-full text-white font-semibold" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

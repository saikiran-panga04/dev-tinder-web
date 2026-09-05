import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice'; 
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId,setEmailId] = useState("tanjiro.kamodo@gmail.com")
    const [password,setPassword] = useState("Tanjiro@123")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const  response = await axios.post(`${BASE_URL}/login`,{
            emailId,password
        },{
            withCredentials:true
        })
        dispatch(addUser(response.data));
          navigate('/');

    }
    return (
        <div>
            <div className="card card-border bg-base-300 w-96 my-5 mx-auto">
                <div className="card-body justify-center ">
                    <h2 className="card-title justify-center">Login Page</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="email" className="input" placeholder="Type here" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary " onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
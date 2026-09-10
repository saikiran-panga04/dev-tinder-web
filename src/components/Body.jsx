import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; 
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const Body = () => {
  const redirectToLogin = () => {
    navigate('/login');
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user)

  const fetchUser = async () => {
    if(userData) return;
    try{
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      });

      dispatch(addUser(res.data.data))
    }
    catch(err){
      if(err.response && err.response.status === 401){
        redirectToLogin();
      }
      console.error(err);
    }
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  if (!userData) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <>
    <NavBar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Body
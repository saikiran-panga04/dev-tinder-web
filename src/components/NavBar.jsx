import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectToLogin = () => { navigate('/login'); }
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      redirectToLogin();
    }
    catch (err) {
      console.error(err);
    }
  };
  const user = useSelector((state) => state.user);
 
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Dev Tinder</Link>
      </div>
      {user &&
        <div className="flex gap-2 flex items-center ">
          <p>welcome,{user?.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connection" className="justify-between">Connections</Link></li>
              <li><Link to="/requests" className="justify-between">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default NavBar
import Signup from './components/Signup';
import Verifyotp from './components/Verifyotp';
import './App.css';
import { Provider } from 'react-redux';
import store from './utils/appStore';
import Body from './components/Body';
import Feed from './components/Feed';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logout from './components/Logout';
import Login from './components/Login';
import ForgotPwd from './components/ForgotPwd';
import Profile from './components/Profile';
import { Connection } from './components/Connection';
import Requests from './components/Request';
import ChangePwd from './components/ChangePwd';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ForgotPwd" element={<ForgotPwd />} />
          <Route path="/verify-otp" element={<Verifyotp />} />
          <Route path="/change-password" element={<ChangePwd />} />

          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="connection" element={<Connection />} />
            <Route path="logout" element={<Logout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

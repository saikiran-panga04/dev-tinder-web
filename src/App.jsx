import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Provider } from 'react-redux';
import store from './utils/appStore';
import NavBar from './components/NavBar'
import Body from './components/Body'
import Feed from './components/Feed'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Logout from './components/Logout'
import Login from './components/Login'

function App() {

  return (
    <>
     <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
           <Route path="/" element={<Feed />} />
           <Route path="/login" element={<Login />} />
           <Route path ="/logout" element ={<Logout/>} />
          </Route>
        </Routes>
      </BrowserRouter>
     </Provider>
    </>
  )
}

export default App

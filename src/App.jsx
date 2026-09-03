import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import NavBar from './NavBar'
import Body from './Body'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Logout from './Logout'
import Login from './Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
           <Route path="/login" element={<Login />} />
           <Route path ="/logout" element ={<Logout/>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

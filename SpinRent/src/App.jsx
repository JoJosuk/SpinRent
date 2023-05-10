// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import Layout from './Layout'
import RegistrationPage from './components/RegistrationPage'
function App() {

  return (
    <Routes> 
      <Route path='/' element={<Layout /> } > 
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />}></Route>
      </Route>
      
    </Routes>
  )
}
export default App 
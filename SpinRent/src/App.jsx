// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import Layout from './Layout'
function App() {

  return (
    <Routes> 
      <Route path='/' element={<Layout /> } > 
        <Route path='/login' element={<LoginPage />} />
      </Route>
      
    </Routes>
  )
}
export default App 
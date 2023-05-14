// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import Layout from './Layout'
import RegistrationPage from './components/RegistrationPage'
// import { Usercontext } from './Usercontext'
import { UsercontextProvider } from './Usercontext'
import axios from 'axios'
import Account from './components/Account'
// import CarspageForm from './components/CarspageForm'
import IndexPage from './components/IndexPage'
import Thiscar from './components/Thiscar'
axios.defaults.baseURL='http://localhost:4000'
axios.defaults.withCredentials=true

function App() {

  return (
    <UsercontextProvider>
    <Routes> 
      <Route path='/' element={<Layout /> } > 
        <Route index element={<IndexPage />}></Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />}></Route>
        <Route path='/account/:subpage?' element={<Account />}></Route>
        <Route path='/account/:subpage/:action' element={<Account />}></Route>
        <Route path='/showcar/:id' element={<Thiscar />}></Route>
      </Route>
      
    </Routes>
    </UsercontextProvider>
  )
}
export default App 
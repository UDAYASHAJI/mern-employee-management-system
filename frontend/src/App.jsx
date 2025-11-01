import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Signup from '../src/Pages/authentication/Signup'
import Login from './Pages/authentication/Login'
import Home from './Pages/Admin/Home'
import ChangePassword from './Pages/Admin/ChangePassword'
import Leave from './Pages/User/Leave'
import Leaverequest from './Pages/Admin/Leaverequest'
import Userhome from './Pages/User/Userhome'


function App() {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<Signup/>}/>
      
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/leave' element={<Leave/>}/>
      <Route path='/leave-request' element={<Leaverequest/>}/>
      <Route path='/profile' element={<Userhome/>}/>

      


      </Routes>
    </div>
  )
}

export default App

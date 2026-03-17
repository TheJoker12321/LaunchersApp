import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddLauncher from './pages/AddLauncher'
import LauncherDetails from './pages/LauncherDetails'
import LoginPage from './pages/LoginPage'
import Users from './pages/Users'
import EditPage from './pages/EditPage'
import RegisterPage from './pages/RegisterPage'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import useStore from './zustand/createZustand'

function App() {

  const { tokenStore } = useStore()
  const [isVerified, setIsVerified] = useState('')

  useEffect(() => {

    async function getVerify() {

      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:3000/api/auth/getUser', {
        headers: {Authorization: `Bearer ${token}`}
      })

      setIsVerified(res.data.user.user_type)

    }

    getVerify()
  },[tokenStore])


  return (
    
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register' element={isVerified === 'admin' && <RegisterPage /> || <LoginPage />} />
          <Route path='/getUsers' element={isVerified === 'admin' && <Users /> || <LoginPage />} />
          <Route path='/editUser' element={isVerified === 'admin' && <EditPage /> || <LoginPage />} />
          <Route path='/home' element={isVerified && <Home /> || <LoginPage />}/>
          <Route path='launcher'>
            <Route path='add' element={isVerified === 'admin' || isVerified === 'Intelligence Corps' && <AddLauncher /> || <LoginPage />} />
            <Route path='details' element={isVerified === 'admin' || isVerified === 'Intelligence Corps' && <LauncherDetails /> || <LoginPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  
  )
}

export default App

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddLauncher from './pages/AddLauncher'
import LauncherDetails from './pages/LauncherDetails'
import LoginPage from './pages/LoginPage'
import Users from './pages/Users'
import EditPage from './pages/EditPage'
import RegisterPage from './pages/RegisterPage'

function App() {




  return (
    
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/getUsers' element={<Users />} />
          <Route path='/editUser' element={<EditPage />} />
          <Route path='/home' element={<Home />}/>
          <Route path='launcher'>
            <Route path='add' element={<AddLauncher />} />
            <Route path='details' element={<LauncherDetails />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  
  )
}

export default App

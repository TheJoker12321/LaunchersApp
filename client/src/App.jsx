import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddLauncher from './pages/AddLauncher'
import LauncherDetails from './pages/LauncherDetails'
import LoginPage from './pages/LoginPage'
import Register from './components/Register'
import Users from './pages/Users'

function App() {




  return (
    
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/getUsers' element={<Users />} />
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

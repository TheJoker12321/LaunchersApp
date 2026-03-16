import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddLauncher from './pages/AddLauncher'
import LauncherDetails from './pages/LauncherDetails'

function App() {

  return (
    
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
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

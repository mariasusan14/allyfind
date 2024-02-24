import { Route, Routes } from 'react-router-dom'
import { Auth } from '../components/auth'
import ProfileSetup from './pages/ProfileSetup'

import './App.css'
function App() {
  return(
    <div className='app'>
      
    <Routes>
      <Route path="/" element={<Auth/>} />
      <Route path="/profile" element={<ProfileSetup/>}/>
    </Routes>
    </div>
  )
  
}

export default App


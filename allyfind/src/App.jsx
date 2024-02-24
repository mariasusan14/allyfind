import { Route, Routes } from 'react-router-dom'
import { Auth } from '../components/auth'
import Interests  from './pages/ProfileSetup'
import ProfileSetup from './pages/ProfileSetup'

import './App.css'
function App() {
  return(
    <div className='app'>
      
    <Routes>
      <Route path="/" element={<Auth/>} />
      <Route path="/details" element={<Interests/>}/>
      <Route path="/profile" element={<ProfileSetup/>}/>
    </Routes>
    </div>
  )
  
}

export default App


import { Route, Routes } from 'react-router-dom'
import { Auth } from '../components/auth'
import ProfileSetup from './pages/ProfileSetup'
import { Dashboard } from '../components/dashboard'
import './App.css'

function App() {
  return(
    <div className='app'>
      
    <Routes>
      <Route path="/" element={<Auth/>} />
      <Route path="/profile/:userId" element={<ProfileSetup/>}/>
      {/*<Route path="/dashboard" element={<Dashboard/>}/>*/}
      <Route path="/dashboard/:userId" element={<Dashboard />} />
    </Routes>
    </div>
  )
  
}

export default App


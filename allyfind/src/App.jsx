import { Route, Routes } from 'react-router-dom'
import { Auth } from '../components/auth'
import {ProfileSetup} from './pages/ProfileSetup'
import { Dashboard } from '../components/dashboard'
import './App.css'
import { MatchFound } from '../matching/matchfound'
import About from '../components/About'
import StudyRoom from './pages/StudyRoom'

function App() {
  return(
    <div className='app'>
      
    <Routes>
      <Route path="/auth" element={<Auth/>} />
      <Route path="/profile/:userId" element={<ProfileSetup/>}/>
      {/*<Route path="/dashboard" element={<Dashboard/>}/>*/}
      <Route path="/dashboard/:userId" element={<Dashboard />} />
      <Route path="/matchfound/:userId" element={<MatchFound/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/room" element={<StudyRoom/>}/>
    </Routes>
    </div>
  )
  
}

export default App


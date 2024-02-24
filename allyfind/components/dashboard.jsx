import { Link, Route, Routes } from 'react-router-dom'
import { auth } from '../src/config/firebase'
export const Dashboard=()=>{
  return(
    <div>
      <Link to={`/profile/${auth.currentUser.uid}`}>
      <button>Find Your Partner</button>
      </Link>
    </div>
  )
}
import { useState } from "react"
import {createUserWithEmailAndPassword,signOut} from "firebase/auth"
import { auth } from "../config/firebase"
export const Auth=()=>{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const signin=async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password)
        }
        catch(e){
            console.error(e)
        }        
    }
    const logout=async()=>{
        try{
            await signOut(auth)
        }
        catch(e){
            console.error(e)
        }        
    }
    return(
        <div>
            <input 
                placeholder="email..."
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
                placeholder="password..."
                onChange={(e)=>setPassword(e.target.value)}
                />
            <button onClick={signin}>Sign in</button>
            <button onClick={logout}>Sign out</button>
        </div>
    )
}
import { useState } from "react"
import {createUserWithEmailAndPassword,signOut} from "firebase/auth"
import { auth } from "../src/config/firebase"
import { collection, addDoc } from "firebase/firestore";
import { db } from '../src/config/firebase';
export const Auth=()=>{
    const userref=collection(db,"user")
    const detailsref=collection(db,"details")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const submitUser=async()=>{
        try{
            const userDocRef = await addDoc(userref, { email: email, password: password });            
            await createUserWithEmailAndPassword(auth, email, password);
        } catch(e){
          console.error(e)
        }    
      }
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
            <button onClick={submitUser}>Sign up</button>
            <button onClick={logout}>Sign out</button>
        </div>
    )
}

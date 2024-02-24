// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9j-NnREQay_y3HUs58u1U2oCM4yHT4oc",
  authDomain: "allyfind-32a31.firebaseapp.com",
  projectId: "allyfind-32a31",
  storageBucket: "allyfind-32a31.appspot.com",
  messagingSenderId: "909432040882",
  appId: "1:909432040882:web:6dd55dcbb2bdb68401c8ab",
  measurementId: "G-DRXRC0HM53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db =getFirestore(app)
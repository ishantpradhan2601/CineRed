import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// NOTE: These are placeholder values. In a real project, use .env files.
const firebaseConfig = {
  apiKey: "AIzaSyDaw_6R4t3Ii-u-n7oeT_MR8nrpdl8oRNs",
  authDomain: "cinered-movies.firebaseapp.com",
  projectId: "cinered-movies",
  storageBucket: "cinered-movies.firebasestorage.app",
  messagingSenderId: "724562837216",
  appId: "1:724562837216:web:0c2c7486d6fd585149da85",
  measurementId: "G-VFR6V7ZLCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

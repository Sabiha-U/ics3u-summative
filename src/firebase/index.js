import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyA6I_N5znAKElfWlZMT1O6COtQ4ZgehUZ8",
    authDomain: "summative-2411d.firebaseapp.com",
    projectId: "summative-2411d",
    storageBucket: "summative-2411d.firebasestorage.app",
    messagingSenderId: "1003407905206",
    appId: "1:1003407905206:web:e09dba7b615666f56f7117"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };
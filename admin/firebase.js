import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBL9hveWlaPMio3c72TRcAwzYruh10pbR8",
    authDomain: "comedyconnect-b04b8.firebaseapp.com",
    databaseURL: "https://comedyconnect-b04b8-default-rtdb.firebaseio.com",
    projectId: "comedyconnect-b04b8",
    storageBucket: "comedyconnect-b04b8.appspot.com", // FIXED storageBucket
    messagingSenderId: "78649595404",
    appId: "1:78649595404:web:2222dbb109f413b2200029"
 };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

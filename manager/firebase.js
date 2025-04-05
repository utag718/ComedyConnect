// Ensure Firebase v8 Syntax
const firebaseConfig = {
  apiKey: "AIzaSyBL9hveWlaPMio3c72TRcAwzYruh10pbR8",
  authDomain: "comedyconnect-b04b8.firebaseapp.com",
  databaseURL: "https://comedyconnect-b04b8-default-rtdb.firebaseio.com",
  projectId: "comedyconnect-b04b8",
  storageBucket: "comedyconnect-b04b8.appspot.com",
  messagingSenderId: "78649595404",
  appId: "1:78649595404:web:2222dbb109f413b2200029"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// Firebase References
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

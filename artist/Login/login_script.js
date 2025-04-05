// Firebase Configuration (Replace with your own config)
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Get elements
const formTitle = document.getElementById("form-title");
const nameField = document.getElementById("name-field");
const roleField = document.getElementById("role-field");
const authBtn = document.getElementById("auth-btn");
const toggleText = document.getElementById("toggle-text");
const toggleBtn = document.getElementById("toggle-btn");
const authForm = document.getElementById("auth-form");

// Toggle between Login & Register
let isLogin = true;
toggleBtn.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.innerText = isLogin ? "Login" : "Register";
    authBtn.innerText = isLogin ? "Login" : "Register";
    nameField.classList.toggle("hidden", isLogin);
    roleField.classList.toggle("hidden", isLogin);
});

// Handle form submission
authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("full-name") ? document.getElementById("full-name").value : "";
    const role = document.getElementById("role") ? document.getElementById("role").value : "customer";

    if (!email || !password || (!isLogin && !fullName)) {
        alert("Please fill in all fields!");
        return;
    }

    if (!isLogin) {
        // Register user
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                db.ref("users/" + userId).set({
                    name: fullName,
                    email: email,
                    role: role,
                    profilePicture: "",
                    phone: "",
                    favorites: [],
                    createdAt: new Date().toISOString()
                });
                alert("Registration Successful! You can now login.");
                toggleBtn.click(); // Switch to login
            })
            .catch((error) => alert(error.message));
    } else {
        // Login user
        auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const userId = userCredential.user.uid;
        
        // Fetch user role from Firebase Database
        db.ref("users/" + userId).once("value")
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userRole = userData.role;

                    // Redirect based on role
                    if (userRole === "admin") {
                        window.location.href = "/admin/admin_home.html";
                    } else if (userRole === "artist") {
                        window.location.href = "/artist/Dashboard/dashboard.html";
                    } else if (userRole === "venue_manager") {
                        window.location.href = "/manager/index.html";
                    } else {
                        window.location.href = "/customer/dashboard.html"; // Default page
                    }
                } else {
                    alert("User data not found!");
                }
            })
            .catch((error) => alert("Error fetching user data: " + error.message));
    })
    .catch((error) => alert(error.message));

    }
});
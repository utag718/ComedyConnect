import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add Venue Function
async function addVenue(name, capacity, facilities) {
    try {
        await addDoc(collection(db, "venues"), {
            name,
            capacity,
            facilities
        });
        alert("Venue added successfully!");
    } catch (error) {
        console.error("Error adding venue:", error);
    }
}

// Function to Fetch & Display Venues
async function loadVenues() {
    const querySnapshot = await getDocs(collection(db, "venues"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
}

// Load Venues on Page Load
document.addEventListener("DOMContentLoaded", loadVenues);

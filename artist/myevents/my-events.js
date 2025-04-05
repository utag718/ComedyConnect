import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 🔥 Firebase Configuration
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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const loggedInArtistId = "userIdArtist123"; // Replace with actual logged-in artist ID

// 📌 Function to fetch and display events
async function fetchMyEvents() {
    const eventsTable = document.getElementById("eventsTable");
    eventsTable.innerHTML = "<tr><td colspan='5' style='text-align: center;'>Loading events...</td></tr>";

    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, "events"));

        if (!snapshot.exists()) {
            eventsTable.innerHTML = "<tr><td colspan='5' style='text-align: center;'>No events found.</td></tr>";
            return;
        }

        const eventsData = snapshot.val();
        const eventRows = [];

        // Collect venue fetch promises
        const venuePromises = Object.keys(eventsData).map(async (eventId) => {
            const event = eventsData[eventId];
            if (event.artistId === loggedInArtistId) {
                const venueSnapshot = await get(child(dbRef, `venues/${event.venueId}`));
                const venueName = venueSnapshot.exists() ? venueSnapshot.val().name : "Unknown Venue";

                eventRows.push(`
                    <tr>
                        <td>${event.title}</td>
                        <td>${event.date} at ${event.time}</td>
                        <td>${venueName}</td>
                        <td>$${event.ticketPrice}</td>
                        <td>${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</td>
                    </tr>
                `);
            }
        });

        await Promise.all(venuePromises); // Wait for all venue fetches
        eventsTable.innerHTML = eventRows.length ? eventRows.join("") : "<tr><td colspan='5' style='text-align: center;'>No events found.</td></tr>";

    } catch (error) {
        console.error("Error fetching events:", error);
        eventsTable.innerHTML = "<tr><td colspan='5' style='text-align: center;'>Error loading events.</td></tr>";
    }
}

function generatePoster(title, date, venue, price) {
    const canvas = document.getElementById("posterCanvas");
    const ctx = canvas.getContext("2d");

    // Background Color
    ctx.fillStyle = "#f49cbb"; // Soft Pink Background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Event Title
    ctx.fillStyle = "#000";
    ctx.font = "bold 24px Arial";
    ctx.fillText(title, 50, 100);

    // Event Details
    ctx.font = "18px Arial";
    ctx.fillText(`Date: ${date}`, 50, 150);
    ctx.fillText(`Venue: ${venue}`, 50, 200);
    ctx.fillText(`Ticket Price: ${price}`, 50, 250);

    // Generate Image and Show Share Button
    document.getElementById("shareInstagram").style.display = "block";
    document.getElementById("shareInstagram").onclick = function () {
        shareOnInstagram(canvas);
    };
}

function shareOnInstagram(canvas) {
    canvas.toBlob((blob) => {
        const file = new File([blob], "event_poster.png", { type: "image/png" });
        const data = new FormData();
        data.append("file", file);

        // Instagram Intent URL
        const instagramUrl = `https://www.instagram.com/sharing/share-offsite/?url=${URL.createObjectURL(file)}`;

        // Open Instagram Share
        window.open(instagramUrl, "_blank");
    });
}

// Load Events when the page loads
document.addEventListener("DOMContentLoaded", fetchMyEvents);

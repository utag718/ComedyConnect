// Firebase Configuration
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
const db = firebase.database();
const venuesRef = db.ref("venues");
const eventsRef = db.ref("events");
const notificationsRef = db.ref("notifications");

// Load Available Venues
function loadAvailableVenues() {
    const venueContainer = document.getElementById("venueContainer");
    venueContainer.innerHTML = `<p>Loading venues...</p>`;

    venuesRef.once("value", (snapshot) => {
        venueContainer.innerHTML = ""; // Clear loading text
        snapshot.forEach((venue) => {
            const venueData = venue.val();
            const venueCard = document.createElement("div");
            venueCard.classList.add("venue-card");
            venueCard.innerHTML = `
                <h3>${venueData.name}</h3>
                <p><strong>Location:</strong> ${venueData.location}</p>
                <p><strong>Capacity:</strong> ${venueData.capacity}</p>
                <p><strong>Available Dates:</strong> ${venueData.availableDates.join(", ")}</p>
                <button class="selectVenue" data-id="${venue.key}">Select Venue</button>
            `;
            venueContainer.appendChild(venueCard);
        });

        document.querySelectorAll(".selectVenue").forEach(button => {
            button.addEventListener("click", function () {
                document.querySelectorAll(".selectVenue").forEach(btn => btn.classList.remove("selected"));
                this.classList.add("selected");
            });
        });
    });
}

// Event Booking Form
document.getElementById("openEventForm").addEventListener("click", function () {
    openEventForm();
});

function openEventForm() {
    const eventFormContainer = document.getElementById("eventFormContainer");

    // Remove existing form
    eventFormContainer.innerHTML = "";

    // Create form HTML
    const formHtml = `
        <div class="event-form-container">
            <h2>Create New Event</h2>
            <label>Event Name:</label>
            <input type="text" id="eventName">
            
            <label>Date:</label>
            <input type="date" id="eventDate">
            
            <label>Comedy Type:</label>
            <select id="eventCategory">
                <option value="stand-up">Stand-up</option>
                <option value="improv">Improv</option>
                <option value="roast">Roast</option>
            </select>
            
            <label>Selected Venue:</label>
            <p id="selectedVenueName">None</p>
            
            <button id="submitEvent">Submit</button>
            <button id="cancelEvent">Cancel</button>
        </div>
    `;

    eventFormContainer.innerHTML = formHtml;

    document.getElementById("cancelEvent").addEventListener("click", () => {
        eventFormContainer.innerHTML = "";
    });

    document.getElementById("submitEvent").addEventListener("click", submitEvent);
}

// Submit Event
function submitEvent() {
    const eventName = document.getElementById("eventName").value.trim();
    const eventDate = document.getElementById("eventDate").value;
    const eventCategory = document.getElementById("eventCategory").value;
    const selectedVenue = document.querySelector(".selectVenue.selected");

    if (!eventName || !eventDate || !selectedVenue) {
        alert("Please fill in all fields and select a venue.");
        return;
    }

    const newEventRef = eventsRef.push();
    newEventRef.set({
        title: eventName,
        date: eventDate,
        genre: eventCategory,
        venueId: selectedVenue.dataset.id,
        venue: selectedVenue.parentNode.querySelector("h3").textContent,
        status: "pending"
    });

    // Notify Location Manager
    db.ref("location_manager_requests").push({
        eventId: newEventRef.key,
        venueId: selectedVenue.dataset.id,
        status: "pending"
    });

    document.getElementById("eventFormContainer").innerHTML = "";
    alert("Event submitted for approval!");
}

// Load Artist Profile
function loadArtistProfile() {
    const artistRef = db.ref("users/userId123"); // Replace with actual user ID
    artistRef.once("value", (snapshot) => {
        const artistData = snapshot.val();
        if (artistData) {
            document.getElementById("artistName").textContent = artistData.name;
            document.getElementById("artistEmail").textContent = artistData.email;
            document.getElementById("profilePic").src = artistData.profilePicture || "artist_assets/ab1.png";
        }
    });
}

// Handle Profile Picture Upload
document.getElementById("uploadProfilePic").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profilePic").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Load Events Overview
/*function loadEvents() {
    const eventsContainer = document.getElementById("eventsContainer");
    eventsContainer.innerHTML = "<p>Loading events...</p>";

    eventsRef.once("value", (snapshot) => {
        eventsContainer.innerHTML = "";
        snapshot.forEach((event) => {
            const eventData = event.val();
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h3>${eventData.title}</h3>
                <p><strong>Date:</strong> ${eventData.date}</p>
                <p><strong>Genre:</strong> ${eventData.genre}</p>
                <p><strong>Venue:</strong> ${eventData.venue || "TBA"}</p>
                <p><strong>Status:</strong> <span class="${eventData.status}">${eventData.status}</span></p>
            `;
            eventsContainer.appendChild(eventCard);
        });
    });
}*/

// Load Notifications
function loadNotifications() {
    const notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = "<p>Loading notifications...</p>";

    notificationsRef.once("value", (snapshot) => {
        notificationList.innerHTML = "";
        snapshot.forEach((notification) => {
            const notifData = notification.val();
            const notifItem = document.createElement("div");
            notifItem.classList.add("notification-item");
            notifItem.innerHTML = `
                <p>${notifData.message}</p>
                <span>${new Date(notifData.timestamp).toLocaleString()}</span>
            `;
            notificationList.appendChild(notifItem);
        });
    });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    loadAvailableVenues();
    loadArtistProfile();
    loadEvents();
    loadNotifications();
});

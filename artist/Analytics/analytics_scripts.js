// Firebase Configuration (Replace with your details)
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
const database = firebase.database();

// Function to Fetch Event Stats
function fetchEventStats() {
    database.ref("events").once("value", (snapshot) => {
        let totalEvents = 0, upcomingEvents = 0, completedEvents = 0;
        let eventsData = [];
        let artistData = {};
        let locationData = {};

        snapshot.forEach((event) => {
            let eventData = event.val();
            totalEvents++;
            eventsData.push(eventData);

            // Count statuses
            if (eventData.status === "upcoming") upcomingEvents++;
            if (eventData.status === "completed") completedEvents++;

            // Track artist performance
            if (eventData.artist) {
                artistData[eventData.artist] = (artistData[eventData.artist] || 0) + eventData.audience;
            }

            // Track location performance
            if (eventData.location) {
                locationData[eventData.location] = (locationData[eventData.location] || 0) + eventData.audience;
            }
        });

        // Update stats
        document.getElementById("totalEvents").textContent = totalEvents;
        document.getElementById("upcomingEvents").textContent = upcomingEvents;
        document.getElementById("completedEvents").textContent = completedEvents;

        // Show most popular events
        showPopularEvents(eventsData);

        // Render Charts
        renderArtistChart(artistData);
        renderLocationChart(locationData);
    });
}

// Function to Display Top 3 Popular Events
function showPopularEvents(events) {
    events.sort((a, b) => b.audience - a.audience);
    const topEvents = events.slice(0, 3);
    const list = document.getElementById("popularEventsList");
    list.innerHTML = "";

    topEvents.forEach(event => {
        const li = document.createElement("li");
        li.textContent = `${event.title} - ${event.audience} attendees`;
        list.appendChild(li);
    });
}

// Function to Render Artist Chart
function renderArtistChart(artistData) {
    const ctx = document.getElementById("artistChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(artistData),
            datasets: [{
                label: "Total Audience",
                data: Object.values(artistData),
                backgroundColor: "#f49cbb"
            }]
        }
    });
}

// Function to Render Location Chart
function renderLocationChart(locationData) {
    const ctx = document.getElementById("locationChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(locationData),
            datasets: [{
                label: "Total Audience",
                data: Object.values(locationData),
                backgroundColor: ["#f6ae2d", "#4caf50", "#f26241", "#880d1e"]
            }]
        }
    });
}

// Navigate Function
function navigateTo(page) {
    window.location.href = page;
}

// Load Data
document.addEventListener("DOMContentLoaded", fetchEventStats);

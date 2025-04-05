import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2O9jsyrR3D-5exBvJ8YRu0J965CuW8os",
    authDomain: "teamupi.firebaseapp.com",
    databaseURL: "https://teamupi-default-rtdb.firebaseio.com/",
    projectId: "teamupi",
    storageBucket: "teamupi.appspot.com",
    messagingSenderId: "560554049296",
    appId: "1:560554049296:web:5c31effe434c034126af95",
    measurementId: "G-PHCD35DEY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM elements
const totalEarningsElem = document.getElementById("total-earnings");
const lastUpdatedElem = document.getElementById("last-updated");
const earningsTable = document.getElementById("earnings-table");

// Fetch and display revenue data
function loadRevenueData() {
    const revenueRef = ref(db, "revenue");

    onValue(revenueRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            totalEarningsElem.textContent = `$${data.totalEarnings.toLocaleString()}`;
            lastUpdatedElem.textContent = data.lastUpdated;

            // Populate earnings table
            let tableHTML = "";
            let chartLabels = [];
            let chartData = [];
            let colors = ["#ff5733", "#33ff57", "#3375ff", "#f4a261", "#2a9d8f"];

            Object.values(data.events).forEach((event, index) => {
                tableHTML += `
                    <tr>
                        <td>${event.date}</td>
                        <td>${event.name}</td>
                        <td>${event.ticketsSold}</td>
                        <td>$${event.revenue}</td>
                    </tr>
                `;
                chartLabels.push(event.name);
                chartData.push(event.ticketsSold);
            });

            earningsTable.innerHTML = tableHTML;
            updateChart(chartLabels, chartData, colors);
        } else {
            totalEarningsElem.textContent = "$0";
            lastUpdatedElem.textContent = "-";
            earningsTable.innerHTML = `<tr><td colspan="4" class="text-center">No data available</td></tr>`;
        }
    });
}

// Initialize chart
let bookingChart;

function updateChart(labels, data, colors) {
    const ctx = document.getElementById("bookingChart").getContext("2d");
    
    if (bookingChart) {
        bookingChart.destroy();
    }

    bookingChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Tickets Sold",
                data: data,
                backgroundColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Load data on page load
loadRevenueData();

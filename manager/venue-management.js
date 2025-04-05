
// 🚀 Wait for DOM to Load
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("venueForm");
    const venueContainer = document.createElement("div");
    venueContainer.classList.add("row", "mt-4");
    document.querySelector(".container").appendChild(venueContainer);

    let venues = [];

    if (!form) {
        console.error("⚠️ Form element not found!");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("✅ Form submit event triggered!");

        // Get form values
        const venueName = document.querySelector("input[name='venueName']").value.trim();
        const location = document.querySelector("input[name='location']").value.trim();
        const capacity = document.querySelector("input[name='capacity']").value.trim();
        const facilities = document.querySelector("textarea[name='facilities']").value.trim();
        const availableDates = document.querySelector("input[name='availableDates']").value.trim();
        const venueImages = document.querySelector("input[name='venueImages']").files;

        console.log("📌 Venue Name:", venueName);
        console.log("📌 Location:", location);
        console.log("📌 Capacity:", capacity);
        console.log("📌 Facilities:", facilities);
        console.log("📌 Available Dates:", availableDates);
        console.log("📌 Venue Images Count:", venueImages.length);

        // ✅ Validation
        if (!venueName || !location || !capacity || !facilities || !availableDates) {
            alert("⚠️ Please fill in all fields!");
            return;
        }

        if (venueImages.length === 0) {
            alert("⚠️ Please upload at least one image!");
            return;
        }

        // Convert images to data URLs for preview
        let imageUrls = [];
        let filesProcessed = 0;

        Array.from(venueImages).forEach(file => {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageUrls.push(e.target.result);
                filesProcessed++;

                if (filesProcessed === venueImages.length) {
                    // All images processed, add venue to array
                    addVenue(venueName, location, capacity, facilities, availableDates.split(","), imageUrls);
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset form
        form.reset();
        document.getElementById("selectedDates").innerHTML = "";
        document.querySelector("input[name='availableDates']").value = "";
    });

    function addVenue(name, location, capacity, facilities, dates, images) {
        const venue = { name, location, capacity, facilities, dates, images };
        venues.push(venue);
        renderVenues();
    }

    function renderVenues() {
        venueContainer.innerHTML = "";
        venues.forEach((venue, index) => {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");
            card.innerHTML = `
                <div class="card shadow-lg">
                    <div id="venueCarousel${index}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            ${venue.images.map((img, i) => `
                                <div class="carousel-item ${i === 0 ? "active" : ""}">
                                    <img src="${img}" class="d-block w-100" style="height: 200px; object-fit: cover;">
                                </div>
                            `).join("")}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#venueCarousel${index}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#venueCarousel${index}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${venue.name}</h5>
                        <p class="card-text"><strong>Location:</strong> ${venue.location}</p>
                        <p class="card-text"><strong>Capacity:</strong> ${venue.capacity}</p>
                        <p class="card-text"><strong>Facilities:</strong> ${venue.facilities}</p>
                        <p class="card-text"><strong>Available Dates:</strong> ${venue.dates.join(", ")}</p>
                    </div>
                </div>
            `;
            venueContainer.appendChild(card);
        });
    }
});


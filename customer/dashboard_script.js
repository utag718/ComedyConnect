// Sample event data (in a real application, this would come from an API)
const events = [
    {
        id: 1,
        title: 'Hasya Katta Comedy Night',
        date: '15-02-2024',
        time: '19:30',
        venue: 'Bal Gandharva Rang Mandir, Pune',
        location: 'pune',
        genre: 'standup',
        language: 'marathi',
        artist: 'Bhau Kadam',
        price: 499,
        image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300',
        availableSeats: generateRandomSeats()
    },
    {
        id: 2,
        title: 'Queens of Comedy',
        date: '16-02-2024',
        time: '20:00',
        venue: 'Canvas Laugh Club, Mumbai',
        location: 'mumbai',
        genre: 'women',
        language: 'english',
        artist: 'Aditi Mittal',
        price: 799,
        image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300',
        availableSeats: generateRandomSeats()
    },
    {
        id: 3,
        title: 'Pride & Punchlines',
        date: '17-02-2024',
        time: '21:00',
        venue: 'The Habitat, Mumbai',
        location: 'mumbai',
        genre: 'lgbtqa',
        language: 'english',
        artist: 'Alex Mathew',
        price: 599,
        image: 'https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300',
        availableSeats: generateRandomSeats()
    },
    {
        id: 4,
        title: 'Bachon Ki Comedy Class',
        date: '18-02-2024',
        time: '16:00',
        venue: 'Rangsharda Auditorium, Mumbai',
        location: 'mumbai',
        genre: 'kids',
        language: 'hindi',
        artist: 'The Giggles Group',
        price: 299,
        image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300',
        availableSeats: generateRandomSeats()
    },
    {
        id: 5,
        title: 'Improv Ki Mehfil',
        date: '19-02-2024',
        time: '19:00',
        venue: 'Prithvi Theatre, Mumbai',
        location: 'mumbai',
        genre: 'improv',
        language: 'hindi',
        artist: 'Nautanki Improvisers',
        price: 449,
        image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300',
        availableSeats: generateRandomSeats()
    },
    {
        id: 6,
        title: 'Open Mic for Rising Stars',
        date: '20-02-2024',
        time: '20:30',
        venue: 'The Hive, Mumbai',
        location: 'mumbai',
        genre: 'budding',
        language: 'english',
        artist: 'Various Artists',
        price: 199,
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300',
        availableSeats: generateRandomSeats()
    },
    {
        id: 7,
        title: 'Sketch Comedy Spectacular',
        date: '21-02-2024',
        time: '20:00',
        venue: 'G5A Foundation, Mumbai',
        location: 'mumbai',
        genre: 'sketch',
        language: 'english',
        artist: 'The Sketch Factory',
        price: 699,
        image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300',
        availableSeats: generateRandomSeats()
    }
];

// Generate random seat availability
function generateRandomSeats() {
    const seats = [];
    for (let i = 0; i < 64; i++) {
        seats.push(Math.random() > 0.3); // 70% chance of seat being available
    }
    return seats;
}

// DOM Elements
const eventsContainer = document.getElementById('events-container');
const dateFilter = document.getElementById('date-filter');
const locationFilter = document.getElementById('location-filter');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('booking-modal');
const closeModal = document.querySelector('.close-modal');
const modalEventTitle = document.getElementById('modal-event-title');
const modalEventDatetime = document.getElementById('modal-event-datetime');
const modalEventVenue = document.getElementById('modal-event-venue');
const seatMap = document.getElementById('seat-map');
const selectedSeatsElement = document.getElementById('selected-seats');
const totalAmountElement = document.getElementById('total-amount');
const confirmBookingBtn = document.getElementById('confirm-booking');

function filterEvents() {
    const dateValue = dateFilter.value;
    const location = locationFilter.value.toLowerCase();
    const searchQuery = searchInput.value.toLowerCase();
    const activeGenre = document.querySelector('.genre-item.active').dataset.genre;

    return events.filter(event => {
        // Simplified date matching logic
        const dateMatch = !dateValue || event.date === dateValue;
        const locationMatch = !location || event.location.includes(location);
        const searchMatch = !searchQuery || 
            event.title.toLowerCase().includes(searchQuery) || 
            event.artist.toLowerCase().includes(searchQuery) || 
            event.venue.toLowerCase().includes(searchQuery);
        const genreMatch = activeGenre === 'all' || event.genre === activeGenre;

        return dateMatch && locationMatch && searchMatch && genreMatch;
    });
}

// Create event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="event-image">
        <div class="event-details">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-info">${event.date} at ${event.time}</p>
            <p class="event-info">${event.venue}</p>
            <p class="event-info">Artist: ${event.artist}</p>
            <p class="event-price">₹${event.price}</p>
            <button class="btn-book" data-event-id="${event.id}">Book Now</button>
        </div>
    `;

    card.querySelector('.btn-book').addEventListener('click', () => openBookingModal(event));
    return card;
}

// Render filtered events
function renderEvents() {
    const filteredEvents = filterEvents();
    eventsContainer.innerHTML = '';
    filteredEvents.forEach(event => {
        eventsContainer.appendChild(createEventCard(event));
    });
}

// Open booking modal
function openBookingModal(event) {
    currentEvent = event;
    selectedSeats.clear();
    modalEventTitle.textContent = event.title;
    modalEventDatetime.textContent = `${event.date} at ${event.time}`;
    modalEventVenue.textContent = event.venue;
    renderSeatMap();
    updateBookingSummary();
    modal.style.display = 'block';
}

// Render seat map
function renderSeatMap() {
    seatMap.innerHTML = '';
    currentEvent.availableSeats.forEach((available, index) => {
        const seat = document.createElement('div');
        seat.className = `seat ${available ? 'available' : 'occupied'}`;
        seat.textContent = index + 1;
        if (available) {
            seat.addEventListener('click', () => toggleSeat(index));
        }
        seatMap.appendChild(seat);
    });
}

// Toggle seat selection
function toggleSeat(index) {
    const seatElement = seatMap.children[index];
    if (selectedSeats.has(index)) {
        selectedSeats.delete(index);
        seatElement.classList.remove('selected');
    } else {
        selectedSeats.add(index);
        seatElement.classList.add('selected');
    }
    updateBookingSummary();
}

// Update booking summary
function updateBookingSummary() {
    const seatNumbers = Array.from(selectedSeats).map(index => index + 1).join(', ');
    selectedSeatsElement.textContent = seatNumbers || 'None';
    totalAmountElement.textContent = (currentEvent.price * selectedSeats.size).toFixed(2);
}

// Event listeners
dateFilter.addEventListener('change', renderEvents);
locationFilter.addEventListener('input', renderEvents);
searchInput.addEventListener('input', renderEvents);

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

confirmBookingBtn.addEventListener('click', () => {
    if (selectedSeats.size === 0) {
        alert('Please select at least one seat');
        return;
    }

    // Get existing bookings or initialize empty array
    let userBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');

    // Create new booking entries for each selected seat
    selectedSeats.forEach(seatNumber => {
        const booking = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            eventName: currentEvent.title,
            date: currentEvent.date,
            time: currentEvent.time,
            venue: currentEvent.venue,
            seatNumber: seatNumber + 1,
            status: 'Confirmed',
            bookingDate: new Date().toISOString(),
            price: currentEvent.price,
            artist: currentEvent.artist,
            genre: currentEvent.genre,
            language: currentEvent.language
        };
        userBookings.push(booking);
    });

    // Save updated bookings to localStorage
    localStorage.setItem('userBookings', JSON.stringify(userBookings));

    // Update available seats
    selectedSeats.forEach(seatIndex => {
        currentEvent.availableSeats[seatIndex] = false;
    });

    // Close modal and show success message
    modal.style.display = 'none';
    alert('Booking confirmed! View your bookings in the profile page.');
    
    // Clear selected seats
    selectedSeats.clear();
    renderEvents();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Add event listeners for genre filter
document.querySelectorAll('.genre-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.genre-item.active').classList.remove('active');
        item.classList.add('active');
        renderEvents();
    });
});

// Initial render
renderEvents();
let currentEvent;
let selectedSeats = new Set();

let startDate = null;
let endDate = null;

// Initialize date picker
const dateFilterContainer = document.createElement('div');
dateFilterContainer.className = 'date-picker-container';

// Get the date filter input element's parent container
const dateFilterParent = dateFilter.parentElement;
dateFilterParent.style.position = 'relative';
dateFilterParent.appendChild(dateFilterContainer);

// Update date picker initialization
dateFilterContainer.innerHTML = `
    <div class="date-picker-dropdown">
        <div class="date-input-fields">
            <div class="date-input-group">
                <label for="date-input">Select Date</label>
                <input type="text" id="date-input" class="date-input" placeholder="DD-MM-YYYY" readonly>
            </div>
        </div>
        <div class="date-picker-footer">
            <button class="reset-btn">Reset</button>
            <button class="apply-btn">Apply</button>
        </div>
    </div>
`;

// Update date picker event listeners
const dateInput = dateFilterContainer.querySelector('#date-input');

dateInput.addEventListener('change', (e) => {
    dateFilter.value = e.target.value;
    renderEvents();
});

dateFilterContainer.querySelector('.reset-btn').addEventListener('click', () => {
    dateFilter.value = '';
    dateInput.value = '';
    renderEvents();
    dateFilterContainer.classList.remove('show');
});

dateFilterContainer.querySelector('.apply-btn').addEventListener('click', () => {
    if (dateInput.value) {
        dateFilter.value = dateInput.value;
        renderEvents();
    }
    dateFilterContainer.classList.remove('show');
});

// Close calendar when clicking outside
document.addEventListener('click', (e) => {
    if (!dateFilterContainer.contains(e.target) && e.target !== dateFilter) {
        dateFilterContainer.classList.remove('show');
    }
});

// Add event listeners for date inputs
const startDateInput = dateFilterContainer.querySelector('#start-date-input');
const endDateInput = dateFilterContainer.querySelector('#end-date-input');

startDateInput.addEventListener('change', (e) => {
    startDate = e.target.value;
    if (endDate && startDate > endDate) {
        const temp = endDate;
        endDate = startDate;
        startDate = temp;
        endDateInput.value = endDate;
        startDateInput.value = startDate;
    }
    updateCalendar();
});

endDateInput.addEventListener('change', (e) => {
    endDate = e.target.value;
    if (startDate && endDate < startDate) {
        const temp = startDate;
        startDate = endDate;
        endDate = temp;
        startDateInput.value = startDate;
        endDateInput.value = endDate;
    }
    updateCalendar();
});

// Update input fields when calendar selection changes
function updateDateInputs() {
    if (startDate) startDateInput.value = startDate;
    if (endDate) endDateInput.value = endDate;
}

function updateDateDisplay() {
    const startDisplay = dateFilterContainer.querySelector('#start-date-display');
    const endDisplay = dateFilterContainer.querySelector('#end-date-display');
    
    if (startDisplay && endDisplay) {
        startDisplay.textContent = startDate || 'Not selected';
        endDisplay.textContent = endDate || 'Not selected';
    }
}

// Add event listeners for genre filter
document.querySelectorAll('.genre-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.genre-item.active').classList.remove('active');
        item.classList.add('active');
        renderEvents();
    });
});

// Initial render
renderEvents();
// Sample comedy events data
const eventsData = [
    {
        id: 1,
        title: "Late Night Comedy Show",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&h=500",
        date: "15-02-2024",
        time: "9:00 PM",
        venue: "Comedy Club Downtown",
        price: "₹499",
        genre: "standup",
        artist: "Vir Das"
    },
    {
        id: 2,
        title: "Improv Night Spectacular",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&h=500",
        date: "16-02-2024",
        time: "8:00 PM",
        venue: "The Comedy Theater",
        price: "₹399",
        genre: "improv"
    },
    {
        id: 3,
        title: "Pride Comedy Night",
        image: "https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?auto=format&fit=crop&w=800&h=500",
        date: "17-02-2024",
        time: "7:30 PM",
        venue: "Rainbow Lounge",
        price: "₹449",
        genre: "lgbtqa"
    },
    {
        id: 4,
        title: "Women's Comedy Festival",
        image: "https://images.unsplash.com/photo-1588731234159-8b9963143fca?auto=format&fit=crop&w=800&h=500",
        date: "18-02-2024",
        time: "6:00 PM",
        venue: "City Arts Center",
        price: "₹599",
        genre: "women"
    },
    {
        id: 5,
        title: "Family Comedy Hour",
        image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&h=500",
        date: "19-02-2024",
        time: "4:00 PM",
        venue: "Family Fun Center",
        price: "₹299",
        genre: "kids"
    },
    {
        id: 6,
        title: "Sketch Comedy Night",
        image: "https://images.unsplash.com/photo-1523251343397-aaaf9e50bec9?auto=format&fit=crop&w=800&h=500",
        date: "20-02-2024",
        time: "8:30 PM",
        venue: "Laugh Factory",
        price: "₹349",
        genre: "sketch"
    }
];
renderEvents();

document.getElementById('confirm-booking').addEventListener('click', () => {
    const eventTitle = document.getElementById('modal-event-title').textContent;
    const datetime = document.getElementById('modal-event-datetime').textContent;
    const venue = document.getElementById('modal-event-venue').textContent;
    const seats = document.getElementById('selected-seats').textContent;
    const amount = document.getElementById('total-amount').textContent;

    const bookingData = {
        eventTitle,
        datetime,
        venue,
        seats,
        amount: `₹${amount}`,
        status: 'confirmed'
    };

    // Add the booking to profile page
    window.addNewBooking?.(bookingData);

    // Close the modal
    document.getElementById('booking-modal').style.display = 'none';
    
    // Show success message
    alert('Booking confirmed! Check your profile page for booking details.');
});
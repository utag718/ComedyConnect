// Get user bookings from localStorage
let userBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');

// Function to format date
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Function to create a booking card element
function createBookingCard(booking) {
    const card = document.createElement('div');
    card.className = `booking-card ${booking.status.toLowerCase() === 'cancelled' ? 'cancelled' : ''}`;
    card.dataset.bookingId = booking.id;

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-booking-btn';
    cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    cancelBtn.onclick = () => cancelBooking(booking.id);

    if (booking.status.toLowerCase() === 'cancelled') {
        cancelBtn.style.display = 'none';
    }

    const content = `
        <h4>${booking.eventName}</h4>
        <div class="booking-info">
            <i class="far fa-calendar"></i>
            <span>${booking.date} at ${booking.time}</span>
        </div>
        <div class="booking-info">
            <i class="fas fa-map-marker-alt"></i>
            <span>${booking.venue}</span>
        </div>
        <div class="booking-info">
            <i class="fas fa-user-alt"></i>
            <span>Artist: ${booking.artist}</span>
        </div>
        <div class="booking-info">
            <i class="fas fa-theater-masks"></i>
            <span>Genre: ${booking.genre}</span>
        </div>
        <div class="booking-info">
            <i class="fas fa-language"></i>
            <span>Language: ${booking.language}</span>
        </div>
        <div class="booking-info">
            <i class="fas fa-ticket-alt"></i>
            <span>Seat ${booking.seatNumber}</span>
        </div>
        <div class="booking-info">
            <i class="fas fa-rupee-sign"></i>
            <span>Price: ₹${booking.price}</span>
        </div>
        <div class="booking-info">
            <i class="far fa-clock"></i>
            <span>Booked on: ${formatDate(booking.bookingDate)}</span>
        </div>
        <span class="booking-status status-${booking.status.toLowerCase()}">${booking.status}</span>
    `;

    card.innerHTML = content;
    card.appendChild(cancelBtn);
    return card;
}

function updateClearCancelledButton() {
    const clearCancelledBtn = document.getElementById('clear-cancelled-btn');
    if (!clearCancelledBtn) return;
    
    const hasCancelledEvents = userBookings.some(booking => booking.status.toLowerCase() === 'cancelled');
    clearCancelledBtn.style.display = hasCancelledEvents ? 'flex' : 'none';
}

function cancelBooking(bookingId) {
    // Find the booking in the array
    const bookingIndex = userBookings.findIndex(booking => booking.id === bookingId);
    if (bookingIndex === -1) return;

    // Update the booking status
    userBookings[bookingIndex].status = 'cancelled';
    
    // Save to localStorage
    localStorage.setItem('userBookings', JSON.stringify(userBookings));

    // Update the UI
    const card = document.querySelector(`[data-booking-id="${bookingId}"]`);
    if (!card) return;

    card.classList.add('cancelled');
    const statusLabel = card.querySelector('.booking-status');
    statusLabel.className = 'booking-status status-cancelled';
    statusLabel.textContent = 'Cancelled';

    const cancelBtn = card.querySelector('.cancel-booking-btn');
    if (cancelBtn) {
        cancelBtn.style.display = 'none';
    }

    // Update clear cancelled button visibility
    updateClearCancelledButton();
}

function clearCancelledBookings() {
    // Filter out cancelled bookings
    userBookings = userBookings.filter(booking => booking.status.toLowerCase() !== 'cancelled');
    
    // Save to localStorage
    localStorage.setItem('userBookings', JSON.stringify(userBookings));

    // Update the UI
    displayBookings();
    
    // Hide the clear cancelled button
    updateClearCancelledButton();
}

// Function to display all bookings
function displayBookings() {
    const container = document.getElementById('booking-container');
    container.innerHTML = '';

    if (userBookings.length === 0) {
        container.innerHTML = '<p class="no-bookings">No bookings found</p>';
        return;
    }

    // Display booking cards
    userBookings.forEach(booking => {
        const card = createBookingCard(booking);
        container.appendChild(card);
    });

    // Update clear cancelled button visibility
    updateClearCancelledButton();
}

// Initialize the profile page
document.addEventListener('DOMContentLoaded', () => {
    displayBookings();

    // Set up clear cancelled events button click handler
    const clearCancelledBtn = document.getElementById('clear-cancelled-btn');
    if (clearCancelledBtn) {
        clearCancelledBtn.addEventListener('click', clearCancelledBookings);
    }

    // Handle edit profile button click
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            alert('Edit profile functionality will be implemented here');
        });
    }
});
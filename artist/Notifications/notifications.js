// Function to add a notification
function addNotification(message, type = "info") {
    const container = document.getElementById('notificationContainer');

    if (!container) {
        console.error("Notification container not found!");
        return;
    }

    const notification = document.createElement('div');
    notification.classList.add('notification', type);

    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Example usage
// addNotification("New event created successfully!", "success");
// addNotification("Error: Unable to book venue", "error");

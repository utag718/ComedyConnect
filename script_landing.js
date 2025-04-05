function openLoginModal() {
    window.location.href = '/artist/Login/login.html';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function selectLoginRole(role) {
    const buttons = document.querySelectorAll('.role-buttons button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(role)) {
            btn.classList.add('active');
        }
    });
    
    // Store selected role
    document.getElementById('loginForm').dataset.role = role;
}

function animateNumbers() {
    const stats = [
        { element: document.querySelector('.stats-grid .stat-card:nth-child(1) h3'), end: 500 },
        { element: document.querySelector('.stats-grid .stat-card:nth-child(2) h3'), end: 1000 },
        { element: document.querySelector('.stats-grid .stat-card:nth-child(3) h3'), end: 50000 },
        { element: document.querySelector('.stats-grid .stat-card:nth-child(4) h3'), end: 10000 }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(({ element, end }) => {
                    let current = 0;
                    const increment = end / 50; // Divide animation into 50 steps
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            element.textContent = end.toLocaleString() + '+';
                            clearInterval(timer);
                        } else {
                            element.textContent = Math.floor(current).toLocaleString() + '+';
                        }
                    }, 30); // Update every 30ms
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats');
    observer.observe(statsSection);
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', animateNumbers);

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        const role = this.dataset.role || 'customer'; // Default to customer if no role selected
        
        // Here you would typically send this data to your backend
        console.log('Login attempt:', { email, password, role });
        
        // For demo purposes, just close the modal
        closeModal('loginModal');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal('loginModal');
        }
    });
});
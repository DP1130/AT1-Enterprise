// ===== Navigation =====
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// ===== Helper Functions =====

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Format time
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-AU', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Get capacity status
function getCapacityStatus(registered, capacity) {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 100) return 'full';
    if (percentage >= 80) return 'warning';
    return '';
}

// Create event card HTML
function createEventCard(event, showDescription = false) {
    const capacityPercentage = Math.min((event.registeredCount / event.capacity) * 100, 100);
    const capacityStatus = getCapacityStatus(event.registeredCount, event.capacity);
    
    return `
        <div class="event-card" onclick="openEventModal('${event.eventID}')">
            <div class="event-card-header">
                <span class="event-badge ${categoryColors[event.category]}">${event.category}</span>
                <h3 class="event-title">${event.eventName}</h3>
                <p class="event-school">${event.hostSchool}</p>
            </div>
            <div class="event-card-body">
                <div class="event-info">
                    <div class="event-info-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>${formatDate(event.date)}</span>
                    </div>
                    <div class="event-info-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>${formatTime(event.date)}</span>
                    </div>
                    <div class="event-info-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${event.location}</span>
                    </div>
                </div>
                <div class="event-capacity">
                    <span class="event-info-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>${event.registeredCount}/${event.capacity} registered</span>
                    </span>
                    <div class="capacity-bar">
                        <div class="capacity-fill ${capacityStatus}" style="width: ${capacityPercentage}%"></div>
                    </div>
                </div>
            </div>
            <div class="event-card-footer">
                <a href="register.html?event=${event.eventID}" class="btn btn-primary btn-block" onclick="event.stopPropagation()">
                    ${capacityPercentage >= 100 ? 'Join Waitlist' : 'Register Now'}
                </a>
            </div>
        </div>
    `;
}

// Create school card HTML
function createSchoolCard(school) {
    return `
        <a href="${school.url}" target="_blank" rel="noopener noreferrer" class="school-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>${school.name}</span>
        </a>
    `;
}

// ===== Event Modal =====
function openEventModal(eventID) {
    const event = getEventById(eventID);
    if (!event) return;
    
    const capacityPercentage = Math.min((event.registeredCount / event.capacity) * 100, 100);
    const capacityStatus = getCapacityStatus(event.registeredCount, event.capacity);
    
    const modalHTML = `
        <div class="modal-overlay active" id="eventModal" onclick="closeEventModal(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <div>
                        <span class="event-badge ${categoryColors[event.category]}">${event.category}</span>
                        <h2 class="modal-title" style="margin-top: 0.5rem;">${event.eventName}</h2>
                    </div>
                    <button class="modal-close" onclick="closeEventModal()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <p style="color: var(--muted); margin-bottom: 1rem;">${event.hostSchool}</p>
                    
                    <div class="event-info" style="margin-bottom: 1.5rem;">
                        <div class="event-info-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>${formatDate(event.date)} at ${formatTime(event.date)}</span>
                        </div>
                        <div class="event-info-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>${event.location}</span>
                        </div>
                    </div>
                    
                    <h4 style="font-weight: 600; margin-bottom: 0.5rem;">About this event</h4>
                    <p style="color: var(--foreground); line-height: 1.7; margin-bottom: 1.5rem;">${event.description}</p>
                    
                    <div class="event-capacity">
                        <span class="event-info-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span>${event.registeredCount}/${event.capacity} registered</span>
                        </span>
                        <div class="capacity-bar">
                            <div class="capacity-fill ${capacityStatus}" style="width: ${capacityPercentage}%"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-dark" onclick="closeEventModal()">Close</button>
                    <a href="register.html?event=${event.eventID}" class="btn btn-primary">
                        ${capacityPercentage >= 100 ? 'Join Waitlist' : 'Register Now'}
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function closeEventModal(e) {
    if (e && e.target !== e.currentTarget) return;
    
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
    document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeEventModal();
    }
});

// ===== Animated Counter =====
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// Intersection Observer for counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize counters when DOM is ready
document.addEventListener('DOMContentLoaded', initCounterAnimation);

// ===== Create Star Rating HTML =====
function createStarRatingHTML(rating) {
    let html = '<div class="star-display">';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating ? 'filled' : '';
        html += `
            <svg class="${filled}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        `;
    }
    html += '</div>';
    return html;
}

// ===== URL Parameters =====
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

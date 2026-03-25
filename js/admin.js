// ===== Admin Page Specific JS =====

document.addEventListener('DOMContentLoaded', function() {
    // Load dashboard stats
    loadDashboardStats();
    
    // Load all data tables
    loadEventsTable();
    loadRegistrationsTable();
    loadFeedbackTable();
    
    // Setup tabs
    setupTabs();
});

// Load dashboard statistics
function loadDashboardStats() {
    const events = getEvents();
    const registrations = getRegistrations();
    const feedback = getFeedback();
    
    document.getElementById('totalEvents').textContent = events.length;
    document.getElementById('totalRegistrations').textContent = registrations.length;
    document.getElementById('totalFeedback').textContent = feedback.length;
    document.getElementById('totalSchools').textContent = partnerSchools.length;
}

// Setup tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
}

// Load events table
function loadEventsTable() {
    const events = getEvents();
    const tbody = document.querySelector('#eventsTable tbody');
    
    if (!tbody) return;
    
    tbody.innerHTML = events.map(event => `
        <tr>
            <td><strong>${event.eventName}</strong></td>
            <td>${event.hostSchool}</td>
            <td>${formatDate(event.date)}</td>
            <td><span class="event-badge ${categoryColors[event.category]}">${event.category}</span></td>
            <td>${event.registeredCount}/${event.capacity}</td>
        </tr>
    `).join('');
}

// Load registrations table
function loadRegistrationsTable() {
    const registrations = getRegistrations();
    const events = getEvents();
    const tbody = document.querySelector('#registrationsTable tbody');
    const emptyState = document.getElementById('registrationsEmpty');
    const table = document.getElementById('registrationsTable');
    
    if (!tbody) return;
    
    if (registrations.length === 0) {
        table.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    table.style.display = 'table';
    emptyState.style.display = 'none';
    
    // Sort by newest first
    registrations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    tbody.innerHTML = registrations.map(reg => {
        const event = events.find(e => e.eventID === reg.eventID);
        return `
            <tr>
                <td><strong>${reg.studentName}</strong></td>
                <td>${reg.email}</td>
                <td>${reg.school}</td>
                <td>${event ? event.eventName : 'Unknown Event'}</td>
                <td>${formatRegistrationDate(reg.timestamp)}</td>
            </tr>
        `;
    }).join('');
}

// Load feedback table
function loadFeedbackTable() {
    const feedback = getFeedback();
    const tbody = document.querySelector('#feedbackTable tbody');
    const emptyState = document.getElementById('feedbackEmpty');
    const table = document.getElementById('feedbackTable');
    
    if (!tbody) return;
    
    if (feedback.length === 0) {
        table.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    table.style.display = 'table';
    emptyState.style.display = 'none';
    
    // Sort by newest first
    feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    tbody.innerHTML = feedback.map(fb => `
        <tr>
            <td><strong>${fb.eventName}</strong></td>
            <td>${createStarRatingHTML(fb.rating)}</td>
            <td style="max-width: 300px;">${truncateText(fb.comment, 100)}</td>
            <td>${formatRegistrationDate(fb.timestamp)}</td>
        </tr>
    `).join('');
}

// Format registration date
function formatRegistrationDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

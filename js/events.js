// ===== Events Page Specific JS =====

let currentFilters = {
    search: '',
    category: 'all',
    school: 'all',
    sort: 'date-asc'
};

document.addEventListener('DOMContentLoaded', function() {
    // Populate school filter
    populateSchoolFilter();
    
    // Load events
    loadEvents();
    
    // Setup filter listeners
    setupFilterListeners();
});

// Populate school filter dropdown
function populateSchoolFilter() {
    const schoolFilter = document.getElementById('schoolFilter');
    if (!schoolFilter) return;
    
    partnerSchools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.name;
        option.textContent = school.name;
        schoolFilter.appendChild(option);
    });
}

// Setup filter event listeners
function setupFilterListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBy = document.getElementById('sortBy');
    const schoolFilter = document.getElementById('schoolFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentFilters.search = e.target.value.toLowerCase();
            loadEvents();
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(e) {
            currentFilters.category = e.target.value;
            loadEvents();
        });
    }
    
    if (sortBy) {
        sortBy.addEventListener('change', function(e) {
            currentFilters.sort = e.target.value;
            loadEvents();
        });
    }
    
    if (schoolFilter) {
        schoolFilter.addEventListener('change', function(e) {
            currentFilters.school = e.target.value;
            loadEvents();
        });
    }
}

// Load and filter events
function loadEvents() {
    const container = document.getElementById('eventsGrid');
    const emptyState = document.getElementById('emptyState');
    const resultCount = document.getElementById('resultCount');
    
    if (!container) return;
    
    let events = getEvents();
    
    // Apply search filter
    if (currentFilters.search) {
        events = events.filter(event => 
            event.eventName.toLowerCase().includes(currentFilters.search) ||
            event.hostSchool.toLowerCase().includes(currentFilters.search) ||
            event.location.toLowerCase().includes(currentFilters.search)
        );
    }
    
    // Apply category filter
    if (currentFilters.category !== 'all') {
        events = events.filter(event => event.category === currentFilters.category);
    }
    
    // Apply school filter
    if (currentFilters.school !== 'all') {
        events = events.filter(event => event.hostSchool === currentFilters.school);
    }
    
    // Apply sorting
    switch (currentFilters.sort) {
        case 'date-asc':
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            events.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'school':
            events.sort((a, b) => a.hostSchool.localeCompare(b.hostSchool));
            break;
        case 'popularity':
            events.sort((a, b) => b.registeredCount - a.registeredCount);
            break;
    }
    
    // Update result count
    if (resultCount) {
        resultCount.textContent = `Showing ${events.length} event${events.length !== 1 ? 's' : ''}`;
    }
    
    // Show events or empty state
    if (events.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        container.style.display = 'grid';
        emptyState.style.display = 'none';
        container.innerHTML = events.map(event => createEventCard(event)).join('');
    }
}

// Clear all filters
function clearFilters() {
    currentFilters = {
        search: '',
        category: 'all',
        school: 'all',
        sort: 'date-asc'
    };
    
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('sortBy').value = 'date-asc';
    document.getElementById('schoolFilter').value = 'all';
    
    loadEvents();
}

// ===== Home Page Specific JS =====

document.addEventListener('DOMContentLoaded', function() {
    // Create hero particles
    createHeroParticles();
    
    // Load featured events
    loadFeaturedEvents();
    
    // Load partner schools
    loadPartnerSchools();
});

// Create animated particles in hero section
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = (Math.random() * 100) + '%';
        particle.style.top = (Math.random() * 100) + '%';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(particle);
    }
}

// Load featured events
function loadFeaturedEvents() {
    const container = document.getElementById('featuredEvents');
    if (!container) return;
    
    const featuredEvents = getFeaturedEvents();
    
    container.innerHTML = featuredEvents.map(event => createEventCard(event)).join('');
}

// Load partner schools
function loadPartnerSchools() {
    const container = document.getElementById('partnerSchools');
    if (!container) return;
    
    container.innerHTML = partnerSchools.map(school => createSchoolCard(school)).join('');
}

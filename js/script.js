/* =============================================
   STUDENT EVENT HUB - MAIN JAVASCRIPT
   ============================================= */

// =============================================
// GLOBAL DATA - SINGLE SOURCE OF TRUTH
// =============================================

// Partner Schools Data
const SCHOOLS = [
  { name: "Sydney Boys High School", url: "https://sydneyhigh.school/" },
  { name: "Sydney Girls High School", url: "https://sydneygirl-h.schools.nsw.gov.au/" },
  { name: "Parramatta High School", url: "https://parramatta-h.schools.nsw.gov.au/" },
  { name: "Girraween High School", url: "https://girraween-h.schools.nsw.gov.au/" },
  { name: "Blacktown Boys High School", url: "https://blacktownb-h.schools.nsw.gov.au/" },
  { name: "Penrith High School", url: "https://penrith-h.schools.nsw.gov.au/" },
  { name: "Blacktown Girls High School", url: "https://blacktowng-h.schools.nsw.gov.au/" },
  { name: "Granville Boys High School", url: "https://granvilleb-h.schools.nsw.gov.au/" }
];

// Event Categories with Icons
const CATEGORIES = {
  "Academic": "&#128218;",
  "Sports": "&#9917;",
  "Arts": "&#127912;",
  "Technology": "&#128187;",
  "Music": "&#127925;",
  "Debate": "&#128172;"
};

// Default Events Data
const DEFAULT_EVENTS = [
  {
    id: 1,
    name: "Interschool Mathematics Olympiad",
    school: "Sydney Boys High School",
    date: "2024-12-15",
    location: "Sydney Boys High School Auditorium",
    category: "Academic",
    capacity: 100,
    registeredCount: 72,
    description: "Compete against the brightest mathematical minds from across Sydney in this prestigious annual olympiad. Categories include algebra, geometry, calculus, and problem-solving challenges.",
    schedule: [
      { time: "8:30 AM", activity: "Registration & Welcome" },
      { time: "9:00 AM", activity: "Round 1: Individual Challenge" },
      { time: "10:30 AM", activity: "Morning Tea Break" },
      { time: "11:00 AM", activity: "Round 2: Team Challenge" },
      { time: "12:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM", activity: "Finals & Awards Ceremony" }
    ]
  },
  {
    id: 2,
    name: "Regional Swimming Carnival",
    school: "Parramatta High School",
    date: "2024-12-20",
    location: "Parramatta Aquatic Centre",
    category: "Sports",
    capacity: 200,
    registeredCount: 156,
    description: "The annual regional swimming carnival brings together the best swimmers from participating schools. Events include freestyle, backstroke, breaststroke, butterfly, and relay races.",
    schedule: [
      { time: "7:30 AM", activity: "Warm-up & Lane Allocation" },
      { time: "8:30 AM", activity: "Junior Events Begin" },
      { time: "11:00 AM", activity: "Senior Events Begin" },
      { time: "1:00 PM", activity: "Relay Finals" },
      { time: "2:30 PM", activity: "Medal Ceremony" }
    ]
  },
  {
    id: 3,
    name: "Annual Art Exhibition",
    school: "Sydney Girls High School",
    date: "2024-12-18",
    location: "Sydney Girls High School Gallery",
    category: "Arts",
    capacity: 150,
    registeredCount: 89,
    description: "Showcase your artistic talents at our annual exhibition featuring paintings, sculptures, digital art, and photography from students across all participating schools.",
    schedule: [
      { time: "10:00 AM", activity: "Exhibition Opens" },
      { time: "11:00 AM", activity: "Artist Talks & Q&A" },
      { time: "1:00 PM", activity: "Judging Begins" },
      { time: "3:00 PM", activity: "Awards Announcement" },
      { time: "4:00 PM", activity: "Exhibition Closes" }
    ]
  },
  {
    id: 4,
    name: "Coding Hackathon 2024",
    school: "Girraween High School",
    date: "2024-12-22",
    location: "Girraween High School Computer Labs",
    category: "Technology",
    capacity: 80,
    registeredCount: 64,
    description: "A 12-hour coding challenge where teams develop innovative solutions to real-world problems. Languages allowed: Python, JavaScript, Java, and C++.",
    schedule: [
      { time: "8:00 AM", activity: "Team Registration & Setup" },
      { time: "9:00 AM", activity: "Challenge Reveal & Coding Begins" },
      { time: "12:00 PM", activity: "Lunch & Progress Check" },
      { time: "5:00 PM", activity: "Final Submissions" },
      { time: "6:00 PM", activity: "Presentations & Judging" },
      { time: "8:00 PM", activity: "Winners Announced" }
    ]
  },
  {
    id: 5,
    name: "Battle of the Bands",
    school: "Blacktown Boys High School",
    date: "2024-12-28",
    location: "Blacktown Boys High School Hall",
    category: "Music",
    capacity: 300,
    registeredCount: 245,
    description: "Student bands compete for the title of Best Interschool Band 2024. All genres welcome - rock, pop, jazz, classical, and everything in between!",
    schedule: [
      { time: "4:00 PM", activity: "Sound Check" },
      { time: "6:00 PM", activity: "Doors Open" },
      { time: "6:30 PM", activity: "Competition Begins" },
      { time: "9:00 PM", activity: "Headline Act" },
      { time: "9:30 PM", activity: "Winners Announced" }
    ]
  },
  {
    id: 6,
    name: "Interschool Debate Championship",
    school: "Penrith High School",
    date: "2024-12-30",
    location: "Penrith High School Lecture Theatre",
    category: "Debate",
    capacity: 60,
    registeredCount: 48,
    description: "The premier debating competition for high school students. Topics range from current affairs to philosophy. Sharpen your argumentation skills and critical thinking!",
    schedule: [
      { time: "9:00 AM", activity: "Opening Ceremony" },
      { time: "9:30 AM", activity: "Preliminary Rounds" },
      { time: "12:00 PM", activity: "Lunch Break" },
      { time: "1:00 PM", activity: "Quarter Finals" },
      { time: "3:00 PM", activity: "Semi Finals" },
      { time: "4:30 PM", activity: "Grand Final & Awards" }
    ]
  },
  {
    id: 7,
    name: "Science Fair 2024",
    school: "Blacktown Girls High School",
    date: "2025-01-10",
    location: "Blacktown Girls High School Science Block",
    category: "Academic",
    capacity: 120,
    registeredCount: 67,
    description: "Present your scientific research and experiments at the annual science fair. Categories include biology, chemistry, physics, and environmental science.",
    schedule: [
      { time: "8:00 AM", activity: "Setup & Registration" },
      { time: "10:00 AM", activity: "Judging Round 1" },
      { time: "12:00 PM", activity: "Public Viewing Opens" },
      { time: "2:00 PM", activity: "Judging Round 2" },
      { time: "4:00 PM", activity: "Awards Ceremony" }
    ]
  },
  {
    id: 8,
    name: "Athletics Carnival",
    school: "Granville Boys High School",
    date: "2025-01-15",
    location: "Granville Athletic Track",
    category: "Sports",
    capacity: 250,
    registeredCount: 189,
    description: "Track and field events including sprints, long distance, hurdles, shot put, discus, javelin, high jump, and long jump. Show your athletic prowess!",
    schedule: [
      { time: "7:00 AM", activity: "Athlete Check-in" },
      { time: "8:00 AM", activity: "Track Events Begin" },
      { time: "10:00 AM", activity: "Field Events Begin" },
      { time: "1:00 PM", activity: "Finals" },
      { time: "3:00 PM", activity: "Medal Ceremony" }
    ]
  }
];

// Default Feedback Data
const DEFAULT_FEEDBACK = [
  {
    id: 1,
    eventName: "Mathematics Olympiad 2023",
    rating: 5,
    comment: "Amazing competition! The problems were challenging but fair. Great organization and wonderful to meet students from other schools.",
    timestamp: "2023-12-20T14:30:00"
  },
  {
    id: 2,
    eventName: "Swimming Carnival 2023",
    rating: 4,
    comment: "Well-organized event with excellent facilities. Would love to see more relay events next year.",
    timestamp: "2023-11-15T10:45:00"
  },
  {
    id: 3,
    eventName: "Art Exhibition 2023",
    rating: 5,
    comment: "The variety of artwork was incredible. Such talented students across all schools. Inspiring!",
    timestamp: "2023-10-28T16:20:00"
  }
];

// Admin PIN
const ADMIN_PIN = "1130";

// =============================================
// DATA INITIALIZATION
// =============================================

function initializeData() {
  // Initialize events if not exists
  if (!localStorage.getItem('events')) {
    localStorage.setItem('events', JSON.stringify(DEFAULT_EVENTS));
  }
  
  // Initialize registrations if not exists
  if (!localStorage.getItem('registrations')) {
    localStorage.setItem('registrations', JSON.stringify([]));
  }
  
  // Initialize feedback if not exists
  if (!localStorage.getItem('feedback')) {
    localStorage.setItem('feedback', JSON.stringify(DEFAULT_FEEDBACK));
  }
}

// Get data from localStorage
function getEvents() {
  return JSON.parse(localStorage.getItem('events')) || [];
}

function getRegistrations() {
  return JSON.parse(localStorage.getItem('registrations')) || [];
}

function getFeedback() {
  return JSON.parse(localStorage.getItem('feedback')) || [];
}

// Save data to localStorage
function saveEvents(events) {
  localStorage.setItem('events', JSON.stringify(events));
}

function saveRegistrations(registrations) {
  localStorage.setItem('registrations', JSON.stringify(registrations));
}

function saveFeedback(feedback) {
  localStorage.setItem('feedback', JSON.stringify(feedback));
}

// =============================================
// NAVIGATION
// =============================================

function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// =============================================
// SCROLL ANIMATIONS
// =============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  document.querySelectorAll('.fade-in, .card').forEach(el => {
    observer.observe(el);
  });
}

// =============================================
// STAT COUNTERS ANIMATION
// =============================================

function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
}

// =============================================
// HOME PAGE FUNCTIONS
// =============================================

function renderFeaturedEvents() {
  const container = document.getElementById('featuredEvents');
  if (!container) return;
  
  const events = getEvents().slice(0, 3);
  container.innerHTML = events.map(event => createEventCard(event)).join('');
  
  // Trigger animations
  setTimeout(() => {
    container.querySelectorAll('.card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
  }, 100);
}

function renderSchools() {
  const container = document.getElementById('schoolsGrid');
  if (!container) return;
  
  container.innerHTML = SCHOOLS.map(school => `
    <div class="school-card fade-in">
      <h3>${school.name}</h3>
      <a href="${school.url}" target="_blank" rel="noopener noreferrer">
        Visit Website &#8594;
      </a>
    </div>
  `).join('');
  
  // Trigger animations
  setTimeout(() => {
    container.querySelectorAll('.school-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
  }, 100);
}

// =============================================
// EVENTS PAGE FUNCTIONS
// =============================================

function createEventCard(event) {
  const spotsLeft = event.capacity - event.registeredCount;
  const percentFull = Math.round((event.registeredCount / event.capacity) * 100);
  const icon = CATEGORIES[event.category] || '&#128197;';
  
  return `
    <div class="card">
      <div class="card-image">
        ${icon}
        <span class="card-category">${event.category}</span>
      </div>
      <div class="card-content">
        <h3>${event.name}</h3>
        <div class="card-meta">
          <span>&#128197; ${formatDate(event.date)}</span>
          <span>&#128205; ${event.location}</span>
          <span>&#127979; ${event.school}</span>
        </div>
        <div class="card-footer">
          <span>${spotsLeft} spots left</span>
          <a href="event-detail.html?id=${event.id}" class="btn btn-primary btn-small">View Details</a>
        </div>
      </div>
    </div>
  `;
}

function populateSchoolFilter() {
  const filter = document.getElementById('schoolFilter');
  if (!filter) return;
  
  SCHOOLS.forEach(school => {
    const option = document.createElement('option');
    option.value = school.name;
    option.textContent = school.name;
    filter.appendChild(option);
  });
}

function renderAllEvents() {
  const container = document.getElementById('eventsGrid');
  const emptyState = document.getElementById('emptyState');
  if (!container) return;
  
  const events = getEvents();
  
  if (events.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  
  if (emptyState) emptyState.classList.add('hidden');
  container.innerHTML = events.map(event => createEventCard(event)).join('');
  
  // Trigger animations
  setTimeout(() => {
    container.querySelectorAll('.card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
  }, 100);
}

function initEventFilters() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const schoolFilter = document.getElementById('schoolFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  const filterEvents = () => {
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    const school = schoolFilter ? schoolFilter.value : '';
    const sort = sortFilter ? sortFilter.value : 'date-asc';
    
    let events = getEvents();
    
    // Filter by search
    if (search) {
      events = events.filter(e => 
        e.name.toLowerCase().includes(search) ||
        e.description.toLowerCase().includes(search)
      );
    }
    
    // Filter by category
    if (category) {
      events = events.filter(e => e.category === category);
    }
    
    // Filter by school
    if (school) {
      events = events.filter(e => e.school === school);
    }
    
    // Sort
    switch (sort) {
      case 'date-asc':
        events.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        events.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'name-asc':
        events.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        events.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'capacity':
        events.sort((a, b) => (b.capacity - b.registeredCount) - (a.capacity - a.registeredCount));
        break;
    }
    
    // Render filtered events
    const container = document.getElementById('eventsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (events.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      container.innerHTML = events.map(event => createEventCard(event)).join('');
      
      // Trigger animations
      container.querySelectorAll('.card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 50);
      });
    }
  };
  
  // Add event listeners
  if (searchInput) searchInput.addEventListener('input', filterEvents);
  if (categoryFilter) categoryFilter.addEventListener('change', filterEvents);
  if (schoolFilter) schoolFilter.addEventListener('change', filterEvents);
  if (sortFilter) sortFilter.addEventListener('change', filterEvents);
}

// =============================================
// EVENT DETAIL PAGE FUNCTIONS
// =============================================

function loadEventDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get('id'));
  
  if (!eventId) {
    window.location.href = 'events.html';
    return;
  }
  
  const events = getEvents();
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    window.location.href = 'events.html';
    return;
  }
  
  // Update page title
  document.title = `${event.name} - Student Event Hub`;
  
  // Update event details
  document.getElementById('eventCategory').textContent = event.category;
  document.getElementById('eventName').textContent = event.name;
  document.getElementById('eventDate').innerHTML = `&#128197; ${formatDate(event.date)}`;
  document.getElementById('eventLocation').innerHTML = `&#128205; ${event.location}`;
  document.getElementById('eventSchool').innerHTML = `&#127979; ${event.school}`;
  document.getElementById('eventDescription').textContent = event.description;
  
  // Update register button with event pre-selected
  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) {
    registerBtn.href = `register.html?event=${eventId}`;
  }
  
  // Start countdown
  startCountdown(event.date);
  
  // Update capacity bar
  updateCapacityBar(event);
  
  // Render schedule
  renderSchedule(event.schedule);
  
  // Render feedback
  renderEventFeedback(event.name);
}

function startCountdown(eventDate) {
  const targetDate = new Date(eventDate + 'T09:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
      document.getElementById('countdownDays').textContent = '00';
      document.getElementById('countdownHours').textContent = '00';
      document.getElementById('countdownMinutes').textContent = '00';
      document.getElementById('countdownSeconds').textContent = '00';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('countdownDays').textContent = String(days).padStart(2, '0');
    document.getElementById('countdownHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdownMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdownSeconds').textContent = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCapacityBar(event) {
  const percent = Math.round((event.registeredCount / event.capacity) * 100);
  const bar = document.getElementById('capacityBar');
  const text = document.getElementById('capacityText');
  
  if (bar) {
    setTimeout(() => {
      bar.style.width = percent + '%';
    }, 500);
  }
  
  if (text) {
    text.textContent = `${event.registeredCount} / ${event.capacity} spots filled (${percent}%)`;
  }
}

function renderSchedule(schedule) {
  const container = document.getElementById('eventSchedule');
  if (!container || !schedule) return;
  
  container.innerHTML = schedule.map(item => `
    <li>
      <strong>${item.time}</strong>
      ${item.activity}
    </li>
  `).join('');
}

function renderEventFeedback(eventName) {
  const container = document.getElementById('eventFeedback');
  if (!container) return;
  
  const allFeedback = getFeedback();
  
  // Show general feedback if no event-specific feedback
  const displayFeedback = allFeedback.slice(0, 3);
  
  if (displayFeedback.length === 0) {
    container.innerHTML = '<p class="empty-state">No feedback yet for this event.</p>';
    return;
  }
  
  container.innerHTML = displayFeedback.map(fb => `
    <div class="feedback-card">
      <div class="feedback-card-header">
        <h4>${fb.eventName}</h4>
        <div class="feedback-stars">${'&#9733;'.repeat(fb.rating)}${'&#9734;'.repeat(5 - fb.rating)}</div>
      </div>
      <p>${fb.comment}</p>
      <span class="timestamp">${formatDateTime(fb.timestamp)}</span>
    </div>
  `).join('');
}

// =============================================
// REGISTRATION PAGE FUNCTIONS
// =============================================

function populateRegistrationForm() {
  const schoolSelect = document.getElementById('schoolName');
  const eventSelect = document.getElementById('eventName');
  
  // Populate schools
  if (schoolSelect) {
    SCHOOLS.forEach(school => {
      const option = document.createElement('option');
      option.value = school.name;
      option.textContent = school.name;
      schoolSelect.appendChild(option);
    });
  }
  
  // Populate events
  if (eventSelect) {
    const events = getEvents();
    events.forEach(event => {
      const spotsLeft = event.capacity - event.registeredCount;
      if (spotsLeft > 0) {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.name} (${spotsLeft} spots left)`;
        eventSelect.appendChild(option);
      }
    });
    
    // Pre-select event if coming from event detail page
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedEvent = urlParams.get('event');
    if (preselectedEvent) {
      eventSelect.value = preselectedEvent;
    }
  }
}

function initRegistrationForm() {
  const form = document.getElementById('registrationForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    let isValid = true;
    const fields = ['studentName', 'email', 'schoolName', 'eventName'];
    
    fields.forEach(field => {
      const input = document.getElementById(field);
      const group = input.closest('.form-group');
      
      if (!input.value.trim()) {
        group.classList.add('error');
        isValid = false;
      } else {
        group.classList.remove('error');
      }
    });
    
    // Validate email format
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailInput.closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Get form data
    const formData = {
      id: Date.now(),
      studentName: document.getElementById('studentName').value.trim(),
      email: document.getElementById('email').value.trim(),
      school: document.getElementById('schoolName').value,
      eventId: parseInt(document.getElementById('eventName').value),
      timestamp: new Date().toISOString()
    };
    
    // Save registration
    const registrations = getRegistrations();
    registrations.push(formData);
    saveRegistrations(registrations);
    
    // Update event registration count
    const events = getEvents();
    const eventIndex = events.findIndex(e => e.id === formData.eventId);
    if (eventIndex !== -1) {
      events[eventIndex].registeredCount++;
      saveEvents(events);
    }
    
    // Show success overlay
    document.getElementById('successOverlay').classList.add('active');
    
    // Reset form
    form.reset();
  });
  
  // Remove error on input
  form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
      this.closest('.form-group').classList.remove('error');
    });
  });
}

// =============================================
// FEEDBACK PAGE FUNCTIONS
// =============================================

function populateFeedbackForm() {
  const eventSelect = document.getElementById('feedbackEvent');
  if (!eventSelect) return;
  
  const events = getEvents();
  events.forEach(event => {
    const option = document.createElement('option');
    option.value = event.name;
    option.textContent = event.name;
    eventSelect.appendChild(option);
  });
}

function initFeedbackForm() {
  const form = document.getElementById('feedbackForm');
  const starRating = document.getElementById('starRating');
  const ratingInput = document.getElementById('ratingValue');
  
  if (!form) return;
  
  // Star rating functionality
  if (starRating) {
    const stars = starRating.querySelectorAll('.star');
    
    stars.forEach(star => {
      star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        ratingInput.value = rating;
        
        stars.forEach((s, index) => {
          if (index < rating) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
        
        document.getElementById('ratingError').style.display = 'none';
      });
      
      star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        stars.forEach((s, index) => {
          if (index < rating) {
            s.style.color = '#c9a84c';
          }
        });
      });
      
      star.addEventListener('mouseleave', function() {
        stars.forEach((s, index) => {
          if (!s.classList.contains('active')) {
            s.style.color = '#ddd';
          }
        });
      });
    });
  }
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate
    let isValid = true;
    
    const eventSelect = document.getElementById('feedbackEvent');
    const comment = document.getElementById('feedbackComment');
    const rating = parseInt(ratingInput.value);
    
    if (!eventSelect.value) {
      eventSelect.closest('.form-group').classList.add('error');
      isValid = false;
    } else {
      eventSelect.closest('.form-group').classList.remove('error');
    }
    
    if (rating === 0) {
      document.getElementById('ratingError').style.display = 'block';
      isValid = false;
    }
    
    if (!comment.value.trim()) {
      comment.closest('.form-group').classList.add('error');
      isValid = false;
    } else {
      comment.closest('.form-group').classList.remove('error');
    }
    
    if (!isValid) return;
    
    // Save feedback
    const feedbackData = {
      id: Date.now(),
      eventName: eventSelect.value,
      rating: rating,
      comment: comment.value.trim(),
      timestamp: new Date().toISOString()
    };
    
    const feedback = getFeedback();
    feedback.unshift(feedbackData);
    saveFeedback(feedback);
    
    // Show success
    document.getElementById('successOverlay').classList.add('active');
    
    // Reset form
    form.reset();
    ratingInput.value = 0;
    starRating.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    
    // Refresh feedback list
    renderFeedbackList();
  });
  
  // Remove error on input
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', function() {
      this.closest('.form-group').classList.remove('error');
    });
  });
}

function renderFeedbackList() {
  const container = document.getElementById('feedbackList');
  const emptyState = document.getElementById('feedbackEmptyState');
  if (!container) return;
  
  const feedback = getFeedback();
  
  if (feedback.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  
  if (emptyState) emptyState.classList.add('hidden');
  
  container.innerHTML = feedback.map(fb => `
    <div class="feedback-card fade-in">
      <div class="feedback-card-header">
        <h4>${fb.eventName}</h4>
        <div class="feedback-stars">${'&#9733;'.repeat(fb.rating)}${'&#9734;'.repeat(5 - fb.rating)}</div>
      </div>
      <p>${fb.comment}</p>
      <span class="timestamp">${formatDateTime(fb.timestamp)}</span>
    </div>
  `).join('');
  
  // Animate
  setTimeout(() => {
    container.querySelectorAll('.feedback-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
  }, 100);
}

function closeSuccessOverlay() {
  document.getElementById('successOverlay').classList.remove('active');
}

// =============================================
// ADMIN PAGE FUNCTIONS
// =============================================

function populateAdminSchools() {
  const schoolSelect = document.getElementById('staffSchool');
  const eventSchoolSelect = document.getElementById('eventSchoolInput');
  
  if (schoolSelect) {
    SCHOOLS.forEach(school => {
      const option = document.createElement('option');
      option.value = school.name;
      option.textContent = school.name;
      schoolSelect.appendChild(option);
    });
  }
  
  if (eventSchoolSelect) {
    SCHOOLS.forEach(school => {
      const option = document.createElement('option');
      option.value = school.name;
      option.textContent = school.name;
      eventSchoolSelect.appendChild(option);
    });
  }
}

function initAdminLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const staffName = document.getElementById('staffName').value.trim();
    const staffSchool = document.getElementById('staffSchool').value;
    const pin = document.getElementById('adminPin').value;
    
    // Validate fields
    let isValid = true;
    
    if (!staffName) {
      document.getElementById('staffName').closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    if (!staffSchool) {
      document.getElementById('staffSchool').closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    if (!pin || pin !== ADMIN_PIN) {
      document.getElementById('adminPin').closest('.form-group').classList.add('error');
      document.getElementById('pinError').textContent = 'Invalid PIN. Please try again.';
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Login successful
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('adminName', staffName);
    showDashboard();
  });
  
  // Remove error on input
  form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
      this.closest('.form-group').classList.remove('error');
    });
  });
}

function checkAdminSession() {
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
  }
}

function showDashboard() {
  document.getElementById('adminLogin').style.display = 'none';
  document.getElementById('adminDashboard').classList.add('active');
  
  loadDashboardData();
  initScrollAnimations();
}

function logout() {
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminName');
  document.getElementById('adminDashboard').classList.remove('active');
  document.getElementById('adminLogin').style.display = 'block';
  document.getElementById('loginForm').reset();
}

function loadDashboardData() {
  const events = getEvents();
  const registrations = getRegistrations();
  const feedback = getFeedback();
  
  // Update stats
  document.getElementById('totalEvents').textContent = events.length;
  document.getElementById('totalRegistrations').textContent = registrations.length;
  document.getElementById('totalFeedback').textContent = feedback.length;
  
  // Calculate average rating
  if (feedback.length > 0) {
    const avgRating = (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1);
    document.getElementById('avgRating').textContent = avgRating;
  }
  
  // Load tables
  loadEventsTable();
  loadRegistrationsTable();
  loadFeedbackTable();
  
  // Load charts
  renderCategoryChart();
  renderSchoolPieChart();
}

function loadEventsTable() {
  const tbody = document.getElementById('eventsTableBody');
  if (!tbody) return;
  
  const events = getEvents();
  
  tbody.innerHTML = events.map(event => `
    <tr>
      <td>${event.name}</td>
      <td>${event.school}</td>
      <td>${formatDate(event.date)}</td>
      <td>${event.category}</td>
      <td>${event.registeredCount}/${event.capacity}</td>
      <td class="actions">
        <button class="btn btn-small btn-primary" onclick="editEvent(${event.id})">Edit</button>
        <button class="btn btn-small btn-danger" onclick="deleteEvent(${event.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function loadRegistrationsTable() {
  const tbody = document.getElementById('registrationsTableBody');
  if (!tbody) return;
  
  const registrations = getRegistrations();
  const events = getEvents();
  
  tbody.innerHTML = registrations.slice(0, 10).map(reg => {
    const event = events.find(e => e.id === reg.eventId);
    return `
      <tr>
        <td>${reg.studentName}</td>
        <td>${reg.email}</td>
        <td>${reg.school}</td>
        <td>${event ? event.name : 'Unknown Event'}</td>
        <td>${formatDateTime(reg.timestamp)}</td>
      </tr>
    `;
  }).join('');
  
  if (registrations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">No registrations yet</td></tr>';
  }
}

function loadFeedbackTable() {
  const tbody = document.getElementById('feedbackTableBody');
  if (!tbody) return;
  
  const feedback = getFeedback();
  
  tbody.innerHTML = feedback.slice(0, 10).map(fb => `
    <tr>
      <td>${fb.eventName}</td>
      <td>${'&#9733;'.repeat(fb.rating)}</td>
      <td>${fb.comment.substring(0, 50)}${fb.comment.length > 50 ? '...' : ''}</td>
      <td>${formatDateTime(fb.timestamp)}</td>
    </tr>
  `).join('');
  
  if (feedback.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">No feedback yet</td></tr>';
  }
}

// =============================================
// ADMIN CRUD OPERATIONS
// =============================================

function openAddEventModal() {
  document.getElementById('modalTitle').textContent = 'Add New Event';
  document.getElementById('editEventId').value = '';
  document.getElementById('eventForm').reset();
  document.getElementById('addEventModal').classList.add('active');
}

function closeModal() {
  document.getElementById('addEventModal').classList.remove('active');
}

function editEvent(eventId) {
  const events = getEvents();
  const event = events.find(e => e.id === eventId);
  
  if (!event) return;
  
  document.getElementById('modalTitle').textContent = 'Edit Event';
  document.getElementById('editEventId').value = eventId;
  document.getElementById('eventNameInput').value = event.name;
  document.getElementById('eventSchoolInput').value = event.school;
  document.getElementById('eventDateInput').value = event.date;
  document.getElementById('eventLocationInput').value = event.location;
  document.getElementById('eventCategoryInput').value = event.category;
  document.getElementById('eventCapacityInput').value = event.capacity;
  document.getElementById('eventDescriptionInput').value = event.description;
  
  document.getElementById('addEventModal').classList.add('active');
}

function deleteEvent(eventId) {
  if (!confirm('Are you sure you want to delete this event?')) return;
  
  let events = getEvents();
  events = events.filter(e => e.id !== eventId);
  saveEvents(events);
  
  loadDashboardData();
}

// Event form submission
document.addEventListener('DOMContentLoaded', function() {
  const eventForm = document.getElementById('eventForm');
  if (eventForm) {
    eventForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const editId = document.getElementById('editEventId').value;
      const events = getEvents();
      
      const eventData = {
        id: editId ? parseInt(editId) : Date.now(),
        name: document.getElementById('eventNameInput').value.trim(),
        school: document.getElementById('eventSchoolInput').value,
        date: document.getElementById('eventDateInput').value,
        location: document.getElementById('eventLocationInput').value.trim(),
        category: document.getElementById('eventCategoryInput').value,
        capacity: parseInt(document.getElementById('eventCapacityInput').value),
        registeredCount: 0,
        description: document.getElementById('eventDescriptionInput').value.trim(),
        schedule: [
          { time: "9:00 AM", activity: "Event Begins" },
          { time: "12:00 PM", activity: "Break" },
          { time: "1:00 PM", activity: "Event Continues" },
          { time: "4:00 PM", activity: "Event Ends" }
        ]
      };
      
      if (editId) {
        // Edit existing event
        const index = events.findIndex(e => e.id === parseInt(editId));
        if (index !== -1) {
          eventData.registeredCount = events[index].registeredCount;
          eventData.schedule = events[index].schedule;
          events[index] = eventData;
        }
      } else {
        // Add new event
        events.push(eventData);
      }
      
      saveEvents(events);
      closeModal();
      loadDashboardData();
    });
  }
});

// Close modal on outside click
window.addEventListener('click', function(e) {
  const modal = document.getElementById('addEventModal');
  if (e.target === modal) {
    closeModal();
  }
});

// =============================================
// ANALYTICS CHARTS (Pure JS - No Libraries)
// =============================================

function renderCategoryChart() {
  const container = document.getElementById('categoryChart');
  if (!container) return;
  
  const events = getEvents();
  const registrations = getRegistrations();
  
  // Count registrations by category
  const categoryData = {};
  Object.keys(CATEGORIES).forEach(cat => categoryData[cat] = 0);
  
  registrations.forEach(reg => {
    const event = events.find(e => e.id === reg.eventId);
    if (event) {
      categoryData[event.category] = (categoryData[event.category] || 0) + 1;
    }
  });
  
  // Also add event registered counts for visual representation
  events.forEach(event => {
    categoryData[event.category] = (categoryData[event.category] || 0) + event.registeredCount;
  });
  
  const maxValue = Math.max(...Object.values(categoryData), 1);
  
  container.innerHTML = Object.entries(categoryData).map(([category, value]) => {
    const height = Math.max((value / maxValue) * 150, 20);
    return `<div class="bar" style="height: ${height}px" data-label="${category.substring(0, 4)}" data-value="${value}"></div>`;
  }).join('');
  
  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.bar').forEach(bar => {
      const targetHeight = bar.style.height;
      bar.style.height = '0px';
      setTimeout(() => {
        bar.style.height = targetHeight;
      }, 100);
    });
  }, 500);
}

function renderSchoolPieChart() {
  const pieChart = document.getElementById('schoolPieChart');
  const legend = document.getElementById('pieLegend');
  if (!pieChart || !legend) return;
  
  const events = getEvents();
  
  // Count events by school
  const schoolData = {};
  events.forEach(event => {
    schoolData[event.school] = (schoolData[event.school] || 0) + 1;
  });
  
  const total = Object.values(schoolData).reduce((sum, val) => sum + val, 0);
  const colors = ['#1a3a6b', '#c9a84c', '#1e5bbf', '#2a4a7b', '#d4b35a', '#3a5a8b', '#e4c36a', '#4a6a9b'];
  
  // Create pie chart using conic-gradient
  let gradientStops = [];
  let currentAngle = 0;
  const schoolEntries = Object.entries(schoolData);
  
  schoolEntries.forEach(([school, count], index) => {
    const percentage = (count / total) * 100;
    const color = colors[index % colors.length];
    gradientStops.push(`${color} ${currentAngle}% ${currentAngle + percentage}%`);
    currentAngle += percentage;
  });
  
  pieChart.style.background = `conic-gradient(${gradientStops.join(', ')})`;
  
  // Create legend
  legend.innerHTML = schoolEntries.map(([school, count], index) => {
    const shortName = school.split(' ').slice(0, 2).join(' ');
    const color = colors[index % colors.length];
    return `
      <div class="pie-legend-item">
        <span style="background-color: ${color}"></span>
        ${shortName} (${count})
      </div>
    `;
  }).join('');
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-AU', options);
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-AU', options);
}

// =============================================
// GLOBAL EVENT LISTENERS
// =============================================

// Close success overlay when clicking outside
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('successOverlay');
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const successOverlay = document.getElementById('successOverlay');
    const modal = document.getElementById('addEventModal');
    
    if (successOverlay && successOverlay.classList.contains('active')) {
      successOverlay.classList.remove('active');
    }
    if (modal && modal.classList.contains('active')) {
      closeModal();
    }
  }
});

// ===== Event Data =====
const eventsData = [
    {
        eventID: '1',
        eventName: 'Inter-School Soccer Championship',
        hostSchool: 'Sydney Boys High School',
        date: '2026-04-15T09:00:00',
        location: 'Sydney Boys High School Sports Complex',
        category: 'Sport',
        capacity: 50,
        registeredCount: 34,
        description: 'Join us for the annual inter-school soccer championship featuring teams from 8 different schools. This exciting tournament will showcase the best young soccer talent in our region. Refreshments will be provided, and medals will be awarded to the top three teams.',
        featured: true
    },
    {
        eventID: '2',
        eventName: 'Science Fair Exhibition',
        hostSchool: 'Sydney Girls High School',
        date: '2026-04-20T10:00:00',
        location: 'Sydney Girls High School Main Hall',
        category: 'Academic',
        capacity: 100,
        registeredCount: 67,
        description: 'Showcase your scientific projects and innovations at our annual Science Fair. Students from all participating schools are invited to present their research and experiments. Prizes will be awarded in multiple categories including Best Innovation, Best Presentation, and People\'s Choice.',
        featured: true
    },
    {
        eventID: '3',
        eventName: 'Cultural Dance Festival',
        hostSchool: 'Parramatta High School',
        date: '2026-04-25T14:00:00',
        location: 'Parramatta Town Hall',
        category: 'Cultural',
        capacity: 200,
        registeredCount: 156,
        description: 'Celebrate diversity through dance at our Cultural Dance Festival. Students will perform traditional and contemporary dances representing various cultures from around the world. This is a wonderful opportunity to learn about different traditions and appreciate the rich tapestry of our community.',
        featured: true
    },
    {
        eventID: '4',
        eventName: 'Student Leadership Summit',
        hostSchool: 'Girraween High School',
        date: '2026-05-01T08:30:00',
        location: 'Girraween High School Conference Centre',
        category: 'Leadership',
        capacity: 75,
        registeredCount: 42,
        description: 'Develop your leadership skills at our annual Student Leadership Summit. This full-day event features workshops on public speaking, team building, and project management. Guest speakers include successful young entrepreneurs and community leaders.',
        featured: true
    },
    {
        eventID: '5',
        eventName: 'Basketball Tournament',
        hostSchool: 'Blacktown Boys High School',
        date: '2026-05-05T13:00:00',
        location: 'Blacktown Sports Arena',
        category: 'Sport',
        capacity: 40,
        registeredCount: 28,
        description: 'Compete in our 3-on-3 basketball tournament open to all skill levels. Teams will be formed on the day, giving students a chance to meet and play with peers from other schools.',
        featured: false
    },
    {
        eventID: '6',
        eventName: 'Math Olympiad',
        hostSchool: 'Penrith High School',
        date: '2026-05-10T09:00:00',
        location: 'Penrith High School Auditorium',
        category: 'Academic',
        capacity: 80,
        registeredCount: 45,
        description: 'Challenge yourself in the regional Math Olympiad. This competition features individual and team rounds covering algebra, geometry, and problem-solving. Top performers will qualify for the state championship.',
        featured: false
    },
    {
        eventID: '7',
        eventName: 'Art & Music Showcase',
        hostSchool: 'Blacktown Girls High School',
        date: '2026-05-15T16:00:00',
        location: 'Blacktown Arts Centre',
        category: 'Cultural',
        capacity: 150,
        registeredCount: 89,
        description: 'Experience the creative talents of students from across our school network. This showcase features visual art exhibitions, live musical performances, and interactive art installations.',
        featured: false
    },
    {
        eventID: '8',
        eventName: 'Debate Championship',
        hostSchool: 'Granville Boys High School',
        date: '2026-05-20T10:00:00',
        location: 'Granville Boys High School Hall',
        category: 'Leadership',
        capacity: 60,
        registeredCount: 52,
        description: 'Test your argumentation and critical thinking skills in our inter-school debate championship. Topics will cover current affairs, ethics, and social issues. Judges include university professors and professional debaters.',
        featured: false
    }
];

// ===== Partner Schools =====
const partnerSchools = [
    { name: 'Sydney Girls High School', url: 'https://sydneygirl-h.schools.nsw.gov.au/' },
    { name: 'Sydney Boys High School', url: 'https://sydneyhigh.school/' },
    { name: 'Parramatta High School', url: 'https://parramatta-h.schools.nsw.gov.au/' },
    { name: 'Penrith High School', url: 'https://penrith-h.schools.nsw.gov.au/' },
    { name: 'Granville Boys High School', url: 'https://granvilleb-h.schools.nsw.gov.au/' },
    { name: 'Girraween High School', url: 'https://girraween-h.schools.nsw.gov.au/' },
    { name: 'Blacktown Boys High School', url: 'https://blacktownb-h.schools.nsw.gov.au/' },
    { name: 'Blacktown Girls High School', url: 'https://blacktowng-h.schools.nsw.gov.au/' }
];

// ===== Category Colors =====
const categoryColors = {
    Sport: 'badge-sport',
    Academic: 'badge-academic',
    Cultural: 'badge-cultural',
    Leadership: 'badge-leadership'
};

// ===== Local Storage Keys =====
const STORAGE_KEYS = {
    EVENTS: 'studentEventHub_events',
    REGISTRATIONS: 'studentEventHub_registrations',
    FEEDBACK: 'studentEventHub_feedback'
};

// ===== Data Management Functions =====
function getStoredData(key, defaultValue) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
}

function setStoredData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize data in localStorage if not present
function initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
        setStoredData(STORAGE_KEYS.EVENTS, eventsData);
    }
    if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
        setStoredData(STORAGE_KEYS.REGISTRATIONS, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
        setStoredData(STORAGE_KEYS.FEEDBACK, [
            {
                feedbackID: 'fb1',
                eventName: 'Science Fair 2025',
                rating: 5,
                comment: 'Amazing event! The projects were so creative and inspiring. Can\'t wait for next year!',
                timestamp: '2026-01-15T10:30:00'
            },
            {
                feedbackID: 'fb2',
                eventName: 'Basketball Tournament',
                rating: 4,
                comment: 'Great organization and lots of fun. Would love to see more sports events like this.',
                timestamp: '2026-02-20T14:00:00'
            },
            {
                feedbackID: 'fb3',
                eventName: 'Cultural Dance Festival',
                rating: 5,
                comment: 'Absolutely beautiful performances! A wonderful celebration of diversity.',
                timestamp: '2026-03-10T16:45:00'
            }
        ]);
    }
}

// Get all events
function getEvents() {
    return getStoredData(STORAGE_KEYS.EVENTS, eventsData);
}

// Get featured events
function getFeaturedEvents() {
    return getEvents().filter(event => event.featured);
}

// Get event by ID
function getEventById(eventID) {
    return getEvents().find(event => event.eventID === eventID);
}

// Get all registrations
function getRegistrations() {
    return getStoredData(STORAGE_KEYS.REGISTRATIONS, []);
}

// Add registration
function addRegistration(data) {
    const registrations = getRegistrations();
    const events = getEvents();
    
    // Check if already registered
    const alreadyRegistered = registrations.some(
        reg => reg.email === data.email && reg.eventID === data.eventID
    );
    
    if (alreadyRegistered) {
        return { success: false, error: 'Already registered for this event' };
    }
    
    // Check event capacity
    const event = events.find(e => e.eventID === data.eventID);
    if (event && event.registeredCount >= event.capacity) {
        return { success: false, error: 'Event is at full capacity' };
    }
    
    // Add registration
    const newRegistration = {
        userID: generateID(),
        studentName: data.studentName,
        email: data.email,
        school: data.school,
        eventID: data.eventID,
        timestamp: new Date().toISOString()
    };
    
    registrations.push(newRegistration);
    setStoredData(STORAGE_KEYS.REGISTRATIONS, registrations);
    
    // Update event count
    if (event) {
        event.registeredCount++;
        setStoredData(STORAGE_KEYS.EVENTS, events);
    }
    
    return { success: true };
}

// Get all feedback
function getFeedback() {
    return getStoredData(STORAGE_KEYS.FEEDBACK, []);
}

// Add feedback
function addFeedback(data) {
    const feedback = getFeedback();
    
    const newFeedback = {
        feedbackID: generateID(),
        eventName: data.eventName,
        rating: data.rating,
        comment: data.comment,
        timestamp: new Date().toISOString()
    };
    
    feedback.push(newFeedback);
    setStoredData(STORAGE_KEYS.FEEDBACK, feedback);
    
    return { success: true };
}

// Initialize data on page load
initializeData();

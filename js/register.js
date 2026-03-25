// ===== Registration Page Specific JS =====

document.addEventListener('DOMContentLoaded', function() {
    // Populate dropdowns
    populateSchools();
    populateEvents();
    
    // Check for pre-selected event from URL
    const eventFromUrl = getUrlParam('event');
    if (eventFromUrl) {
        document.getElementById('event').value = eventFromUrl;
    }
    
    // Setup form submission
    setupFormSubmission();
});

// Populate schools dropdown
function populateSchools() {
    const schoolSelect = document.getElementById('school');
    if (!schoolSelect) return;
    
    partnerSchools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.name;
        option.textContent = school.name;
        schoolSelect.appendChild(option);
    });
}

// Populate events dropdown
function populateEvents() {
    const eventSelect = document.getElementById('event');
    if (!eventSelect) return;
    
    const events = getEvents();
    events.forEach(event => {
        const option = document.createElement('option');
        option.value = event.eventID;
        option.textContent = event.eventName;
        eventSelect.appendChild(option);
    });
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
    
    // Clear errors on input
    ['studentName', 'email', 'school', 'event'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                clearFieldError(fieldId);
            });
            field.addEventListener('change', function() {
                clearFieldError(fieldId);
            });
        }
    });
}

// Clear field error
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
}

// Validate form
function validateForm() {
    let isValid = true;
    
    const studentName = document.getElementById('studentName').value.trim();
    const email = document.getElementById('email').value.trim();
    const school = document.getElementById('school').value;
    const event = document.getElementById('event').value;
    
    // Student name validation
    if (!studentName) {
        showFieldError('studentName', 'Please enter your name');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        showFieldError('email', 'Please enter your email');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // School validation
    if (!school) {
        showFieldError('school', 'Please select your school');
        isValid = false;
    }
    
    // Event validation
    if (!event) {
        showFieldError('event', 'Please select an event');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
}

// Handle form submission
function handleFormSubmit() {
    const submitError = document.getElementById('submitError');
    submitError.style.display = 'none';
    
    if (!validateForm()) return;
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Registering...';
    
    // Simulate network delay
    setTimeout(function() {
        const formData = {
            studentName: document.getElementById('studentName').value.trim(),
            email: document.getElementById('email').value.trim(),
            school: document.getElementById('school').value,
            eventID: document.getElementById('event').value
        };
        
        const result = addRegistration(formData);
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
        
        if (result.success) {
            showSuccess();
        } else {
            submitError.textContent = result.error || 'Registration failed. You may already be registered for this event, or the event is full.';
            submitError.style.display = 'block';
        }
    }, 1000);
}

// Show success message
function showSuccess() {
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
}

// Reset form
function resetForm() {
    document.getElementById('registrationForm').reset();
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('submitError').style.display = 'none';
    
    // Clear all errors
    ['studentName', 'email', 'school', 'event'].forEach(fieldId => {
        clearFieldError(fieldId);
    });
}

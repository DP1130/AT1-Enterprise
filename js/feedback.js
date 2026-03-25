// ===== Feedback Page Specific JS =====

let currentRating = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Load existing feedback
    loadFeedbackList();
    
    // Setup star rating
    setupStarRating();
    
    // Setup form submission
    setupFeedbackForm();
});

// Load feedback list
function loadFeedbackList() {
    const container = document.getElementById('feedbackList');
    if (!container) return;
    
    const feedback = getFeedback();
    
    // Sort by newest first
    feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (feedback.length === 0) {
        container.innerHTML = `
            <div class="feedback-card">
                <p style="text-align: center; color: var(--muted);">
                    No feedback yet. Be the first to share your experience!
                </p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = feedback.map(fb => `
        <div class="feedback-card">
            <div class="feedback-header">
                <span class="feedback-event">${fb.eventName}</span>
                ${createStarRatingHTML(fb.rating)}
            </div>
            <p class="feedback-comment">${fb.comment}</p>
            <p class="feedback-date">${formatFeedbackDate(fb.timestamp)}</p>
        </div>
    `).join('');
}

// Format feedback date
function formatFeedbackDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Setup star rating
function setupStarRating() {
    const starRating = document.getElementById('starRating');
    if (!starRating) return;
    
    const buttons = starRating.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            updateStarDisplay();
            clearFieldError('rating');
        });
        
        button.addEventListener('mouseenter', function() {
            const hoverRating = parseInt(this.dataset.rating);
            highlightStars(hoverRating);
        });
        
        button.addEventListener('mouseleave', function() {
            highlightStars(currentRating);
        });
    });
}

// Update star display
function updateStarDisplay() {
    highlightStars(currentRating);
}

// Highlight stars up to a certain rating
function highlightStars(rating) {
    const buttons = document.querySelectorAll('#starRating button');
    buttons.forEach((button, index) => {
        if (index < rating) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Setup feedback form
function setupFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFeedbackSubmit();
    });
    
    // Clear errors on input
    ['eventName', 'comment'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
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

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
}

// Validate feedback form
function validateFeedbackForm() {
    let isValid = true;
    
    const eventName = document.getElementById('eventName').value.trim();
    const comment = document.getElementById('comment').value.trim();
    
    if (!eventName) {
        showFieldError('eventName', 'Please enter the event name');
        isValid = false;
    }
    
    if (currentRating === 0) {
        showFieldError('rating', 'Please select a rating');
        isValid = false;
    }
    
    if (!comment) {
        showFieldError('comment', 'Please enter your feedback');
        isValid = false;
    }
    
    return isValid;
}

// Handle feedback submission
function handleFeedbackSubmit() {
    if (!validateFeedbackForm()) return;
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
    
    // Simulate network delay
    setTimeout(function() {
        const formData = {
            eventName: document.getElementById('eventName').value.trim(),
            rating: currentRating,
            comment: document.getElementById('comment').value.trim()
        };
        
        addFeedback(formData);
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
        
        showFeedbackSuccess();
        loadFeedbackList(); // Refresh the feedback list
    }, 1000);
}

// Show success message
function showFeedbackSuccess() {
    document.getElementById('feedbackForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
}

// Reset feedback form
function resetFeedbackForm() {
    document.getElementById('feedbackForm').reset();
    document.getElementById('feedbackForm').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    
    currentRating = 0;
    updateStarDisplay();
    
    // Clear all errors
    ['eventName', 'rating', 'comment'].forEach(fieldId => {
        clearFieldError(fieldId);
    });
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitBtn = form ? form.querySelector('.submit-button') : null;
    const submitText = submitBtn ? submitBtn.querySelector('.submit-text') : null;
    
    // Track form interaction state
    let userInteracting = false;
    
    // Set minimum height for textarea (3 lines minimum)
    if (messageInput) {
        messageInput.style.minHeight = '75px';
        // Prevent resizing smaller than 3 lines
        messageInput.addEventListener('mousedown', function(e) {
            if (e.offsetY > this.clientHeight) {
                // Only allow resizing larger, not smaller than min-height
                if (this.clientHeight < parseInt(this.style.minHeight)) {
                    e.preventDefault();
                }
            }
        });
    }
    
    // Form validation function
    function validateForm() {
        if (!form || !nameInput || !emailInput || !phoneInput || !messageInput || !submitBtn || !submitText) {
            return false;
        }
        
        const nameValid = nameInput.value.trim() !== '';
        const emailValid = emailInput.value.trim() !== '' && 
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
        const phoneValid = phoneInput.value.trim() !== '';
        const messageValid = messageInput.value.trim() !== '';
        
        // Either email or phone must be provided
        const contactInfoValid = emailValid || phoneValid;
        
        // Form is valid if name, message, and at least one contact method are provided
        const formValid = nameValid && messageValid && contactInfoValid;
        
        // Update button state
        submitBtn.disabled = !formValid;
        
        // Only show validation messages if user is interacting with the form
        if (userInteracting) {
            if (!nameValid) {
                submitText.textContent = 'Please enter your name';
            } else if (!contactInfoValid) {
                submitText.textContent = 'Please enter email or phone';
            } else if (!messageValid) {
                submitText.textContent = 'Please enter a message';
            } else {
                submitText.textContent = 'Send Message';
            }
        } else {
            // If not interacting, just show "Send Message"
            submitText.textContent = 'Send Message';
        }
        
        return formValid;
    }
    
    // Enable interaction state and validation messages
    function enableInteractionState() {
        userInteracting = true;
        validateForm();
    }
    
    // Disable interaction state and reset button text
    function disableInteractionState() {
        userInteracting = false;
        if (submitText) {
            submitText.textContent = 'Send Message';
        }
    }
    
    // Add event listeners for form inputs
    const formInputs = [nameInput, emailInput, phoneInput, messageInput];
    formInputs.forEach(input => {
        if (input) {
            // Show validation on input
            input.addEventListener('input', validateForm);
            
            // Enable interaction state when focusing on inputs
            input.addEventListener('focus', enableInteractionState);
        }
    });
    
    // Enable interaction when hovering or clicking submit button
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', enableInteractionState);
        submitBtn.addEventListener('click', enableInteractionState);
    }
    
    // Disable interaction state when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (form && !form.contains(event.target)) {
            disableInteractionState();
        }
    });
    
    // Initial validation without showing messages
    validateForm();
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form before submission
            enableInteractionState(); // Force showing validation messages during submission
            if (!validateForm()) {
                return;
            }

            
            // Prepare form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                message: messageInput.value.trim(),
                service: '8*DHdufy8sHIUSH*9ydsfhjdshfR%$DR%SADhs' // Default service as requested
            };
            
            // Clear any existing form messages
            const existingMessage = form.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Update button state to loading
            submitText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form data with fetch API
            fetch('https://executers.ae/send_email_awesome_solutions.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // read raw text instead of forcing JSON
                return response.text();
            })
            .then(text => {
                let data;
                try {
                    data = JSON.parse(text);
                } catch (err) {
                    // log the full HTML or error payload
                    console.error('Server returned non-JSON response:\n', text);
                    throw new Error('Invalid JSON from server');
                }
                // at this point `data` is your parsed JSON
                // Reset form
                form.reset();
            
                // Reset button state
                submitText.textContent = 'Message Sent!';
                submitBtn.disabled = true;
            
                // Update button text to thank you message
                setTimeout(function() {
                    submitText.textContent = 'Thank you for your message ❤️';
                }, 3000);
            
            })
            .catch(error => {
                console.error('Error:', error);
            
                // Error message
                submitText.textContent = 'Something went wrong. Please try again later.';
                submitText.classList.add('error');
            
                // Reset button state
                submitText.textContent = 'Send Message';
                submitBtn.disabled = false;
            });
        });
    }
});

// Track page load time for demonstration
window.addEventListener('load', function() {
    console.log(`Page loaded in ${Math.round(performance.now())}ms`);
}); 
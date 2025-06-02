        // Typewriter Effect
        const skills = [
            "AutoCAD 2D Specialist",
            "SketchUp Designer", 
            "Site Planning Expert",
            "3ds Max Modeling",
            "AutoCAD Draftman",
            "Construction Documentation",
            "Architectural Drafting"
        ];
        
        let skillIndex = 0;
        const typewriterElement = document.getElementById('typewriter');
        
        function typeWriter() {
            const currentSkill = skills[skillIndex];
            
            // Set the full text first
            typewriterElement.textContent = currentSkill;
            
            // Animate the width from 0 to full width
            typewriterElement.style.maxWidth = '0';
            typewriterElement.style.overflow = 'hidden';
            typewriterElement.style.display = 'inline-block';
            typewriterElement.style.whiteSpace = 'nowrap';
            
            // Animate width expansion
            let width = 0;
            const fullWidth = typewriterElement.scrollWidth;
            const expandInterval = setInterval(() => {
                if (width >= fullWidth) {
                    clearInterval(expandInterval);
                    
                    // After fully expanded, wait and then contract
                    setTimeout(() => {
                        const contractInterval = setInterval(() => {
                            if (width <= 0) {
                                clearInterval(contractInterval);
                                // Change to next skill
                                skillIndex = (skillIndex + 1) % skills.length;
                                setTimeout(typeWriter, 500);
                            } else {
                                width -= fullWidth / 30;
                                typewriterElement.style.maxWidth = width + 'px';
                            }
                        }, 20);
                    }, 2000);
                } else {
                    width += fullWidth / 30;
                    typewriterElement.style.maxWidth = width + 'px';
                }
            }, 20);
        }
        
        // Preloader
        function hidePreloader() {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                // preloader.classList.add('hide');
                // Remove preloader from DOM after transition completes
                setTimeout(() => {
                    preloader.remove();
                }, 2000);
            }
        }
        
        // Start typewriter effect after page loads
        window.addEventListener('load', () => {
            // Hide preloader when page is loaded
            setTimeout(() => {
                hidePreloader();
            }, 1000);
            
            // Start typewriter effect
            setTimeout(typeWriter, 1000);
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            const hamburgerInput = document.getElementById('hamburger-input');
            const navMenu = document.querySelector('.nav-menu');
            
            // Toggle menu expansion on hamburger click
            if (hamburgerInput && navMenu) {
                hamburgerInput.addEventListener('change', () => {
                    if (hamburgerInput.checked) {
                        navMenu.classList.add('active');
                    } else {
                        navMenu.classList.remove('active');
                    }
                });
            }
            
            // Close menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (hamburgerInput && navMenu) {
                        hamburgerInput.checked = false;
                        navMenu.classList.remove('active');
                    }
                });
            });
            
            // Work Tabs Functionality
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to current button
                    button.classList.add('active');
                    
                    // Get the tab content id and show corresponding content
                    const tabId = button.getAttribute('data-tab');
                    const tabContent = document.getElementById(`${tabId}-content`);
                    if (tabContent) {
                        tabContent.classList.add('active');
                    }
                    
                    // If on mobile, scroll the tab button into view
                    if (window.innerWidth <= 768) {
                        button.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }
                });
            });
            
            // Accordion functionality
            const accordionContainer = document.querySelector('.accordion-container');
            const accordionHeader = document.querySelector('.accordion-header');
            
            if (accordionHeader && accordionContainer) {
                accordionHeader.addEventListener('click', () => {
                    accordionContainer.classList.toggle('active');
                });
            }
        });
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        document.querySelectorAll('.experience-item, .project-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
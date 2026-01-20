// Add at the beginning of script.js

// Enhanced Loading Screen functionality
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.loading-progress-bar');
    const loadingText = document.querySelector('.loading-text');
    
    if (!loadingScreen) return;
    
    // Array of loading messages with different themes
    const loadingMessages = [
        { text: 'Unearthing ancient artifacts', icon: '𓀀' },
        { text: 'Deciphering hieroglyphics', icon: '𓆓' },
        { text: 'Building pyramids', icon: '◌' },
        { text: 'Consulting oracles', icon: '𓁹' },
        { text: 'Mapping constellations', icon: '𓇯' },
        { text: 'Entering the tomb', icon: '𓉐' }
    ];
    
    let currentMessageIndex = 0;
    let progress = 0;
    const totalTime = 2500; // 2.5 seconds total loading time (smoother)
    const intervalTime = 16; // ~60fps update rate
    const increments = 100 / (totalTime / intervalTime);
    
    // Preload critical assets
    const preloadAssets = () => {
        const assets = [
            'https://york.citycollege.eu/m/templates_mobile/mobile_city_2016/images/logo_city_mobile.png '
        ];
        
        assets.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    preloadAssets();
    
    // Start the loading animation
    const startTime = Date.now();
    
    const loadingInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        
        // Smooth progress curve (ease-out)
        const easedProgress = 1 - Math.pow(1 - Math.min(elapsedTime / totalTime, 1), 2);
        progress = easedProgress * 100;
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Update loading text based on progress
        if (loadingText) {
            const messageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
            
            if (messageIndex !== currentMessageIndex) {
                currentMessageIndex = messageIndex;
                const message = loadingMessages[messageIndex];
                
                // Smooth text transition
                loadingText.style.opacity = '0';
                loadingText.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    loadingText.innerHTML = `
                        <span style="margin-right: 8px; opacity: 0.7;">${message.icon}</span>
                        ${message.text}
                        <span class="loading-dots">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </span>
                    `;
                    
                    loadingText.style.opacity = '1';
                    loadingText.style.transform = 'translateY(0)';
                    loadingText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                }, 150);
            }
        }
        
        // When loading is complete
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Add completion effect
            if (progressBar) {
                progressBar.style.transition = 'width 0.5s ease-out';
            }
            
            // Short delay with completion animation
            setTimeout(() => {
                // Add completion glow
                loadingScreen.style.boxShadow = 'inset 0 0 100px rgba(193, 154, 107, 0.3)';
                
                // Hide loading screen with smooth transition
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    
                    // Remove from DOM after animation completes
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        
                        // Trigger scroll events for any lazy animations
                        window.dispatchEvent(new Event('scroll'));
                        window.dispatchEvent(new Event('resize'));
                    }, 800);
                }, 300);
            }, 200);
        }
    }, intervalTime);
    
    // Fallback: hide loading screen after max time
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                window.dispatchEvent(new Event('scroll'));
            }, 800);
        }
    }, 6000); // 6 second fallback (generous)
}

// Update DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ages Unveiled - Journey through time begins... ⏳');
    
    // Initialize enhanced loading screen
    initLoadingScreen();
    
    // Rest of your existing code...
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ... rest of your existing JavaScript code
});

// DOM ready function - making sure everything loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ages Unveiled loaded! Let\'s explore history! 🔥');
    
    // Mobile menu toggle - simple hamburger menu
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
            // toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't scroll if it's just a regular link
            if (this.getAttribute('href') === '#') return;
            
            // Don't scroll if it's a link to another page
            if (this.getAttribute('href').includes('.html')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = document.querySelector('.menu-btn i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // ok this handles the timeline click, don't overthink it
    setupTimeline();
    
    // Scroll animations for elements
    setupScrollAnimations();
    
    // Card hover effects - adding a little extra glow
    setupCardEffects();
});

// Timeline functionality
function setupTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Only run if we're on a civilization page with timeline
    if (timelineItems.length === 0) return;
    
    // future me: yes this works, don't touch
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the year from data attribute
            const year = this.getAttribute('data-year');
            
            // Update the timeline info section
            updateTimelineInfo(this, year);
        });
    });
    
    // Initialize with first item active
    if (timelineItems.length > 0) {
        const firstItem = timelineItems[0];
        const year = firstItem.getAttribute('data-year');
        updateTimelineInfo(firstItem, year);
    }
}

// Update timeline info when a year is clicked
function updateTimelineInfo(item, year) {
    const timelineInfo = document.getElementById('timelineInfo');
    
    if (!timelineInfo) return;
    
    // Get the content from the clicked item
    const title = item.querySelector('h3').textContent;
    const content = item.querySelector('p').textContent;
    
    // Update the info section
    timelineInfo.innerHTML = `
        <h3>${year}: ${title}</h3>
        <p>${content}</p>
    `;
    
    // Add a little animation for fun
    timelineInfo.style.opacity = '0';
    timelineInfo.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        timelineInfo.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        timelineInfo.style.opacity = '1';
        timelineInfo.style.transform = 'translateY(0)';
    }, 10);
}

// Scroll animations for elements
function setupScrollAnimations() {
    // Create observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add fade-in class to sections on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section:not(.hero):not(.civilization-hero)');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('fade-in', 'visible');
            }
        });
    });
    
    // Trigger once on load
    window.dispatchEvent(new Event('scroll'));
}

// Card hover effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.card, .section-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a little glow effect
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px var(--glow-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.boxShadow = '';
        });
    });
}

// Simple function to change theme (bonus feature)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Call theme check on load
checkTheme();
// Add this function to your script.js file, inside DOMContentLoaded event

function setupDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Desktop hover
        toggle.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const dropdown = this.closest('.dropdown');
                dropdown.classList.add('active');
            }
        });
        
        const dropdown = toggle.closest('.dropdown');
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
            }
        });
        
        // Mobile click
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Call this function in your DOMContentLoaded event
// Add: setupDropdowns();
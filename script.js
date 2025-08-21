
// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
    navLinks.classList.remove("active");
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      
      // Add animation classes
      if (element.classList.contains('fade-in-up')) {
        const delay = element.dataset.delay || 0;
        setTimeout(() => {
          element.style.animationDelay = '0s';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay);
      }
      
      if (element.classList.contains('slide-in-left')) {
        element.style.animationDelay = '0s';
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
      }
      
      if (element.classList.contains('slide-in-right')) {
        element.style.animationDelay = '0s';
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
      }
      
      // Animate progress bars
      if (element.classList.contains('skills-container')) {
        animateProgressBars();
      }
      
      observer.unobserve(element);
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .skills-container');
  animatedElements.forEach(el => observer.observe(el));
});

// Animate progress bars
function animateProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  progressFills.forEach((fill, index) => {
    setTimeout(() => {
      const width = fill.dataset.width;
      fill.style.width = width + '%';
    }, index * 200);
  });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxBg = document.querySelector('.parallax-bg');
  const navbar = document.querySelector('.glass-nav');
  
  if (parallaxBg) {
    const speed = scrolled * 0.5;
    parallaxBg.style.transform = `translateY(${speed}px) rotate(${scrolled * 0.01}deg)`;
  }
  
  // Navbar background opacity on scroll
  if (navbar) {
    const opacity = Math.min(scrolled / 100, 1);
    navbar.style.background = `rgba(255, 255, 255, ${0.1 + opacity * 0.1})`;
  }
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Add loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    // Show success message
    showNotification("Thank you for your message! I'll get back to you soon.", "success");
    
    // Reset form
    e.target.reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 1rem 1.5rem;
    color: white;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Add hover sound effect (optional - can be removed if too much)
function addHoverSounds() {
  const hoverElements = document.querySelectorAll('.hover-lift, .btn-modern');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      // You could add a subtle sound effect here
      element.style.filter = 'brightness(1.1)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.filter = 'brightness(1)';
    });
  });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', addHoverSounds);

// Typing animation restart on scroll
let typingAnimationTriggered = false;
window.addEventListener('scroll', () => {
  const heroSection = document.querySelector('.hero');
  const rect = heroSection.getBoundingClientRect();
  
  if (rect.bottom < 0 && !typingAnimationTriggered) {
    typingAnimationTriggered = true;
  } else if (rect.top >= 0 && typingAnimationTriggered) {
    typingAnimationTriggered = false;
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
      typingText.style.animation = 'none';
      setTimeout(() => {
        typingText.style.animation = 'typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite';
      }, 10);
    }
  }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Your scroll logic here
}, 16)); // ~60fps

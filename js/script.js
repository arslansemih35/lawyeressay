// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger menu
  const bars = navToggle.querySelectorAll('.bar');
  bars.forEach((bar, index) => {
    if (navMenu.classList.contains('active')) {
      if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (index === 1) bar.style.opacity = '0';
      if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    }
  });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach(bar => {
      bar.style.transform = 'none';
      bar.style.opacity = '1';
    });
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.2)';
  } else {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.feature, .lawyer-card, .service-card, .contact-item');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();
    const service = this.querySelector('select[name="service"]').value;
    
    if (!name || !email || !message || !service) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled = true;
    
    // Prepare form data
    const formData = new FormData(this);
    
    // Send form via AJAX
    fetch('php/contact.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        this.reset();
      } else {
        if (data.errors) {
          alert('Hata: ' + data.errors.join('\n'));
        } else {
          alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe hero stats section
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click effect for buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: #000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add loading spinner for form submission
function showLoadingSpinner(button) {
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  button.insertBefore(spinner, button.firstChild);
  button.disabled = true;
}

// Initialize tooltips for contact information
document.querySelectorAll('.contact-link').forEach(link => {
  link.title = 'E-posta göndermek için tıklayın';
});

// Add active state for navigation links
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Video Optimization
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo) {
    // Video yükleme optimizasyonu
    heroVideo.addEventListener('loadeddata', () => {
      heroVideo.style.opacity = '1';
    });
    
    // Video hata durumunda arka plan resmini göster
    heroVideo.addEventListener('error', () => {
      heroVideo.style.display = 'none';
    });
    
    // Mobil cihazlarda video performansını optimize et
    if (window.innerWidth <= 768) {
      heroVideo.setAttribute('playsinline', '');
      heroVideo.setAttribute('muted', '');
    }
  }

  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

// Add CSS for active navigation state
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
  .nav-link.active {
    color: #FFD700 !important;
    font-weight: 600;
  }
  
  .nav-link.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(activeNavStyle); 
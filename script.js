// Enhanced JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile Navigation Toggle
            const navToggle = document.getElementById('nav-toggle');
            const nav = document.getElementById('nav');
            
            navToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                const icon = navToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        nav.classList.remove('active');
                        const icon = navToggle.querySelector('i');
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                });
            });

            // Contact form submission
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
                    
                    // Show success message
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 2000);
            });

            // Notification system
            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: ${type === 'success' ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                    max-width: 300px;
                    font-weight: 500;
                `;
                
                notification.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                        <span>${message}</span>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                // Remove after 5 seconds
                setTimeout(() => {
                    notification.style.transform = 'translateX(400px)';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 5000);
            }

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.feature-card, .pricing-card, .contact-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            });

            // Enhanced dashboard stats animation
            function animateStats() {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const finalValue = stat.textContent;
                    let currentValue = 0;
                    const increment = finalValue.replace(/[^\d]/g, '') / 50;
                    const isPercentage = finalValue.includes('%');
                    const isCurrency = finalValue.includes('₹');
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue.replace(/[^\d]/g, '')) {
                            currentValue = finalValue.replace(/[^\d]/g, '');
                            clearInterval(timer);
                        }
                        
                        let displayValue = Math.floor(currentValue);
                        if (isCurrency) {
                            if (displayValue >= 100000) {
                                displayValue = '₹' + (displayValue / 100000).toFixed(1) + 'M';
                            } else if (displayValue >= 1000) {
                                displayValue = '₹' + (displayValue / 1000).toFixed(0) + 'K';
                            } else {
                                displayValue = '₹' + displayValue;
                            }
                        } else if (isPercentage) {
                            displayValue = '+' + displayValue + '%';
                        }
                        
                        stat.textContent = displayValue;
                    }, 50);
                });
            }

            // Start stats animation when hero section is visible
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateStats, 1000);
                        heroObserver.unobserve(entry.target);
                    }
                });
            });

            heroObserver.observe(document.querySelector('.hero-section'));

            // Add some interactive effects
            document.querySelectorAll('.feature-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) rotateY(5deg)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) rotateY(0)';
                });
            });

            // Pricing card interactions
            document.querySelectorAll('.pricing-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('featured')) {
                        this.style.transform = 'translateY(-10px) scale(1.02)';
                    }
                });
                
                card.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('featured')) {
                        this.style.transform = 'translateY(0) scale(1)';
                    }
                });
            });
        });
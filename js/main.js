// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// Optimize performance based on device
const perfOptions = {
    animationFPS: isMobile ? 30 : 60,
    particleDensity: isMobile ? 0.5 : 1,
    scrollThrottle: isMobile ? 100 : 50,
    useSimpleAnimations: isMobile,
};

// Initialize GSAP with performance settings
gsap.config({
    autoSleep: 60,
    force3D: true,
    nullTargetWarn: false,
});

// Loader Animation with progress tracking
let progress = 0;
const updateProgress = () => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    return progress;
};

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const progressInterval = setInterval(() => {
        progress = updateProgress();
        if (progress >= 100) {
            clearInterval(progressInterval);
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                    startIntroAnimations();
                }
            });
        }
    }, 100);
});

// Custom Cursor - only initialize on desktop
if (window.innerWidth >= 1024) {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });

        // Cursor hover effects
        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursorFollower.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
}

// Matrix rain effect optimization
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Optimize canvas size for mobile
function setCanvasSize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
}

// Initial setup
setCanvasSize();

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

// Reduce density on mobile
const fontSize = isMobile ? 10 : 16;
const columns = Math.floor(canvas.width/fontSize);
const rainDrops = Array(Math.floor(columns)).fill(1);

// Optimize drawing
let animationFrameId;
let lastTime = 0;
const fpsInterval = isMobile ? 1000/30 : 1000/60; // 30 FPS on mobile, 60 FPS on desktop

const draw = (currentTime) => {
    animationFrameId = requestAnimationFrame(draw);
    
    const elapsed = currentTime - lastTime;
    if (elapsed < fpsInterval) return;
    
    lastTime = currentTime - (elapsed % fpsInterval);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    
    // Reduce number of drops on mobile
    const dropLimit = isMobile ? rainDrops.length/2 : rainDrops.length;
    
    for(let i = 0; i < dropLimit; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, rainDrops[i] * fontSize);
        
        if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

// Start/Stop animation based on visibility
let isMatrixPaused = false;

const startMatrix = () => {
    if (!isMatrixPaused) {
        lastTime = 0;
        animationFrameId = requestAnimationFrame(draw);
    }
};

const stopMatrix = () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
};

// Optimize for visibility and scroll
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isMatrixPaused = true;
        stopMatrix();
    } else {
        isMatrixPaused = false;
        startMatrix();
    }
});

// Pause matrix effect while scrolling on mobile
let scrollTimeout;
if (isMobile) {
    window.addEventListener('scroll', () => {
        if (!isMatrixPaused) {
            isMatrixPaused = true;
            stopMatrix();
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isMatrixPaused = false;
            startMatrix();
        }, 150);
    }, { passive: true });
}

// Handle resize
window.addEventListener('resize', () => {
    setCanvasSize();
}, { passive: true });

// Start the animation
startMatrix();

// Touch-friendly navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    // Add touch feedback
    navToggle.addEventListener('touchstart', () => {
        navToggle.style.opacity = '0.7';
    });

    navToggle.addEventListener('touchend', () => {
        navToggle.style.opacity = '1';
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');

            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                // Add active state to link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Smooth scroll with offset
                const offset = 60; // Height of fixed navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Optimized scroll handling
let isScrolling;
const throttleScroll = (callback, limit = perfOptions.scrollThrottle) => {
    let inThrottle;
    return (e) => {
        if (!inThrottle) {
            callback(e);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Update active section on scroll
const sections = document.querySelectorAll('section[id]');
const updateActiveSection = throttleScroll(() => {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom && navLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

window.addEventListener('scroll', updateActiveSection, { passive: true });

// Touch-friendly project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    if (isMobile) {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });

        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    }
});

// Optimized animations for mobile
function startIntroAnimations() {
    if (isMobile) {
        // Simplified animations for mobile
        gsap.from('.navbar', {
            y: -50,
            opacity: 0,
            duration: 0.5
        });

        gsap.from('.glitch', {
            y: 30,
            opacity: 0,
            duration: 0.5
        });

        gsap.from('.subtitle', {
            opacity: 0,
            duration: 0.5,
            delay: 0.2
        });
    } else {
        // Full animations for desktop
        gsap.from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        });

        const tl = gsap.timeline();
        tl.from('.glitch', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        })
        .from('.subtitle', {
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.5')
        .from('.cta-button', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .from('.scroll-indicator', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.5');
    }
}

// Handle orientation change
window.addEventListener('orientationchange', () => {
    // Wait for orientation to complete
    setTimeout(() => {
        window.scrollTo(0, window.scrollY + 1);
    }, 300);
}, { passive: true });

// Prevent bounce effect on iOS
document.body.addEventListener('touchmove', (e) => {
    if (e.target.closest('.project-tech')) return;
    if (window.scrollY === 0 && e.touches[0].clientY > 0) {
        e.preventDefault();
    }
}, { passive: false });

// Project Card Interactions - only on desktop
const isDesktop = window.innerWidth >= 1024;

document.querySelectorAll('.project-card').forEach(card => {
    if (isDesktop) {
        // Tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        // Reset tilt
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }

    // Glitch effect on hover - works on both mobile and desktop
    card.addEventListener('mouseenter', () => {
        const timeline = gsap.timeline();
        for(let i = 0; i < 3; i++) {
            timeline.to(card, {
                x: gsap.utils.random(-5, 5),
                y: gsap.utils.random(-5, 5),
                duration: 0.1,
                opacity: gsap.utils.random(0.8, 1)
            });
        }
        timeline.to(card, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.2
        });
    });
});

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Performance optimization for Matrix rain
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    canvas.style.opacity = '0.3';
    
    isScrolling = setTimeout(() => {
        canvas.style.opacity = '1';
    }, 100);
}, { passive: true });

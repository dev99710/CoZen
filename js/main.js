// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Loader Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            loader.style.display = 'none';
            // Start intro animations
            startIntroAnimations();
        }
    });
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

const isMobile = window.innerWidth < 768;
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

// Intro Animations
function startIntroAnimations() {
    // Navbar animation
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    // Hero content animations
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
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
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
}

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

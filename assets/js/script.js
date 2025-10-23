// =======================
// HEADER - SCROLL Y TRANSPARENCIA
// =======================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.background = 'rgba(0, 0, 0, 0.6)';
    header.style.backdropFilter = 'blur(5px)';
  } else {
    header.style.background = 'transparent';
    header.style.backdropFilter = 'none';
  }
});

// =======================
// HERO - PARALLAX POR MOUSE
// =======================
const hero = document.querySelector('.hero');
const bg = document.querySelector('.background-image');

if (hero && bg) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0 - 1
    const relY = (e.clientY - rect.top) / rect.height; // 0 - 1

    const moveX = (relX - 0.5) * 50;
    const moveY = (relY - 0.5) * 36;

    bg.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.06)`;
  });

  hero.addEventListener('mouseleave', () => {
    bg.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
  });
}

// =======================
// MENU HAMBURGUESA
// =======================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});


// =======================
// SCROLL PATH (timeline progress)
// =======================
const path = document.getElementById('scrollPath');
if (path) {
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    const drawLength = pathLength * scrollPercent;
    path.style.strokeDashoffset = pathLength - drawLength;
  });
}

// =======================
// ANIMACIÓN DE PASOS (INTERSECTION OBSERVER)
// =======================
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      updateProgressLine();
    }
  });
}, observerOptions);

document.querySelectorAll('.process-step').forEach(step => {
  observer.observe(step);
});

function updateProgressLine() {
  const steps = document.querySelectorAll('.process-step.visible');
  const timeline = document.querySelector('.timeline');
  const progressLine = document.querySelector('.timeline-progress');
  
  if (steps.length > 0) {
    const lastStep = steps[steps.length - 1];
    const stepIcon = lastStep.querySelector('.step-icon-wrapper');
    const timelineRect = timeline.getBoundingClientRect();
    const iconRect = stepIcon.getBoundingClientRect();
    const height = iconRect.top - timelineRect.top + iconRect.height / 2;
    progressLine.style.height = height + 'px';
  }
}

// Optimización para scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateProgressLine();
      ticking = false;
    });
    ticking = true;
  }
});

// Inicializar al cargar
window.addEventListener('load', () => {
  setTimeout(updateProgressLine, 100);
});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navigation a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Cerrar menú hamburguesa
      const hamburger = document.getElementById('hamburger');
      const navMenu = document.getElementById('nav-menu');
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = 80; // Ajusta según tu header
        const targetPosition = targetSection.offsetTop - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // 1 segundo
        let start = null;
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
      }
    });
  });
});
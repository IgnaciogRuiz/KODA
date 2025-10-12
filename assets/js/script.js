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

// Seleccionamos hero y fondo
const hero = document.querySelector('.hero');
const bg = document.querySelector('.background-image');

if (hero && bg) {
// Mueve el fondo según la posición del mouse dentro del hero
hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;  // 0 - 1
    const relY = (e.clientY - rect.top) / rect.height;  // 0 - 1

    // Centrar en 0: -0.5 .. 0.5
    const moveX = (relX - 0.5) * 20; // ajustar intensidad horizontal
    const moveY = (relY - 0.5) * 16; // ajustar intensidad vertical

    bg.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.06)`;
});

// Reset cuando el mouse sale del área
hero.addEventListener('mouseleave', () => {
    bg.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
});

// Opcional: tocar en mobile — usamos touchmove si querés
// hero.addEventListener('touchmove', (e) => { ... });
}
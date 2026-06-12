// =====================
// AOS Init
// =====================
AOS.init({
  duration: 650,
  easing: 'ease-out-quad',
  once: true,
  offset: 60,
});

// =====================
// Typing animation for hero resume card
// =====================
const typedNameEl = document.getElementById('typedName');
const name = 'Naman Sharma';
let charIndex = 0;

function typeName() {
  if (!typedNameEl) return;
  typedNameEl.classList.add('typing');

  const interval = setInterval(() => {
    if (charIndex < name.length) {
      typedNameEl.textContent += name[charIndex];
      charIndex++;
    } else {
      clearInterval(interval);
      typedNameEl.classList.remove('typing');
      typedNameEl.classList.add('done');
    }
  }, 90);
}

// Start typing after a short delay so hero has loaded
window.addEventListener('load', () => {
  setTimeout(typeName, 800);
});

// =====================
// Sticky nav shadow on scroll
// =====================
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// =====================
// Smooth scroll for nav links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =====================
// Template card — hover tilt effect
// =====================
document.querySelectorAll('.template-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.3s ease, border-color 0.25s';
  });
});

// =====================
// CTA button — link to editor
// =====================
document.querySelectorAll('a[href="./editor.html"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // If editor is on same domain, just let it navigate
    // Replace ./editor.html with your actual editor URL if different
  });
});
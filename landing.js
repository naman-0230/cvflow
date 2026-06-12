// ── AOS init ──────────────────────────────────────────────────
AOS.init({
  duration: 600,
  easing: 'ease-out-quad',
  once: true,
  offset: 50,
});

// ── Redirect if user was mid-edit ────────────────────────────
if (sessionStorage.getItem('cvflow_editing') === 'true') {
  window.location.replace('editor.html'); 
}

// ── Typing animation on resume card ──────────────────────────
const nameEl = document.getElementById('typedName');
const name = 'Naman Sharma';
let i = 0;

function typeName() {
  if (!nameEl) return;
  nameEl.classList.add('typing');
  const iv = setInterval(() => {
    if (i < name.length) {
      nameEl.textContent += name[i++];
    } else {
      clearInterval(iv);
      nameEl.classList.remove('typing');
      nameEl.classList.add('done');
      // trigger ATS bar after name finishes
      setTimeout(animateAts, 300);
    }
  }, 85);
}

// ── ATS score bar animation ───────────────────────────────────
function animateAts() {
  const fill = document.getElementById('rcAtsFill');
  const val  = document.getElementById('rcAtsVal');
  if (!fill || !val) return;

  const target = 94;
  let current = 0;
  const step = () => {
    current = Math.min(current + 2, target);
    fill.style.width = current + '%';
    val.textContent  = current + '%';
    if (current < target) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

window.addEventListener('load', () => {
  setTimeout(typeName, 700);
});

// ── Nav shadow on scroll ──────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 4px 20px rgba(0,0,0,0.08)'
    : '0 1px 3px rgba(0,0,0,0.07)';
}, { passive: true });

// ── Smooth scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 70,
        behavior: 'smooth',
      });
    }
  });
});
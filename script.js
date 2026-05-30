//Selecting Tab panes

const tabContainer = document.querySelector(".section-tabs");

tabContainer.addEventListener("click", (e) => {

    const clickedTab = e.target.closest(".stab");

    if (!clickedTab) return;

    document.querySelectorAll(".stab")
        .forEach(tab => tab.classList.remove("active"));

    clickedTab.classList.add("active");

    document.querySelectorAll(".tab-pane")
        .forEach(pane => pane.classList.remove("active"));

    const paneName = clickedTab.dataset.tab;

    document
        .querySelector(`#pane-${paneName}`)
        .classList.add("active");

});




//  Personal Details -> Live Preview

// ── Input elements (form)
const fName      = document.getElementById('f-name');
const fEmail     = document.getElementById('f-email');
const fPhone     = document.getElementById('f-phone');
const fLinkedin  = document.getElementById('f-linkedin');
const fGithub    = document.getElementById('f-github');
const fPortfolio = document.getElementById('f-portfolio');
const fLocation  = document.getElementById('f-location');

// ── Preview elements (resume)
const rvName     = document.getElementById('rv-name');
const rvEmail    = document.getElementById('rv-email');
const rvPhone    = document.getElementById('rv-phone');
const rvLocation = document.getElementById('rv-location');
const rvLinkedin = document.getElementById('rv-linkedin');
const rvGithub   = document.getElementById('rv-github');
const rvPortfolio= document.getElementById('rv-portfolio');
const rvContacts = document.getElementById('rv-contacts');
const rvLinks    = document.getElementById('rv-links');

// Separators inside rv-contacts (the | pipes)
// We'll rebuild contacts row dynamically so separators show only between filled fields

function updatePreview() {
  // Name — fallback to placeholder text if empty
  rvName.textContent = fName.value.trim() || 'Your Full Name';

  // Rebuild contacts row: only show filled fields with | between them
  const contactItems = [
    fEmail.value.trim(),
    fPhone.value.trim(),
    fLocation.value.trim(),
  ].filter(Boolean); // removes empty strings

  rvContacts.innerHTML = contactItems
    .map((item, i) => {
      const sep = i < contactItems.length - 1
        ? '<span class="rv-sep"> | </span>'
        : '';
      return `<span>${item}</span>${sep}`;
    })
    .join('') || '<span style="color:#ccc;font-style:italic;">email · phone · location</span>';

  // Links row — only show filled ones
  rvLinkedin.textContent  = fLinkedin.value.trim();
  rvGithub.textContent    = fGithub.value.trim();
  rvPortfolio.textContent = fPortfolio.value.trim();

  // Hide links row entirely if all three are empty
  const anyLink = fLinkedin.value.trim() || fGithub.value.trim() || fPortfolio.value.trim();
  rvLinks.style.display = anyLink ? 'flex' : 'none';
}

// ── Attach listeners — fires on every keystroke
[fName, fEmail, fPhone, fLinkedin, fGithub, fPortfolio, fLocation]
  .forEach(input => input.addEventListener('input', updatePreview));

// ── Run once on load so preview shows defaults correctly
updatePreview();



//  EDUCATION



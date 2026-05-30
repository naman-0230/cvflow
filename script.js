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


const eduList    = document.getElementById('edu-list');
const addEduBtn  = document.getElementById('addEdu');
const tplEdu     = document.getElementById('tpl-edu');
const rvEdu      = document.getElementById('rv-edu');
 
// Holds all education data as an array of objects
let eduEntries = [];
 
function renderEduPreview() {
  if (eduEntries.length === 0) {
    rvEdu.innerHTML = '<p class="rv-empty">Fill in the Education tab →</p>';
    return;
  }
 
  rvEdu.innerHTML = eduEntries.map(e => {
    // Only render fields that are actually filled
    const scoreText  = e.score   ? ` | ${e.score}`         : '';
    const coursesText= e.courses ? `Courses: ${e.courses}`  : '';
 
    return `
      <div class="rv-edu-entry">
        <div class="rv-edu-row">
          <span class="rv-edu-inst">${e.inst || 'Institution Name'}</span>
          <span class="rv-edu-place">${e.loc || ''}</span>
        </div>
        <div class="rv-edu-row">
          <span class="rv-edu-degree">${e.degree || ''}${scoreText}</span>
          <span class="rv-edu-year">${e.year || ''}</span>
        </div>
        ${coursesText ? `<div class="rv-edu-courses">${coursesText}</div>` : ''}
      </div>
    `;
  }).join('');
}
 
function addEduEntry() {
  // Clone the template
  const clone = tplEdu.content.cloneNode(true);
  const card  = clone.querySelector('.entry-card');
 
  // Give this entry an index to track it
  const index = eduEntries.length;
  eduEntries.push({ inst:'', degree:'', loc:'', year:'', score:'', courses:'' });
 
  // Wire every input inside this card to update eduEntries[index]
  card.querySelector('[name="inst"]').addEventListener('input', function() {
    eduEntries[index].inst = this.value.trim();
    renderEduPreview();
  });
  card.querySelector('[name="degree"]').addEventListener('input', function() {
    eduEntries[index].degree = this.value.trim();
    renderEduPreview();
  });
  card.querySelector('[name="eloc"]').addEventListener('input', function() {
    eduEntries[index].loc = this.value.trim();
    renderEduPreview();
  });
  card.querySelector('[name="eyear"]').addEventListener('input', function() {
    eduEntries[index].year = this.value.trim();
    renderEduPreview();
  });
  card.querySelector('[name="escore"]').addEventListener('input', function() {
    eduEntries[index].score = this.value.trim();
    renderEduPreview();
  });
  card.querySelector('[name="ecourses"]').addEventListener('input', function() {
    eduEntries[index].courses = this.value.trim();
    renderEduPreview();
  });
 
  // Remove button — nulls out that entry and re-renders
  card.querySelector('.entry-remove').addEventListener('click', function() {
    eduEntries[index] = null;
    card.remove();
    // Filter out nulls then re-render
    eduEntries = eduEntries.filter(Boolean);
    renderEduPreview();
  });
 
  eduList.appendChild(card);
}
 
addEduBtn.addEventListener('click', addEduEntry);
 
// Add one entry by default so the form isn't empty on load
addEduEntry();


//Adding info functionality
const infoIcons = document.querySelectorAll(".info-icon");

infoIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        e.stopPropagation();
        const box = icon.querySelector(".info-box");
        box.classList.toggle("show");
    });
});

document.addEventListener("click", () => {
    document.querySelectorAll(".info-box").forEach(box => {
            box.classList.remove("show");
        });

});
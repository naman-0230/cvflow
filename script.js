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


//Adding INFO 'i' functionality
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




// ── SKILLS SECTION ───────────────────────────────────────────

const rvSkills = document.getElementById('rv-skills');

// Categories now: lang-tech, tools, soft
const selected = { 'lang-tech': [], tools: [], soft: [] };

// Custom groups: [{ id, heading, skills[] }, ...]
let customGroups = [];

// ── Preview renderer ─────────────────────────────────────────
function renderSkillsPreview() {
  const hasLangTech = selected['lang-tech'].length > 0;
  const hasTools    = selected.tools.length > 0;
  const hasSoft     = selected.soft.length > 0;
  const hasCustom   = customGroups.some(g => g.skills.length > 0);

  if (!hasLangTech && !hasTools && !hasSoft && !hasCustom) {
    rvSkills.innerHTML = '<p class="rv-empty">Select skills in the Skills tab →</p>';
    return;
  }

  let html = '';

  // Custom groups first (user-defined headings)
  customGroups.forEach(g => {
    if (g.skills.length === 0) return;
    const heading = g.heading.trim() || 'Other';
    html += `
      <div class="rv-skill-row">
        <span class="rv-skill-cat">${heading}:</span>
        <span class="rv-skill-vals">${g.skills.join(', ')}</span>
      </div>`;
  });

  if (hasLangTech) {
    html += `
      <div class="rv-skill-row">
        <span class="rv-skill-cat">Languages:</span>
        <span class="rv-skill-vals">${selected['lang-tech'].join(', ')}</span>
      </div>`;
  }

  if (hasTools) {
    html += `
      <div class="rv-skill-row">
        <span class="rv-skill-cat">Tools &amp; Platforms:</span>
        <span class="rv-skill-vals">${selected.tools.join(', ')}</span>
      </div>`;
  }

  if (hasSoft) {
    html += `
      <div class="rv-skill-row">
        <span class="rv-skill-cat">Soft Skills:</span>
        <span class="rv-skill-vals">${selected.soft.join(', ')}</span>
      </div>`;
  }

  rvSkills.innerHTML = html;
}

// ── Chip-based tag renderer ──────────────────────────────────
function renderTagsUI(cat) {
  const tagsContainer = document.getElementById(`tags-${cat}`);
  if (!tagsContainer) return;

  tagsContainer.innerHTML = selected[cat].map(skill => `
    <span class="stag">
      ${skill}
      <button data-skill="${skill}" data-cat="${cat}">×</button>
    </span>
  `).join('');

  tagsContainer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function () {
      const s = this.dataset.skill;
      const c = this.dataset.cat;
      selected[c] = selected[c].filter(x => x !== s);

      // Unmark chip in pool if it exists
      document.querySelectorAll(`.chip[data-cat="${c}"]`).forEach(ch => {
        if (ch.textContent.trim() === s) ch.classList.remove('on');
      });

      renderTagsUI(c);
      renderSkillsPreview();
    });
  });
}

function addSkill(skill, cat) {
  if (!selected[cat].includes(skill)) {
    selected[cat].push(skill);
    renderTagsUI(cat);
    renderSkillsPreview();
  }
}

// ── Chip clicks ──────────────────────────────────────────────
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', function () {
    const skill = this.textContent.trim();
    const cat   = this.dataset.cat;

    if (this.classList.contains('on')) {
      this.classList.remove('on');
      selected[cat] = selected[cat].filter(s => s !== skill);
      renderTagsUI(cat);
      renderSkillsPreview();
    } else {
      this.classList.add('on');
      addSkill(skill, cat);
    }
  });
});

// ── Custom input fields (Enter to add) ───────────────────────
[
  { inputId: 'custom-lang-tech', cat: 'lang-tech' },
  { inputId: 'custom-tools',     cat: 'tools'     },
  { inputId: 'custom-soft',      cat: 'soft'      },
].forEach(({ inputId, cat }) => {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const val = this.value.trim();
    if (val) {
      addSkill(val, cat);
      this.value = '';
    }
  });
});

// ── Custom Skill Groups ──────────────────────────────────────
const MAX_GROUPS_BEFORE_WARN = 3;
let groupCount = 0;

document.getElementById('add-group-btn').addEventListener('click', addGroup);

function addGroup() {
  groupCount++;

  const list = document.getElementById('custom-groups-list');

  if (groupCount > MAX_GROUPS_BEFORE_WARN) {
    if (!document.getElementById('clutter-warning')) {
      const warn = document.createElement('p');
      warn.id        = 'clutter-warning';
      warn.className = 'clutter-warning';
      warn.textContent = '⚠️ Adding more than 3 skill groups may make your resume look cluttered.';
      list.parentNode.insertBefore(warn, list);
    }
  }

  const id    = `group-${Date.now()}`;
  const group = document.createElement('div');
  group.className  = 'custom-group';
  group.dataset.id = id;
  group.innerHTML  = `
    <div class="custom-group-header">
      <input
        class="finput custom-group-heading"
        type="text"
        placeholder="Group heading (e.g. Frameworks)"
        maxlength="40"
      />
      <button class="remove-group-btn" type="button" title="Remove group">✕</button>
    </div>
    <div class="custom-group-tags" id="gtags-${id}"></div>
    <input
      class="finput custom-group-skill-input"
      type="text"
      placeholder="Type a skill + press Enter"
      data-group="${id}"
    />
  `;
  list.appendChild(group);

  // Register in customGroups state
  const groupData = { id, heading: '', skills: [] };
  customGroups.push(groupData);

  // Sync heading input → state → preview
  group.querySelector('.custom-group-heading').addEventListener('input', function () {
    groupData.heading = this.value;
    renderSkillsPreview();
  });

  // Remove entire group
  group.querySelector('.remove-group-btn').addEventListener('click', () => {
    group.remove();
    groupCount--;
    customGroups = customGroups.filter(g => g.id !== id);

    if (groupCount <= MAX_GROUPS_BEFORE_WARN) {
      document.getElementById('clutter-warning')?.remove();
    }
    renderSkillsPreview();
  });

  // Enter to add skill tag inside the group
  group.querySelector('.custom-group-skill-input').addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const val = this.value.trim();
    if (!val) return;

    if (groupData.skills.includes(val)) {
      this.value = '';
      return;
    }

    groupData.skills.push(val);
    renderGroupTags(id, groupData);
    renderSkillsPreview();
    this.value = '';
  });
}

// ── Render tags inside a custom group ───────────────────────
function renderGroupTags(id, groupData) {
  const container = document.getElementById(`gtags-${id}`);
  if (!container) return;

  container.innerHTML = groupData.skills.map(skill => `
    <span class="stag">
      ${skill}
      <button data-skill="${skill}">×</button>
    </span>
  `).join('');

  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function () {
      const s = this.dataset.skill;
      groupData.skills = groupData.skills.filter(x => x !== s);
      renderGroupTags(id, groupData);
      renderSkillsPreview();
    });
  });
}
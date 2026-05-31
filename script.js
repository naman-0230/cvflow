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
const fName = document.getElementById('f-name');
const fEmail = document.getElementById('f-email');
const fPhone = document.getElementById('f-phone');
const fLinkedin = document.getElementById('f-linkedin');
const fGithub = document.getElementById('f-github');
const fPortfolio = document.getElementById('f-portfolio');
const fLocation = document.getElementById('f-location');

// ── Preview elements (resume)
const rvName = document.getElementById('rv-name');
const rvEmail = document.getElementById('rv-email');
const rvPhone = document.getElementById('rv-phone');
const rvLocation = document.getElementById('rv-location');
const rvLinkedin = document.getElementById('rv-linkedin');
const rvGithub = document.getElementById('rv-github');
const rvPortfolio = document.getElementById('rv-portfolio');
const rvContacts = document.getElementById('rv-contacts');
const rvLinks = document.getElementById('rv-links');

// Separators inside rv-contacts (the | pipes)
// We'll rebuild contacts row dynamically so separators show only between filled fields

function updatePreview() {
    // Name — fallback to placeholder text if empty
    rvName.textContent = fName.value.trim() || 'Your Full Name';

    // Rebuild contacts row: only show filled fields with | between them
    const contactItems = [];
    if (fEmail.value.trim()) {
        contactItems.push( `<a href="mailto:${fEmail.value.trim()}">${fEmail.value.trim()}</a>`);
    }
    if (fPhone.value.trim()) {
        contactItems.push(`<span>${fPhone.value.trim()}</span>`);
    }
    if (fLocation.value.trim()) {
        contactItems.push(`<span>${fLocation.value.trim()}</span>`);
    }

    rvContacts.innerHTML =
        contactItems.map((item, i) => {
                const sep = i < contactItems.length - 1 ? '<span class="rv-sep"> | </span>' : '';
                return item + sep;
            })
            .join('') || '<span style="color:#ccc;font-style:italic;">email · phone · location</span>';

    // Links row — only show filled ones
    rvLinkedin.textContent = fLinkedin.value.trim();
    rvLinkedin.href = fLinkedin.value.trim();
    rvGithub.textContent = fGithub.value.trim();
    rvGithub.href = fGithub.value.trim();
    rvPortfolio.textContent = fPortfolio.value.trim();
    rvPortfolio.href = fPortfolio.value.trim();

    // Hide links row entirely if all three are empty
    const anyLink = fLinkedin.value.trim() || fGithub.value.trim() || fPortfolio.value.trim();
    rvLinks.style.display = anyLink ? 'flex' : 'none';

    checkResumeOverflow();
}

// ── Attach listeners — fires on every keystroke
[fName, fEmail, fPhone, fLinkedin, fGithub, fPortfolio, fLocation]
    .forEach(input => {
        input.addEventListener('input', () => {
            updatePreview();
            saveToLocalStorage();

        });
    });

// ── Run once on load so preview shows defaults correctly
updatePreview();



//  EDUCATION


const eduList = document.getElementById('edu-list');
const addEduBtn = document.getElementById('addEdu');
const tplEdu = document.getElementById('tpl-edu');
const rvEdu = document.getElementById('rv-edu');

// Holds all education data as an array of objects
let eduEntries = [];

function renderEduPreview() {
    if (eduEntries.length === 0) {
        rvEdu.innerHTML = '<p class="rv-empty">Fill in the Education tab →</p>';
        return;
    }

    rvEdu.innerHTML = eduEntries.map(e => {
        // Only render fields that are actually filled
        const scoreText = e.score ? ` | ${e.score}` : '';
        const coursesText = e.courses ? `Courses: ${e.courses}` : '';

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
    checkResumeOverflow();
}

function addEduEntry() {
    // Clone the template
    const clone = tplEdu.content.cloneNode(true);
    const card = clone.querySelector('.entry-card');

    // Give this entry an index to track it
    const index = eduEntries.length;
    eduEntries.push({ inst: '', degree: '', loc: '', year: '', score: '', courses: '' });

    // Wire every input inside this card to update eduEntries[index]
    card.querySelector('[name="inst"]').addEventListener('input', function () {
        eduEntries[index].inst = this.value.trim();
        renderEduPreview();
        saveToLocalStorage();
    });
    card.querySelector('[name="degree"]').addEventListener('input', function () {
        eduEntries[index].degree = this.value.trim();
        renderEduPreview();
        saveToLocalStorage();
    });
    card.querySelector('[name="eloc"]').addEventListener('input', function () {
        eduEntries[index].loc = this.value.trim();
        renderEduPreview();
        saveToLocalStorage();
    });
    card.querySelector('[name="eyear"]').addEventListener('input', function () {
        eduEntries[index].year = this.value.trim();
        renderEduPreview();
        saveToLocalStorage();
    });
    card.querySelector('[name="escore"]').addEventListener('input', function () {
        eduEntries[index].score = this.value.trim();
        renderEduPreview();
        saveToLocalStorage();
    });
    card.querySelector('[name="ecourses"]').addEventListener('input', function () {
        eduEntries[index].courses = this.value.trim();
        renderEduPreview();
        saveToLocalStorage();
    });

    // Remove button — nulls out that entry and re-renders
    card.querySelector('.entry-remove').addEventListener('click', function () {
        eduEntries[index] = null;
        card.remove();
        // Filter out nulls then re-render
        eduEntries = eduEntries.filter(Boolean);
        renderEduPreview();
        saveToLocalStorage();
        checkResumeOverflow();
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
    const hasTools = selected.tools.length > 0;
    const hasSoft = selected.soft.length > 0;
    const hasCustom = customGroups.some(g => g.skills.length > 0);

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

    // &amp; Platforms 
    if (hasTools) {
        html += `
      <div class="rv-skill-row">
        <span class="rv-skill-cat">Tool: </span>
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
    saveToLocalStorage();
    checkResumeOverflow();
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
        const cat = this.dataset.cat;

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
    { inputId: 'custom-tools', cat: 'tools' },
    { inputId: 'custom-soft', cat: 'soft' },
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
            warn.id = 'clutter-warning';
            warn.className = 'clutter-warning';
            warn.textContent = '⚠️ Adding more than 3 skill groups may make your resume look cluttered.';
            list.parentNode.insertBefore(warn, list);
        }
    }

    const id = `group-${Date.now()}`;
    const group = document.createElement('div');
    group.className = 'custom-group';
    group.dataset.id = id;
    group.innerHTML = `
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



// ── PROJECTS ─────────────────────────────────────────────────

const projList = document.getElementById('proj-list');
const tplProj = document.getElementById('tpl-proj');

document.getElementById('addProj').addEventListener('click', () => addProject());

function addProject() {
    const clone = tplProj.content.cloneNode(true);
    const card = clone.querySelector('.entry-card');

    // ── Remove card
    card.querySelector('.entry-remove').addEventListener('click', () => {
        card.remove();
        renderProjectsPreview();
    });

    // ── Per-project tech stack chip system
    const stackSelected = [];
    const stackPool = card.querySelector('.proj-stack-pool');
    const stackInput = card.querySelector('.proj-stack-input');
    const stackTags = card.querySelector('.proj-stack-tags');

    function renderStackTags() {
        stackTags.innerHTML = stackSelected.map(s => `
      <span class="stag">
        ${s}
        <button data-skill="${s}">×</button>
      </span>
    `).join('');

        stackTags.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', function () {
                const s = this.dataset.skill;
                const i = stackSelected.indexOf(s);
                if (i > -1) stackSelected.splice(i, 1);
                stackPool.querySelectorAll('.chip').forEach(ch => {
                    if (ch.textContent.trim() === s) ch.classList.remove('on');
                });
                renderStackTags();
                renderProjectsPreview();
            });
        });
    }

    function addStackSkill(skill) {
        if (!stackSelected.includes(skill)) {
            stackSelected.push(skill);
            renderStackTags();
            renderProjectsPreview();
        }
    }

    stackPool.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function () {
            const skill = this.textContent.trim();
            if (this.classList.contains('on')) {
                this.classList.remove('on');
                const i = stackSelected.indexOf(skill);
                if (i > -1) stackSelected.splice(i, 1);
                renderStackTags();
                renderProjectsPreview();
            } else {
                this.classList.add('on');
                addStackSkill(skill);
            }
        });
    });

    stackInput.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const val = this.value.trim();
        if (val) { addStackSkill(val); this.value = ''; }
    });

    // ── Bullet Builder
    const bulletList = card.querySelector('.bullet-list');
    const bulletCounter = card.querySelector('.bullet-counter');
    const verbChips = card.querySelectorAll('.verb-chip');
    const addBulletBtn = card.querySelector('.btn-add-bullet');

    function updateCounter() {
        const count = bulletList.querySelectorAll('.bullet-input').length;
        const hint = count >= 5 ? ' · consider trimming ⚠️'
            : count >= 2 ? ' · good ✓' : '';
        bulletCounter.textContent = `${count} bullet${count !== 1 ? 's' : ''}${hint}`;
    }

    function addBullet(prefillVerb = '') {
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `
      <span class="bullet-prefix">•</span>
      <input class="finput bullet-input" type="text"
        placeholder="Describe what you built or achieved..."
        value="${prefillVerb ? prefillVerb + ' ' : ''}" />
      <button class="bullet-remove" type="button">✕</button>
    `;

        const input = row.querySelector('.bullet-input');
        const removeBtn = row.querySelector('.bullet-remove');

        input.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            addBullet();
            const all = bulletList.querySelectorAll('.bullet-input');
            all[all.length - 1].focus();
        });

        removeBtn.addEventListener('click', () => {
            row.remove();
            updateCounter();
            renderProjectsPreview();
        });

        input.addEventListener('input', renderProjectsPreview);

        bulletList.appendChild(row);
        updateCounter();

        if (prefillVerb) {
            setTimeout(() => {
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }, 0);
        }
    }

    verbChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const verb = chip.textContent.trim();
            const focused = bulletList.querySelector('.bullet-input:focus');
            if (focused && focused.value.trim() === '') {
                focused.value = verb + ' ';
                renderProjectsPreview();
                return;
            }
            addBullet(verb);
            updateCounter();
        });
    });

    addBulletBtn.addEventListener('click', () => {
        addBullet();
        const all = bulletList.querySelectorAll('.bullet-input');
        all[all.length - 1].focus();
    });

    addBullet(); // start with one empty bullet
    projList.appendChild(card);
    renderProjectsPreview();
}

// ── Projects Preview Renderer — matches PDF layout
function renderProjectsPreview() {
    const rvProj = document.getElementById('rv-proj');
    if (!rvProj) return;

    const cards = projList.querySelectorAll('.entry-card');

    if (cards.length === 0) {
        rvProj.innerHTML = '<p class="rv-empty">Add projects in the Projects tab →</p>';
        return;
    }

    let html = '';

    cards.forEach(card => {
        const name = card.querySelector('[name="pname"]')?.value.trim();
        const link = card.querySelector('[name="plink"]')?.value.trim();

        // Stack from selected tags
        const stack = [...card.querySelectorAll('.proj-stack-tags .stag')]
            .map(t => t.childNodes[0].textContent.trim())
            .join(' · ');

        const bullets = [...card.querySelectorAll('.bullet-input')]
            .map(i => i.value.trim())
            .filter(Boolean);

        if (!name && bullets.length === 0) return;

        html += `<div class="rv-proj-entry">`;

        // Name + link on same row
        html += `<div class="rv-proj-row">
      <span class="rv-proj-name">${name || 'Untitled Project'}</span>
      ${link ? `<span class="rv-proj-link">${link}</span>` : ''}
    </div>`;

        // Stack always on its own line (PDF style), not squeezed next to name
        if (stack) {
            html += `<div class="rv-proj-stack">${stack}</div>`;
        }

        // Bullets
        if (bullets.length) {
            html += `<ul class="rv-proj-bullets">
        ${bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>`;
        }

        html += `</div>`;
    });

    rvProj.innerHTML = html || '<p class="rv-empty">Fill in project details →</p>';
    saveToLocalStorage();
    checkResumeOverflow();
}




// ── EXPERIENCE ──

const expList = document.getElementById('exp-list');
const tplExp = document.getElementById('tpl-exp');

document.getElementById('addExp').addEventListener('click', addExperience);

// ATS rules config
const WEAK_VERBS = ['worked', 'helped', 'did', 'made', 'assisted', 'supported', 'was', 'used', 'thing', 'things', 'stuff', 'some',
    'many', 'often', 'sometimes', 'etc', 'and more', 'basic', 'good', 'great', 'nice', 'tried', 'attempted', 'familiar'];


const TECH_KEYWORDS = [
    // Languages
    'javascript', 'typescript', 'python', 'java', 'c', 'c++', 'c#', 'go', 'golang',
    'rust', 'kotlin', 'swift', 'php', 'ruby', 'dart',

    // Frontend
    'html', 'css', 'sass', 'scss',
    'react', 'next.js', 'nextjs', 'vue', 'angular',
    'tailwind', 'bootstrap', 'redux',

    // Backend
    'node', 'nodejs', 'node.js',
    'express', 'expressjs', 'express.js',
    'nestjs', 'django', 'flask', 'spring', 'springboot',

    // Databases
    'sql', 'mysql', 'postgresql', 'postgres',
    'mongodb', 'redis', 'sqlite', 'oracle',

    // Cloud & DevOps
    'aws', 'azure', 'gcp',
    'docker', 'kubernetes', 'jenkins',
    'terraform', 'vercel', 'netlify',

    // Mobile
    'flutter', 'react native', 'react-native',
    'android', 'ios', 'swift', 'kotlin',

    // APIs
    'rest', 'rest api', 'api',
    'graphql', 'websocket',

    // Tools
    'git', 'github', 'gitlab',
    'linux', 'bash', 'shell',
    'postman', 'jira', 'figma',

    // CS Fundamentals
    'dsa',
    'data structures',
    'algorithms',
    'oop',
    'object oriented programming',
    'dbms',
    'operating system',
    'os',
    'computer networks',
    'cn',

    // AI / ML
    'machine learning',
    'deep learning',
    'tensorflow',
    'pytorch',
    'scikit-learn',
    'opencv',
    'nlp',

    // Data
    'pandas',
    'numpy',
    'matplotlib',
    'power bi',
    'tableau',

    // Testing
    'jest',
    'cypress',
    'selenium',
    'testing',

    // Security
    'jwt',
    'oauth',
    'authentication',
    'authorization'
];
const OUTCOME_WORDS = [
    'improved', 'reduced', 'increased', 'optimized', 'enabled', 'automated',
    'boosted', 'cut', 'saved', 'achieved', 'delivered', 'enhanced', 'accelerated'
];

function runATSCheck(bulletInputs) {
    const issues = [];

    bulletInputs.forEach((input, i) => {
        const raw = input.value.trim();
        if (!raw) return;

        const text = raw.toLowerCase();
        const words = raw.split(/\s+/);
        const label = `Bullet ${i + 1}`;

        // Rule 1: Too short
        if (words.length < 4) {
            issues.push({ type: 'warn', msg: `<b>${label}:</b> Looks too short — add more detail.` });
        }

        // Rule 2: Weak verb
        const firstWord = words[0].toLowerCase().replace(/[^a-z]/g, '');
        if (WEAK_VERBS.includes(firstWord)) {
            issues.push({
                type: 'warn',
                msg: `<b>${label}:</b> "${words[0]}" is a weak start. Try: Developed, Implemented, Engineered, Optimized…`
            });
        }

        // Rule 3: No technology mentioned
        const hasTech = TECH_KEYWORDS.some(kw => text.includes(kw));
        if (!hasTech) {
            issues.push({ type: 'warn', msg: `<b>${label}:</b> Mention the technology or tool used.` });
        }

        // Rule 4: No outcome
        const hasOutcome = OUTCOME_WORDS.some(w => text.includes(w));
        if (!hasOutcome) {
            issues.push({ type: 'tip', msg: `<b>${label}:</b> Consider adding impact or outcome (e.g. "reducing load time by 30%").` });
        }
    });

    return issues;
}

function renderATSFeedback(card) {
    const feedbackEl = card.querySelector('.ats-feedback');
    const bulletInputs = [...card.querySelectorAll('.bullet-input')];
    const issues = runATSCheck(bulletInputs);

    if (issues.length === 0) {
        feedbackEl.style.display = 'none';
        feedbackEl.innerHTML = '';
        return;
    }

    feedbackEl.style.display = 'flex';
    feedbackEl.innerHTML = issues.map(issue => `
    <div class="ats-issue ${issue.type}">
      <span class="ats-issue-icon">${issue.type === 'warn' ? '⚠' : '💡'}</span>
      <span>${issue.msg}</span>
    </div>
  `).join('');
}

function addExperience() {
    const clone = tplExp.content.cloneNode(true);
    const card = clone.querySelector('.entry-card');

    // ── Remove card ────────────────────────────────────────────
    card.querySelector('.entry-remove').addEventListener('click', () => {
        card.remove();
        renderExpPreview();
    });

    // ── Live preview on text inputs ────────────────────────────
    card.querySelectorAll('input[name]').forEach(input => {
        input.addEventListener('input', renderExpPreview);
    });

    // ── Bullet builder ─────────────────────────────────────────
    const bulletList = card.querySelector('.bullet-list');
    const bulletCounter = card.querySelector('.bullet-counter');
    const verbChips = card.querySelectorAll('.verb-chip');
    const addBulletBtn = card.querySelector('.btn-add-bullet');

    function updateCounter() {
        const count = bulletList.querySelectorAll('.bullet-input').length;
        const label = count === 1 ? '1 bullet' : `${count} bullets`;
        const hint = count >= 5
            ? ' · consider trimming ⚠️'
            : count >= 2
                ? ' · good length ✓'
                : '';
        bulletCounter.textContent = label + hint;
    }

    function addBullet(prefillVerb = '') {
        const row = document.createElement('div');
        row.className = 'bullet-row';
        row.innerHTML = `
      <span class="bullet-prefix">•</span>
      <input class="finput bullet-input" type="text"
        placeholder="Describe what you did, built, or achieved..."
        value="${prefillVerb ? prefillVerb + ' ' : ''}" />
      <button class="bullet-remove" type="button">✕</button>
    `;

        const input = row.querySelector('.bullet-input');
        const removeBtn = row.querySelector('.bullet-remove');

        // Enter → next bullet
        input.addEventListener('keydown', function (e) {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            addBullet();
            const all = bulletList.querySelectorAll('.bullet-input');
            all[all.length - 1].focus();
        });

        // Remove bullet
        removeBtn.addEventListener('click', () => {
            row.remove();
            updateCounter();
            renderATSFeedback(card);
            renderExpPreview();
        });

        // Live preview + ATS check on input
        input.addEventListener('input', () => {
            renderExpPreview();
            renderATSFeedback(card);
        });

        bulletList.appendChild(row);

        if (prefillVerb) {
            setTimeout(() => {
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }, 0);
        }

        updateCounter();
    }

    // Verb chip clicks
    verbChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const verb = chip.textContent.trim();
            const focused = bulletList.querySelector('.bullet-input:focus');

            if (focused && focused.value.trim() === '') {
                focused.value = verb + ' ';
                focused.focus();
                renderExpPreview();
                return;
            }

            addBullet(verb);
            updateCounter();
        });
    });

    // + Add Bullet
    addBulletBtn.addEventListener('click', () => {
        addBullet();
        const all = bulletList.querySelectorAll('.bullet-input');
        all[all.length - 1].focus();
    });

    // Start with one empty bullet
    addBullet();

    expList.appendChild(card);
    renderExpPreview();
}

// ── Experience Preview Renderer ──────────────────────────────
//for capitalizing
function toTitleCase(str) {
    if (!str) return '';
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

function renderExpPreview() {
    const rvExp = document.getElementById('rv-exp');
    const rvSection = document.getElementById('rv-exp-section');
    if (!rvExp) return;
    const cards = expList.querySelectorAll('.entry-card');

    if (cards.length === 0) {
        rvSection.classList.add('rv-section--hidden');
        rvExp.innerHTML = '';
        return;
    }

    let html = '';

    cards.forEach(card => {
        let company = card.querySelector('[name="ecomp"]')?.value.trim();
        let role = card.querySelector('[name="erole"]')?.value.trim();
        let start = card.querySelector('[name="estart"]')?.value.trim();
        let end = card.querySelector('[name="eend"]')?.value.trim();
        let loc = card.querySelector('[name="eloc2"]')?.value.trim();

        company = toTitleCase(company);
        role = toTitleCase(role);
        loc = toTitleCase(loc);
        start = toTitleCase(start);
        end = toTitleCase(end);

        const bullets = [...card.querySelectorAll('.bullet-input')]
            .map(i => i.value.trim())
            .filter(Boolean);

        if (!company && !role) return;

        const dateRange = [start, end].filter(Boolean).join(' – ');
        html += `<div class="rv-exp-block">`;
        html += `<div class="rv-exp-header">`;
        html += `<div class="rv-exp-left">`;
        html += `<div class="rv-exp-role">${role || ''}</div>`;
        html += `<div class="rv-exp-company">${company || ''}</div>`;
        html += `</div>`;
        html += `<div class="rv-exp-right">`;
        html += `<div class="rv-exp-dates">${dateRange || ''}</div>`;
        html += `<div class="rv-exp-loc">${loc || ''}</div>`;
        html += `</div>`;
        html += `</div>`;
        bullets.forEach(b => {
            html += `<div class="rv-exp-bullet">• ${b}</div>`;
        });
        html += `</div>`;

    });

    if (html) {
        rvSection.classList.remove('rv-section--hidden');
        rvExp.innerHTML = html;
    } else {
        rvSection.classList.add('rv-section--hidden');
        rvExp.innerHTML = '';
    }
    checkResumeOverflow();
    saveToLocalStorage();
}


//EXTRAS SECTION

function renderExtrasPreview() {
    //   if (!rvExtras) return;

    const certs = document.getElementById('f-certs')?.value.trim();
    const awards = document.getElementById('f-awards')?.value.trim();
    const coding = document.getElementById('f-coding')?.value.trim();
    const extra = document.getElementById('f-extra')?.value.trim();

    // ── Certifications & Achievements ──────────────────────────
    const rvExtras = document.getElementById('rv-extras');
    const rvExtSection = document.getElementById('rv-extras-section');
    const hasCertAward = certs || awards;

    if (!hasCertAward) {
        rvExtSection.classList.add('rv-section--hidden');
        rvExtras.innerHTML = '';
    } else {
        let html = '';
        if (certs) {
            certs.split('\n').filter(Boolean).forEach(line => {
                html += `<div class="rv-extras-item">• ${line.trim()}</div>`;
            });
        }
        if (awards) {
            awards.split('\n').filter(Boolean).forEach(line => {
                html += `<div class="rv-extras-item">• ${line.trim()}</div>`;
            });
        }
        rvExtras.innerHTML = html;
        rvExtSection.classList.remove('rv-section--hidden');
    }

    // ── Extracurricular Activities ─────────────────────────────
    const rvActivities = document.getElementById('rv-activities');
    const rvActSection = document.getElementById('rv-activities-section');
    const hasActivities = coding || extra;

    if (!hasActivities) {
        rvActSection.classList.add('rv-section--hidden');
        rvActivities.innerHTML = '';
    }
    else {
        let html = '';
        if (coding) {
            html += `<div class="rv-extras-item">• ${coding}</div>`;
        }
        if (extra) {
            extra.split('\n').filter(Boolean).forEach(line => {
                html += `<div class="rv-extras-item">• ${line.trim()}</div>`;
            });
        }
        rvActivities.innerHTML = html;
        rvActSection.classList.remove('rv-section--hidden');
    }

    checkResumeOverflow();
}

['f-certs', 'f-awards', 'f-coding', 'f-extra'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
        renderExtrasPreview();
        saveToLocalStorage();
    });
});






//SAVING to Local Storage

function collectProjects() {
    return [...projList.querySelectorAll('.entry-card')].map(card => ({
        name: card.querySelector('[name="pname"]')?.value || '',
        link: card.querySelector('[name="plink"]')?.value || '',
        stack: [...card.querySelectorAll('.proj-stack-tags .stag')]
            .map(t => t.childNodes[0].textContent.trim()),
        bullets: [...card.querySelectorAll('.bullet-input')]
            .map(i => i.value)
    }));
}

function collectExperience() {
    return [...expList.querySelectorAll('.entry-card')].map(card => ({
        company: card.querySelector('[name="ecomp"]')?.value || '',
        role: card.querySelector('[name="erole"]')?.value || '',
        start: card.querySelector('[name="estart"]')?.value || '',
        end: card.querySelector('[name="eend"]')?.value || '',
        loc: card.querySelector('[name="eloc2"]')?.value || '',
        bullets: [...card.querySelectorAll('.bullet-input')]
            .map(i => i.value)
    }));
}


function saveToLocalStorage() {
    const data = {
        // Personal info
        name: document.getElementById('f-name')?.value,
        email: document.getElementById('f-email')?.value,
        phone: document.getElementById('f-phone')?.value,
        location: document.getElementById('f-location')?.value,
        linkedin: document.getElementById('f-linkedin')?.value,
        github: document.getElementById('f-github')?.value,
        portfolio: document.getElementById('f-portfolio')?.value,
        // Extras
        certs: document.getElementById('f-certs')?.value,
        awards: document.getElementById('f-awards')?.value,
        coding: document.getElementById('f-coding')?.value,
        extra: document.getElementById('f-extra')?.value,

        selectedSkills: selected,
        customGroups: customGroups,
        education: eduEntries,
        projects: collectProjects(),
        experience: collectExperience(),
    };

    localStorage.setItem('resumeData', JSON.stringify(data));
}


//LOAD from Local Storage

function loadFromLocalStorage() {
    const raw = localStorage.getItem('resumeData');
    if (!raw) return;
    const data = JSON.parse(raw);

    // Simple fields
    ['name', 'email', 'phone', 'location', 'linkedin', 'github',
        'portfolio', 'certs', 'awards', 'coding', 'extra'].forEach(key => {
            const el = document.getElementById(`f-${key}`);
            if (el && data[key] !== undefined) el.value = data[key];
        });

    // Education — remove default empty card first
    eduList.innerHTML = '';
    eduEntries = [];
    if (data.education?.length) {
        data.education.forEach(e => {
            addEduEntry(); // creates card + pushes to eduEntries
            const index = eduEntries.length - 1;
            const card = eduList.querySelectorAll('.entry-card')[index];
            eduEntries[index] = { ...e };
            card.querySelector('[name="inst"]').value = e.inst || '';
            card.querySelector('[name="degree"]').value = e.degree || '';
            card.querySelector('[name="eloc"]').value = e.loc || '';
            card.querySelector('[name="eyear"]').value = e.year || '';
            card.querySelector('[name="escore"]').value = e.score || '';
            card.querySelector('[name="ecourses"]').value = e.courses || '';
        });
        renderEduPreview();
    }

    // Projects
    if (data.projects?.length) {
        data.projects.forEach(p => {
            addProject(); // creates card
            const card = [...projList.querySelectorAll('.entry-card')].at(-1);
            card.querySelector('[name="pname"]').value = p.name || '';
            card.querySelector('[name="plink"]').value = p.link || '';

            // Restore stack tags
            p.stack?.forEach(skill => {
                const stackSelected = [];
                // find the addStackSkill scoped to this card via input
                const stackInput = card.querySelector('.proj-stack-input');
                stackInput.value = skill;
                stackInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            });

            // Restore bullets — first bullet already exists, fill it then add more
            const bulletInputs = card.querySelectorAll('.bullet-input');
            p.bullets?.forEach((text, i) => {
                if (i === 0 && bulletInputs[0]) {
                    bulletInputs[0].value = text;
                } else {
                    const addBtn = card.querySelector('.btn-add-bullet');
                    addBtn.click();
                    card.querySelectorAll('.bullet-input')[i].value = text;
                }
            });
        });
        renderProjectsPreview();
    }

    // Experience
    if (data.experience?.length) {
        data.experience.forEach(exp => {
            addExperience(); // creates card
            const card = [...expList.querySelectorAll('.entry-card')].at(-1);
            card.querySelector('[name="ecomp"]').value = exp.company || '';
            card.querySelector('[name="erole"]').value = exp.role || '';
            card.querySelector('[name="estart"]').value = exp.start || '';
            card.querySelector('[name="eend"]').value = exp.end || '';
            card.querySelector('[name="eloc2"]').value = exp.loc || '';

            // Restore bullets
            exp.bullets?.forEach((text, i) => {
                if (i === 0) {
                    card.querySelectorAll('.bullet-input')[0].value = text;
                } else {
                    card.querySelector('.btn-add-bullet').click();
                    card.querySelectorAll('.bullet-input')[i].value = text;
                }
            });
        });
        renderExpPreview();
    }

    // Skills
    if (data.selectedSkills) {
        Object.keys(data.selectedSkills).forEach(cat => {
            if (!selected[cat]) selected[cat] = [];
            data.selectedSkills[cat].forEach(skill => {
                addSkill(skill, cat);
                document.querySelectorAll(`.chip[data-cat="${cat}"]`).forEach(chip => {
                    if (chip.textContent.trim() === skill) chip.classList.add('on');
                });
            });
        });
    }

    // Extras + personal preview
    renderExtrasPreview();
    renderSkillsPreview();
}




//Download Button//

// ── PDF / Print ──────────────────────────────────────────────

function downloadPDF() {
    const content = document.getElementById('resumeDoc').innerHTML;

    const printWindow = window.open('print.html', '_blank');

    printWindow.onload = function () {
        printWindow.document.getElementById('print-body').innerHTML = content;

        // Small delay to ensure fonts load
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };
}

document.getElementById('dlBtnPreview')?.addEventListener('click', downloadPDF);
document.getElementById('dlBtn')?.addEventListener('click', downloadPDF);



//Checking Overflow of page 

function checkResumeOverflow() {

    const preview = document.getElementById("resumeDoc");
    const warning = document.getElementById("overflow-warning");

    const contentHeight = preview.scrollHeight;
    const pageHeight = preview.clientHeight;

    const overflowPercent =
        Math.round(
            ((contentHeight - pageHeight) / pageHeight) * 100
        );

    if (overflowPercent > 0) {

        warning.textContent =
            `⚠ Resume exceeds one page by ${overflowPercent}%. Consider trimming content.`;

        warning.style.display = "block";

    } else {

        warning.textContent =
            "✓ Fits within one page";

        warning.style.display = "block";
    }
}



///Clear ALL feature

document.getElementById("clearBtn").addEventListener("click", resetResume);

function resetResume() {

    const confirmed = confirm(
        "This will clear all resume data. Continue?"
    );

    if (!confirmed) return;

    localStorage.removeItem("resumeData");
    location.reload();
}



///Zoom in / zoom out feature

let zoom = Number(localStorage.getItem('previewZoom')) || 100;

const preview = document.querySelector('.a4'); // adjust selector
const zoomValue = document.getElementById('zoomVal');

function updateZoom() {

    preview.style.transform = `scale(${zoom / 100})`;

    preview.style.transformOrigin = 'top center';

    zoomValue.textContent = `${zoom}%`;

    localStorage.setItem('previewZoom', zoom);
}

document.getElementById('zoomIn').addEventListener('click', () => {

    if (zoom >= 150) return;

    zoom += 10;
    updateZoom();
});

document.getElementById('zoomOut').addEventListener('click', () => {

    if (zoom <= 50) return;

    zoom -= 10;
    updateZoom();
});

updateZoom();

////

loadFromLocalStorage();
updatePreview();
renderExtrasPreview();
renderSkillsPreview();
renderEduPreview();
renderProjectsPreview();
renderExpPreview();
document.addEventListener('DOMContentLoaded', function() {
  renderHeader();
  renderGroups();
  renderTeamFilter();
  renderGroupMatches();
  renderKnockoutMatches();
  renderNotes();
  renderRules();
  renderUmpires();
  renderCustomSections();
  renderFooter();
});

// Direct mapping: Section1 -> Index 0, Section2 -> Index 1, etc.
function isSectionEnabled(index) {
  return CONFIG.Sections[index] ? CONFIG.Sections[index].isEnabled : true;
}

// Resolves target section keys based strictly on their immutable index mapping order
function getSectionData(index, fallbackKey) {
  const target = CONFIG.Sections[index];
  if (!target || !target.Section) return CONFIG[fallbackKey];
  return CONFIG[target.Section];
}

function getSectionName(index) {
  return CONFIG.Sections[index] ? CONFIG.Sections[index].Name : "";
}

function renderHeader() {
  const logoHTML = CONFIG.logoSrc
    ? `<img class="header-logo" src="${CONFIG.logoSrc}" alt="Logo" onerror="this.style.display='none'">`
    : `<div class="header-logo-placeholder">🏏</div>`;

  const poster = document.getElementById('poster');
  if (poster) {
    if (CONFIG.backgroundSrc) {
      poster.style.background = 'linear-gradient(160deg, #111111 0%, #1c1c1e 30%, #111111 60%, #0d0d0d 100%)';
      poster.style.setProperty('--watermark-image', `url('${CONFIG.backgroundSrc}')`);
    } else {
      poster.style.background = 'linear-gradient(160deg, #111111 0%, #1c1c1e 30%, #111111 60%, #0d0d0d 100%)';
      poster.style.setProperty('--watermark-image', 'none');
    }
  }

  const parts = CONFIG.tournamentName.split(' ');
  const titleHTML = parts.length >= 2
    ? `${parts[0]} <span>${parts.slice(1).join(' ')}</span>`
    : CONFIG.tournamentName;

  const headerEl = document.getElementById('header');
  if (headerEl) {
    headerEl.innerHTML = `
      ${logoHTML}
      <div class="header-text">
        <div class="header-title">${titleHTML}</div>
        <div class="header-year">${CONFIG.year}</div>
        <div class="header-meta">
          <div class="meta-pill">${CONFIG.sport}</div>
          <div class="meta-info">🗓️ ${CONFIG.date}</div>
        </div>
      </div>`;
  }
}

function renderGroups() {
  const panel = document.getElementById('groups-panel');
  if (!panel) return;

  if (!isSectionEnabled(0)) {
    panel.innerHTML = '';
    return;
  }

  const groupsData = getSectionData(0, 'Section1') || [];
  panel.innerHTML = groupsData.map(g => `
    <div class="group-box">
      <div class="group-box-header">${g.name}</div>
      <div class="group-team-list">
        ${g.teams.map(t => `
          <div class="group-team-item">
            <div class="group-team-bullet"></div>
            <div class="group-team-name">${t}</div>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

function renderTeamFilter() {
  const sel = document.getElementById('team-filter');
  if (!sel) return;

  if (!isSectionEnabled(1)) {
    sel.innerHTML = '';
    return;
  }

  const teamsData = getSectionData(1, 'Section2') || [];
  sel.innerHTML = '<option value="">All teams</option>';
  teamsData.forEach(t => {
    const o = document.createElement('option');
    o.value = t; o.textContent = t;
    sel.appendChild(o);
  });
  sel.addEventListener('change', filterSchedule);
}
function renderGroupMatches() {
  const container = document.getElementById('group-matches');
  if (!container) return;

  if (!isSectionEnabled(2)) {
    container.innerHTML = '';
    return;
  }

  const matchesData = getSectionData(2, 'Section3') || [];
  container.innerHTML = matchesData.map(m => `
    <div class="match-card" data-teams="${m.team1}|${m.team2}">
      <div class="match-time-strip">
        <div class="match-time">${m.time}</div>
        <div class="match-ampm">${m.period}</div>
      </div>
      <div class="match-center">
        <div class="match-num">Match ${m.num}</div>
        <div class="match-teams">
          <div class="team-name">${m.team1}</div>
          <div class="vs-badge">VS</div>
          <div class="team-name">${m.team2}</div>
        </div>
      </div>
      <div class="match-right"></div>
    </div>`).join('');
}

function renderKnockoutMatches() {
  const container = document.getElementById('knockout-matches');
  if (!container) return;

  if (!isSectionEnabled(3)) {
    container.innerHTML = '';
    return;
  }

  const knockoutData = getSectionData(3, 'Section4') || [];
  container.innerHTML = knockoutData.map(m => `
    <div class="knockout-card ${m.isFinal ? 'is-final' : ''}">
      <div class="knockout-time-strip">
        <div class="knockout-time">${m.time}</div>
        <div class="knockout-ampm">${m.period}</div>
      </div>
      <div class="knockout-center">
        <div class="knockout-label">${m.label}</div>
        <div class="knockout-matchup">${m.matchup}</div>
      </div>
    </div>`).join('');
}

function renderNotes() {
  const container = document.getElementById('notes-section');
  if (!container) return;

  if (!isSectionEnabled(5)) {
    container.innerHTML = '';
    return;
  }

  const notesData = getSectionData(5, 'Section6') || [];
  container.innerHTML = notesData.map(n => `
      <div class="note-item">
        <div class="note-dot"></div>
        <div class="note-text">${n}</div>
      </div>`).join('');
}

function renderRules() {
  const container = document.getElementById('rules-body');
  if (!container) return;

  if (!isSectionEnabled(6)) {
    container.innerHTML = '';
    return;
  }

  const rulesData = getSectionData(6, 'Section7') || [];
  container.innerHTML = rulesData.map((r, i) => `
      <div class="rule-item">
        <div class="rule-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="rule-text">${r}</div>
      </div>`).join('');
}

function renderUmpires() {
  const container = document.getElementById('umpires-body');
  if (!container) return;

  if (!isSectionEnabled(4)) {
    container.innerHTML = '';
    return;
  }

  const groupMatches = getSectionData(2, 'Section3') || [];
  const knockoutMatches = getSectionData(3, 'Section4') || [];
  const umpiresData = getSectionData(4, 'Section5') || [];

  const allMatches = [
    ...groupMatches.map((m, i) => ({
      label: `Match ${m.num}`,
      sub: `${m.team1} vs ${m.team2}`,
      umpires: umpiresData[i] || ["Yet to be confirmed", "Yet to be confirmed"],
      type: 'group'
    })),
    ...knockoutMatches.map((m, i) => ({
      label: m.label.replace('⚡ ', ''),
      sub: m.matchup,
      umpires: umpiresData[groupMatches.length + i] || ["Yet to be confirmed", "Yet to be confirmed"],
      type: 'knockout'
    }))
  ];

  const groupRows = allMatches.filter(m => m.type === 'group');
  const knockoutRows = allMatches.filter(m => m.type === 'knockout');

  const buildRows = matches => matches.map(m => {
    const badges = m.umpires.map(u => {
      const isTbc = u.toLowerCase().includes('yet') || u.toLowerCase().includes('tbc') || u.trim() === '';
      return `<span class="umpire-badge ${isTbc ? 'tbc' : ''}"><span class="umpire-icon">🧑‍⚖️</span>${isTbc ? 'Yet to be confirmed' : u}</span>`;
    }).join('');
    return `
      <div class="umpire-row">
        <div class="umpire-match-label">${m.label}</div>
        <div class="umpire-names">
          ${badges.split('<span class="umpire-divider">').join('<span class="umpire-divider">&amp;</span>')}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="umpire-section-label">Group Stage</div>
    ${buildRows(groupRows)}
    <div class="umpire-section-label" style="margin-top:14px">Knockout Stage</div>
    ${buildRows(knockoutRows)}
  `;
}

function renderCustomSections() {
  const container = document.getElementById('custom-sections');
  if (!container) return;

  if (!CONFIG.customSections || CONFIG.customSections.length === 0) {
    container.innerHTML = '';
    return;
  }

  function formatItemValue(value) {
    if (typeof value !== 'string') return value;

    const normalizeUrl = url => {
      if (/^https?:\/\//i.test(url)) return url;
      if (/^www\./i.test(url)) return `https://${url}`;
      if (/^mailto:/i.test(url)) return url;
      return null;
    };

    const absoluteUrl = normalizeUrl(value);
    if (absoluteUrl) {
      const isMail = value.toLowerCase().startsWith('mailto:');
      const displayText = isMail ? value.replace(/^mailto:/i, '') : value;
      const target = isMail ? '_self' : '_blank';
      const rel = isMail ? '' : ' rel="noopener noreferrer"';
      return `<a href="${absoluteUrl}" target="${target}"${rel} class="custom-link">${displayText}</a>`;
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return `<a href="mailto:${value}" class="custom-link">${value}</a>`;
    }

    if (/^[+0-9][0-9\s\-()]{6,}$/.test(value)) {
      const phoneDigits = value.replace(/\D/g, '');
      if (phoneDigits.length >= 7) {
        return `<a href="tel:+${phoneDigits}" class="custom-link">${value}</a>`;
      }
    }

    return value;
  }

  container.innerHTML = CONFIG.customSections.map((section, idx) => {
    const collapsible = section.collapsible !== false;
    const initiallyOpen = section.initiallyOpen === true;
    const bodyClassName = collapsible ? (initiallyOpen ? 'custom-section-body open' : 'custom-section-body') : 'custom-section-body open';

    return `
    <div class="custom-section">
      ${collapsible ? `
      <button class="custom-section-toggle${initiallyOpen ? ' open' : ''}" onclick="toggleCustomSection(${idx})">
        <span>${section.title}</span>
        <span class="custom-section-icon">▼</span>
      </button>` : `
      <div class="custom-section-static-header">${section.title}</div>`}
      <div class="${bodyClassName}" id="custom-body-${idx}">
        ${section.items.map(item => `
          <div class="custom-item">
            <div class="custom-item-label">${item.label}</div>
            <div class="custom-item-value">${formatItemValue(item.value)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  }).join('');
}

function toggleCustomSection(idx) {
  const body = document.getElementById(`custom-body-${idx}`);
  if (body) {
    body.classList.toggle('open');
    const btn = body.previousElementSibling;
    if (btn && btn.classList.contains('custom-section-toggle')) {
      btn.classList.toggle('open');
    }
  }
}

function renderFooter() {
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `<p>&copy; ${CONFIG.year} ${CONFIG.tournamentName}. All rights reserved.</p>`;
  }
}

function filterSchedule() {
  const val = document.getElementById('team-filter')?.value.toLowerCase();
  const cards = document.querySelectorAll('.match-card');
  cards.forEach(card => {
    if (!val) {
      card.style.display = '';
      return;
    }
    const teams = card.getAttribute('data-teams').toLowerCase();
    card.style.display = teams.includes(val) ? '' : 'none';
  });
}

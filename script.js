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

function renderHeader() {
  const logoHTML = CONFIG.logoSrc
    ? `<img class="header-logo" src="${CONFIG.logoSrc}" alt="Logo" onerror="this.style.display='none'">`
    : `<div class="header-logo-placeholder">🏏</div>`;

  const poster = document.getElementById('poster');
  if (CONFIG.backgroundSrc) {
    poster.style.background = 'linear-gradient(160deg, #111111 0%, #1c1c1e 30%, #111111 60%, #0d0d0d 100%)';
    poster.style.setProperty('--watermark-image', `url('${CONFIG.backgroundSrc}')`);
  } else {
    poster.style.background = 'linear-gradient(160deg, #111111 0%, #1c1c1e 30%, #111111 60%, #0d0d0d 100%)';
    poster.style.setProperty('--watermark-image', 'none');
  }

  const parts = CONFIG.tournamentName.split(' ');
  const titleHTML = parts.length >= 2
    ? `${parts[0]} <span>${parts.slice(1).join(' ')}</span>`
    : CONFIG.tournamentName;

  document.getElementById('header').innerHTML = `
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

function renderGroups() {
  const panel = document.getElementById('groups-panel');
  panel.innerHTML = CONFIG.groups.map(g => `
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
  sel.innerHTML = '<option value="">All teams</option>';
  CONFIG.teams.forEach(t => {
    const o = document.createElement('option');
    o.value = t; o.textContent = t;
    sel.appendChild(o);
  });
  sel.addEventListener('change', filterSchedule);
}

function renderGroupMatches() {
  const container = document.getElementById('group-matches');
  container.innerHTML = CONFIG.groupMatches.map(m => `
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
  container.innerHTML = CONFIG.knockoutMatches.map(m => `
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
  document.getElementById('notes-section').innerHTML =
    CONFIG.notes.map(n => `
      <div class="note-item">
        <div class="note-dot"></div>
        <div class="note-text">${n}</div>
      </div>`).join('');
}

function renderRules() {
  document.getElementById('rules-body').innerHTML =
    CONFIG.rules.map((r, i) => `
      <div class="rule-item">
        <div class="rule-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="rule-text">${r}</div>
      </div>`).join('');
}

function renderUmpires() {
  const allMatches = [
    ...CONFIG.groupMatches.map((m, i) => ({
      label: `Match ${m.num}`,
      sub: `${m.team1} vs ${m.team2}`,
      umpires: CONFIG.umpires[i] || ["Yet to be confirmed", "Yet to be confirmed"],
      type: 'group'
    })),
    ...CONFIG.knockoutMatches.map((m, i) => ({
      label: m.label.replace('⚡ ', ''),
      sub: m.matchup,
      umpires: CONFIG.umpires[CONFIG.groupMatches.length + i] || ["Yet to be confirmed", "Yet to be confirmed"],
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

  document.getElementById('umpires-body').innerHTML = `
    <div class="umpire-section-label">Group Stage</div>
    ${buildRows(groupRows)}
    <div class="umpire-section-label" style="margin-top:14px">Knockout Stage</div>
    ${buildRows(knockoutRows)}
  `;
}

function renderCustomSections() {
  const container = document.getElementById('custom-sections');
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
  const btn = body.previousElementSibling;
  body.classList.toggle('open');
  btn.classList.toggle('open');
}

function renderFooter() {
  document.getElementById('footer-tagline').textContent = `${CONFIG.tournamentName.toUpperCase()} ${CONFIG.year}`;
}

function filterSchedule() {
  const selected = document.getElementById('team-filter').value;
  document.querySelectorAll('.match-card').forEach(card => {
    if (!selected) return card.classList.remove('hidden');
    const teams = card.dataset.teams ? card.dataset.teams.split('|') : [];
    teams.includes(selected) ? card.classList.remove('hidden') : card.classList.add('hidden');
  });
}

function clearFilter() {
  document.getElementById('team-filter').value = '';
  filterSchedule();
}

function toggleRules() {
  const btn = document.getElementById('rules-toggle');
  const body = document.getElementById('rules-body');
  btn.classList.toggle('open');
  body.classList.toggle('open');
}

function toggleUmpires() {
  const btn = document.getElementById('umpires-toggle');
  const body = document.getElementById('umpires-body');
  btn.classList.toggle('open');
  body.classList.toggle('open');
}

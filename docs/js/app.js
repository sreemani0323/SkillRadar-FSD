// ── SkillRadar Main App ──
// Icon helper
function getIcon(name, size) {
  const s = size || 20;
  const icons = {
    briefcase: `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
    sparkles: `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    globe: `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    flame: `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`
  };
  return icons[name] || '';
}

// ── Inline HTML Templates ──
function getDashboardHtml() {
  return `<div class="section-header"><h2 class="section-title">Morning Intelligence</h2><p class="section-subtitle">Your career market overview for today.</p></div>
<div class="stats-grid" id="dashboard-stats"></div>
<div class="grid-2-1"><div class="card"><div class="card-header"><div><h3 class="card-title">Skill Demand Distribution</h3><p class="card-subtitle">Top 10 skills across 2,847 listings</p></div><div class="btn-group"><button class="btn-sm active">This Week</button><button class="btn-sm">Month</button><button class="btn-sm">All Time</button></div></div><canvas id="dashboard-bar-chart" class="bar-chart-canvas"></canvas></div>
<div class="card"><div class="card-header"><h3 class="card-title">Recently Added</h3><button class="link-btn">View All →</button></div><div id="recent-jobs" class="recent-jobs-list"></div></div></div>
<div class="sync-footer"><span>Synced from:</span><span class="sync-item"><span class="dot" style="background:#0077B5"></span> LinkedIn</span><span class="sync-item"><span class="dot" style="background:#FF7F00"></span> Naukri</span><span class="sync-item"><span class="dot" style="background:#FF4500"></span> Unstop</span><span class="sync-meta">· 2 mins ago · 2,847 listings indexed</span></div>`;
}

function getJobListingsHtml() {
  return `<div class="section-filters"><div class="search-box"><svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" id="job-search" placeholder="Search by title, company, skill..." class="search-input" /></div>
<div class="filter-row"><div class="filter-select"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg><select id="level-filter"><option>All Levels</option><option>Intern</option><option>Junior</option><option>Mid</option><option>Senior</option></select></div>
<div class="filter-select"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><select id="location-filter"><option>All Locations</option><option>Remote</option><option>On-site</option></select></div>
<span id="job-count" class="filter-count"></span><button id="clear-filters" class="link-btn hidden">✕ Clear All</button></div></div><div id="job-grid" class="job-grid"></div>`;
}

function getGapAnalyzerHtml() {
  return `<div class="grid-2-3"><div class="gap-input-panel"><div class="card"><h2 class="card-title-lg">Analyze Your Skill Gap</h2><p class="card-subtitle">Identify what you need to master for your next role.</p>
<div class="form-group"><label class="form-label">Your Current Skills</label><div class="skill-input-box" id="skill-input-box"><div class="skill-tags" id="skill-tags"></div><input type="text" id="skill-input" placeholder="Type skill and press Enter..." class="skill-text-input" /></div></div>
<div class="form-group"><label class="form-label">Target Role</label><select id="target-role" class="form-select"></select></div>
<div class="form-group"><label class="form-label">Experience Level</label><div class="level-buttons" id="level-buttons"><button class="lvl-btn" data-level="Intern">Intern</button><button class="lvl-btn" data-level="Junior">Junior</button><button class="lvl-btn active" data-level="Mid">Mid</button><button class="lvl-btn" data-level="Senior">Senior</button></div></div>
<button id="analyze-btn" class="btn-primary full-width">Analyze My Gap <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button></div></div>
<div id="gap-results" class="gap-results-panel"><div class="empty-state"><div class="empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div><h3>Ready to grow?</h3><p>Fill in your skills and target role to generate a personalized learning roadmap.</p></div></div></div>`;
}

function getSkillTrendsHtml() {
  return `<div class="section-header"><h2 class="section-title">Skill Growth Trends</h2><p class="section-subtitle">Predictive demand analytics across 183 skills tracked globally.</p></div>
<div class="card"><div class="trends-controls"><div><h3 class="form-label" style="margin-bottom:8px">Select Skills (Max 4)</h3><div id="skill-selector" class="skill-selector"></div></div>
<div class="btn-group" id="time-range-btns"><button class="btn-sm" data-range="4W">4W</button><button class="btn-sm active" data-range="8W">8W</button><button class="btn-sm" data-range="12W">12W</button><button class="btn-sm" data-range="6M">6M</button></div></div>
<div class="chart-container"><canvas id="trends-line-chart" class="line-chart-canvas"></canvas></div></div><div id="skill-detail-cards" class="stats-grid"></div>`;
}

function getAppTrackerHtml() {
  return `<div class="section-header" style="display:flex;justify-content:space-between;align-items:flex-start"><div><h2 class="section-title">Application Tracker</h2><p class="section-subtitle">Manage your interview pipeline and offers in one place.</p></div>
<button class="btn-primary" id="add-app-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Application</button></div><div id="kanban-board" class="kanban-board"></div>`;
}

function getJobAlertsHtml() {
  return `<div class="grid-2-1"><div class="alerts-main"><div class="card"><h2 class="card-title-lg">Create New Alert</h2><p class="card-subtitle">Get notified when new jobs match your criteria.</p>
<div class="form-grid-2"><div class="form-group full-span"><label class="form-label">Alert Name</label><input type="text" id="alert-name" placeholder="e.g. ML roles in Bangalore" class="form-input" /></div>
<div class="form-group"><label class="form-label">Skill</label><div class="search-box small"><svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" id="alert-skill" placeholder="Python, SQL..." class="search-input" /></div></div>
<div class="form-group"><label class="form-label">Location</label><select id="alert-location" class="form-select"><option>Any</option><option>Remote</option><option>Bangalore</option><option>Hyderabad</option></select></div></div>
<div class="form-group"><label class="form-label">Frequency</label><div class="level-buttons" id="freq-buttons"><button class="lvl-btn">Instant</button><button class="lvl-btn active">Daily</button><button class="lvl-btn">Weekly</button></div></div>
<button class="btn-primary full-width" id="create-alert-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Create Alert</button></div>
<div class="alerts-list-section"><h3 class="card-title">My Alerts <span id="alert-count" class="badge-accent"></span></h3><div id="alerts-list" class="alerts-grid"></div></div></div>
<div class="notifications-panel"><div class="notif-header"><h3 class="card-title">Notifications</h3><button class="link-btn">Mark all read</button></div><div id="notifications-list" class="notif-list"></div></div></div>`;
}

function getTechNewsHtml() {
  return `<div class="section-header" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px"><div><h2 class="section-title">Tech Intelligence Feed</h2><p class="section-subtitle">Curated industry insights powered by NewsAPI.</p></div>
<button class="btn-outline" id="refresh-news-btn"><svg id="refresh-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Refresh</button></div>
<div id="news-categories" class="category-pills"></div><div id="news-grid" class="news-grid"></div>
<div class="card"><h3 class="card-title" style="display:flex;align-items:center;gap:8px;margin-bottom:20px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> Trending in Tech</h3><div id="trending-topics"></div></div>`;
}

// Section mapping — now uses inline HTML, no fetch needed
const SECTIONS = {
  'dashboard':    { html: getDashboardHtml,    init: initDashboard },
  'job-listings': { html: getJobListingsHtml,  init: initJobListings },
  'gap-analyzer': { html: getGapAnalyzerHtml,  init: initGapAnalyzer },
  'skill-trends': { html: getSkillTrendsHtml,  init: initSkillTrends },
  'app-tracker':  { html: getAppTrackerHtml,   init: initAppTracker },
  'job-alerts':   { html: getJobAlertsHtml,    init: initJobAlerts },
  'tech-news':    { html: getTechNewsHtml,      init: initTechNews }
};

let currentSection = 'dashboard';

function loadSection(sectionId) {
  const section = SECTIONS[sectionId];
  if (!section) return;

  // Show loading bar
  const loadBar = document.getElementById('loading-bar');
  loadBar.classList.remove('hidden');
  loadBar.style.animation = 'none';
  loadBar.offsetHeight;
  loadBar.style.animation = '';

  // Update nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });

  const container = document.getElementById('content-container');
  container.style.opacity = '0';
  container.style.transform = 'translateY(10px)';

  setTimeout(() => {
    container.innerHTML = section.html();
    section.init();
    container.style.transition = 'opacity 0.3s, transform 0.3s';
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 100);

  setTimeout(() => loadBar.classList.add('hidden'), 400);
  currentSection = sectionId;
}

// Theme Toggle
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const isDark = document.body.classList.contains('dark');
  sunIcon.style.display = isDark ? 'block' : 'none';
  moonIcon.style.display = isDark ? 'none' : 'block';

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    sunIcon.style.display = dark ? 'block' : 'none';
    moonIcon.style.display = dark ? 'none' : 'block';
    if (currentSection === 'dashboard') {
      const c = document.getElementById('dashboard-bar-chart');
      if (c) drawBarChart(c, SKILL_DEMAND);
    }
    if (currentSection === 'skill-trends') {
      const c = document.getElementById('trends-line-chart');
      if (c) {
        const sel = Array.from(document.querySelectorAll('.skill-select-btn.active')).map(b => b.dataset.skill);
        const allSkills = Object.keys(TREND_DATA);
        const ds = sel.map(sk => ({ label:sk, data:TREND_DATA[sk], color:TREND_COLORS[allSkills.indexOf(sk) % TREND_COLORS.length] }));
        drawLineChart(c, ds);
      }
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => loadSection(btn.dataset.section));
  });
  initTheme();
  loadSection('dashboard');
});

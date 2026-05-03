// ── Section Renderers ──
// Each function populates dynamic content after HTML template is loaded

function initDashboard() {
  const stats = [
    { label:'Active Listings', value:2847, sub:'+124 since yesterday', icon:'briefcase', color:'#8b5cf6', trend:true },
    { label:'Skills Tracked', value:183, sub:'Across all listings', icon:'sparkles', color:'#06b6d4' },
    { label:'Remote Positions', value:1204, sub:'42% of total listings', icon:'globe', color:'#22c55e', trend:true },
    { label:'Most In-Demand', value:'Python', sub:'Found in 68% of listings', icon:'flame', color:'#f59e0b', badge:'↑ 12% this week' }
  ];
  const grid = document.getElementById('dashboard-stats');
  if (!grid) return;
  grid.innerHTML = stats.map((s, i) => {
    const isNum = typeof s.value === 'number';
    return `<div class="stat-card" style="animation-delay:${i*100}ms">
      <div class="stat-card-top">
        <div class="stat-icon" style="color:${s.color}">
          ${getIcon(s.icon, 20)}
        </div>
        ${s.trend ? '<span class="trend-badge">↗ Trend</span>' : ''}
      </div>
      <div class="stat-value" ${isNum ? `data-countup="${s.value}"` : ''}>${isNum ? '0' : s.value}</div>
      <div class="stat-label">${s.label}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
        <span class="stat-sub">${s.sub}</span>
        ${s.badge ? `<span class="trend-badge">${s.badge}</span>` : ''}
      </div>
    </div>`;
  }).join('');
  // CountUp animation
  grid.querySelectorAll('[data-countup]').forEach(el => {
    const target = parseInt(el.dataset.countup);
    let start = performance.now();
    function step(ts) {
      const p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.floor(p * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
  // Recent jobs
  const list = document.getElementById('recent-jobs');
  if (list) {
    list.innerHTML = JOB_DATA.slice(0, 5).map(j => `
      <div class="recent-job">
        <div class="recent-job-avatar">${j.company[0]}</div>
        <div class="recent-job-info">
          <h4>${j.title}</h4>
          <p>${j.company} · ${j.location}</p>
        </div>
        <div class="recent-job-match">
          <span class="match-pct">${j.match}%</span>
          <span class="match-time">${j.posted} ago</span>
        </div>
      </div>`).join('');
  }
  // Bar chart
  const canvas = document.getElementById('dashboard-bar-chart');
  if (canvas) setTimeout(() => drawBarChart(canvas, SKILL_DEMAND), 100);
}

function initJobListings() {
  const searchEl = document.getElementById('job-search');
  const levelEl = document.getElementById('level-filter');
  const locEl = document.getElementById('location-filter');
  const clearBtn = document.getElementById('clear-filters');
  function render() {
    const s = (searchEl?.value || '').toLowerCase();
    const lv = levelEl?.value || 'All Levels';
    const loc = locEl?.value || 'All Locations';
    const filtered = JOB_DATA.filter(j => {
      const ms = j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s) || j.skills.some(sk => sk.toLowerCase().includes(s));
      const ml = lv === 'All Levels' || j.level === lv;
      const mlo = loc === 'All Locations' || (loc === 'Remote' ? j.location === 'Remote' : j.location !== 'Remote');
      return ms && ml && mlo;
    });
    document.getElementById('job-count').textContent = `Showing ${filtered.length} of ${JOB_DATA.length} listings`;
    clearBtn?.classList.toggle('hidden', !s && lv === 'All Levels' && loc === 'All Locations');
    const grid = document.getElementById('job-grid');
    grid.innerHTML = filtered.map((j, i) => {
      const badgeClass = j.level === 'Senior' ? 'badge-senior' : j.level === 'Mid' ? 'badge-mid' : 'badge-junior';
      const matchColor = j.match > 80 ? '#10b981' : j.match > 60 ? '#f59e0b' : '#ef4444';
      return `<div class="job-card" style="animation-delay:${i*50}ms" data-job-id="${j.id}">
        <div class="job-card-body">
          <div class="job-header">
            <div class="job-avatar">${j.company[0]}</div>
            <div><div class="job-title">${j.title}</div><div class="job-meta">${j.company} · ${j.location}</div></div>
          </div>
          <div class="job-badges">
            <span class="badge ${badgeClass}">${j.level}</span>
            <span class="badge badge-source">via ${j.source}</span>
          </div>
          <div class="job-badges">
            ${j.skills.slice(0,3).map(sk => `<span class="skill-tag">${sk}</span>`).join('')}
            ${j.skills.length > 3 ? `<span class="skill-tags-extra">+${j.skills.length-3}</span>` : ''}
          </div>
        </div>
        <div class="job-card-match">
          <canvas class="donut" data-pct="${j.match}" data-color="${matchColor}" width="50" height="50"></canvas>
          <span>Match</span>
        </div>
      </div>`;
    }).join('');
    // Draw donuts
    grid.querySelectorAll('.donut').forEach(c => {
      drawDonutChart(c, parseInt(c.dataset.pct), 50, 5, c.dataset.color);
    });
    // Click handlers
    grid.querySelectorAll('.job-card').forEach(card => {
      card.addEventListener('click', () => openJobPanel(parseInt(card.dataset.jobId)));
    });
  }
  searchEl?.addEventListener('input', render);
  levelEl?.addEventListener('change', render);
  locEl?.addEventListener('change', render);
  clearBtn?.addEventListener('click', () => {
    searchEl.value = ''; levelEl.value = 'All Levels'; locEl.value = 'All Locations'; render();
  });
  render();
}

function openJobPanel(id) {
  const job = JOB_DATA.find(j => j.id === id);
  if (!job) return;
  const userSkills = ['Python','SQL','React','Git'];
  const panel = document.getElementById('job-panel');
  const overlay = document.getElementById('job-panel-overlay');
  const content = document.getElementById('job-panel-content');
  content.innerHTML = `
    <button class="panel-close" id="panel-close-btn">✕</button>
    <div class="panel-header">
      <div class="panel-avatar">${job.company[0]}</div>
      <div>
        <div class="panel-title">${job.title}</div>
        <div class="panel-meta">${job.company} · ${job.location}</div>
        <span class="panel-source-badge">via ${job.source}</span>
      </div>
    </div>
    <div class="panel-match-card">
      <div><h3 style="font-weight:700;font-size:18px">Match Analytics</h3><p style="font-size:14px;color:var(--text-secondary)">Based on your shared skills</p></div>
      <canvas id="panel-donut" width="80" height="80"></canvas>
    </div>
    <h3 style="font-weight:700;font-size:18px;margin-bottom:16px">Required Skills</h3>
    <div class="panel-skills-grid">
      ${job.skills.map(sk => {
        const has = userSkills.includes(sk);
        return `<div class="panel-skill-item"><div class="panel-skill-dot ${has?'has':'miss'}">${has?'✓':'×'}</div><span style="font-size:14px;font-weight:500">${sk}</span></div>`;
      }).join('')}
    </div>
    <h3 style="font-weight:700;font-size:18px;margin-bottom:12px">Job Description</h3>
    <p class="panel-desc">We are looking for a highly motivated ${job.title} to join our team at ${job.company}. You will be responsible for building scalable systems and working closely with cross-functional teams to deliver high-quality products. The ideal candidate has experience with ${job.skills[0]} and ${job.skills[1]}.</p>
    <div class="panel-actions">
      <button class="btn-primary">Apply on ${job.source}</button>
      <button class="btn-outline">Save</button>
    </div>`;
  panel.classList.remove('hidden');
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => panel.classList.add('open'));
  drawDonutChart(document.getElementById('panel-donut'), job.match, 80, 8, '#7c3aed');
  const close = () => {
    panel.classList.remove('open');
    setTimeout(() => { panel.classList.add('hidden'); overlay.classList.add('hidden'); }, 350);
  };
  document.getElementById('panel-close-btn').addEventListener('click', close);
  overlay.addEventListener('click', close);
}

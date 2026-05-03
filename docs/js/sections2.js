// ── Section Renderers Part 2 ──

function initGapAnalyzer() {
  let currentSkills = ['Python','SQL','React','Git'];
  let targetRole = 'Machine Learning Engineer';
  let experience = 'Mid';
  const tagsEl = document.getElementById('skill-tags');
  const inputEl = document.getElementById('skill-input');
  const roleEl = document.getElementById('target-role');
  const analyzeBtn = document.getElementById('analyze-btn');
  const resultsEl = document.getElementById('gap-results');

  // Populate roles
  if (roleEl) {
    roleEl.innerHTML = Object.keys(ROLE_TEMPLATES).map(r => `<option value="${r}" ${r===targetRole?'selected':''}>${r}</option>`).join('');
    roleEl.addEventListener('change', () => { targetRole = roleEl.value; });
  }

  function renderTags() {
    if (!tagsEl) return;
    tagsEl.innerHTML = currentSkills.map(s => `<span class="skill-tag-item">${s}<button class="skill-tag-remove" data-skill="${s}">×</button></span>`).join('');
    tagsEl.querySelectorAll('.skill-tag-remove').forEach(btn => {
      btn.addEventListener('click', () => { currentSkills = currentSkills.filter(s => s !== btn.dataset.skill); renderTags(); });
    });
  }
  renderTags();

  inputEl?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputEl.value.trim().replace(',','');
      if (val && !currentSkills.includes(val)) { currentSkills.push(val); renderTags(); }
      inputEl.value = '';
    }
  });

  // Level buttons
  document.querySelectorAll('#level-buttons .lvl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#level-buttons .lvl-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      experience = btn.dataset.level;
    });
  });

  analyzeBtn?.addEventListener('click', () => {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="animate-spin" style="display:inline-block">⟳</span> Analyzing 183 skills...';
    setTimeout(() => {
      const required = ROLE_TEMPLATES[targetRole] || [];
      const missing = required.filter(s => !currentSkills.includes(s));
      const score = Math.round(((required.length - missing.length) / required.length) * 100);
      const radarData = required.slice(0,5).map(s => ({ label:s, value:currentSkills.includes(s)?100:20 }));
      const roadmap = [
        { phase:'Foundation', weeks:'1-3', skills:missing.slice(0,2), resource:'Start with official docs + freeCodeCamp', color:'#8b5cf6' },
        { phase:'Core Skills', weeks:'4-9', skills:missing.slice(2,5), resource:'Udemy / Coursera project-based courses', color:'#06b6d4' },
        { phase:'Advanced', weeks:'10-16', skills:missing.slice(5), resource:'Build 2 portfolio projects', color:'#22c55e' }
      ];

      resultsEl.innerHTML = `
        <div class="gap-stats-row">
          <div class="gap-stat"><p class="label">Skills You Have</p><p class="value green">${currentSkills.length}</p></div>
          <div class="gap-stat"><p class="label">Skills Missing</p><p class="value red">${missing.length}</p></div>
          <div class="gap-stat"><p class="label">Match Score</p><p class="value purple">${score}%</p></div>
        </div>
        <div class="card">
          <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px">Skills to Learn <span style="font-size:12px;background:rgba(239,68,68,.1);color:#ef4444;padding:2px 8px;border-radius:99px">${missing.length}</span></h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${missing.slice(0,5).map(sk => {
              const d = SKILL_DEMAND.find(x => x.name === sk) || { percentage:20, demand:'LOW', weeks:4 };
              return `<div class="skill-learn-item">
                <div class="info"><div class="info-top"><span>${sk}</span><span class="demand-badge ${d.demand==='HIGH'?'high':'medium'}">${d.demand}</span></div>
                <div class="progress-bar"><div class="progress-fill" style="width:${d.percentage}%"></div></div></div>
                <div class="skill-learn-weeks"><p>~${d.weeks} weeks</p><p>to learn</p></div>
              </div>`;
            }).join('')}
          </div>
        </div>
        <div class="card">
          <h3 style="font-size:18px;font-weight:700;margin-bottom:24px">Your Personalized Roadmap</h3>
          <div class="roadmap">
            ${roadmap.map((ph,i) => `<div class="roadmap-phase">
              <div class="roadmap-dot" style="background:${ph.color}">${i+1}</div>
              <div class="roadmap-content">
                <div class="roadmap-content-top"><h4>${ph.phase}</h4><span>${ph.weeks} weeks</span></div>
                <div class="roadmap-skills">${ph.skills.map(s=>`<span class="roadmap-skill">${s}</span>`).join('')}</div>
                <p class="roadmap-resource"><strong>Resources:</strong> ${ph.resource}</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
        <div class="card" style="display:flex;flex-direction:column;align-items:center">
          <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;width:100%">Role Fit Summary</h3>
          <canvas id="gap-radar" width="280" height="280"></canvas>
          <p style="font-size:14px;color:var(--text-secondary);margin-top:16px;text-align:center">
            You're <strong style="color:var(--accent-primary)">${score}%</strong> ready for ${targetRole}. Focus on <strong>${missing[0] || 'practice'}</strong> first.
          </p>
        </div>`;
      setTimeout(() => drawRadarChart(document.getElementById('gap-radar'), radarData), 100);
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = 'Analyze My Gap <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    }, 1200);
  });
}

function initSkillTrends() {
  let selectedSkills = ['Python','JavaScript','SQL','React'];
  const allSkills = Object.keys(TREND_DATA);
  const selectorEl = document.getElementById('skill-selector');
  const cardsEl = document.getElementById('skill-detail-cards');

  function getColor(sk) { return TREND_COLORS[allSkills.indexOf(sk) % TREND_COLORS.length]; }

  function render() {
    // Skill selector buttons
    if (selectorEl) {
      selectorEl.innerHTML = allSkills.map(sk => `<button class="skill-select-btn ${selectedSkills.includes(sk)?'active':''}" data-skill="${sk}">${sk}</button>`).join('');
      selectorEl.querySelectorAll('.skill-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sk = btn.dataset.skill;
          if (selectedSkills.includes(sk)) { if (selectedSkills.length > 1) selectedSkills = selectedSkills.filter(s=>s!==sk); }
          else if (selectedSkills.length < 4) selectedSkills.push(sk);
          render();
        });
      });
    }
    // Line chart
    const canvas = document.getElementById('trends-line-chart');
    if (canvas) {
      const datasets = selectedSkills.map(sk => ({ label:sk, data:TREND_DATA[sk], color:getColor(sk) }));
      setTimeout(() => drawLineChart(canvas, datasets), 50);
    }
    // Detail cards
    if (cardsEl) {
      cardsEl.innerHTML = selectedSkills.map((sk,i) => {
        const data = TREND_DATA[sk];
        const cur = data[data.length-1], prev = data[data.length-2];
        const change = (((cur-prev)/prev)*100).toFixed(1);
        const color = getColor(sk);
        const positive = Number(change) >= 0;
        return `<div class="skill-detail-card" style="animation-delay:${i*100}ms">
          <div class="skill-detail-header"><span class="skill-color-dot" style="background:${color}"></span><h4>${sk}</h4></div>
          <div><span class="skill-detail-score">${cur}</span><span class="skill-detail-label">Demand Score</span></div>
          <div class="skill-detail-change">
            <span class="${positive?'change-positive':'change-negative'}">${positive?'▲':'▼'} ${change}% ${positive?'↑':'↓'}</span>
            <span class="wow-label">WoW Change</span>
          </div>
          <div class="hiring-companies">
            <div class="hiring-label"><span>Top Hiring Companies</span><span>⊞</span></div>
            <div class="company-tags">${['Google','Microsoft','NVIDIA'].map(c=>`<span class="company-tag">${c}</span>`).join('')}</div>
          </div>
        </div>`;
      }).join('');
    }
  }
  render();

  // Time range buttons
  document.querySelectorAll('#time-range-btns .btn-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#time-range-btns .btn-sm').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });
}

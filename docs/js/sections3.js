// ── Section Renderers Part 3: App Tracker, Job Alerts, Tech News ──

function initAppTracker() {
  let columns = {
    'applied': [
      { id:'1', title:'AI Engineer', company:'Sarvam AI', location:'Bangalore', date:'Jan 28', level:'Mid' },
      { id:'2', title:'ML Research Intern', company:'Google', location:'Noida', date:'Jan 25', level:'Intern' },
      { id:'3', title:'Backend Engineer', company:'Atlassian', location:'Remote', date:'Jan 22', level:'Mid' },
    ],
    'interview': [
      { id:'4', title:'Frontend Developer', company:'Razorpay', location:'Remote', date:'Jan 15', level:'Junior', notes:'Round 2 scheduled Feb 5' },
      { id:'5', title:'Data Scientist', company:'PhonePe', location:'Bangalore', date:'Jan 10', level:'Mid' },
    ],
    'offer': [
      { id:'6', title:'Full Stack Developer', company:'Flipkart', location:'Bangalore', date:'Dec 20', level:'Mid', notes:'Offer: ₹18 LPA' },
    ]
  };
  let draggedItem = null;
  const colMeta = { 'applied':{label:'Applied',color:'#3b82f6'}, 'interview':{label:'Interview',color:'#f59e0b'}, 'offer':{label:'Offer',color:'#22c55e'} };

  function render() {
    const board = document.getElementById('kanban-board');
    if (!board) return;
    board.innerHTML = Object.entries(colMeta).map(([id, meta]) => `
      <div class="kanban-column" data-col="${id}">
        <div class="kanban-header">
          <div class="kanban-header-left">
            <span class="kanban-dot" style="background:${meta.color}"></span>
            <span class="kanban-title">${meta.label}</span>
            <span class="kanban-count">${columns[id].length}</span>
          </div>
          <button class="kanban-add">+</button>
        </div>
        <div class="kanban-cards" data-col="${id}">
          ${columns[id].length ? columns[id].map(card => `
            <div class="kanban-card" draggable="true" data-card-id="${card.id}" data-from-col="${id}">
              <div class="kanban-card-top">
                <div class="kanban-card-info">
                  <div class="kanban-avatar">${card.company[0]}</div>
                  <div><div class="kanban-company">${card.company}</div><div class="kanban-card-title">${card.title}</div></div>
                </div>
                <div class="kanban-actions">
                  <button class="kanban-delete" data-del-id="${card.id}" data-del-col="${id}">🗑</button>
                  <span style="color:var(--text-muted)">⋮⋮</span>
                </div>
              </div>
              <div class="kanban-card-meta">
                <span class="kanban-meta-item">📍 ${card.location}</span>
                <span class="kanban-meta-item">📅 ${card.date}</span>
              </div>
              ${card.notes ? `<div class="kanban-note">"${card.notes}"</div>` : ''}
            </div>`).join('') : '<div class="kanban-empty"><p>Drop cards here</p></div>'}
        </div>
      </div>`).join('');

    // Drag and drop
    board.querySelectorAll('.kanban-card[draggable]').forEach(card => {
      card.addEventListener('dragstart', () => { draggedItem = { id:card.dataset.cardId, fromCol:card.dataset.fromCol }; });
    });
    board.querySelectorAll('.kanban-cards').forEach(zone => {
      zone.addEventListener('dragover', e => e.preventDefault());
      zone.addEventListener('drop', () => {
        if (!draggedItem) return;
        const toCol = zone.dataset.col;
        if (draggedItem.fromCol === toCol) return;
        const src = columns[draggedItem.fromCol];
        const idx = src.findIndex(c => c.id === draggedItem.id);
        const [item] = src.splice(idx, 1);
        columns[toCol].push(item);
        draggedItem = null;
        render();
      });
    });
    // Delete
    board.querySelectorAll('.kanban-delete').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        columns[btn.dataset.delCol] = columns[btn.dataset.delCol].filter(c => c.id !== btn.dataset.delId);
        render();
      });
    });
  }
  render();
}

function initJobAlerts() {
  let alerts = [
    { id:1, name:'Python Jobs Remote', skills:['Python'], location:'Remote', level:['Mid','Senior'], matches:5, active:true },
    { id:2, name:'ML Internships', skills:['Machine Learning'], location:'Any', level:['Intern'], matches:2, active:true },
  ];
  const notifications = [
    { id:1, type:'info', message:'12 new Python jobs in Bangalore posted in the last 24h', time:'2h ago', unread:true },
    { id:2, type:'info', message:'Google posted 3 ML Intern roles matching your alert', time:'5h ago', unread:true },
    { id:3, type:'success', message:'Your match score for Sarvam AI NLP Engineer is 91%', time:'8h ago', unread:false },
    { id:4, type:'warning', message:'Skill Trend Alert: TypeScript demand up 8% this week', time:'1d ago', unread:false },
    { id:5, type:'error', message:'Reminder: Razorpay interview tomorrow at 2 PM', time:'1d ago', unread:false },
  ];
  const iconMap = { info:'ℹ', success:'✓', warning:'⚠', error:'🔔' };

  function render() {
    const countEl = document.getElementById('alert-count');
    if (countEl) countEl.textContent = alerts.length;
    const listEl = document.getElementById('alerts-list');
    if (listEl) {
      listEl.innerHTML = alerts.map(a => `
        <div class="alert-card">
          <div class="alert-card-top">
            <div class="alert-card-name"><span class="alert-dot" style="background:${a.active?'#22c55e':'var(--text-muted)'}"></span><h4>${a.name}</h4></div>
            <button class="toggle-switch ${a.active?'on':''}" data-toggle-id="${a.id}"><span class="toggle-knob"></span></button>
          </div>
          <div class="alert-tags"><span class="alert-tag">${a.skills[0]}</span><span class="alert-tag">${a.location}</span></div>
          <div class="alert-footer"><span class="alert-matches">${a.matches} new matches today</span><button class="alert-delete" data-alert-id="${a.id}">🗑</button></div>
        </div>`).join('');
      listEl.querySelectorAll('.toggle-switch').forEach(btn => {
        btn.addEventListener('click', () => { alerts = alerts.map(a => a.id === parseInt(btn.dataset.toggleId) ? {...a, active:!a.active} : a); render(); });
      });
      listEl.querySelectorAll('.alert-delete').forEach(btn => {
        btn.addEventListener('click', () => { alerts = alerts.filter(a => a.id !== parseInt(btn.dataset.alertId)); render(); });
      });
    }
    // Notifications
    const notifEl = document.getElementById('notifications-list');
    if (notifEl) {
      notifEl.innerHTML = notifications.map(n => `
        <div class="notif-item ${n.unread?'unread':''}">
          <div class="notif-icon ${n.type}">${iconMap[n.type]}</div>
          <div class="notif-body"><p>${n.message}</p><div class="notif-time">🕒 ${n.time}</div></div>
        </div>`).join('');
    }
  }
  render();
  // Frequency buttons
  document.querySelectorAll('#freq-buttons .lvl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#freq-buttons .lvl-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function initTechNews() {
  let category = 'All';
  let loading = true;
  const categories = ['All','AI','Web Dev','Cloud','Mobile','DevTools','Hardware','Languages'];
  const catEl = document.getElementById('news-categories');
  const gridEl = document.getElementById('news-grid');
  const trendEl = document.getElementById('trending-topics');
  const refreshBtn = document.getElementById('refresh-news-btn');

  function renderCategories() {
    if (!catEl) return;
    catEl.innerHTML = categories.map(c => `<button class="category-pill ${category===c?'active':''}" data-cat="${c}">${c}</button>`).join('');
    catEl.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => { category = btn.dataset.cat; renderCategories(); renderNews(); });
    });
  }

  function renderNews() {
    if (!gridEl) return;
    if (loading) {
      gridEl.innerHTML = Array.from({length:8}).map(() => `<div class="skeleton-card"><div class="skeleton" style="width:33%;height:20px;margin-bottom:16px"></div><div style="display:flex;flex-direction:column;gap:8px"><div class="skeleton" style="width:100%;height:16px"></div><div class="skeleton" style="width:100%;height:16px"></div><div class="skeleton" style="width:66%;height:16px"></div></div><div class="skeleton" style="width:25%;height:12px;margin-top:16px"></div></div>`).join('');
      return;
    }
    const filtered = FALLBACK_NEWS.filter(n => category === 'All' || n.category === category);
    gridEl.innerHTML = filtered.map((a,i) => `
      <div class="news-card" style="animation-delay:${i*50}ms">
        <div>
          <div class="news-top"><span class="news-category">${a.category}</span><span class="news-time">🕒 ${a.time}</span></div>
          <h3 class="news-title">${a.title}</h3>
          <p class="news-desc">${a.description}</p>
        </div>
        <div class="news-footer">
          <div class="news-source"><div class="news-source-icon">${a.source[0]}</div><span>${a.source}</span></div>
          <button class="news-read-more">Read More →</button>
        </div>
      </div>`).join('');
  }

  function renderTrending() {
    if (!trendEl) return;
    const topics = [
      { tag:'#GenerativeAI', value:8400, color:'bg-violet-500', hex:'#8b5cf6' },
      { tag:'#LLMOps', value:5100, color:'bg-cyan-500', hex:'#06b6d4' },
      { tag:'#RustLang', value:3700, color:'bg-green-500', hex:'#22c55e' },
      { tag:'#CloudNative', value:2900, color:'bg-blue-500', hex:'#3b82f6' },
      { tag:'#WebAssembly', value:1800, color:'bg-amber-500', hex:'#f59e0b' },
    ];
    trendEl.innerHTML = topics.map((t,i) => `
      <div class="trending-item">
        <div class="trending-top"><div><span class="trending-rank">0${i+1}</span><span class="trending-tag">${t.tag}</span></div><span class="trending-mentions">${(t.value/1000).toFixed(1)}k mentions</span></div>
        <div class="trending-bar"><div class="trending-fill" style="background:${t.hex};width:${(t.value/9000)*100}%"></div></div>
      </div>`).join('');
  }

  renderCategories();
  renderNews();
  renderTrending();

  // Simulate loading
  setTimeout(() => { loading = false; renderNews(); }, 1500);
  refreshBtn?.addEventListener('click', () => {
    loading = true; renderNews();
    const icon = document.getElementById('refresh-icon');
    icon?.classList.add('animate-spin');
    setTimeout(() => { loading = false; renderNews(); icon?.classList.remove('animate-spin'); }, 800);
  });
}

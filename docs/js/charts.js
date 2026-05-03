// ── Canvas Chart Utilities ──

function drawBarChart(canvas, data) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const startTime = performance.now();

  function render(time) {
    const progress = Math.min((time - startTime) / 700, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    ctx.clearRect(0, 0, w, h);
    const bs = getComputedStyle(document.documentElement);
    ctx.strokeStyle = bs.getPropertyValue('--border-default');
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
      const y = h - 40 - (i * (h - 60) / 5);
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 20, y); ctx.stroke();
      ctx.fillStyle = bs.getPropertyValue('--text-muted');
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText(i * 20 + '%', 5, y + 3);
    }
    const bw = (w - 60) / data.length;
    data.forEach((item, i) => {
      const x = 45 + i * bw;
      const th = (item.percentage / 100) * (h - 60);
      const ch = th * ease;
      const y = h - 40 - ch;
      ctx.fillStyle = item.color;
      ctx.beginPath(); ctx.roundRect(x + 5, y, bw - 10, ch, [4, 4, 0, 0]); ctx.fill();
      ctx.save();
      ctx.translate(x + bw / 2, h - 20);
      ctx.rotate(-Math.PI / 6);
      ctx.fillStyle = bs.getPropertyValue('--text-secondary');
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(item.name, 0, 0);
      ctx.restore();
    });
    if (progress < 1) requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function drawDonutChart(canvas, percentage, size, strokeWidth, color) {
  size = size || 60; strokeWidth = strokeWidth || 6; color = color || '#7c3aed';
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr; canvas.height = size * dpr;
  canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);
  const startTime = performance.now();

  function render(time) {
    const progress = Math.min((time - startTime) / 1000, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const cp = percentage * ease;
    const center = size / 2, radius = (size - strokeWidth) / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-default');
    ctx.lineWidth = strokeWidth; ctx.stroke();
    ctx.beginPath(); ctx.arc(center, center, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * cp / 100);
    ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.stroke();
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    ctx.font = 'bold ' + Math.floor(size / 4) + 'px Inter, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(cp) + '%', center, center);
    if (progress < 1) requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function drawLineChart(canvas, datasets) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const pad = { top: 20, right: 20, bottom: 40, left: 40 };
  const cw = w - pad.left - pad.right, ch = h - pad.top - pad.bottom;
  const startTime = performance.now();

  function render(time) {
    const progress = Math.min((time - startTime) / 800, 1);
    ctx.clearRect(0, 0, w, h);
    const bs = getComputedStyle(document.documentElement);
    ctx.strokeStyle = bs.getPropertyValue('--border-default');
    ctx.setLineDash([5, 5]);
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + ch - (i * ch / 5);
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    }
    ctx.setLineDash([]);
    datasets.forEach(ds => {
      const pts = ds.data, xStep = cw / (pts.length - 1);
      ctx.beginPath(); ctx.moveTo(pad.left, pad.top + ch);
      for (let i = 0; i < pts.length; i++) {
        ctx.lineTo(pad.left + i * xStep, pad.top + ch - (pts[i] / 100 * ch));
      }
      ctx.lineTo(pad.left + cw, pad.top + ch);
      ctx.fillStyle = ds.color + '1a'; ctx.fill();
      ctx.beginPath(); ctx.strokeStyle = ds.color; ctx.lineWidth = 2.5;
      const vc = Math.floor(pts.length * progress);
      for (let i = 0; i < pts.length; i++) {
        const x = pad.left + i * xStep, y = pad.top + ch - (pts[i] / 100 * ch);
        if (i === 0) ctx.moveTo(x, y);
        else if (i <= vc) ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    if (progress < 1) requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function drawRadarChart(canvas, data, size) {
  size = size || 280;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr; canvas.height = size * dpr;
  canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);
  const center = size / 2, radius = size / 2 - 40;
  const sides = data.length, angleStep = (Math.PI * 2) / sides;
  ctx.clearRect(0, 0, size, size);
  const bs = getComputedStyle(document.documentElement);
  ctx.strokeStyle = bs.getPropertyValue('--border-default'); ctx.lineWidth = 1;
  for (let lvl = 1; lvl <= 5; lvl++) {
    ctx.beginPath();
    const cr = (radius / 5) * lvl;
    for (let i = 0; i < sides; i++) {
      const a = i * angleStep - Math.PI / 2;
      const x = center + cr * Math.cos(a), y = center + cr * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath(); ctx.stroke();
  }
  for (let i = 0; i < sides; i++) {
    const a = i * angleStep - Math.PI / 2;
    const x = center + radius * Math.cos(a), y = center + radius * Math.sin(a);
    ctx.beginPath(); ctx.moveTo(center, center); ctx.lineTo(x, y); ctx.stroke();
    ctx.fillStyle = bs.getPropertyValue('--text-secondary');
    ctx.font = '10px Inter, sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(data[i].label, center + (radius + 18) * Math.cos(a), center + (radius + 18) * Math.sin(a));
  }
  ctx.beginPath(); ctx.fillStyle = 'rgba(124,58,237,0.4)'; ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
  for (let i = 0; i < sides; i++) {
    const a = i * angleStep - Math.PI / 2;
    const cr = (data[i].value / 100) * radius;
    const x = center + cr * Math.cos(a), y = center + cr * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath(); ctx.fill(); ctx.stroke();
}

(() => {
  'use strict';

  // Initial research scaffold: a deterministic grid and trail loop, not a claim of parity.
  const cols = 32, rows = 48;
  const canvas = document.querySelector('#board');
  const ctx = canvas.getContext('2d');
  const areaLabel = document.querySelector('#area');
  const cells = new Uint8Array(cols * rows); // 0 neutral, 1 player territory
  const trail = [];
  let player = { x: 15, y: 24 }, direction = { x: 1, y: 0 }, running = false;
  let lastStep = 0;

  const index = (x, y) => y * cols + x;
  for (let y = 20; y < 29; y++) for (let x = 10; x < 19; x++) cells[index(x, y)] = 1;

  function resize() {
    const width = canvas.clientWidth;
    const height = Math.round(width * rows / cols);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(canvas.width / cols, 0, 0, canvas.height / rows, 0, 0);
    draw();
  }
  function draw() {
    ctx.fillStyle = '#252d36'; ctx.fillRect(0, 0, cols, rows);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (cells[index(x,y)]) {
      ctx.fillStyle = '#3db9ef'; ctx.fillRect(x, y, 1, 1);
    }
    ctx.strokeStyle = '#ffffff10'; ctx.lineWidth = .025;
    for (let x = 0; x <= cols; x++) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,rows); ctx.stroke(); }
    for (let y = 0; y <= rows; y++) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(cols,y); ctx.stroke(); }
    if (trail.length) {
      ctx.fillStyle = '#5de4ff'; for (const p of trail) ctx.fillRect(p.x, p.y, 1, 1);
    }
    ctx.fillStyle = '#f3fbff'; ctx.fillRect(player.x + .12, player.y + .12, .76, .76);
    const owned = cells.reduce((n, v) => n + (v === 1), 0);
    areaLabel.textContent = `${Math.floor(owned * 100 / cells.length)}%`;
  }
  function closeTrail() {
    // Placeholder flood-fill rule: fill enclosed neutral cells from trail boundary.
    for (const p of trail) cells[index(p.x,p.y)] = 1;
    const seen = new Uint8Array(cells.length), queue = [];
    for (let x = 0; x < cols; x++) { queue.push([x,0],[x,rows-1]); }
    for (let y = 1; y < rows-1; y++) { queue.push([0,y],[cols-1,y]); }
    while (queue.length) {
      const [x,y] = queue.pop(), i = index(x,y);
      if (x < 0 || y < 0 || x >= cols || y >= rows || seen[i] || cells[i]) continue;
      seen[i] = 1; queue.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }
    for (let i=0;i<cells.length;i++) if (!seen[i]) cells[i] = 1;
    trail.length = 0;
  }
  function step() {
    player.x += direction.x; player.y += direction.y;
    if (player.x < 0 || player.y < 0 || player.x >= cols || player.y >= rows) {
      player.x = 15; player.y = 24; trail.length = 0; running = false;
    } else if (!cells[index(player.x,player.y)]) {
      if (!running) running = true;
      trail.push({ ...player });
    } else if (running) { closeTrail(); running = false; }
    draw();
  }
  function frame(time) {
    if (time - lastStep > 115) { step(); lastStep = time; }
    requestAnimationFrame(frame);
  }
  function steer(dx,dy) { if (dx !== -direction.x || dy !== -direction.y) direction = {x:dx,y:dy}; }
  addEventListener('keydown', e => {
    const map = {ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};
    if (map[e.key]) { e.preventDefault(); steer(...map[e.key]); }
  });
  let touch;
  canvas.addEventListener('touchstart', e => { touch = [e.touches[0].clientX,e.touches[0].clientY]; }, {passive:true});
  canvas.addEventListener('touchend', e => {
    if (!touch) return;
    const dx=e.changedTouches[0].clientX-touch[0], dy=e.changedTouches[0].clientY-touch[1];
    if (Math.max(Math.abs(dx),Math.abs(dy)) > 15) steer(Math.abs(dx)>Math.abs(dy)?Math.sign(dx):0, Math.abs(dx)>Math.abs(dy)?0:Math.sign(dy));
    touch=null;
  }, {passive:true});
  addEventListener('resize', resize);
  resize(); requestAnimationFrame(frame);
})();

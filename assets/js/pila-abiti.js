/* Pila degli abiti: l'apertura di "047R" di UberDesigner portata in JS puro.
   Cinque foto a tutta altezza si aprono dalla linea centrale, una dopo l'altra dal fondo della pila, con i margini a gradini.
   Sulla foto in cima il nome dell'abito si scrive parola per parola (la riga sopra sale, quella sotto scende);
   dopo 3 secondi le parole tornano giù e la foto in fondo si apre sopra come abito successivo.
   Un'unica molla (massa 1, rigidità 170, smorzamento 21) campionata in linear() muove tutto, a quattro tempi.
   Le foto restano intere: la pila sta in una cornice 4:5 come le foto, così niente viene tagliato. */
(function () {
  const radice = document.getElementById('pila');
  if (!radice || !window.GRAZIELLA) return;
  const G = window.GRAZIELLA;
  const SCELTI = JSON.parse(radice.dataset.abiti);
  const storie = SCELTI.map(id => G.abiti.find(a => a.id === id)).filter(Boolean);
  const LEVELS = storie.length;
  const linea = id => (G.linee.find(l => l.id === id) || {}).nome || '';
  const ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- La molla di 047R, campionata in 49 punti ---- */
  const SPRING = { mass: 1, stiffness: 170, damping: 21 };
  const DURATION = { frame: 1400, text: 1000, control: 700 };
  const EXIT = 0.6, STAGGER = { frame: 160, word: 45 }, MAX_SPREAD = 700;
  const TIMING = { openingDelay: 400, dwell: 3000, settle: 0.7 };
  const STEP = 1 / 240;
  const sim = (function () {
    const p = [0]; let x = 0, v = 0, t = 0;
    while (t < 5) {
      const a = (SPRING.stiffness * (1 - x) - SPRING.damping * v) / SPRING.mass;
      v += a * STEP; x += v * STEP; t += STEP; p.push(x);
      if (Math.abs(1 - x) < .001 && Math.abs(v) < .01) break;
    }
    p[p.length - 1] = 1; return { p, settle: t };
  })();
  const linear = `linear(${Array.from({ length: 49 }, (_, i) => +sim.p[Math.round(i / 48 * (sim.p.length - 1))].toFixed(4)).join(', ')})`;
  const ease = CSS.supports('transition-timing-function', 'linear(0, 1)') ? linear : 'cubic-bezier(0.2, 0.9, 0.25, 1)';
  const dur = k => ridotto ? 1 : DURATION[k];
  const stag = k => ridotto ? 0 : STAGGER[k];
  radice.style.setProperty('--pl-ease', ease);
  radice.style.setProperty('--pl-frame', dur('frame') + 'ms');
  radice.style.setProperty('--pl-text', dur('text') + 'ms');
  radice.style.setProperty('--pl-exit', EXIT);
  radice.style.setProperty('--pl-dwell', TIMING.dwell + 'ms');
  const wordStagger = n => n <= 1 ? stag('word') : Math.min(stag('word'), MAX_SPREAD / (n - 1));
  const cascade = (n, exit) => (Math.max(0, n - 1) * wordStagger(n) + dur('text')) * (exit ? EXIT : 1);
  const parole = s => s.split(/\s+/).filter(Boolean).length;

  /* Titolo su due righe "editoriali": la prima parola sopra, il resto sotto */
  const titolo = a => { const w = a.nome.split(' '); return w.length > 1 ? w[0] + '\n' + w.slice(1).join(' ') : a.nome; };
  const didascalia = a => { const l = linea(a.linea); return (l && l !== a.nome ? l + ' · ' : '') + 'su misura'; };
  const durataStoria = (a, exit) => Math.max(cascade(parole(titolo(a)), exit), (exit ? 0 : stag('frame')) + cascade(Math.max(parole(didascalia(a)), parole(a.nota)), exit));

  /* ---- Parole che escono da sotto la loro riga (RevealText) ---- */
  function rivela(el, testo, split, ritardo) {
    const righe = testo.split('\n').map(r => r.split(/\s+/).filter(Boolean));
    const tot = righe.reduce((n, r) => n + r.length, 0);
    el.classList.add('pl-rev'); if (split) el.classList.add('pl-split');
    el.style.setProperty('--rev-delay', (ritardo || 0) + 'ms');
    el.style.setProperty('--rev-stagger', wordStagger(tot) + 'ms');
    let i = -1;
    el.innerHTML = `<span class="sr-only">${righe.map(r => r.join(' ')).join(' ')}</span><span aria-hidden="true">${righe.map((r, ri) => (ri ? '<br>' : '') + r.map(w => { i++; return `<span class="pl-mask"><span class="pl-word" style="--i:${i}">${w}</span></span>`; }).join(' ')).join('')}</span>`;
    if (split) {
      const misura = () => {
        const maschere = [...el.querySelectorAll('.pl-mask')];
        const tops = maschere.map(m => m.offsetTop), file = [];
        tops.forEach(t => { if (!file.some(r => Math.abs(r - t) < 2)) file.push(t); });
        file.sort((a, b) => a - b);
        const visti = {};
        maschere.forEach((m, k) => {
          const r = file.findIndex(x => Math.abs(x - tops[k]) < 2);
          visti[r] = (visti[r] ?? -1) + 1;
          const w = m.firstElementChild;
          w.dataset.dir = file.length > 1 && r >= file.length / 2 ? 'down' : 'up';
          w.style.setProperty('--i', visti[r]);
        });
      };
      misura();
      if (document.fonts) document.fonts.ready.then(misura);
    }
  }

  /* ---- La pila ---- */
  const scatola = radice.querySelector('.pl-scatola');
  const pannelli = new Map(); /* key → elemento */

  function creaPannello(layer) {
    const a = storie[layer.story];
    const el = document.createElement('div');
    el.className = 'pl-pannello';
    el.innerHTML = `<img src="assets/abiti/${a.id}.jpg" alt="" decoding="async"><div class="pl-velo"></div>
      <div class="pl-storia"><p class="pl-cap label"></p><h2 class="pl-titolo"></h2><p class="pl-lead"></p></div>`;
    rivela(el.querySelector('.pl-cap'), didascalia(a), false, stag('frame'));
    rivela(el.querySelector('.pl-titolo'), titolo(a), true, 0);
    rivela(el.querySelector('.pl-lead'), a.nota, false, stag('frame'));
    el.style.setProperty('--inset', '50%');
    el.style.visibility = 'hidden';
    scatola.appendChild(el);
    pannelli.set(layer.key, el);
    if (layer.instant) { el.dataset.armed = '1'; el.style.visibility = ''; }
    else requestAnimationFrame(() => requestAnimationFrame(() => { el.dataset.armed = '1'; aggiorna(); }));
    return el;
  }

  const zFor = l => l.leaving ? LEVELS + 1 : l.sunk ? 0 : LEVELS - (l.level ?? 0);
  let layers = storie.map((_, i) => ({ key: i, story: i, level: i }));
  let nextKey = layers.length, apertura = true, testoKey = null, veloKey = null;

  function aggiorna() {
    const ora = performance.now();
    layers = layers.filter(l => !l.until || l.until > ora || (!l.leaving && !l.sunk));
    const vivi = new Set(layers.map(l => l.key));
    pannelli.forEach((el, k) => { if (!vivi.has(k)) { el.remove(); pannelli.delete(k); } });
    layers.forEach(l => {
      const el = pannelli.get(l.key) || creaPannello(l);
      const delay = apertura ? TIMING.openingDelay + (LEVELS - 1 - (l.level ?? 0)) * stag('frame') : 0;
      el.style.zIndex = zFor(l);
      el.style.transitionDelay = delay + 'ms';
      const armato = el.dataset.armed === '1';
      el.style.setProperty('--inset', armato && l.level !== null ? `var(--pl-inset-${l.level})` : '50%');
      clearTimeout(el._vis);
      if (l.level === null) el._vis = setTimeout(() => { el.style.visibility = 'hidden'; }, delay + dur('frame'));
      else if (armato) el._vis = setTimeout(() => { el.style.visibility = ''; }, delay);
      el.querySelector('.pl-velo').classList.toggle('is-on', veloKey === l.key);
      const storia = el.querySelector('.pl-storia');
      storia.hidden = !((l.leaving || (l.level ?? 0) <= 1) && !l.sunk);
      storia.classList.toggle('is-on', testoKey === l.key);
    });
  }

  const live = () => layers.filter(l => !l.leaving && !l.sunk).sort((a, b) => (a.level ?? LEVELS) - (b.level ?? LEVELS));
  function stepNext(key, until) {
    const s = live(), fondo = s[LEVELS - 1];
    return [{ key, story: fondo.story, level: 0 }, ...s.map(l => l === fondo ? { ...l, sunk: true, until } : { ...l, level: (l.level ?? 0) + 1 })];
  }
  function stepPrev(key, until) {
    const s = live(), cima = s[0];
    return [{ ...cima, leaving: true, level: null, until }, ...s.slice(1).map(l => ({ ...l, level: (l.level ?? 0) - 1 })), { key, story: cima.story, level: LEVELS - 1, instant: true }];
  }

  /* ---- Lineette in basso: la corrente si riempie in 3 secondi ---- */
  const SEQ = [0, ...Array.from({ length: LEVELS - 1 }, (_, i) => LEVELS - 1 - i)];
  const LARGHE = [32, 12, 6, 4, 2];
  const lineette = radice.querySelector('.pl-lineette');
  lineette.innerHTML = SEQ.map(s => `<span class="pl-dot" data-s="${s}"></span>`).join('');
  const dots = [...lineette.children];
  let fill = null;
  function disegnaLineette() {
    const cur = live()[0].story, pos = SEQ.indexOf(cur);
    dots.forEach((d, i) => {
      d.style.width = LARGHE[Math.min(LARGHE.length - 1, Math.abs(i - pos))] + 'px';
      const s = +d.dataset.s;
      let f = d.querySelector('.pl-fill');
      if (fill && fill.story === s) {
        if (!f || +f.dataset.key !== fill.key) { if (f) f.remove(); d.insertAdjacentHTML('beforeend', `<span class="pl-fill" data-key="${fill.key}"><span class="pl-progress"></span></span>`); f = d.lastElementChild; }
        f.dataset.phase = fill.phase;
      } else if (f && f.dataset.phase !== 'drain') f.remove();
    });
  }
  const etichetta = radice.querySelector('.pl-ora');
  function annuncia() { const a = storie[live()[0].story]; etichetta.textContent = `${a.nome}, ${didascalia(a)}`; }

  /* ---- La rotazione: ogni attesa si accorcia con un clic ---- */
  let richiesta = null, sveglia = null, attivo = true;
  const pausa = ms => new Promise(res => {
    if (richiesta) { res(); return; }
    const t = setTimeout(fatto, ms);
    function fatto() { clearTimeout(t); sveglia = null; res(); }
    sveglia = fatto;
  });
  const vai = d => { richiesta = d; if (sveglia) sveglia(); };

  async function presenta(l) {
    veloKey = l.key; aggiorna();
    await pausa(stag('frame'));
    testoKey = l.key; aggiorna(); annuncia();
    radice.classList.add('is-aperta');
    await pausa(durataStoria(storie[l.story]));
  }
  async function gira() {
    await pausa(TIMING.openingDelay + (LEVELS - 1) * stag('frame') + dur('frame') * TIMING.settle);
    for (;;) {
      const cima = live()[0];
      await presenta(cima);
      if (!richiesta) { fill = { key: cima.key, story: cima.story, phase: 'run' }; disegnaLineette(); await pausa(TIMING.dwell); }
      if (fill && fill.key === cima.key) fill.phase = 'hold'; else fill = null;
      disegnaLineette();
      while (!richiesta && !attivo) await pausa(250);
      const verso = richiesta || 'next'; richiesta = null;
      testoKey = null; aggiorna();
      await pausa(durataStoria(storie[cima.story], true) / 2);
      apertura = false; veloKey = null;
      const ora = performance.now(), until = ora + dur('frame');
      const fuori = layers.filter(l => (l.leaving || l.sunk) && (l.until || 0) > ora);
      layers = [...fuori, ...(verso === 'prev' ? stepPrev : stepNext)(nextKey++, until)];
      aggiorna();
      if (fill) fill.phase = 'drain';
      disegnaLineette();
      setTimeout(aggiorna, dur('frame') + 60);
      await pausa(dur('frame') * TIMING.settle);
    }
  }

  /* Ferma quando la pila non si vede o la scheda è nascosta */
  let inVista = false, partita = false;
  const sync = () => { attivo = inVista && !document.hidden; };
  /* L'apertura parte la prima volta che la pila si vede */
  new IntersectionObserver(([e]) => { inVista = e.isIntersecting; sync(); if (inVista && !partita) { partita = true; aggiorna(); gira(); } }, { threshold: .2 }).observe(scatola);
  document.addEventListener('visibilitychange', sync);

  /* Le cornici ai lati si sporgono verso il mouse (±80%), con la molla al tempo "control" */
  if (mouse && !ridotto) {
    const speed = sim.settle / (DURATION.control / 1000);
    let x = 0, v = 0, target = 0, raf = 0, last = 0;
    const tick = now => {
      const dt = last ? (now - last) / 1000 : 0; last = now;
      let rest = Math.min(dt, .064) * speed;
      while (rest > 0) { const h = Math.min(STEP, rest); const a = (SPRING.stiffness * (target - x) - SPRING.damping * v) / SPRING.mass; v += a * h; x += v * h; rest -= h; }
      const k = x / 100;
      scatola.style.setProperty('--sway-left', 1 + .8 * k);
      scatola.style.setProperty('--sway-right', 1 - .8 * k);
      if (Math.abs(target - x) < .25 && Math.abs(v) < .25) { raf = 0; last = 0; } else raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    scatola.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      const r = scatola.getBoundingClientRect(), px = (e.clientX - r.left) / r.width;
      scatola.dataset.zone = px < .25 ? 'prev' : px > .75 ? 'next' : 'open';
      target = (px * 2 - 1) * 100; kick();
    });
    scatola.addEventListener('pointerleave', () => { target = 0; kick(); });
  }

  /* Clic: il quarto a sinistra torna indietro, quello a destra va avanti, il centro porta all'abito nella collezione */
  scatola.addEventListener('click', e => {
    const r = scatola.getBoundingClientRect(), px = (e.clientX - r.left) / r.width;
    if (px < .25) return vai('prev');
    if (px > .75) return vai('next');
    const a = storie[live()[0].story];
    const card = document.querySelector(`#abiti [data-chiedi="${a.id}"]`);
    const dest = card ? card.closest('article, li, .abito') || card : document.getElementById('collezione');
    window.Negozio && Negozio.lenis ? Negozio.lenis.scrollTo(dest, { offset: -120 }) : dest.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  radice.querySelector('[data-pl="-1"]').addEventListener('click', () => vai('prev'));
  radice.querySelector('[data-pl="1"]').addEventListener('click', () => vai('next'));

  disegnaLineette();
})();

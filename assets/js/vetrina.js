/* Vetrina: tre gesti sulle bomboniere, presi dal codice vero di due librerie.
   1. Nelle schede della griglia il prodotto si gira: ogni lato fotografato si apre dalla linea centrale sopra il precedente
      (l'apertura delle pagine di "047R" di UberDesigner, la stessa molla 170/21 della pila abiti), e in alto a destra
      le barrette dei lati come la paginazione di 047R (quella attuale è la più larga).
      Col mouse il lato segue il cursore; sul telefono la scheda che passa a metà schermo fa un giro da sola.
   2. Nella scheda prodotto la foto si apre dal centro e cambiare lato fa lo stesso gesto.
   3. Nella scheda prodotto una lente di vetro (col mouse sempre, col dito tenendo premuto) segue e ingrandisce la porcellana (Liquid Glass di HorizonX:
      bordo che piega la luce, riflesso che resta indietro, lente che si allunga nella corsa), con dentro il dettaglio vero.
   Le foto restano piatte e intere: niente pieghe, rotazioni o sfocature. */
(function () {
  const G = window.GRAZIELLA;
  if (!G) return;
  const ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- La molla di 047R (massa 1, rigidità 170, smorzamento 21) campionata in linear() ---- */
  const sim = (() => {
    const p = [0]; let x = 0, v = 0, t = 0; const STEP = 1 / 240;
    while (t < 5) {
      const a = 170 * (1 - x) - 21 * v;
      v += a * STEP; x += v * STEP; t += STEP; p.push(x);
      if (Math.abs(1 - x) < .001 && Math.abs(v) < .01) break;
    }
    p[p.length - 1] = 1; return p;
  })();
  const linear = `linear(${Array.from({ length: 49 }, (_, i) => +sim[Math.round(i / 48 * (sim.length - 1))].toFixed(4)).join(', ')})`;
  const EASE = CSS.supports('transition-timing-function', 'linear(0, 1)') ? linear : 'cubic-bezier(0.2, 0.9, 0.25, 1)';
  document.documentElement.style.setProperty('--molla', EASE);
  const CHIUSO = 'inset(50% 0% 50% 0%)', APERTO = 'inset(0% 0% 0% 0%)';
  const T = { foto: 1100, lato: 700, uscita: .6 };

  const prodotto = id => G.prodotti.find(p => p.id === id);
  const lati = p => p ? [G.foto(p), ...Array.from({ length: Math.max(0, (p.viste || 1) - 1) }, (_, k) => G.vista(p, k + 1))] : [];

  /* Uno strato nuovo si apre dalla linea centrale sopra quelli che ci sono; finita l'apertura, quelli sotto si tolgono */
  function apri(box, url, classe, durata = T.lato) {
    const strato = document.createElement('div');
    strato.className = 'giro';
    strato.setAttribute('aria-hidden', 'true');
    strato.innerHTML = `<img class="${classe || ''}" alt="" src="${url}" draggable="false">`;
    box.appendChild(strato);
    if (ridotto) { pulisci(box, strato); return strato; }
    const a = strato.animate([{ clipPath: CHIUSO }, { clipPath: APERTO }], { duration: durata, easing: EASE, fill: 'forwards' });
    a.finished.then(() => pulisci(box, strato)).catch(() => {});
    return strato;
  }
  function pulisci(box, tieni) {
    const tutti = [...box.querySelectorAll(':scope > .giro')];
    const i = tutti.indexOf(tieni);
    tutti.slice(0, Math.max(0, i)).forEach(s => s.remove());
  }
  /* Uscendo, lo strato in cima si richiude sulla linea centrale e ricompare la foto di sempre */
  function chiudi(box) {
    const strati = [...box.querySelectorAll(':scope > .giro')];
    if (!strati.length) return;
    const cima = strati[strati.length - 1];
    strati.slice(0, -1).forEach(s => s.remove());
    if (ridotto) { cima.remove(); return; }
    cima.getAnimations().forEach(a => a.cancel());
    cima.animate([{ clipPath: APERTO }, { clipPath: CHIUSO }], { duration: T.lato * T.uscita, easing: 'cubic-bezier(.6,0,.4,1)', fill: 'forwards' })
      .finished.then(() => cima.remove()).catch(() => {});
  }

  /* ---------- 1. Griglia: il prodotto si gira (col mouse sotto il cursore, col dito scorrendo) ---------- */
  const stato = new WeakMap();
  function barre(n, k) {
    return Array.from({ length: n }, (_, i) => `<i style="--d:${Math.abs(i - k)}"${i === k ? ' class="on"' : ''}></i>`).join('');
  }
  function prepara(campo) {
    if (stato.has(campo)) return stato.get(campo);
    const card = campo.closest('.card');
    const p = prodotto(card && card.dataset.id);
    const s = { foto: lati(p), k: 0, barre: null, tempi: [] };
    if (s.foto.length > 1) {
      s.barre = document.createElement('span');
      s.barre.className = 'card__lati';
      s.barre.setAttribute('aria-hidden', 'true');
      campo.appendChild(s.barre);
      s.foto.forEach(u => { const im = new Image(); im.decoding = 'async'; im.src = u; });
    }
    stato.set(campo, s);
    return s;
  }
  function vai(campo, s, k) {
    if (k === s.k) return;
    s.k = k;
    s.barre.innerHTML = barre(s.foto.length, k);
    apri(campo, s.foto[k], 'giro__img');
  }

  if (mouse && !ridotto) {
    /* Il lato si sceglie con la posizione del mouse: entrando si vede subito il secondo, poi scorrendo verso destra gli altri */
    function lato(campo, s, x) {
      const r = campo.getBoundingClientRect();
      const n = s.foto.length;
      const t = Math.min(.999, Math.max(0, (x - r.left) / r.width));
      return n === 2 ? 1 : 1 + Math.floor(t * (n - 1));
    }
    let attivo = null;
    document.addEventListener('pointerover', e => {
      if (e.pointerType !== 'mouse') return;
      const campo = e.target.closest && e.target.closest('.card__field');
      if (!campo || campo === attivo) return;
      if (attivo) esci(attivo);
      const s = prepara(campo);
      if (s.foto.length < 2) return;
      attivo = campo;
      campo.classList.add('is-giro');
      s.barre.innerHTML = barre(s.foto.length, s.k);
      vai(campo, s, lato(campo, s, e.clientX));
    }, { passive: true });
    document.addEventListener('pointermove', e => {
      if (!attivo) return;
      if (!attivo.isConnected || !attivo.contains(e.target)) { esci(attivo); return; }
      const s = stato.get(attivo);
      vai(attivo, s, lato(attivo, s, e.clientX));
    }, { passive: true });
    function esci(campo) {
      const s = stato.get(campo);
      if (attivo === campo) attivo = null;
      campo.classList.remove('is-giro');
      if (!s || s.foto.length < 2) return;
      s.k = 0;
      chiudi(campo);
    }
    document.addEventListener('pointerout', e => {
      if (!attivo) return;
      if (!e.relatedTarget || !attivo.contains(e.relatedTarget)) esci(attivo);
    }, { passive: true });
  }

  /* Col dito: quando una scheda passa a metà schermo il prodotto fa un giro da solo, un lato dopo l'altro,
     e torna davanti. Non serve toccare niente e lo scorrimento resta libero. */
  if (!mouse && !ridotto && 'IntersectionObserver' in window) {
    const PAUSA = 1250;
    const intera = campo => { const r = campo.getBoundingClientRect(); return r.left > -4 && r.right < innerWidth + 4; };
    function ferma(campo, chiudendo) {
      const s = stato.get(campo);
      if (!s) return;
      s.tempi.forEach(clearTimeout); s.tempi = [];
      campo.classList.remove('is-giro');
      if (s.k !== 0 || chiudendo) { s.k = 0; if (campo.querySelector(':scope > .giro')) chiudi(campo); }
    }
    function gira(campo) {
      const s = prepara(campo);
      if (s.foto.length < 2 || s.tempi.length || s.fatto) return;
      const dopo = campo.getBoundingClientRect().left > innerWidth / 2 ? 320 : 0;
      s.tempi.push(setTimeout(function avanti() {
        if (!campo.isConnected || !intera(campo)) { ferma(campo, true); return; }
        campo.classList.add('is-giro');
        const k = s.k + 1;
        if (k >= s.foto.length) {
          /* Giro finito: si richiude e ricompare il davanti, con le barrette che spariscono */
          s.fatto = true; ferma(campo, true); return;
        }
        vai(campo, s, k);
        s.tempi.push(setTimeout(avanti, PAUSA));
      }, 420 + dopo));
    }
    const io = new IntersectionObserver(voci => voci.forEach(v => {
      const s = stato.get(v.target);
      if (v.isIntersecting) gira(v.target);
      else if (s) { s.fatto = false; ferma(v.target, false); }
    }), { rootMargin: '-40% 0px -48% 0px', threshold: 0 });
    const visti = new WeakSet();
    const guarda = () => document.querySelectorAll('.card__field').forEach(c => { if (!visti.has(c)) { visti.add(c); prepara(c); io.observe(c); } });
    guarda();
    let atteso = 0;
    new MutationObserver(m => {
      if (atteso || !m.some(r => [...r.addedNodes].some(n => n.nodeType === 1 && !n.classList.contains('giro') && (n.matches('.card, .card__field') || n.querySelector('.card__field'))))) return;
      atteso = requestAnimationFrame(() => { atteso = 0; guarda(); });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- 2 e 3. Scheda prodotto ---------- */
  const main = document.getElementById('principale');
  const foto = document.getElementById('foto');
  if (!main || !foto) { window.Vetrina = { apri, chiudi, EASE }; return; }

  /* La foto entra aprendosi dalla linea centrale */
  if (!ridotto) main.animate([{ clipPath: CHIUSO }, { clipPath: APERTO }], { duration: T.foto, easing: EASE, delay: 120, fill: 'backwards' });

  /* La lente di vetro: col mouse segue il puntatore; col dito si tiene premuto sulla foto e compare sopra il dito */
  if (ridotto) { window.Vetrina = { apri, chiudi, EASE }; return; }
  const dito = !mouse;
  if (mouse) document.documentElement.classList.add('con-lente');
  else document.documentElement.classList.add('con-lente-dito');
  const S = mouse ? 176 : 156, ZOOM = mouse ? 2.1 : 2.4;
  const hint = document.getElementById('hint-gal');
  if (hint) hint.textContent = mouse ? (((window.PRODOTTO && window.PRODOTTO.viste) || 1) > 1 ? 'Trascina per girarla' : '') : 'Tieni premuto per la lente';

  /* Il bordo che piega la luce: la mappa di spostamento di Liquid Glass applicata al dettaglio dentro la lente */
  const fid = 'lente' + Math.random().toString(36).slice(2, 8);
  const rim = .3, amt = .7;
  const mappa = (() => {
    const n = Math.round(S * Math.min(devicePixelRatio || 1, 2));
    const c = document.createElement('canvas'); c.width = c.height = n;
    const g = c.getContext('2d'), img = g.createImageData(n, n), d = img.data;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const u = (i + .5) / n * 2 - 1, v = (j + .5) / n * 2 - 1;
      const r = Math.sqrt(u * u + v * v);
      let dx = 0, dy = 0;
      if (r < 1 && r > 1e-4) {
        const t = Math.max(0, (r - (1 - rim)) / rim);
        const bend = t * t * (3 - 2 * t) * amt;
        dx = -u / r * bend; dy = -v / r * bend;
      }
      const o = (j * n + i) * 4;
      d[o] = 128 + dx * 127; d[o + 1] = 128 + dy * 127; d[o + 2] = 128; d[o + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    return c.toDataURL();
  })();
  const ns = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(ns, 'svg');
  defs.setAttribute('width', '0'); defs.setAttribute('height', '0'); defs.setAttribute('aria-hidden', 'true');
  defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  defs.innerHTML = `<filter id="${fid}" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%"><feImage href="${mappa}" x="0" y="0" width="${S}" height="${S}" result="m" preserveAspectRatio="none"/><feDisplacementMap in="SourceGraphic" in2="m" scale="${(2 * (rim * S / 2) / 3).toFixed(1)}" xChannelSelector="R" yChannelSelector="G"/></filter>`;
  document.body.appendChild(defs);
  const ua = navigator.userAgent;
  const piega = /Chrom(e|ium)\/\d/.test(ua) && !/Firefox\//.test(ua);

  const ombra = document.createElement('div'); ombra.className = 'lente__ombra';
  const lente = document.createElement('div'); lente.className = 'lente';
  lente.innerHTML = `<div class="lente__dentro"${piega ? ` style="filter:url(#${fid})"` : ''}><img alt="" draggable="false"></div><div class="lente__riflesso"></div><div class="lente__bordo"></div>`;
  [ombra, lente].forEach(n => { n.setAttribute('aria-hidden', 'true'); main.appendChild(n); });
  [ombra, lente].forEach(n => { n.style.width = n.style.height = S + 'px'; n.style.left = n.style.top = (-S / 2) + 'px'; });
  const dentro = lente.firstChild, zimg = dentro.firstChild, riflesso = lente.children[1];

  let px = 0, py = 0, x = 0, y = 0, vx = 0, vy = 0, allunga = 1, ang = 0, sx = 0, sy = 0, vis = 0, dentroM = false, giro = 0, ultimo = 0, visto = false;
  const segui = (k, dt) => 1 - Math.pow(1 - k, dt * 60);
  main.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const r = main.getBoundingClientRect();
    px = e.clientX - r.left; py = e.clientY - r.top;
    if (!visto) { visto = true; x = px; y = py; }
    dentroM = true; sveglia();
  }, { passive: true });
  main.addEventListener('pointerleave', () => { dentroM = false; sveglia(); });

  /* Col dito: si tiene premuto un attimo senza muoversi, la lente compare sopra il dito e lo segue.
     Uno scorrimento normale resta uno scorrimento: la pagina si ferma solo mentre la lente è aperta. */
  let premuto = null, attesa = 0, conDito = false, mangia = 0;
  function punta(cx, cy, subito) {
    const r = main.getBoundingClientRect();
    px = cx - r.left; py = cy - r.top;
    if (subito) { x = px; y = py; vx = vy = 0; }
    dentroM = true; sveglia();
  }
  function lascia() {
    clearTimeout(attesa); premuto = null;
    if (!conDito) return;
    conDito = false; dentroM = false; mangia = performance.now(); sveglia();
    main.classList.remove('is-dito');
  }
  if (dito) {
    main.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) { lascia(); return; }
      const t = e.touches[0];
      premuto = { x: t.clientX, y: t.clientY };
      clearTimeout(attesa);
      attesa = setTimeout(() => {
        if (!premuto) return;
        conDito = true; main.classList.add('is-dito'); main.classList.remove('is-zoom');
        punta(premuto.x, premuto.y, true);
      }, 300);
    }, { passive: true });
    main.addEventListener('touchmove', e => {
      if (!premuto) return;
      const t = e.touches[0];
      if (conDito) { if (e.cancelable) e.preventDefault(); punta(t.clientX, t.clientY); return; }
      if (Math.hypot(t.clientX - premuto.x, t.clientY - premuto.y) > 10) { clearTimeout(attesa); premuto = null; }
    }, { passive: false });
    main.addEventListener('touchend', lascia);
    main.addEventListener('touchcancel', lascia);
    main.addEventListener('contextmenu', e => { if (premuto || conDito) e.preventDefault(); });
    /* Il tocco che chiude la lente non deve anche ingrandire la foto */
    main.addEventListener('click', e => { if (conDito || performance.now() - mangia < 450) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
  }

  function sveglia() { if (!giro) { ultimo = 0; giro = requestAnimationFrame(passo); } }
  function passo(ora) {
    const dt = ultimo ? Math.min((ora - ultimo) / 1000, .05) : 1 / 60; ultimo = ora;
    const k = segui(.18, dt);
    const nx = x + (px - x) * k, ny = y + (py - y) * k, st = Math.max(dt, 1 / 240), sv = segui(.3, dt);
    vx += ((nx - x) / st - vx) * sv; vy += ((ny - y) / st - vy) * sv; x = nx; y = ny;
    const vel = Math.hypot(vx, vy);
    allunga += ((1 + .14 * (1 - Math.exp(-vel / 1400))) - allunga) * segui(.18, dt);
    if (vel > 40) ang = Math.atan2(vy, vx) * 180 / Math.PI;
    const lim = S * .1;
    sx += (Math.max(-lim, Math.min(lim, -vx * .012)) - sx) * segui(.2, dt);
    sy += (Math.max(-lim, Math.min(lim, -vy * .012)) - sy) * segui(.2, dt);
    vis += ((dentroM ? 1 : 0) - vis) * segui(.16, dt); if (vis < .002) vis = 0;

    /* Dentro la lente la stessa foto, ingrandita attorno al punto sotto il mouse */
    const strati = main.querySelectorAll(':scope > .giro img');
    const base = strati.length ? strati[strati.length - 1] : foto;
    if (zimg.getAttribute('src') !== base.currentSrc && base.currentSrc) zimg.src = base.currentSrc;
    const m = main.getBoundingClientRect(), b = base.getBoundingClientRect();
    const bx = b.left - m.left, by = b.top - m.top;
    zimg.style.width = (b.width * ZOOM) + 'px'; zimg.style.height = (b.height * ZOOM) + 'px';
    zimg.style.transform = `translate3d(${(S / 2 - (x - bx) * ZOOM).toFixed(1)}px,${(S / 2 - (y - by) * ZOOM).toFixed(1)}px,0)`;

    /* Col dito la lente sta sopra il dito (che altrimenti la coprirebbe), senza uscire dalla foto */
    const ly = dito ? Math.max(S / 2 + 6, y - S * .5 - 40) : y;
    const tr = `translate3d(${x.toFixed(1)}px,${ly.toFixed(1)}px,0) rotate(${ang.toFixed(1)}deg) scale(${allunga.toFixed(4)},${(1 / allunga).toFixed(4)}) rotate(${(-ang).toFixed(1)}deg)`;
    lente.style.transform = ombra.style.transform = tr;
    lente.style.opacity = ombra.style.opacity = vis.toFixed(3);
    riflesso.style.transform = `translate3d(${sx.toFixed(1)}px,${sy.toFixed(1)}px,0)`;
    main.classList.toggle('is-lente', vis > .05);
    const fermo = Math.abs(px - x) < .05 && Math.abs(py - y) < .05 && Math.abs(vx) < .5 && Math.abs(vy) < .5 && Math.abs(allunga - 1) < .001 && (vis === 0 || vis > .999);
    giro = fermo ? 0 : requestAnimationFrame(passo);
  }

  window.Vetrina = { apri, chiudi, EASE };
})();

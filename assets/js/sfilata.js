/* Sfilata delle bomboniere: sei pezzi in fila verso il fondo, come il lookbook "Runway" di MotionSites (Maison Vell).
   Un solo numero, p, decide tutto: posizione, grandezza, sfocatura e opacità di ogni pezzo vengono da una tabella
   a 7 tappe (profondità da -1 a 5) e la colonna dei prodotti e il nome in basso scorrono con lo stesso p.
   Si muove col trascinamento, con le frecce e con la tastiera; la rotella resta alla pagina, così lo scroll non si blocca mai. */
(function () {
  const radice = document.getElementById('sfilata');
  if (!radice || !window.Negozio) return;
  const { prodotto, euro, aggiungi, volaInBorsa } = Negozio;
  const ID = JSON.parse(radice.dataset.prodotti);
  const pezzi = ID.map(prodotto).filter(Boolean);
  const N = pezzi.length;
  const ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouse = matchMedia('(hover: hover) and (pointer: fine)');

  /* Tabella delle profondità (frazioni del palco), da -1 a 5 */
  const KX = [1.25, .7, .49, .34, .225, .135, .065];
  const KF = [1.12, .9, .79, .72, .67, .635, .61];
  const KH = [1.0, .6, .41, .3, .225, .17, .13];
  const KB = [0, 0, .8, 2, 4, 6, 9];
  const KO = [0, 1, 1, 1, .88, .55, 0];
  const tappa = (T, d) => { const x = Math.min(5, Math.max(-1, d)) + 1, i = Math.min(5, Math.floor(x)), f = x - i; return T[i] + (T[i + 1] - T[i]) * f; };
  const giro = (v, n) => ((v % n) + n) % n;

  const palco = radice.querySelector('.sf__palco');
  const pista = radice.querySelector('.sf__pezzi');
  const binario = radice.querySelector('.sf__binario');
  const nomi = radice.querySelector('.sf__nomi');
  const prezzoEl = radice.querySelector('.sf__prezzo');
  const linkEl = radice.querySelector('.sf__link');

  pista.innerHTML = pezzi.map((p, i) => `<figure class="sf__pezzo" data-i="${i}"><i class="sf__ombra"></i><img src="${GRAZIELLA.foto(p)}" alt="${p.nome}" draggable="false"></figure>`).join('');
  binario.innerHTML = pezzi.map((p, i) => `<article class="sf__card" data-i="${i}">
      <a class="sf__card-foto" href="prodotto.html#${p.id}"><img src="${GRAZIELLA.foto(p)}" alt="" loading="lazy"></a>
      <div class="sf__card-testo"><h3><a href="prodotto.html#${p.id}">${p.nome}</a></h3><p>${p.prezzoPieno ? `<s>${euro(p.prezzoPieno)}</s> ` : ''}${euro(p.prezzo)} al pezzo</p></div>
      <button class="sf__piu" type="button" data-aggiungi-sf="${p.id}" aria-label="Aggiungi ${p.nome} al carrello"><i></i><i></i></button>
    </article>`).join('');
  /* Nomi uno sopra l'altro, col primo ripetuto in fondo per il giro continuo */
  nomi.innerHTML = [...pezzi, pezzi[0]].map(p => `<span>${p.nome}</span>`).join('');

  const figure = [...pista.children], carte = [...binario.children];
  const imgs = figure.map(f => f.querySelector('img'));
  const ultimi = figure.map(() => ({ f: '', o: '' }));
  let p = 0, obiettivo = 0, misure = { w: 1, h: 1, carta: 1, verticale: true }, corrente = -1;

  function misura() {
    const r = palco.getBoundingClientRect();
    const verticale = matchMedia('(min-width: 901px)').matches;
    misure = { w: r.width, h: r.height, verticale, carta: verticale ? binario.clientHeight / 3 : binario.firstElementChild ? binario.firstElementChild.offsetWidth + 8 : 168 };
    figure.forEach(f => { f.style.height = (misure.h * 1.0) + 'px'; });
    disegna(true);
  }

  function disegna(forza) {
    const { w, h } = misure;
    /* Sul telefono la fila è più piccola e più alta, così sotto restano liberi nome, prezzo e frecce */
    const kh = misure.verticale ? 1 : .74, kf = misure.verticale ? 1 : .8;
    figure.forEach((f, i) => {
      let d = giro(i - p, N); if (d > N - 1.5) d -= N; /* il pezzo appena passato esce a -1 */
      const s = tappa(KH, d) * kh, x = tappa(KX, d) * w, y = tappa(KF, d) * h * kf;
      f.style.transform = `translate3d(${(x).toFixed(1)}px, ${(y - h).toFixed(1)}px, 0) translateX(-50%) scale(${s.toFixed(4)})`;
      f.style.zIndex = 100 - Math.round(d * 10);
      const b = tappa(KB, d) / Math.max(s, .1), o = tappa(KO, d);
      const fs = b > .05 ? `blur(${b.toFixed(1)}px)` : 'none', os = o.toFixed(2);
      if (forza || ultimi[i].f !== fs) { imgs[i].style.filter = fs; ultimi[i].f = fs; }
      if (forza || ultimi[i].o !== os) { f.style.opacity = os; ultimi[i].o = os; }
    });
    /* Colonna: la carta del pezzo davanti sta in cima (PC) o a sinistra (telefono) */
    carte.forEach((c, i) => {
      let k = giro(i - p, N); if (k > N - 1) k -= N;
      c.style.transform = misure.verticale ? `translate3d(0, ${(k * misure.carta).toFixed(1)}px, 0)` : `translate3d(${(k * misure.carta).toFixed(1)}px, 0, 0)`;
      c.classList.toggle('is-davanti', Math.abs(k) < .5);
    });
    const lh = nomi.firstElementChild ? nomi.firstElementChild.offsetHeight : 40;
    nomi.style.transform = `translate3d(0, ${(-giro(p, N) * lh).toFixed(1)}px, 0)`;
    const ora = giro(Math.round(p), N);
    if (ora !== corrente) {
      corrente = ora;
      const q = pezzi[ora];
      prezzoEl.innerHTML = `${q.prezzoPieno ? `<s>${euro(q.prezzoPieno)}</s> ` : ''}${euro(q.prezzo)} al pezzo`;
      linkEl.href = `prodotto.html#${q.id}`;
      linkEl.setAttribute('aria-label', `Vedi ${q.nome}`);
      palco.setAttribute('aria-label', `Sfilata delle bomboniere: davanti c'è ${q.nome}`);
    }
  }

  let ultimoT = 0, inMoto = false;
  function passo(t) {
    const dt = Math.min(50, t - (ultimoT || t)); ultimoT = t;
    p += (obiettivo - p) * (ridotto ? 1 : 1 - Math.exp(-dt * .0072));
    if (Math.abs(obiettivo - p) < .0004) p = obiettivo;
    disegna(false);
    if (p !== obiettivo || trascina) requestAnimationFrame(passo); else { inMoto = false; ultimoT = 0; }
  }
  const muovi = () => { if (!inMoto) { inMoto = true; requestAnimationFrame(passo); } };
  const vai = v => { obiettivo = Math.round(v); muovi(); };

  /* Trascinamento: a destra la fila avanza. touch-action: pan-y lascia alla pagina lo scroll verticale */
  let trascina = null;
  palco.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    trascina = { x: e.clientX, y: e.clientY, da: obiettivo, mosso: false, id: e.pointerId };
    radice.classList.add('is-trascina');
  });
  addEventListener('pointermove', e => {
    if (!trascina || e.pointerId !== trascina.id) return;
    const dx = e.clientX - trascina.x;
    if (!trascina.mosso && Math.abs(dx) > 6) { trascina.mosso = true; try { palco.setPointerCapture(e.pointerId); } catch (err) {} }
    if (trascina.mosso) { obiettivo = trascina.da + dx / Math.max(150, misure.w * .22); muovi(); }
  });
  const fine = e => {
    if (!trascina) return;
    const t = trascina; trascina = null;
    radice.classList.remove('is-trascina');
    if (!t.mosso) {
      /* Un tocco su un pezzo in fondo lo porta davanti */
      const f = e.target.closest && e.target.closest('.sf__pezzo');
      if (f) { const i = +f.dataset.i; let d = giro(i - Math.round(obiettivo), N); vai(Math.round(obiettivo) + d); }
      return;
    }
    vai(obiettivo);
  };
  addEventListener('pointerup', fine);
  addEventListener('pointercancel', fine);

  /* Rotella orizzontale del trackpad: muove la fila senza mai toccare lo scroll verticale */
  let fermo = 0;
  palco.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    obiettivo -= Math.max(-120, Math.min(120, e.deltaX)) / 420; muovi();
    clearTimeout(fermo); fermo = setTimeout(() => vai(obiettivo), 150);
  }, { passive: false });

  radice.querySelector('[data-sf="-1"]').addEventListener('click', () => vai(Math.round(obiettivo) - 1));
  radice.querySelector('[data-sf="1"]').addEventListener('click', () => vai(Math.round(obiettivo) + 1));
  palco.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); vai(Math.round(obiettivo) + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); vai(Math.round(obiettivo) - 1); }
  });

  binario.addEventListener('click', e => {
    const b = e.target.closest('[data-aggiungi-sf]'); if (!b) return;
    aggiungi(b.dataset.aggiungiSf);
    volaInBorsa(b.closest('.sf__card').querySelector('img'));
  });

  /* Cerchio che segue il mouse sul palco e diventa una pillola mentre si trascina */
  const anello = radice.querySelector('.sf__anello');
  if (mouse.matches && anello && !ridotto) {
    let ax = 0, ay = 0, tx = 0, ty = 0, dentro = false;
    palco.addEventListener('pointerenter', () => { dentro = true; anello.classList.add('is-on'); });
    palco.addEventListener('pointerleave', () => { dentro = false; anello.classList.remove('is-on'); });
    palco.addEventListener('pointermove', e => { const r = palco.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; });
    (function segui() { ax += (tx - ax) * .32; ay += (ty - ay) * .32; if (dentro) anello.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0) translate(-50%, -50%)`; requestAnimationFrame(segui); })();
  }

  addEventListener('resize', misura);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(misura);
  Promise.all(imgs.map(im => im.decode ? im.decode().catch(() => {}) : 0)).then(() => radice.classList.add('is-pronta'));
  setTimeout(() => radice.classList.add('is-pronta'), 1200);
  misura();
})();

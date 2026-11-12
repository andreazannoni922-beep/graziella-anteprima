/* Passerella degli abiti: le spose stanno in fila di profilo sotto il binario dell'atelier, come gli abiti nell'armadio,
   e quella sotto il mouse (o toccata) si gira verso chi guarda. Un clic la apre in grande con frecce e "Chiedi di provarlo".
   Ripreso da "Clothing Rail" di MotionSites (Offcut): capi di taglio in 3D CSS che ruotano, didascalia sotto, vista di dettaglio. */
(function () {
  const radice = document.getElementById('passerella');
  if (!radice || !window.GRAZIELLA) return;
  const G = window.GRAZIELLA;
  const abiti = G.abiti;
  const N = abiti.length;
  const linea = id => (G.linee.find(l => l.id === id) || {}).nome || '';
  const fila = radice.querySelector('.ps__fila');
  const cap = radice.querySelector('.ps__cap');
  const det = radice.querySelector('.ps__det');
  const grande = det.querySelector('.ps__grande');
  const mouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

  fila.innerHTML = abiti.map((a, i) => `<button type="button" class="ps__abito" data-i="${i}" aria-label="${a.nome}, ${linea(a.linea)}">
      <span class="ps__foto" style="background-image:url(assets/abiti/scontorni/${a.id}.webp)"></span></button>`).join('');
  const voci = [...fila.children];
  let su = Math.floor(N / 2), aperto = -1;

  function gira(i, centra) {
    su = (i + N) % N;
    voci.forEach((v, k) => { v.classList.toggle('is-su', k === su); v.style.setProperty('--lato', k < su ? -1 : 1); });
    const a = abiti[su];
    const l = linea(a.linea);
    cap.innerHTML = `<b>${a.nome}</b><span>${l && l !== a.nome ? l + ' · ' : ''}su misura</span>`;
    cap.classList.add('is-on');
    requestAnimationFrame(() => {
      const r = voci[su].getBoundingClientRect(), f = radice.getBoundingClientRect();
      cap.style.left = (r.left + r.width / 2 - f.left) + 'px';
      fila.style.perspectiveOrigin = `${(voci[su].offsetLeft + voci[su].offsetWidth / 2 - fila.scrollLeft).toFixed(0)}px 40%`;
      if (centra && fila.scrollWidth > fila.clientWidth) fila.scrollTo({ left: voci[su].offsetLeft - fila.clientWidth / 2 + voci[su].offsetWidth / 2, behavior: centra === 'subito' ? 'auto' : 'smooth' });
    });
  }

  function apri(i) {
    /* Alla prima apertura la sezione sale sotto la testata, così la sposa in grande si vede intera */
    if (aperto < 0) {
      const cs = getComputedStyle(document.documentElement);
      const testa = (parseFloat(cs.getPropertyValue('--head')) || 64) + (parseFloat(cs.getPropertyValue('--bar')) || 34);
      const dy = radice.getBoundingClientRect().top - testa;
      if (Math.abs(dy) > 4) {
        const L = window.Negozio && Negozio.lenis;
        L ? L.scrollTo(radice, { offset: -testa, duration: .7 }) : scrollBy({ top: dy, behavior: 'smooth' });
      }
    }
    aperto = (i + N) % N;
    const a = abiti[aperto];
    grande.style.backgroundImage = `url(assets/abiti/scontorni/${a.id}.webp)`;
    grande.setAttribute('aria-label', a.nome);
    det.querySelector('.ps__nome').textContent = a.nome;
    const l = linea(a.linea);
    det.querySelector('.ps__nota').textContent = `${l && l !== a.nome ? l + ' · ' : ''}${a.nota}. Su misura, nella nostra sartoria.`;
    det.querySelector('[data-ps-chiedi]').dataset.psChiedi = a.id;
    radice.classList.add('is-aperta');
    det.setAttribute('aria-hidden', 'false');
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(grande, { y: 30, opacity: 0, scale: .96 }, { y: 0, opacity: 1, scale: 1, duration: .7, ease: 'power3.out' });
    det.querySelector('.ps__chiudi').focus({ preventScroll: true });
  }
  function chiudi() {
    if (aperto < 0) return;
    gira(aperto); aperto = -1;
    radice.classList.remove('is-aperta');
    det.setAttribute('aria-hidden', 'true');
    voci[su].focus({ preventScroll: true });
  }

  /* Col mouse si gira passando; col dito il primo tocco gira, il secondo apre */
  voci.forEach((v, i) => {
    if (mouse) v.addEventListener('mouseenter', () => gira(i));
    v.addEventListener('focus', () => gira(i));
    v.addEventListener('click', () => { if (!mouse && su !== i) { gira(i, true); return; } apri(i); });
  });
  radice.querySelector('[data-ps="-1"]').addEventListener('click', () => gira(su - 1, true));
  radice.querySelector('[data-ps="1"]').addEventListener('click', () => gira(su + 1, true));
  det.querySelector('[data-ps-det="-1"]').addEventListener('click', () => apri(aperto - 1));
  det.querySelector('[data-ps-det="1"]').addEventListener('click', () => apri(aperto + 1));
  det.querySelector('.ps__chiudi').addEventListener('click', chiudi);
  det.querySelector('.ps__velo').addEventListener('click', chiudi);
  radice.addEventListener('keydown', e => {
    if (e.key === 'Escape') chiudi();
    if (e.key === 'ArrowRight') { e.preventDefault(); aperto >= 0 ? apri(aperto + 1) : gira(su + 1, true); voci[su].focus({ preventScroll: true }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); aperto >= 0 ? apri(aperto - 1) : gira(su - 1, true); voci[su].focus({ preventScroll: true }); }
  });

  /* "Chiedi di provarlo" usa lo stesso bottone della griglia: sceglie l'abito nel modulo e porta alla prenotazione */
  det.querySelector('[data-ps-chiedi]').addEventListener('click', e => {
    const id = e.currentTarget.dataset.psChiedi;
    chiudi();
    const b = document.querySelector(`#abiti [data-chiedi="${id}"]`);
    if (b) b.click(); else location.hash = 'prova';
  });

  addEventListener('resize', () => gira(su, 'subito'));
  gira(su, 'subito');
  /* Sul telefono, quando la fila si ferma dopo lo scorrimento col dito, si gira la sposa al centro */
  let ferma = 0;
  fila.addEventListener('scroll', () => {
    if (fila.scrollWidth <= fila.clientWidth) return;
    fila.style.perspectiveOrigin = `${(voci[su].offsetLeft + voci[su].offsetWidth / 2 - fila.scrollLeft).toFixed(0)}px 40%`;
    clearTimeout(ferma);
    ferma = setTimeout(() => {
      const c = fila.scrollLeft + fila.clientWidth / 2;
      let k = 0, d = 1e9;
      voci.forEach((v, i) => { const x = Math.abs(v.offsetLeft + v.offsetWidth / 2 - c); if (x < d) { d = x; k = i; } });
      if (k !== su) gira(k, true);
    }, 140);
  }, { passive: true });
})();

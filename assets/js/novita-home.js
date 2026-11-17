/* Sezioni della home approvate da Andrea il 17/11/2026.
   1. Salita degli abiti: "Gallery Rise" di HorizonX. Le foto salgono dal basso, ognuna da un'altezza diversa e una dopo l'altra,
      finché si compongono nel mosaico. La ricetta originale (ease sine, stagger 0.07, scrub 0.5) qui la guida lo scroll della pagina.
   2. Parole dell'atelier: "Type Reveal" di HorizonX. Dentro le frasi grandi si apre una foto (o il video) tra le parole, a sipario;
      l'apertura segue la posizione della frase nello schermo, con la stessa morbidezza (0.12) e la curva power1.inOut.
      Le foto alla fine si vedono intere: il riempimento ha già la misura finale e la cornice lo scopre. */
(function () {
  const ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = v => (v < 0 ? 0 : v > 1 ? 1 : v);

  /* ---------- 1. Salita ---------- */
  const salita = document.getElementById('salita');
  if (salita && window.gsap && window.ScrollTrigger) {
    const items = [...salita.querySelectorAll('.sl-item')];
    const telefono = matchMedia('(max-width: 900px)').matches;
    if (!ridotto) {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'sine' } })
        .from(items, { stagger: .07, y: () => gsap.utils.random(innerHeight, innerHeight * 1.8) });
      ScrollTrigger.create({
        trigger: telefono ? salita.querySelector('.sl-griglia') : salita,
        start: telefono ? 'top bottom' : 'top 70%',
        end: telefono ? 'bottom 75%' : 'bottom bottom',
        scrub: .5,
        animation: tl
      });
    }
  }

  /* ---------- 2. Parole ---------- */
  const parole = document.getElementById('parole');
  if (parole) {
    const blocchi = [...parole.querySelectorAll('.tr-blocco')].map(el => ({
      el, frame: el.querySelector('.tr-cornice'), parola: el.querySelector('.tr-parola'), corpo: el.querySelector('.tr-corpo'),
      open: 0, dipinto: -1, video: el.querySelector('video')
    }));
    const ease = t => (t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    /* La foto ha la larghezza della parola sotto: così a sipario aperto si vede tutta */
    /* Sul telefono le parole sono strette: la foto prende almeno due terzi della riga, così si vede bene */
    const misura = () => blocchi.forEach(b => {
      const larga = innerWidth <= 900 ? Math.min(b.el.clientWidth * .68, 440) : 0;
      b.frame.style.setProperty('--fw', Math.max(b.parola.offsetWidth, larga) + 'px');
    });
    const dipingi = (b, v) => { if (Math.abs(v - b.dipinto) > .002) { b.el.style.setProperty('--open', v.toFixed(4)); b.dipinto = v; } };
    const bersaglio = b => {
      const r = b.el.getBoundingClientRect();
      return ease(clamp((innerHeight - r.top) / (innerHeight * .95)));
    };
    misura();
    if (document.fonts) document.fonts.ready.then(misura);
    addEventListener('resize', misura);
    if (ridotto) blocchi.forEach(b => dipingi(b, 1));
    else {
      blocchi.forEach(b => { b.open = bersaglio(b); dipingi(b, b.open); });
      let ultimo = performance.now(), dentro = false;
      new IntersectionObserver(([e]) => { dentro = e.isIntersecting; if (dentro) { ultimo = performance.now(); requestAnimationFrame(passo); } }, { rootMargin: '10% 0px' }).observe(parole);
      function passo(now) {
        if (!dentro) return;
        const dt = Math.min((now - ultimo) / 1000, .1); ultimo = now;
        const blend = 1 - (1 - .12) ** (dt * 60);
        blocchi.forEach(b => { b.open += (bersaglio(b) - b.open) * blend; dipingi(b, b.open); });
        requestAnimationFrame(passo);
      }
    }
    /* Il video parte solo quando si vede */
    blocchi.forEach(b => {
      if (!b.video) return;
      new IntersectionObserver(([e]) => { if (e.isIntersecting) b.video.play().catch(() => {}); else b.video.pause(); }, { threshold: .2 }).observe(b.frame);
    });
  }
})();

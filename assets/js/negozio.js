/* Parti comuni a tutte le pagine: testata, menu, borsa, piede, scroll morbido, animazioni d'entrata.
   In WordPress diventano template part del tema e il carrello di WooCommerce. */
(function () {
  const G = window.GRAZIELLA;
  const ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const euro = n => n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
  const prodotto = id => G.prodotti.find(p => p.id === id);
  const festa = id => G.feste.find(f => f.id === id);

  /* Confezioni dall'incontro col cliente (26/10): la scatola pronta e confezionata costa 3,50 € in più a bomboniera.
     Il fai da te (scatola, nastri e confetti sfusi) è a metà prezzo: da confermare con Graziella. Quantità minima ancora da chiedere. */
  const CONFEZIONI = [
    { id: 'oggetto', nome: 'Solo oggetto', extra: 0 },
    { id: 'pronta', nome: 'Già confezionata in scatola, con nastro e bigliettino', extra: 3.5 },
    { id: 'faidate', nome: 'Crea la tua: scatola, nastri e confetti sfusi da confezionare a casa', extra: 1.75 }
  ];
  const MINIMO = 10;
  const SOGLIA_GRATIS = 180;
  /* Metodi di pagamento detti dal cliente: PayPal, carte (via Stripe) */
  const PAGAMENTI = '<div class="pagamenti" aria-label="Pagamenti accettati"><span>PayPal</span><span>Carte di credito e debito</span><span>Stripe</span></div>';

  /* ---------- Borsa ---------- */
  const CHIAVE = 'graziella-borsa';
  let borsa = [];
  try { borsa = JSON.parse(localStorage.getItem(CHIAVE)) || []; } catch (e) { borsa = []; }
  /* Righe salvate con le confezioni di prima: diventano la confezione pronta */
  borsa = borsa.filter(r => G.prodotti.some(p => p.id === r.id)).map(r => CONFEZIONI.some(c => c.id === r.conf) ? r : { ...r, conf: 'pronta' });
  const salva = () => { try { localStorage.setItem(CHIAVE, JSON.stringify(borsa)); } catch (e) {} };
  const prezzoRiga = r => (prodotto(r.id).prezzo + CONFEZIONI.find(c => c.id === r.conf).extra) * r.qty;
  const pezzi = () => borsa.reduce((s, r) => s + 1, 0);

  /* Alcuni prodotti hanno un minimo loro, indicato da Enrico (papero terracotta 16, portafoto elefantino 6) */
  const minimoDi = id => prodotto(id).minimo || MINIMO;
  function aggiungi(id, conf = 'oggetto', qty = minimoDi(id), nomi = '') {
    const r = borsa.find(x => x.id === id && x.conf === conf && x.nomi === nomi);
    if (r) r.qty += qty; else borsa.push({ id, conf, qty, nomi });
    salva(); disegnaBorsa();
  }

  /* ---------- Testata ---------- */
  const corrente = document.body.dataset.festa || '';
  const pagina = document.body.dataset.pagina || '';

  /* Carattere dei titoli: Noto Serif Display di base (caricato nella testa di ogni pagina); gli altri si provano da caratteri.html.
     Chiave nuova: la scelta fatta quando c'era Cormorant non vale più. */
  const CARATTERI = {
    noto: null,
    zodiak: 'https://api.fontshare.com/v2/css?f[]=zodiak@300,400&display=swap',
    italiana: 'https://fonts.googleapis.com/css2?family=Italiana&display=swap',
    bodoni: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&display=swap',
    gilda: 'https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap',
    marcellus: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap'
  };
  let carattere = 'noto';
  try { carattere = localStorage.getItem('graziella-titoli') || 'noto'; } catch (e) {}
  if (!(carattere in CARATTERI)) carattere = 'noto';
  if (CARATTERI[carattere]) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${CARATTERI[carattere]}">`);
  document.documentElement.dataset.carattere = carattere;
  /* Bomboniere di una festa (le offerte sono quelle col prezzo ribassato) e le tre da mostrare nel mega menu */
  const perFesta = id => id === 'offerte' ? G.prodotti.filter(p => p.prezzoPieno) : G.prodotti.filter(p => p.feste.includes(id));
  const scelteDi = id => { const l = perFesta(id), piene = l.filter(p => id === 'offerte' || !p.prezzoPieno); return (piene.length >= 3 ? piene : l).slice(0, 3); };
  const testata = document.getElementById('testata');
  testata.outerHTML = `
    <div class="bar label"><p>Confezionate a mano <span class="bar__lungo">nel nostro negozio </span>a Bomporto · Consegna gratuita oltre ${SOGLIA_GRATIS} €</p></div>
    <header class="head" id="head">
      <div class="head__row">
        <div class="head__left">
          <button class="burger label" id="apri-menu" aria-expanded="false" aria-controls="menu">
            <span class="burger__icon" aria-hidden="true"><i></i><i></i></span><span>Menu</span>
          </button>
          <button class="label hide-s" data-apri-ricerca>Cerca</button>
        </div>
        <a class="logo-img" href="index.html"><img src="assets/img/logo-graziella.png" alt="Graziella Centro Sposi, home"></a>
        <div class="head__right">
          <a class="label hide-s" href="abiti.html#prova">059 819315</a>
          <button class="label bag-btn" id="apri-borsa" aria-controls="borsa">Borsa <span>(<span class="bag-btn__n" id="n-borsa">0</span>)</span></button>
        </div>
      </div>
      <nav class="head__cats label" aria-label="Sezioni">
        <a href="catalogo.html" data-mega="bomboniere" aria-haspopup="true" aria-expanded="false"${pagina === 'catalogo' || pagina === 'prodotto' ? ' aria-current="page"' : ''}>Bomboniere<i class="freccia" aria-hidden="true"></i></a>
        <a href="abiti.html" data-mega="abiti" aria-haspopup="true" aria-expanded="false"${pagina === 'abiti' ? ' aria-current="page"' : ''}>Abiti<i class="freccia" aria-hidden="true"></i></a>
        <a href="catalogo.html#offerte">Offerte</a>
        <a href="index.html#chi-siamo">Chi siamo</a>
        <a href="abiti.html#prova">Prenota la prova</a>
      </nav>
      <div class="mega" data-pannello="bomboniere">
        <div class="mega__in">
          <div class="mega__col">
            <p class="mega__tit label">Per evento</p>
            <ul class="mega__lista">${G.feste.map(f => `<li class="mega__riga"><a href="catalogo.html#${f.id}" data-voce="${f.id}"><span class="mega__sale"><i class="mega__filo" aria-hidden="true"></i><span class="mega__nome">${f.nome}</span></span><span class="mega__n">${perFesta(f.id).length}</span></a></li>`).join('')}</ul>
            <div class="mega__extra label"><a href="catalogo.html">Tutte le bomboniere</a><a href="prodotto.html#bacio">Il bigliettino personalizzato</a></div>
          </div>
          <div class="mega__vetrina">
            <div class="mega__vtesta"><p class="label" data-vtit></p><a class="link" data-vlink href="catalogo.html"></a></div>
            <div class="mega__pezzi" data-pezzi></div>
          </div>
          <figure class="mega__foto"><div class="mega__cornice"><img data-foto alt=""></div><figcaption class="label" data-cap></figcaption></figure>
        </div>
      </div>
      <div class="mega" data-pannello="abiti">
        <div class="mega__in">
          <div class="mega__col">
            <p class="mega__tit label">Abiti da sposa su misura</p>
            <ul class="mega__lista">
              <li class="mega__riga"><a href="abiti.html" data-voce=""><span class="mega__sale"><i class="mega__filo" aria-hidden="true"></i><span class="mega__nome">Tutti gli abiti</span></span><span class="mega__n">${G.abiti.length}</span></a></li>
              ${G.linee.map(l => `<li class="mega__riga"><a href="abiti.html#${l.id}" data-voce="${l.id}"><span class="mega__sale"><i class="mega__filo" aria-hidden="true"></i><span class="mega__nome">${l.nome}</span></span><span class="mega__n">${G.abiti.filter(x => x.linea === l.id).length}</span></a></li>`).join('')}
            </ul>
            <p class="mega__tit label" style="margin-top:22px">Anche per</p>
            <div class="mega__extra label" style="margin-top:8px">${G.categorieAbiti.slice(1).map(c => `<a href="${c.href}">${c.nome}</a>`).join('')}</div>
            <div class="mega__extra label"><a href="abiti.html#percorso">Dalla prova al sì</a><a href="abiti.html#prova">Prenota la prova</a></div>
          </div>
          <div class="mega__vetrina">
            <div class="mega__vtesta"><p class="label" data-vtit></p><a class="link" data-vlink href="abiti.html"></a></div>
            <div class="mega__pezzi mega__pezzi--abiti" data-pezzi></div>
          </div>
          <figure class="mega__foto mega__foto--atelier"><div class="mega__cornice"><img src="assets/abiti/prova-specchio.jpg" alt=""></div>
            <figcaption><span class="label">Sposi &amp; Sposi · Via Carlo Testa 6/B</span><span class="mega__tel">059 819315</span><a class="btn btn--line" href="abiti.html#prova">Prenota la prova</a></figcaption></figure>
        </div>
      </div>
    </header>
    <div class="mega-velo" id="mega-velo"></div>`;

  /* ---------- Mega menu: a sinistra le feste (o le linee), al centro tre pezzi che entrano a tendina, a destra la foto ---------- */
  const head = document.getElementById('head');
  const pannelli = [...head.querySelectorAll('.mega')];
  const velo = document.getElementById('mega-velo');
  const anima = () => window.gsap && !ridotto;
  const VOCI_MEGA = {
    bomboniere: id => {
      const f = festa(id), l = perFesta(id);
      return {
        tit: id === 'offerte' ? 'In offerta adesso' : `Le più scelte per ${(f.corto || f.nome).toLowerCase()}`,
        link: `catalogo.html#${id}`, linkTxt: `Tutte le ${l.length}`,
        foto: `assets/img/${f.foto}.webp`, cap: `${f.nome} · ${l.length} bomboniere`,
        pezzi: scelteDi(id).map(p => ({ href: `prodotto.html#${p.id}`, img: `assets/prodotti/${p.id}.webp`, nome: p.nome, sotto: `${p.prezzoPieno ? `<s>${euro(p.prezzoPieno)}</s> ` : ''}${euro(p.prezzo)}` }))
      };
    },
    abiti: id => {
      const l = id ? G.abiti.filter(a => a.linea === id) : G.abiti, nome = id ? G.linee.find(x => x.id === id).nome : '';
      return {
        tit: id ? `Linea ${nome}, su misura` : 'In atelier adesso', link: `abiti.html${id ? '#' + id : ''}`, linkTxt: `Vedi ${l.length === 1 ? "l'abito" : `${l.length} abiti`}`,
        pezzi: l.slice(0, 3).map(a => ({ href: `abiti.html${id ? '#' + id : ''}`, img: `assets/abiti/${a.id}.jpg`, nome: a.nome, sotto: 'Su misura' }))
      };
    }
  };
  function voceMega(p, id, entra) {
    const d = VOCI_MEGA[p.dataset.pannello](id);
    if (p.dataset.ora === id && !entra) return;
    p.dataset.ora = id;
    p.querySelectorAll('[data-voce]').forEach(a => a.classList.toggle('is-su', a.dataset.voce === id));
    p.querySelector('[data-vtit]').textContent = d.tit;
    const vl = p.querySelector('[data-vlink]'); vl.href = d.link; vl.textContent = d.linkTxt;
    const box = p.querySelector('[data-pezzi]');
    box.innerHTML = d.pezzi.map(x => `<a class="mega__pezzo" href="${x.href}"><span class="mega__campo"><img src="${x.img}" alt="" decoding="async"></span><span class="mega__pnome">${x.nome}</span><span class="mega__psotto">${x.sotto}</span></a>`).join('');
    const foto = p.querySelector('[data-foto]') || p.querySelector('.mega__cornice img');
    const nuovaFoto = !!d.foto && foto.getAttribute('src') !== d.foto;
    if (nuovaFoto) { foto.src = d.foto; p.querySelector('[data-cap]').textContent = d.cap; }
    if (!anima()) return;
    const campi = [...box.querySelectorAll('.mega__campo')], ogg = [...box.querySelectorAll('.mega__campo img')], testi = [...box.querySelectorAll('.mega__pnome, .mega__psotto')];
    gsap.fromTo(campi, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .9, stagger: .07, ease: 'expo.out', delay: entra ? .18 : 0 });
    gsap.fromTo(ogg, p.dataset.pannello === 'abiti' ? { scale: 1.2 } : { yPercent: 35 }, { scale: 1, yPercent: 0, duration: 1.1, stagger: .07, ease: 'expo.out', delay: entra ? .18 : 0 });
    gsap.fromTo(testi, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .6, stagger: .03, delay: (entra ? .18 : 0) + .2, ease: 'power3.out' });
    if (nuovaFoto || entra) {
      gsap.fromTo(foto.parentElement, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out', delay: entra ? .1 : 0 });
      gsap.fromTo(foto, { scale: 1.18, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.4, ease: 'expo.out', delay: entra ? .1 : 0 });
    }
  }
  /* Voce di partenza: la festa che stai guardando nel catalogo, se c'è */
  const festaIniziale = () => { const h = location.hash.slice(1); return pagina === 'catalogo' && G.feste.some(f => f.id === h) ? h : 'matrimonio'; };
  const lineaIniziale = () => { const h = location.hash.slice(1); return pagina === 'abiti' && G.linee.some(l => l.id === h) ? h : ''; };
  let chiudiDopo = 0, precaricato = false;
  function apriPannello(id) {
    clearTimeout(chiudiDopo);
    /* Alla prima apertura si caricano le foto di tutte le feste, così passando sulla lista appaiono subito */
    if (!precaricato) { precaricato = true; G.feste.forEach(f => { scelteDi(f.id).forEach(x => { new Image().src = `assets/prodotti/${x.id}.webp`; }); new Image().src = `assets/img/${f.foto}.webp`; }); }
    head.classList.add('is-aperto');
    velo.classList.add('is-on');
    pannelli.forEach(p => {
      const on = p.dataset.pannello === id;
      if (on && !p.classList.contains('is-on')) {
        voceMega(p, id === 'bomboniere' ? festaIniziale() : lineaIniziale(), true);
        if (anima()) {
          gsap.fromTo(p.querySelectorAll('.mega__sale'), { yPercent: 110 }, { yPercent: 0, duration: .8, stagger: .035, ease: 'expo.out', delay: .06 });
          gsap.fromTo(p.querySelectorAll('.mega__n, .mega__tit, .mega__extra, .mega__vtesta, .mega__foto figcaption'), { opacity: 0 }, { opacity: 1, duration: .6, stagger: .03, delay: .25 });
        }
      }
      p.classList.toggle('is-on', on);
    });
    head.querySelectorAll('[data-mega]').forEach(a => a.setAttribute('aria-expanded', String(a.dataset.mega === id)));
  }
  function chiudiPannelli() {
    head.classList.remove('is-aperto');
    velo.classList.remove('is-on');
    pannelli.forEach(p => { p.classList.remove('is-on'); p.querySelector('.mega__lista').removeAttribute('data-sopra'); });
    head.querySelectorAll('[data-mega]').forEach(a => a.setAttribute('aria-expanded', 'false'));
  }
  if (matchMedia('(hover: hover) and (min-width: 901px)').matches) {
    head.querySelectorAll('.head__cats a').forEach(a => a.addEventListener('mouseenter', () => a.dataset.mega ? apriPannello(a.dataset.mega) : chiudiPannelli()));
    head.querySelectorAll('[data-mega]').forEach(a => a.addEventListener('focus', () => apriPannello(a.dataset.mega)));
    head.addEventListener('mouseleave', () => { chiudiDopo = setTimeout(chiudiPannelli, 180); });
    head.addEventListener('mouseenter', () => clearTimeout(chiudiDopo));
    velo.addEventListener('mouseenter', chiudiPannelli);
    /* La voce sotto il mouse cambia i pezzi e la foto; un attimo di attesa evita lo sfarfallio passando veloci sulla lista */
    pannelli.forEach(p => {
      const lista = p.querySelector('.mega__lista');
      let attesa = 0;
      lista.addEventListener('pointerover', e => {
        const a = e.target.closest('[data-voce]'); if (!a) return;
        lista.setAttribute('data-sopra', '');
        p.querySelectorAll('[data-voce]').forEach(x => x.classList.toggle('is-punta', x === a));
        clearTimeout(attesa); attesa = setTimeout(() => voceMega(p, a.dataset.voce), 90);
      });
      lista.addEventListener('focusin', e => { const a = e.target.closest('[data-voce]'); if (a) voceMega(p, a.dataset.voce); });
      lista.addEventListener('pointerleave', () => { clearTimeout(attesa); lista.removeAttribute('data-sopra'); p.querySelectorAll('.is-punta').forEach(x => x.classList.remove('is-punta')); });
    });
  }
  addEventListener('keydown', e => { if (e.key === 'Escape') chiudiPannelli(); });

  /* ---------- Menu a sipario (Curtain Menu di HorizonX) ---------- */
  const VOCI = [
    { nome: 'Bomboniere', href: 'catalogo.html', foto: 'assets/img/statuette-bianche.webp', nota: `${G.prodotti.length} bomboniere online` },
    { nome: 'Abiti da sposa', href: 'abiti.html', foto: 'assets/abiti/velo-cattedrale.jpg', nota: 'Su misura, in atelier' },
    { nome: 'Prenota la prova', href: 'abiti.html#prova', foto: 'assets/abiti/prova-specchio.jpg', nota: 'Sposi & Sposi' },
    { nome: 'Offerte', href: 'catalogo.html#offerte', foto: 'assets/img/vetrina-cristallo.webp', nota: `${G.prodotti.filter(p => p.prezzoPieno).length} bomboniere in offerta` },
    { nome: 'Il negozio', href: 'index.html#negozio', foto: 'assets/img/showroom-travi.webp', nota: 'Via Carlo Testa, Bomporto' }
  ];
  document.body.insertAdjacentHTML('beforeend', `
    <div class="menu" id="menu" aria-hidden="true">
      <svg class="menu__sipario" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0,0 C250,0 750,0 1000,0 V0 H0 Z"/></svg>
      <div class="menu__panel" role="dialog" aria-modal="true" aria-label="Menu">
        <div class="menu__top" data-sale>
          <img class="menu__logo" src="assets/img/logo-graziella.png" alt="Graziella Centro Sposi">
          <button class="menu__close label" data-chiudi-menu>Chiudi <span aria-hidden="true">✕</span></button>
        </div>
        <div class="menu__corpo">
          <div class="menu__sx">
            <label class="menu__search" data-sale><span class="label fog">Cerca</span><input id="cerca" type="search" placeholder="Il bacio, angioletti, laurea…" autocomplete="off"></label>
            <ul class="menu__results" id="risultati"></ul>
            <ul class="menu__list">${VOCI.map((v, i) => `
              <li class="menu__riga"><a class="menu__item${i ? '' : ' is-su'}" href="${v.href}" data-voce="${i}"><span class="menu__sale"><i class="menu__filo" aria-hidden="true"></i><span>${v.nome}</span></span></a></li>`).join('')}
            </ul>
            <div class="menu__feste label" data-sale>${G.feste.filter(f => f.id !== 'offerte').map(f => `<a href="catalogo.html#${f.id}">${f.corto || f.nome}</a>`).join('')}</div>
          </div>
          <figure class="menu__carta" aria-hidden="true">
            ${VOCI.map((v, i) => `<img class="menu__scatto${i ? '' : ' is-su'}" src="${v.foto}" alt="" loading="lazy" decoding="async">`).join('')}
            <figcaption class="menu__didascalia label" id="menu-nota">${VOCI[0].nota}</figcaption>
          </figure>
        </div>
        <div class="menu__foot label" data-sale><span>Bomporto (MO)</span><span id="stato-menu"></span></div>
      </div>
    </div>`);

  const menu = document.getElementById('menu');
  const apriMenu = document.getElementById('apri-menu');
  const sipario = menu.querySelector('.menu__sipario path');
  const listaMenu = menu.querySelector('.menu__list');
  const carta = menu.querySelector('.menu__carta');
  const saliMenu = [...menu.querySelectorAll('.menu__sale, [data-sale]')];

  /* Il bordo del sipario: i lati scendono prima e il centro resta indietro; risalendo il centro pende sotto i lati */
  const curva = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const tracciaSipario = (p, piega) => {
    const y = Math.round(curva(p) * 1005 * 10) / 10;
    const c = Math.round((y - Math.sin(Math.PI * p) * piega) * 10) / 10;
    return `M0,${y} C250,${c} 750,${c} 1000,${y} V0 H0 Z`;
  };
  const disegnaSipario = (p, piega) => sipario.setAttribute('d', tracciaSipario(p, piega));
  const tenda = { p: 0 };
  let corsa = null, alzate = false;
  const animato = () => window.gsap && !ridotto;
  if (!animato()) menu.classList.add('is-fermo');

  function voceSu(i) {
    menu.querySelectorAll('.menu__item').forEach((a, n) => a.classList.toggle('is-su', n === i));
    menu.querySelectorAll('.menu__scatto').forEach((s, n) => s.classList.toggle('is-su', n === i));
    document.getElementById('menu-nota').textContent = VOCI[i].nota;
  }
  listaMenu.addEventListener('pointerover', e => { const a = e.target.closest('[data-voce]'); if (!a) return; voceSu(+a.dataset.voce); listaMenu.setAttribute('data-sopra', ''); });
  listaMenu.addEventListener('focusin', e => { const a = e.target.closest('[data-voce]'); if (a) { voceSu(+a.dataset.voce); listaMenu.setAttribute('data-sopra', ''); } });
  listaMenu.addEventListener('pointerleave', () => listaMenu.removeAttribute('data-sopra'));
  listaMenu.addEventListener('focusout', e => { if (!listaMenu.contains(e.relatedTarget)) listaMenu.removeAttribute('data-sopra'); });

  /* Le voci salgono dalle righe una dopo l'altra, poi entra la carta */
  function sali() {
    alzate = true;
    gsap.killTweensOf([saliMenu, carta]);
    gsap.fromTo(saliMenu, { yPercent: 130, opacity: 1 }, { yPercent: 0, duration: .76, stagger: .055, ease: 'expo.out' });
    gsap.fromTo(carta, { opacity: 0, y: 36, rotate: -10, scale: .92 }, { opacity: 1, y: 0, rotate: -4, scale: 1, duration: .9, delay: .16, ease: 'expo.out' });
  }
  function scendi() {
    alzate = false;
    gsap.killTweensOf([saliMenu, carta]);
    gsap.to(saliMenu, { yPercent: 130, duration: .28, stagger: { each: .018, from: 'end' }, ease: 'power2.in' });
    gsap.to(carta, { opacity: 0, y: 24, rotate: -8, scale: .95, duration: .3, ease: 'power2.in' });
  }
  function muoviTenda(verso) {
    corsa && corsa.kill();
    const dist = Math.abs(verso - tenda.p);
    corsa = gsap.to(tenda, {
      p: verso, duration: Math.max(.05, 1.1 * (verso ? 1 : .8) * dist), ease: 'none',
      onUpdate: () => {
        disegnaSipario(tenda.p, verso ? 260 : -260);
        if (verso && !alzate && tenda.p >= .55) sali();
      },
      onComplete: () => { disegnaSipario(verso, 0); if (!verso) { menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); } }
    });
  }
  if (animato()) { gsap.set(saliMenu, { yPercent: 130 }); gsap.set(carta, { opacity: 0 }); }

  function toggleMenu(apri, ricerca) {
    const aperto = apriMenu.getAttribute('aria-expanded') === 'true';
    if (apri === aperto) { if (apri && ricerca) document.getElementById('cerca').focus(); return; }
    apriMenu.setAttribute('aria-expanded', String(apri));
    const [a, b] = apriMenu.querySelectorAll('.burger__icon i');
    a.style.cssText = apri ? 'top:4px;transform:rotate(45deg)' : '';
    b.style.cssText = apri ? 'top:4px;transform:rotate(-45deg)' : '';
    if (lenis) apri ? lenis.stop() : lenis.start();
    if (apri) { menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false'); }
    if (!animato()) {
      disegnaSipario(apri ? 1 : 0, 0);
      if (!apri) { menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); }
    } else {
      if (!apri && alzate) scendi();
      muoviTenda(apri ? 1 : 0);
    }
    if (apri) setTimeout(() => (ricerca ? document.getElementById('cerca') : menu.querySelector('.menu__item')).focus({ preventScroll: true }), ricerca ? 600 : 450);
    else apriMenu.focus({ preventScroll: true });
  }
  apriMenu.addEventListener('click', () => toggleMenu(apriMenu.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('[data-chiudi-menu]').forEach(b => b.addEventListener('click', () => toggleMenu(false)));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  /* Con il menu aperto il Tab gira solo tra le sue voci */
  menu.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const f = [...menu.querySelectorAll('button, input, a[href]')].filter(x => x.offsetParent !== null);
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  });
  document.querySelectorAll('[data-apri-ricerca]').forEach(b => b.addEventListener('click', () => toggleMenu(true, true)));

  document.getElementById('cerca').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    const out = document.getElementById('risultati');
    if (q.length < 2) { out.innerHTML = ''; return; }
    const trovati = G.prodotti.filter(p =>
      (p.nome + ' ' + p.materiale + ' ' + p.feste.map(f => festa(f).nome).join(' ')).toLowerCase().includes(q)).slice(0, 5);
    out.innerHTML = trovati.length
      ? trovati.map(p => `<li><a href="prodotto.html#${p.id}"><img src="assets/prodotti/${p.id}.webp" alt=""><span>${p.nome}</span><span class="fog">${euro(p.prezzo)}</span></a></li>`).join('')
      : '<li class="fog" style="padding:12px 0">Nessuna bomboniera con questo nome. Chiedi in negozio: ne abbiamo circa 1.300.</li>';
    out.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  });

  /* ---------- Pannello borsa ---------- */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="bag" id="borsa" aria-hidden="true">
      <div class="bag__veil" data-chiudi-borsa></div>
      <aside class="bag__panel" role="dialog" aria-label="Borsa">
        <svg class="bag__orlo" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M100,0 L100,1000 Z"/></svg>
        <div class="bag__head"><span class="label">La tua borsa</span><button class="label" data-chiudi-borsa>Chiudi ✕</button></div>
        <ul class="bag__list" id="righe"></ul>
        <div class="bag__foot" id="piede-borsa"></div>
      </aside>
    </div>`);
  const pannello = document.getElementById('borsa');
  /* La borsa entra col bordo curvo, come il sipario del menu, e si distende arrivando; le righe salgono una dopo l'altra */
  const orloBorsa = pannello.querySelector('.bag__orlo path');
  const curvaBorsa = { k: 0 };
  const disegnaOrloBorsa = () => { const x = (100 - curvaBorsa.k * 100).toFixed(1); orloBorsa.setAttribute('d', `M100,0 C${x},300 ${x},700 100,1000 Z`); };
  function toggleBorsa(apri) {
    pannello.classList.toggle('is-open', apri);
    pannello.setAttribute('aria-hidden', String(!apri));
    if (lenis) apri ? lenis.stop() : lenis.start();
    if (!window.gsap || ridotto) return;
    gsap.killTweensOf(curvaBorsa);
    gsap.fromTo(curvaBorsa, { k: 1 }, { k: 0, duration: apri ? 1.1 : .7, ease: apri ? 'expo.out' : 'power2.out', onUpdate: disegnaOrloBorsa });
    if (apri) gsap.fromTo(pannello.querySelectorAll('.bag__item, .bag__empty, .bag__foot > *'), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .7, stagger: .05, delay: .2, ease: 'power3.out', clearProps: 'opacity,transform' });
  }
  document.getElementById('apri-borsa').addEventListener('click', () => toggleBorsa(true));
  pannello.querySelectorAll('[data-chiudi-borsa]').forEach(b => b.addEventListener('click', () => toggleBorsa(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') { toggleBorsa(false); toggleMenu(false); } });

  function disegnaBorsa() {
    document.getElementById('n-borsa').textContent = pezzi();
    const righe = document.getElementById('righe');
    const piede = document.getElementById('piede-borsa');
    if (!borsa.length) {
      righe.innerHTML = '<li class="bag__empty"><p class="h-m" style="color:var(--ink)">La borsa è vuota.</p><p>Scegli prima l’evento: ti mostriamo solo le bomboniere adatte.</p><a class="link" href="catalogo.html">Vai alle bomboniere</a></li>';
      piede.innerHTML = '';
      return;
    }
    righe.innerHTML = borsa.map((r, i) => {
      const p = prodotto(r.id), c = CONFEZIONI.find(x => x.id === r.conf);
      return `<li class="bag__item">
        <a href="prodotto.html#${p.id}"><img src="assets/prodotti/${p.id}.webp" alt=""></a>
        <div>
          <h3>${p.nome}</h3>
          <p>${c.nome}${r.nomi ? ' · “' + r.nomi + '”' : ''}</p>
          <p>${euro(p.prezzo + c.extra)} al pezzo</p>
          <div class="qty" data-riga="${i}"><button data-d="-1" aria-label="Meno">−</button><input value="${r.qty}" inputmode="numeric" aria-label="Quantità"><button data-d="1" aria-label="Più">+</button></div>
          <div><button class="bag__rm" data-togli="${i}">Togli</button></div>
        </div>
        <p class="bag__price">${euro(prezzoRiga(r))}</p>
      </li>`;
    }).join('');
    const totale = borsa.reduce((s, r) => s + prezzoRiga(r), 0);
    const giorni = Math.max(...borsa.map(r => prodotto(r.id).giorni));
    const manca = SOGLIA_GRATIS - totale;
    piede.innerHTML = `
      <div class="spedizione"><p class="bag__note">${manca > 0 ? `Ti mancano <b>${euro(manca)}</b> per la consegna gratuita` : '<b>Consegna gratuita</b> in tutta Italia'}</p><div class="spedizione__barra" aria-hidden="true"><i style="transform:scaleX(${Math.min(1, totale / SOGLIA_GRATIS).toFixed(3)})"></i></div></div>
      <div class="bag__row"><span class="label">Totale</span><span>${euro(totale)}</span></div>
      <p class="bag__note">Pronte in ${giorni} giorni lavorativi. Ritiro gratuito a Bomporto, oppure spedizione gratuita oltre ${SOGLIA_GRATIS} €. <a class="link" href="spedizioni.html">Condizioni di trasporto</a></p>
      <button class="btn btn--full" type="button">Procedi all'ordine</button>
      ${PAGAMENTI}
      <p class="bag__note">Anteprima del nuovo sito: il pagamento sarà attivo con il negozio online.</p>`;
    bottoni(piede);
    righe.querySelectorAll('.qty').forEach(q => {
      const r = borsa[+q.dataset.riga];
      const set = v => { r.qty = Math.max(minimoDi(r.id), v || minimoDi(r.id)); salva(); disegnaBorsa(); };
      q.querySelectorAll('button').forEach(b => b.addEventListener('click', () => set(r.qty + (+b.dataset.d) * 5)));
      q.querySelector('input').addEventListener('change', e => set(parseInt(e.target.value, 10)));
    });
    righe.querySelectorAll('[data-togli]').forEach(b => b.addEventListener('click', () => { borsa.splice(+b.dataset.togli, 1); salva(); disegnaBorsa(); }));
  }
  disegnaBorsa();

  /* La copia dell'oggetto vola dalla card al contatore della borsa. */
  function volaInBorsa(img) {
    const n = document.getElementById('n-borsa');
    if (!img || !window.gsap || ridotto) { n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); return; }
    const da = img.getBoundingClientRect(), a = n.getBoundingClientRect();
    let copia;
    if (img.tagName === 'CANVAS') { copia = new Image(); copia.src = img.toDataURL(); } else copia = img.cloneNode();
    copia.className = 'flyer';
    Object.assign(copia.style, { left: da.left + 'px', top: da.top + 'px', width: da.width + 'px', height: da.height + 'px' });
    document.body.appendChild(copia);
    const dx = a.left + a.width / 2 - (da.left + da.width / 2), dy = a.top + a.height / 2 - (da.top + da.height / 2);
    gsap.timeline({ onComplete: () => { copia.remove(); n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump'); } })
      .to(copia, { x: dx, duration: .9, ease: 'power2.inOut' }, 0)
      .to(copia, { y: dy, duration: .9, ease: 'back.in(1.4)' }, 0)
      .to(copia, { scale: .08, rotate: -12, duration: .9, ease: 'power3.in' }, 0)
      .to(copia, { opacity: 0, duration: .15 }, .78);
  }

  /* ---------- Bottoni vivi (Interactive Hover Button di HorizonX) ----------
     Solo i bottoni con una scritta semplice: quelli con parti che cambiano (es. il totale) restano com'erano. */
  function bottoni(scope = document) {
    scope.querySelectorAll('.btn:not(.is-vivo)').forEach(b => {
      if (b.children.length) return;
      const testo = b.textContent.trim();
      if (!testo) return;
      b.classList.add('is-vivo');
      b.textContent = '';
      const riposo = document.createElement('span');
      riposo.className = 'btn__riposo'; riposo.textContent = testo;
      const cambio = document.createElement('span');
      cambio.className = 'btn__cambio'; cambio.setAttribute('aria-hidden', 'true'); cambio.textContent = testo;
      cambio.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"/></svg>');
      b.prepend(Object.assign(document.createElement('span'), { className: 'btn__dot' }));
      b.append(riposo, cambio);
      b.firstChild.setAttribute('aria-hidden', 'true');
    });
  }

  /* ---------- Card ---------- */
  function card(p) {
    const qui = document.body.dataset.festa;
    const f = festa(p.feste.includes(qui) ? qui : p.feste[0]);
    return `<article class="card" data-id="${p.id}">
      <div class="card__media"><a class="card__field" href="prodotto.html#${p.id}">
        ${p.prezzoPieno ? '<span class="card__tag">Offerta</span>' : ''}
        <img src="assets/prodotti/${p.id}.webp" alt="${p.nome}, ${p.materiale.toLowerCase()}" loading="lazy">
      </a>
      <button class="card__add" data-aggiungi="${p.id}">Aggiungi ${p.minimo || MINIMO} pezzi</button></div>
      <div class="card__meta"><h3><a href="prodotto.html#${p.id}">${p.nome}</a></h3><p class="price">${p.prezzoPieno ? `<s>${euro(p.prezzoPieno)}</s>` : ''}${euro(p.prezzo)}</p></div>
      <p class="card__sub">${f.corto || f.nome} · ${p.materiale}</p>
    </article>`;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-aggiungi]');
    if (!b) return;
    aggiungi(b.dataset.aggiungi);
    volaInBorsa(b.closest('.card').querySelector('img'));
  });

  /* ---------- Piede ---------- */
  function stato(orari = G.orari) {
    const ora = new Date(), g = ora.getDay(), h = ora.getHours() + ora.getMinutes() / 60;
    const fmt = x => `${Math.floor(x)}:${String(Math.round((x % 1) * 60)).padStart(2, '0')}`;
    const fascia = (orari[g] || []).find(([a, b]) => h >= a && h < b);
    if (fascia) return { aperto: true, testo: `Aperto ora, fino alle ${fmt(fascia[1])}` };
    for (let k = 0; k < 7; k++) {
      const gg = (g + k) % 7;
      const prossima = (orari[gg] || []).find(([a]) => k > 0 || a > h);
      if (prossima) {
        const nome = k === 0 ? 'oggi' : k === 1 ? 'domani' : ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'][gg];
        return { aperto: false, testo: `Chiuso, riapre ${nome} alle ${fmt(prossima[0])}` };
      }
    }
    return { aperto: false, testo: 'Chiuso' };
  }
  const st = stato();
  document.getElementById('stato-menu').textContent = st.testo;
  const piede = document.getElementById('piede');
  if (piede) piede.outerHTML = `
    <footer class="foot">
      <div class="wrap">
        <div class="foot__top">
          <div>
            <img class="foot__logo" src="assets/img/logo-graziella.png" alt="Graziella Centro Sposi">
            <p class="h-m" style="max-width:16ch;margin-top:28px">Vieni a vederle dal vivo, prima di scegliere.</p>
            <p class="foot__status label"><span class="foot__dot${st.aperto ? '' : ' is-closed'}"></span>${st.testo}</p>
            <a class="premio" href="${G.premi.url}" target="_blank" rel="noopener"><span class="premio__fonte label">Matrimonio.com</span><span class="premio__tit">${G.premi.awards} Wedding Awards</span><span class="premio__sotto">dal ${G.premi.dal} · voto ${G.premi.voto} su 5</span></a>
          </div>
          <div><h4 class="label">Bomboniere</h4><ul>${G.feste.map(f => `<li><a href="catalogo.html#${f.id}">${f.nome}</a></li>`).join('')}</ul></div>
          <div><h4 class="label">Abiti</h4><ul>
            ${G.categorieAbiti.map(c => `<li><a href="${c.href}">${c.nome}</a></li>`).join('')}
            <li><a href="abiti.html#prova">Prenota la prova</a></li></ul></div>
          <div class="foot__contatti"><h4 class="label">I due negozi</h4>
            <div><b>Bomboniere Graziella</b><span>Via Carlo Testa 4, Bomporto (MO)</span><a class="foot__tel" href="tel:+39059909858">059 909858</a><span class="foot__orari">${G.orariTesto.bomboniere}</span></div>
            <div><b>Sposi &amp; Sposi</b><span>Via Carlo Testa 6/B, Bomporto (MO)</span><a class="foot__tel" href="tel:+39059819315">059 819315</a><span class="foot__orari">${G.orariTesto.abiti}</span></div>
            <p class="foot__orari">${G.orariTesto.domenica}</p>
            <form class="foot__news" onsubmit="event.preventDefault();this.querySelector('button').textContent='Grazie'"><input type="email" placeholder="Email per le novità" aria-label="Email" required><button class="label">Iscriviti</button></form>
          </div>
        </div>
        <div class="foot__pagamenti">${PAGAMENTI}</div>
        <div class="foot__bottom label"><span>© Graziella Centro Sposi</span><a href="spedizioni.html">Condizioni di trasporto</a><span>Anteprima del nuovo sito · novembre 2026</span></div>
      </div>
    </footer>`;

  /* ---------- Il piede si scopre: la pagina sale come un sipario con l'orlo curvo e lascia vedere il piede fermo sotto ---------- */
  const piedeEl = document.querySelector('.foot');
  const mainEl = document.querySelector('main');
  let orlo = null;
  if (piedeEl && mainEl) {
    mainEl.classList.add('pagina');
    mainEl.insertAdjacentHTML('beforeend', '<svg class="orlo" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0,0 C250,100 750,100 1000,0 Z"/></svg>');
    orlo = mainEl.querySelector('.orlo path');
  }

  /* ---------- Passaggio tra le pagine: lo stesso sipario del menu scende, la pagina nuova lo vede risalire ---------- */
  document.body.insertAdjacentHTML('beforeend', `<div class="passaggio" id="passaggio" aria-hidden="true">
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false"><path d="M0,0 C250,0 750,0 1000,0 V0 H0 Z"/></svg>
    <img class="passaggio__logo" src="assets/img/logo-graziella.png" alt=""></div>`);
  const passaggio = document.getElementById('passaggio');
  const tendaPagina = passaggio.querySelector('path');
  const logoPassaggio = passaggio.querySelector('.passaggio__logo');
  const CHIAVE_PASSAGGIO = 'graziella-passaggio';
  const pagina1 = u => u.pathname.replace(/\/$/, '/index.html');
  /* Catalogo e scheda si ricaricano quando cambia il # (altra festa, altro prodotto): anche lì passa il sipario */
  const ricaricaSuHash = ['catalogo', 'prodotto'].includes(pagina);

  function arrivo() {
    let arrivato = false;
    try { arrivato = sessionStorage.getItem(CHIAVE_PASSAGGIO) === '1'; sessionStorage.removeItem(CHIAVE_PASSAGGIO); } catch (e) {}
    document.documentElement.classList.remove('in-passaggio');
    if (!arrivato || !window.gsap || ridotto) return;
    const t = { p: 1 };
    tendaPagina.setAttribute('d', tracciaSipario(1, 0));
    passaggio.classList.add('is-su');
    gsap.set(logoPassaggio, { opacity: 1 });
    gsap.timeline({ onComplete: () => passaggio.classList.remove('is-su') })
      .to(logoPassaggio, { opacity: 0, y: -14, duration: .35, ease: 'power2.in' }, .1)
      .to(t, { p: 0, duration: .95, ease: 'none', onUpdate: () => tendaPagina.setAttribute('d', tracciaSipario(t.p, -220)) }, .25);
  }
  function parti(url) {
    try { sessionStorage.setItem(CHIAVE_PASSAGGIO, '1'); } catch (e) {}
    if (lenis) lenis.stop();
    const t = { p: 0 };
    passaggio.classList.add('is-su');
    /* Se il browser ferma le animazioni (scheda in secondo piano) si cambia pagina lo stesso */
    let andato = false;
    const vai = () => { if (andato) return; andato = true; location.href = url; };
    setTimeout(vai, 1300);
    gsap.timeline({ onComplete: vai })
      .to(t, { p: 1, duration: .8, ease: 'none', onUpdate: () => tendaPagina.setAttribute('d', tracciaSipario(t.p, 220)) })
      .fromTo(logoPassaggio, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out' }, .45);
  }
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!window.gsap || ridotto) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
    if (pagina1(url) === pagina1(location)) {
      if (!ricaricaSuHash || url.hash === location.hash) return;
    }
    e.preventDefault();
    parti(url.href);
  });
  /* Tornando indietro la pagina può uscire dalla cache con il sipario ancora giù */
  addEventListener('pageshow', e => {
    if (!e.persisted) return;
    passaggio.classList.remove('is-su');
    tendaPagina.setAttribute('d', tracciaSipario(0, 0));
    if (lenis) lenis.start();
  });

  /* ---------- Scroll morbido + animazioni d'entrata ---------- */
  let lenis = null;
  if (window.Lenis && !ridotto) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* La testata si nasconde scendendo e torna risalendo. */
  let ultimo = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (!document.body.dataset.testataFissa) head.classList.toggle('is-hidden', y > 260 && y > ultimo);
    ultimo = y;
  }, { passive: true });

  function entrate(scope = document) {
    bottoni(scope);
    if (!window.gsap || ridotto) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);
    scope.querySelectorAll('[data-split]:not(.is-split)').forEach(el => {
      el.classList.add('is-split');
      if (!window.SplitText) return;
      const s = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'riga' });
      /* Un titolo già sul bordo basso all'apertura non resta vuoto in attesa dello scroll */
      const giaVisibile = el.getBoundingClientRect().top < innerHeight;
      gsap.from(s.lines, { yPercent: 105, duration: 1.1, stagger: .09, ease: 'power4.out', scrollTrigger: { trigger: el, start: giaVisibile ? 'top bottom' : 'top 88%', once: true } });
    });
    const tutte = [...scope.querySelectorAll('.card:not(.is-in)')];
    tutte.forEach(c => c.classList.add('is-in'));
    /* Le card nascoste dai filtri entrano poi con il Flip del catalogo */
    const cards = tutte.filter(c => !c.hidden);
    /* Le vetrine si aprono come tendine (lo stesso gesto delle foto del negozio in home): la cornice scopre dall'alto, l'oggetto sale */
    if (cards.length) {
      const cornici = c => c.map(x => x.querySelector('.card__media'));
      const oggetti = c => c.map(x => x.querySelector('.card__field img'));
      const testi = c => c.map(x => [x.querySelector('.card__meta'), x.querySelector('.card__sub')]).flat().filter(Boolean);
      gsap.set(cornici(cards), { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(oggetti(cards), { yPercent: 40 });
      gsap.set(testi(cards), { opacity: 0, y: 14 });
      ScrollTrigger.batch(cards, { start: 'top 92%', once: true, onEnter: b => {
        gsap.to(cornici(b), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, stagger: .08, ease: 'expo.out', clearProps: 'clipPath' });
        gsap.to(oggetti(b), { yPercent: 0, duration: 1.4, stagger: .08, ease: 'expo.out', clearProps: 'transform' });
        gsap.to(testi(b), { opacity: 1, y: 0, duration: .9, stagger: .04, delay: .25, ease: 'power3.out', clearProps: 'opacity,transform' });
      } });
    }
    scope.querySelectorAll('[data-fade]').forEach(el => gsap.from(el, { opacity: 0, y: 24, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  }


  /* ---------- Profondità: card che si inclinano, nastri che corrono con lo scroll, bottoni magnetici ---------- */
  const mouse = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (mouse && !ridotto) {
    document.addEventListener('pointermove', e => {
      const m = e.target.closest('.card__media, [data-tilt]');
      document.querySelectorAll('.is-tilt').forEach(x => { if (x !== m) { x.classList.remove('is-tilt'); x.style.removeProperty('--rx'); x.style.removeProperty('--ry'); } });
      if (!m) return;
      const r = m.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      m.classList.add('is-tilt');
      m.style.setProperty('--rx', (-py * 9).toFixed(2) + 'deg');
      m.style.setProperty('--ry', (px * 11).toFixed(2) + 'deg');
      m.style.setProperty('--lx', ((px + .5) * 100).toFixed(1) + '%');
      m.style.setProperty('--ly', ((py + .5) * 100).toFixed(1) + '%');
    }, { passive: true });
    document.addEventListener('pointerleave', () => document.querySelectorAll('.is-tilt').forEach(x => x.classList.remove('is-tilt')));
    document.addEventListener('pointermove', e => {
      const b = e.target.closest('.btn');
      document.querySelectorAll('.btn.is-mag').forEach(x => { if (x !== b) { x.classList.remove('is-mag'); x.style.transform = ''; } });
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.classList.add('is-mag');
      b.style.transform = `translate(${((e.clientX - r.left) / r.width - .5) * 10}px, ${((e.clientY - r.top) / r.height - .5) * 8}px)`;
    }, { passive: true });
  }

  function nastri(scope = document) {
    const tracce = [...scope.querySelectorAll('.nastro__track')];
    if (!tracce.length || !window.gsap || ridotto) return;
    const stato = tracce.map(t => ({ t, x: 0, dir: t.closest('[data-verso="destra"]') ? 1 : -1 }));
    let verso = 1;
    gsap.ticker.add((time, delta) => {
      const v = lenis ? lenis.velocity : 0;
      if (Math.abs(v) > .5) verso = v > 0 ? 1 : -1;
      const passo = (0.9 + Math.min(Math.abs(v) * .5, 14)) * (delta / 16.67);
      stato.forEach(o => {
        const w = o.t.scrollWidth / 2;
        o.x += passo * o.dir * verso;
        if (o.x < -w) o.x += w; if (o.x > 0) o.x -= w;
        o.t.style.transform = `translate3d(${o.x.toFixed(1)}px,0,0) skewX(${(-v * .35 * o.dir).toFixed(2)}deg)`;
      });
    });
  }
  nastri();

  /* ---------- Cursore con etichetta: compare solo sulle immagini che si aprono (card, abiti, porte, eventi, fila da trascinare) ---------- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && window.gsap && !ridotto) {
    const ETICHETTE = [['#rail', 'Trascina'], ['.card__media', 'Vedi'], ['.abito__media', 'Prova'], ['.porta', 'Entra'], ['.col', 'Scegli'], ['.mega__pezzo', 'Vedi'], ['.gal__main:not(.is-3d)', 'Zoom']];
    const cursore = document.createElement('div');
    cursore.className = 'cursore'; cursore.setAttribute('aria-hidden', 'true');
    cursore.innerHTML = '<span class="cursore__testo"></span>';
    document.body.appendChild(cursore);
    const testo = cursore.firstChild;
    const muoviX = gsap.quickTo(cursore, 'x', { duration: .45, ease: 'power3.out' }), muoviY = gsap.quickTo(cursore, 'y', { duration: .45, ease: 'power3.out' });
    let attuale = '';
    document.addEventListener('pointermove', e => {
      muoviX(e.clientX); muoviY(e.clientY);
      const trovata = ETICHETTE.find(([sel]) => e.target.closest(sel) && !e.target.closest('button, .btn, input, select'));
      const nuova = trovata ? trovata[1] : '';
      if (nuova === attuale) return;
      attuale = nuova;
      if (nuova) testo.textContent = nuova;
      cursore.classList.toggle('is-on', !!nuova);
      document.documentElement.classList.toggle('cursore-su', !!nuova);
    }, { passive: true });
    document.addEventListener('pointerleave', () => { attuale = ''; cursore.classList.remove('is-on'); document.documentElement.classList.remove('cursore-su'); });
  }

  /* ---------- Grana leggera da pellicola su tutto il sito: una tessera di rumore disegnata una volta ---------- */
  (() => {
    const c = document.createElement('canvas'); c.width = c.height = 160;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const img = ctx.createImageData(160, 160);
    for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
    ctx.putImageData(img, 0, 0);
    document.documentElement.style.setProperty('--grana', `url(${c.toDataURL('image/png')})`);
    document.body.classList.add('con-grana');
  })();

  bottoni();
  arrivo();
  /* L'orlo curvo della pagina si distende mentre il piede si scopre; su PC il piede è fermo sotto e sale appena */
  if (orlo && window.gsap && window.ScrollTrigger && !ridotto) {
    gsap.registerPlugin(ScrollTrigger);
    const fermo = matchMedia('(min-width: 901px) and (min-height: 640px)').matches;
    /* refreshPriority bassa: l'orlo si misura dopo le sezioni bloccate delle pagine (es. il percorso degli abiti), che allungano la pagina */
    const corsa = () => ({ trigger: mainEl, start: 'bottom bottom', end: () => `bottom ${Math.round(fermo ? innerHeight - piedeEl.offsetHeight + 4 : innerHeight * .45)}px`, scrub: true, invalidateOnRefresh: true, refreshPriority: -10 });
    const k = { v: 1 };
    gsap.to(k, { v: 0, ease: 'none', scrollTrigger: corsa(), onUpdate: () => { const c = (k.v * 120).toFixed(1); orlo.setAttribute('d', `M0,0 C250,${c} 750,${c} 1000,0 Z`); } });
    if (fermo) gsap.fromTo(piedeEl.querySelector('.wrap'), { yPercent: -14 }, { yPercent: 0, ease: 'none', scrollTrigger: corsa() });
  }
  /* ---------- File orizzontali (telefono e tablet): si scorrono col dito o con le frecce e la pagina non si blocca mai.
     Le frecce fanno scivolare la fila con una curva morbida, la foto dentro ogni scheda si sposta appena (parallasse),
     la scheda in primo piano è piena e le vicine restano un passo indietro. ---------- */
  function fila(pista, { voci = pista, prima, dopo, barra, parallasse = 9 } = {}) {
    const schede = () => [...voci.children];
    const max = () => Math.max(0, pista.scrollWidth - pista.clientWidth);
    const inizio = () => parseFloat(getComputedStyle(voci).paddingLeft) || 0;
    const posizioni = () => { const b = pista.getBoundingClientRect().left - pista.scrollLeft + inizio(); return schede().map(s => Math.min(max(), Math.max(0, s.getBoundingClientRect().left - b))); };
    let corsa = null, attesa = 0;
    const segna = () => {
      const m = max(), x = pista.scrollLeft;
      if (barra) barra.style.transform = `translateX(${(m ? x / m : 0) * 233}%)`;
      if (prima) prima.disabled = x < 4;
      if (dopo) dopo.disabled = x > m - 4;
      const centro = pista.getBoundingClientRect().left + pista.clientWidth / 2, largo = pista.clientWidth;
      const pos = posizioni(), qui = pos.reduce((k, p, i) => Math.abs(p - x) < Math.abs(pos[k] - x) ? i : k, 0);
      schede().forEach((s, i) => {
        s.classList.add('fila-voce');
        s.classList.toggle('is-qui', i === qui);
        const foto = parallasse && s.querySelector('img');
        if (!foto || ridotto) return;
        const b = s.getBoundingClientRect(), d = (b.left + b.width / 2 - centro) / largo;
        foto.style.transform = `translate3d(${(-d * parallasse).toFixed(2)}%, 0, 0) scale(1.14)`;
      });
    };
    const ferma = () => { if (corsa) { corsa.kill(); corsa = null; pista.style.scrollSnapType = ''; } };
    const vai = verso => {
      const pos = posizioni(), x = pista.scrollLeft;
      const qui = pos.reduce((k, p, i) => Math.abs(p - x) < Math.abs(pos[k] - x) ? i : k, 0);
      const meta = pos[Math.min(pos.length - 1, Math.max(0, qui + verso))];
      ferma();
      if (window.gsap && !ridotto) {
        /* Durante la corsa l'aggancio è spento, altrimenti il browser tira la fila a scatti */
        pista.style.scrollSnapType = 'none';
        corsa = gsap.to(pista, { scrollLeft: meta, duration: .95, ease: 'power3.inOut', onUpdate: segna, onComplete: () => { corsa = null; pista.style.scrollSnapType = ''; } });
      } else pista.scrollTo({ left: meta, behavior: ridotto ? 'auto' : 'smooth' });
    };
    if (prima) prima.addEventListener('click', () => vai(-1));
    if (dopo) dopo.addEventListener('click', () => vai(1));
    pista.addEventListener('pointerdown', ferma, { passive: true });
    pista.addEventListener('touchstart', ferma, { passive: true });
    pista.addEventListener('scroll', () => { cancelAnimationFrame(attesa); attesa = requestAnimationFrame(segna); }, { passive: true });
    addEventListener('resize', segna);
    pista.classList.add('fila');
    schede().forEach(s => s.classList.add('fila-voce'));
    if (parallasse) pista.classList.add('fila--parallasse');
    segna();
    return { vai, segna };
  }

  window.Negozio = { G, euro, prodotto, festa, card, aggiungi, volaInBorsa, entrate, bottoni, toggleBorsa, fila, stato, CONFEZIONI, MINIMO, SOGLIA_GRATIS, PAGAMENTI, get lenis() { return lenis; } };
})();

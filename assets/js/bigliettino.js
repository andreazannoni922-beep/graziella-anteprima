/* Personalizzazione del bigliettino: carta, inchiostro, carattere, forma, simbolo e nastro.
   Disegna l'etichetta su un canvas e la applica a una scatolina 3D (Three.js) che si gira col mouse. */
(function () {
  const CARTE = [
    { id: 'bianco', nome: 'Bianco', hex: '#FFFFFF' },
    { id: 'avorio', nome: 'Avorio', hex: '#F3ECDC' },
    { id: 'cipria', nome: 'Cipria', hex: '#EBD3CD' },
    { id: 'azzurro', nome: 'Azzurro polvere', hex: '#D2DEE8' },
    { id: 'salvia', nome: 'Salvia', hex: '#D3DCCB' },
    { id: 'nero', nome: 'Nero', hex: '#1B1B1A' }
  ];
  const INCHIOSTRI = [
    { id: 'oro', nome: 'Oro', hex: '#AE8A4E' },
    { id: 'argento', nome: 'Argento', hex: '#9A9CA1' },
    { id: 'nero', nome: 'Nero', hex: '#161616' },
    { id: 'bianco', nome: 'Bianco', hex: '#FFFFFF' },
    { id: 'bordeaux', nome: 'Bordeaux', hex: '#6B1E2A' },
    { id: 'blu', nome: 'Blu notte', hex: '#1F2A45' }
  ];
  const FONT = [
    { id: 'classico', nome: 'Classico', css: "'Tenor Sans', serif" },
    { id: 'serif', nome: 'Serif', css: "'Cormorant Garamond', serif", peso: 500 },
    { id: 'calligrafico', nome: 'Calligrafico', css: "'Great Vibes', cursive", scala: 1.35 },
    { id: 'moderno', nome: 'Moderno', css: "'Josefin Sans', sans-serif" },
    { id: 'romano', nome: 'Romano', css: "'Cinzel', serif", peso: 500, scala: .9 }
  ];
  const FORME = [
    { id: 'tondo', nome: 'Tondo' }, { id: 'ovale', nome: 'Ovale' },
    { id: 'quadrato', nome: 'Quadrato' }, { id: 'cuore', nome: 'Cuore' }
  ];
  const SIMBOLI = [
    { id: 'e', nome: '&' }, { id: 'iniziali', nome: 'Iniziali' },
    { id: 'cuore', nome: 'Cuore' }, { id: 'nessuno', nome: 'Nessuno' }
  ];
  const NASTRI = [
    { id: 'bianco', nome: 'Raso bianco', hex: '#F4F2EC' },
    { id: 'tortora', nome: 'Tortora', hex: '#B5A898' },
    { id: 'cipria', nome: 'Cipria', hex: '#DDB5AD' },
    { id: 'salvia', nome: 'Salvia', hex: '#9FAE95' },
    { id: 'oro', nome: 'Oro', hex: '#C6A465' },
    { id: 'blu', nome: 'Blu notte', hex: '#25304B' },
    { id: 'bordeaux', nome: 'Bordeaux', hex: '#6B1E2A' }
  ];
  /* Scatole: i 3 tipi veri mandati da Enrico nel gruppo (03/11/2026), con le loro foto */
  const SCATOLE = [
    { id: 'bianca', nome: 'Bianca', hex: '#F4F1EA', foto: 'assets/img/scatola-bianca.webp' },
    { id: 'avorio', nome: 'Avorio', hex: '#EFE5CC', foto: 'assets/img/scatola-avorio.webp' },
    { id: 'avana', nome: 'Ondulato avana', hex: '#B8955F', foto: 'assets/img/scatola-avana.webp', riga: 'scatola in ondulato avana' }
  ];
  const NASTRO_TESTO = [{ id: 'liscio', nome: 'Liscio' }, { id: 'nomi', nome: 'Con i vostri nomi' }];
  const CONFETTI = [{ id: 'classici', nome: 'Classici' }, { id: 'nomi', nome: 'Con i vostri nomi' }];
  const trova = (lista, id) => lista.find(x => x.id === id) || lista[0];

  const stato = { nomi: '', data: '', frase: '', carta: 'avorio', inchiostro: 'oro', font: 'calligrafico', forma: 'tondo', simbolo: 'e', nastro: 'salvia', scatola: 'bianca', nastroTesto: 'liscio', confetti: 'classici' };
  const esempio = { nomi: 'Giulia e Marco', data: '14 giugno 2027' };

  /* ---------- Etichetta su canvas ---------- */
  const S = 1024;
  const tela = document.createElement('canvas');
  tela.width = tela.height = S;
  const ctx = tela.getContext('2d');

  function percorso(c, forma, k) {
    const m = S / 2;
    c.beginPath();
    if (forma === 'tondo') c.arc(m, m, S * .46 * k, 0, Math.PI * 2);
    else if (forma === 'ovale') c.ellipse(m, m, S * .48 * k, S * .34 * k, 0, 0, Math.PI * 2);
    else if (forma === 'quadrato') { const l = S * .84 * k; c.rect(m - l / 2, m - l / 2, l, l); }
    else {
      const w = S * .92 * k, top = m - S * .3 * k;
      c.moveTo(m, top + w * .22);
      c.bezierCurveTo(m, top, m - w * .5, top - w * .06, m - w * .5, top + w * .26);
      c.bezierCurveTo(m - w * .5, top + w * .52, m - w * .12, top + w * .66, m, top + w * .8);
      c.bezierCurveTo(m + w * .12, top + w * .66, m + w * .5, top + w * .52, m + w * .5, top + w * .26);
      c.bezierCurveTo(m + w * .5, top - w * .06, m, top, m, top + w * .22);
    }
    c.closePath();
  }
  function cuoricino(c, x, y, r) {
    c.beginPath();
    c.moveTo(x, y + r * .35);
    c.bezierCurveTo(x, y - r * .2, x - r, y - r * .2, x - r, y + r * .25);
    c.bezierCurveTo(x - r, y + r * .7, x - r * .2, y + r * .95, x, y + r * 1.2);
    c.bezierCurveTo(x + r * .2, y + r * .95, x + r, y + r * .7, x + r, y + r * .25);
    c.bezierCurveTo(x + r, y - r * .2, x, y - r * .2, x, y + r * .35);
    c.fill();
  }
  function riga(testo, y, px, larghezza, f, spaziatura) {
    let size = px * (f.scala || 1);
    ctx.letterSpacing = spaziatura || '0px';
    ctx.font = `${f.peso || 400} ${size}px ${f.css}`;
    while (ctx.measureText(testo).width > larghezza && size > 12) { size -= 2; ctx.font = `${f.peso || 400} ${size}px ${f.css}`; }
    ctx.fillText(testo, S / 2, y);
  }

  function disegna() {
    const carta = trova(CARTE, stato.carta).hex, ink = trova(INCHIOSTRI, stato.inchiostro).hex, f = trova(FONT, stato.font);
    const cuore = stato.forma === 'cuore';
    const nomi = stato.nomi.trim() || esempio.nomi, data = stato.data.trim() || esempio.data;
    ctx.clearRect(0, 0, S, S);
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,.18)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
    percorso(ctx, stato.forma, 1); ctx.fillStyle = carta; ctx.fill();
    ctx.restore();
    ctx.strokeStyle = ink; ctx.lineWidth = S * .005;
    percorso(ctx, stato.forma, .9); ctx.stroke();
    ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const L = stato.forma === 'ovale' ? S * .72 : cuore ? S * .5 : S * .66;
    const y0 = cuore ? S * .37 : stato.forma === 'ovale' ? S * .42 : S * .38;
    const passo = cuore ? .9 : stato.forma === 'ovale' ? .75 : 1;
    if (stato.simbolo === 'e') riga('&', y0, S * .18, L, f.id === 'calligrafico' ? f : { css: "'Cormorant Garamond', serif", peso: 500 });
    else if (stato.simbolo === 'iniziali') {
      const parti = nomi.split(/\s+(?:e|&)\s+|\s*&\s*/i).filter(Boolean);
      const ini = parti.map(p => p.trim()[0] || '').join(' · ').toUpperCase();
      riga(ini, y0, S * .12, L, f.id === 'calligrafico' ? trova(FONT, 'romano') : f);
    } else if (stato.simbolo === 'cuore') cuoricino(ctx, S / 2, y0 - S * .05, S * .05);
    const yN = stato.simbolo === 'nessuno' ? S * .46 : y0 + S * .17 * passo;
    riga(nomi, yN, S * .11, L, f);
    riga(data.toUpperCase(), yN + S * .12 * passo, S * .046, L * .9, f.id === 'calligrafico' ? trova(FONT, 'classico') : f, '6px');
    if (stato.frase.trim()) riga(stato.frase.trim(), yN + S * .2 * passo, S * .042, L * .85, f.id === 'calligrafico' ? trova(FONT, 'serif') : f);
    ctx.letterSpacing = '0px';
  }

  /* ---------- Scatolina 3D ---------- */
  let scena = null;
  function crea3D(el) {
    if (!window.THREE || !el) return null;
    const T = THREE;
    const renderer = new T.WebGLRenderer({ canvas: el, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    const sc = new T.Scene();
    const cam = new T.PerspectiveCamera(30, 1, .1, 50);
    cam.position.set(4.6, 3.9, 5.4);
    cam.lookAt(0, .32, 0);
    sc.add(new T.HemisphereLight(0xffffff, 0xbdb9ae, .5));
    const sole = new T.DirectionalLight(0xffffff, .7);
    sole.position.set(2.5, 5, 3);
    sole.castShadow = true;
    sole.shadow.mapSize.set(1024, 1024);
    sole.shadow.radius = 6;
    sole.shadow.camera.left = sole.shadow.camera.bottom = -3;
    sole.shadow.camera.right = sole.shadow.camera.top = 3;
    sc.add(sole);
    const luce2 = new T.DirectionalLight(0xffffff, .18); luce2.position.set(-3, 2, -1); sc.add(luce2);

    const gruppo = new T.Group();
    sc.add(gruppo);
    const matCarta = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .9 });
    const matNastro = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .32, metalness: .12 });
    const matScatola = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .85 });
    const base = new T.Mesh(new T.BoxGeometry(1.6, .7, 1.6), matScatola);
    base.position.y = .35; base.castShadow = base.receiveShadow = true;
    const coperchio = new T.Mesh(new T.BoxGeometry(1.68, .22, 1.68), matScatola);
    coperchio.position.y = .76; coperchio.castShadow = coperchio.receiveShadow = true;
    const fascia = new T.Mesh(new T.BoxGeometry(1.625, .16, 1.625), matNastro);
    fascia.position.y = .33; fascia.castShadow = true;
    gruppo.add(base, coperchio, fascia);
    const fiocco = new T.Group();
    [-1, 1].forEach(s => {
      const anello = new T.Mesh(new T.TorusGeometry(.17, .045, 14, 40), matNastro);
      anello.scale.set(1.45, 1, 1); anello.position.set(s * .2, .05, 0); anello.rotation.z = s * .35; anello.castShadow = true;
      const coda = new T.Mesh(new T.BoxGeometry(.11, .34, .025), matNastro);
      coda.position.set(s * .1, -.17, 0); coda.rotation.z = s * .35; coda.castShadow = true;
      fiocco.add(anello, coda);
    });
    const nodo = new T.Mesh(new T.SphereGeometry(.075, 20, 16), matNastro);
    nodo.scale.set(1, .9, .7); fiocco.add(nodo);
    fiocco.position.set(0, .34, .84);
    gruppo.add(fiocco);
    const tex = new T.CanvasTexture(tela);
    tex.encoding = T.sRGBEncoding;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const etichetta = new T.Mesh(new T.PlaneGeometry(1.36, 1.36), new T.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: .4, roughness: .8 }));
    etichetta.rotation.x = -Math.PI / 2; etichetta.position.y = .873; etichetta.castShadow = true;
    gruppo.add(etichetta);
    const matConf = new T.MeshStandardMaterial({ color: 0xffffff, roughness: .25 });
    [[1.25, .9], [1.45, .55], [1.1, 1.25], [-1.2, 1.05], [1.6, 1.05]].forEach(([x, z], i) => {
      const c = new T.Mesh(new T.SphereGeometry(.09, 24, 16), matConf);
      c.scale.set(1, .62, .66); c.position.set(x, .056, z); c.rotation.y = i * 1.3; c.castShadow = true;
      sc.add(c);
    });
    const terra = new T.Mesh(new T.PlaneGeometry(12, 12), new T.ShadowMaterial({ opacity: .13 }));
    terra.rotation.x = -Math.PI / 2; terra.receiveShadow = true;
    sc.add(terra);

    let rot = -.5, vel = .0035, trascina = null, attivo = false, raf = 0;
    el.addEventListener('pointerdown', e => { trascina = { x: e.clientX, r: rot }; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => { if (trascina) rot = trascina.r + (e.clientX - trascina.x) * .01; });
    el.addEventListener('pointerup', () => { trascina = null; });
    function misura() {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      cam.aspect = w / h; cam.updateProjectionMatrix();
    }
    function giro() {
      raf = attivo ? requestAnimationFrame(giro) : 0;
      if (!trascina) rot += vel;
      gruppo.rotation.y = rot;
      renderer.render(sc, cam);
    }
    addEventListener('resize', misura);
    return {
      aggiorna() {
        matCarta.color.set(trova(CARTE, stato.carta).hex).convertSRGBToLinear();
        matNastro.color.set(trova(NASTRI, stato.nastro).hex).convertSRGBToLinear();
        matScatola.color.set(trova(SCATOLE, stato.scatola).hex).convertSRGBToLinear();
        tex.needsUpdate = true;
        if (!attivo) { misura(); renderer.render(sc, cam); }
      },
      attiva(on) { attivo = on; if (on) { misura(); if (!raf) giro(); } }
    };
  }

  /* ---------- Controlli ---------- */
  function campioni(nome, lista, chiave) {
    return `<div class="pers__grp"><div class="label pers__lab"><span>${nome}</span><span class="fog" data-nome="${chiave}"></span></div>
      <div class="pers__swatch" role="radiogroup" aria-label="${nome}">${lista.map(x => `<button type="button" role="radio" data-k="${chiave}" data-v="${x.id}" aria-label="${x.nome}" style="--c:${x.hex}"></button>`).join('')}</div></div>`;
  }
  function scatole() {
    return `<div class="pers__grp"><div class="label pers__lab"><span>Scatola</span><span class="fog" data-nome="scatola"></span></div>
      <div class="pers__scatole" role="radiogroup" aria-label="Scatola">${SCATOLE.map(x => `<button type="button" role="radio" data-k="scatola" data-v="${x.id}" aria-label="${x.nome}"><img src="${x.foto}" alt="" loading="lazy"></button>`).join('')}</div></div>`;
  }
  function bottoni(nome, lista, chiave, conFont) {
    return `<div class="pers__grp"><div class="label pers__lab"><span>${nome}</span></div>
      <div class="pers__seg" role="radiogroup" aria-label="${nome}">${lista.map(x => `<button type="button" role="radio" data-k="${chiave}" data-v="${x.id}"${conFont ? ` style="font-family:${x.css};font-weight:${x.peso || 400}"` : ''}>${x.nome}</button>`).join('')}</div></div>`;
  }

  async function init({ contenitore, anteprima, canvas3d, onCambio }) {
    contenitore.innerHTML = `
      ${scatole()}
      <div class="pers__campi">
        <input id="nomi" maxlength="30" placeholder="Nomi, es. ${esempio.nomi}" aria-label="Nomi sul bigliettino">
        <input id="data" maxlength="22" placeholder="Data, es. ${esempio.data}" aria-label="Data sul bigliettino">
        <input id="frase" maxlength="36" placeholder="Una frase breve (facoltativa)" aria-label="Frase sul bigliettino">
      </div>
      ${bottoni('Carattere', FONT, 'font', true)}
      ${campioni('Carta', CARTE, 'carta')}
      ${campioni('Inchiostro', INCHIOSTRI, 'inchiostro')}
      ${bottoni('Forma', FORME, 'forma')}
      ${bottoni('Simbolo al centro', SIMBOLI, 'simbolo')}
      ${campioni('Nastro', NASTRI, 'nastro')}
      ${bottoni('Scritta sul nastro', NASTRO_TESTO, 'nastroTesto')}
      ${bottoni('Confetti', CONFETTI, 'confetti')}`;
    const piccola = anteprima.getContext('2d');
    scena = crea3D(canvas3d);
    function segna() {
      contenitore.querySelectorAll('[data-k]').forEach(b => b.setAttribute('aria-checked', String(stato[b.dataset.k] === b.dataset.v)));
      contenitore.querySelector('[data-nome="carta"]').textContent = trova(CARTE, stato.carta).nome;
      contenitore.querySelector('[data-nome="inchiostro"]').textContent = trova(INCHIOSTRI, stato.inchiostro).nome;
      contenitore.querySelector('[data-nome="nastro"]').textContent = trova(NASTRI, stato.nastro).nome;
      contenitore.querySelector('[data-nome="scatola"]').textContent = trova(SCATOLE, stato.scatola).nome;
    }
    function ridisegna(daUtente) {
      disegna();
      piccola.clearRect(0, 0, anteprima.width, anteprima.height);
      piccola.drawImage(tela, 0, 0, anteprima.width, anteprima.height);
      if (scena) scena.aggiorna();
      segna();
      if (daUtente && onCambio) onCambio();
    }
    contenitore.addEventListener('click', e => {
      const b = e.target.closest('[data-k]'); if (!b) return;
      stato[b.dataset.k] = b.dataset.v; ridisegna(true);
    });
    ['nomi', 'data', 'frase'].forEach(k => contenitore.querySelector('#' + k).addEventListener('input', e => { stato[k] = e.target.value; ridisegna(true); }));
    ridisegna(false);
    /* I caratteri arrivano da Google Fonts: si ridisegna quando sono pronti */
    try { await Promise.all(FONT.map(f => document.fonts.load(`${f.peso || 400} 40px ${f.css}`))); } catch (e) {}
    ridisegna(false);
    return { attiva3D: on => scena && scena.attiva(on), ha3D: !!scena };
  }

  function descrizione() {
    const parti = [];
    const testo = [stato.nomi.trim(), stato.data.trim()].filter(Boolean).join(', ');
    if (testo) parti.push(testo);
    parti.push(`bollino ${trova(FORME, stato.forma).nome.toLowerCase()} ${trova(CARTE, stato.carta).nome.toLowerCase()}`);
    parti.push(`${trova(INCHIOSTRI, stato.inchiostro).nome.toLowerCase()}, ${trova(FONT, stato.font).nome.toLowerCase()}`);
    parti.push(`nastro ${trova(NASTRI, stato.nastro).nome.toLowerCase()}${stato.nastroTesto === 'nomi' ? ' con i nomi' : ''}`);
    const scatola = trova(SCATOLE, stato.scatola);
    parti.push(scatola.riga || `scatola ${scatola.nome.toLowerCase()}`);
    if (stato.confetti === 'nomi') parti.push('confetti con i nomi');
    return parti.join(' · ');
  }

  window.Bigliettino = { init, descrizione, stato };
})();

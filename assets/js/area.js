/* Il mio account.
   Fuori: i moduli Accedi, Registrati e Password dimenticata (sul sito vero parlano con WordPress, nell'anteprima no).
   Dentro: l'area del cliente disegnata per il sito, con i dati che WordPress stampa in GRAZIELLA.wp.conto:
   saluto e numeri, ordine in corso con la linea dello stato, storico con il dettaglio, "Ordina di nuovo", dati e password. */
(function () {
  const G = window.GRAZIELLA, N = window.Negozio;
  const wp = G.wp, c = wp && wp.conto;
  const ridotto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animo = window.gsap && !ridotto;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, x => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[x]);
  const TEL = '059 909858', TEL_LINK = 'tel:+39059909858';
  const MAPPA = 'https://www.google.com/maps/place/Bomboniere+Graziella/data=!4m2!3m1!1s0x477feae1bc9b29a5:0x9061f3459a235cc';
  const conti = document.querySelector('.conti'), area = document.getElementById('area');
  const dopo = new URLSearchParams(location.search).get('redirect_to') || '';

  async function chiama(azione, dati) {
    const fd = dati instanceof FormData ? dati : new FormData();
    fd.append('action', 'graziella_' + azione); fd.append('nonce', wp.nonce); fd.append('dopo', dopo);
    const r = await fetch(wp.ajax, { method: 'POST', body: fd, credentials: 'same-origin' });
    return r.json();
  }
  function inviaCon(form, azione, fatto) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const esito = form.querySelector('[aria-live]'), btn = form.querySelector('.btn');
      if (!wp) return fatto ? fatto(null, esito) : null;
      btn.disabled = true; esito.textContent = 'Un momento…';
      try {
        const j = await chiama(azione, new FormData(form));
        const msg = j.data && j.data.msg;
        if (j.success && j.data.url) { location.href = j.data.url; return; }
        esito.textContent = msg || (j.success ? 'Fatto.' : 'Qualcosa non è andato. Riprova.');
        if (j.success && fatto) fatto(j, esito);
      } catch (err) { esito.textContent = 'Connessione assente. Riprova tra poco.'; }
      btn.disabled = false;
    });
  }

  /* ---------- Fuori: accedi, registrati, password dimenticata ---------- */
  if (conti) {
    const fAccedi = conti.querySelector('[data-conto="accedi"]'), fReg = conti.querySelector('[data-conto="registrati"]');
    const msgUrl = new URLSearchParams(location.search);
    if (msgUrl.get('password-reset') === 'true') fAccedi.querySelector('[aria-live]').textContent = 'Password cambiata: ora puoi entrare.';
    /* Password dimenticata: il modulo Accedi si gira in quello per il link */
    fAccedi.querySelector('.btn').insertAdjacentHTML('afterend', '<button class="link conto-form__perso" type="button" data-perso>Hai dimenticato la password?</button>');
    fAccedi.insertAdjacentHTML('afterend', `<form class="conto-form" data-conto="recupera" hidden>
        <p class="conti__nota" style="margin:0">Scrivi l'email dell'account: ti mandiamo un link per sceglierne una nuova.</p>
        <label><span class="label">Email</span><input name="email" type="email" autocomplete="email" required></label>
        <button class="btn" type="submit">Mandami il link</button>
        <button class="link conto-form__perso" type="button" data-perso>Torna ad accedi</button>
        <p class="conto-form__esito" aria-live="polite"></p>
      </form>`);
    const fRec = conti.querySelector('[data-conto="recupera"]');
    conti.querySelectorAll('[data-perso]').forEach(b => b.addEventListener('click', () => {
      const aRec = fRec.hidden;
      fRec.hidden = !aRec; fAccedi.hidden = aRec;
      const campo = (aRec ? fRec : fAccedi).querySelector('input');
      if (aRec && fAccedi.email.value) fRec.email.value = fAccedi.email.value;
      campo.focus();
    }));
    const anteprima = (j, esito) => { esito.textContent = 'Anteprima del nuovo sito: gli account saranno attivi con il negozio online.'; };
    inviaCon(fAccedi, 'accedi', wp ? null : () => { mostraArea(esempio()); scrollTo(0, 0); });
    inviaCon(fReg, 'registrati', wp ? null : anteprima);
    inviaCon(fRec, 'recupera', wp ? (j, esito) => { fRec.querySelector('input').value = ''; } : anteprima);
  }

  /* ---------- Gli stati di un ordine ---------- */
  function tappe(o) {
    const nomi = ['Ricevuto', 'Pagato', 'In preparazione', o.ritiro ? 'Pronto in negozio' : 'Spedito', o.ritiro ? 'Ritirato' : 'Consegnato'];
    const ora = { pending: 1, failed: 1, 'on-hold': 1, processing: 2, pronto: 3, spedito: 3, completed: 5 }[o.stato];
    return { nomi, ora: ora == null ? -1 : ora };
  }
  const ATTIVI = ['pending', 'on-hold', 'processing', 'pronto', 'spedito'];
  function tono(o) { return ATTIVI.includes(o.stato) ? 'vivo' : o.stato === 'completed' ? 'fatto' : 'fermo'; }
  function nomeStato(o) {
    return ({ pending: 'Da pagare', failed: 'Pagamento non riuscito', 'on-hold': 'In attesa del bonifico', processing: 'In preparazione', pronto: 'Pronto in negozio', spedito: 'Spedito', completed: o.ritiro ? 'Ritirato' : 'Consegnato', cancelled: 'Annullato', refunded: 'Rimborsato' })[o.stato] || o.statoNome;
  }
  function racconto(o) {
    switch (o.stato) {
      case 'pending': return ['Aspettiamo il pagamento', 'L\'ordine è registrato. Completa il pagamento e iniziamo subito a prepararlo.'];
      case 'failed': return ['Il pagamento non è andato', 'Puoi riprovare quando vuoi: l\'ordine resta qui con tutti i pezzi.'];
      case 'on-hold': return ['Aspettiamo il tuo bonifico', `Appena arriva iniziamo a confezionare. Nella causale scrivi: ordine n. ${o.numero}.`];
      case 'processing': return ['Lo stiamo confezionando a mano', o.righe.some(r => r.conf !== 'oggetto') ? 'Nel negozio di Bomporto prepariamo le tue bomboniere una per una: scatola, nastro e bigliettino come li hai scelti.' : 'Nel negozio di Bomporto stiamo preparando i tuoi pezzi uno per uno.'];
      case 'pronto': return ['È pronto: ti aspettiamo', 'Passa a ritirarlo in Via Carlo Testa 4, a Bomporto. ' + (N.stato ? N.stato().testo + '.' : '')];
      case 'spedito': return ['È in viaggio verso di te', 'L\'abbiamo affidato al corriere' + (o.indirizzo ? ` e arriva in ${o.indirizzo}.` : '.')];
      default: return [nomeStato(o), ''];
    }
  }
  function linea(o) {
    const t = tappe(o);
    const fatto = t.ora < 0 ? 0 : Math.min(1, t.ora / 4);
    return `<ol class="traccia" style="--fatto-fine:${fatto}" aria-label="Stato dell'ordine">
      <span class="traccia__linea" aria-hidden="true"><i></i></span>
      ${t.nomi.map((n, i) => `<li class="${i < t.ora ? 'is-fatto' : i === t.ora ? 'is-ora' : ''}"${i === t.ora ? ' aria-current="step"' : ''}><span class="traccia__punto" aria-hidden="true"></span><span class="traccia__nome">${n}</span></li>`).join('')}
    </ol>`;
  }
  const vetrina = r => `<span class="vetrina">${r.foto ? `<img src="${esc(r.foto)}" alt="" loading="lazy">` : ''}</span>`;
  const fotoRiga = r => { const p = r.id && G.prodotti.find(x => x.id === r.id); return r.foto || (p ? G.foto(p) : ''); };

  /* ---------- Dentro: l'area ---------- */
  function mostraArea(d) {
    d.ordiniLista.forEach(o => o.righe.forEach(r => { r.foto = fotoRiga(r); }));
    const attivi = d.ordiniLista.filter(o => ATTIVI.includes(o.stato));
    const corso = attivi[0];
    document.body.setAttribute('data-dentro', '');
    area.innerHTML = `
      ${d.esempio ? '<p class="area__anteprima">Anteprima: così vede il suo account chi compra. Gli ordini qui sono un esempio.</p>' : ''}
      <header class="area__testa">
        <h1 class="h-xl" data-split>Ciao, ${esc(d.nome || 'benvenuta')}</h1>
        <dl class="area__fatti">
          <div><dt>${d.ordiniLista.length === 1 ? 'Ordine' : 'Ordini'}</dt><dd data-conta="${d.ordiniLista.length}">${d.ordiniLista.length}</dd></div>
          ${attivi.length ? `<div><dt>In corso</dt><dd>${attivi.length}</dd></div>` : ''}
          ${d.dal ? `<div><dt>Cliente da</dt><dd>${esc(d.dal)}</dd></div>` : ''}
        </dl>
      </header>
      <nav class="area__nav label" aria-label="Il mio account">
        ${corso ? '<a href="#in-corso">In corso</a>' : ''}<a href="#ordini">I miei ordini</a><a href="#dati">I miei dati</a>
        <a class="area__esci" href="${esc(d.esci)}">Esci</a>
      </nav>
      ${corso ? pannelloCorso(corso, attivi.length - 1) : ''}
      <section class="area__blocco" id="ordini" aria-labelledby="t-ordini">
        <h2 class="h-l" id="t-ordini" data-split>I miei ordini</h2>
        ${d.ordiniLista.length ? `<ul class="ordini">${d.ordiniLista.map(rigaOrdine).join('')}</ul>` : vuoto()}
      </section>
      <section class="area__blocco" id="dati" aria-labelledby="t-dati">
        <h2 class="h-l" id="t-dati" data-split>I miei dati</h2>
        ${moduloDati(d)}
      </section>`;
    conti && (conti.hidden = true);
    area.hidden = false;
    collega(d);
  }

  function pannelloCorso(o, altri, grazie) {
    const [titolo, testo] = racconto(o);
    const mostra = o.righe.slice(0, o.righe.length > 4 ? 3 : 4);
    const pronto = o.prontoEntro ? `<p class="corso__pronto"><span class="label">Pronto entro il</span><b>${esc(o.prontoEntro)}</b></p>`
      : ['pending', 'on-hold'].includes(o.stato) ? `<p class="corso__pronto"><span class="label">Pronto in</span><b>${o.giorni} giorni</b><span class="label">lavorativi dal pagamento</span></p>` : '';
    const bonifico = o.bonifico && o.bonifico.length ? `<div class="bonifico">${o.bonifico.map(b => `<dl>
        ${b.intestatario ? `<dt>Intestato a</dt><dd>${esc(b.intestatario)}</dd>` : ''}
        ${b.banca ? `<dt>Banca</dt><dd>${esc(b.banca)}</dd>` : ''}
        <dt>IBAN</dt><dd class="bonifico__iban"><span>${esc(b.iban)}</span><button type="button" class="bonifico__copia" data-copia="${esc(b.iban)}">Copia</button></dd>
        <dt>Causale</dt><dd>Ordine n. ${esc(o.numero)}</dd>
        <dt>Importo</dt><dd>${N.euro(o.totale)}</dd></dl>`).join('')}</div>`
      : o.stato === 'on-hold' ? '<p class="corso__testo">I dati per il bonifico sono nell\'email di conferma dell\'ordine.</p>' : '';
    const azioni = [
      o.pagaUrl ? `<a class="btn btn--light" href="${esc(o.pagaUrl)}">Paga ora</a>` : '',
      o.traccia ? `<a class="btn btn--light" href="${esc(o.traccia)}" target="_blank" rel="noopener">Segui il pacco</a>` : '',
      o.stato === 'pronto' ? `<a class="btn btn--light" href="${MAPPA}" target="_blank" rel="noopener">Come arrivare</a>` : '',
      grazie ? (o.cliente ? `<a class="btn btn--line" href="account.html#ordine-${o.id}">Seguilo nel tuo account</a>` : '')
        : `<a class="btn btn--line" href="#ordine-${o.id}" data-apri-ordine="${o.id}">Vedi l'ordine</a>`,
    ].join('');
    return `<section class="corso" id="in-corso" aria-labelledby="t-corso">
      <div class="corso__in">
        <div>
          <p class="corso__num label">Ordine n. ${esc(o.numero)} · ${esc(o.data)}</p>
          <h2 class="h-l" id="t-corso" data-split>${titolo}</h2>
          <p class="corso__testo">${esc(testo)}</p>
          ${bonifico}${pronto}
          <div class="corso__azioni">${azioni}</div>
          <p class="corso__aiuto">Domande sull'ordine? Chiamaci allo <a href="${TEL_LINK}">${TEL}</a>${altri > 0 ? ` · Hai altri ${altri === 1 ? 'un ordine' : altri + ' ordini'} in corso qui sotto` : ''}</p>
        </div>
        <ul class="corso__pezzi" data-n="${Math.min(o.righe.length, 4)}">
          ${mostra.map(r => `<li><span class="vetrina">${r.foto ? `<img src="${esc(r.foto)}" alt="">` : ''}<span class="quanti">× ${r.qty}</span></span><p>${esc(r.nome)}</p></li>`).join('')}
          ${o.righe.length > 4 ? `<li><span class="corso__altri">+${o.righe.length - 3}</span></li>` : ''}
        </ul>
      </div>
      ${linea(o)}
    </section>`;
  }

  function rigaOrdine(o) {
    return `<li class="ordine" id="ordine-${o.id}">
      <button class="ordine__riga" type="button" aria-expanded="false" aria-controls="dett-${o.id}">
        <span class="ordine__foto" aria-hidden="true">${o.righe.slice(0, 3).map(vetrina).join('').replace(/class="vetrina"/g, '')}</span>
        <span class="ordine__num"><b>Ordine n. ${esc(o.numero)}</b><span>${esc(o.data)} · ${o.righe.reduce((s, r) => s + r.qty, 0)} pezzi</span></span>
        <span class="ordine__stato" data-tono="${tono(o)}"><i aria-hidden="true"></i>${esc(nomeStato(o))}</span>
        <span class="ordine__tot">${N.euro(o.totale)}</span>
        <span class="ordine__freccia" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M2 5l5 5 5-5"/></svg></span>
      </button>
      <div class="ordine__dettaglio" id="dett-${o.id}" hidden>
        <div class="ordine__dentro">
          ${tappe(o).ora >= 0 ? linea(o) : ''}
          <ul class="ordine__righe">${o.righe.map(r => `<li>
            ${vetrina(r)}
            <div><h3>${r.id ? `<a href="prodotto.html#${esc(r.id)}">${esc(r.nome)}</a>` : esc(r.nome)}</h3>
              <p>${r.qty} pezzi${r.confNome ? ' · ' + esc(r.confNome) : ''}${r.nomi ? `<br>Bigliettino: ${esc(r.nomi)}` : ''}</p></div>
            <span class="prezzo">${N.euro(r.totale)}</span></li>`).join('')}
          </ul>
          <div>
            <dl class="ordine__conti">
              <div><dt>Prodotti</dt><dd>${N.euro(o.subtotale)}</dd></div>
              <div><dt>${o.ritiro ? 'Ritiro in negozio' : 'Spedizione'}</dt><dd>${o.spedizione ? N.euro(o.spedizione) : 'Gratis'}</dd></div>
              <div class="tot"><dt>Totale</dt><dd>${N.euro(o.totale)}</dd></div>
            </dl>
            <dl class="ordine__info">
              ${o.pagamento ? `<div><dt>Pagamento</dt><dd>${esc(o.pagamento)}</dd></div>` : ''}
              <div><dt>${o.ritiro ? 'Ritiro' : 'Consegna a'}</dt><dd>${o.ritiro ? 'Graziella Centro Sposi, Via Carlo Testa 4, Bomporto' : esc(o.indirizzo || o.consegna)}</dd></div>
              ${o.note ? `<div><dt>Le tue note</dt><dd>${esc(o.note)}</dd></div>` : ''}
            </dl>
            <div class="ordine__azioni">
              ${o.pagaUrl ? `<a class="btn" href="${esc(o.pagaUrl)}">Paga ora</a>` : ''}
              ${o.traccia ? `<a class="btn" href="${esc(o.traccia)}" target="_blank" rel="noopener">Segui il pacco</a>` : ''}
              <button class="btn${o.pagaUrl || o.traccia ? ' btn--line' : ''}" type="button" data-riordina="${o.id}">Ordina di nuovo</button>
            </div>
            <p class="dati__esito" aria-live="polite"></p>
          </div>
        </div>
      </div>
    </li>`;
  }

  function vuoto() {
    return `<div class="vuoto"><p>Non hai ancora fatto ordini. Quando ne fai uno, qui vedi a che punto è: dal pagamento alla confezione, fino al ritiro o alla consegna.</p>
      <a class="btn" href="catalogo.html">Scegli le bomboniere</a>
      <div class="vuoto__griglia">${G.prodotti.filter(p => p.prezzoPieno).concat(G.prodotti).slice(0, 4).map(N.card).join('')}</div></div>`;
  }

  function moduloDati(d) {
    const prov = Object.entries(d.province || {}).map(([k, v]) => `<option value="${esc(k)}"${k === d.prov ? ' selected' : ''}>${esc(v)}</option>`).join('');
    const campo = (nome, etichetta, v, extra = '', cls = '') => `<label class="${cls}"><span class="label">${etichetta}</span><input name="${nome}" value="${esc(v)}" ${extra}></label>`;
    return `<div class="dati">
      <form data-salva="dati">
        <h3>Per le consegne e la cassa</h3>
        <div class="dati__campi">
          ${campo('nome', 'Nome', d.nome, 'autocomplete="given-name" required')}
          ${campo('cognome', 'Cognome', d.cognome, 'autocomplete="family-name"')}
          ${campo('email', 'Email', d.email, 'type="email" autocomplete="email" required')}
          ${campo('telefono', 'Telefono', d.telefono, 'type="tel" autocomplete="tel"')}
          ${campo('via', 'Via e numero civico', d.via, 'autocomplete="address-line1"', 'lungo')}
          ${campo('cap', 'CAP', d.cap, 'inputmode="numeric" autocomplete="postal-code" maxlength="5"', 'corto meta')}
          ${campo('citta', 'Città', d.citta, 'autocomplete="address-level2"', 'corto')}
          <label class="corto meta"><span class="label">Provincia</span><select name="prov" autocomplete="address-level1"><option value=""></option>${prov}</select></label>
        </div>
        <button class="btn" type="submit">Salva i dati</button>
        <p class="dati__esito" aria-live="polite"></p>
      </form>
      <form data-salva="password">
        <h3>Password</h3>
        <div class="dati__campi">
          ${campo('attuale', 'Password attuale', '', 'type="password" autocomplete="current-password" required', 'lungo')}
          ${campo('nuova', 'Nuova password', '', 'type="password" autocomplete="new-password" minlength="8" required', 'lungo')}
        </div>
        <button class="btn btn--line" type="submit">Cambia password</button>
        <p class="dati__esito" aria-live="polite"></p>
      </form>
    </div>`;
  }

  /* ---------- Movimento e gesti ---------- */
  function vaiA(el) {
    if (!el) return;
    const l = N.lenis;
    if (l) l.scrollTo(el, { offset: -90 }); else el.scrollIntoView({ behavior: ridotto ? 'auto' : 'smooth' });
  }
  function riempi(tr, subito) {
    const fine = parseFloat(tr.style.getPropertyValue('--fatto-fine')) || 0;
    if (!animo || subito) { tr.style.setProperty('--fatto', fine); return; }
    const o = { v: 0 };
    gsap.to(o, { v: fine, duration: 1.6, ease: 'expo.inOut', delay: .2, onUpdate: () => tr.style.setProperty('--fatto', o.v) });
    gsap.from(tr.querySelectorAll('.traccia__punto'), { scale: 0, duration: .7, stagger: .12, ease: 'back.out(2)', delay: .1 });
    gsap.from(tr.querySelectorAll('.traccia__nome'), { opacity: 0, y: 8, duration: .7, stagger: .08, ease: 'power3.out', delay: .3 });
  }
  function apriOrdine(li, apri, subito) {
    const btn = li.querySelector('.ordine__riga'), det = li.querySelector('.ordine__dettaglio');
    if (apri === li.classList.contains('is-aperto')) return;
    li.classList.toggle('is-aperto', apri); btn.setAttribute('aria-expanded', String(apri));
    if (apri) {
      det.hidden = false;
      const tr = det.querySelector('.traccia');
      if (animo && !subito) {
        gsap.fromTo(det, { height: 0 }, { height: 'auto', duration: .8, ease: 'expo.out' });
        gsap.from(det.querySelectorAll('.ordine__righe li, .ordine__conti, .ordine__info, .ordine__azioni'), { opacity: 0, y: 18, duration: .8, stagger: .05, ease: 'power3.out', delay: .1 });
      }
      if (tr) riempi(tr, subito);
    } else if (animo) {
      gsap.to(det, { height: 0, duration: .5, ease: 'expo.inOut', onComplete: () => { det.hidden = true; det.style.height = ''; } });
    } else det.hidden = true;
  }

  function collega(d, root = area) {
    /* Il pannello dell'ordine in corso si apre come le tendine del sito, poi la linea si riempie fino a oggi */
    const corso = root.querySelector('.corso');
    if (corso) {
      if (animo) {
        gsap.fromTo(corso, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', delay: .15, clearProps: 'clipPath' });
        gsap.from(corso.querySelectorAll('.corso__pezzi li'), { yPercent: 18, opacity: 0, duration: 1.2, stagger: .09, ease: 'expo.out', delay: .45 });
        gsap.from(corso.querySelectorAll('.corso__num, .corso__testo, .bonifico, .corso__pronto, .corso__azioni, .corso__aiuto'), { opacity: 0, y: 16, duration: .9, stagger: .06, ease: 'power3.out', delay: .55 });
      }
      riempi(corso.querySelector('.traccia'));
    }
    root.querySelectorAll('.ordine__riga').forEach(b => b.addEventListener('click', () => { const li = b.closest('.ordine'); apriOrdine(li, !li.classList.contains('is-aperto')); }));
    root.querySelectorAll('[data-apri-ordine]').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const li = document.getElementById('ordine-' + a.dataset.apriOrdine);
      apriOrdine(li, true); vaiA(li);
    }));
    root.querySelectorAll('.area__nav a[href^="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); vaiA(document.querySelector(a.getAttribute('href'))); }));
    root.querySelectorAll('[data-copia]').forEach(b => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copia.replace(/\s/g, '')); b.textContent = 'Copiato'; } catch (e) { b.textContent = 'Seleziona e copia'; }
    }));
    /* Ordina di nuovo: i pezzi tornano nel carrello del sito, con la stessa confezione e lo stesso bigliettino */
    root.querySelectorAll('[data-riordina]').forEach(b => b.addEventListener('click', () => {
      const o = d.ordiniLista.find(x => String(x.id) === b.dataset.riordina);
      const esito = b.closest('.ordine').querySelector('.dati__esito');
      let messi = 0, fuori = 0;
      o.righe.forEach(r => { if (r.id && G.prodotti.some(p => p.id === r.id) && N.aggiungi(r.id, r.conf || 'oggetto', r.qty, r.nomi || '')) messi++; else fuori++; });
      if (messi) { const img = b.closest('.ordine').querySelector('.ordine__righe img'); if (img && N.volaInBorsa) N.volaInBorsa(img); setTimeout(() => N.toggleBorsa(true), 600); }
      esito.textContent = messi ? (fuori ? `Nel carrello. ${fuori === 1 ? 'Un pezzo non è' : fuori + ' pezzi non sono'} più disponibili.` : 'Tutto di nuovo nel carrello.') : 'Questi pezzi non sono più disponibili. Chiamaci allo ' + TEL + '.';
    }));
    const fDati = root.querySelector('[data-salva="dati"]'), fPw = root.querySelector('[data-salva="password"]');
    if (!fDati) { /* pagina Grazie: niente moduli */ }
    else if (d.esempio) [fDati, fPw].forEach(f => f.addEventListener('submit', e => { e.preventDefault(); f.querySelector('[aria-live]').textContent = 'Anteprima: qui il cliente salva i suoi dati.'; }));
    else {
      inviaCon(fDati, 'salva_dati', () => { const n = fDati.nome.value.trim(); if (n) root.querySelector('.area__testa h1').textContent = 'Ciao, ' + n; });
      inviaCon(fPw, 'salva_password', () => { fPw.reset(); setTimeout(() => location.reload(), 1400); });
    }
    /* account.html#ordine-352 (dall'email) apre quell'ordine */
    const qui = location.hash.match(/^#ordine-(\d+)$/);
    if (qui && document.getElementById('ordine-' + qui[1])) { const li = document.getElementById('ordine-' + qui[1]); apriOrdine(li, true, true); setTimeout(() => vaiA(li), 300); }
    else if (['#ordini', '#dati', '#in-corso'].includes(location.hash)) setTimeout(() => vaiA(document.querySelector(location.hash)), 300);
  }

  /* Nell'anteprima (senza WordPress) l'area si vede con due ordini d'esempio fatti con i prodotti veri del catalogo */
  function esempio() {
    const p = G.prodotti, a = p.find(x => x.id === 'dalmata-pois-rosa') || p[0], b = p[3] || p[1], z = p[8] || p[2];
    const riga = (x, q, conf, nomi) => ({ id: x.id, nome: x.nome, qty: q, totale: (x.prezzo + (conf === 'pronta' ? 3.5 : 0)) * q, foto: '', conf, confNome: conf === 'pronta' ? 'Già confezionata in scatola, con nastro e bigliettino' : 'Solo oggetto', nomi });
    const o1 = [riga(a, 20, 'pronta', 'Giulia e Marco · 14 giugno 2027'), riga(b, 30, 'oggetto', '')];
    const o2 = [riga(z, 12, 'pronta', 'Battesimo di Leo')];
    const somma = r => r.reduce((s, x) => s + x.totale, 0);
    return {
      esempio: true, nome: 'Giulia', cognome: 'Rossi', email: 'giulia@esempio.it', telefono: '', via: '', cap: '', citta: 'Modena', prov: 'MO',
      province: { BO: 'Bologna', FE: 'Ferrara', MO: 'Modena', RE: 'Reggio Emilia' }, dal: 'marzo 2026', esci: 'account.html',
      ordiniLista: [
        { id: 1052, numero: '1052', data: '18 novembre 2026', stato: 'processing', totale: somma(o1), subtotale: somma(o1), spedizione: 0, ritiro: true, pagamento: 'PayPal', giorni: 5, prontoEntro: '25 novembre', righe: o1 },
        { id: 987, numero: '987', data: '2 aprile 2026', stato: 'completed', totale: somma(o2) + 9.9, subtotale: somma(o2), spedizione: 9.9, ritiro: false, pagamento: 'Bonifico bancario', indirizzo: 'Via Emilia 12, 41121 Modena MO', giorni: 5, righe: o2 },
      ],
    };
  }

  /* Dopo l'ordine: la pagina "Grazie" (WordPress stampa l'ordine in GRAZIELLA.wp.grazie) */
  function mostraGrazie(o) {
    const box = document.getElementById('grazie');
    o.righe.forEach(r => { r.foto = fotoRiga(r); });
    box.innerHTML = `
      <header class="grazie__testa">
        <h1 class="h-xl" data-split>Grazie${o.nome ? ', ' + esc(o.nome) : ''}</h1>
        <p class="body-l">Abbiamo ricevuto il tuo ordine n. ${esc(o.numero)}${o.email ? `. Il riepilogo è nella tua email, <b>${esc(o.email)}</b>` : ''}.</p>
      </header>
      ${ATTIVI.includes(o.stato) ? pannelloCorso(o, 0, true) : ''}
      <section class="area__blocco" aria-labelledby="t-tuo">
        <h2 class="h-l" id="t-tuo" data-split>Il tuo ordine</h2>
        <ul class="ordini">${rigaOrdine(o)}</ul>
      </section>
      <div class="grazie__fine">
        ${o.cliente ? `<a class="btn" href="account.html#ordine-${o.id}">Il mio account</a>` : ''}
        <a class="btn${o.cliente ? ' btn--line' : ''}" href="catalogo.html">Torna alle bomboniere</a>
      </div>`;
    collega({ ordiniLista: [o] }, box);
    apriOrdine(box.querySelector('.ordine'), true, true);
    N.entrate(box);
  }

  if (c && c.dentro && c.ordiniLista) mostraArea(c);
  else if (wp && wp.grazie && document.getElementById('grazie')) mostraGrazie(wp.grazie);
  else if (!wp && new URLSearchParams(location.search).has('esempio')) mostraArea(esempio());
})();

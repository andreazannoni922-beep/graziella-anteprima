/* Personalizzazione della bomboniera: scatola, testo del bigliettino, nastro e confetti.
   Enrico (05/11/2026) ha tolto carattere, carta, inchiostro, forma, simbolo e scritta sul nastro; (06/11) via anche la scatola in 3D.
   I confetti sono solo alla mandorla o al cioccolato. */
(function () {
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
    { id: 'bianca', nome: 'Bianca', foto: 'assets/img/scatola-bianca.webp' },
    { id: 'avorio', nome: 'Avorio', foto: 'assets/img/scatola-avorio.webp' },
    { id: 'avana', nome: 'Ondulato avana', foto: 'assets/img/scatola-avana.webp', riga: 'scatola in ondulato avana' }
  ];
  const CONFETTI = [{ id: 'mandorla', nome: 'Alla mandorla' }, { id: 'cioccolato', nome: 'Al cioccolato' }];
  const trova = (lista, id) => lista.find(x => x.id === id) || lista[0];

  const stato = { nomi: '', data: '', frase: '', nastro: 'bianco', scatola: 'bianca', confetti: 'mandorla' };
  const esempio = { nomi: 'Giulia e Marco', data: '14 giugno 2027' };

  function init({ contenitore }) {
    contenitore.innerHTML = `
      <div class="pers__grp"><div class="label pers__lab"><span>Scatola</span><span class="fog" data-nome="scatola"></span></div>
        <div class="pers__scatole" role="radiogroup" aria-label="Scatola">${SCATOLE.map(x => `<button type="button" role="radio" data-k="scatola" data-v="${x.id}" aria-label="${x.nome}"><img src="${x.foto}" alt="" loading="lazy"></button>`).join('')}</div></div>
      <div class="pers__campi">
        <input id="nomi" maxlength="30" placeholder="Nomi, es. ${esempio.nomi}" aria-label="Nomi sul bigliettino">
        <input id="data" maxlength="22" placeholder="Data, es. ${esempio.data}" aria-label="Data sul bigliettino">
        <input id="frase" maxlength="36" placeholder="Una frase breve (facoltativa)" aria-label="Frase sul bigliettino">
      </div>
      <div class="pers__grp"><div class="label pers__lab"><span>Nastro</span><span class="fog" data-nome="nastro"></span></div>
        <div class="pers__swatch" role="radiogroup" aria-label="Nastro">${NASTRI.map(x => `<button type="button" role="radio" data-k="nastro" data-v="${x.id}" aria-label="${x.nome}" style="--c:${x.hex}"></button>`).join('')}</div></div>
      <div class="pers__grp"><div class="label pers__lab"><span>Confetti</span></div>
        <div class="pers__seg" role="radiogroup" aria-label="Confetti">${CONFETTI.map(x => `<button type="button" role="radio" data-k="confetti" data-v="${x.id}">${x.nome}</button>`).join('')}</div></div>`;
    function segna() {
      contenitore.querySelectorAll('[data-k]').forEach(b => b.setAttribute('aria-checked', String(stato[b.dataset.k] === b.dataset.v)));
      contenitore.querySelector('[data-nome="nastro"]').textContent = trova(NASTRI, stato.nastro).nome;
      contenitore.querySelector('[data-nome="scatola"]').textContent = trova(SCATOLE, stato.scatola).nome;
    }
    contenitore.addEventListener('click', e => {
      const b = e.target.closest('[data-k]'); if (!b) return;
      stato[b.dataset.k] = b.dataset.v; segna();
    });
    ['nomi', 'data', 'frase'].forEach(k => contenitore.querySelector('#' + k).addEventListener('input', e => { stato[k] = e.target.value; }));
    segna();
  }

  /* La riga che finisce nel carrello */
  function descrizione() {
    const parti = [];
    const testo = [stato.nomi.trim(), stato.data.trim(), stato.frase.trim()].filter(Boolean).join(', ');
    if (testo) parti.push(testo);
    const scatola = trova(SCATOLE, stato.scatola);
    parti.push(scatola.riga || `scatola ${scatola.nome.toLowerCase()}`);
    parti.push(`nastro ${trova(NASTRI, stato.nastro).nome.toLowerCase()}`);
    parti.push(`confetti ${trova(CONFETTI, stato.confetti).nome.toLowerCase()}`);
    return parti.join(' · ');
  }

  window.Bigliettino = { init, descrizione, stato };
})();

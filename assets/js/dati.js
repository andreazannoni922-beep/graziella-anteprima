/* Catalogo del prototipo. Nomi descrittivi e prezzi indicativi: in WordPress arriveranno da WooCommerce con i dati veri di Graziella. */
window.GRAZIELLA = {
  feste: [
    { id: 'matrimonio', nome: 'Matrimonio', campo: 'inchiostro', foto: 'coppia-danza', video: 'bomboniere-matrimonio' },
    { id: 'battesimo', nome: 'Battesimo e Nascita', corto: 'Battesimo', campo: 'bianco', foto: 'sposa-bimba' },
    { id: 'comunione', nome: 'Comunione', campo: 'nebbia', foto: 'comunione-bimbo' },
    { id: 'cresima', nome: 'Cresima', campo: 'inchiostro', foto: 'cerimonia-abbraccio' },
    { id: 'laurea', nome: 'Laurea', campo: 'grigio', foto: 'vetrina-laurea' },
    { id: 'anniversari', nome: 'Anniversari', campo: 'bianco', foto: 'coppie-pietra' },
    { id: 'compleanno', nome: 'Compleanno', campo: 'nebbia', foto: 'statuette-bianche' },
    { id: 'offerte', nome: 'Offerte', campo: 'inchiostro', foto: 'vetrina-cristallo' }
  ],
  prodotti: [
    /* Prodotti veri mandati da Enrico nel gruppo il 02/11/2026: nome, misure, prezzo e pezzi in magazzino come scritti da lui;
       "viste" = quante foto scontornate da angoli diversi (la prima è assets/prodotti/<id>.webp, le altre in assets/prodotti/viste/<id>-<n>.webp) */
    { id: 'scatola-roselline', nome: 'Scatola con roselline', materiale: 'Porcellana', prezzo: 4.5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '⌀ 8,8 cm, altezza 4,4 cm', disponibili: 180, viste: 3 },
    { id: 'zuccheriera-blu', nome: 'Zuccheriera blu a puntini', materiale: 'Porcellana', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: 'altezza 9,7 cm, ⌀ da 9 a 13,5 cm', codice: '94628', disponibili: 370, viste: 4, modello: 'assets/prodotti/3d/zuccheriera-blu.glb' },
    { id: 'campana-ambra', nome: 'Campana ambra', materiale: 'Vetro soffiato', prezzo: 4, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '5 × 9,7 cm', codice: '104C', disponibili: 360, viste: 3 },
    { id: 'anfora-ambra', nome: 'Anfora ambra', materiale: 'Vetro soffiato', prezzo: 5.5, feste: ['matrimonio'], giorni: 5, stile: 'classico', misure: '6 × 18,5 cm', disponibili: 358, viste: 4 },
    { id: 'vaso-righe-blu', nome: 'Vaso a righe blu', materiale: 'Vetro', prezzo: 6, feste: ['matrimonio'], giorni: 5, stile: 'moderno', misure: '10 × 11 cm', codice: '97665', disponibili: 220, viste: 3 },
    { id: 'sale-pepe', nome: 'Sale e pepe con portatovaglioli', materiale: 'Base in legno', prezzo: 9, feste: ['matrimonio'], giorni: 5, stile: 'classico', misure: '20 × 10 cm, altezza 12,5 cm', codice: '28222', disponibili: 295, viste: 2 },
    { id: 'piatto-rose', nome: 'Piatto Limoges con rose', materiale: 'Porcellana di Limoges', prezzo: 9.5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '11,3 × 1,5 cm', codice: '814', disponibili: 718, viste: 2 },
    { id: 'raviera-sposi', nome: 'Raviera Limoges con gli sposi', materiale: 'Porcellana di Limoges', prezzo: 11, feste: ['matrimonio'], giorni: 5, stile: 'classico', misure: '16,8 × 14,5 × 2,8 cm', codice: '830', disponibili: 525, viste: 2 },
    { id: 'vasetto-pallina', nome: 'Vasetto Pallina rosso', materiale: 'Porcellana di Limoges', prezzo: 10, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '6,5 × 7 cm', codice: '2774', disponibili: 300, viste: 3 },
    { id: 'vasetto-palla-rosa', nome: 'Vasetto Palla rosa', materiale: 'Porcellana di Limoges', prezzo: 10, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '6,5 × 7 cm', codice: '2380', disponibili: 295, viste: 3 },
    { id: 'ciotola-bisquit', nome: 'Ciotola Bisquit Limoges', materiale: 'Porcellana di Limoges', prezzo: 10, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '13,2 × 3,5 cm', disponibili: 510, viste: 2 },
    { id: 'portacandele-frutti', nome: 'Portacandele frutti, 3 assortiti', materiale: 'Porcellana', prezzo: 5, feste: ['matrimonio'], giorni: 5, stile: 'classico', misure: '9,5 × 5 cm; arancio, limoni o melograno', disponibili: 250, viste: 4 },
    { id: 'orologio-angelo', nome: 'Orologio Angelo rosa', materiale: 'Orologio da tavolo', prezzo: 6, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', misure: '12 × 12 cm', disponibili: 200, viste: 3 },
    { id: 'bottiglia-veliero', nome: 'Bottiglia con veliero', materiale: 'Vetro', prezzo: 5, feste: ['comunione', 'cresima', 'matrimonio'], giorni: 5, stile: 'classico', misure: '9 × 11,5 cm', disponibili: 225, viste: 3 },
    { id: 'portachiavi-acciaio', nome: 'Portachiavi rettangolare', materiale: 'Acciaio', prezzo: 4, feste: ['comunione', 'cresima', 'laurea'], giorni: 5, stile: 'moderno', misure: '2,3 × 8 cm', disponibili: 179, viste: 2 },
    { id: 'papero-cristallo', nome: 'Papero di cristallo', materiale: 'Cristallo', prezzo: 5, feste: ['battesimo', 'comunione'], giorni: 5, stile: 'spiritoso', misure: '3 × 6 cm', disponibili: 200, viste: 3 },
    { id: 'clip-sposi-albero', nome: "Clip portafoto sposi sull'albero, 2 assortiti", materiale: 'Gesso su albero in legno', prezzo: 3, feste: ['matrimonio'], giorni: 5, stile: 'moderno', misure: '6,5 × 10 cm', codice: '616', disponibili: 190, viste: 4 },
    { id: 'portacandele-giglio', nome: 'Portacandele giglio con scatola', materiale: 'Porcellana', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '8,5 × 6,5 cm', codice: '5621', disponibili: 192, viste: 2 },
    { id: 'portachiavi-aereo', nome: 'Portachiavi Aereo', materiale: 'Metallo e strass', prezzo: 3.5, feste: ['battesimo', 'comunione'], giorni: 5, stile: 'spiritoso', misure: '4 × 5 cm', codice: '11734', disponibili: 270, viste: 2 },
    /* Enrico, 03/11/2026 */
    { id: 'portafoto-cicogna', nome: 'Portafoto cicogna, 2 assortiti', materiale: 'Portafoto da tavolo', prezzo: 3, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', misure: '8 × 10 cm; verticale o orizzontale', codice: '6796', disponibili: 240, viste: 3 },
    { id: 'calice-comunione', nome: 'Calice della comunione oro', materiale: 'Soprammobile con dettagli oro', prezzo: 3.8, feste: ['comunione'], giorni: 5, stile: 'classico', misure: '7 × 8 cm', codice: '55032', disponibili: 144, viste: 2 },
    { id: 'icona-cresima', nome: 'Icona tonda della cresima', materiale: 'Icona da tavolo', prezzo: 2.9, feste: ['cresima'], giorni: 5, stile: 'classico', misure: '6 × 6,5 cm', disponibili: 97, viste: 2 },
    { id: 'portafoto-calciatore', nome: 'Portafoto calciatore, 2 assortiti', materiale: 'Portafoto da tavolo', prezzo: 4, feste: ['comunione', 'cresima'], giorni: 5, stile: 'spiritoso', misure: '7,5 × 9,5 cm', disponibili: 144, viste: 2 },
    { id: 'tempio-bimbo', nome: 'Tempio della comunione, bimbo', materiale: 'Soprammobile', prezzo: 3, feste: ['comunione'], giorni: 5, stile: 'classico', misure: '7,5 × 7,5 cm', codice: '11072', disponibili: 115, viste: 2 },
    { id: 'tempio-bimba', nome: 'Tempio della comunione, bimba', materiale: 'Soprammobile', prezzo: 3, feste: ['comunione'], giorni: 5, stile: 'classico', misure: '7,5 × 7,5 cm', codice: '11073', disponibili: 130, viste: 2 },
    { id: 'fiore-cristallo', nome: 'Fiore di cristallo con rosa rossa', materiale: 'Cristallo e rosa stabilizzata', prezzo: 11, feste: ['matrimonio'], giorni: 5, stile: 'classico', misure: '7 × 7,5 cm', codice: '35964', viste: 3 },
    /* Enrico, 03/11/2026 pomeriggio */
    { id: 'icona-calice', nome: 'Icona argento con calice', materiale: 'Icona argento', prezzo: 4, feste: ['comunione'], giorni: 5, stile: 'classico', misure: '7,5 × 10,5 cm', codice: '51554', disponibili: 73, viste: 2 },
    { id: 'orologio-sposi-cuore', nome: 'Orologio sposi a cuore', materiale: 'Tortora e bianco, con scatola', prezzo: 9.8, feste: ['matrimonio'], giorni: 5, stile: 'moderno', misure: '12 × 11 cm', codice: '1207', disponibili: 78 },
    { id: 'calciatori', nome: 'Calciatori, 4 colori assortiti', materiale: 'Statuina', prezzo: 3, feste: ['comunione', 'compleanno'], giorni: 5, stile: 'spiritoso', misure: 'altezza 9,5 cm', codice: '4394', disponibili: 240, viste: 6 },
    { id: 'laureato', nome: 'Laureato, 2 assortiti', materiale: 'Statuina', prezzo: 3, feste: ['laurea'], giorni: 5, stile: 'spiritoso', misure: 'altezza 8,5 cm', codice: '4838B', disponibili: 195, viste: 4 },
    { id: 'laureata', nome: 'Laureata, 2 assortite', materiale: 'Statuina', prezzo: 3, feste: ['laurea'], giorni: 5, stile: 'spiritoso', misure: 'altezza 8,5 cm', codice: '4838G', disponibili: 70, viste: 2 },
    { id: 'tralcio-rose', nome: 'Tralcio di rose', materiale: 'Porcellana', prezzo: 2.5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', misure: '8,5 × 5 cm', codice: '4373', disponibili: 475, viste: 2 },
    { id: 'barattolo-confetti', nome: 'Barattolo porta confetti con ciondolo', materiale: 'Vetro', prezzo: 2.9, feste: ['comunione'], giorni: 5, stile: 'classico', misure: '4,5 × 6,5 cm', codice: '052', disponibili: 145, viste: 2 },
    { id: 'vaso-ambra-50', nome: 'Vaso ambra con placca 50', materiale: 'Vetro soffiato con placca argento', prezzo: 8, feste: ['anniversari'], giorni: 5, stile: 'classico', misure: '9,5 × 22 cm', codice: '6436', viste: 3 },
    { id: 'profumatore-sfera', nome: 'Profumatore sfera argento', materiale: 'Con essenza e scatola', prezzo: 7.9, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'moderno', misure: '9 × 8 cm', codice: '2762', disponibili: 120, viste: 2 },
    { id: 'sposi-bianchi', nome: 'Sposi bianchi', materiale: 'Porcellana', prezzo: 6, feste: ['matrimonio'], giorni: 5, stile: 'moderno', misure: 'altezza 15,5 cm', codice: '28101', disponibili: 85, viste: 3 },
    { id: 'sposi-tortora', nome: 'Coppia sposi tortora', materiale: 'Porcellana', prezzo: 6, feste: ['matrimonio'], giorni: 5, stile: 'moderno', misure: 'altezza 15,5 cm', codice: '28100', disponibili: 64, viste: 3 },
    /* Enrico, 04/11/2026 */
    { id: 'papero-terracotta', nome: 'Papero in terracotta, assortiti', materiale: 'Terracotta', prezzo: 1, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', misure: '6 cm', codice: '3971', disponibili: 540, minimo: 16, viste: 2 },
    { id: 'portafoto-elefantino-rosa', nome: 'Portafoto elefantino rosa, 2 forme', materiale: 'Portafoto da tavolo', prezzo: 3.3, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', misure: '10 × 8 cm', codice: '6093', disponibili: 128, minimo: 6, viste: 2 },
    { id: 'portafoto-elefantino-celeste', nome: 'Portafoto elefantino celeste, 2 assortiti', materiale: 'Portafoto da tavolo', prezzo: 3.3, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', misure: '10 × 8 cm', codice: '6092', disponibili: 123, minimo: 6, viste: 2 },
    { id: 'scatola-tocco', nome: 'Scatolina con tocco e nappa, frasi assortite', materiale: 'Scatolina', prezzo: 1.5, feste: ['laurea'], giorni: 5, stile: 'spiritoso', misure: '6,5 × 6,5 cm', codice: '122017', disponibili: 125, minimo: 12, viste: 4 },
    { id: 'appendino-sole-luna', nome: 'Appendino sole, luna e stella, assortiti', materiale: 'Ceramica', prezzo: 2, feste: ['compleanno', 'matrimonio'], giorni: 5, stile: 'spiritoso', misure: '8 cm', codice: '83396', disponibili: 480, minimo: 12, viste: 3 },
    { id: 'vaso-fiori-blu', nome: 'Vaso a fiori blu', materiale: 'Ceramica', prezzo: 6.5, feste: ['matrimonio'], giorni: 5, stile: 'classico', misure: 'altezza 18 cm, ⌀ 9,5 cm', codice: '51061', disponibili: 300, viste: 3, modello: 'assets/prodotti/3d/vaso-fiori-blu.glb' },
    { id: 'bacio', nome: 'Il bacio', materiale: 'Resina effetto porcellana', prezzo: 6.9, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico' },
    { id: 'coppie-bianche', nome: 'Coppie in porcellana', materiale: 'Porcellana bianca', prezzo: 7.5, feste: ['matrimonio'], giorni: 5, stile: 'moderno' },
    { id: 'danza-cristallo', nome: 'Danza sul cristallo', materiale: 'Resina e cristallo', prezzo: 12.9, feste: ['matrimonio', 'anniversari'], giorni: 8, stile: 'classico' },
    { id: 'carillon-elefantino', nome: 'Carillon elefantino', materiale: 'Ceramica', prezzo: 9.9, feste: ['battesimo'], giorni: 5, stile: 'classico' },
    { id: 'cagnolino-palloncino', nome: 'Cagnolino col palloncino', materiale: 'Ceramica lucida', prezzo: 8.5, feste: ['compleanno', 'battesimo'], giorni: 4, stile: 'spiritoso' },
    { id: 'gatto-oro', nome: 'Gatto con foglia oro', materiale: 'Porcellana e oro', prezzo: 11.5, prezzoPieno: 14.9, feste: ['matrimonio', 'anniversari', 'offerte'], giorni: 8, stile: 'classico' },
    { id: 'mappamondo', nome: 'Profumatore mappamondo', materiale: 'Vetro e metallo dorato', prezzo: 9.5, feste: ['laurea', 'matrimonio'], giorni: 4, stile: 'moderno' },
    { id: 'barattolo-miele', nome: 'Dolce come il miele', materiale: 'Ceramica', prezzo: 5.9, feste: ['matrimonio'], giorni: 4, stile: 'spiritoso' },
    { id: 'oliera', nome: 'Liscio come l’olio', materiale: 'Ceramica', prezzo: 6.5, feste: ['matrimonio', 'anniversari'], giorni: 4, stile: 'spiritoso' },
    { id: 'profumiera', nome: 'Profumiera verde acqua', materiale: 'Vetro', prezzo: 7.9, feste: ['comunione', 'cresima', 'matrimonio'], giorni: 5, stile: 'moderno' },
    { id: 'sposini', nome: 'Sposini', materiale: 'Resina dipinta a mano', prezzo: 4.9, feste: ['matrimonio'], giorni: 3, stile: 'spiritoso' },
    { id: 'albero-della-vita', nome: 'Vaso albero della vita', materiale: 'Ceramica decorata a mano', prezzo: 14.9, feste: ['matrimonio', 'anniversari'], giorni: 10, stile: 'classico' },
    { id: 'cuore-maiolica', nome: 'Cuore in maiolica', materiale: 'Maiolica', prezzo: 10.5, feste: ['matrimonio', 'anniversari'], giorni: 8, stile: 'classico' },
    { id: 'stella-sogni', nome: 'Stella dei sogni', materiale: 'Gesso profumato', prezzo: 3.9, feste: ['battesimo', 'comunione'], giorni: 3, stile: 'moderno' },
    { id: 'orologio-argento', nome: 'Orologio in argento', materiale: 'Argento laminato', prezzo: 19.9, feste: ['anniversari', 'matrimonio'], giorni: 6, stile: 'classico' },
    { id: 'elefante-rose', nome: 'Elefante con rose', materiale: 'Porcellana', prezzo: 8.9, feste: ['battesimo', 'matrimonio'], giorni: 6, stile: 'classico' },
    { id: 'vivi-e-ama', nome: 'Vivi e ama all’infinito', materiale: 'Plexiglass e metallo', prezzo: 5.5, prezzoPieno: 7.5, feste: ['matrimonio', 'anniversari', 'offerte'], giorni: 4, stile: 'moderno' },
    { id: 'bacio-grigio', nome: 'Il bacio, grigio perla', materiale: 'Resina effetto pietra', prezzo: 7.2, prezzoPieno: 9.5, feste: ['matrimonio', 'offerte'], giorni: 5, stile: 'moderno' },
    { id: 'gufi-laurea', nome: 'Gufi col tocco', materiale: 'Ceramica dipinta', prezzo: 6.5, feste: ['laurea'], giorni: 3, stile: 'spiritoso' },
    { id: 'sacchetti-laurea', nome: 'Sacchetti Carpe Diem', materiale: 'Raso rosso e confetti', prezzo: 3.5, feste: ['laurea'], giorni: 3, stile: 'spiritoso' },
    { id: 'targhe-comunione', nome: 'Targhe sacre', materiale: 'Resina e argento', prezzo: 6.9, feste: ['comunione', 'cresima'], giorni: 5, stile: 'classico' },
    { id: 'alberi-pergamena', nome: 'Albero della vita con pergamena', materiale: 'Resina e argento', prezzo: 7.9, feste: ['comunione', 'cresima'], giorni: 5, stile: 'classico' },
    { id: 'angioletti', nome: 'Angioletti', materiale: 'Ceramica dipinta', prezzo: 5.9, feste: ['battesimo', 'comunione'], giorni: 4, stile: 'classico' },
    { id: 'orologio-klimt', nome: 'Orologio albero della vita', materiale: 'Legno stampato', prezzo: 13.9, feste: ['matrimonio', 'anniversari'], giorni: 6, stile: 'moderno' },
    { id: 'abbraccio-pietra', nome: 'L’abbraccio', materiale: 'Resina effetto pietra', prezzo: 8.9, feste: ['anniversari', 'matrimonio'], giorni: 5, stile: 'moderno' },
    { id: 'cuori-legno', nome: 'Cuori in legno', materiale: 'Legno naturale', prezzo: 4.5, feste: ['compleanno', 'matrimonio'], giorni: 3, stile: 'moderno' },
    { id: 'scrigno-fiori', nome: 'Scrigno con fiori', materiale: 'Porcellana dipinta', prezzo: 9.5, feste: ['cresima', 'compleanno'], giorni: 6, stile: 'classico' },
    { id: 'sacchetti-cuore', nome: 'Sacchetti col cuore', materiale: 'Organza e ceramica', prezzo: 3.9, prezzoPieno: 4.9, feste: ['comunione', 'battesimo', 'offerte'], giorni: 3, stile: 'spiritoso' },
    { id: 'mestolo', nome: 'Mestolo da cucina', materiale: 'Legno e ceramica', prezzo: 5.2, feste: ['matrimonio', 'compleanno'], giorni: 4, stile: 'spiritoso' }
  ],
  /* Orari detti dal cliente all'incontro del 26/10: bomboniere 9:00–12:30 e 15:30–19:00, abiti 9:30–12:30 e 15:30–19:30 su appuntamento,
     domenica su appuntamento. I giorni di chiusura (lunedì, martedì pomeriggio) vengono dal sito vecchio: da confermare. Ore in decimali, 0 = domenica. */
  orari: { 0: [], 1: [], 2: [[9, 12.5]], 3: [[9, 12.5], [15.5, 19]], 4: [[9, 12.5], [15.5, 19]], 5: [[9, 12.5], [15.5, 19]], 6: [[9, 12.5], [15.5, 19]] },
  orariAbiti: { 0: [], 1: [], 2: [[9.5, 12.5]], 3: [[9.5, 12.5], [15.5, 19.5]], 4: [[9.5, 12.5], [15.5, 19.5]], 5: [[9.5, 12.5], [15.5, 19.5]], 6: [[9.5, 12.5], [15.5, 19.5]] },
  orariTesto: { bomboniere: '9:00–12:30 e 15:30–19:00', abiti: '9:30–12:30 e 15:30–19:30, su appuntamento', domenica: 'Domenica su appuntamento' },
  /* Premi e voti pubblici (Matrimonio.com e Google, verificati il 21/10) */
  premi: { awards: 10, dal: 2017, voto: '4,9', recensioni: 437, url: 'https://www.matrimonio.com/bomboniere/bomboniere-graziella--e75711' }
};

/* Abiti da sposa: non si vendono online, si prova in atelier e la sartoria li fa su misura. Nomi descrittivi dalle foto Instagram di Sposi & Sposi. */
window.GRAZIELLA.abiti = [
  { id: 'sirena-pizzo', nome: 'Sirena in pizzo', linea: 'sirena', nota: 'Pizzo su tutto l’abito, scollo profondo' },
  { id: 'principessa-velo', nome: 'Principessa con velo', linea: 'principessa', nota: 'Gonna ampia e velo lungo' },
  { id: 'scollo-v-raso', nome: 'Scollo a V', linea: 'linea-a', nota: 'Corpetto liscio, gonna morbida' },
  { id: 'sirena-strascico', nome: 'Sirena con strascico', linea: 'sirena', nota: 'Linea aderente che si apre sul fondo' },
  { id: 'velo-cattedrale', nome: 'Velo cattedrale', linea: 'principessa', nota: 'Corpetto ricamato e velo da cerimonia' },
  { id: 'linea-a-giardino', nome: 'Linea ad A', linea: 'linea-a', nota: 'Spalline sottili, gonna leggera' },
  { id: 'pizzo-ricamato', nome: 'Pizzo ricamato', linea: 'sirena', nota: 'Ricamo fitto, linea a sirena' },
  { id: 'strascico-tulle', nome: 'Strascico in tulle', linea: 'principessa', nota: 'Tulle a strati e strascico lungo' },
  { id: 'nero-spacco', nome: 'Bianco e nero con spacco', linea: 'colore', nota: 'Per chi vuole un colore diverso' },
  { id: 'bustier-nero', nome: 'Bustier bicolore', linea: 'colore', nota: 'Corpetto in pizzo nero, gonna a contrasto' },
  { id: 'nero-pizzo', nome: 'Nero in pizzo', linea: 'colore', nota: 'Pizzo nero e gonna ampia' }
];
/* Categorie degli abiti mandate dal negozio nel gruppo (15/10/2026); battesimo e comunione hanno bimba e bimbo */
window.GRAZIELLA.categorieAbiti = [
  { id: 'sposa', nome: 'Abiti da sposa', href: 'abiti.html' },
  { id: 'sposo', nome: 'Abiti da sposo', href: 'abiti.html#sposo', foto: 'assets/img/coppia-danza.webp', nota: 'Su misura, con la sartoria in casa.' },
  { id: 'cerimonia', nome: 'Abiti da cerimonia', href: 'abiti.html#cerimonia', foto: 'assets/img/cerimonia-abbraccio.webp', nota: 'Per chi accompagna gli sposi, mamme e testimoni.' },
  { id: 'battesimo', nome: 'Battesimo', href: 'abiti.html#battesimo', foto: 'assets/img/sposa-bimba.webp', nota: 'Bimba e bimbo.' },
  { id: 'comunione', nome: 'Comunione', href: 'abiti.html#comunione', foto: 'assets/img/comunione-bimbo.webp', nota: 'Bimba e bimbo.' }
];
window.GRAZIELLA.linee = [
  { id: 'sirena', nome: 'Sirena' },
  { id: 'principessa', nome: 'Principessa' },
  { id: 'linea-a', nome: 'Linea ad A' },
  { id: 'colore', nome: 'Colore' }
];

/* Catalogo del prototipo. Nomi descrittivi e prezzi indicativi: in WordPress arriveranno da WooCommerce con i dati veri di Graziella. */
window.GRAZIELLA = {
  feste: [
    { id: 'matrimonio', nome: 'Matrimonio', campo: 'inchiostro', foto: 'coppia-danza' },
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
    { id: 'scatola-roselline', nome: 'Scatola con roselline', materiale: 'Porcellana', prezzo: 4.5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'scatole', colori: ['bianco'], misure: '⌀ 8,8 cm, altezza 4,4 cm', disponibili: 180, viste: 3 },
    { id: 'zuccheriera-blu', nome: 'Zuccheriera blu a puntini', materiale: 'Porcellana', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'tavola', colori: ['blu'], misure: 'altezza 9,7 cm, ⌀ da 9 a 13,5 cm', codice: '94628', disponibili: 370, viste: 4 },
    { id: 'campana-ambra', nome: 'Campana ambra', materiale: 'Vetro soffiato', prezzo: 4, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['oro'], misure: '5 × 9,7 cm', codice: '104C', disponibili: 360, viste: 3 },
    { id: 'anfora-ambra', nome: 'Anfora ambra', materiale: 'Vetro soffiato', prezzo: 5.5, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['oro'], misure: '6 × 18,5 cm', disponibili: 358, viste: 4 },
    { id: 'vaso-righe-blu', nome: 'Vaso a righe blu', materiale: 'Vetro', prezzo: 6, feste: ['matrimonio'], giorni: 5, stile: 'moderno', tipo: 'vasi', colori: ['blu', 'trasparente'], misure: '10 × 11 cm', codice: '97665', disponibili: 220, viste: 3 },
    { id: 'sale-pepe', nome: 'Sale e pepe con portatovaglioli', materiale: 'Base in legno', prezzo: 9, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'tavola', colori: ['marrone', 'bianco'], misure: '20 × 10 cm, altezza 12,5 cm', codice: '28222', disponibili: 295, viste: 2 },
    { id: 'piatto-rose', nome: 'Piatto Limoges con rose', materiale: 'Porcellana di Limoges', prezzo: 9.5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'piatti', colori: ['bianco', 'rosa'], misure: '11,3 × 1,5 cm', codice: '814', disponibili: 718, viste: 2 },
    { id: 'raviera-sposi', nome: 'Raviera Limoges con gli sposi', materiale: 'Porcellana di Limoges', prezzo: 11, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'piatti', colori: ['bianco', 'rosa'], misure: '16,8 × 14,5 × 2,8 cm', codice: '830', disponibili: 525, viste: 2 },
    { id: 'vasetto-pallina', nome: 'Vasetto Pallina rosso', materiale: 'Porcellana di Limoges', prezzo: 10, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['bianco', 'rosso'], misure: '6,5 × 7 cm', codice: '2774', disponibili: 300, viste: 3 },
    { id: 'vasetto-palla-rosa', nome: 'Vasetto Palla rosa', materiale: 'Porcellana di Limoges', prezzo: 10, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['bianco', 'rosa'], misure: '6,5 × 7 cm', codice: '2380', disponibili: 295, viste: 3 },
    { id: 'ciotola-bisquit', nome: 'Ciotola Bisquit Limoges', materiale: 'Porcellana di Limoges', prezzo: 10, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'piatti', colori: ['bianco'], misure: '13,2 × 3,5 cm', disponibili: 510, viste: 2 },
    { id: 'portacandele-frutti', nome: 'Portacandele frutti, 3 assortiti', materiale: 'Porcellana', prezzo: 5, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'tavola', colori: ['giallo', 'verde'], misure: '9,5 × 5 cm; arancio, limoni o melograno', disponibili: 250, viste: 4 },
    { id: 'orologio-angelo', nome: 'Orologio Angelo rosa', materiale: 'Orologio da tavolo', prezzo: 6, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'orologi', colori: ['rosa'], misure: '12 × 12 cm', disponibili: 200, viste: 3 },
    { id: 'bottiglia-veliero', nome: 'Bottiglia con veliero', materiale: 'Vetro', prezzo: 5, feste: ['comunione', 'cresima', 'matrimonio'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['trasparente'], misure: '9 × 11,5 cm', disponibili: 225, viste: 3 },
    { id: 'portachiavi-acciaio', nome: 'Portachiavi rettangolare', materiale: 'Acciaio', prezzo: 4, feste: ['comunione', 'cresima', 'laurea'], giorni: 5, stile: 'moderno', tipo: 'portachiavi', colori: ['argento'], misure: '2,3 × 8 cm', disponibili: 179, viste: 2 },
    { id: 'papero-cristallo', nome: 'Papero di cristallo', materiale: 'Cristallo', prezzo: 5, feste: ['battesimo', 'comunione'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['trasparente'], misure: '3 × 6 cm', disponibili: 200, viste: 3 },
    { id: 'clip-sposi-albero', nome: "Clip portafoto sposi sull'albero, 2 assortiti", materiale: 'Gesso su albero in legno', prezzo: 3, feste: ['matrimonio'], giorni: 5, stile: 'moderno', tipo: 'portafoto', colori: ['bianco', 'marrone'], misure: '6,5 × 10 cm', codice: '616', disponibili: 190, viste: 4 },
    { id: 'portacandele-giglio', nome: 'Portacandele giglio con scatola', materiale: 'Porcellana', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'tavola', colori: ['bianco'], misure: '8,5 × 6,5 cm', codice: '5621', disponibili: 192, viste: 2 },
    { id: 'portachiavi-aereo', nome: 'Portachiavi Aereo', materiale: 'Metallo e strass', prezzo: 3.5, feste: ['battesimo', 'comunione'], giorni: 5, stile: 'spiritoso', tipo: 'portachiavi', colori: ['argento'], misure: '4 × 5 cm', codice: '11734', disponibili: 270, viste: 2 },
    /* Enrico, 03/11/2026 */
    { id: 'portafoto-cicogna', nome: 'Portafoto cicogna, 2 assortiti', materiale: 'Portafoto da tavolo', prezzo: 3, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'portafoto', colori: ['bianco'], misure: '8 × 10 cm; verticale o orizzontale', codice: '6796', disponibili: 240, viste: 3 },
    { id: 'calice-comunione', nome: 'Calice della comunione oro', materiale: 'Soprammobile con dettagli oro', prezzo: 3.8, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'sacri', colori: ['oro', 'argento'], misure: '7 × 8 cm', codice: '55032', disponibili: 144, viste: 2 },
    { id: 'icona-cresima', nome: 'Icona tonda della cresima', materiale: 'Icona da tavolo', prezzo: 2.9, feste: ['cresima'], giorni: 5, stile: 'classico', tipo: 'sacri', colori: ['argento'], misure: '6 × 6,5 cm', disponibili: 97, viste: 2 },
    { id: 'portafoto-calciatore', nome: 'Portafoto calciatore, 2 assortiti', materiale: 'Portafoto da tavolo', prezzo: 4, feste: ['comunione', 'cresima'], giorni: 5, stile: 'spiritoso', tipo: 'portafoto', colori: ['verde'], misure: '7,5 × 9,5 cm', disponibili: 144, viste: 2 },
    { id: 'tempio-bimbo', nome: 'Tempio della comunione, bimbo', materiale: 'Soprammobile', prezzo: 3, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'statuine', colori: ['bianco'], misure: '7,5 × 7,5 cm', codice: '11072', disponibili: 115, viste: 2 },
    { id: 'tempio-bimba', nome: 'Tempio della comunione, bimba', materiale: 'Soprammobile', prezzo: 3, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'statuine', colori: ['bianco'], misure: '7,5 × 7,5 cm', codice: '11073', disponibili: 130, viste: 2 },
    { id: 'fiore-cristallo', nome: 'Fiore di cristallo con rosa rossa', materiale: 'Cristallo e rosa stabilizzata', prezzo: 11, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'decori', colori: ['trasparente', 'rosso'], misure: '7 × 7,5 cm', codice: '35964', viste: 3 },
    /* Enrico, 03/11/2026 pomeriggio */
    { id: 'icona-calice', nome: 'Icona argento con calice', materiale: 'Icona argento', prezzo: 4, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'sacri', colori: ['argento'], misure: '7,5 × 10,5 cm', codice: '51554', disponibili: 73, viste: 2 },
    { id: 'orologio-sposi-cuore', nome: 'Orologio sposi a cuore', materiale: 'Tortora e bianco, con scatola', prezzo: 9.8, feste: ['matrimonio'], giorni: 5, stile: 'moderno', tipo: 'orologi', colori: ['marrone', 'bianco'], misure: '12 × 11 cm', codice: '1207', disponibili: 78 },
    { id: 'calciatori', nome: 'Calciatori, 4 colori assortiti', materiale: 'Statuina', prezzo: 3, feste: ['comunione', 'compleanno'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['colori'], misure: 'altezza 9,5 cm', codice: '4394', disponibili: 240, viste: 6 },
    { id: 'laureato', nome: 'Laureato, 2 assortiti', materiale: 'Statuina', prezzo: 3, feste: ['laurea'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['nero'], misure: 'altezza 8,5 cm', codice: '4838B', disponibili: 195, viste: 4 },
    { id: 'laureata', nome: 'Laureata, 2 assortite', materiale: 'Statuina', prezzo: 3, feste: ['laurea'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['nero'], misure: 'altezza 8,5 cm', codice: '4838G', disponibili: 70, viste: 2 },
    { id: 'tralcio-rose', nome: 'Tralcio di rose', materiale: 'Porcellana', prezzo: 2.5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'decori', colori: ['bianco'], misure: '8,5 × 5 cm', codice: '4373', disponibili: 475, viste: 2 },
    { id: 'barattolo-confetti', nome: 'Barattolo porta confetti con ciondolo', materiale: 'Vetro', prezzo: 2.9, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['trasparente'], misure: '4,5 × 6,5 cm', codice: '052', disponibili: 145, viste: 2 },
    { id: 'vaso-ambra-50', nome: 'Vaso ambra con placca 50', materiale: 'Vetro soffiato con placca argento', prezzo: 8, feste: ['anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['oro'], misure: '9,5 × 22 cm', codice: '6436', viste: 3 },
    { id: 'profumatore-sfera', nome: 'Profumatore sfera argento', materiale: 'Con essenza e scatola', prezzo: 7.9, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'moderno', tipo: 'profumatori', colori: ['argento'], misure: '9 × 8 cm', codice: '2762', disponibili: 120, viste: 2 },
    { id: 'sposi-bianchi', nome: 'Sposi bianchi', materiale: 'Porcellana', prezzo: 6, feste: ['matrimonio'], giorni: 5, stile: 'moderno', tipo: 'statuine', colori: ['bianco'], misure: 'altezza 15,5 cm', codice: '28101', disponibili: 85, viste: 3 },
    { id: 'sposi-tortora', nome: 'Coppia sposi tortora', materiale: 'Porcellana', prezzo: 6, feste: ['matrimonio'], giorni: 5, stile: 'moderno', tipo: 'statuine', colori: ['marrone'], misure: 'altezza 15,5 cm', codice: '28100', disponibili: 64, viste: 3 },
    /* Enrico, 04/11/2026 */
    { id: 'papero-terracotta', nome: 'Papero in terracotta, assortiti', materiale: 'Terracotta', prezzo: 1, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['giallo'], misure: '6 cm', codice: '3971', disponibili: 540, minimo: 16, viste: 2 },
    { id: 'portafoto-elefantino-rosa', nome: 'Portafoto elefantino rosa, 2 forme', materiale: 'Portafoto da tavolo', prezzo: 3.3, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'portafoto', colori: ['rosa'], misure: '10 × 8 cm', codice: '6093', disponibili: 128, minimo: 6, viste: 2 },
    { id: 'portafoto-elefantino-celeste', nome: 'Portafoto elefantino celeste, 2 assortiti', materiale: 'Portafoto da tavolo', prezzo: 3.3, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'portafoto', colori: ['blu'], misure: '10 × 8 cm', codice: '6092', disponibili: 123, minimo: 6, viste: 2 },
    { id: 'scatola-tocco', nome: 'Scatolina con tocco e nappa, frasi assortite', materiale: 'Scatolina', prezzo: 1.5, feste: ['laurea'], giorni: 5, stile: 'spiritoso', tipo: 'scatole', colori: ['nero', 'rosso'], misure: '6,5 × 6,5 cm', codice: '122017', disponibili: 125, minimo: 12, viste: 4 },
    { id: 'appendino-sole-luna', nome: 'Appendino sole, luna e stella, assortiti', materiale: 'Ceramica', prezzo: 2, feste: ['compleanno', 'matrimonio'], giorni: 5, stile: 'spiritoso', tipo: 'decori', colori: ['blu', 'giallo'], misure: '8 cm', codice: '83396', disponibili: 480, minimo: 12, viste: 3 },
    { id: 'sacchetto-rosso-placca', nome: 'Sacchetto rosso con placca argento', materiale: 'Placca argento', prezzo: 4, feste: ['laurea'], giorni: 5, stile: 'classico', tipo: 'scatole', colori: ['rosso', 'argento'], misure: '7 × 10 cm', codice: 'AR5422', disponibili: 100, minimo: 10, viste: 1 },
    { id: 'vaso-fiori-blu', nome: 'Vaso a fiori blu', materiale: 'Ceramica', prezzo: 6.5, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['blu', 'verde'], misure: 'altezza 18 cm, ⌀ 9,5 cm', codice: '51061', disponibili: 300, viste: 3 },
    /* Enrico, 07/11/2026 */
    { id: 'timer-champagne', nome: 'Timer da cucina champagne', materiale: 'Metallo, con scatola', prezzo: 7, feste: ['compleanno', 'matrimonio'], giorni: 5, stile: 'spiritoso', tipo: 'tavola', colori: ['argento'], misure: '7 × 9,5 cm', codice: '8335', viste: 3 },
    { id: 'corno-pulcinella', nome: 'Corno rosso con Pulcinella', materiale: 'Porcellana', prezzo: 7.5, feste: ['matrimonio', 'comunione', 'cresima', 'compleanno'], giorni: 5, stile: 'spiritoso', tipo: 'decori', colori: ['rosso'], misure: 'altezza 12 cm', codice: '15', viste: 3 },
    { id: 'orsetto-rosa-cuscino', nome: 'Orsetto rosa su cuscino, 2 assortiti', materiale: 'Resina', prezzo: 2, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['rosa'], misure: '6,5 × 4,5 × 3,5 cm', codice: '5606', disponibili: 169, viste: 3 },
    { id: 'orsetto-celeste-cuscino', nome: 'Orsetto celeste su cuscino, 2 assortiti', materiale: 'Resina', prezzo: 2, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['blu'], misure: '6,5 × 4,5 × 3,5 cm', codice: '5605', disponibili: 145, viste: 3 },
    { id: 'neonata-fazzoletto', nome: 'Neonata nel fazzoletto, 2 assortiti', materiale: 'Resina', prezzo: 2.9, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['bianco', 'rosa'], misure: '6,7 × 7,5 cm', codice: '112200', disponibili: 119, minimo: 6, viste: 4 },
    { id: 'cuore-calice-preghiera', nome: 'Cuore con calice e preghiera', materiale: 'Resina', prezzo: 5, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'sacri', colori: ['argento'], misure: '12 × 10 cm', codice: '1071272', disponibili: 96, minimo: 4, viste: 2 },
    { id: 'lombrico-laureato', nome: 'Lombrico laureato, 4 assortiti', materiale: 'Resina', prezzo: 3, feste: ['laurea'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['verde', 'rosso'], misure: '6 × 6 cm', codice: 'RA7', disponibili: 245, minimo: 12, viste: 3 },
    { id: 'portachiavi-pallone', nome: 'Portachiavi pallone con apribottiglie', materiale: 'Metallo', prezzo: 3.5, feste: ['comunione', 'compleanno'], giorni: 5, stile: 'spiritoso', tipo: 'portachiavi', colori: ['argento', 'nero'], misure: '3,8 × 7 cm', codice: '46300', disponibili: 203, minimo: 12, viste: 2 },
    { id: 'fatina-resina', nome: 'Fatina in resina lucida, 6 assortite', materiale: 'Resina lucida', prezzo: 3, feste: ['battesimo', 'comunione'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['rosa', 'bianco'], misure: '7 × 6 cm', codice: 'B1985', disponibili: 250, viste: 3 },
    { id: 'profumatore-albero-argento', nome: 'Profumatore bianco con albero argento', materiale: 'Vetro e argento, 100 ml', prezzo: 8.5, feste: ['matrimonio', 'comunione', 'anniversari', 'cresima'], giorni: 5, stile: 'moderno', tipo: 'profumatori', colori: ['bianco', 'argento'], misure: '6 × 6 × 8,5 cm', codice: '35484', viste: 2 },
    { id: 'piatto-ambra-uva', nome: 'Piatto intrecciato ambra con uva', materiale: 'Vetro', prezzo: 3.8, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'piatti', colori: ['oro'], misure: '11 × 11 cm', codice: 'RB90', disponibili: 230, viste: 3 },
    { id: 'globo-colorato', nome: 'Globo colorato', materiale: 'Vetro', prezzo: 6.5, feste: ['matrimonio', 'comunione', 'cresima'], giorni: 5, stile: 'moderno', tipo: 'decori', colori: ['argento', 'blu'], misure: '5 × 5 × 8 cm', codice: '10181182', disponibili: 64, viste: 2 },
    { id: 'globo-serigrafato', nome: 'Globo in vetro serigrafato', materiale: 'Vetro', prezzo: 4, feste: ['matrimonio', 'comunione', 'cresima'], giorni: 5, stile: 'moderno', tipo: 'decori', colori: ['trasparente', 'argento'], misure: '4 × 6 cm', codice: '1164001', disponibili: 45, viste: 2 },
    /* Enrico, 09/11/2026 */
    { id: 'portacandele-ferro', nome: 'Portacandele in ferro battuto con candela', materiale: 'Ferro battuto', prezzo: 6, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'decori', colori: ['nero'], misure: '9 × 12,5 cm', codice: '59806', disponibili: 132, viste: 2 },
    { id: 'alzata-bianca-rosa', nome: 'Alzata bianca e rosa, con scatola', materiale: 'Porcellana', prezzo: 4.5, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'piatti', colori: ['bianco', 'rosa'], misure: '9,5 × 8,5 cm', codice: '98210', disponibili: 270, viste: 3 },
    { id: 'vaso-ambra-decorato', nome: 'Vaso ambra decorato, con scatola', materiale: 'Vetro', prezzo: 6, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['oro'], misure: '11 × 8,5 cm', codice: '7458', disponibili: 144, viste: 3 },
    { id: 'bottiglia-lilium', nome: 'Bottiglia con argento Lilium', materiale: 'Vetro e argento', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['trasparente', 'argento'], misure: '5,5 × 16 cm', codice: '25801', disponibili: 150, viste: 2 },
    { id: 'bottiglia-rosa-porcellana', nome: 'Bottiglia con rosa in porcellana', materiale: 'Vetro e porcellana', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['trasparente', 'rosa'], misure: '5,5 × 13,5 cm', codice: '59887', disponibili: 200, viste: 3 },
    { id: 'scatola-alabastro', nome: 'Scatola ovale in alabastro con fiori dipinti', materiale: 'Alabastro', prezzo: 6.5, feste: ['matrimonio', 'comunione', 'cresima'], giorni: 5, stile: 'classico', tipo: 'scatole', colori: ['rosa', 'bianco'], misure: '8 × 4,5 cm', disponibili: 165, viste: 3 },
    { id: 'scatola-rose-rosse', nome: 'Scatola in vetro con rose rosse e cofanetto', materiale: 'Vetro', prezzo: 6, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'scatole', colori: ['trasparente', 'rosso'], misure: '10 × 8 cm', codice: '91024', disponibili: 225, viste: 6 },
    { id: 'calla-porcellana', nome: 'Calla in porcellana', materiale: 'Porcellana', prezzo: 1, feste: ['offerte'], giorni: 5, stile: 'classico', tipo: 'decori', colori: ['bianco'], misure: '24 cm', codice: '56425', disponibili: 1000, viste: 2 },
    { id: 'barattolo-albero-legno', nome: 'Barattolo in vetro con albero in legno, 3 assortiti', materiale: 'Vetro e legno', prezzo: 4, feste: ['matrimonio', 'comunione', 'cresima'], giorni: 5, stile: 'moderno', tipo: 'scatole', colori: ['trasparente', 'marrone'], misure: '5 × 13,5 cm', disponibili: 96, viste: 3 },
    /* Enrico, 11/11/2026 */
    { id: 'tagliapizza-bugatti', nome: 'Tagliapizza GYM Bugatti, 5 colori', materiale: 'Acciaio e resina', prezzo: 12.9, prezzoPieno: 15, feste: ['matrimonio', 'comunione', 'offerte'], giorni: 5, stile: 'spiritoso', tipo: 'tavola', colori: ['rosso', 'blu', 'giallo', 'verde'], misure: '6,5 × 21,5 cm', codice: '7088', disponibili: 157, viste: 10 },
    { id: 'portachiavi-laurea', nome: 'Portachiavi laurea', materiale: 'Metallo', prezzo: 2.5, prezzoPieno: 3, feste: ['laurea', 'offerte'], giorni: 5, stile: 'spiritoso', tipo: 'portachiavi', colori: ['rosso', 'argento'], misure: '5,5 × 7 cm', disponibili: 150, viste: 2 },
    { id: 'campana-vetro-verde', nome: 'Campana in vetro verde con applicazione, con scatola', materiale: 'Vetro', prezzo: 5, feste: ['matrimonio'], giorni: 5, stile: 'classico', tipo: 'decori', colori: ['verde'], codice: 'B09200', disponibili: 130, viste: 3 },
    { id: 'pesce-ambra', nome: 'Pesce in vetro ambra', materiale: 'Vetro', prezzo: 3.5, feste: ['comunione', 'cresima'], giorni: 5, stile: 'classico', tipo: 'statuine', colori: ['oro', 'trasparente'], misure: '7 × 9 cm', codice: '6358', disponibili: 107, viste: 3 },
    { id: 'portacandele-pendagli', nome: 'Portacandele in vetro soffiato con pendagli', materiale: 'Vetro soffiato', prezzo: 6, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'decori', colori: ['trasparente'], misure: '9 × 18 cm', codice: 'OKN 63', disponibili: 220, viste: 3 },
    /* Enrico, 14/11/2026 (due foto della laureata erano arrivate sotto la didascalia del laureato: spostate guardandole) */
    { id: 'portafoto-bimba-comunione', nome: 'Portafoto bimba comunione', materiale: 'Resina', prezzo: 2.5, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'portafoto', colori: ['bianco', 'rosa'], misure: '7 × 9 cm, foto 4 × 6 cm', codice: '724', disponibili: 118, viste: 3 },
    { id: 'portafoto-bimbo-comunione', nome: 'Portafoto bimbo comunione', materiale: 'Resina', prezzo: 2.5, feste: ['comunione'], giorni: 5, stile: 'classico', tipo: 'portafoto', colori: ['bianco', 'blu'], misure: '7 × 9 cm, foto 4 × 6 cm', codice: '723', disponibili: 118, viste: 3 },
    { id: 'orsetto-calciatore', nome: 'Orsetto calciatore, assortiti', materiale: 'Resina', prezzo: 4.5, feste: ['compleanno', 'comunione'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['blu', 'marrone'], misure: '5 × 10,5 cm', codice: '59743', disponibili: 148, viste: 5 },
    { id: 'dalmata-pois-rosa', nome: 'Dalmata con fiocco rosa', materiale: 'Porcellana', prezzo: 2.2, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['bianco', 'rosa'], misure: '5 × 5,5 cm', codice: '9606211', disponibili: 180, viste: 3 },
    { id: 'portafoto-superman', nome: 'Portafoto Superman, 2 assortiti', materiale: 'Resina', prezzo: 4, feste: ['comunione', 'battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'portafoto', colori: ['blu', 'rosso'], misure: '8,5 × 10,5 cm', codice: '7104', disponibili: 101, viste: 5 },
    { id: 'dalmata-pois-celeste', nome: 'Dalmata con fiocco celeste', materiale: 'Porcellana', prezzo: 2.2, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['bianco', 'blu'], misure: '5 × 5,5 cm', codice: '9606212', disponibili: 490, viste: 3 },
    { id: 'laureata-base', nome: 'Laureata su base, 3 assortite', materiale: 'Resina', prezzo: 2, feste: ['laurea'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['nero', 'rosso'], misure: '4 × 7 cm', codice: '6510', disponibili: 280, viste: 3 },
    { id: 'ciotola-ambra-margherita', nome: 'Ciotola in vetro ambra con margherita, con astuccio', materiale: 'Vetro', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'piatti', colori: ['oro'], misure: '13,5 × 4 cm', disponibili: 250, viste: 3 },
    { id: 'laureato-base', nome: 'Laureato su base, 3 assortiti', materiale: 'Resina', prezzo: 2, feste: ['laurea'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['nero'], misure: '4 × 7 cm', codice: '6509', disponibili: 288, viste: 3 },
    { id: 'calamita-dinosauro', nome: 'Calamita dinosauro, 4 assortite', materiale: 'Resina', prezzo: 1, prezzoPieno: 1.5, feste: ['battesimo', 'offerte'], giorni: 5, stile: 'spiritoso', tipo: 'decori', colori: ['verde', 'blu'], misure: '5 × 4 cm', codice: '9561', viste: 3 },
    { id: 'vaso-biscuit-avorio', nome: 'Vaso in porcellana biscuit avorio, 3 forme', materiale: 'Porcellana biscuit', prezzo: 3.5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'vasi', colori: ['bianco'], misure: 'altezza 15 cm', codice: '51534', disponibili: 240, viste: 5 },
    { id: 'portafoto-vetro-ambra', nome: 'Portafoto in vetro ambra, con astuccio', materiale: 'Vetro', prezzo: 5, feste: ['matrimonio', 'anniversari'], giorni: 5, stile: 'classico', tipo: 'portafoto', colori: ['oro', 'trasparente'], misure: '11 × 15 × 5,5 cm, foto 6 × 9 cm', codice: 'A08730', disponibili: 196, viste: 6 },
    { id: 'coccinella-offerta', nome: 'Coccinella 6 cm', materiale: 'Resina', prezzo: 1, prezzoPieno: 1.5, feste: ['battesimo', 'offerte'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['rosso', 'nero'], misure: 'altezza 6 cm', codice: 'M020300', viste: 3 },
    { id: 'coccinelle-assortite', nome: 'Coccinella, 4 assortite', materiale: 'Resina', prezzo: 2, feste: ['battesimo'], giorni: 5, stile: 'spiritoso', tipo: 'statuine', colori: ['rosso', 'nero'], misure: 'altezza 7 cm', codice: '9084', disponibili: 149, viste: 4 }
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
/* Senza prodotti ribassati la voce Offerte sparisce da tutto il sito; torna da sola appena un prodotto ha prezzoPieno */
if (!window.GRAZIELLA.prodotti.some(p => p.prezzoPieno)) window.GRAZIELLA.feste = window.GRAZIELLA.feste.filter(f => f.id !== 'offerte');

window.GRAZIELLA.filtri = {
  tipi: [['statuine', 'Statuine'], ['vasi', 'Vasi e vetri'], ['portafoto', 'Portafoto'], ['orologi', 'Orologi e carillon'], ['scatole', 'Scatole e sacchetti'], ['tavola', 'Per la tavola'], ['piatti', 'Piatti e ciotole'], ['sacri', 'Icone e sacri'], ['profumatori', 'Profumatori'], ['portachiavi', 'Portachiavi'], ['decori', 'Fiori e decori']],
  colori: [['bianco', 'Bianco e avorio', '#F5F0E6'], ['argento', 'Argento e grigio', 'linear-gradient(135deg,#E9E9E7,#A9A9A6)'], ['oro', 'Oro e ambra', 'linear-gradient(135deg,#EBD08A,#B98A34)'], ['marrone', 'Tortora e marrone', '#A48C74'], ['rosa', 'Rosa', '#EDBBC4'], ['rosso', 'Rosso', '#B3262E'], ['blu', 'Blu e azzurro', '#2F568F'], ['verde', 'Verde', '#6F9A72'], ['giallo', 'Giallo e arancio', '#E7A93C'], ['nero', 'Nero', '#1C1917'], ['trasparente', 'Trasparente', 'linear-gradient(135deg,#fff 45%,#D9E3E6 50%,#fff 55%)'], ['colori', 'Più colori', 'conic-gradient(#D9534F,#E7A93C,#6F9A72,#2F568F,#D9534F)']],
  prezzi: [['a3', 'Fino a 3 €', 0, 3], ['a5', 'Da 3 a 5 €', 3, 5], ['a8', 'Da 5 a 8 €', 5, 8], ['a12', 'Da 8 a 12 €', 8, 12], ['oltre', 'Oltre 12 €', 12, 1e9]],
  materie: [['porcellana', 'Porcellana', /^(?!resina).*porcellana/i], ['ceramica', 'Ceramica e terracotta', /ceramica|maiolica|terracotta/i], ['vetro', 'Vetro e cristallo', /^(vetro|cristallo)/i], ['resina', 'Resina', /resina/i], ['metallo', 'Argento e metallo', /argento|acciaio|metallo/i], ['legno', 'Legno', /legno/i]],
  stili: [['classico', 'Classico'], ['moderno', 'Moderno'], ['spiritoso', 'Spiritoso']]
};

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

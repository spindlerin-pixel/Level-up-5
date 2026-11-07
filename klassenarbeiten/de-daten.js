/* =====================================================================
   Level Up 5 · Deutsch · 6 Probe-HÜs „kurze Vokale“ (Buch S. 354–358)
   Läuft mit dem Klassenarbeits-Modus (ka-tablet.js), Rücksprung in den Rechtschreib-Detektiv.

   strict: true  → Rechtschreibung wird streng bewertet: ein falscher Buchstabe = 0 Punkte,
                   nur ein falscher großer/kleiner Anfangsbuchstabe = ½ Punkt.
   lang: 'de'    → Lückendiktat mit deutscher Stimme, langsam (rate) und mit Pausen.

   Themen (topic = Thema im Rechtschreib-Detektiv):
     kl kurz oder lang · dk Doppelkonsonant · ckz ck/k und tz/z · vk verschiedene Konsonanten
     formen Wortfamilie · satz Fehler-Detektiv · dikt Diktat
   ===================================================================== */
(function () {
  var D = window.LU5KA_DATA = window.LU5KA_DATA || [];
  var DE = {
    eyebrow: 'Deutsch · Klasse 5 · kurze Vokale', back: 'de', lang: 'de', rate: 0.72, pause: 1400, strict: true,
    min: 20, pdfMax: 100, bands: [92, 81, 67, 50, 30],
    rules: 'Keine Tipps und kein Merkzettel – wie in der echten HÜ. Jeder Buchstabe zählt! Lies am Ende jedes Wort noch einmal Buchstabe für Buchstabe.',
    scaleNote: 'Streng wie in der Schule: Ein falscher Buchstabe ist ein Fehler. Nur ein falscher großer oder kleiner Anfangsbuchstabe gibt noch einen halben Punkt. Bei Begründe und Erkläre sucht die App nach Stichwörtern; Eltern können die Punkte dort anpassen.'
  };
  function de(o) { for (var k in DE) if (!(k in o)) o[k] = DE[k]; return o; }
  var RF = ['richtig', 'falsch'], KL = ['kurz', 'lang'];
  var GAP_TIP = 'Der Hinweis in Klammern verrät dir, welches Wort gemeint ist. Schreib nur die fehlenden Buchstaben in die Lücke.';
  /* Lückenwort mit Bedeutungs-Hinweis, damit nur ein Wort passt (z. B. Ofen statt offen) */
  function W(w, c) { return w + ' <span class="ka-clue" style="opacity:.7;font-size:.9em;font-style:italic">(' + c + ')</span>'; }

  /* Begründe/Erkläre: Stichwörter (der Text wird vorher klein geschrieben) */
  var KURZ = /kurz/;
  var EIN_KONS = /nur ein|einen konsonant|ein konsonant|einen mitlaut|ein mitlaut|einen buchstaben|nur einmal|ein z\b|ein k\b|zz|kk|verdopp|doppel/;
  var NIE_CK = /(nie|kein|nicht)\w*[^.]{0,40}ck|ck[^.]{0,40}(nie|nicht|kein)/;
  var NIE_TZ = /(nie|kein|nicht)\w*[^.]{0,40}tz|tz[^.]{0,40}(nie|nicht|kein)|nur (ein )?z\b/;
  /* ein Beispielwort mit doppeltem Konsonanten – Füllwörter wie wenn, dann, doppelt zählen nicht */
  var BEISPIEL = /\b(?!verdopp|doppel|wenn\b|dann\b|denn\b|kann\b|können|immer\b|alle|will\b|soll|kommt\b|bekommt|muss|dass|wissen|man\b)[a-zäöüß]*(ll|mm|nn|pp|tt|ff|rr|ck|tz)[a-zäöüß]*\b/;

  /* ------------------------------------------------------------ 1 */
  D.push(de({ id: 'd1', nr: 1, name: 'Probe-HÜ 1', lvl: 'Warm-up', pc: '#FFD66B', sub: 'Kurz oder lang? · Doppelkonsonant · ck und tz · Regeln',
    tasks: [
    { h: 'Kurz oder lang?', de: 'Sprich das Wort leise. Ist der betonte Vokal kurz oder lang?', topic: 'kl', parts: [
      { t: 'pick', opts: KL, items: [['Sonne', 0], ['Hose', 1], ['Katze', 0], ['Blume', 1], ['Bett', 0], ['Tafel', 1], ['Stock', 0], ['Nase', 1]] }
    ]},
    { h: 'Doppelt oder einfach?', de: 'Ein Buchstabe oder zwei?', topic: 'dk', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('Te{}er', 'darauf liegt das Essen'), 'll'], [W('So{}er', 'die heißeste Jahreszeit'), 'mm'], [W('Na{}e', 'so heißt du'), 'm'], [W('Ke{}er', 'Raum unter dem Haus'), 'll'], [W('Bu{}er', 'kommt aufs Brot'), 'tt'], [W('O{}en', 'darin backt man Kuchen'), 'f'], [W('Pu{}e', 'Spielzeug zum Anziehen'), 'pp'], [W('Wa{}er', 'man trinkt es'), 'ss']] }
    ]},
    { h: 'ck oder k? tz oder z?', de: 'Setze richtig ein.', topic: 'ckz', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('Ja{}e', 'zieht man an, wenn es kalt ist'), 'ck'], [W('Mü{}e', 'Kopfbedeckung im Winter'), 'tz'], [W('Schran{}', 'darin hängen Kleider'), 'k'], [W('Her{}', 'schlägt in der Brust'), 'z'], [W('Zu{}er', 'macht den Tee süß'), 'ck'], [W('Pla{}', 'hier ist noch frei'), 'tz'], [W('Hei{}ung', 'macht im Winter warm'), 'z'], [W('Schne{}e', 'Tier mit Haus auf dem Rücken'), 'ck']] }
    ]},
    { h: 'Stimmt die Regel?', de: 'Richtig oder falsch?', topic: 'ckz', parts: [
      { t: 'tf', labels: RF, items: [
        ['Nach einem kurzen Vokal schreibt man ck statt kk.', true],
        ['Nach l, m, n und r schreibt man tz.', false],
        ['Nach ei, au und eu steht nie ck und nie tz.', true],
        ['Nach einem langen Vokal wird der Konsonant verdoppelt.', false],
        ['Hört man nach einem kurzen Vokal zwei verschiedene Konsonanten, wird keiner verdoppelt.', true]] }
    ]},
    { h: 'Begründe', de: 'In einem ganzen Satz.', topic: 'ckz', parts: [
      { t: 'op', items: [['Begründe', 'Warum schreibt man „Katze“ mit tz?', 2, [
        ['Das a ist kurz (kurzer Vokal).', KURZ],
        ['Danach hört man nur einen Konsonanten. Statt zz schreibt man tz.', EIN_KONS]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 2 */
  D.push(de({ id: 'd2', nr: 2, name: 'Probe-HÜ 2', lvl: 'Normal', pc: '#8FD3FF', sub: 'Lückendiktat · Wortfamilie · Fehler-Detektiv · Welche Regel?',
    tasks: [
    { h: 'Lückendiktat', de: 'Hör zu und schreib die fehlenden Wörter.', topic: 'dikt', parts: [
      { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal, Satz für Satz. Schreib die fehlenden Wörter in die Lücken. Achte auf Groß- und Kleinschreibung.',
        text: 'Im {Sommer} sitzt unsere {Katze} gern auf der warmen {Treppe}. Sie beobachtet die {Mücken} und den kleinen {Spatz} im {Garten}. Plötzlich {springt} sie hoch. Doch der Vogel ist schon weg. {Schnell} läuft sie zurück auf ihren {Platz} und {leckt} sich die Pfoten.' }
    ]},
    { h: 'Wortfamilie', de: 'Die Schreibweise bleibt gleich!', topic: 'formen', parts: [
      { t: 'words', items: [['schwimmen → er …', 'schwimmt'], ['stellen → sie …', 'stellt'], ['packen → er …', 'packt'], ['sitzen → du …', 'sitzt'], ['der Ball → die …', 'Bälle'], ['das Schiff → die …', 'Schiffe'], ['kennen → sie …', 'kennt'], ['schmecken → es …', 'schmeckt']] }
    ]},
    { h: 'Fehler-Detektiv', de: 'Das Wort hinter dem Pfeil ist falsch. Schreib es richtig.', topic: 'satz', parts: [
      { t: 'words', items: [['Der Hund liegt unter der Deke. → Deke', 'Decke'], ['Ich trinke Kakao mit Zuker. → Zuker', 'Zucker'], ['Im Wintter ist es kalt. → Wintter', 'Winter'], ['Die Kinder renen über den Hof. → renen', 'rennen'], ['Mein Hertz klopft schnell. → Hertz', 'Herz'], ['Der Bäker backt Brot. → Bäker', 'Bäcker']] }
    ]},
    { h: 'Welche Regel passt?', de: 'Ordne jedes Wort zu.', topic: 'vk', parts: [
      { t: 'sort', groups: ['Doppelkonsonant', 'ck / tz', 'zwei verschiedene Konsonanten'], words: [
        ['Mutter', 0], ['Glocke', 1], ['Winter', 2], ['Wolke', 2], ['Pfütze', 1], ['Löffel', 0], ['Lampe', 2], ['Brücke', 1], ['Kamm', 0]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 3 */
  D.push(de({ id: 'd3', nr: 3, name: 'Probe-HÜ 3', lvl: 'Normal+', pc: '#B9E6B0', sub: 'ck/k und tz/z genau · nach l, m, n, r · nach ei, au, eu · Silben',
    tasks: [
    { h: 'ck oder k?', de: 'Denk an: kurzer Vokal? l, m, n, r? langer Vokal?', topic: 'ckz', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('Ban{}', 'Sitz im Park'), 'k'], [W('Brü{}e', 'führt über den Fluss'), 'ck'], [W('Fal{}e', 'Greifvogel'), 'k'], [W('De{}el', 'liegt auf dem Topf'), 'ck'], [W('Pau{}e', 'große Trommel'), 'k'], [W('Sto{}', 'Stab zum Gehen'), 'ck'], [W('den{}en', 'mit dem Kopf überlegen'), 'k'], [W('Ha{}en', 'daran hängt man die Jacke'), 'k']] }
    ]},
    { h: 'tz oder z?', de: 'Gleiche Regeln wie bei ck und k.', topic: 'ckz', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('Mü{}e', 'Kopfbedeckung im Winter'), 'tz'], [W('Pil{}', 'wächst im Wald'), 'z'], [W('Schnau{}e', 'das Maul vom Hund'), 'z'], [W('pu{}en', 'sauber machen'), 'tz'], [W('Ker{}e', 'brennt mit einer Flamme'), 'z'], [W('je{}t', 'in diesem Moment'), 'tz'], [W('tan{}en', 'zur Musik bewegen'), 'z'], [W('Spi{}e', 'das spitze Ende vom Bleistift'), 'tz']] }
    ]},
    { h: 'Richtig getrennt?', de: 'Tippe die richtige Trennung an.', topic: 'ckz', parts: [
      { t: 'pick', items: [['', ['Zu-cker', 'Zuc-ker', 'Zuck-er'], 0], ['', ['Ka-tze', 'Kat-ze', 'Katz-e'], 1], ['', ['Glock-e', 'Glo-cke', 'Gloc-ke'], 1], ['', ['Pfü-tze', 'Pfütz-e', 'Pfüt-ze'], 2], ['', ['Son-ne', 'So-nne', 'Sonn-e'], 0]] }
    ]},
    { h: 'Rechtschreib-Detektiv', de: 'Stimmt die Begründung?', topic: 'ckz', parts: [
      { t: 'tf', labels: RF, items: [
        ['„Schrank“ schreibt man mit k, weil vor dem k ein n steht.', true],
        ['„Heizung“ schreibt man mit z, weil davor ei steht.', true],
        ['„Blitz“ schreibt man mit tz, weil das i lang ist.', false],
        ['„Haken“ schreibt man mit k, weil das a lang ist.', true],
        ['„Pilz“ schreibt man mit tz, weil das i kurz ist.', false]] }
    ]},
    { h: 'Erkläre', de: 'Die ganze Regel.', topic: 'ckz', parts: [
      { t: 'op', items: [['Erkläre', 'Wann schreibt man ck und tz? Wann nicht?', 3, [
        ['Nach einem kurzen Vokal …', KURZ],
        ['… wenn man nur einen Konsonanten hört (statt kk und zz).', EIN_KONS],
        ['Nicht nach l, m, n, r und nicht nach ei, au, eu (oder einem langen Vokal).', /l, ?m, ?n|l m n r|lmnr|nach (dem )?[lmnr]\b|\bei\b|\bau\b|\beu\b|lange[nm]? vokal/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 4 */
  D.push(de({ id: 'd4', nr: 4, name: 'Probe-HÜ 4', lvl: 'Normal', pc: '#FFB3C7', sub: 'Doppelkonsonant oder verschiedene Konsonanten · Wortfamilie · Lückendiktat',
    tasks: [
    { h: 'Welche Schreibweise stimmt?', de: 'Tippe an.', topic: 'vk', parts: [
      { t: 'pick', items: [['', ['Manntel', 'Mantel'], 1], ['', ['Suppe', 'Supe'], 0], ['', ['Hemmd', 'Hemd'], 1], ['', ['Kopf', 'Kopff'], 0], ['', ['Löfel', 'Löffel'], 1], ['', ['Gabel', 'Gabbel'], 0], ['', ['Hunnd', 'Hund'], 1], ['', ['Teller', 'Teler'], 0]] }
    ]},
    { h: 'Setze ein', de: 'Ein Buchstabe oder zwei?', topic: 'dk', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('Hi{}el', 'oben, oft blau'), 'mm'], [W('fa{}en', 'nach unten stürzen'), 'll'], [W('Wa{}d', 'viele Bäume'), 'l'], [W('Ki{}d', 'ein kleiner Mensch'), 'n'], [W('Ra{}e', 'Nagetier, größer als eine Maus'), 'tt'], [W('Ta{}e', 'ein Nadelbaum'), 'nn'], [W('He{}bst', 'Jahreszeit mit bunten Blättern'), 'r'], [W('Fe{}', 'Haarkleid eines Tieres'), 'll'], [W('Mi{}ch', 'weißes Getränk von der Kuh'), 'l']] }
    ]},
    { h: 'Wortfamilie', de: 'Schreib die passende Form.', topic: 'formen', parts: [
      { t: 'words', items: [['fallen → es …', 'fällt'], ['kommen → sie …', 'kommt'], ['rollen → der Ball …', 'rollt'], ['brennen → das Feuer …', 'brennt'], ['die Mutter → die …', 'Mütter'], ['der Stall → die …', 'Ställe'], ['nehmen → er …', 'nimmt']] }
    ]},
    { h: 'Lückendiktat', de: 'Hör zu und schreib die fehlenden Wörter.', topic: 'dikt', parts: [
      { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal, Satz für Satz. Schreib die fehlenden Wörter in die Lücken.',
        text: 'Am {Morgen} holt der Bauer die {Kannen} aus dem {Stall}. Die {Sonne} scheint, und im {Wald} {singen} die Vögel. Seine {Schwester} {rennt} schnell zum Bus. Sie kommt nie zu spät.' }
    ]},
    { h: 'Begründe', de: 'In einem ganzen Satz.', topic: 'vk', parts: [
      { t: 'op', items: [['Begründe', 'Warum schreibt man „Wolke“ nicht mit ll?', 2, [
        ['Nach dem kurzen o hört man zwei verschiedene Konsonanten (l und k).', /zwei|verschieden|l und k|\blk\b/],
        ['Dann wird kein Konsonant verdoppelt.', /nichts? (mehr )?verdopp|kein\w*[^.]{0,30}verdopp|nur ein l|keiner|nichts? doppelt|kein doppel/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 5 */
  D.push(de({ id: 'd5', nr: 5, name: 'Probe-HÜ 5', lvl: 'Profi', pc: '#9FE3D6', sub: 'Ganze Wörter schreiben · Fehler selbst finden · kurz oder lang · Regel mit Beispiel',
    tasks: [
    { h: 'ck, k, tz oder z?', de: 'Schreib das ganze Wort richtig.', topic: 'ckz', parts: [
      { t: 'words', items: [['Glo_e', 'Glocke'], ['Bli_', 'Blitz'], ['Mar_t', 'Markt'], ['Kreu_', 'Kreuz'], ['Ja_e', 'Jacke'], ['Schmer_', 'Schmerz'], ['E_e', 'Ecke'], ['kra_en', 'kratzen']] }
    ]},
    { h: 'Fehler finden', de: 'In jedem Satz ist ein Wort falsch. Schreib es richtig.', topic: 'satz', parts: [
      { t: 'words', items: [['Die Schneke kriecht über das Blatt.', 'Schnecke'], ['Im Somer gehen wir ins Freibad.', 'Sommer'], ['Der Hund bellt laut im Gartten.', 'Garten'], ['Meine Oma strikt einen Schal.', 'strickt'], ['Der Artzt hilft dem kranken Kind.', 'Arzt'], ['Wir sitzen auf der Bannk.', 'Bank'], ['Die Kinder schwimen im See.', 'schwimmen'], ['Ein Spaz sitzt auf dem Dach.', 'Spatz']] }
    ]},
    { h: 'Kurz oder lang?', de: 'Achtung, Wortpaare!', topic: 'kl', parts: [
      { t: 'sort', groups: ['kurzer Vokal', 'langer Vokal'], words: [['Bett', 0], ['Beet', 1], ['offen', 0], ['Ofen', 1], ['Hütte', 0], ['Hüte', 1], ['Stall', 0], ['Stahl', 1]] }
    ]},
    { h: 'Grundform und Mehrzahl', de: 'Die Schreibweise bleibt gleich.', topic: 'formen', parts: [
      { t: 'words', items: [['er stellt → Grundform', 'stellen'], ['sie schwimmt → Grundform', 'schwimmen'], ['das Bett → die …', 'Betten'], ['der Blitz → es …', 'blitzt'], ['die Hütte → die …', 'Hütten'], ['er sitzt → Grundform', 'sitzen']] }
    ]},
    { h: 'Erkläre', de: 'Regel und ein eigenes Beispiel.', topic: 'dk', parts: [
      { t: 'op', items: [['Erkläre', 'Wann verdoppelt man einen Konsonanten? Nenne auch ein Beispielwort.', 3, [
        ['Nach einem kurzen (betonten) Vokal …', KURZ],
        ['… wenn man nur einen Konsonanten hört.', EIN_KONS],
        ['Ein passendes Beispiel, z. B. Sonne, Teller, Mutter.', BEISPIEL]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 6 */
  D.push(de({ id: 'd6', nr: 6, name: 'Probe-HÜ 6', lvl: 'Generalprobe', pc: '#C9B8FF', sub: 'Wie bei der Lehrerin: Diktat, alle Regeln gemischt, Fehler, Wortfamilie, Begründe',
    tasks: [
    { h: 'Lückendiktat', de: 'Hör zu und schreib die fehlenden Wörter.', topic: 'dikt', parts: [
      { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal, Satz für Satz. Schreib die fehlenden Wörter in die Lücken.',
        text: 'Der {Imker} öffnet vorsichtig den {Deckel}. Tausende Bienen {summen} um ihn herum. Sie {sammeln} Nektar und bringen ihn in den {Stock}. Die Königin {sitzt} in der Mitte. Im {Winter} bleiben alle Bienen ganz {dicht} zusammen. Der {Honig} {schmeckt} sehr {lecker}.' }
    ]},
    { h: 'Alle Regeln gemischt', de: 'Setze die fehlenden Buchstaben ein.', topic: 'dk', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('Tre{}e', 'Stufen nach oben'), 'pp'], [W('Pfa{}e', 'darin brät man Eier'), 'nn'], [W('Bli{}', 'leuchtet beim Gewitter'), 'tz'], [W('Wi{}el', '90° ist ein rechter …'), 'nk'], [W('Hi{}e', 'große Wärme'), 'tz'], [W('Schu{}e', 'dorthin gehst du morgens'), 'l'], [W('O{}t', 'eine Stelle, ein Platz'), 'r'], [W('Ke{}e', 'Schmuck um den Hals'), 'tt'], [W('Kreu{}', 'Zeichen aus zwei Balken'), 'z']] }
    ]},
    { h: 'Fehler-Detektiv', de: 'In jedem Satz ist ein Wort falsch. Schreib es richtig.', topic: 'satz', parts: [
      { t: 'words', items: [['Wir paken die Koffer.', 'packen'], ['Die Katze sizt auf dem Sofa.', 'sitzt'], ['Der Wekker klingelt um sieben.', 'Wecker'], ['Das Waser ist kalt.', 'Wasser'], ['Mein Bruder ist sehr starck.', 'stark'], ['Im Herbst fallen die Bläter.', 'Blätter']] }
    ]},
    { h: 'Wortfamilie', de: 'Schreib die passende Form.', topic: 'formen', parts: [
      { t: 'words', items: [['brummen → der Bär …', 'brummt'], ['schwitzen → sie …', 'schwitzt'], ['der Platz → die …', 'Plätze'], ['die Katze → das kleine …', 'Kätzchen'], ['treffen → er …', 'trifft']] }
    ]},
    { h: 'Begründe und Erkläre', de: 'In ganzen Sätzen.', topic: 'ckz', parts: [
      { t: 'op', items: [
        ['Begründe', 'Warum schreibt man „Schrank“ nicht mit ck?', 2, [
          ['Vor dem k steht ein n (ein Konsonant).', /\bn\b|vor dem k|l, ?m, ?n|l m n r|lmnr|konsonant/],
          ['Nach l, m, n, r steht nie ck.', NIE_CK]]],
        ['Erkläre', 'Warum schreibt man „Heizung“ mit z und nicht mit tz?', 2, [
          ['Vor dem z steht ei (ein Doppellaut).', /\bei\b|doppellaut|zwielaut|diphthong/],
          ['Nach ei, au, eu steht nie tz.', NIE_TZ]]]] }
    ]}
  ]}));
})();

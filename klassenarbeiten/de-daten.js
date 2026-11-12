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

/* =====================================================================
   Level Up 5 · Deutsch · 6 Probe-HÜs „lange Vokale“ (HÜ am Montag, 16.11.2026)
   Regeln wie im Heft (Hefteintrag vom 4.11.): Regel 5 einfach · Regel 6 Dehnungs-h (Verben: Infinitiv in Silben trennen)
   · Regel 7 verdoppelter Vokal (auswendig lernen, ää/üü gibt es nicht) · Regel 8 ie  (Buch S. 363–371 als Zusatz)
   Aufbau wie die HÜ von Frau Vester am 9.11.: Merksätze als Lückentext, falsche Wörter + Regel,
   3. Person Singular, Fehler im Satz finden und NUR das Wort richtig schreiben.
   ===================================================================== */
(function () {
  var D = window.LU5KA_DATA = window.LU5KA_DATA || [];
  var DE = {
    eyebrow: 'Deutsch · Klasse 5 · lange Vokale', back: 'de', lang: 'de', rate: 0.72, pause: 1400, strict: true,
    min: 15, pdfMax: 100, bands: [92, 81, 67, 50, 30],
    rules: 'Keine Tipps und kein Merkzettel – wie in der echten HÜ. Lies jede Aufgabe zweimal: Was genau sollst du hinschreiben – ein Wort, einen Buchstaben oder eine Regel? Am Ende jedes Wort Buchstabe für Buchstabe prüfen.',
    scaleNote: 'Streng wie in der Schule: Ein falscher Buchstabe ist ein Fehler. Nur ein falscher großer oder kleiner Anfangsbuchstabe gibt noch einen halben Punkt. Bei Beispielen, Begründe und Erkläre sucht die App nach Stichwörtern; Eltern können die Punkte dort anpassen.'
  };
  function de(o) { for (var k in DE) if (!(k in o)) o[k] = DE[k]; return o; }
  var RF = ['richtig', 'falsch'], KL = ['kurz', 'lang'];
  var REGELN = ['Regel 5: einfach', 'Regel 6: Dehnungs-h', 'Regel 7: aa, ee, oo', 'Regel 8: ie'];
  var GAP_TIP = 'Der Hinweis in Klammern verrät dir, welches Wort gemeint ist. Schreib nur die fehlenden Buchstaben in die Lücke.';
  var FIX_TIP = 'Lies genau: Schreib nur das verbesserte Wort – nicht den ganzen Satz!';
  var VERB_TIP = 'Schreib nur die Verbform (z. B. fällt). „er, sie, es“ davor darfst du auch schreiben.';
  function W(w, c) { return w + ' <span class="ka-clue" style="opacity:.7;font-size:.9em;font-style:italic">(' + c + ')</span>'; }
  /* 3. Person: nur die Form oder mit „er, sie, es“ davor */
  function V(inf, form) { return [inf + ' = er, sie, es …', form + '|er, sie, es ' + form + '|er,sie,es ' + form + '|er sie es ' + form, form]; }

  /* Merksätze: Lücken – Wortlaut wie im Heft (Regel 5–8), alle sinnvollen Schreibweisen zählen */
  var M = {
    r5: ['Regel 5: Lang ausgesprochener Vokal – {} geschrieben.', 'einfach'],
    r5a: ['Die meisten Wörter mit einem lang ausgesprochenen Vokal schreibt man mit {} Buchstaben.', 'einfachen|einfachem'],
    r6a: ['In einigen Wörtern steht hinter dem lang ausgesprochenen Vokal ein {} als Dehnungszeichen.', 'h|Dehnungs-h|Dehnungs h'],
    r6b: ['Bei Verben kann man das Dehnungs-h häufig hören, wenn man das Verb im {} in Silben trennt.', 'Infinitiv|Infinitiv (Grundform)|Grundform'],
    r6c: ['Bei Verben kann man das Dehnungs-h häufig hören, wenn man das Verb im {} in {} trennt.', 'Infinitiv|Infinitiv (Grundform)|Grundform', 'Silben'],
    r7a: ['Manche Wörter werden mit {} Vokal geschrieben.', 'verdoppeltem|doppeltem|verdoppelten|doppelten'],
    r7b: ['Am besten lernt man diese Wörter {}.', 'auswendig'],
    r7c: ['Wichtig: ää und üü gibt es im Deutschen {}.', 'nicht|nie'],
    r8a: ['Die meisten Wörter mit lang ausgesprochenem i werden mit {} geschrieben.', 'ie'],
    fremd: ['Zusatz aus dem Buch: Wörter aus anderen Sprachen wie Tiger und Kino schreibt man nur mit {}.', 'i'],
    ih: ['Zusatz aus dem Buch: Mit ih schreibt man nur ihr, ihm, {} und ihnen.', 'ihn']
  };
  /* Silben: se-hen, auch mit Leerzeichen oder langem Strich */
  function S(w, x, y) { return [w, [x + '-' + y, x + ' - ' + y, x + ' – ' + y, x + '–' + y, x + ' -' + y, x + '- ' + y].join('|'), x + '-' + y]; }
  function ML(keys) { return keys.map(function (k) { return M[k]; }); }

  /* Beispiele: die App erkennt passende Wörter an ihrer Schreibweise */
  var BSP_H = ['Ein Wort mit Dehnungs-h, z. B. Zahl, Huhn, Ohr, Uhr, Bohne, gehen, sehen.', /[aeiouäöü]h/];
  var BSP_AEO = ['Ein Wort mit verdoppeltem Vokal, z. B. Fee, Kaffee, Moor, Moos, Staat, Allee, Aal (jedes passende Wort zählt).', /aa|ee|oo/];
  var BSP_IE = ['Ein Wort mit ie, z. B. Biene, Wiese, Brief.', /ie/];
  var BSP_1 = ['Ein Wort mit langem Vokal ohne Zeichen, z. B. Vase, Dose, Nashorn, holen, Besen, nämlich, Rose, Säge.', /(vase|nashorn|nämlich|dämlich|hose|nase|blume|tafel|schule|name|nudel|gabel|ofen|igel|hase|rose|dose|krone|brot|tag|zug|mut|regen|lesen|besen|plan|rabe|wabe|honig|tomate|schal|tor|rot|not|kamel|bluse|lama|sofa|zebra|schaf|grab|weg|rad|bär|käse|säge|öl|öfen|hüte|übel|tür|grün|schön|hören|lügen|fragen|sagen|malen|holen|leben|geben|reden|baden|loben|fegen|legen|wagen)/];

  /* ------------------------------------------------------------ 1 */
  D.push(de({ id: 'l1', nr: 1, name: 'Probe-HÜ 1', lvl: 'Warm-up', pc: '#FFD66B', sub: 'Merksätze mit Wörterkasten · kurz oder lang? · Welche Regel? · Begründe',
    tasks: [
    { h: 'Merksätze', de: 'Fülle den Lückentext aus. Die Wörter im Kasten helfen dir.', topic: 'merk', parts: [
      { t: 'gaps', box: 'einfachen h Infinitiv verdoppeltem auswendig ie', lines: ML(['r5a', 'r6a', 'r6b', 'r7a', 'r7b', 'r8a']) }
    ]},
    { h: 'Kurz oder lang?', de: 'Sprich das Wort leise. Ist der betonte Vokal kurz oder lang?', topic: 'kl', parts: [
      { t: 'pick', opts: KL, items: [['Schal', 1], ['Schall', 0], ['Miete', 1], ['Mitte', 0], ['Ofen', 1], ['offen', 0], ['Wahl', 1], ['Wall', 0]] }
    ]},
    { h: 'Welche Regel passt?', de: 'Ordne jedes Wort seiner Regel zu.', topic: 'regel', parts: [
      { t: 'sort', groups: REGELN, words: [['Nase', 0], ['Zahn', 1], ['Boot', 2], ['Wiese', 3], ['Blume', 0], ['Uhr', 1], ['Tee', 2], ['Biene', 3], ['Tafel', 0]] }
    ]},
    { h: 'Stimmt die Regel?', de: 'Richtig oder falsch?', topic: 'merk', parts: [
      { t: 'tf', labels: RF, items: [
        ['Die meisten Wörter mit langem Vokal haben ein Dehnungs-h.', false],
        ['Bei Verben hört man das Dehnungs-h oft, wenn man den Infinitiv in Silben trennt: ge-hen, se-hen.', true],
        ['Fee, Kaffee und Moos sind Wörter mit verdoppeltem Vokal.', true],
        ['Das lange i schreibt man meistens nur mit i.', false],
        ['ää und üü gibt es im Deutschen nicht.', true]] }
    ]},
    { h: 'Begründe', de: 'In einem ganzen Satz.', topic: 'ie', parts: [
      { t: 'op', items: [['Begründe', 'Warum schreibt man „Wiese“ mit ie?', 2, [
        ['Das i ist lang (langer Vokal).', /lang/],
        ['Die meisten Wörter mit lang ausgesprochenem i schreibt man mit ie (Regel 8).', /ie|meistens|regel 8|8\. regel/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 2 */
  D.push(de({ id: 'l2', nr: 2, name: 'Probe-HÜ 2', lvl: 'Normal', pc: '#8FD3FF', sub: 'Lückendiktat · mit oder ohne h? · 3. Person · Fehler im Satz',
    tasks: [
    { h: 'Lückendiktat', de: 'Hör zu und schreib die fehlenden Wörter.', topic: 'dikt', parts: [
      { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal, Satz für Satz. Schreib die fehlenden Wörter in die Lücken. Achte auf Groß- und Kleinschreibung.',
        text: 'Am Wochenende {fahren} wir mit der {Bahn} in den {Zoo}. Zuerst {sehen} wir den {Tiger}. Er {liegt} faul auf der {Wiese}. Danach streicheln wir die {Ziegen}. Am Abend sind alle {müde}, aber sehr {zufrieden}.' }
    ]},
    { h: 'Mit oder ohne h?', de: 'Tippe die richtige Schreibweise an.', topic: 'h', parts: [
      { t: 'pick', items: [['', ['Zahl', 'Zal'], 0], ['', ['Schuhle', 'Schule'], 1], ['', ['Fehler', 'Feler'], 0], ['', ['Nahme', 'Name'], 1], ['', ['Stul', 'Stuhl'], 1], ['', ['Hose', 'Hohse'], 0], ['', ['fahren', 'faren'], 0], ['', ['Bluhme', 'Blume'], 1]] }
    ]},
    { h: '3. Person Singular', de: 'Schreibe zu den Infinitiven die 3. Person Singular (er/sie/es) Präsens. Beispiel: malen = er, sie, es malt', topic: 'formen', parts: [
      { t: 'words', tip: VERB_TIP, items: [V('wohnen', 'wohnt'), V('fahren', 'fährt'), V('zählen', 'zählt'), V('fühlen', 'fühlt'), V('nehmen', 'nimmt'), V('sehen', 'sieht')] }
    ]},
    { h: 'Fehler im Satz', de: 'In jedem Satz ist ein Fehler versteckt. Schreib die richtige Schreibweise des Wortes auf.', topic: 'satz', parts: [
      { t: 'words', tip: FIX_TIP, items: [['Ich habe einen Feler gemacht.', 'Fehler'], ['Die Kuh frisst Gras auf der Wise.', 'Wiese'], ['Wir faren mit dem Bus zur Schule.', 'fahren'], ['Der Tieger schläft im Schatten.', 'Tiger'], ['Opa trinkt Te mit Honig.', 'Tee'], ['Mein Stul wackelt.', 'Stuhl']] }
    ]},
    { h: 'Begründe', de: 'In einem ganzen Satz.', topic: 'h', parts: [
      { t: 'op', items: [['Begründe', 'Warum schreibt man „Stuhl“ mit h?', 2, [
        ['Das u ist lang (langer Vokal).', /lang/],
        ['Hinter dem lang ausgesprochenen u steht ein h als Dehnungszeichen (Regel 6).', /dehnung|h als|regel 6|6\. regel|merk|auswendig/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 3 */
  D.push(de({ id: 'l3', nr: 3, name: 'Probe-HÜ 3', lvl: 'Normal+', pc: '#B9E6B0', sub: 'Merksätze ohne Hilfe · verdoppelter Vokal · Härchen und Bötchen · ie, i oder ih? · paar/Paar',
    tasks: [
    { h: 'Merksätze', de: 'Fülle den Lückentext zu unseren Regeln aus. Achte auf die Rechtschreibung.', topic: 'merk', parts: [
      { t: 'gaps', lines: ML(['r6c', 'r7a', 'r7b', 'r7c', 'r8a']) }
    ]},
    { h: 'Doppelvokal oder nicht?', de: 'Setze die fehlenden Buchstaben ein.', topic: 'aeo', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('B{}t', 'fährt auf dem Wasser'), 'oo'], [W('Schn{}', 'fällt im Winter'), 'ee'], [W('H{}r', 'wächst auf dem Kopf'), 'aa'], [W('N{}se', 'damit riechst du'), 'a'], [W('S{}', 'großes Gewässer, z. B. der Boden…'), 'ee'], [W('M{}s', 'wächst grün im Wald'), 'oo'], [W('W{}ge', 'damit misst man das Gewicht'), 'aa'], [W('Br{}t', 'beim Bäcker'), 'o']] }
    ]},
    { h: 'Klein gemacht', de: 'Schreib die passende Form. Denk an die Umlaute!', topic: 'aeo', parts: [
      { t: 'words', items: [['das Haar → das kleine …', 'Härchen'], ['das Boot → das kleine …', 'Bötchen'], ['der Saal → die vielen …', 'Säle'], ['das Paar → das kleine …', 'Pärchen']] }
    ]},
    { h: 'ie, i oder ih?', de: 'Setze richtig ein.', topic: 'ie', parts: [
      { t: 'gaps', tip: GAP_TIP, lines: [[W('W{}se', 'darauf wächst Gras'), 'ie'], [W('T{}ger', 'gestreifte Raubkatze'), 'i'], [W('Ich gebe {}m das Buch.', 'dem Jungen'), 'ih'], [W('Masch{}ne', 'macht Arbeit für uns'), 'i'], [W('Br{}f', 'kommt mit der Post'), 'ie'], [W('w{}r', 'du und ich'), 'i'], [W('Lisa holt {}ren Hund.', 'der Hund gehört Lisa'), 'ih'], [W('Sp{}gel', 'darin siehst du dich'), 'ie']] }
    ]},
    { h: 'paar oder Paar?', de: 'Tippe an.', topic: 'aeo', parts: [
      { t: 'pick', opts: ['paar', 'Paar'], items: [['Ich kaufe ein ___ Äpfel.', 0], ['Ich brauche ein neues ___ Schuhe.', 1], ['Wir warten noch ein ___ Minuten.', 0], ['Die zwei Schwäne sind ein ___.', 1]] }
    ]},
    { h: 'Erkläre', de: 'In ganzen Sätzen.', topic: 'ie', parts: [
      { t: 'op', items: [['Erkläre', 'Wann schreibt man ie, wann nur i und wann ih?', 3, [
        ['Das lange i schreibt man meistens als ie.', /ie/],
        ['Nur i bei Wörtern aus anderen Sprachen (Tiger, Kino) und bei mir, dir, wir.', /fremd|andere[nr]? sprache|tiger|kino|maschine|mir|dir|wir/],
        ['ih nur bei ihr, ihm, ihn, ihnen.', /ihm|ihn|ihr/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 4 */
  D.push(de({ id: 'l4', nr: 4, name: 'Probe-HÜ 4', lvl: 'Wie bei Frau Vester', pc: '#FFB3C7', sub: 'Genau wie die echte HÜ: Merksätze + Beispiele · falsche Wörter + Regel · 3. Person · Fehler im Satz',
    tasks: [
    { h: 'Aufgabe 1: Merksätze', de: 'Fülle den Lückentext zu unseren erlernten Regeln aus und finde zu jeder Regel ein eigenes Beispiel.', topic: 'merk', parts: [
      { t: 'gaps', lines: ML(['r5a', 'r6a', 'r6c', 'r7a', 'r7b', 'r8a']) },
      { t: 'op', q: 'Jeweils ein eigenes Beispiel (jedes passende Wort zählt):', items: [
        ['Regel 5', 'Ein Wort mit langem Vokal, einfach geschrieben:', 1, [BSP_1]],
        ['Regel 6', 'Ein Wort mit Dehnungs-h:', 1, [BSP_H]],
        ['Regel 7', 'Ein Wort mit verdoppeltem Vokal:', 1, [BSP_AEO]],
        ['Regel 8', 'Ein Wort mit ie:', 1, [BSP_IE]]] }
    ]},
    { h: 'Aufgabe 2: Falsch geschriebene Wörter', de: 'Tippe jeweils das richtig geschriebene Wort an. Dann notiere, welche Regel (5, 6, 7 oder 8) zutrifft.', topic: 'regel', parts: [
      { t: 'pick', items: [['a)', ['Bahn', 'Ban', 'Baan'], 0], ['b)', ['Biebel', 'Bibel', 'Bihbel'], 1], ['c)', ['Scheere', 'Schehre', 'Schere'], 2], ['d)', ['Moos', 'Mos', 'Mohs'], 0], ['e)', ['Riese', 'Rise', 'Rihse'], 0]] },
      { t: 'sort', q: 'Welche Regel trifft zu?', groups: REGELN, words: [['a) Bahn', 1], ['c) Schere', 0], ['d) Moos', 2], ['e) Riese', 3]] }
    ]},
    { h: 'Aufgabe 3: 3. Person Singular', de: 'Schreibe zu den folgenden Infinitiven jeweils die 3. Person Singular (er/sie/es) Präsens auf. Beispiel: malen = er, sie, es malt', topic: 'formen', parts: [
      { t: 'words', tip: VERB_TIP, items: [V('fliegen', 'fliegt'), V('lesen', 'liest'), V('zahlen', 'zahlt'), V('schlafen', 'schläft'), V('stehlen', 'stiehlt')] }
    ]},
    { h: 'Aufgabe 4: Fehler im Satz', de: 'In den folgenden Sätzen ist jeweils ein Fehler versteckt. Schreib die richtige Schreibweise des Wortes in die Lücke.', topic: 'satz', parts: [
      { t: 'words', tip: FIX_TIP, items: [['Die Biene sammelt Nektar auf der Blüete.', 'Blüte'], ['Im Wintter fällt viel Schnee.', 'Winter'], ['Der Lerer erklärt die Aufgabe.', 'Lehrer'], ['Mein Opa hat graue Hare.', 'Haare'], ['Am Dinstag haben wir Sport.', 'Dienstag']] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 5 */
  D.push(de({ id: 'l5', nr: 5, name: 'Probe-HÜ 5', lvl: 'Profi', pc: '#9FE3D6', sub: 'Lückendiktat · ganze Wörter selbst schreiben · Silben-Trick · Vergangenheit (schrieb, fiel) · Fehler ohne Hilfe · Erkläre',
    tasks: [
    { h: 'Lückendiktat', de: 'Hör zu und schreib die fehlenden Wörter.', topic: 'dikt', parts: [
      { t: 'listen', q: 'Tippe auf „Anhören“. Du hörst den Text zweimal, Satz für Satz. Schreib die fehlenden Wörter in die Lücken.',
        text: 'Lena {wohnt} am {See}. Jeden {Morgen} {fährt} sie mit ihrem {Boot} hinaus. Das {Wasser} ist {kühl}. Am {Ufer} {spielen} die Kinder. Abends {zählt} sie die {Sterne}.' }
    ]},
    { h: 'Ganze Wörter', de: 'Schreib das ganze Wort richtig. Denk an die Regeln 5 bis 8!', topic: 'h', parts: [
      { t: 'words', items: [['Z_n (damit beißt du)', 'Zahn'], ['T_ (heißes Getränk)', 'Tee'], ['Br_f (kommt mit der Post)', 'Brief'], ['Sch_le (dort lernst du)', 'Schule'], ['St_l (darauf sitzt du)', 'Stuhl'], ['B_t (fährt auf dem Wasser)', 'Boot'], ['K_no (dort schaust du Filme)', 'Kino'], ['N_del (isst man mit Soße)', 'Nudel']] }
    ]},
    { h: 'Der Silben-Trick', de: 'Trenne das Verb im Infinitiv in Silben. Dann hörst du das h. Beispiel: gehen = ge-hen', topic: 'h', parts: [
      { t: 'words', tip: 'Schreib das Wort mit Bindestrich zwischen den Silben, z. B. se-hen.', items: [S('sehen', 'se', 'hen'), S('nähen', 'nä', 'hen'), S('blühen', 'blü', 'hen'), S('drehen', 'dre', 'hen'), S('mähen', 'mä', 'hen'), S('ruhen', 'ru', 'hen')] }
    ]},
    { h: 'Gestern war es so', de: 'Schreib die Vergangenheit. Oft wird aus ei oder a ein ie!', topic: 'formen', parts: [
      { t: 'words', items: [['Heute: ich schreibe. Gestern: ich …', 'schrieb'], ['Heute: ich falle. Gestern: ich …', 'fiel'], ['Heute: ich rufe. Gestern: ich …', 'rief'], ['Heute: ich schlafe. Gestern: ich …', 'schlief'], ['Heute: ich nehme. Gestern: ich …', 'nahm'], ['Heute: ich sehe. Gestern: ich …', 'sah']] }
    ]},
    { h: 'Fehler finden', de: 'In jedem Satz ist ein Wort falsch. Schreib nur dieses Wort richtig.', topic: 'satz', parts: [
      { t: 'words', tip: FIX_TIP, items: [['Ich gebe ihm meine Telefonnumer.', 'Telefonnummer'], ['Die Kinder spilen im Garten.', 'spielen'], ['Wir wonen in einem großen Haus.', 'wohnen'], ['Im Zo gibt es Elefanten.', 'Zoo'], ['Der Hund liegt im Gras und gänt.', 'gähnt'], ['Lisa streichelt ieren Hasen.', 'ihren']] }
    ]},
    { h: 'Erkläre', de: 'In ganzen Sätzen.', topic: 'h', parts: [
      { t: 'op', items: [['Erkläre', 'Wie schreibt man Wörter mit langem Vokal meistens? Nenne auch ein Beispiel.', 2, [
        ['Meistens ganz einfach, ohne Zeichen (kein h, kein Doppelvokal).', /einfach|ohne|kein|nicht verdopp|nur ein/],
        ['Ein passendes Beispiel, z. B. Hose, Nase, Blume.', BSP_1[1]]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 6 */
  D.push(de({ id: 'l6', nr: 6, name: 'Probe-HÜ 6', lvl: 'Generalprobe', pc: '#C9B8FF', sub: 'Wie bei Frau Vester, alles gemischt: Merksätze + Beispiele, Wörter + Regel, 3. Person, Fehler im Satz',
    tasks: [
    { h: 'Aufgabe 1: Merksätze', de: 'Fülle den Lückentext zu unseren erlernten Regeln aus. Achte auf die Rechtschreibung.', topic: 'merk', parts: [
      { t: 'gaps', lines: ML(['r5', 'r5a', 'r6a', 'r6c', 'r7a', 'r7b', 'r7c', 'r8a']) },
      { t: 'op', q: 'Jeweils ein eigenes Beispiel (jedes passende Wort zählt):', items: [
        ['Regel 6', 'Ein Verb mit Dehnungs-h, in Silben getrennt (wie ge-hen):', 1, [['Ein Verb mit h, in Silben getrennt, z. B. se-hen, nä-hen, blü-hen, dre-hen.', /[aeiouäöü]-h/]]],
        ['Regel 7', 'Ein Wort mit verdoppeltem Vokal:', 1, [BSP_AEO]],
        ['Regel 8', 'Ein Wort mit ie:', 1, [BSP_IE]]] }
    ]},
    { h: 'Aufgabe 2: Falsch geschriebene Wörter', de: 'Tippe jeweils das richtig geschriebene Wort an. Dann notiere, welche Regel (5, 6, 7 oder 8) zutrifft.', topic: 'regel', parts: [
      { t: 'pick', items: [['a)', ['Hohnig', 'Honig', 'Hoonig'], 1], ['b)', ['Feer', 'Fehr', 'Fee'], 2], ['c)', ['Spigel', 'Spiegel', 'Spihgel'], 1], ['d)', ['Ur', 'Uhr', 'Uur'], 1], ['e)', ['Kamehl', 'Kaamel', 'Kamel'], 2]] },
      { t: 'sort', q: 'Welche Regel trifft zu?', groups: REGELN, words: [['a) Honig', 0], ['b) Fee', 2], ['c) Spiegel', 3], ['d) Uhr', 1], ['e) Kamel', 0]] }
    ]},
    { h: 'Aufgabe 3: 3. Person Singular', de: 'Schreibe zu den folgenden Infinitiven jeweils die 3. Person Singular (er/sie/es) Präsens auf. Beispiel: malen = er, sie, es malt', topic: 'formen', parts: [
      { t: 'words', tip: VERB_TIP, items: [V('ziehen', 'zieht'), V('mähen', 'mäht'), V('empfehlen', 'empfiehlt'), V('frieren', 'friert'), V('nehmen', 'nimmt')] }
    ]},
    { h: 'Aufgabe 4: Fehler im Satz', de: 'In den folgenden Sätzen ist jeweils ein Fehler versteckt. Schreib die richtige Schreibweise des Wortes in die Lücke.', topic: 'satz', parts: [
      { t: 'words', tip: FIX_TIP, items: [['Im Mehr schwimmen viele Fische.', 'Meer'], ['Die Ziege frisst Klee auf der Wihse.', 'Wiese'], ['Wir sitzen alle in einem Bot.', 'Boot'], ['Das Huhn legt ein Ei ins Strooh.', 'Stroh'], ['Ich esse noch ein par Kekse.', 'paar']] }
    ]},
    { h: 'Begründe', de: 'In einem ganzen Satz.', topic: 'aeo', parts: [
      { t: 'op', items: [['Begründe', 'Warum schreibt man „Härchen“ nicht mit ää, obwohl „Haar“ aa hat?', 2, [
        ['ää und üü gibt es im Deutschen nicht (Umlaute werden nie verdoppelt).', /umlaut|ää|üü|ä, ?ö|nie|nicht|kein/],
        ['Darum wird aus aa ein einfaches ä.', /einfach|ein ä|nur ein|aa wird|aus aa/]]]] }
    ]}
  ]}));
})();

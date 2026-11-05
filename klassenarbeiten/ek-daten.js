/* =====================================================================
   Level Up 5 · Erdkunde · 4 Probe-HÜs zum Maßstab (Buch S. 20–21)
   Läuft mit dem Klassenarbeits-Modus (ka-tablet.js).

   Zusätzliche Teil-Typen für Erdkunde:
     calc  items [[aufgabe, 'antwort|alternative', 'Rechenweg für die Korrektur']]   je 1 P
           Zahlen mit Einheit: 2 km = 2000 m = 2.000 m; Einheit vergessen = ½ P
     gaps  mit calc: true → Lücken werden wie Zahlen mit Einheit verglichen
     op    items [[Operator, aufgabe, punkte, [[erwartung, /stichwort/], …]]]
           pro gefundenem Gedanken 1 P, höchstens „punkte“; Eltern können anpassen
     tf    labels ['richtig', 'falsch']
   ===================================================================== */
(function () {
  var D = window.LU5KA_DATA = window.LU5KA_DATA || [];
  var EK = {
    eyebrow: 'Erdkunde · Klasse 5 · Maßstab', back: 'ek', min: 20, pdfMax: 100, bands: [92, 81, 67, 50, 30],
    rules: 'Keine Tipps und kein Merkzettel – wie in der echten HÜ. Bei Rechenaufgaben immer die Einheit dazuschreiben (m, km, cm). Die Korrektur kommt erst nach dem Abgeben.',
    scaleNote: 'So rechnet die App auch bei der HÜ-Probe im Maßstab-Profi. Der Lehrer kann anders bewerten. Bei den Schreib-Aufgaben sucht die App nach Stichwörtern; Eltern können die Punkte dort anpassen.'
  };
  function ek(o) { for (var k in EK) if (!(k in o)) o[k] = EK[k]; return o; }
  var RF = ['richtig', 'falsch'];
  var MAL = '(x|·|×|\\*|mal)';
  function rx(s) { return new RegExp(s); }

  /* Schreib-Aufgaben, die mehrfach vorkommen (gleiche Erwartungen wie die Schreib-HÜ in der App) */
  var OP_MASSSTAB = ['Erkläre', 'Erkläre, was der Maßstab einer Karte angibt.', 2, [
    ['Die Karte verkleinert die Wirklichkeit.', /verklein/],
    ['Der Maßstab sagt, wie stark verkleinert wurde (Verhältnis Karte : Wirklichkeit).', /verhältnis|verhaeltnis|wie (stark|viel|sehr|oft)|wie groß|wievielmal|wie weit/]]];
  var OP_MERKMALE = ['Nenne', 'Nenne vier Merkmale einer Karte.', 4, [
    ['Legende (Zeichenerklärung)', /legende|zeichenerkl/], ['Maßstab', /ma(ß|ss)stab/], ['Titel / Überschrift', /titel|überschrift|ueberschrift/],
    ['Signaturen / Symbole', /symbol|signatur|zeichen\b/], ['Beschriftungen / Namen', /beschrift|namen/], ['Nordpfeil / Himmelsrichtung', /nord|himmelsricht/], ['Farben (z. B. für Höhen)', /farbe/]]];
  var OP_GROSSKLEIN = ['Erkläre', 'Erkläre den Unterschied zwischen einem großen und einem kleinen Maßstab.', 4, [
    ['Großer Maßstab: kleine Maßstabszahl (z. B. 1 : 20 000).', /klein\w* (ma(ß|ss)stabs)?zahl|1 ?: ?20 ?000\b|1 ?: ?(5|10) ?000\b/],
    ['Großer Maßstab: viele Einzelheiten, kleines Gebiet.', /einzelheit|detail|genau|viel(e)? zu sehen|kleine(s|res)? (gebiet|fläche|flaeche|ausschnitt)/],
    ['Kleiner Maßstab: große Maßstabszahl (z. B. 1 : 2 000 000).', /gro(ß|ss)\w* (ma(ß|ss)stabs)?zahl|1 ?: ?2 ?000 ?000|1 ?: ?\d+ ?000 ?000/],
    ['Kleiner Maßstab: großes Gebiet, wenig Einzelheiten.', /gro(ß|ss)\w* (gebiet|fläche|flaeche|raum|ausschnitt)|wenig|ganz(es|e)? (land|europa|welt|deutschland)/]]];
  function opBerechne(cm, zahl, ergCm, erg, ergRx) {
    var z = String(zahl).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return ['Berechne', 'Auf einer Karte im Maßstab 1 : ' + z + ' sind zwei Orte ' + String(cm).replace('.', ',') + ' cm voneinander entfernt. Wie weit ist das in Wirklichkeit? Schreib den Rechenweg auf.', 3, [
      ['Rechnung: ' + String(cm).replace('.', ',') + ' cm × ' + z, rx(String(cm).replace('.', '[,.]') + ' ?(cm)? ?' + MAL + ' ?' + zahl + '|' + zahl + ' ?' + MAL + ' ?' + String(cm).replace('.', '[,.]'))],
      ['= ' + String(ergCm).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' cm', rx(String(ergCm))],
      ['= ' + erg, ergRx]]];
  }

  /* ------------------------------------------------------------ 1 */
  D.push(ek({ id: 'g1', nr: 1, name: 'Probe-HÜ 1', lvl: 'Warm-up', pc: '#FFD66B', sub: 'Maßstab: Grundlagen, Einheiten, 1 cm entspricht …',
    tasks: [
    { h: 'Richtig oder falsch?', de: 'Tippe an.', topic: 'gk', parts: [
      { t: 'tf', labels: RF, items: [
        ['Eine Karte verkleinert die Wirklichkeit.', true],
        ['Die Zahl hinter „1 :“ heißt Maßstabszahl.', true],
        ['1 : 20 000 ist ein kleinerer Maßstab als 1 : 2 000 000.', false],
        ['Auf einer Karte mit großem Maßstab sieht man viele Einzelheiten.', true],
        ['Wenn ich auf einer Karte herauszoome, wird der Maßstab größer.', false],
        ['1 km sind 100 000 cm.', true]] }
    ]},
    { h: 'Großer oder kleiner Maßstab?', de: 'Ordne zu.', topic: 'gk', parts: [
      { t: 'sort', groups: ['großer Maßstab', 'kleiner Maßstab'], words: [
        ['1 : 5 000', 0], ['1 : 25 000 000', 1], ['Stadtplan von Speyer', 0], ['Karte von ganz Europa', 1], ['Man sieht ein großes Gebiet.', 1], ['Man sieht einzelne Häuser.', 0]] }
    ]},
    { h: 'Einheiten umrechnen', de: 'Ergänze.', topic: 'umr', parts: [
      { t: 'gaps', calc: true, lines: [
        ['1 km = {} m', '1000'], ['1 m = {} cm', '100'], ['1 km = {} cm', '100000'],
        ['3 km = {} m', '3000'], ['500 000 cm = {} km', '5'], ['250 cm = {} m', '2,5']] }
    ]},
    { h: '1 cm auf der Karte entspricht …', de: 'Schreib das Ergebnis mit Einheit (m oder km).', topic: '1cm', parts: [
      { t: 'calc', items: [
        ['Maßstab 1 : 20 000', '200 m|0,2 km|20000 cm', '20 000 cm = 200 m'],
        ['Maßstab 1 : 50 000', '500 m|0,5 km|50000 cm', '50 000 cm = 500 m'],
        ['Maßstab 1 : 100 000', '1 km|1000 m|100000 cm', '100 000 cm = 1 000 m = 1 km'],
        ['Maßstab 1 : 2 000 000', '20 km|20000 m|2000000 cm', '2 000 000 cm = 20 000 m = 20 km']] }
    ]},
    { h: 'Schreib-Aufgaben', de: 'In ganzen Sätzen oder mit Rechenweg.', topic: 'mix', parts: [
      { t: 'op', items: [OP_MASSSTAB, opBerechne(4, 50000, 200000, '2 000 m = 2 km', /(^|\D)2 ?km|2 ?000 ?m|2 kilometer|zwei kilometer/)] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 2 */
  D.push(ek({ id: 'g2', nr: 2, name: 'Probe-HÜ 2', lvl: 'Normal', pc: '#8FD3FF', sub: 'Karte ↔ Wirklichkeit, die passende Karte, Merkmale einer Karte',
    tasks: [
    { h: 'Von der Karte in die Wirklichkeit', de: 'Wie weit ist es in echt? Mit Einheit (m oder km).', topic: 'k2w', parts: [
      { t: 'calc', items: [
        ['1 : 25 000 · auf der Karte 4 cm', '1 km|1000 m|100000 cm', '4 cm × 25 000 = 100 000 cm = 1 km'],
        ['1 : 50 000 · auf der Karte 6 cm', '3 km|3000 m|300000 cm', '6 cm × 50 000 = 300 000 cm = 3 km'],
        ['1 : 10 000 · auf der Karte 7 cm', '700 m|0,7 km|70000 cm', '7 cm × 10 000 = 70 000 cm = 700 m'],
        ['1 : 100 000 · auf der Karte 2,5 cm', '2,5 km|2500 m|250000 cm', '2,5 cm × 100 000 = 250 000 cm = 2,5 km'],
        ['1 : 200 000 · auf der Karte 3 cm', '6 km|6000 m|600000 cm', '3 cm × 200 000 = 600 000 cm = 6 km']] }
    ]},
    { h: 'Von der Wirklichkeit auf die Karte', de: 'Wie viele cm sind es auf der Karte?', topic: 'w2k', parts: [
      { t: 'calc', items: [
        ['1 : 100 000 · in echt 5 km', '5 cm|50 mm', '5 km = 500 000 cm; 500 000 : 100 000 = 5 cm'],
        ['1 : 50 000 · in echt 2 km', '4 cm|40 mm', '2 km = 200 000 cm; 200 000 : 50 000 = 4 cm'],
        ['1 : 25 000 · in echt 500 m', '2 cm|20 mm', '500 m = 50 000 cm; 50 000 : 25 000 = 2 cm'],
        ['1 : 20 000 · in echt 1 km', '5 cm|50 mm', '1 km = 100 000 cm; 100 000 : 20 000 = 5 cm']] }
    ]},
    { h: 'Welche Karte passt?', de: 'Tippe an.', topic: 'gk', parts: [
      { t: 'pick', items: [
        ['Du suchst den Weg vom Bahnhof zu deiner Schule.', ['1 : 10 000', '1 : 5 000 000'], 0],
        ['Du willst sehen, wo Deutschland in Europa liegt.', ['1 : 25 000', '1 : 15 000 000'], 1],
        ['Welcher Maßstab ist größer?', ['1 : 50 000', '1 : 500 000'], 0],
        ['Auf welcher Karte siehst du mehr Einzelheiten?', ['1 : 2 000 000', '1 : 20 000'], 1]] }
    ]},
    { h: 'Schreib-Aufgaben', de: 'Nenne · Begründe · Berechne', topic: 'mix', parts: [
      { t: 'op', items: [
        OP_MERKMALE,
        ['Begründe', 'Begründe, warum jede Karte einen Maßstab braucht.', 2, [
          ['Die Karte ist eine Verkleinerung der Wirklichkeit.', /verklein/],
          ['Mit dem Maßstab kann man echte Entfernungen ausrechnen.', /entfern|ausrechn|berechn|strecke|wie weit|wie lang/]]],
        opBerechne(6, 25000, 150000, '1 500 m = 1,5 km', /1[,.]5 ?km|1 ?500 ?m|eineinhalb/)] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 3 */
  D.push(ek({ id: 'g3', nr: 3, name: 'Probe-HÜ 3', lvl: 'Normal+', pc: '#B9E6B0', sub: 'Maßstab bestimmen, Maßstabsleiste, Rechen-Detektiv',
    tasks: [
    { h: 'Bestimme den Maßstab', de: 'Schreib ihn als 1 : …', topic: 'find', parts: [
      { t: 'calc', items: [
        ['Karte 2 cm · in echt 1 km', '1:50000', '1 km = 100 000 cm; 100 000 : 2 = 50 000 → 1 : 50 000'],
        ['Karte 4 cm · in echt 1 km', '1:25000', '100 000 : 4 = 25 000 → 1 : 25 000'],
        ['Karte 5 cm · in echt 1 km', '1:20000', '100 000 : 5 = 20 000 → 1 : 20 000'],
        ['Karte 1 cm · in echt 10 km', '1:1000000', '10 km = 1 000 000 cm → 1 : 1 000 000'],
        ['Karte 3 cm · in echt 600 m', '1:20000', '600 m = 60 000 cm; 60 000 : 3 = 20 000 → 1 : 20 000']] }
    ]},
    { h: 'Die Maßstabsleiste', de: 'Lies genau und rechne.', topic: 'bar', parts: [
      { t: 'calc', text: 'Unter einer Wanderkarte ist eine Maßstabsleiste: Jedes Stück ist 1 cm lang und steht für 500 m.', items: [
        ['Welcher Maßstab ist das? (1 : …)', '1:50000', '500 m = 50 000 cm → 1 : 50 000'],
        ['Ein Weg ist auf der Karte 4 cm lang. Wie lang ist er in echt?', '2 km|2000 m|200000 cm', '4 Stücke × 500 m = 2 000 m = 2 km'],
        ['Wie viele cm sind 3 km auf dieser Karte?', '6 cm|60 mm', '3 km = 3 000 m; 3 000 : 500 = 6 → 6 cm']] }
    ]},
    { h: 'Rechen-Detektiv', de: 'Stimmt das? Richtig oder falsch?', topic: 'mix', parts: [
      { t: 'tf', labels: RF, items: [
        ['Lea: 1 : 50 000, auf der Karte 3 cm → 3 · 50 000 = 150 000 cm = 1,5 km.', true],
        ['Tim: 1 : 25 000, auf der Karte 8 cm → 8 · 25 000 = 200 000 cm = 20 km.', false],
        ['Mia: 1 : 100 000, in echt 4 km → auf der Karte 4 · 100 000 = 400 000 cm.', false],
        ['Ben: 1 : 20 000 ist ein größerer Maßstab als 1 : 200 000.', true],
        ['Ali: Je größer die Maßstabszahl, desto mehr Einzelheiten sieht man.', false]] }
    ]},
    { h: 'Schreib-Aufgaben', de: 'Erkläre · Bestimme', topic: 'mix', parts: [
      { t: 'op', items: [
        OP_GROSSKLEIN,
        ['Bestimme', 'Bestimme den Maßstab mit Rechenweg: 5 cm auf der Karte sind 1 km in Wirklichkeit.', 3, [
          ['1 km = 100 000 cm', /100 ?000/], ['100 000 : 5 rechnen', /: ?5\b|\/ ?5\b|geteilt durch 5|durch 5/], ['Maßstab 1 : 20 000', /1 ?: ?20 ?000(?!\d)/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 4 */
  D.push(ek({ id: 'g4', nr: 4, name: 'Probe-HÜ 4', lvl: 'Generalprobe', pc: '#C9B8FF', sub: 'Wie beim Lehrer: Nenne, Erkläre, Begründe, Berechne, Bestimme',
    tasks: [
    { h: 'Nenne', de: 'Aufzählen, ohne Erklärung.', topic: 'mix', parts: [{ t: 'op', items: [OP_MERKMALE] }] },
    { h: 'Erkläre', de: 'Was bedeutet der Maßstab?', topic: '1cm', parts: [{ t: 'op', items: [
      ['Erkläre', 'Erkläre, was der Maßstab 1 : 100 000 bedeutet.', 2, [
        ['1 cm auf der Karte sind 100 000 cm in Wirklichkeit.', /100000/], ['Das sind 1 000 m = 1 km.', /(^|\D)1 ?km|1 kilometer|ein kilometer|1000 ?m/]]]] }] },
    { h: 'Begründe', de: 'Erst die Antwort, dann „weil …“.', topic: 'gk', parts: [{ t: 'op', items: [
      ['Begründe', 'Auf welcher Karte findest du den Mainzer Hauptbahnhof: 1 : 20 000 oder 1 : 2 000 000? Begründe.', 2, [
        ['Auf der Karte 1 : 20 000.', /(^|\D)20 ?000(?!\d)/],
        ['Weil sie einen großen Maßstab hat und viele Einzelheiten zeigt.', /gro(ß|ss)\w* ma(ß|ss)stab|einzelheit|detail|genau|klein\w* (ma(ß|ss)stabs)?zahl/]]]] }] },
    { h: 'Berechne', de: 'Mit Rechenweg und Einheit.', topic: 'k2w', parts: [{ t: 'op', items: [opBerechne(8, 25000, 200000, '2 000 m = 2 km', /(^|\D)2 ?km|2 ?000 ?m|2 kilometer|zwei kilometer/)] }] },
    { h: 'Bestimme', de: 'Rechenweg und Maßstab 1 : …', topic: 'find', parts: [{ t: 'op', items: [
      ['Bestimme', 'Bestimme den Maßstab mit Rechenweg: 3 cm auf der Karte sind 1,5 km in Wirklichkeit.', 3, [
        ['1,5 km = 150 000 cm', /150 ?000/], ['150 000 : 3 rechnen', /: ?3\b|\/ ?3\b|geteilt durch 3|durch 3/], ['Maßstab 1 : 50 000', /1 ?: ?50 ?000(?!\d)/]]]] }] },
    { h: 'Kurz und knapp', de: 'Ergebnis mit Einheit.', topic: 'umr', parts: [
      { t: 'calc', items: [
        ['7 km = ? m', '7000 m|7000', '7 km × 1 000 = 7 000 m'],
        ['300 000 cm = ? km', '3 km|3', 'fünf Nullen weg: 3 km'],
        ['1 : 50 000 · auf der Karte 5 cm · in echt?', '2,5 km|2500 m|250000 cm', '5 cm × 50 000 = 250 000 cm = 2,5 km'],
        ['1 : 25 000 · in echt 750 m · auf der Karte?', '3 cm|30 mm', '750 m = 75 000 cm; 75 000 : 25 000 = 3 cm']] }
    ]}
  ]}));
})();

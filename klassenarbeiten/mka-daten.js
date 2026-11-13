/* =====================================================================
   Level Up 5 · Mathe · 4 Probe-Klassenarbeiten für den 25. November
   Stoff: alles seit der letzten Arbeit – Maßstab, natürliche Zahlen
   (Stellenwerte, Runden, Kopfrechnen, schriftlich), Vorrangregeln und
   Rechengesetze der Addition und Multiplikation (Buch S. 58–59).
   Läuft mit dem Klassenarbeits-Modus (ka-tablet.js), Rücksprung zu „Mathe“.

   Teile wie in ma-daten.js und ek-daten.js:
     calc  [Aufgabe, 'Antwort|Alternative', Lösungsweg, { way: Ausdruck }]
     gaps  mit calc: true → Zahlen (mit Einheit) vergleichen
     term  [Text, Rechenausdruck, Ergebnis] · pick · tf · op (Erkläre)
   ===================================================================== */
(function () {
  var D = window.LU5KA_DATA = window.LU5KA_DATA || [];
  var R = window.LU5MathR || null;
  var MK = {
    eyebrow: 'Mathe · Klasse 5 · Klassenarbeit', back: 'math', lang: 'de', min: 45, pdfMax: 100, bands: [92, 80, 65, 50, 25],
    rules: 'Keine Tipps und kein „Kurz erklärt“ – wie in der echten Klassenarbeit. Rechne auf einem Blatt mit. Bei Maßstab-Aufgaben immer die Einheit dazuschreiben (mm, cm, m, km). Bei Rechenwegen jeden Schritt in eine eigene Zeile.',
    scaleNote: 'Bei Rechenaufgaben mit mehreren Schritten gibt es einen Punkt für den Rechenweg und einen für das Ergebnis. Beim geschickten Rechnen darfst du vertauschen und Klammern setzen – jeder richtige Weg zählt. Bei „Erkläre“ sucht die App nach Stichwörtern; Eltern können die Punkte anpassen.'
  };
  function mk(o) { for (var k in MK) if (!(k in o)) o[k] = MK[k]; return o; }
  function C(expr) {
    var v = R ? R.eval(expr) : null, st = R ? R.steps(expr) : [];
    return [expr + ' =', String(v), st.length ? expr + ' = ' + st.join(' = ') : String(v), { way: expr }];
  }
  /* geschickt rechnen: Musterweg mit Vertauschen und Klammern */
  function G(expr, weg) { var v = R ? R.eval(expr) : weg.split('=').pop().trim().replace(/\s/g, ''); return [expr + ' =', String(v), expr + ' = ' + weg, { way: expr }]; }
  var RF = ['richtig', 'falsch'], LAW = ['Kommutativgesetz', 'Assoziativgesetz'];

  /* ------------------------------------------------------------ 1 */
  D.push(mk({ id: 'a1', nr: 1, name: 'Probe-Klassenarbeit 1', lvl: 'Warm-up', pc: '#FFD66B', sub: 'Maßstab · Einheiten · Kopfrechnen · Fachbegriffe · Vorrangregeln · Rechengesetze',
    tasks: [
    { h: 'Maßstab', de: 'Berechne. Schreib die Einheit dazu.', topic: 'k2w', parts: [
      { t: 'calc', items: [
        ['Karte 1 : 25 000. Auf der Karte sind es 4 cm. Wie weit ist das in Wirklichkeit?', '1 km|1000 m|100000 cm', '4 cm · 25 000 = 100 000 cm = 1 000 m = 1 km'],
        ['Karte 1 : 50 000. In Wirklichkeit sind es 3 km. Wie lang ist die Strecke auf der Karte?', '6 cm|60 mm', '3 km = 300 000 cm · 300 000 : 50 000 = 6 cm'],
        ['Auf einer Karte sind 5 cm in Wirklichkeit 1 km. Welcher Maßstab ist das?', '1 : 20000', '1 km = 100 000 cm · 100 000 : 5 = 20 000 → 1 : 20 000'],
        ['Ein Käfer ist 6 mm lang. Im Buch ist er im Maßstab 5 : 1 gezeichnet. Wie lang ist er im Bild?', '30 mm|3 cm', '6 mm · 5 = 30 mm = 3 cm']] }
    ]},
    { h: 'Einheiten', de: 'Ergänze.', topic: 'units', parts: [
      { t: 'gaps', calc: true, lines: [['3 m = {} cm', '300'], ['7 km = {} m', '7000'], ['50 mm = {} cm', '5'], ['200 000 cm = {} km', '2']] }
    ]},
    { h: 'Kopfrechnen', de: 'Rechne im Kopf.', topic: 'kopf', parts: [
      { t: 'calc', items: [C('27 + 19'), C('52 − 28'), C('4 · 16'), C('91 : 7'), C('360 : 9'), C('25 · 12')] }
    ]},
    { h: 'Fachbegriffe', de: 'Tippe die richtige Antwort an.', topic: 'begriff', parts: [
      { t: 'pick', items: [
        ['In 56 : 8 = 7 heißt die 8 …', ['Dividend', 'Divisor', 'Quotient'], 1],
        ['In 45 − 17 = 28 heißt die 45 …', ['Minuend', 'Subtrahend', 'Differenz'], 0],
        ['6 · 9 ist ein …', ['Summe', 'Produkt', 'Quotient'], 1],
        ['Was ist 0 : 7?', ['0', '7', 'geht nicht'], 0]] }
    ]},
    { h: 'Vorrangregeln', de: 'Berechne Schritt für Schritt.', topic: 'regel', parts: [
      { t: 'calc', items: [C('12 + 4 · 5'), C('(30 − 18) : 3'), C('7 · 8 − 6 · 5'), C('100 − (45 − 15)')] }
    ]},
    { h: 'Rechengesetze', de: 'Rechne geschickt: Vertausche und setze Klammern. Schreib den Rechenweg auf.', topic: 'gadd', parts: [
      { t: 'calc', items: [
        G('15 + 25 + 18', '(15 + 25) + 18 = 40 + 18 = 58'),
        G('17 + 12 + 13 + 18', '(17 + 13) + (12 + 18) = 30 + 30 = 60'),
        G('25 · 7 · 4', '7 · (25 · 4) = 7 · 100 = 700')] },
      { t: 'tf', labels: RF, items: [
        ['a + b = b + a heißt Kommutativgesetz (Vertauschungsgesetz).', true],
        ['Das Vertauschungsgesetz gilt auch für die Subtraktion.', false],
        ['(4 · 5) · 3 = 4 · (5 · 3)', true]] }
    ]},
    { h: 'Sachaufgabe', de: 'Stelle einen Rechenausdruck auf und berechne.', topic: 'sach2', parts: [
      { t: 'term', unit: '€', items: [['Tim kauft 3 Hefte zu je 2 € und einen Füller für 12 €. Wie viel bezahlt er?', '3 · 2 + 12', 18]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 2 */
  D.push(mk({ id: 'a2', nr: 2, name: 'Probe-Klassenarbeit 2', lvl: 'Normal', pc: '#8FD3FF', sub: 'Maßstab finden · große Zahlen & Runden · schriftlich · Vorrang · Gesetze erkennen',
    tasks: [
    { h: 'Maßstab', de: 'Berechne. Schreib die Einheit dazu.', topic: 'find', parts: [
      { t: 'calc', items: [
        ['Stadtplan 1 : 10 000. Auf dem Plan sind es 8 cm. Wie weit ist das in Wirklichkeit?', '800 m|80000 cm', '8 cm · 10 000 = 80 000 cm = 800 m'],
        ['Karte 1 : 25 000. In Wirklichkeit sind es 2 km. Wie lang auf der Karte?', '8 cm|80 mm', '2 km = 200 000 cm · 200 000 : 25 000 = 8 cm'],
        ['Ein Haus ist 10 m breit. Auf dem Bauplan ist es 2 cm breit. Welcher Maßstab?', '1 : 500', '10 m = 1 000 cm · 1 000 : 2 = 500 → 1 : 500'],
        ['Eine Ameise ist in echt 4 mm lang, im Bild 2 cm. Welcher Maßstab?', '5 : 1', '2 cm = 20 mm · 20 : 4 = 5 → Vergrößerung 5 : 1']] },
      { t: 'tf', labels: RF, items: [
        ['Bei 1 : 100 ist alles größer gezeichnet als bei 1 : 1 000.', true],
        ['10 : 1 ist eine Verkleinerung.', false]] }
    ]},
    { h: 'Große Zahlen', de: 'Ergänze.', topic: 'stelle', parts: [
      { t: 'gaps', calc: true, lines: [
        ['In 4 728 351 steht an der Stelle der Hunderttausender die {}.', '7'],
        ['3 Mio + 5 ZT + 2 H = {}', '3050200'],
        ['Runde 34 768 auf Tausender: {}', '35000'],
        ['Runde 4 549 auf Hunderter: {}', '4500']] }
    ]},
    { h: 'Schriftlich rechnen', de: 'Rechne schriftlich auf deinem Blatt. Trag das Ergebnis ein.', topic: 'add', parts: [
      { t: 'calc', items: [C('4568 + 2375'), C('7302 − 2458'), C('324 · 23'), C('2736 : 4')] }
    ]},
    { h: 'Vorrangregeln', de: 'Berechne Schritt für Schritt.', topic: 'vrg', parts: [
      { t: 'calc', items: [C('64 − 8 · 7'), C('3 · (12 − 4) + 6'), C('81 : 9 − 3 · 2'), C('[40 − (6 + 4) · 2] : 5')] }
    ]},
    { h: 'Rechengesetze', de: 'Rechne geschickt und schreib den Rechenweg auf. Welches Gesetz siehst du unten?', topic: 'gadd', parts: [
      { t: 'calc', items: [
        G('38 + 49 + 22', '(38 + 22) + 49 = 60 + 49 = 109'),
        G('55 + 29 + 5 + 11', '(55 + 5) + (29 + 11) = 60 + 40 = 100'),
        G('2 · 17 · 50', '17 · (2 · 50) = 17 · 100 = 1 700'),
        G('25 · 9 · 4 · 3', '(9 · 3) · (25 · 4) = 27 · 100 = 2 700')] },
      { t: 'pick', q: 'Kommutativ- oder Assoziativgesetz?', opts: LAW, items: [
        ['18 + 7 = 7 + 18', 0], ['(6 + 12) + 8 = 6 + (12 + 8)', 1], ['(5 · 3) · 4 = 5 · (3 · 4)', 1], ['9 · 11 = 11 · 9', 0]] }
    ]},
    { h: 'Text → Aufgabe', de: 'Schreibe als Aufgabe mit Rechenzeichen und berechne.', topic: 'tterm', parts: [
      { t: 'term', items: [
        ['Addiere zur Summe aus 37 und 45 die Zahl 63.', '37 + 45 + 63', 145],
        ['Multipliziere die Differenz aus 50 und 18 mit 3.', '(50 − 18) · 3', 96]] }
    ]},
    { h: 'Sachaufgabe', de: 'Stelle einen Rechenausdruck auf und berechne.', topic: 'sach2', parts: [
      { t: 'term', unit: '€', items: [['Die 28 Kinder der 5b fahren ins Schwimmbad. Der Eintritt kostet 4 € pro Kind, der Bus 150 € für alle. Wie viel kostet der Ausflug insgesamt?', '28 · 4 + 150', 262]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 3 */
  D.push(mk({ id: 'a3', nr: 3, name: 'Probe-Klassenarbeit 3', lvl: 'Normal+', pc: '#B9E6B0', sub: 'Wegstrecken & Modelle · Zahlwörter · große Rechnungen · eckige Klammern · Gesetze begründen',
    tasks: [
    { h: 'Maßstab', de: 'Berechne. Schreib die Einheit dazu.', topic: 'sum', parts: [
      { t: 'calc', items: [
        ['Wanderkarte 1 : 50 000. Der Weg besteht auf der Karte aus 3 cm, 5 cm und 4 cm. Wie lang ist er in Wirklichkeit?', '6 km|6000 m|600000 cm', '3 + 5 + 4 = 12 cm · 12 cm · 50 000 = 600 000 cm = 6 000 m = 6 km'],
        ['Stadtplan 1 : 20 000. In Wirklichkeit sind es 1 km 400 m. Wie lang auf dem Plan?', '7 cm|70 mm', '1 km 400 m = 1 400 m = 140 000 cm · 140 000 : 20 000 = 7 cm'],
        ['Ein Modell hat den Maßstab 1 : 50. Das Haus ist in echt 9 m hoch. Wie hoch ist das Modell?', '18 cm|180 mm', '9 m = 900 cm · 900 : 50 = 18 cm'],
        ['Ein Floh ist im Bild 4 cm groß, Maßstab 20 : 1. Wie groß ist er in echt?', '2 mm', '4 cm = 40 mm · 40 : 20 = 2 mm']] },
      { t: 'op', items: [
        ['Erkläre', 'Erkläre, was der Maßstab 1 : 25 000 bedeutet.', 2, [
          ['1 cm auf der Karte …', /1 ?cm/],
          ['… sind 25 000 cm = 250 m in Wirklichkeit.', /25 ?\.?000|250 ?m/]]]] }
    ]},
    { h: 'Große Zahlen', de: 'Ergänze.', topic: 'rund', parts: [
      { t: 'gaps', calc: true, lines: [
        ['zwei Millionen dreihundertvierzigtausendfünfzehn = {}', '2340015'],
        ['Runde 2 349 999 auf Hunderttausender: {}', '2300000'],
        ['Der Vorgänger von 1 000 000 ist {}.', '999999'],
        ['Runde 75 501 auf Zehntausender: {}', '80000']] }
    ]},
    { h: 'Schriftlich rechnen', de: 'Rechne schriftlich auf deinem Blatt. Trag das Ergebnis ein.', topic: 'mul', parts: [
      { t: 'calc', items: [C('38476 + 9857 + 1209'), C('50000 − 17364'), C('608 · 47'), C('7488 : 12')] }
    ]},
    { h: 'Klammer in der Klammer', de: 'Berechne Schritt für Schritt.', topic: 'eck', parts: [
      { t: 'calc', items: [C('5 · [48 − (13 + 7) · 2]'), C('120 − 3 · (8 + 12) : 4'), C('(17 − 8) · (3 + 4) − 15')] }
    ]},
    { h: 'Rechengesetze', de: 'Rechne geschickt und schreib den Rechenweg auf.', topic: 'gadd', parts: [
      { t: 'calc', items: [
        G('187 + 36 + 11 + 54 + 2', '(187 + 11 + 2) + (36 + 54) = 200 + 90 = 290'),
        G('69 + 125 + 375', '69 + (125 + 375) = 69 + 500 = 569'),
        G('4 · 13 · 25 · 5 · 2', '13 · (4 · 25) · (5 · 2) = 13 · 100 · 10 = 13 000'),
        G('125 · 7 · 8', '7 · (125 · 8) = 7 · 1 000 = 7 000')] },
      { t: 'tf', labels: RF, items: [
        ['(48 : 4) : 2 = 48 : (4 : 2)', false],
        ['Bei 25 · 37 · 4 hilft das Kommutativgesetz.', true]] },
      { t: 'op', items: [
        ['Begründe', 'Lukas sagt: „Bei Minus darf ich auch vertauschen.“ Hat er recht? Begründe mit einem Beispiel.', 2, [
          ['Nein, das Vertauschungsgesetz gilt nicht für Minus.', /nein|nicht|falsch|unrecht/],
          ['Beispiel, z. B. 10 − 4 = 6, aber 4 − 10 geht nicht.', /\d+ ?[−–-] ?\d+/]]]] }
    ]},
    { h: 'Sachaufgaben', de: 'Stelle einen Rechenausdruck auf und berechne.', topic: 'sach2', parts: [
      { t: 'term', unit: 'Plätze', items: [['Ein Kino hat 18 Reihen mit je 25 Plätzen. Bei der Vorstellung bleiben 47 Plätze frei. Wie viele Plätze sind besetzt?', '18 · 25 − 47', 403]] },
      { t: 'term', items: [['Multipliziere die Summe aus 25 und 15 mit 4 und subtrahiere dann 60.', '(25 + 15) · 4 − 60', 100]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 4 */
  D.push(mk({ id: 'a4', nr: 4, name: 'Probe-Klassenarbeit 4', lvl: 'Generalprobe', pc: '#C9B8FF', sub: 'Alles gemischt wie in der echten Arbeit: 45 Minuten, alle Themen ab Maßstab',
    tasks: [
    { h: 'Maßstab', de: 'Berechne. Schreib die Einheit dazu.', topic: 'mixed', parts: [
      { t: 'calc', items: [
        ['Karte 1 : 25 000. Auf der Karte sind es 12 cm. Wie weit ist das in Wirklichkeit?', '3 km|3000 m|300000 cm', '12 cm · 25 000 = 300 000 cm = 3 000 m = 3 km'],
        ['Karte 1 : 50 000. In Wirklichkeit sind es 4 km 500 m. Wie lang auf der Karte?', '9 cm|90 mm', '4 km 500 m = 4 500 m = 450 000 cm · 450 000 : 50 000 = 9 cm'],
        ['Auf einer Karte sind 6 cm in Wirklichkeit 3 km. Welcher Maßstab?', '1 : 50000', '3 km = 300 000 cm · 300 000 : 6 = 50 000 → 1 : 50 000'],
        ['Ein Samenkorn ist in echt 3 mm, im Bild 12 mm groß. Welcher Maßstab?', '4 : 1', '12 : 3 = 4 → Vergrößerung 4 : 1']] },
      { t: 'tf', labels: RF, items: [
        ['1 km = 100 000 cm', true],
        ['Bei einer Vergrößerung steht die größere Zahl hinten.', false]] }
    ]},
    { h: 'Zahlen & Kästchen', de: 'Ergänze.', topic: 'platz', parts: [
      { t: 'gaps', calc: true, lines: [
        ['Runde 649 512 auf Tausender: {}', '650000'],
        ['Runde 649 512 auf Hunderttausender: {}', '600000'],
        ['4 Mio + 7 HT + 3 T + 9 E = {}', '4703009'],
        ['63 − {} = 13', '50'],
        ['{} : 6 = 12', '72'],
        ['29 · 13 = {}', '377']] }
    ]},
    { h: 'Schriftlich rechnen', de: 'Rechne schriftlich auf deinem Blatt. Trag das Ergebnis ein.', topic: 'div', parts: [
      { t: 'calc', items: [C('23785 + 48919'), C('40305 − 18769'), C('736 · 58'), C('9135 : 7')] }
    ]},
    { h: 'Vorrangregeln', de: 'Berechne Schritt für Schritt.', topic: 'vrg', parts: [
      { t: 'calc', items: [C('96 − 6 · (4 + 8)'), C('[52 − (7 · 4 + 9)] · 3'),
        ['Mia: 40 − 10 − 5 = 40 − 5 = 35. Was kommt richtig heraus?', '25', '40 − 10 − 5 = 30 − 5 = 25 (von links nach rechts!)', { way: '40 − 10 − 5' }]] }
    ]},
    { h: 'Rechengesetze', de: 'Rechne geschickt und schreib den Rechenweg auf.', topic: 'gmul', parts: [
      { t: 'calc', items: [
        G('47 + 29 + 53 + 71', '(47 + 53) + (29 + 71) = 100 + 100 = 200'),
        G('5 · 19 · 20', '19 · (5 · 20) = 19 · 100 = 1 900'),
        G('2 · 8 · 50 · 9', '(8 · 9) · (2 · 50) = 72 · 100 = 7 200')] },
      { t: 'pick', q: 'Kommutativ- oder Assoziativgesetz?', opts: LAW, items: [
        ['(17 + 8) + 2 = 17 + (8 + 2)', 1], ['34 · 5 = 5 · 34', 0]] },
      { t: 'op', items: [
        ['Erkläre', 'Erkläre, wie du 25 · 17 · 4 geschickt rechnest und welche Rechengesetze du nutzt.', 3, [
          ['Vertauschen, damit 25 und 4 zusammenstehen (Kommutativgesetz).', /vertausch|kommutativ|25 ?[·x*] ?4/],
          ['25 · 4 = 100 einklammern (Assoziativgesetz).', /100\b|assoziativ|klammer/],
          ['100 · 17 = 1 700', /1 ?\.?700/]]]] }
    ]},
    { h: 'Sachaufgabe', de: 'Stelle einen Rechenausdruck auf und berechne.', topic: 'sach2', parts: [
      { t: 'term', unit: '€', items: [['Familie Berger macht Urlaub. 4 Übernachtungen kosten je 85 €. Dazu kommen 2 Eintrittskarten für Erwachsene zu je 15 € und 3 Kinderkarten zu je 9 €. Wie viel kostet alles zusammen?', '4 · 85 + 2 · 15 + 3 · 9', 397]] }
    ]}
  ]}));
})();

/* =====================================================================
   Level Up 5 · Mathe · 4 Probe-HÜs „Vorrangregeln & Klammern“ (Buch S. 54–55)
   HÜ am Mittwoch, 11. November. Läuft mit dem Klassenarbeits-Modus (ka-tablet.js),
   Rücksprung in „Mathe mit Lina“.

   Teile:
     calc  [Aufgabe, Ergebnis, Lösungsweg]
     gaps  Rechenschritte mit Lücken (calc: true)
     term  [Text, Rechenausdruck, Ergebnis, Extra-HTML]  → 1 P Ausdruck + 1 P Ergebnis
     pick  Klammern setzen · tf Richtig/Falsch · op Erkläre (Eltern können Punkte anpassen)

   Themen (topic = Thema bei Lina): regel vrg eck stolper kl baum tterm raetsel sach2
   ===================================================================== */
(function () {
  var D = window.LU5KA_DATA = window.LU5KA_DATA || [];
  var R = window.LU5MathR || null;
  var MA = {
    eyebrow: 'Mathe · Klasse 5 · Vorrangregeln', back: 'math', lang: 'de', min: 20, pdfMax: 100, bands: [92, 80, 65, 50, 25],
    rules: 'Keine Tipps und kein „Kurz erklärt“ – wie in der echten HÜ. Schreib jeden Rechenschritt in eine eigene Zeile, so wie im Heft.',
    scaleNote: 'Bei Rechenaufgaben mit mehreren Schritten gibt es einen Punkt für den Rechenweg (halber Punkt, wenn der erste Schritt stimmt) und einen für das Ergebnis. Bei „Schreibe als Aufgabe“ gibt es zusätzlich einen Punkt für den richtigen Rechenausdruck (Klammern!). Bei „Erkläre“ sucht die App nach Stichwörtern; Eltern können die Punkte dort anpassen.'
  };
  function ma(o) { for (var k in MA) if (!(k in o)) o[k] = MA[k]; return o; }
  /* Rechenaufgabe mit automatisch erzeugtem Lösungsweg */
  function C(expr) {
    var v = R ? R.eval(expr) : null, st = R ? R.steps(expr) : [];
    return [expr + ' =', String(v), st.length ? expr + ' = ' + st.join(' = ') : String(v), { way: expr }];
  }
  function tree(expr) { return R ? R.tree(expr) : '<p class="ka-calcexpr">' + expr + '</p>'; }
  var JN = ['ja', 'nein'], RF = ['richtig', 'falsch'];
  var FEHLER = ['Punkt vor Strich vergessen', 'Klammer nicht zuerst gerechnet', 'nicht von links nach rechts gerechnet'];

  /* ------------------------------------------------------------ 1 */
  D.push(ma({ id: 'm1', nr: 1, name: 'Probe-HÜ 1', lvl: 'Warm-up', pc: '#FFD66B', sub: 'Punkt vor Strich · Klammern zuerst · Schritt für Schritt · Text → Aufgabe',
    tasks: [
    { h: 'Punkt vor Strich', de: 'Berechne.', topic: 'regel', parts: [
      { t: 'calc', items: [C('12 + 4 · 5'), C('30 − 18 : 3'), C('7 · 8 − 6'), C('45 : 9 + 11'), C('6 · 4 + 3 · 5'), C('50 − 6 · 7')] }
    ]},
    { h: 'Klammern zuerst', de: 'Berechne.', topic: 'regel', parts: [
      { t: 'calc', items: [C('(12 + 4) · 5'), C('(30 − 18) : 3'), C('7 · (8 − 6)'), C('72 : (4 + 5)'), C('(25 − 17) · (3 + 4)'), C('100 − (45 − 15)')] }
    ]},
    { h: 'Schritt für Schritt', de: 'Fülle die Rechenschritte aus.', topic: 'vrg', parts: [
      { t: 'gaps', calc: true, lines: [
        ['36 − 4 · 5 = 36 − {} = {}', '20', '16'],
        ['(15 + 9) : 6 = {} : 6 = {}', '24', '4'],
        ['5 · 6 − 2 · 7 = {} − {} = {}', '30', '14', '16'],
        ['64 − 20 − 4 = {} − 4 = {}', '44', '40']] }
    ]},
    { h: 'Stimmt das?', de: 'Richtig oder falsch?', topic: 'vrg', parts: [
      { t: 'tf', labels: RF, items: [
        ['Bei 8 + 2 · 5 rechnet man zuerst 8 + 2.', false],
        ['Was in Klammern steht, wird zuerst berechnet.', true],
        ['Punktrechnung heißt: · und :', true],
        ['20 − 5 − 3 = 18', false],
        ['Ohne Klammern und ohne Punktrechnung rechnet man von links nach rechts.', true]] }
    ]},
    { h: 'Text → Aufgabe', de: 'Schreibe als Aufgabe mit Rechenzeichen und berechne.', topic: 'tterm', parts: [
      { t: 'term', tip: 'Oben den Rechenausdruck (z. B. (3 + 4) · 2), darunter jeden Rechenschritt und das Ergebnis.', items: [
        ['Multipliziere 4 und 7 und addiere 9 zum Produkt.', '4 · 7 + 9', 37],
        ['Addiere 15 und 9 und multipliziere die Summe mit 3.', '(15 + 9) · 3', 72],
        ['Subtrahiere 12 von 50.', '50 − 12', 38]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 2 */
  D.push(ma({ id: 'm2', nr: 2, name: 'Probe-HÜ 2', lvl: 'Normal', pc: '#8FD3FF', sub: 'Von links nach rechts · Stolperstellen · Klammern setzen · Text → Aufgabe',
    tasks: [
    { h: 'Rechne genau', de: 'Achte auf alle Vorrangregeln.', topic: 'vrg', parts: [
      { t: 'calc', items: [C('58 − 21 − 15'), C('96 : 8 : 2'), C('70 − 25 − 24'), C('70 − (25 − 24)'), C('75 − 18 + 6 · 4'), C('75 − (18 + 6 · 4)'), C('4 · 15 − 3 · 8'), C('4 · (15 − 3) · 2')] }
    ]},
    { h: 'Stolperstelle', de: 'Die Kinder haben sich verrechnet. Rechne richtig und finde den Fehler.', topic: 'stolper', parts: [
      { t: 'calc', q: 'Was kommt richtig heraus?', items: [
        ['Heike: 35 − 4 · 6 = 31 · 6 = 186', '11', '35 − 4 · 6 = 35 − 24 = 11', { way: '35 − 4 · 6' }],
        ['Heike: 9 · (3 + 5) = 27 + 5 = 32', '72', '9 · (3 + 5) = 9 · 8 = 72', { way: '9 · (3 + 5)' }],
        ['Timo: 58 − 20 − 8 = 58 − 12 = 46', '30', '58 − 20 − 8 = 38 − 8 = 30', { way: '58 − 20 − 8' }]] },
      { t: 'pick', q: 'Welcher Fehler wurde gemacht?', opts: FEHLER, items: [['35 − 4 · 6 = 31 · 6', 0], ['9 · (3 + 5) = 27 + 5', 1], ['58 − 20 − 8 = 58 − 12', 2]] }
    ]},
    { h: 'Klammern setzen', de: 'Wo müssen die Klammern hin, damit das Ergebnis stimmt?', topic: 'kl', parts: [
      { t: 'pick', items: [
        ['Ergebnis 36', ['3 · 5 + 7', '3 · (5 + 7)', '(3 · 5) + 7'], 1],
        ['Ergebnis 25', ['(120 − 20) : 4', '120 − (20 : 4)'], 0],
        ['Ergebnis 36', ['(4 + 2) · 9 − 3', '4 + 2 · (9 − 3)', '(4 + 2) · (9 − 3)'], 2],
        ['Ergebnis 40', ['(50 − 20) − 10', '50 − (20 − 10)'], 1]] }
    ]},
    { h: 'Text → Aufgabe', de: 'Schreibe als Aufgabe mit Rechenzeichen und berechne.', topic: 'tterm', parts: [
      { t: 'term', items: [
        ['Dividiere die Summe aus 7 und 29 durch 4.', '(7 + 29) : 4', 9],
        ['Subtrahiere den Quotienten aus 56 und 8 von 30.', '30 − 56 : 8', 23],
        ['Multipliziere die Differenz der Zahlen 15 und 9 mit ihrer Summe.', '(15 − 9) · (15 + 9)', 144]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 3 */
  D.push(ma({ id: 'm3', nr: 3, name: 'Probe-HÜ 3', lvl: 'Normal+', pc: '#B9E6B0', sub: 'Eckige Klammern · Klammern weglassen? · Rechenbaum · Zahlenrätsel · Sachaufgabe',
    tasks: [
    { h: 'Klammer in der Klammer', de: 'Beginne mit der inneren Klammer.', topic: 'eck', parts: [
      { t: 'calc', items: [C('4 · [30 − (12 + 8)]'), C('[50 − (6 + 9)] · 2'), C('[8 : (2 · 2) + 5] · 6'), C('100 − [7 · (3 + 5) − 6]'), C('5 · [18 − 2 · (3 + 4)]')] }
    ]},
    { h: 'Klammern weglassen?', de: 'Kann man die Klammern weglassen, ohne dass sich das Ergebnis ändert?', topic: 'kl', parts: [
      { t: 'tf', labels: JN, items: [
        ['(45 : 5) + (6 · 2)', true], ['(48 + 32) · (12 − 5)', false], ['140 + (11 · 9 − 19)', true],
        ['140 − (11 · 9 − 19)', false], ['(14 · 6) : 2', true], ['90 − (30 + 10)', false]] }
    ]},
    { h: 'Rechenbaum', de: 'Schreibe die Aufgabe zum Rechenbaum auf und rechne aus.', topic: 'baum', parts: [
      { t: 'term', tip: 'Was im Baum oben zusammen gerechnet wird, kommt zuerst – setze Klammern, wo es nötig ist.', items: [
        ['a)', '(18 + 6) : 4', 6, tree('(18 + 6) : 4')],
        ['b)', '45 − 3 · 7', 24, tree('45 − 3 · 7')],
        ['c)', '(9 − 4) · (6 + 2)', 40, tree('(9 − 4) · (6 + 2)')]] }
    ]},
    { h: 'Zahlenrätsel', de: 'Löse das Rätsel.', topic: 'raetsel', parts: [
      { t: 'calc', items: [
        ['Welche Zahl muss man zur Differenz aus 90 und 54 addieren, um das Produkt aus 8 und 7 zu erhalten?', '20', '90 − 54 = 36; 8 · 7 = 56; 56 − 36 = 20'],
        ['Durch welche Zahl muss man die Summe aus 38 und 34 dividieren, um 8 zu erhalten?', '9', '38 + 34 = 72; 72 : 8 = 9'],
        ['Ich denke mir eine Zahl, multipliziere sie mit 6 und addiere 14. Ich erhalte 50. Wie heißt meine Zahl?', '6', '50 − 14 = 36; 36 : 6 = 6'],
        ['Von welcher Zahl muss man das Produkt aus 9 und 4 subtrahieren, um 64 zu erhalten?', '100', '9 · 4 = 36; 64 + 36 = 100']] }
    ]},
    { h: 'Sachaufgabe', de: 'Stelle einen Rechenausdruck auf und berechne.', topic: 'sach2', parts: [
      { t: 'term', unit: '€', items: [
        ['Lena kauft 3 Hefte zu je 2 € und einen Füller für 12 €. Sie bezahlt mit einem 20-€-Schein. Wie viel Wechselgeld bekommt sie?', '20 − (3 · 2 + 12)', 2]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 4 */
  D.push(ma({ id: 'm4', nr: 4, name: 'Probe-HÜ 4', lvl: 'Generalprobe', pc: '#C9B8FF', sub: 'Wie bei der Lehrerin: alle Vorrangregeln, Rechenschritte, Erkläre, Klammern, Texte, Sachaufgaben',
    tasks: [
    { h: 'Rechne', de: 'Achte auf alle Vorrangregeln.', topic: 'vrg', parts: [
      { t: 'calc', items: [C('64 − 8 · 7'), C('(64 − 8) · 7'), C('81 : 9 − 3 · 2'), C('120 − 40 − 25'), C('3 · [40 − (6 + 4) · 2]'), C('200 − (13 · 8 − 24)')] }
    ]},
    { h: 'Schritt für Schritt', de: 'Fülle die Rechenschritte aus.', topic: 'eck', parts: [
      { t: 'gaps', calc: true, lines: [
        ['48 − 6 · (2 + 5) = 48 − 6 · {} = 48 − {} = {}', '7', '42', '6'],
        ['[30 − (4 + 2) · 3] : 4 = [30 − {} · 3] : 4 = [30 − {}] : 4 = {} : 4 = {}', '6', '18', '12', '3']] }
    ]},
    { h: 'Erkläre den Fehler', de: 'Schreib in ganzen Sätzen.', topic: 'stolper', parts: [
      { t: 'op', items: [
        ['Erkläre', 'Ben rechnet: 20 + 4 · 3 = 24 · 3 = 72. Erkläre seinen Fehler und rechne richtig.', 2, [
          ['Fehler: Punkt vor Strich nicht beachtet (zuerst 4 · 3)', /punkt\s*vor\s*strich|zuerst[^.]{0,30}(mal|·|multipli|4\s*[·x*]\s*3)|erst[^.]{0,30}(mal|·|multipli|4\s*[·x*]\s*3)|4\s*[·x*]\s*3\s*=\s*12/],
          ['Richtig gerechnet: 20 + 12 = 32', /\b32\b/]]]] }
    ]},
    { h: 'Klammern setzen', de: 'Wo müssen die Klammern hin?', topic: 'kl', parts: [
      { t: 'pick', items: [
        ['Ergebnis 110', ['(2 + 9) · 12 − 2', '2 + 9 · (12 − 2)', '(2 + 9) · (12 − 2)'], 2],
        ['Ergebnis 30', ['(90 − 30) : 2', '90 − (30 : 2)'], 0],
        ['Ergebnis 64', ['(70 − 10) − 4', '70 − (10 − 4)'], 1]] }
    ]},
    { h: 'Text → Aufgabe', de: 'Schreibe als Aufgabe mit Rechenzeichen und berechne.', topic: 'tterm', parts: [
      { t: 'term', items: [
        ['Addiere das Produkt von 5 und 12 zur Summe von 5 und 12.', '5 + 12 + 5 · 12', 77],
        ['Subtrahiere von 100 die Differenz aus 45 und 18.', '100 − (45 − 18)', 73]] }
    ]},
    { h: 'Sachaufgaben', de: 'Stelle einen Rechenausdruck auf und berechne.', topic: 'sach2', parts: [
      { t: 'term', unit: 'Betten', items: [
        ['Im Jugendhaus gibt es auf jeder Etage 5 Vierbettzimmer und 3 Zweibettzimmer. Das Haus hat 4 Etagen. Wie viele Betten gibt es?', '4 · (5 · 4 + 3 · 2)', 104]] },
      { t: 'term', unit: '€', items: [
        ['Die 25 Kinder der 5c bezahlen je 45 € für die Klassenfahrt. Der Bus kostet 300 €, die Herberge 650 € und der Eintritt 150 €. Wie viel Euro hat jedes Kind zu viel bezahlt?', '45 − (300 + 650 + 150) : 25', 1]] }
    ]},
    { h: 'Zahlenrätsel', de: 'Löse das Rätsel.', topic: 'raetsel', parts: [
      { t: 'calc', items: [
        ['Welche Zahl muss man zur Differenz aus 120 und 85 addieren, damit man den Quotienten aus 240 und 6 erhält?', '5', '120 − 85 = 35; 240 : 6 = 40; 40 − 35 = 5']] }
    ]}
  ]}));
})();

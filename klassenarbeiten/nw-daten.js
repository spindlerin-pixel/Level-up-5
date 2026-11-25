/* =====================================================================
   Level Up 5 · NaWi · Mikroskop, Lupen und Linsen
   Stoff: Buch S. 74 „Bau und Funktion des Mikroskops“, Kopiervorlage 18
   „Das Mikroskop“ + KV 48 (Reihenfolge), Blatt „Regeln beim Mikroskopieren“,
   Heft 24.11.2026 „Lupen und Linsen“.
   1. Mikroskop-Zeichnung (window.LU5NwSvg) – wird auch von nw.js benutzt
   2. Drei Probe-HÜs für den Klassenarbeits-Modus (ka-tablet.js)
   ===================================================================== */
(function () {
  /* Nummern wie auf dem Arbeitsblatt: links 1–5 und 12, rechts 6–11 und 13 */
  var PARTS = [
    [1, 'Okular', 'L', 30, 138, 40],
    [2, 'Tubus', 'L', 78, 166, 66],
    [3, 'Stativ', 'L', 140, 130, 160],
    [4, 'Grobtrieb', 'L', 200, 138, 214],
    [5, 'Feintrieb', 'L', 250, 116, 236],
    [12, 'Beleuchtungsregler', 'L', 300, 165, 262],
    [6, 'Objektivrevolver', 'R', 100, 232, 128],
    [7, 'Objektiv', 'R', 140, 222, 148],
    [8, 'Objektträger', 'R', 168, 232, 179],
    [9, 'Objekttisch', 'R', 196, 266, 189],
    [10, 'Kondensor', 'R', 224, 214, 200],
    [11, 'Blende', 'R', 250, 218, 211],
    [13, 'Beleuchtung', 'R', 288, 222, 282]
  ];
  window.LU5NwParts = PARTS;
  /* hi = hervorgehobene Nummer, names = true: Namen statt Nummern (Merkzettel) */
  window.LU5NwSvg = function (hi, names) {
    var s = '<svg class="nw-svg" viewBox="0 0 ' + (names ? '440' : '340') + ' 330" role="img" aria-label="Mikroskop mit nummerierten Bauteilen">';
    var dx = names ? 50 : 0;
    s += '<rect x="0" y="0" width="' + (names ? 440 : 340) + '" height="330" rx="16" fill="#FFFFFF"/>';
    s += '<g transform="translate(' + dx + ' 0)" stroke="#1F2A44" stroke-width="2" stroke-linejoin="round">';
    /* Fuß */
    s += '<path d="M95 300 Q95 274 132 272 L248 272 Q282 274 282 300 L284 318 L93 318 Z" fill="#E6EAF2"/>';
    /* Lampe + Regler */
    s += '<ellipse cx="202" cy="281" rx="24" ry="7" fill="#3B3F4A"/><ellipse cx="202" cy="280" rx="15" ry="4" fill="#FFE066"/>';
    s += '<path d="M158 272 L158 258 Q158 254 165 254 Q172 254 172 258 L172 272 Z" fill="#3B3F4A"/>';
    /* Stativ */
    s += '<path d="M118 272 L118 205 Q116 122 176 104 L186 128 Q146 142 148 205 L148 272 Z" fill="#F4F6FA"/>';
    /* Tubus + Okular */
    s += '<path d="M190 100 L141 51 L158 36 L209 92 Z" fill="#F4F6FA"/>';
    s += '<path d="M141 51 L130 40 L148 24 L158 36 Z" fill="#8A93A6"/>';
    /* Kopf + Revolver */
    s += '<path d="M166 124 Q168 92 200 92 Q232 92 236 124 Z" fill="#E6EAF2"/>';
    s += '<ellipse cx="201" cy="128" rx="38" ry="8" fill="#8A93A6"/>';
    /* Objektive */
    s += '<rect x="190" y="135" width="18" height="28" rx="3" fill="#D5DAE4"/><rect x="194" y="163" width="10" height="8" rx="2" fill="#8A93A6"/>';
    s += '<rect x="215" y="134" width="14" height="20" rx="3" fill="#D5DAE4" transform="rotate(-18 222 134)"/>';
    /* Objekttisch + Objektträger + Klammern */
    s += '<rect x="150" y="183" width="120" height="11" rx="2" fill="#3B3F4A"/>';
    s += '<rect x="176" y="177" width="58" height="6" fill="#CDEBFF"/>';
    s += '<path d="M165 181 L190 178 M226 178 L250 181" stroke-width="2.5"/>';
    /* Kondensor + Blende */
    s += '<rect x="188" y="194" width="28" height="11" fill="#8A93A6"/>';
    s += '<ellipse cx="202" cy="210" rx="19" ry="4" fill="#3B3F4A"/>';
    /* Grob- und Feintrieb */
    s += '<circle cx="134" cy="222" r="20" fill="#D5DAE4"/><circle cx="117" cy="234" r="10" fill="#8A93A6"/>';
    s += '</g>';
    /* Beschriftung */
    PARTS.forEach(function (p) {
      var on = hi === p[0], L = p[2] === 'L';
      var cx = L ? 22 : (names ? 418 : 318), tx = p[4] + dx;
      if (names) cx = L ? 52 : 388;
      s += '<line x1="' + (L ? cx + 11 : cx - 11) + '" y1="' + p[3] + '" x2="' + tx + '" y2="' + p[5] + '" stroke="' + (on ? '#7A4FD6' : '#1F2A44') + '" stroke-width="' + (on ? 3 : 1.4) + '"/>';
      s += '<circle cx="' + tx + '" cy="' + p[5] + '" r="2.6" fill="#1F2A44"/>';
      if (names) {
        s += '<text x="' + (L ? cx + 6 : cx - 6) + '" y="' + (p[3] - 4) + '" font-size="12.5" font-weight="700" fill="#1F2A44" text-anchor="' + (L ? 'end' : 'start') + '" font-family="Trebuchet MS, Verdana, sans-serif">' + p[1] + '</text>';
      } else {
        s += '<circle cx="' + cx + '" cy="' + p[3] + '" r="11" fill="' + (on ? '#5B2DBF' : '#FFFFFF') + '" stroke="' + (on ? '#5B2DBF' : '#1F2A44') + '" stroke-width="2"/>';
        s += '<text x="' + cx + '" y="' + (p[3] + 4.5) + '" font-size="12" font-weight="800" fill="' + (on ? '#FFFFFF' : '#1F2A44') + '" text-anchor="middle" font-family="Trebuchet MS, Verdana, sans-serif">' + p[0] + '</text>';
      }
    });
    return s + '</svg>';
  };

  /* --------------------------- Probe-HÜs --------------------------- */
  var D = window.LU5KA_DATA = window.LU5KA_DATA || [];
  var NW = {
    eyebrow: 'NaWi · Klasse 5 · Mikroskop, Lupen und Linsen', back: 'nw', min: 20, pdfMax: 100, bands: [92, 81, 67, 50, 30],
    rules: 'Keine Tipps und kein Merkzettel – wie in der echten Überprüfung. Achte auf die Rechtschreibung der Fachwörter (Objektträger mit ä!). Die Korrektur kommt erst nach dem Abgeben.',
    scaleNote: 'Bei den Schreib-Aufgaben sucht die App nach Stichwörtern; Eltern können die Punkte dort anpassen. Die Lehrkraft kann anders bewerten.'
  };
  function nw(o) { for (var k in NW) if (!(k in o)) o[k] = NW[k]; return o; }
  var RF = ['richtig', 'falsch'], NR = ['1', '2', '3', '4', '5', '6'];
  function label(nums) {
    return { t: 'words', html: '<div class="nw-fig">' + window.LU5NwSvg(0) + '</div>', items: nums.map(function (n) { var p = PARTS.filter(function (x) { return x[0] === n; })[0]; return ['Nr. ' + n, p[1]]; }) };
  }
  var MAL = '(x|·|×|\\*|mal)';

  /* ------------------------------------------------------------ 1 */
  D.push(nw({ id: 'n1', nr: 1, name: 'Probe-HÜ 1', lvl: 'Warm-up', pc: '#FFD66B', sub: 'Bauteile beschriften, Funktionen, Vergrößerung',
    tasks: [
    { h: 'Beschrifte das Mikroskop.', de: 'Schreib den Namen zu jeder Nummer. Achte auf die Rechtschreibung.', topic: 'lab', parts: [label([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])] },
    { h: 'Funktionen der Bauteile', de: 'Fülle die Lücken aus.', topic: 'gapT1', parts: [
      { t: 'para', box: 'Okular Tubus Stativ Objektiv Feintrieb Objektivrevolver Objektträger',
        text: 'Das {} ist eine auswechselbare Linse, die wie eine Lupe vergrößert. Es wird vom {} gehalten. Das {} verbindet alle Teile des Mikroskops miteinander und gibt festen Halt. Das {} enthält weitere Vergrößerungslinsen. Mit Grob- und {} bewegt man den Objekttisch auf und ab. Der {} ist drehbar und trägt Objektive mit unterschiedlicher Vergrößerung. Der {} mit dem Präparat wird über die Öffnung des Objekttisches gelegt.',
        ans: ['Okular', 'Tubus', 'Stativ', 'Objektiv', 'Feintrieb', 'Objektivrevolver', 'Objektträger'] }
    ]},
    { h: 'Richtig oder falsch?', de: 'Tippe an.', topic: 'tf', parts: [
      { t: 'tf', labels: RF, items: [
        ['Mit einem Mikroskop kann man stärker vergrößern als mit einer Lupe.', true],
        ['Man trägt das Mikroskop am Tubus.', false],
        ['Zu Beginn stellt man das kleinste Objektiv ein.', true],
        ['Das Objektiv darf den Objektträger berühren.', false],
        ['Mit dem Feintrieb stellt man das Bild genau scharf.', true],
        ['Mit Kondensor und Blende regelt man die Helligkeit.', true]] }
    ]},
    { h: 'Die Vergrößerung berechnen', de: 'Schreib nur die Zahl.', topic: 'vg', parts: [
      { t: 'gaps', calc: true, lines: [
        ['Okular 10-fach, Objektiv 4-fach: Gesamtvergrößerung {}-fach', '40'],
        ['Okular 10-fach, Objektiv 10-fach: Gesamtvergrößerung {}-fach', '100'],
        ['Okular 10-fach, Objektiv 40-fach: Gesamtvergrößerung {}-fach', '400']] }
    ]},
    { h: 'Schreib-Aufgaben', de: 'In ganzen Sätzen.', topic: 'mix', parts: [
      { t: 'op', items: [
        ['Erkläre', 'Erkläre, wie man die Gesamtvergrößerung eines Mikroskops berechnet.', 2, [
          ['Okularvergrößerung und Objektivvergrößerung …', /okular/],
          ['… werden multipliziert (mal genommen).', /multipli|mal|×|·|\*/]]],
        ['Nenne', 'Nenne zwei Regeln für das Tragen und Aufbauen des Mikroskops.', 2, [
          ['Am Stativ fest anfassen (es ist schwer).', /stativ/],
          ['Das kleinste Objektiv einstellen.', /kleinste/],
          ['Tubus Richtung Stativ drehen.', /tubus/],
          ['Das Licht einschalten.', /licht|lampe/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 2 */
  D.push(nw({ id: 'n2', nr: 2, name: 'Probe-HÜ 2', lvl: 'Normal', pc: '#8FD3FF', sub: 'Reihenfolge, Regeln, Lupen und Linsen',
    tasks: [
    { h: 'Welches Bauteil ist das?', de: 'Schreib den Namen.', topic: 'fn', parts: [
      { t: 'words', items: [
        ['Daran trägst du das Mikroskop.', 'Stativ'],
        ['Damit stellst du die Helligkeit der Lampe ein.', 'Beleuchtungsregler'],
        ['Darauf liegt der Objektträger.', 'Objekttisch'],
        ['Hält das Okular.', 'Tubus'],
        ['Damit stellst du zuerst grob scharf.', 'Grobtrieb'],
        ['Liegt mit dem Kondensor unter dem Objekttisch und regelt Helligkeit und Kontrast.', 'Blende']] }
    ]},
    { h: 'Reihenfolge beim Mikroskopieren', de: 'Nummeriere die Kärtchen von 1 bis 6.', topic: 'ord', parts: [
      { t: 'pick', opts: NR, items: [
        ['Dann schaue durch das Okular und stelle durch vorsichtiges Drehen des Triebrades das Objekt scharf ein.', 3],
        ['Fasse das Mikroskop am Stativ und trage es vorsichtig zurück in den Schrank.', 5],
        ['Wenn du mikroskopieren möchtest, stellst du zuerst die kleinste Vergrößerung ein.', 0],
        ['Lege nun dein Präparat in die Mitte des Objekttisches genau über die Öffnung und klammere es fest.', 2],
        ['Wenn du fertig bist, stellst du die kleinste Vergrößerung ein, nimmst das Präparat vom Tisch und schaltest die Lampe aus.', 4],
        ['Zu Beginn siehst du noch nichts. Du musst nämlich die Lampe einschalten.', 1]] }
    ]},
    { h: 'Lupen und Linsen', de: 'Fülle die Lücken aus. Kein Wortkasten!', topic: 'gapT4', parts: [
      { t: 'para',
        text: 'Eine Linse ist ein durchsichtiges Glas, das Lichtstrahlen {}, also umlenkt. Eine Sammellinse sammelt die Lichtstrahlen und lässt sie hinter der Linse zusammenlaufen. Der Punkt, an dem sie sich treffen, heißt {}. Sammellinsen findet man zum Beispiel in {} und Kameras. Die Größe des Bildes hängt vom {} zwischen Gegenstand und Sammellinse ab. Das Bild ist seitenverkehrt und steht auf dem {}.',
        ans: ['bricht', 'Brennpunkt', 'Lupen|Lupe', 'Abstand', 'Kopf'] }
    ]},
    { h: 'Richtig oder falsch?', de: 'Tippe an.', topic: 'tf', parts: [
      { t: 'tf', labels: RF, items: [
        ['Eine Sammellinse heißt auch Konvexlinse.', true],
        ['Das Bild einer Sammellinse ist aufrecht und seitenrichtig.', false],
        ['Steht der Gegenstand näher an der Linse, entsteht ein vergrößertes Bild.', true],
        ['Okular 10-fach und Objektiv 10-fach ergeben eine 20-fache Vergrößerung.', false],
        ['Das Objektiv enthält mehrere Sammellinsen.', true]] }
    ]},
    { h: 'Schreib-Aufgabe', de: 'In ganzen Sätzen.', topic: 'mix', parts: [
      { t: 'op', items: [
        ['Beurteile', 'Beurteile, ob ein Präparat beim Scharfstellen auf das Objektiv zubewegt oder langsam davon wegbewegt werden sollte. (Buch S. 74, Aufgabe 3)', 3, [
          ['Es sollte langsam vom Objektiv weg bewegt werden.', /weg|nach unten|runter|entfern/],
          ['Sonst kann das Objektiv den Objektträger / das Deckglas berühren.', /berühr|beruehr|stoß|stoss|anstoß|drück|kaputt/],
          ['Das Glas könnte brechen (Glasbruchgefahr).', /bruch|brech|bricht|kaputt|zerbr/]]]] }
    ]}
  ]}));

  /* ------------------------------------------------------------ 3 */
  D.push(nw({ id: 'n3', nr: 3, name: 'Probe-HÜ 3', lvl: 'Generalprobe', pc: '#C9B8FF', sub: 'Alles gemischt, Regeln ohne Wortkasten',
    tasks: [
    { h: 'Beschrifte das Mikroskop.', de: 'Schreib den Namen zu jeder Nummer.', topic: 'lab', parts: [label([2, 4, 5, 6, 8, 9, 10, 11, 12, 13])] },
    { h: 'Regeln beim Mikroskopieren', de: 'Fülle die Lücken aus. Kein Wortkasten!', topic: 'gapT3', parts: [
      { t: 'para',
        text: 'Tragen: Am {} fest anfassen! Aufbauen: Das {} Objektiv nach unten einstellen und das Licht einschalten. Den Objekttisch mit dem {} nach oben drehen. Das Objektiv darf den Objektträger nicht {}. Schau durch das Okular und drehe langsam nach {}, bis das Objekt sichtbar ist. Mit dem {} kannst du nun scharf stellen. Durch das Drehen des {} stellst du die nächste Vergrößerung ein. Kontrolliere von der {}, dass das Objektiv nicht das Deckglas berührt.',
        ans: ['Stativ', 'kleinste', 'Grobtrieb', 'berühren', 'unten', 'Feintrieb', 'Objektivrevolvers|Objektivrevolver', 'Seite'] }
    ]},
    { h: 'Die Vergrößerung berechnen', de: 'Schreib nur die Zahl.', topic: 'vg', parts: [
      { t: 'gaps', calc: true, lines: [
        ['Okular 15-fach, Objektiv 10-fach: Gesamtvergrößerung {}-fach', '150'],
        ['Okular 10-fach, Objektiv 100-fach: Gesamtvergrößerung {}-fach', '1000'],
        ['Okular {}-fach, Objektiv 40-fach: Gesamtvergrößerung 400-fach', '10']] }
    ]},
    { h: 'Richtig oder falsch?', de: 'Tippe an.', topic: 'tf', parts: [
      { t: 'tf', labels: RF, items: [
        ['Beim Scharfstellen dreht man den Objekttisch zum Objektiv hin, während man durchs Okular schaut.', false],
        ['Eine Stelle, die man genauer betrachten will, schiebt man in die Mitte des Sichtfeldes.', true],
        ['Nach dem Mikroskopieren reinigt man den Objektträger.', true],
        ['Eine Linse ist ein undurchsichtiges Glas.', false],
        ['Für ein scharfes Bild muss der Abstand zwischen Gegenstand, Linse und Schirm stimmen.', true]] }
    ]},
    { h: 'Schreib-Aufgaben', de: 'In ganzen Sätzen.', topic: 'mix', parts: [
      { t: 'op', items: [
        ['Erkläre', 'Erkläre, wie ein Mikroskop ein Bild vergrößert.', 2, [
          ['Das Objektiv (mit Sammellinsen) erzeugt ein vergrößertes Bild.', /objektiv/],
          ['Das Okular vergrößert dieses Bild noch weiter, wie eine Lupe.', /okular/]]],
        ['Beschreibe', 'Beschreibe, was eine Sammellinse mit Lichtstrahlen macht und wie das Bild aussieht.', 3, [
          ['Sie bricht/sammelt die Lichtstrahlen.', /bricht|brech|sammel|umlenk|lenkt/],
          ['Die Strahlen laufen hinter der Linse im Brennpunkt zusammen.', /brennpunkt|zusammen|treffen/],
          ['Das Bild ist seitenverkehrt und steht auf dem Kopf.', /seitenverkehrt|kopf|umgedreht|verkehrt/]]]] }
    ]}
  ]}));
})();

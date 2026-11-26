/* =====================================================================
   Level Up 5 · NaWi: Mikroskop-Profi
   Stoff: Buch S. 74, KV 18 + KV 48, „Regeln beim Mikroskopieren“, Heft „Lupen und Linsen“ (24.11.2026)
   - Lernpfad (26.11.2026): 7 Etappen, jeweils erst Lernkarten lesen, dann Kurz-Check mit „Nachschauen“.
     Abgefragt wird nur, was schon gelernt ist. Eine neue Etappe pro Tag im Tagesplan.
   - Tages-Häppchen: 10 kurze Aufgaben (ca. 5 Min), was noch nicht sitzt kommt öfter
   - Lückentexte mit und ohne Wortkasten, Beschriften, Reihenfolge, Karteikarten, Merkzettel
   - Lernstand in localStorage „nw-lernstand“ (wird mit sync.js mitsynchronisiert)
   ===================================================================== */
(function () {
  function $(id) { return document.getElementById(id); }
  if (!$('nwView')) return;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function kidName(pre) { try { var n = JSON.parse(localStorage.getItem('lern-name')); n = n ? String(n).trim() : ''; return n ? (pre || '') + n : ''; } catch (e) { return ''; } }
  function store(k, v) { try { if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} return null; }
  function toast(m) { var t = $('toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.textContent = m; t.hidden = false; clearTimeout(toast.tm); toast.tm = setTimeout(function () { t.hidden = true; }, 3500); }
  var SVG = window.LU5NwSvg || function () { return ''; }, PARTS = window.LU5NwParts || [];

  /* ---------------- Stoff ---------------- */
  /* [id, Name, Funktion (kurz), Nummer auf der Zeichnung] */
  var BT = [
    ['okular', 'Okular', 'Auswechselbare Linse, durch die man hineinschaut. Vergrößert wie eine Lupe.', 1],
    ['tubus', 'Tubus', 'Hält das Okular.', 2],
    ['stativ', 'Stativ', 'Verbindet alle Teile miteinander, gibt festen Halt und ist der Handgriff beim Tragen.', 3],
    ['grob', 'Grobtrieb', 'Bewegt den Objekttisch auf und ab: grobes Scharfstellen.', 4],
    ['fein', 'Feintrieb', 'Bewegt den Objekttisch ganz wenig: genaues Scharfstellen.', 5],
    ['revolver', 'Objektivrevolver', 'Drehbar. Trägt Objektive mit unterschiedlicher Vergrößerung.', 6],
    ['objektiv', 'Objektiv', 'Enthält weitere Vergrößerungslinsen (mehrere Sammellinsen). Erzeugt ein vergrößertes Bild.', 7],
    ['traeger', 'Objektträger', 'Glasplättchen mit dem Präparat. Wird über die Öffnung des Objekttisches gelegt.', 8],
    ['tisch', 'Objekttisch', 'Darauf liegt der Objektträger. In der Mitte ist eine Öffnung für das Licht.', 9],
    ['kondensor', 'Kondensor', 'Regelt zusammen mit der Blende die Helligkeit, damit das Bild kontrastreich wird.', 10],
    ['blende', 'Blende', 'Regelt zusammen mit dem Kondensor Helligkeit und Kontrast.', 11],
    ['regler', 'Beleuchtungsregler', 'Stellt die Helligkeit der Lampe ein.', 12],
    ['licht', 'Beleuchtung', 'Beleuchtet das Objekt: mit einer Lampe oder einem beweglichen Spiegel.', 13]
  ];
  /* Lückentexte: [Antwort] bzw. [Antwort|Alternative] */
  var TEXTS = [
    { id: 'T1', name: 'Funktionen der Bauteile', src: 'Arbeitsblatt KV 18, Aufgabe 2',
      text: 'Das [Okular] ist eine auswechselbare Linse, die wie eine Lupe vergrößert. Es wird vom [Tubus] gehalten. Das [Stativ] verbindet alle Teile des Mikroskops miteinander und gibt festen Halt. Das [Objektiv] enthält weitere Vergrößerungslinsen. Die [Beleuchtung] des Objekts kann durch einen beweglichen Spiegel oder durch eine Lampe erfolgen. Mit [Kondensor|Blende] und [Blende|Kondensor] wird die Helligkeit reguliert, damit man ein kontrastreiches Bild erhält. Mit Grob- und [Feintrieb] bewegt man den Objekttisch auf und ab. Dadurch wird das Bild scharf eingestellt. Mit dem [Beleuchtungsregler] stellt man die Helligkeit der Lampe ein. Der [Objektivrevolver] ist drehbar und trägt Objektive mit unterschiedlicher Vergrößerung. Der [Objektträger] mit dem Präparat wird über die Öffnung des Objekttisches gelegt.' },
    { id: 'T2', name: 'Bau und Funktion des Mikroskops', src: 'Buch S. 74',
      text: 'Mit einem [Mikroskop] kannst du kleine Dinge viel stärker vergrößern als mit der [Lupe]. Das [Objektiv] enthält mehrere [Sammellinsen]. Sie erzeugen ein vergrößertes Bild. Dieses Bild wird durch das [Okular] wie durch eine Lupe noch weiter vergrößert. Um die Vergrößerung zu berechnen, musst du die Objektivvergrößerung mit der Okularvergrößerung [multiplizieren|malnehmen|mal nehmen]. Eine 10-fache Okular- und eine 40-fache Objektivvergrößerung ergeben eine [400]-fache Gesamtvergrößerung. Das Stativ dient außerdem als [Handgriff] beim Transport.' },
    { id: 'T3', name: 'Regeln beim Mikroskopieren', src: 'Blatt „Regeln beim Mikroskopieren“',
      text: 'Tragen: Am [Stativ] fest anfassen! Ein Mikroskop ist schwer. Aufbauen: Das [kleinste] Objektiv nach unten einstellen und den Tubus Richtung Stativ drehen. Dann das [Licht] einschalten. Vorbereitung: Den [Objektträger] am Objekttisch in die Halterung einspannen. Mikroskopieren: Den Objekttisch mit dem [Grobtrieb] nach oben drehen. Das Objektiv darf den Objektträger nicht [berühren] (Glasbruchgefahr!). Schau durch das [Okular] und drehe mit dem Grobtrieb langsam nach [unten], bis das Objekt sichtbar ist. Mit dem [Feintrieb] kannst du nun scharf stellen. Eine Stelle, die du genauer betrachten willst, schiebst du in die [Mitte] des Sichtfeldes. Durch das Drehen des [Objektivrevolvers] stellst du die nächste Vergrößerung ein. Kontrolliere von der [Seite], dass das Objektiv nicht das Deckglas berührt. Arbeit beenden: Schalte das Licht [aus], reinige den Objektträger und trage das Mikroskop am [Stativ] zurück.' },
    { id: 'T4', name: 'Lupen und Linsen', src: 'Heft, 24.11.',
      text: 'Eine [Linse] ist ein durchsichtiges Glas, das Lichtstrahlen [bricht], also umlenkt. Mit Linsen kann man [Bilder] erzeugen. Eine [Sammellinse|Konvexlinse] ist eine besondere Linse. Sie [sammelt] die Lichtstrahlen und lässt sie hinter der Linse zusammenlaufen. Der Punkt, an dem sie sich treffen, heißt [Brennpunkt]. Sammellinsen findet man zum Beispiel in [Lupen|Lupe] und Kameras. Die Größe des Bildes hängt vom [Abstand] zwischen Gegenstand und Sammellinse ab. Steht der Gegenstand näher an der Linse, entsteht ein [vergrößertes] Bild. Steht der Gegenstand weiter entfernt, entsteht ein [verkleinertes] Bild. Das Bild ist in beiden Fällen [seitenverkehrt] und steht auf dem [Kopf]. Damit man ein deutliches und scharfes Bild sieht, muss der Abstand zwischen Gegenstand, Linse und [Schirm] stimmen.' }
  ];
  /* Text in Sätze und Lücken zerlegen */
  TEXTS.forEach(function (T) {
    T.gaps = []; var i = 0;
    T.parts = T.text.split(/(\[[^\]]+\])/).map(function (p) { if (/^\[/.test(p)) { var a = p.slice(1, -1); T.gaps.push(a); return { g: i++, ans: a }; } return { s: p }; });
    T.sents = T.text.match(/[^.!]+[.!]+(\s*\([^)]*\))?/g) || [T.text];
    T.box = shuffle(T.gaps.map(function (a) { return a.split('|')[0]; })).filter(function (w, j, arr) { return arr.indexOf(w) === j; });
  });
  /* einzelne Lücken als Häppchen-Aufgaben (der Satz mit genau einer Lücke) */
  var GAPQ = [];
  TEXTS.forEach(function (T) {
    var gi = 0;
    T.sents.forEach(function (s) {
      var m = s.match(/\[[^\]]+\]/g) || [];
      m.forEach(function (g, k) {
        var idx = 0, txt = s.trim().replace(/\[([^\]]+)\]/g, function (all, a) { var r = idx === k ? '___' : a.split('|')[0]; idx++; return r; });
        GAPQ.push({ id: 'gap:' + T.id + ':' + gi, t: T.id, q: txt, ans: g.slice(1, -1) }); gi++;
      });
    });
  });
  var TF = [
    ['tf1', 'Mit einem Mikroskop kann man stärker vergrößern als mit einer Lupe.', true],
    ['tf2', 'Das Okular ist die Linse, durch die man hineinschaut.', true],
    ['tf3', 'Man trägt das Mikroskop am Tubus.', false, 'Man trägt es am Stativ.'],
    ['tf4', 'Zu Beginn stellt man das größte Objektiv ein.', false, 'Zu Beginn und am Ende: das kleinste Objektiv.'],
    ['tf5', 'Das Objektiv darf den Objektträger nicht berühren.', true, 'Sonst Glasbruchgefahr!'],
    ['tf6', 'Mit dem Feintrieb stellt man das Bild genau scharf.', true],
    ['tf7', 'Beim Scharfstellen dreht man den Objekttisch zum Objektiv hin, während man durchs Okular schaut.', false, 'Beim Durchschauen langsam nach unten, also vom Objektiv weg.'],
    ['tf8', 'Gesamtvergrößerung = Okularvergrößerung mal Objektivvergrößerung.', true],
    ['tf9', 'Ein 10-faches Okular und ein 10-faches Objektiv ergeben eine 20-fache Vergrößerung.', false, '10 × 10 = 100-fach. Mal, nicht plus!'],
    ['tf10', 'Eine Sammellinse lässt die Lichtstrahlen hinter der Linse zusammenlaufen.', true],
    ['tf11', 'Der Punkt, an dem sich die Lichtstrahlen treffen, heißt Brennpunkt.', true],
    ['tf12', 'Das Bild einer Sammellinse ist aufrecht und seitenrichtig.', false, 'Es ist seitenverkehrt und steht auf dem Kopf.'],
    ['tf13', 'Steht der Gegenstand weiter weg von der Linse, wird das Bild kleiner.', true],
    ['tf14', 'Mit Kondensor und Blende regelt man die Helligkeit.', true],
    ['tf15', 'Der Objektivrevolver hält das Okular.', false, 'Das Okular hält der Tubus. Der Objektivrevolver trägt die Objektive.'],
    ['tf16', 'Wenn man fertig ist, stellt man wieder die kleinste Vergrößerung ein.', true],
    ['tf17', 'Sammellinsen gibt es zum Beispiel in Lupen und Kameras.', true],
    ['tf18', 'Eine Linse ist ein undurchsichtiges Glas.', false, 'Eine Linse ist durchsichtig.'],
    ['tf19', 'Das Objektiv enthält mehrere Sammellinsen.', true],
    ['tf20', 'Ein Mikroskop braucht man für Dinge, die man mit bloßem Auge oder Lupe nicht erkennen kann.', true]
  ];
  var MC = [
    ['mc1', 'Okular 10-fach, Objektiv 40-fach. Wie groß ist die Gesamtvergrößerung?', ['400-fach', '50-fach', '4 000-fach', '30-fach'], '10 × 40 = 400'],
    ['mc2', 'Okular 10-fach, Objektiv 4-fach. Wie groß ist die Gesamtvergrößerung?', ['40-fach', '14-fach', '400-fach', '6-fach'], '10 × 4 = 40'],
    ['mc3', 'Okular 15-fach, Objektiv 10-fach. Wie groß ist die Gesamtvergrößerung?', ['150-fach', '25-fach', '1 500-fach', '105-fach'], '15 × 10 = 150'],
    ['mc4', 'Ein Mikroskop hat ein 10-faches Okular und Objektive mit 4-, 10- und 40-facher Vergrößerung. Welche Gesamtvergrößerungen kannst du einstellen?', ['40-, 100- und 400-fach', '14-, 20- und 50-fach', '4-, 10- und 40-fach'], 'Immer mal 10 rechnen (Buch S. 74, Aufgabe 2).'],
    ['mc5', 'Solltest du das Präparat beim Scharfstellen zum Objektiv hin oder davon weg bewegen?', ['Langsam davon weg', 'Schnell zum Objektiv hin', 'Egal'], 'Sonst stößt das Objektiv an den Objektträger und das Glas kann brechen (Buch S. 74, Aufgabe 3).'],
    ['mc6', 'Womit stellst du das Bild zuerst grob scharf?', ['Mit dem Grobtrieb', 'Mit dem Feintrieb', 'Mit der Blende', 'Mit dem Objektivrevolver'], 'Erst Grobtrieb, dann Feintrieb.'],
    ['mc7', 'Welches Objektiv stellst du am Anfang und am Ende ein?', ['Das kleinste', 'Das größte', 'Das mittlere'], 'Kleinste Vergrößerung zuerst und zum Schluss.'],
    ['mc8', 'Was macht eine Linse mit Lichtstrahlen?', ['Sie bricht sie, also lenkt sie um.', 'Sie verschluckt sie.', 'Sie färbt sie bunt.'], ''],
    ['mc9', 'Wie heißt eine Sammellinse noch?', ['Konvexlinse', 'Brennlinse', 'Okularlinse'], ''],
    ['mc10', 'Wie heißt der Punkt hinter der Sammellinse, an dem die Lichtstrahlen zusammenlaufen?', ['Brennpunkt', 'Mittelpunkt', 'Lichtpunkt'], ''],
    ['mc11', 'Wie sieht das Bild einer Sammellinse aus?', ['Seitenverkehrt und auf dem Kopf', 'Aufrecht und seitenrichtig', 'Nur auf dem Kopf'], ''],
    ['mc12', 'Was muss stimmen, damit das Bild auf dem Schirm scharf ist?', ['Der Abstand zwischen Gegenstand, Linse und Schirm', 'Die Farbe der Linse', 'Die Größe des Schirms'], ''],
    ['mc13', 'Wie entsteht das Bild im Mikroskop?', ['Das Objektiv erzeugt ein vergrößertes Bild, das Okular vergrößert es noch weiter.', 'Nur das Okular vergrößert.', 'Die Lampe vergrößert das Bild.'], ''],
    ['mc14', 'Was tust du, wenn du eine Stelle genauer betrachten willst?', ['In die Mitte des Sichtfeldes schieben, dann den Objektivrevolver zur nächsten Vergrößerung drehen', 'Sofort das größte Objektiv nehmen', 'Den Objektträger herausnehmen'], ''],
    ['mc15', 'Warum kontrollierst du beim Objektivwechsel von der Seite?', ['Damit das Objektiv nicht das Deckglas berührt', 'Damit es heller wird', 'Damit das Bild bunt wird'], '']
  ];
  var ORD = [
    { id: 'ord1', name: 'Kärtchen-Reihenfolge (KV 48)', steps: [
      'Kleinste Vergrößerung einstellen: Objektivrevolver drehen, bis das kleinste Objektiv einrastet.',
      'Lampe einschalten.',
      'Präparat in die Mitte des Objekttisches über die Öffnung legen und festklammern.',
      'Durchs Okular schauen und mit dem Triebrad scharf stellen. Mit der Blende Helligkeit und Kontrast regeln.',
      'Fertig: kleinste Vergrößerung einstellen, Präparat abnehmen, Lampe ausschalten.',
      'Mikroskop am Stativ fassen und zurück in den Schrank tragen.'] },
    { id: 'ord2', name: 'Regeln: Schritt für Schritt', steps: [
      'Mikroskop am Stativ tragen.',
      'Kleinstes Objektiv einstellen, Tubus Richtung Stativ drehen.',
      'Licht einschalten.',
      'Objektträger in die Halterung einspannen.',
      'Objekttisch mit dem Grobtrieb nach oben drehen (Objektiv darf nichts berühren).',
      'Durchs Okular schauen, mit dem Grobtrieb langsam nach unten drehen.',
      'Mit dem Feintrieb scharf stellen.',
      'Licht aus, Objektträger reinigen, Mikroskop am Stativ zurücktragen.'] }
  ];
  var VG = [[10, 4], [10, 10], [10, 40], [10, 100], [5, 10], [15, 10], [15, 4], [5, 40], [12, 10], [20, 4]];

  /* Merkzettel */
  var RULES = [
    ['Wozu ein Mikroskop?', 'Damit erkennt man Strukturen, die man mit dem bloßen Auge oder einer Lupe <b>nicht</b> erkennen kann. Es vergrößert viel stärker als eine Lupe.'],
    ['So entsteht das Bild', 'Das <b>Objektiv</b> enthält mehrere <b>Sammellinsen</b> und erzeugt ein vergrößertes Bild. Das <b>Okular</b> vergrößert es wie eine Lupe noch weiter.'],
    ['Vergrößerung berechnen', '<b>Okular × Objektiv</b> (mal rechnen, nicht plus!).<br>10-faches Okular × 40-faches Objektiv = <b>400-fach</b>.<br>Okular 10× mit Objektiven 4×, 10×, 40× → 40×, 100×, 400×.'],
    ['Regeln beim Mikroskopieren', '<b>1. Tragen:</b> am Stativ fest anfassen.<br><b>2. Aufbauen:</b> kleinstes Objektiv nach unten, Tubus Richtung Stativ, Licht an.<br><b>3. Vorbereitung:</b> Objektträger am Objekttisch einspannen.<br><b>4. Mikroskopieren:</b> Tisch mit dem Grobtrieb nach oben (Objektiv darf nichts berühren – Glasbruchgefahr!). Durchs Okular schauen und mit dem Grobtrieb <b>langsam nach unten</b>, bis man etwas sieht. Mit dem Feintrieb scharf stellen. Stelle in die Mitte schieben, Objektivrevolver zur nächsten Vergrößerung drehen, <b>von der Seite</b> kontrollieren. Bei jedem Objektivwechsel wiederholen.<br><b>5. Beenden:</b> Licht aus, Objektträger reinigen, Objektiv und Tubus in Ausgangsposition, am Stativ zurücktragen.'],
    ['Lupen und Linsen', 'Eine <b>Linse</b> ist ein durchsichtiges Glas, das Lichtstrahlen <b>bricht</b> (umlenkt). Eine <b>Sammellinse (Konvexlinse)</b> sammelt die Strahlen, sie laufen hinter der Linse im <b>Brennpunkt</b> zusammen. Zu finden in Lupen und Kameras.<br>Gegenstand <b>näher</b> an der Linse → Bild <b>vergrößert</b>. Gegenstand <b>weiter weg</b> → Bild <b>verkleinert</b>. Das Bild ist immer <b>seitenverkehrt und auf dem Kopf</b>.<br>Scharf wird es nur, wenn der Abstand zwischen Gegenstand, Linse und Schirm stimmt.'],
    ['Wörter, die oft falsch geschrieben werden', 'Objekt<b>trä</b>ger (mit ä) · Objekt<b>tisch</b> · <b>Tubus</b> (ohne r) · Obje<b>k</b>tiv · O<b>k</b>ular · Kon<b>d</b>ensor · Beleuchtung<b>s</b>regler · Objektiv<b>revolver</b>']
  ];
  var CARDS = BT.map(function (b) { return ['k:' + b[0], 'Was macht ' + (b[1] === 'Blende' || b[1] === 'Beleuchtung' ? 'die ' : b[1] === 'Stativ' || b[1] === 'Okular' || b[1] === 'Objektiv' ? 'das ' : 'der ') + '<b>' + b[1] + '</b>?', b[2]]; }).concat([
    ['k:r1', 'Wo fasst du das Mikroskop beim Tragen an?', 'Am <b>Stativ</b>, fest mit beiden Händen. Es ist schwer.'],
    ['k:r2', 'Was stellst du vor dem Mikroskopieren ein?', 'Das <b>kleinste Objektiv</b>, Tubus Richtung Stativ, dann <b>Licht an</b>.'],
    ['k:r3', 'Wie stellst du richtig scharf?', 'Tisch mit dem Grobtrieb nach oben (ohne Berühren!). Dann durchs Okular schauen und <b>langsam nach unten</b> drehen. Zum Schluss mit dem <b>Feintrieb</b> genau scharf stellen.'],
    ['k:r4', 'Warum darf das Objektiv den Objektträger nicht berühren?', '<b>Glasbruchgefahr!</b> Objektträger oder Objektiv können kaputtgehen.'],
    ['k:r5', 'Was machst du, wenn du fertig bist?', 'Licht aus, Objektträger reinigen, kleinste Vergrößerung / Ausgangsposition, am Stativ zurücktragen.'],
    ['k:v1', 'Wie berechnest du die Gesamtvergrößerung?', '<b>Okular × Objektiv</b>. Beispiel: 10 × 40 = 400-fach.'],
    ['k:v2', 'Warum reicht eine Lupe nicht?', 'Das Mikroskop vergrößert <b>viel stärker</b>. Damit erkennt man Strukturen, die man mit Auge oder Lupe nicht sieht.'],
    ['k:l1', 'Was ist eine Linse?', 'Ein <b>durchsichtiges Glas</b>, das Lichtstrahlen <b>bricht</b> (umlenkt). Mit Linsen erzeugt man Bilder.'],
    ['k:l2', 'Was macht eine Sammellinse?', 'Sie <b>sammelt</b> die Lichtstrahlen. Sie laufen hinter der Linse im <b>Brennpunkt</b> zusammen. Anderer Name: <b>Konvexlinse</b>.'],
    ['k:l3', 'Wovon hängt die Größe des Bildes ab?', 'Vom <b>Abstand</b> zwischen Gegenstand und Sammellinse. Näher → vergrößert, weiter weg → verkleinert.'],
    ['k:l4', 'Wie sieht das Bild einer Sammellinse aus?', '<b>Seitenverkehrt</b> und <b>auf dem Kopf</b>.'],
    ['k:l5', 'Wann ist das Bild auf dem Schirm scharf?', 'Wenn der <b>Abstand</b> zwischen Gegenstand, Linse und Schirm stimmt.'],
    ['k:l6', 'Wo findet man Sammellinsen?', 'Zum Beispiel in <b>Lupen</b>, <b>Kameras</b> und im <b>Mikroskop</b> (Objektiv).']
  ]);

  /* ---------------- Lernpfad: erst lernen (wie im Heft), dann abfragen ----------------
     7 Etappen. Jede Etappe: Lernkarten lesen → kurzer Check mit „Nachschauen“.
     Häppchen, Lückentexte usw. fragen nur ab, was schon gelernt ist. */
  var LENS_SVG = '<svg class="nw-svg" viewBox="0 0 340 160" role="img" aria-label="Sammellinse: Lichtstrahlen treffen sich im Brennpunkt"><rect width="340" height="160" rx="16" fill="#FFFFFF"/>' +
    [45, 80, 115].map(function (y) { return '<line x1="20" y1="' + y + '" x2="150" y2="' + y + '" stroke="#E0A000" stroke-width="3"/><line x1="150" y1="' + y + '" x2="262" y2="80" stroke="#E0A000" stroke-width="3"/>'; }).join('') +
    '<path d="M150 22 Q176 80 150 138 Q124 80 150 22 Z" fill="#CDEBFF" stroke="#1F2A44" stroke-width="2"/><circle cx="262" cy="80" r="6" fill="#5B2DBF"/>' +
    '<text x="150" y="155" font-size="13" font-weight="700" fill="#1F2A44" text-anchor="middle" font-family="Trebuchet MS, Verdana, sans-serif">Sammellinse</text>' +
    '<text x="262" y="108" font-size="13" font-weight="700" fill="#5B2DBF" text-anchor="middle" font-family="Trebuchet MS, Verdana, sans-serif">Brennpunkt</text>' +
    '<text x="22" y="30" font-size="12" fill="#1F2A44" font-family="Trebuchet MS, Verdana, sans-serif">Lichtstrahlen</text></svg>';
  var BILD_SVG = '<svg class="nw-svg" viewBox="0 0 340 160" role="img" aria-label="Das Bild steht auf dem Kopf"><rect width="340" height="160" rx="16" fill="#FFFFFF"/>' +
    '<line x1="60" y1="115" x2="60" y2="45" stroke="#2E7D32" stroke-width="5"/><path d="M48 58 L60 38 L72 58 Z" fill="#2E7D32"/>' +
    '<path d="M170 22 Q194 80 170 138 Q146 80 170 22 Z" fill="#CDEBFF" stroke="#1F2A44" stroke-width="2"/>' +
    '<line x1="285" y1="45" x2="285" y2="105" stroke="#C62828" stroke-width="5"/><path d="M273 92 L285 112 L297 92 Z" fill="#C62828"/><line x1="315" y1="20" x2="315" y2="140" stroke="#8A93A6" stroke-width="4"/>' +
    '<text x="60" y="140" font-size="13" font-weight="700" fill="#1F2A44" text-anchor="middle" font-family="Trebuchet MS, Verdana, sans-serif">Gegenstand</text>' +
    '<text x="170" y="155" font-size="13" font-weight="700" fill="#1F2A44" text-anchor="middle" font-family="Trebuchet MS, Verdana, sans-serif">Linse</text>' +
    '<text x="270" y="140" font-size="13" font-weight="700" fill="#C62828" text-anchor="middle" font-family="Trebuchet MS, Verdana, sans-serif">Bild</text>' +
    '<text x="315" y="155" font-size="11" fill="#1F2A44" text-anchor="middle" font-family="Trebuchet MS, Verdana, sans-serif">Schirm</text></svg>';
  var LESSONS = [
    { id: 'e1', name: 'Bauteile oben', sub: 'Okular, Tubus, Objektivrevolver, Objektiv, Stativ',
      parts: ['okular', 'tubus', 'revolver', 'objektiv', 'stativ'], ids: ['tf2', 'tf15'], cards: [
      { t: 'Okular und Tubus', hi: [1, 2], x: '<b>1 · Okular:</b> Hier schaust du hinein. Es ist eine auswechselbare Linse und vergrößert wie eine Lupe.<br><b>2 · Tubus:</b> das Rohr, das das Okular hält.', tip: 'Eselsbrücke: <b>Ok</b>ular kommt von „oculus“, das ist Latein für <b>Auge</b>. Da ist dein Auge. Tubus schreibt man ohne r.' },
      { t: 'Objektivrevolver und Objektiv', hi: [6, 7], x: '<b>7 · Objektiv:</b> sitzt unten, ganz nah am Objekt. Es enthält weitere Vergrößerungslinsen.<br><b>6 · Objektivrevolver:</b> ist drehbar und trägt mehrere Objektive mit unterschiedlicher Vergrößerung.', tip: 'Ob<b>jekt</b>iv ist nah am Ob<b>jekt</b>, Okular nah am Auge.' },
      { t: 'Stativ', hi: [3], x: '<b>3 · Stativ:</b> verbindet alle Teile des Mikroskops miteinander und gibt festen Halt. Am Stativ trägst du das Mikroskop, es ist der <b>Handgriff</b> beim Transport.' }
    ]},
    { id: 'e2', name: 'Tisch und Triebe', sub: 'Objektträger, Objekttisch, Grobtrieb, Feintrieb',
      parts: ['traeger', 'tisch', 'grob', 'fein'], ids: ['tf6', 'mc6'], cards: [
      { t: 'Objekttisch und Objektträger', hi: [8, 9], x: '<b>9 · Objekttisch:</b> Darauf liegt der Objektträger. In der Mitte ist eine Öffnung für das Licht.<br><b>8 · Objektträger:</b> ein Glasplättchen mit dem Präparat. Er wird über die Öffnung des Objekttisches gelegt.', tip: 'Objekt<b>trä</b>ger mit ä, denn er <b>trä</b>gt das Präparat.' },
      { t: 'Grobtrieb und Feintrieb', hi: [4, 5], x: 'Die beiden Räder bewegen den Objekttisch auf und ab. So wird das Bild scharf.<br><b>4 · Grobtrieb</b> (großes Rad): grob scharf stellen.<br><b>5 · Feintrieb</b> (kleines Rad): ganz wenig bewegen, also genau scharf stellen.', tip: 'Erst <b>grob</b>, dann <b>fein</b>.' }
    ]},
    { id: 'e3', name: 'Licht und Helligkeit', sub: 'Beleuchtung, Beleuchtungsregler, Kondensor, Blende',
      parts: ['licht', 'regler', 'kondensor', 'blende'], ids: ['tf14'], texts: ['T1'], cards: [
      { t: 'Beleuchtung und Beleuchtungsregler', hi: [12, 13], x: '<b>13 · Beleuchtung:</b> beleuchtet das Objekt von unten, mit einer Lampe oder einem beweglichen Spiegel.<br><b>12 · Beleuchtungsregler:</b> stellt die Helligkeit der Lampe ein.' },
      { t: 'Kondensor und Blende', hi: [10, 11], x: 'Sie sitzen unter dem Objekttisch.<br><b>10 · Kondensor</b> und <b>11 · Blende</b> regeln zusammen die Helligkeit, damit das Bild <b>kontrastreich</b> wird.', tip: 'Kon<b>d</b>ensor mit d.' },
      { t: 'Geschafft: alle 13 Bauteile', names: true, x: 'Schau dir das ganze Mikroskop noch einmal an. Ab jetzt kannst du auch „Mikroskop beschriften“ und den ersten Lückentext üben.' }
    ]},
    { id: 'e4', name: 'Vergrößerung', sub: 'Wozu ein Mikroskop? Wie entsteht das Bild? Rechnen',
      ids: ['tf1', 'tf8', 'tf9', 'tf19', 'tf20', 'mc1', 'mc2', 'mc3', 'mc4', 'mc13', 'vg', 'k:v1', 'k:v2'], texts: ['T2'], cards: [
      { t: 'Wozu ein Mikroskop?', x: 'Mit einem <b>Mikroskop</b> kannst du kleine Dinge viel stärker vergrößern als mit einer <b>Lupe</b>. Du erkennst damit Strukturen, die du mit dem bloßen Auge oder mit der Lupe nicht sehen kannst.' },
      { t: 'So entsteht das Bild', hi: [7, 1], x: '1. Das <b>Objektiv</b> enthält mehrere <b>Sammellinsen</b>. Sie erzeugen ein vergrößertes Bild.<br>2. Das <b>Okular</b> vergrößert dieses Bild wie eine Lupe noch weiter.' },
      { t: 'Vergrößerung berechnen', x: '<b>Okular × Objektiv</b>, also <b>mal</b> rechnen.<br>Okular 10-fach, Objektiv 40-fach: 10 × 40 = <b>400-fach</b>.<br>Okular 10-fach mit Objektiven 4-, 10- und 40-fach: 40-, 100- und 400-fach.', tip: 'Achtung, nicht plus! 10 × 10 = 100-fach, nicht 20.' }
    ]},
    { id: 'e5', name: 'Regeln beim Mikroskopieren', sub: 'Tragen, Aufbauen, Scharfstellen, Beenden',
      ids: ['tf3', 'tf4', 'tf5', 'tf7', 'tf16', 'mc5', 'mc7', 'mc14', 'mc15', 'ord1', 'ord2', 'k:r1', 'k:r2', 'k:r3', 'k:r4', 'k:r5'], texts: ['T3'], cards: [
      { t: '1. Tragen und Aufbauen', x: '<b>Tragen:</b> Am <b>Stativ</b> fest anfassen. Ein Mikroskop ist schwer!<br><b>Aufbauen:</b> Das <b>kleinste</b> Objektiv nach unten einstellen und den Tubus Richtung Stativ drehen. Dann das <b>Licht</b> einschalten.<br><b>Vorbereitung:</b> Den <b>Objektträger</b> am Objekttisch in die Halterung einspannen.' },
      { t: '2. Scharf stellen', hi: [4, 5], x: 'Den Objekttisch mit dem <b>Grobtrieb</b> nach oben drehen. Das Objektiv darf den Objektträger dabei <b>nicht berühren</b> (Glasbruchgefahr!).<br>Dann durchs <b>Okular</b> schauen und mit dem Grobtrieb langsam nach <b>unten</b> drehen, also vom Objektiv weg, bis du etwas siehst.<br>Mit dem <b>Feintrieb</b> stellst du genau scharf.', tip: 'Beim Durchschauen immer nur vom Objektiv <b>weg</b> drehen.' },
      { t: '3. Genauer hinschauen', hi: [6], x: 'Die Stelle, die du genauer sehen willst, schiebst du in die <b>Mitte</b> des Sichtfeldes. Dann drehst du den <b>Objektivrevolver</b> zur nächsten Vergrößerung.<br>Kontrolliere dabei von der <b>Seite</b>, dass das Objektiv nicht das Deckglas berührt.' },
      { t: '4. Arbeit beenden', x: 'Licht <b>aus</b>, Objektträger reinigen, wieder die <b>kleinste</b> Vergrößerung einstellen und das Mikroskop am <b>Stativ</b> zurück in den Schrank tragen.', tip: 'Kleinstes Objektiv am Anfang <b>und</b> am Ende.' }
    ]},
    { id: 'e6', name: 'Linsen', sub: 'Linse, Sammellinse, Brennpunkt',
      ids: ['tf10', 'tf11', 'tf17', 'tf18', 'mc8', 'mc9', 'mc10', 'k:l1', 'k:l2', 'k:l6'], cards: [
      { t: 'Was ist eine Linse?', x: 'Eine <b>Linse</b> ist ein <b>durchsichtiges</b> Glas, das Lichtstrahlen <b>bricht</b>, also umlenkt. Mit Linsen kann man <b>Bilder</b> erzeugen.' },
      { t: 'Die Sammellinse', svg: LENS_SVG, x: 'Eine <b>Sammellinse</b> (anderer Name: <b>Konvexlinse</b>) <b>sammelt</b> die Lichtstrahlen. Sie laufen hinter der Linse zusammen. Der Punkt, an dem sie sich treffen, heißt <b>Brennpunkt</b>.<br>Sammellinsen gibt es zum Beispiel in <b>Lupen</b>, <b>Kameras</b> und im Objektiv des Mikroskops.' }
    ]},
    { id: 'e7', name: 'Das Bild der Sammellinse', sub: 'Abstand, vergrößert/verkleinert, auf dem Kopf',
      ids: ['tf12', 'tf13', 'mc11', 'mc12', 'k:l3', 'k:l4', 'k:l5'], texts: ['T4'], cards: [
      { t: 'Groß oder klein?', x: 'Die Größe des Bildes hängt vom <b>Abstand</b> zwischen Gegenstand und Sammellinse ab.<br>Gegenstand <b>näher</b> an der Linse → <b>vergrößertes</b> Bild.<br>Gegenstand <b>weiter weg</b> → <b>verkleinertes</b> Bild.' },
      { t: 'Das Bild steht Kopf', svg: BILD_SVG, x: 'Das Bild ist immer <b>seitenverkehrt</b> und steht auf dem <b>Kopf</b>.<br>Deutlich und scharf wird es nur, wenn der <b>Abstand</b> zwischen Gegenstand, Linse und <b>Schirm</b> stimmt.' }
    ]}
  ];
  var LMAP = {};
  LESSONS.forEach(function (L, i) {
    L.i = i; L.nr = i + 1;
    (L.parts || []).forEach(function (pid) { LMAP['lab:' + pid] = LMAP['fn:' + pid] = LMAP['k:' + pid] = i; });
    (L.ids || []).forEach(function (id) { LMAP[id] = i; });
    (L.texts || []).forEach(function (t) { LMAP['T:' + t] = i; });
  });
  function lessonOf(id) { if (id in LMAP) return LMAP[id]; var m = /^gap:(T\d):/.exec(id); if (m && ('T:' + m[1]) in LMAP) return LMAP['T:' + m[1]]; return LESSONS.length - 1; }
  function plain(h) { return String(h).replace(/<[^>]+>/g, ' '); }

  /* ---------------- Aufgaben-Pool ---------------- */
  var POOL = [];
  BT.forEach(function (b) { POOL.push({ id: 'lab:' + b[0], k: 'lab', b: b }); });
  BT.forEach(function (b) { POOL.push({ id: 'fn:' + b[0], k: 'fn', b: b }); });
  GAPQ.forEach(function (g) { POOL.push({ id: g.id, k: 'gap', g: g }); });
  TF.forEach(function (t) { POOL.push({ id: t[0], k: 'tf', t: t }); });
  MC.forEach(function (m) { POOL.push({ id: m[0], k: 'mc', m: m }); });
  ORD.forEach(function (o) { POOL.push({ id: o.id, k: 'ord', o: o }); });
  POOL.push({ id: 'vg', k: 'vg' });
  /* Reihenfolge beim ersten Kennenlernen: erst die Bauteile, dann Regeln, dann Linsen */
  function stage(it) {
    if (it.k === 'lab' || it.k === 'fn' || (it.g && it.g.t === 'T1')) return 0;
    if (it.k === 'vg' || (it.g && it.g.t === 'T2') || /^(mc1|mc2|mc3|mc4|mc13|tf1|tf2|tf8|tf9|tf19|tf20)$/.test(it.id)) return 1;
    if (it.k === 'ord' || (it.g && it.g.t === 'T3') || /^(mc5|mc6|mc7|mc14|mc15|tf3|tf4|tf5|tf6|tf7|tf14|tf15|tf16)$/.test(it.id)) return 2;
    return 3;
  }

  /* ---------------- Lernstand ---------------- */
  var KEY = 'nw-lernstand', DUE = [0, 1, 2, 4, 7];
  function st() { var s = store(KEY); if (!s || typeof s !== 'object') s = {}; s.it = s.it || {}; s.c = s.c || {}; s.L = s.L || {}; return s; }
  /* wie viele Etappen (der Reihe nach) schon gelernt sind */
  function learnedN(S) { S = S || st(); var n = 0; while (n < LESSONS.length && S.L[LESSONS[n].id]) n++; return n; }
  function unlocked(id, S) { return lessonOf(id) < learnedN(S); }
  function lernedToday() { return store('nw-lern-day') === dayKey(); }
  /* mit Nachschauen richtig: zählt nicht als falsch, macht die Aufgabe aber auch noch nicht „sicher“ */
  function seen(id, S) { var x = S.it[id] || { b: 0, n: 0 }; x.n++; S.it[id] = x; }
  function save(s) { store(KEY, s); }
  function daysSince(d) { if (!d) return 999; return Math.round((new Date(dayKey() + 'T00:00:00') - new Date(d + 'T00:00:00')) / 86400000); }
  /* r: 1 richtig, 0.5 fast (Tippfehler), 0 falsch */
  function rate(id, r, S) {
    var x = S.it[id] || { b: 0, n: 0 }, k = dayKey();
    x.n++;
    if (r >= 1) { if (x.d !== k || x.b === 0) x.b = Math.min(4, (x.b || 0) + 1); }
    else if (r === 0) { x.b = 0; x.w = (x.w || 0) + 1; }
    x.d = k; x.r = r; S.it[id] = x;
  }
  function safe(x) { return x && x.b >= 2; }
  /* „Klappt schon“: einmal richtig zählt halb, sicher (an zwei Tagen richtig) ganz */
  function score(x) { return x ? Math.min(x.b || 0, 2) / 2 : 0; }
  function pct(S) { S = S || st(); var n = 0; POOL.forEach(function (p) { n += score(S.it[p.id]); }); return Math.round(n / POOL.length * 100); }
  function areaStats(S) {
    var A = [['Bauteile benennen', function (p) { return lessonOf(p.id) <= 2; }],
      ['Vergrößerung', function (p) { return lessonOf(p.id) === 3; }],
      ['Regeln beim Mikroskopieren', function (p) { return lessonOf(p.id) === 4; }],
      ['Lupen und Linsen', function (p) { return lessonOf(p.id) >= 5; }]];
    return A.map(function (a) { var L = POOL.filter(a[1]), n = 0; L.forEach(function (p) { n += score(S.it[p.id]); }); var seen = L.filter(function (p) { return S.it[p.id]; }).length; return { name: a[0], p: Math.round(n / L.length * 100), seen: seen, all: L.length }; });
  }
  function pickHappchen(S, n) {
    var wrong = [], due = [], fresh = [], AV = POOL.filter(function (p) { return unlocked(p.id, S); });
    if (!AV.length) AV = POOL.filter(function (p) { return lessonOf(p.id) === 0; });
    n = Math.min(n, AV.length);
    AV.forEach(function (p) {
      var x = S.it[p.id];
      if (!x) fresh.push(p);
      else if (x.b === 0) wrong.push(p);
      else if (daysSince(x.d) >= DUE[x.b]) due.push(p);
    });
    fresh.sort(function (a, b) { return stage(a) - stage(b) || Math.random() - 0.5; });
    var out = shuffle(wrong).slice(0, 4);
    out = out.concat(shuffle(due).slice(0, Math.max(3, n - out.length - 4)));
    out = out.concat(fresh.slice(0, n - out.length));
    if (out.length < n) out = out.concat(shuffle(AV.filter(function (p) { return out.indexOf(p) < 0; })).slice(0, n - out.length));
    /* höchstens eine Reihenfolge-Aufgabe, nicht zwei gleiche Arten hintereinander */
    var ords = out.filter(function (p) { return p.k === 'ord'; });
    if (ords.length > 1) out = out.filter(function (p) { return p.k !== 'ord' || p === ords[0]; });
    out = shuffle(out.slice(0, n));
    for (var i = 1; i < out.length; i++) if (out[i].k === out[i - 1].k) { for (var j = i + 1; j < out.length; j++) if (out[j].k !== out[i - 1].k) { var t = out[i]; out[i] = out[j]; out[j] = t; break; } }
    return out;
  }

  /* ---------------- Wörter vergleichen ---------------- */
  function norm(s) { return String(s || '').replace(/\s+/g, ' ').replace(/[.!?,;:]+$/, '').trim(); }
  function dist(a, b) {
    var n = a.length, m = b.length, d = [], i, j; if (Math.abs(n - m) > 2) return 3;
    for (i = 0; i <= n; i++) d[i] = [i]; for (j = 0; j <= m; j++) d[0][j] = j;
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) { d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); }
    return d[n][m];
  }
  /* → { r: 1 | 0.5 | 0, note } */
  function cmp(given, answer) {
    var g = norm(given), L = String(answer).split('|');
    if (!g) return { r: 0, note: '' };
    for (var i = 0; i < L.length; i++) if (g === L[i]) return { r: 1, note: '' };
    for (i = 0; i < L.length; i++) if (g.toLowerCase() === L[i].toLowerCase()) return { r: 0.5, note: /^[A-ZÄÖÜ]/.test(L[i]) ? 'Nomen schreibt man groß: ' + L[i] : 'Hier klein: ' + L[i] };
    var gl = g.toLowerCase().replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü');
    for (i = 0; i < L.length; i++) if (L[i].length >= 4 && dist(gl, L[i].toLowerCase()) === 1) return { r: 0.5, note: 'Fast! Richtig geschrieben: ' + L[i] };
    return { r: 0, note: '' };
  }

  /* ---------------- Ansicht ---------------- */
  var host = $('nwMain'), mode = null, R = null;
  function header(t, sub) { return '<div class="nw-head"><button type="button" class="btn small" data-nw="home">← NaWi-Start</button><span class="nw-ttl">' + t + (sub ? '<small>' + sub + '</small>' : '') + '</span></div>'; }
  function lockBtn(cls, act, label, need, ln, extra) {
    if (need < ln) return '<button type="button" class="btn ' + cls + '" data-nw="' + act + '"' + (extra || '') + '>' + label + '</button>';
    return '<button type="button" class="btn ' + cls + ' nw-locked" disabled>' + label + '<small>🔒 nach Etappe ' + (need + 1) + '</small></button>';
  }
  function home() {
    var S = st(), p = pct(S), today = store('nw-hap-day') === dayKey(), areas = areaStats(S), ln = learnedN(S), nextL = LESSONS[ln], lt = lernedToday(), all = ln >= LESSONS.length;
    mode = null;
    /* Lernpfad */
    var h = '<section class="card voc-card nw-card">';
    h += '<p class="voc-eyebrow">Lernpfad · ' + ln + ' von ' + LESSONS.length + ' Etappen gelernt</p>';
    if (nextL) h += '<button type="button" class="btn ' + (lt ? '' : 'primary ') + 'nw-big" data-nw="lesson" data-i="' + ln + '">' + (lt ? '➕ Schon die nächste Etappe? (Bonus)<br><small>' : '📖 Neu lernen: ') + 'Etappe ' + nextL.nr + ' · ' + nextL.name + (lt ? '</small>' : ' · ca. 5 Min') + '</button>';
    else h += '<p class="nw-say">🌟 Du hast alle Etappen gelernt! Jetzt hilft das Tages-Häppchen, dass alles im Kopf bleibt.</p>';
    if (lt && nextL) h += '<p class="nw-small">✅ Heute hast du schon eine Etappe gelernt. Morgen geht es weiter mit „' + nextL.name + '“.</p>';
    h += '<ol class="nw-path">' + LESSONS.map(function (L, i) {
      var done = i < ln, now = i === ln;
      var inner = '<span class="nw-pi">' + (done ? '✅' : now ? '▶️' : '🔒') + '</span><span class="nw-pt"><b>' + L.nr + '. ' + L.name + '</b><small>' + L.sub + (done ? ' · zum Nachlesen antippen' : '') + '</small></span>';
      return '<li class="' + (done ? 'done' : now ? 'now' : 'lock') + '">' + (done ? '<button type="button" class="nw-pathb" data-nw="lread" data-i="' + i + '">' + inner + '</button>' : '<span class="nw-pathb">' + inner + '</span>') + '</li>';
    }).join('') + '</ol></section>';
    /* Abfragen */
    h += '<section class="card voc-card nw-card">';
    h += '<p class="voc-eyebrow">Wiederholen: Was sitzt schon?</p>';
    h += '<div class="nw-prog"><span class="nw-ring" style="--p:' + p + '"><b>' + p + ' %</b></span><span><b>' + (p >= 90 ? 'Fast alles sitzt – stark!' : p >= 50 ? 'Mehr als die Hälfte klappt schon!' : p > 0 ? 'Klappt schon: ' + p + ' %' : 'Hier siehst du bald, was schon klappt.') + '</b><br><span class="nw-small">Abgefragt wird nur, was du schon gelernt hast. Ganz sicher ist eine Aufgabe, wenn sie an zwei verschiedenen Tagen richtig war.</span></span></div>';
    if (ln > 0) h += '<button type="button" class="btn ' + (all && !today ? 'primary ' : '') + 'nw-big" data-nw="hap">' + (today ? '✅ Häppchen heute geschafft · nochmal?' : '🔬 Tages-Häppchen · ' + Math.min(10, POOL.filter(function (x) { return unlocked(x.id, S); }).length) + ' Aufgaben · ca. 5 Min') + '</button>';
    else h += '<p class="nw-small">Das Tages-Häppchen startet, sobald du die erste Etappe gelernt hast.</p>';
    h += '<ul class="nw-areas">' + areas.map(function (a) { return '<li><span>' + a.name + '</span><span class="nw-bar"><i style="width:' + a.p + '%"></i></span><b>' + a.p + ' %</b></li>'; }).join('') + '</ul>';
    h += '</section>';
    h += '<section class="card voc-card nw-card"><p class="voc-eyebrow">Gezielt üben</p><div class="nw-grid">';
    h += lockBtn('nw-txt', 'lab', '🔬 Mikroskop beschriften', 2, ln);
    h += lockBtn('nw-txt', 'cards', '🗂️ Karteikarten', 0, ln);
    h += lockBtn('nw-txt', 'ord', '🔢 Reihenfolge', 4, ln);
    h += lockBtn('nw-txt', 'vg', '✖️ Vergrößerung rechnen', 3, ln);
    h += '</div><p class="voc-eyebrow">Lückentexte</p><div class="nw-grid">';
    TEXTS.forEach(function (T) { var c = S.c[T.id], need = LMAP['T:' + T.id]; h += lockBtn('nw-txt', 'text', '<span>📝 ' + T.name + '</span>' + (need < ln ? '<small>' + T.src + (c ? ' · zuletzt ' + c + ' %' : '') + '</small>' : ''), need, ln, ' data-t="' + T.id + '"'); });
    h += '</div><p class="nw-small">Erst mit Wortkasten, dann ohne (wie in der Überprüfung). Achte auf die Rechtschreibung der Fachwörter.' + (all ? '' : ' Die Probe-HÜs unten passen am besten, wenn alle Etappen gelernt sind.') + '</p></section>';
    h += '<details class="levels"><summary><span class="lv-title">Merkzettel</span><span class="lv-sum">Bauteile, Regeln, Linsen</span></summary><div class="lv-body nw-rules"><div class="nw-fig">' + SVG(0, true) + '</div>';
    h += '<table class="nw-tab"><tbody>' + BT.map(function (b) { return '<tr><td><b>' + b[3] + '. ' + b[1] + '</b></td><td>' + b[2] + '</td></tr>'; }).join('') + '</tbody></table>';
    h += RULES.map(function (r) { return '<p><b>' + r[0] + '</b><br>' + r[1] + '</p>'; }).join('') + '</div></details>';
    host.innerHTML = h; probe(true);
  }

  /* ---------- Etappe lernen ---------- */
  function figOf(c) { return c.svg || (c.names ? SVG(0, true) : c.hi ? SVG(c.hi) : ''); }
  function cardHtml(c) {
    var f = figOf(c);
    return '<div class="nw-lcard"><p class="nw-lt">' + c.t + '</p>' + (f ? '<div class="nw-fig">' + f + '</div>' : '') + '<p class="nw-lx">' + c.x + '</p>' + (c.tip ? '<p class="nw-tip">💡 ' + c.tip + '</p>' : '') + '</div>';
  }
  function startLesson(i, readOnly) {
    var ln = learnedN();
    if (!readOnly && i > ln) i = ln;
    if (i >= LESSONS.length) { home(); return; }
    R = { L: LESSONS[i], ci: 0, read: !!readOnly || i < ln }; mode = 'lesson'; probe(false); drawLesson();
  }
  function drawLesson() {
    var L = R.L, n = L.cards.length, c = L.cards[R.ci], last = R.ci === n - 1;
    var h = header('Etappe ' + L.nr + ': ' + L.name, 'Lernkarte ' + (R.ci + 1) + ' von ' + n + (R.read ? ' · nachlesen' : ', danach ein kurzer Check'));
    h += '<section class="card voc-card nw-card"><span class="nw-bar nw-top"><i style="width:' + ((R.ci + 1) / (n + (R.read ? 0 : 1)) * 100) + '%"></i></span>';
    if (R.ci === 0 && !R.read) h += '<p class="nw-small">Lies jede Karte in Ruhe, wie im Heft. Danach kommen ein paar kurze Fragen. Dabei darfst du jederzeit nachschauen.</p>';
    h += cardHtml(c);
    h += '<div class="nw-row2">' + (R.ci > 0 ? '<button type="button" class="btn" data-nw="lprev">← Zurück</button>' : '<span></span>') + '<button type="button" class="btn primary" data-nw="lnext">' + (last ? (R.read ? 'Fertig ✓' : 'Verstanden – zum Check ✓') : 'Weiter →') + '</button></div></section>';
    host.innerHTML = h; window.scrollTo(0, 0);
  }
  function lessonNext() {
    if (R.ci < R.L.cards.length - 1) { R.ci++; drawLesson(); return; }
    if (R.read) { home(); return; }
    startLessonCheck(R.L);
  }
  function startLessonCheck(L) {
    var S = st(), ln = learnedN(S), by = {}, out = [];
    var mine = shuffle(POOL.filter(function (p) { return lessonOf(p.id) === L.i && /^(fn|lab|tf|mc|vg)$/.test(p.k); }));
    mine.forEach(function (p) { by[p.k] = (by[p.k] || 0) + 1; if (by[p.k] <= 2 && out.length < 6) out.push(p); });
    mine.forEach(function (p) { if (out.length < 5 && out.indexOf(p) < 0) out.push(p); });
    /* 2 Aufgaben aus früheren Etappen zum Wiederholen (am liebsten, was noch nicht sitzt) */
    var old = shuffle(POOL.filter(function (p) { return lessonOf(p.id) < Math.min(L.i, ln) && /^(fn|lab|tf|mc|vg)$/.test(p.k); }));
    old.sort(function (a, b) { var xa = S.it[a.id], xb = S.it[b.id]; return (xa ? xa.b : 0) - (xb ? xb.b : 0); });
    startRound(shuffle(out).concat(old.slice(0, 2)), 'Etappe ' + L.nr + ': Kurz-Check', false);
    R.lesson = L;
  }
  function peekCards(p) {
    var li = lessonOf(p.id), cs = [];
    for (var i = 0; i <= li; i++) cs = cs.concat(LESSONS[i].cards);
    var f = [];
    if (p.b) f = cs.filter(function (c) { return c.hi && c.hi.indexOf(p.b[3]) >= 0; });
    else if (p.k === 'gap') { var w = p.g.ans.split('|')[0].toLowerCase(); f = cs.filter(function (c) { return plain(c.x + ' ' + c.t).toLowerCase().indexOf(w) >= 0; }); }
    return f.length ? f.slice(0, 2) : LESSONS[li].cards;
  }
  function peek() {
    var p = cur(), box = $('nwPeek'); if (!box) return;
    if (!box.hidden) { box.hidden = true; return; }
    if (!R.answered) R.peeked[p.id] = 1;
    box.innerHTML = '<p class="nw-small"><b>📖 Nachschauen</b> – zählt nicht als Fehler.</p>' + peekCards(p).map(cardHtml).join('');
    box.hidden = false;
  }
  function probe(on) { var pb = $('nwProbe'); if (pb) pb.hidden = !on; }

  /* ---------- Häppchen / Einzelrunden ---------- */
  function startRound(items, name, isHap) {
    R = { items: items.slice(), i: 0, name: name, hap: isHap, ok: 0, first: {}, again: [], before: {}, peeked: {}, S: st() };
    items.forEach(function (p) { var x = R.S.it[p.id]; R.before[p.id] = x ? x.b : -1; });
    mode = 'round'; probe(false); renderQ();
  }
  function cur() { return R.items[R.i]; }
  function qHtml(p) {
    var h = '';
    if (p.k === 'lab') {
      h += '<p class="nw-q">Wie heißt das Bauteil mit der <b>Nummer ' + p.b[3] + '</b>?</p><div class="nw-fig">' + SVG(p.b[3]) + '</div>' + inputH();
    } else if (p.k === 'fn') {
      var lim = Math.max(lessonOf(p.id), learnedN() - 1), oth = BT.filter(function (x) { return x !== p.b && lessonOf('fn:' + x[0]) <= lim; });
      if (oth.length < 3) oth = BT.filter(function (x) { return x !== p.b; });
      var opts = shuffle([p.b].concat(shuffle(oth).slice(0, 3)));
      R.opts = opts.map(function (o) { return o[1]; });
      h += '<p class="nw-q">Welches Bauteil ist das?</p><p class="nw-say">' + esc(p.b[2]) + '</p>' + optsH(R.opts);
    } else if (p.k === 'gap') {
      var T = TEXTS.filter(function (t) { return t.id === p.g.t; })[0];
      h += '<p class="nw-q">Welches Wort fehlt? <span class="nw-small">(' + T.name + ')</span></p><p class="nw-say">' + esc(p.g.q).replace('___', '<span class="nw-gapmark">?</span>') + '</p>' + inputH();
    } else if (p.k === 'tf') {
      R.opts = ['richtig', 'falsch'];
      h += '<p class="nw-q">Richtig oder falsch?</p><p class="nw-say">' + esc(p.t[1]) + '</p>' + optsH(R.opts);
    } else if (p.k === 'mc') {
      R.opts = shuffle(p.m[2]);
      h += '<p class="nw-q">' + esc(p.m[1]) + '</p>' + optsH(R.opts);
    } else if (p.k === 'vg') {
      var v = R.vg || (R.vg = pick(VG));
      h += '<p class="nw-q">Okular <b>' + v[0] + '-fach</b>, Objektiv <b>' + v[1] + '-fach</b>. Wie groß ist die Gesamtvergrößerung?</p><div class="nw-row"><input class="nw-in" id="nwIn" inputmode="numeric" autocomplete="off" aria-label="Gesamtvergrößerung"><span>-fach</span></div><button type="button" class="btn primary" data-nw="check">Prüfen</button>';
    } else if (p.k === 'ord') {
      R.ord = { left: shuffle(p.o.steps.map(function (s, i) { return i; })), done: [], err: 0 };
      h += '<p class="nw-q">' + esc(p.o.name) + ': Tippe die Schritte in der <b>richtigen Reihenfolge</b> an.</p><ol class="nw-ord-done" id="nwOrdDone"></ol><div class="nw-ord" id="nwOrd"></div>';
    }
    return h;
  }
  function inputH() { return '<input class="nw-in" id="nwIn" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" aria-label="Antwort"><button type="button" class="btn primary" data-nw="check">Prüfen</button>'; }
  function optsH(o) { return '<div class="nw-opts">' + o.map(function (x, i) { return '<button type="button" class="nw-opt" data-nwo="' + i + '">' + esc(x) + '</button>'; }).join('') + '</div>'; }
  function renderQ() {
    var p = cur(); R.vg = null; R.answered = false; delete R.peeked[p.id];
    var n = R.items.length, h = header(R.name, 'Aufgabe ' + Math.min(R.i + 1, n) + ' von ' + n);
    h += '<section class="card voc-card nw-card"><span class="nw-bar nw-top"><i style="width:' + (R.i / n * 100) + '%"></i></span>' + qHtml(p) + (p.k !== 'ord' ? '<button type="button" class="btn small nw-peekb" data-nw="peek">📖 Nachschauen</button>' : '') + '<div id="nwPeek" class="nw-peek" hidden></div><div id="nwFb" class="nw-fb" hidden></div></section>';
    host.innerHTML = h;
    if (p.k === 'ord') drawOrd();
    var inp = $('nwIn'); if (inp) { inp.focus({ preventScroll: true }); inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); if (R.answered) next(); else check(); } }); }
    window.scrollTo(0, 0);
  }
  function drawOrd() {
    var p = cur(), o = R.ord;
    $('nwOrdDone').innerHTML = o.done.map(function (i) { return '<li>' + esc(p.o.steps[i]) + '</li>'; }).join('');
    $('nwOrd').innerHTML = o.left.map(function (i) { return '<button type="button" class="nw-step" data-nws="' + i + '">' + esc(p.o.steps[i]) + '</button>'; }).join('');
  }
  function solution(p) {
    if (p.k === 'lab' || p.k === 'fn') return p.b[1];
    if (p.k === 'gap') return p.g.ans.split('|')[0];
    if (p.k === 'tf') return p.t[2] ? 'richtig' : 'falsch';
    if (p.k === 'mc') return p.m[2][0];
    if (p.k === 'vg') return String(R.vg[0] * R.vg[1]);
    return '';
  }
  function explain(p) {
    if (p.k === 'lab') return p.b[2];
    if (p.k === 'fn') return 'Nr. ' + p.b[3] + ' auf der Zeichnung.';
    if (p.k === 'tf') return p.t[3] || '';
    if (p.k === 'mc') return p.m[3] || '';
    if (p.k === 'vg') return 'Okular × Objektiv: ' + R.vg[0] + ' × ' + R.vg[1] + ' = ' + R.vg[0] * R.vg[1] + '-fach.';
    return '';
  }
  function check(chosen) {
    if (R.answered) return;
    var p = cur(), res;
    if (p.k === 'lab' || p.k === 'gap') { var v = $('nwIn').value; if (!norm(v)) { $('nwIn').focus(); return; } res = cmp(v, p.k === 'lab' ? p.b[1] : p.g.ans); }
    else if (p.k === 'vg') { var vv = String($('nwIn').value).replace(/[^0-9]/g, ''); if (!vv) { $('nwIn').focus(); return; } res = { r: Number(vv) === R.vg[0] * R.vg[1] ? 1 : 0, note: '' }; }
    else if (p.k === 'ord') res = { r: R.ord.err === 0 ? 1 : R.ord.err <= 1 ? 0.5 : 0, note: R.ord.err ? R.ord.err + (R.ord.err === 1 ? ' Fehler' : ' Fehler') + ' unterwegs' : '' };
    else res = { r: R.opts[chosen] === solution(p) ? 1 : 0, note: '' };
    R.answered = true;
    var firstTime = !(p.id in R.first);
    var peeked = !!R.peeked[p.id];
    if (firstTime) { R.first[p.id] = res.r; if (peeked && res.r >= 1) seen(p.id, R.S); else rate(p.id, res.r, R.S); save(R.S); if (res.r >= 1) R.ok++; }
    if ((res.r < 1 || peeked) && firstTime) R.items.push(p); /* kommt am Ende der Runde noch einmal */
    document.querySelectorAll('[data-nwo]').forEach(function (b) { b.disabled = true; if (R.opts && R.opts[+b.getAttribute('data-nwo')] === solution(p)) b.classList.add('ok'); else if (+b.getAttribute('data-nwo') === chosen) b.classList.add('bad'); });
    if ($('nwIn')) { $('nwIn').readOnly = true; $('nwIn').classList.add(res.r >= 1 ? 'ok' : res.r > 0 ? 'half' : 'bad'); }
    var cb = document.querySelector('[data-nw="check"]'); if (cb) cb.hidden = true;
    var fb = $('nwFb'), sol = solution(p), ex = explain(p);
    var head = res.r >= 1 ? pick(['Richtig! ✓', 'Super! ✓', 'Genau! ✓', 'Stark! ✓']) : res.r > 0 ? 'Fast!' : 'Noch nicht.';
    fb.className = 'nw-fb ' + (res.r >= 1 ? 'ok' : res.r > 0 ? 'half' : 'bad');
    fb.innerHTML = '<b>' + head + '</b>' + (res.note ? ' ' + esc(res.note) + '.' : '') + (res.r < 1 && sol && !res.note ? ' Richtig ist: <b>' + esc(sol) + '</b>.' : '') + (ex && (res.r < 1 || p.k === 'vg') ? '<br><span class="nw-small">' + esc(ex) + '</span>' : '') + (res.r < 1 && firstTime ? '<br><span class="nw-small">Die Aufgabe kommt am Ende noch einmal.</span>' : peeked && firstTime ? '<br><span class="nw-small">Mit Nachschauen geschafft 👍 Am Ende kommt sie noch einmal – dann schaffst du sie ohne.</span>' : '') + '<br><button type="button" class="btn primary" data-nw="next">Weiter</button>';
    fb.hidden = false;
    var nb = fb.querySelector('[data-nw="next"]'); if (nb) nb.focus({ preventScroll: true });
  }
  function next() { R.i++; if (R.i >= R.items.length) end(); else renderQ(); }
  function end() {
    if (R.lesson) { var S0 = st(); if (!S0.L[R.lesson.id]) S0.L[R.lesson.id] = dayKey(); save(S0); store('nw-lern-day', dayKey()); }
    var S = st(), n = Object.keys(R.first).length, up = [];
    if (R.lesson) {
      var L = R.lesson, nx = LESSONS[L.i + 1], hl = header('Etappe ' + L.nr + ': ' + L.name, 'gelernt');
      hl += '<section class="card voc-card nw-card nw-end"><p class="nw-big-txt">🎉 Etappe ' + L.nr + ' gelernt' + esc(kidName(', ')) + '!</p>';
      hl += '<p>' + (R.ok === n ? '🌟 Alle ' + n + ' Fragen beim ersten Mal richtig.' : '✅ ' + R.ok + ' von ' + n + ' Fragen beim ersten Mal richtig.') + ' Ab jetzt kommt „' + esc(L.name) + '“ im Tages-Häppchen dran, damit es im Kopf bleibt.</p>';
      hl += '<button type="button" class="btn primary" data-nw="home">Fertig</button>' + (nx ? '<button type="button" class="btn small" data-nw="lesson" data-i="' + (L.i + 1) + '">Schon die nächste Etappe? (Bonus)</button>' : '') + '</section>';
      host.innerHTML = hl; mode = 'end';
      toast('📖 Etappe ' + L.nr + ' geschafft! Super' + kidName(', ') + '!');
      if (window.LU5Plan) window.LU5Plan();
      return;
    }
    if (R.hap) { store('nw-hap-day', dayKey()); }
    Object.keys(R.first).forEach(function (id) { var x = S.it[id]; if (x && x.b >= 2 && R.before[id] < 2) up.push(id); });
    var p = pct(S), h = header(R.name, 'geschafft');
    h += '<section class="card voc-card nw-card nw-end"><p class="nw-big-txt">' + (R.ok === n ? '🌟 Alles beim ersten Mal richtig' + esc(kidName(', ')) + '!' : '✅ ' + R.ok + ' von ' + n + ' beim ersten Mal richtig') + '</p>';
    h += '<div class="nw-prog"><span class="nw-ring" style="--p:' + p + '"><b>' + p + ' %</b></span><span><b>Klappt schon: ' + p + ' %</b>' + (up.length ? '<br>📈 ' + up.length + (up.length === 1 ? ' Aufgabe ist' : ' Aufgaben sind') + ' heute neu „sicher“ geworden.' : '') + '</span></div>';
    h += '<button type="button" class="btn primary" data-nw="home">Fertig</button>' + (R.hap ? '<button type="button" class="btn small" data-nw="hap">Noch ein Häppchen (Bonus)</button>' : '') + '</section>';
    host.innerHTML = h; mode = 'end';
    if (R.hap) toast('🔬 NaWi-Häppchen geschafft! Super' + kidName(', ') + '!');
    if (window.LU5Plan) window.LU5Plan();
  }

  /* ---------- Lückentext ---------- */
  function startText(id, withBox) {
    var T = TEXTS.filter(function (t) { return t.id === id; })[0]; mode = 'text'; probe(false); R = { T: T, box: withBox };
    var h = header('Lückentext: ' + T.name, T.src);
    h += '<section class="card voc-card nw-card"><div class="nw-seg"><button type="button" class="nw-segb" data-nw="text" data-t="' + id + '" data-box="1" aria-pressed="' + withBox + '">Mit Wortkasten</button><button type="button" class="nw-segb" data-nw="text" data-t="' + id + '" data-box="0" aria-pressed="' + !withBox + '">Ohne (Profi)</button></div>';
    if (withBox) h += '<p class="nw-box">' + T.box.map(function (w) { return '<span>' + esc(w) + '</span>'; }).join('') + '</p>';
    h += '<div class="nw-para">' + T.parts.map(function (p) { return p.s != null ? esc(p.s) : '<input class="nw-gin" data-g="' + p.g + '" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" size="' + Math.max(6, p.ans.split('|')[0].length) + '" aria-label="Lücke ' + (p.g + 1) + '">'; }).join('') + '</div>';
    h += '<button type="button" class="btn primary" data-nw="tcheck">Prüfen</button><div id="nwFb" class="nw-fb" hidden></div></section>';
    host.innerHTML = h; window.scrollTo(0, 0);
  }
  function textCheck() {
    var T = R.T, S = st(), got = 0, used = {};
    var ins = document.querySelectorAll('.nw-gin');
    ins.forEach(function (inp) {
      var g = +inp.getAttribute('data-g'), ans = T.gaps[g], r = cmp(inp.value, ans);
      /* Kondensor/Blende dürfen getauscht sein, aber nicht zweimal dasselbe */
      var key = ans.split('|').sort().join('|') + ':' + norm(inp.value).toLowerCase();
      if (r.r > 0 && ans.indexOf('|') > 0 && used[key]) r = { r: 0, note: '' };
      used[key] = 1;
      inp.readOnly = true; inp.classList.remove('ok', 'half', 'bad'); inp.classList.add(r.r >= 1 ? 'ok' : r.r > 0 ? 'half' : 'bad');
      if (r.r < 1) { var s = document.createElement('span'); s.className = 'nw-sol'; s.textContent = '→ ' + ans.split('|')[0]; inp.after(s); }
      got += r.r;
      rate('gap:' + T.id + ':' + g, r.r, S);
    });
    var p = Math.round(got / T.gaps.length * 100);
    S.c[T.id] = p; save(S);
    var fb = $('nwFb');
    fb.className = 'nw-fb ' + (p >= 100 ? 'ok' : p >= 70 ? 'half' : 'bad');
    fb.innerHTML = '<b>' + (p >= 100 ? '🌟 Alles richtig!' : got + ' von ' + T.gaps.length + ' Lücken richtig (' + p + ' %).') + '</b>' + (p < 100 ? '<br><span class="nw-small">Gelb = fast (Groß/klein oder ein Buchstabe). Lies die Lösungen einmal laut.</span>' : '') + '<br><button type="button" class="btn primary" data-nw="text" data-t="' + T.id + '" data-box="' + (R.box && p >= 80 ? 0 : R.box ? 1 : 0) + '">' + (R.box && p >= 80 ? 'Jetzt ohne Wortkasten' : 'Nochmal') + '</button><button type="button" class="btn small" data-nw="home">Fertig</button>';
    fb.hidden = false;
    document.querySelector('[data-nw="tcheck"]').hidden = true;
    if (window.LU5Plan) window.LU5Plan();
  }

  /* ---------- Beschriften (alle 13 auf einmal) ---------- */
  function startLab() {
    mode = 'lab'; probe(false);
    var h = header('Mikroskop beschriften', 'wie auf dem Arbeitsblatt');
    h += '<section class="card voc-card nw-card"><div class="nw-fig">' + SVG(0) + '</div><ol class="nw-lablist">';
    PARTS.slice().sort(function (a, b) { return a[0] - b[0]; }).forEach(function (p) { h += '<li><b>' + p[0] + '</b><input class="nw-gin nw-lab" data-n="' + p[0] + '" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="Nummer ' + p[0] + '"></li>'; });
    h += '</ol><button type="button" class="btn primary" data-nw="lcheck">Prüfen</button><div id="nwFb" class="nw-fb" hidden></div></section>';
    host.innerHTML = h; window.scrollTo(0, 0);
  }
  function labCheck() {
    var S = st(), got = 0;
    document.querySelectorAll('.nw-lab').forEach(function (inp) {
      var n = +inp.getAttribute('data-n'), b = BT.filter(function (x) { return x[3] === n; })[0], r = cmp(inp.value, b[1]);
      inp.readOnly = true; inp.classList.add(r.r >= 1 ? 'ok' : r.r > 0 ? 'half' : 'bad');
      if (r.r < 1) { var s = document.createElement('span'); s.className = 'nw-sol'; s.textContent = '→ ' + b[1]; inp.after(s); }
      got += r.r; rate('lab:' + b[0], r.r, S);
    });
    save(S);
    var fb = $('nwFb');
    fb.className = 'nw-fb ' + (got >= 13 ? 'ok' : got >= 10 ? 'half' : 'bad');
    fb.innerHTML = '<b>' + (got >= 13 ? '🌟 Alle 13 richtig!' : got + ' von 13 richtig.') + '</b><br><button type="button" class="btn primary" data-nw="lab">Nochmal</button><button type="button" class="btn small" data-nw="home">Fertig</button>';
    fb.hidden = false; document.querySelector('[data-nw="lcheck"]').hidden = true;
    if (window.LU5Plan) window.LU5Plan();
  }

  /* ---------- Karteikarten ---------- */
  function startCards() {
    var S = st(), k = dayKey();
    var AVC = CARDS.filter(function (c) { return unlocked(c[0], S); }); if (!AVC.length) AVC = CARDS.filter(function (c) { return lessonOf(c[0]) === 0; });
    var due = AVC.filter(function (c) { var x = S.it[c[0]]; return !x || x.b === 0 || daysSince(x.d) >= DUE[x.b]; });
    if (!due.length) due = shuffle(AVC).slice(0, 8);
    R = { cards: shuffle(due).slice(0, 12), i: 0, flip: false, ok: 0 }; mode = 'cards'; probe(false); drawCard();
  }
  function drawCard() {
    var c = R.cards[R.i], h = header('Karteikarten', 'Karte ' + (R.i + 1) + ' von ' + R.cards.length);
    h += '<section class="card voc-card nw-card"><button type="button" class="nw-flash" data-nw="flip"><span class="nw-small">' + (R.flip ? 'Antwort' : 'Frage – erst im Kopf antworten, dann umdrehen') + '</span><span class="nw-fq">' + (R.flip ? c[2] : c[1]) + '</span></button>';
    h += R.flip ? '<div class="nw-row2"><button type="button" class="btn" data-nw="cno">🔁 Noch nicht</button><button type="button" class="btn primary" data-nw="cyes">✓ Wusste ich</button></div>' : '<button type="button" class="btn primary" data-nw="flip">Umdrehen</button>';
    h += '</section>'; host.innerHTML = h;
  }
  function cardAns(ok) {
    var S = st(), c = R.cards[R.i]; rate(c[0], ok ? 1 : 0, S); save(S); if (ok) R.ok++;
    if (!ok) R.cards.push(c);
    R.i++; R.flip = false;
    if (R.i >= R.cards.length || R.i >= 20) { host.innerHTML = header('Karteikarten', 'geschafft') + '<section class="card voc-card nw-card nw-end"><p class="nw-big-txt">✅ Karteikarten durch!</p><p>Was du noch nicht wusstest, kommt beim nächsten Mal wieder.</p><button type="button" class="btn primary" data-nw="home">Fertig</button></section>'; mode = 'end'; return; }
    drawCard();
  }

  /* ---------- Klicks ---------- */
  $('nwView').addEventListener('click', function (e) {
    var o = e.target.closest('[data-nwo]'); if (o && mode === 'round') { check(+o.getAttribute('data-nwo')); return; }
    var s = e.target.closest('[data-nws]');
    if (s && mode === 'round' && R.ord && !R.answered) {
      var i = +s.getAttribute('data-nws'), need = R.ord.done.length;
      if (i === need) { R.ord.done.push(i); R.ord.left = R.ord.left.filter(function (x) { return x !== i; }); drawOrd(); if (!R.ord.left.length) check(); }
      else { R.ord.err++; s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake'); }
      return;
    }
    var b = e.target.closest('[data-nw]'); if (!b) return;
    var a = b.getAttribute('data-nw');
    if (a === 'home') home();
    else if (a === 'lesson') startLesson(+b.getAttribute('data-i'), false);
    else if (a === 'lread') startLesson(+b.getAttribute('data-i'), true);
    else if (a === 'lnext') lessonNext();
    else if (a === 'lprev') { if (R.ci > 0) { R.ci--; drawLesson(); } }
    else if (a === 'peek') peek();
    else if (a === 'hap') startRound(pickHappchen(st(), 10), 'Tages-Häppchen', true);
    else if (a === 'check') check();
    else if (a === 'next') next();
    else if (a === 'text') startText(b.getAttribute('data-t'), b.getAttribute('data-box') !== '0');
    else if (a === 'tcheck') textCheck();
    else if (a === 'lab') startLab();
    else if (a === 'lcheck') labCheck();
    else if (a === 'cards') startCards();
    else if (a === 'flip') { R.flip = !R.flip; drawCard(); }
    else if (a === 'cyes') cardAns(true);
    else if (a === 'cno') cardAns(false);
    else if (a === 'ord') startRound(shuffle(POOL.filter(function (p) { return p.k === 'ord'; })), 'Reihenfolge', false);
    else if (a === 'vg') startRound([0, 1, 2, 3, 4, 5].map(function () { return POOL.filter(function (p) { return p.k === 'vg'; })[0]; }).concat(POOL.filter(function (p) { return /^(mc1|mc2|mc3|mc4|tf8|tf9)$/.test(p.id); })), 'Vergrößerung rechnen', false);
  });

  function homeTile() {
    var el = $('nwTileState'); if (!el) return;
    var p = pct(), today = store('nw-hap-day') === dayKey() || lernedToday(), ln = learnedN();
    el.textContent = (ln < LESSONS.length ? 'Etappe ' + ln + '/' + LESSONS.length + ' · ' : '') + 'Klappt schon: ' + p + ' %' + (today ? ' · heute ✓' : '');
  }
  window.LU5Nw = {
    open: function () { if (mode !== 'round' && mode !== 'text' && mode !== 'lab' && mode !== 'cards' && mode !== 'lesson') home(); },
    /* Tagesplan: solange es neue Etappen gibt, steht dort „Neu lernen“ (eine Etappe pro Tag), danach das Häppchen */
    plan: function () {
      var ln = learnedN(), L = LESSONS[ln];
      if (!L) return null;
      if (lernedToday()) return { title: 'NaWi: Etappe gelernt ✓', sub: ln + ' von ' + LESSONS.length + ' Etappen · morgen: „' + LESSONS[ln].name + '“', done: true, btn: 'Ansehen' };
      return { title: 'NaWi: Neu lernen – ' + L.name, sub: 'Etappe ' + L.nr + ' von ' + LESSONS.length + ' · erst lesen, dann kurze Fragen · ca. 5 Min', done: false, btn: 'Los' };
    },
    learn: function () { if (lernedToday() || learnedN() >= LESSONS.length) home(); else startLesson(learnedN(), false); },
    learned: function () { return learnedN(); },
    home: homeTile,
    hap: function () { startRound(pickHappchen(st(), 10), 'Tages-Häppchen', true); },
    doneToday: function () { return store('nw-hap-day') === dayKey() || lernedToday(); },
    pct: function () { return pct(); },
    topic: function (t) {
      if (/^gap(T\d)$/.test(t)) startText(t.slice(3), true);
      else if (t === 'lab') startLab(); else if (t === 'ord') startRound(shuffle(POOL.filter(function (p) { return p.k === 'ord'; })), 'Reihenfolge', false);
      else if (t === 'vg') $('nwView').querySelector('[data-nw]') && startRound(POOL.filter(function (p) { return /^(vg|mc1|mc2|mc3|mc4|tf8|tf9)$/.test(p.id); }), 'Vergrößerung rechnen', false);
      else if (t === 'fn' || t === 'tf') startRound(shuffle(POOL.filter(function (p) { return p.k === t; })).slice(0, 10), t === 'fn' ? 'Bauteile und Funktionen' : 'Richtig oder falsch?', false);
      else home();
    },
    _pool: POOL, _texts: TEXTS, _cmp: cmp
  };
  homeTile();
  /* Die Startseite wurde schon vor diesem Skript gezeichnet: Tagesplan mit NaWi neu zeichnen */
  if (window.LU5Plan) window.LU5Plan();
})();

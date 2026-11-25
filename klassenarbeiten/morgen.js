/* =====================================================================
   Level Up 5 · Guten-Morgen-Karte
   Beim ersten Öffnen am Tag: Begrüßung, kurzer Rückblick auf den letzten
   Lerntag (nur Positives), was heute ansteht und ein Mut-Satz.
   Bleibt sichtbar, bis man „Los geht's“ tippt. Einmal pro Tag.
   ===================================================================== */
(function () {
  function $(id) { return document.getElementById(id); }
  var home = $('homeView'); if (!home) return;
  function store(k, v) { try { if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} return null; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  var WD = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var SN = { math: 'Mathe', en: 'Englisch', de: 'Deutsch', ek: 'Erdkunde', nw: 'NaWi' };
  var TESTS = [['kaDate', 'die Englisch-Klassenarbeit'], ['mkaDate', 'die Mathe-Klassenarbeit'], ['mhDate', 'die Mathe-HÜ'], ['dkaDate', 'die Deutsch-HÜ'], ['dikDate', 'das Übungsdiktat'], ['ekaDate', 'die Erdkunde-HÜ'], ['nwDate', 'die NaWi-Überprüfung']];
  var MOTTO = [
    'Fehler sind Hinweise, keine Niederlagen. Jeder gefundene Fehler macht dich stärker.',
    'Kleine Schritte jeden Tag bringen dich weiter als ein großer Sprint am Ende.',
    'Du musst nicht perfekt sein. Dranbleiben reicht – und das kannst du richtig gut.',
    'Was heute schwer ist, ist in einer Woche normal. So funktioniert Lernen.',
    'Dein Gehirn ist wie ein Muskel: Es wird mit jeder Übung stärker.',
    'Nicht „Ich kann das nicht“, sondern „Ich kann das NOCH nicht“.',
    'Wie beim Laufen: gleichmäßig bleiben, nicht zu schnell starten – und am Ende zulegen.',
    'Jede richtige Antwort von heute ist eine, die in der Arbeit schon sitzt.',
    'Mutig ist, wer es trotzdem probiert. Auch wenn es noch nicht klappt.',
    'Konzentriert 15 Minuten sind mehr wert als eine Stunde nebenbei.',
    'Du hast schon so viel geschafft. Heute kommt ein kleines Stück dazu.',
    'Lies jede Aufgabe zweimal – das ist der einfachste Trick für mehr Punkte.',
    'Stolz sein darfst du auf deine Mühe, nicht nur auf die Note.',
    'Erst das Schwierigste, dann wird der Rest leicht.',
    'Wer übt, wird ruhiger. Und wer ruhig ist, weiß in der Arbeit mehr.',
    'Gelb ist nicht schlecht – Gelb heißt: Hier lernst du gerade etwas.',
    'Heute ist ein guter Tag, um etwas Neues zu können.',
    'Ein Lächeln vor dem Lernen macht den Kopf frei. Probier’s aus!'
  ];

  function kidName() { var n = store('lern-name'); return n ? String(n).trim() : ''; }
  function list(names) { return names.length <= 1 ? names.join('') : names.slice(0, -1).join(', ') + ' und ' + names[names.length - 1]; }
  function grades(res, from, to) {
    var out = [], D = window.LU5KA_DATA || [];
    Object.keys(res || {}).forEach(function (id) {
      (res[id] || []).forEach(function (x) {
        if (x.d >= from && x.d < to) {
          var ex = D.filter(function (e) { return e.id === id; })[0];
          var subj = ex ? (ex.back === 'math' ? 'Mathe' : ex.back === 'de' ? 'Deutsch' : ex.back === 'ek' ? 'Erdkunde' : ex.back === 'nw' ? 'NaWi' : 'Englisch') : '';
          out.push({ name: ex ? (ex.name || 'Probe-Klassenarbeit ' + ex.nr) : 'Probe-Arbeit', subj: subj, g: x.g });
        }
      });
    });
    return out;
  }

  function build(now) {
    var k = dayKey(now), log = store('lern-zeiten') || {}, st = store('lern-einstellungen') || {}, name = kidName();
    var hr = now.getHours();
    var hello = (hr < 11 ? 'Guten Morgen' : hr < 17 ? 'Hallo' : 'Guten Abend') + (name ? ', ' + esc(name) : '') + '! ' + (hr < 11 ? '☀️' : '👋');
    var lines = [];
    /* Rückblick: letzter Lerntag in den vergangenen 6 Tagen */
    var last = null;
    for (var i = 1; i <= 6; i++) {
      var d = addDays(now, -i), L = log[dayKey(d)] || {}, tot = 0, subs = [];
      ['math', 'en', 'de', 'ek', 'nw'].forEach(function (s) { if ((L[s] || 0) >= 60) { tot += L[s]; subs.push(SN[s]); } });
      if (tot >= 60) { last = { d: d, i: i, min: Math.round(tot / 60), subs: subs, star: !!L.plan }; break; }
    }
    if (last) {
      var when = last.i === 1 ? 'Gestern' : last.i === 2 ? 'Vorgestern' : 'Am ' + WD[last.d.getDay()];
      var t = when + ' hast du <b>' + last.min + ' Minuten</b> gelernt' + (last.subs.length ? ': ' + list(last.subs) : '') + '.';
      if (last.star) t += ' Und deinen Tagesplan hast du komplett geschafft ⭐';
      lines.push(t);
      var kt = (store('ka-tablet') || {}).res, g = grades(kt, last.d.getTime(), addDays(last.d, 1).getTime());
      var good = g.filter(function (x) { return x.g <= 2; }).sort(function (a, b) { return a.g - b.g; });
      if (good.length) lines.push('🏆 ' + esc(good[0].subj) + ': ' + esc(good[0].name) + ' mit <b>Note ' + good[0].g + '</b>!' + (good.length > 1 ? ' Und noch ' + (good.length - 1) + ' weitere richtig gute.' : ''));
      else if (g.length) lines.push('📝 Du hast eine Probe-Arbeit geschrieben. Jeder Fehler, den du jetzt findest, passiert dir in der echten Arbeit nicht mehr.');
    } else {
      lines.push('Neuer Tag, neuer Start. Fang einfach mit etwas Kleinem an – der Rest kommt von selbst.');
    }
    /* Serie */
    var streak = 0;
    for (var j = 1; j < 60; j++) { var dk = addDays(now, -j); if ((log[dayKey(dk)] || {}).plan) streak++; else if (dk.getDay() !== 3) break; }
    if (streak >= 2) lines.push('🔥 Schon <b>' + streak + ' Tage</b> hintereinander Tagesplan geschafft. Mach die Serie weiter!');
    /* Fortschritt NaWi / Vokabeln */
    if (window.LU5Nw && LU5Nw.pct && LU5Nw.pct() > 0) lines.push('🔬 NaWi klappt schon zu <b>' + LU5Nw.pct() + ' %</b>.');
    /* Heute */
    var today = [], tomorrow = [];
    TESTS.forEach(function (t) { var v = st[t[0]]; if (!v) return; if (v === k) today.push(t[1]); else if (v === dayKey(addDays(now, 1))) tomorrow.push(t[1]); });
    var todayTxt;
    if (today.length) todayTxt = '<b>Heute ist ' + list(today) + '.</b> Du hast dich vorbereitet. Ruhig durchatmen, jede Aufgabe genau lesen – du schaffst das! 🍀';
    else if (now.getDay() === 3) todayTxt = 'Mittwoch: lange Schule und Hausaufgaben. Heute gibt es <b>kein Zusatz-Lernen</b> – erhol dich gut!';
    else if (tomorrow.length) todayTxt = '<b>Morgen ist ' + list(tomorrow) + '.</b> Heute nur noch ruhig wiederholen, dann früh schlafen.';
    else todayTxt = 'Dein Tagesplan steht unten. Kurz und knackig – los geht’s!';
    var doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    var motto = MOTTO[doy % MOTTO.length];
    return '<div class="hello-top"><p class="hello-hi">' + hello + '</p><button type="button" class="hello-x" data-hello="close" aria-label="Schließen">✕</button></div>' +
      '<ul class="hello-list">' + lines.map(function (l) { return '<li>' + l + '</li>'; }).join('') + '</ul>' +
      '<p class="hello-today">' + todayTxt + '</p>' +
      '<p class="hello-motto">💬 „' + esc(motto) + '“</p>' +
      '<button type="button" class="btn primary hello-go" data-hello="close">Los geht’s!</button>';
  }

  var card = document.createElement('section');
  card.className = 'hello-card'; card.id = 'helloCard'; card.hidden = true; card.setAttribute('aria-live', 'polite');
  var head = home.querySelector('.home-head');
  if (head && head.nextSibling) home.insertBefore(card, head.nextSibling); else home.appendChild(card);
  card.addEventListener('click', function (e) { if (e.target.closest('[data-hello="close"]')) { card.hidden = true; } });

  function check() {
    var now = new Date(), k = dayKey(now);
    if (store('hello-day') === k) return;
    store('hello-day', k);
    card.innerHTML = build(now); card.hidden = false;
  }
  /* kurz warten, bis alle Daten (auch vom anderen Gerät) geladen sind */
  setTimeout(check, 400);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') setTimeout(check, 400); });
  window.LU5Hello = function () { store('hello-day', null); check(); };
})();

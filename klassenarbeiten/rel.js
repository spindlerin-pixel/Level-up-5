/* =====================================================================
   Level Up 5 · Religion: Glaubensbekenntnis (angekündigt 26.11.2026)
   Ziel: auswendig können und aufschreiben können – sitzt in 4–5 Tagen.
   Plan: 4 Etappen (eine pro Tag), danach Generalprobe (ganz aus dem Kopf, am besten auf Papier),
   danach kurz „fit halten“. Jede Etappe: erst lesen und hören, dann Lücken (leicht → schwer),
   Reihenfolge, Anfangsbuchstaben, ganz allein. Ab Etappe 2 vorher kurz das bisher Gelernte.
   „Nachschauen“ zählt nie als Fehler.
   Lernstand in localStorage „rel-lernstand“ (wird mit sync.js mitsynchronisiert).
   ===================================================================== */
(function () {
  function $(id) { return document.getElementById(id); }
  if (!$('relView')) return;
  var host = $('relMain');
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function store(k, v) { try { if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} return null; }
  function kidName(pre) { var n = store('lern-name'); n = n ? String(n).trim() : ''; return n ? (pre || '') + n : ''; }
  function toast(m) { var t = $('toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); } t.textContent = m; t.hidden = false; clearTimeout(toast.tm); toast.tm = setTimeout(function () { t.hidden = true; }, 3500); }

  /* ---------------- Text ---------------- */
  var START = '2026-11-27'; /* am 26.11. wird abgeschrieben – Religion startet am Freitag (vorher nur als Bonus) */
  var BASE = [
    'Ich glaube an Gott,',
    'den Vater, den Allmächtigen,',
    'den Schöpfer des Himmels und der Erde,',
    'und an Jesus Christus,',
    'seinen eingeborenen Sohn, unsern Herrn,',
    'empfangen durch den Heiligen Geist,',
    'geboren von der Jungfrau Maria,',
    'gelitten unter Pontius Pilatus,',
    'gekreuzigt, gestorben und begraben,',
    'hinabgestiegen in das Reich des Todes,',
    'am dritten Tage auferstanden von den Toten,',
    'aufgefahren in den Himmel;',
    'er sitzt zur Rechten Gottes, des allmächtigen Vaters;',
    'von dort wird er kommen,',
    'zu richten die Lebenden und die Toten.',
    'Ich glaube an den Heiligen Geist,',
    'die heilige katholische Kirche,',
    'Gemeinschaft der Heiligen,',
    'Vergebung der Sünden,',
    'Auferstehung der Toten',
    'und das ewige Leben.',
    'Amen.'
  ];
  function lines() { var L = BASE.slice(); if (st().v === 'ev') L[16] = 'die heilige christliche Kirche,'; return L; }
  var ETAPPEN = [
    { id: 'e1', nr: 1, name: 'Gott, der Vater, und Jesus Christus', from: 0, to: 6, tips: [
      'Das Glaubensbekenntnis hat <b>drei Teile</b>: 1. Gott, der Vater · 2. Jesus Christus · 3. der Heilige Geist. Heute lernst du den Anfang von Teil 1 und 2.',
      '<b>eingeboren</b> heißt hier: der <b>einzige</b> Sohn.',
      '<b>empfangen durch den Heiligen Geist</b>: Maria wurde durch den Heiligen Geist schwanger.',
      'Stolperstelle: <b>unsern</b> Herrn – ohne e in der Mitte! Und <b>Allmächtigen</b> mit ä und großem A.'
    ] },
    { id: 'e2', nr: 2, name: 'Leiden, Tod und Auferstehung', from: 7, to: 10, tips: [
      'Das ist die <b>Ostergeschichte</b> der Reihe nach: gelitten → gekreuzigt → gestorben → begraben → im Reich des Todes → am dritten Tag auferstanden (Ostern).',
      '<b>Pontius Pilatus</b> war der römische Statthalter, der Jesus verurteilt hat.',
      'Stolperstellen: <b>hinabgestiegen</b> (ein Wort) und am dritten <b>Tage</b> – mit e am Ende.'
    ] },
    { id: 'e3', nr: 3, name: 'Himmelfahrt und Wiederkommen', from: 11, to: 14, tips: [
      'Weiter geht die Geschichte: <b>Christi Himmelfahrt</b> (40 Tage nach Ostern).',
      '<b>zur Rechten Gottes</b> = auf dem Ehrenplatz neben Gott.',
      '<b>zu richten die Lebenden und die Toten</b>: Jesus wird am Ende über alle Menschen urteilen.',
      'Satzzeichen: Nach „Himmel“ und nach „Vaters“ steht ein <b>Strichpunkt</b> (;). Am Ende von Teil 2 ein Punkt.'
    ] },
    { id: 'e4', nr: 4, name: 'Der Heilige Geist', from: 15, to: 21, tips: [
      'Teil 3 fängt wieder an mit <b>„Ich glaube an …“</b>, genau wie Teil 1.',
      'Danach kommen <b>fünf Dinge</b> – zähl sie an den Fingern ab: Kirche · Gemeinschaft der Heiligen · Vergebung der Sünden · Auferstehung der Toten · ewiges Leben.',
      '<b>katholisch</b> heißt „allumfassend“: die Kirche auf der ganzen Welt.',
      '<b>Amen</b> heißt „So ist es“ / „So soll es sein“.'
    ] }
  ];

  /* ---------------- Lernstand ---------------- */
  var KEY = 'rel-lernstand';
  function st() { var s = store(KEY); if (!s || typeof s !== 'object') s = {}; s.L = s.L || {}; s.sc = s.sc || {}; return s; }
  function save(s) { store(KEY, s); }
  function learnedN(S) { S = S || st(); var n = 0; while (n < ETAPPEN.length && S.L[ETAPPEN[n].id]) n++; return n; }
  function lernedToday(S) { return (S || st()).lday === dayKey(); }
  function gpDone(S) { S = S || st(); return !!(S.gp && S.gp.p >= 90); }
  function gpToday(S) { S = S || st(); return !!(S.gp && S.gp.d === dayKey()); }
  function fitToday(S) { return (S || st()).fit === dayKey(); }
  /* „Klappt schon“: jede gelernte Etappe zählt nach ihrem letzten „Ganz allein“-Ergebnis, die Generalprobe zählt mit */
  function pct(S) {
    S = S || st(); var sum = 0;
    ETAPPEN.forEach(function (E) { var v = S.sc[E.id]; if (S.L[E.id]) sum += (v == null ? 60 : v) * (E.to - E.from + 1); });
    var p = Math.round(sum / BASE.length);
    if (S.gp) p = Math.round((p + S.gp.p) / 2);
    return Math.min(100, p);
  }

  /* ---------------- Stimme (deutsch, langsam) ---------------- */
  var hasTTS = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function', voice = null;
  function vs(v) { var n = (v.name + ' ' + (v.voiceURI || '')).toLowerCase(), s = 0; if (!/^de/i.test(v.lang)) return -1; if (/premium/.test(n)) s += 40; else if (/enhanced|erweitert|natural|neural|online/.test(n)) s += 30; if (/siri/.test(n)) s += 20; if (/google deutsch/.test(n)) s += 25; if (/de-de/i.test(v.lang)) s += 5; return s; }
  function pickVoice() { if (!hasTTS) return; var l = (speechSynthesis.getVoices() || []).filter(function (v) { return vs(v) >= 0; }).sort(function (a, b) { return vs(b) - vs(a); }); voice = l[0] || null; }
  if (hasTTS) { pickVoice(); try { speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) {} }
  function say(arr) {
    if (!hasTTS) { toast('Auf diesem Gerät gibt es keine Vorlese-Stimme.'); return; }
    if (!voice) pickVoice();
    try {
      speechSynthesis.cancel();
      arr.forEach(function (t) { var u = new SpeechSynthesisUtterance(t); if (voice) u.voice = voice; u.lang = (voice && voice.lang) || 'de-DE'; u.rate = 0.8; speechSynthesis.speak(u); });
    } catch (e) {}
  }

  /* ---------------- Wörter vergleichen ---------------- */
  function core(w) { return String(w || '').replace(/^[^A-Za-zÄÖÜäöüß]+|[^A-Za-zÄÖÜäöüß]+$/g, ''); }
  function toks(line) { return line.split(/\s+/).filter(Boolean); }
  function dist(a, b) {
    var n = a.length, m = b.length, d = [], i, j; if (Math.abs(n - m) > 2) return 3;
    for (i = 0; i <= n; i++) d[i] = [i]; for (j = 0; j <= m; j++) d[0][j] = j;
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) { d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); }
    return d[n][m];
  }
  /* 1 richtig, 0.5 fast (Groß/klein oder ein Buchstabe), 0 falsch */
  function wcmp(given, ans) {
    var g = core(given), a = core(ans);
    if (!g) return { r: 0 };
    if (g === a) return { r: 1 };
    if (g.toLowerCase() === a.toLowerCase()) return { r: 0.5, note: /^[A-ZÄÖÜ]/.test(a) ? 'groß' : 'klein' };
    var gl = g.toLowerCase().replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü').replace(/ss/g, 'ß');
    if (gl === a.toLowerCase()) return { r: 0.5, note: 'Umlaut/ß' };
    if (a.length >= 4 && dist(g.toLowerCase(), a.toLowerCase()) === 1) return { r: 0.5, note: 'Buchstabe' };
    return { r: 0 };
  }
  /* Eine getippte Zeile mit der richtigen Zeile vergleichen (beste Zuordnung der Wörter) → Bewertung pro Wort */
  function lineCmp(given, ans) {
    var A = toks(ans), G = toks(given).filter(function (w) { return core(w); }), n = A.length, m = G.length, D = [], i, j;
    for (i = 0; i <= n; i++) { D[i] = []; for (j = 0; j <= m; j++) D[i][j] = 0; }
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) D[i][j] = Math.max(D[i - 1][j], D[i][j - 1], D[i - 1][j - 1] + wcmp(G[j - 1], A[i - 1]).r);
    var res = A.map(function () { return 0; }); i = n; j = m;
    while (i > 0 && j > 0) {
      var r = wcmp(G[j - 1], A[i - 1]).r;
      if (r > 0 && D[i][j] === D[i - 1][j - 1] + r) { res[i - 1] = r; i--; j--; }
      else if (D[i][j] === D[i - 1][j]) i--; else j--;
    }
    var extra = Math.max(0, m - res.filter(function (x) { return x > 0; }).length);
    return { res: res, extra: extra, p: n ? res.reduce(function (s, x) { return s + x; }, 0) / n : 1 };
  }
  function hintOf(line) { return toks(line).map(function (w) { var c = core(w); return c ? c.charAt(0) + '…' : w; }).join(' '); }

  /* ---------------- Ansicht ---------------- */
  var R = null, mode = null;
  function header(t, sub) { return '<div class="nw-head"><button type="button" class="btn small" data-rel="home">← Religion-Start</button><span class="nw-ttl">' + t + (sub ? '<small>' + sub + '</small>' : '') + '</span></div>'; }
  var WDL = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  /* Fahrplan: eine Etappe pro Tag, dann Generalprobe. Mittwochs ist frei (Schule bis 15:30). */
  function schedule(S) {
    var ln = learnedN(S), steps = [], d = new Date(), out = [];
    for (var i = ln; i < ETAPPEN.length; i++) steps.push('Etappe ' + ETAPPEN[i].nr + ': ' + ETAPPEN[i].name);
    if (!gpDone(S)) steps.push('Generalprobe: alles aus dem Kopf aufschreiben');
    if (lernedToday(S) || gpToday(S)) d.setDate(d.getDate() + 1);
    while (dayKey(d) < START) d.setDate(d.getDate() + 1);
    steps.forEach(function (s) {
      while (d.getDay() === 3) d.setDate(d.getDate() + 1);
      out.push({ when: WDL[d.getDay()] + ' ' + d.getDate() + '.' + (d.getMonth() + 1) + '.', what: s, today: dayKey(d) === dayKey() });
      d.setDate(d.getDate() + 1);
    });
    return out;
  }
  function home() {
    var S = st(), ln = learnedN(S), p = pct(S), lt = lernedToday(S), E = ETAPPEN[ln], all = ln >= ETAPPEN.length, gp = gpDone(S);
    mode = null; R = null;
    var h = '<section class="card voc-card nw-card">';
    h += '<p class="voc-eyebrow">Lernpfad · ' + ln + ' von ' + ETAPPEN.length + ' Etappen' + (gp ? ' · Generalprobe ✓' : '') + '</p>';
    if (E && !lt && !ln && dayKey() < START) h += '<p class="nw-small">Heute wird abgeschrieben – los geht es morgen. Wer mag, darf schon anfangen.</p><button type="button" class="btn nw-big" data-rel="lesson" data-i="0">📖 Etappe 1 · ' + E.name + ' · ca. 10 Min (Bonus)</button>';
    else if (E && !lt) h += '<button type="button" class="btn primary nw-big" data-rel="lesson" data-i="' + ln + '">📖 Heute: Etappe ' + E.nr + ' · ' + E.name + ' · ca. 10 Min</button>';
    else if (E) h += '<p class="nw-small">✅ Heute hast du schon eine Etappe gelernt. Morgen geht es weiter mit „' + esc(E.name) + '“.</p><button type="button" class="btn nw-big" data-rel="lesson" data-i="' + ln + '">➕ Schon die nächste Etappe? (Bonus)</button>';
    else if (!gp) {
      if (lt) h += '<p class="nw-small">✅ Alle Etappen gelernt! Morgen kommt die Generalprobe.</p>';
      h += '<button type="button" class="btn ' + (lt ? '' : 'primary ') + 'nw-big" data-rel="gp">' + (lt ? '➕ Generalprobe schon heute? (Bonus)' : '🏁 Generalprobe: alles aus dem Kopf aufschreiben · ca. 10 Min') + '</button>';
    } else h += '<p class="nw-say">🌟 Das Glaubensbekenntnis sitzt' + esc(kidName(', ')) + '! Ab und zu kurz wiederholen, damit es bis zur Überprüfung frisch bleibt.</p><button type="button" class="btn ' + (fitToday(S) ? '' : 'primary ') + 'nw-big" data-rel="fit">' + (fitToday(S) ? '✅ Heute schon wiederholt · nochmal?' : '🔁 Fit halten: Lückentext über alles · ca. 5 Min') + '</button>';
    h += '<ol class="nw-path">' + ETAPPEN.map(function (X, i) {
      var done = i < ln, now = i === ln;
      var inner = '<span class="nw-pi">' + (done ? '✅' : now ? '▶️' : '🔒') + '</span><span class="nw-pt"><b>' + X.nr + '. ' + X.name + '</b><small>„' + esc(BASE[X.from].replace(/,$/, '')) + ' …“' + (done ? ' · zum Üben antippen' : '') + '</small></span>';
      return '<li class="' + (done ? 'done' : now ? 'now' : 'lock') + '">' + (done ? '<button type="button" class="nw-pathb" data-rel="lesson" data-i="' + i + '">' + inner + '</button>' : '<span class="nw-pathb">' + inner + '</span>') + '</li>';
    }).join('') + '<li class="' + (gp ? 'done' : all ? 'now' : 'lock') + '"><' + (all ? 'button type="button" data-rel="gp"' : 'span') + ' class="nw-pathb"><span class="nw-pi">' + (gp ? '✅' : all ? '▶️' : '🔒') + '</span><span class="nw-pt"><b>🏁 Generalprobe</b><small>Alles aus dem Kopf aufschreiben, am besten auf Papier' + (S.gp ? ' · zuletzt ' + S.gp.p + ' %' : '') + '</small></span></' + (all ? 'button' : 'span') + '></li></ol>';
    var sch = schedule(S);
    if (sch.length) h += '<p class="voc-eyebrow">Dein Fahrplan</p><ul class="rel-plan">' + sch.map(function (x) { return '<li' + (x.today ? ' class="now"' : '') + '><b>' + x.when + '</b><span>' + esc(x.what) + '</span></li>'; }).join('') + '</ul><p class="nw-small">Ziel: sitzt bis Dienstag, 1. Dezember. Mittwochs ist frei.</p>';
    h += '</section>';
    h += '<section class="card voc-card nw-card"><p class="voc-eyebrow">Was sitzt schon?</p><div class="nw-prog"><span class="nw-ring rel-ring" style="--p:' + p + '"><b>' + p + ' %</b></span><span><b>' + (p >= 95 ? 'Sitzt – stark!' : p >= 60 ? 'Mehr als die Hälfte sitzt schon!' : p > 0 ? 'Klappt schon: ' + p + ' %' : 'Hier siehst du bald, was schon sitzt.') + '</b><br><span class="nw-small">Zählt: dein letztes „Ganz allein“ pro Etappe und die Generalprobe. Nachschauen ist nie ein Fehler.</span></span></div>';
    if (ln > 0) h += '<div class="nw-grid"><button type="button" class="btn nw-txt" data-rel="free"><span>✍️ Alles Gelernte aufschreiben</span><small>Zeile für Zeile tippen</small></button><button type="button" class="btn nw-txt" data-rel="paper"><span>📝 Auf Papier schreiben</span><small>danach selbst kontrollieren</small></button></div>';
    h += '</section>';
    h += '<details class="levels"><summary><span class="lv-title">Ganzer Text</span><span class="lv-sum">zum Lesen und Anhören</span></summary><div class="lv-body"><div class="rel-text">' + textHtml(0, BASE.length - 1) + '</div><button type="button" class="btn small" data-rel="sayall">🔊 Vorlesen</button>';
    h += '<p class="nw-small">Fassung: ' + (S.v === 'ev' ? 'evangelisch („christliche Kirche“)' : 'katholisch („katholische Kirche“)') + '. <button type="button" class="linkbtn" data-rel="ver">Umstellen auf ' + (S.v === 'ev' ? 'katholisch' : 'evangelisch') + '</button> – nur wenn im Unterricht die andere Fassung gilt.</p></div></details>';
    host.innerHTML = h; homeTile();
  }
  function textHtml(a, b) {
    var L = lines(), out = '';
    for (var i = a; i <= b; i++) { if (i === 3 || i === 15) out += '<span class="rel-gap"></span>'; out += '<span class="rel-line">' + esc(L[i]) + '</span>'; }
    return out;
  }

  /* ---------- Etappe ---------- */
  function startLesson(i) {
    var ln = learnedN(), E = ETAPPEN[Math.min(i, ln)]; if (!E) { home(); return; }
    var review = E.nr > 1 && !(i < ln);
    var steps = [];
    if (review) steps.push({ k: 'hint', a: 0, b: E.from - 1, t: 'Aufwärmen: Das kannst du schon', w: 'Zuerst kurz das, was du schon gelernt hast. Die Anfangsbuchstaben helfen dir.' });
    steps.push({ k: 'read', a: E.from, b: E.to, t: 'Lesen und hören' });
    steps.push({ k: 'gap', a: E.from, b: E.to, lv: 0.35, t: 'Lückentext leicht' });
    steps.push({ k: 'gap', a: E.from, b: E.to, lv: 0.7, t: 'Lückentext schwer' });
    if (E.to - E.from >= 3) steps.push({ k: 'ord', a: E.from, b: E.to, t: 'Reihenfolge' });
    steps.push({ k: 'hint', a: E.from, b: E.to, t: 'Mit Anfangsbuchstaben' });
    steps.push({ k: 'free', a: E.from, b: E.to, t: 'Ganz allein' });
    R = { E: E, steps: steps, si: 0, learn: i >= ln }; mode = 'lesson'; drawStep();
  }
  function stepHead() {
    var s = R.steps[R.si], n = R.steps.length;
    var ttl = R.E ? 'Etappe ' + R.E.nr + ': ' + R.E.name : R.title;
    return header(ttl, 'Schritt ' + (R.si + 1) + ' von ' + n + ' · ' + s.t) + '<section class="card voc-card nw-card rel-card"><span class="nw-bar nw-top rel-bar"><i style="width:' + (R.si / n * 100) + '%"></i></span>';
  }
  function drawStep() {
    var s = R.steps[R.si], L = lines(), h = stepHead();
    R.cur = s; R.peeked = false; R.checked = false;
    if (s.k === 'read') {
      h += '<p class="nw-q">Lies die Zeilen <b>dreimal laut</b> – gern im Rhythmus oder beim Herumlaufen.</p><div class="rel-text">' + textHtml(s.a, s.b) + '</div>';
      h += '<div class="rel-acts"><button type="button" class="btn small" data-rel="say">🔊 Vorlesen</button></div>';
      if (R.E && R.E.tips) h += '<div class="rel-tips">' + R.E.tips.map(function (t) { return '<p class="nw-tip">💡 ' + t + '</p>'; }).join('') + '</div>';
      h += '<button type="button" class="btn primary" data-rel="next">Gelesen – weiter →</button>';
    } else if (s.k === 'gap') {
      R.gaps = [];
      h += '<p class="nw-q">Fülle die Lücken.</p><div class="nw-para rel-para">';
      for (var i = s.a; i <= s.b; i++) {
        if (i === 15 && s.a < 15) h += '<span class="rel-gap"></span>';
        var T = toks(L[i]), cand = T.map(function (w, j) { return j; }).filter(function (j) { return core(T[j]).length >= 2; });
        var k = Math.max(1, Math.round(cand.length * s.lv)), pickJ = shuffle(cand).slice(0, k);
        h += '<span class="rel-line">' + T.map(function (w, j) {
          if (pickJ.indexOf(j) < 0) return esc(w);
          var c = core(w), pre = w.slice(0, w.indexOf(c)), post = w.slice(w.indexOf(c) + c.length), gi = R.gaps.length;
          R.gaps.push(c);
          return esc(pre) + '<input class="nw-gin rel-gin" data-g="' + gi + '" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" size="' + Math.max(4, c.length) + '" aria-label="Lücke ' + (gi + 1) + '">' + esc(post);
        }).join(' ') + '</span>';
      }
      h += '</div>' + peekBtn() + '<button type="button" class="btn primary" data-rel="check">Prüfen</button>';
    } else if (s.k === 'ord') {
      var idx = []; for (var q = s.a; q <= s.b; q++) idx.push(q);
      R.ord = { left: shuffle(idx), done: [], err: 0 };
      while (R.ord.left.join() === idx.join()) R.ord.left = shuffle(idx);
      h += '<p class="nw-q">Tippe die Zeilen in der <b>richtigen Reihenfolge</b> an.</p><ol class="nw-ord-done" id="relOrdDone"></ol><div class="nw-ord" id="relOrd"></div>';
    } else if (s.k === 'hint' || s.k === 'free') {
      if (s.w) h += '<p class="nw-small">' + s.w + '</p>';
      h += '<p class="nw-q">' + (s.k === 'hint' ? 'Schreib jede Zeile. Die <b>Anfangsbuchstaben</b> helfen dir.' : 'Schreib jede Zeile <b>ganz allein</b>. Achte auf Groß und klein.') + '</p><div class="rel-lines">';
      for (var z = s.a; z <= s.b; z++) {
        if ((z === 3 || z === 15) && z > s.a) h += '<span class="rel-gap"></span>';
        h += '<div class="rel-lrow"><span class="rel-ln">' + (z + 1) + '</span><input class="nw-in rel-in" data-l="' + z + '" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="next"' + (s.k === 'hint' ? ' placeholder="' + esc(hintOf(L[z])) + '"' : '') + ' aria-label="Zeile ' + (z + 1) + '"><div class="rel-res" id="relRes' + z + '" hidden></div></div>';
      }
      h += '</div>' + peekBtn() + '<button type="button" class="btn primary" data-rel="check">Prüfen</button>';
    } else if (s.k === 'paper') {
      h += '<p class="nw-q">Nimm ein Blatt und schreib <b>' + (s.a === 0 && s.b === BASE.length - 1 ? 'das ganze Glaubensbekenntnis' : 'alles bis „' + esc(core(toks(L[s.b]).slice(-1)[0])) + '“') + '</b> aus dem Kopf auf – so wie in der Schule.</p><p class="nw-small">Erst wenn du fertig bist, auf „Kontrollieren“ tippen. Dann vergleichst du Zeile für Zeile.</p><button type="button" class="btn primary" data-rel="pcheck">Fertig geschrieben – kontrollieren</button>';
    }
    h += '<div id="relPeek" class="nw-peek" hidden></div><div id="relFb" class="nw-fb" hidden></div></section>';
    host.innerHTML = h; window.scrollTo(0, 0);
    if (s.k === 'ord') drawOrd();
    var ins = host.querySelectorAll('.rel-in, .rel-gin');
    ins.forEach(function (inp, j) { inp.addEventListener('keydown', function (e) { if (e.key !== 'Enter') return; e.preventDefault(); if (ins[j + 1] && !R.checked) ins[j + 1].focus(); else if (!R.checked) check(); else next(); }); });
    if (ins[0] && s.k !== 'gap') ins[0].focus({ preventScroll: true });
  }
  function peekBtn() { return '<button type="button" class="btn small nw-peekb" data-rel="peek">📖 Nachschauen</button>'; }
  function peek() {
    var box = $('relPeek'), s = R.cur; if (!box) return;
    if (!box.hidden) { box.hidden = true; return; }
    if (!R.checked) R.peeked = true;
    box.innerHTML = '<p class="nw-small"><b>📖 Nachschauen</b> – zählt nicht als Fehler.</p><div class="rel-text">' + textHtml(s.a, s.b) + '</div>';
    box.hidden = false;
  }
  function drawOrd() {
    var L = lines(), o = R.ord;
    $('relOrdDone').innerHTML = o.done.map(function (i) { return '<li>' + esc(L[i]) + '</li>'; }).join('');
    $('relOrd').innerHTML = o.left.map(function (i) { return '<button type="button" class="nw-step" data-rels="' + i + '">' + esc(L[i]) + '</button>'; }).join('');
    if (!o.left.length) {
      var fb = $('relFb'); fb.className = 'nw-fb ' + (o.err ? 'half' : 'ok');
      fb.innerHTML = '<b>' + (o.err ? 'Geschafft! ' + o.err + ' Mal vertippt – lies die Zeilen noch einmal der Reihe nach.' : pick(['Perfekt! ✓', 'Genau so! ✓', 'Stark! ✓'])) + '</b><br><button type="button" class="btn primary" data-rel="next">Weiter →</button>';
      fb.hidden = false; R.checked = true;
    }
  }
  function check() {
    if (R.checked) return;
    var s = R.cur, L = lines(), got = 0, n = 0, notes = {};
    if (s.k === 'gap') {
      var ins = host.querySelectorAll('.rel-gin');
      ins.forEach(function (inp) {
        var g = +inp.getAttribute('data-g'), ans = R.gaps[g], r = wcmp(inp.value, ans);
        inp.readOnly = true; inp.classList.remove('ok', 'half', 'bad'); inp.classList.add(r.r >= 1 ? 'ok' : r.r > 0 ? 'half' : 'bad');
        if (r.r < 1) { var sp = document.createElement('span'); sp.className = 'nw-sol'; sp.textContent = '→ ' + ans; inp.after(sp); }
        if (r.note) notes[r.note] = 1;
        got += r.r; n++;
      });
    } else {
      host.querySelectorAll('.rel-in').forEach(function (inp) {
        var z = +inp.getAttribute('data-l'), c = lineCmp(inp.value, L[z]), box = $('relRes' + z);
        inp.readOnly = true; inp.classList.add(c.p >= 1 && !c.extra ? 'ok' : c.p >= 0.6 ? 'half' : 'bad');
        if (!(c.p >= 1 && !c.extra)) {
          box.innerHTML = toks(L[z]).map(function (w, j) { return '<span class="rel-w ' + (c.res[j] >= 1 ? 'ok' : c.res[j] > 0 ? 'half' : 'bad') + '">' + esc(w) + '</span>'; }).join(' ');
          box.hidden = false;
        }
        got += c.p * toks(L[z]).length; n += toks(L[z]).length;
      });
    }
    var p = n ? Math.round(got / n * 100) : 100;
    R.checked = true; s.p = p;
    var cb = host.querySelector('[data-rel="check"]'); if (cb) cb.hidden = true;
    var fb = $('relFb');
    fb.className = 'nw-fb ' + (p >= 100 ? 'ok' : p >= 70 ? 'half' : 'bad');
    var last = R.si === R.steps.length - 1;
    var msg = p >= 100 ? pick(['🌟 Alles richtig!', '🌟 Perfekt!', '🌟 Fehlerfrei – stark!']) : p >= 90 ? '✅ Fast alles richtig: ' + p + ' %' : p >= 70 ? '👍 ' + p + ' % – schon richtig gut!' : '💪 ' + p + ' % – das wird! Lies die grünen Lösungen einmal laut.';
    var nt = Object.keys(notes);
    fb.innerHTML = '<b>' + msg + '</b>' + (R.peeked && p >= 90 ? '<br><span class="nw-small">Mit Nachschauen geschafft 👍 Morgen klappt es ohne.</span>' : '') + (nt.length ? '<br><span class="nw-small">Gelb = fast: ' + (notes['groß'] ? 'Nomen und Namen groß schreiben. ' : '') + (notes.klein ? 'Manches klein schreiben. ' : '') + (notes.Buchstabe || notes['Umlaut/ß'] ? 'Ein Buchstabe fehlt oder ist zu viel.' : '') + '</span>' : '') + (s.k !== 'gap' && p < 100 ? '<br><span class="nw-small">Unter jeder Zeile siehst du den richtigen Text: grün richtig, gelb fast, rot fehlt.</span>' : '') + '<br>' + (p < 70 && s.k !== 'gap' ? '<button type="button" class="btn" data-rel="again">Nochmal</button>' : '') + '<button type="button" class="btn primary" data-rel="next">' + (last ? 'Fertig ✓' : 'Weiter →') + '</button>';
    fb.hidden = false;
    var nb = fb.querySelector('[data-rel="next"]'); if (nb) nb.focus({ preventScroll: true });
  }
  function next() {
    if (R.si < R.steps.length - 1) { R.si++; drawStep(); return; }
    finish();
  }
  function finish() {
    var S = st(), last = R.steps[R.steps.length - 1], p = last.p == null ? 100 : last.p, k = dayKey(), h;
    if (R.E) {
      var E = R.E, wasNew = !S.L[E.id];
      if (wasNew) { S.L[E.id] = k; S.lday = k; }
      S.sc[E.id] = R.peeked && p >= 90 ? Math.min(p, 90) : p;
      save(S);
      var nx = ETAPPEN[E.nr];
      h = header('Etappe ' + E.nr + ': ' + E.name, wasNew ? 'gelernt' : 'geübt') + '<section class="card voc-card nw-card nw-end">';
      h += '<p class="nw-big-txt">' + (wasNew ? '🎉 Etappe ' + E.nr + ' gelernt' + esc(kidName(', ')) + '!' : '✅ Etappe ' + E.nr + ' geübt!') + '</p>';
      h += '<p>Ganz allein: <b>' + p + ' %</b>. ' + (wasNew ? (nx ? 'Morgen kommt „' + esc(nx.name) + '“ dazu – vorher wiederholst du kurz alles, was du schon kannst.' : 'Alle Etappen geschafft! Morgen ist die Generalprobe: alles aus dem Kopf aufschreiben.') : '') + '</p>';
      h += '<p class="nw-small">Tipp: Sag die Zeilen heute Abend vor dem Einschlafen noch einmal auf – im Schlaf festigt sich das Gelernte.</p>';
      h += '<button type="button" class="btn primary" data-rel="home">Fertig</button></section>';
      if (wasNew) toast('⛪ Etappe ' + E.nr + ' geschafft! Super' + kidName(', ') + '!');
    } else {
      if (R.kind === 'gp') { S.gp = { d: k, p: p }; if (p >= 90) S.fit = k; }
      if (R.kind === 'fit') S.fit = k;
      save(S);
      h = header(R.title, 'geschafft') + '<section class="card voc-card nw-card nw-end"><p class="nw-big-txt">' + (p >= 95 ? '🌟 ' + p + ' % – das sitzt' + esc(kidName(', ')) + '!' : p >= 80 ? '✅ ' + p + ' % – fast perfekt!' : '💪 ' + p + ' % – morgen nochmal, dann sitzt es.') + '</p>';
      if (R.kind === 'gp' && p < 90) h += '<p>Die Generalprobe kommt morgen noch einmal. Übe heute die gelben und roten Stellen: einmal laut lesen, einmal abschreiben.</p>';
      h += '<button type="button" class="btn primary" data-rel="home">Fertig</button></section>';
      if (R.kind === 'gp' && p >= 90) toast('🏁 Generalprobe bestanden! Das Glaubensbekenntnis sitzt!');
    }
    host.innerHTML = h; mode = 'end'; window.scrollTo(0, 0);
    if (window.LU5Plan) window.LU5Plan();
  }

  /* ---------- Papier: selbst kontrollieren ---------- */
  function paperCheck() {
    var s = R.cur, L = lines(), h = stepHead();
    h += '<p class="nw-q">Vergleiche Zeile für Zeile. Tippe auf jede Zeile, in der du einen <b>Fehler</b> hast (auch Groß/klein oder ein fehlendes Wort).</p><div class="rel-chk">';
    for (var i = s.a; i <= s.b; i++) h += '<button type="button" class="rel-cl" data-relc="' + i + '" aria-pressed="false"><span class="rel-ci">✓</span>' + esc(L[i]) + '</button>';
    h += '</div><button type="button" class="btn primary" data-rel="pdone">Fertig kontrolliert</button><div id="relFb" class="nw-fb" hidden></div></section>';
    host.innerHTML = h; R.bad = {}; window.scrollTo(0, 0);
  }
  function paperDone() {
    var s = R.cur, n = s.b - s.a + 1, bad = Object.keys(R.bad).length, p = Math.round((n - bad) / n * 100);
    s.p = p; R.checked = true;
    var fb = $('relFb'); fb.className = 'nw-fb ' + (p >= 100 ? 'ok' : p >= 70 ? 'half' : 'bad');
    fb.innerHTML = '<b>' + (bad ? (n - bad) + ' von ' + n + ' Zeilen fehlerfrei (' + p + ' %).' : '🌟 Alle ' + n + ' Zeilen fehlerfrei!') + '</b>' + (bad ? '<br><span class="nw-small">Schreib die markierten Zeilen einmal richtig darunter.</span>' : '') + '<br><button type="button" class="btn primary" data-rel="next">Weiter →</button>';
    fb.hidden = false; host.querySelector('[data-rel="pdone"]').hidden = true;
    host.querySelectorAll('[data-relc]').forEach(function (b) { b.disabled = true; });
  }

  function startSingle(kind, steps, title) { R = { E: null, steps: steps, si: 0, kind: kind, title: title }; mode = 'single'; drawStep(); }
  function upTo() { var ln = learnedN(); return ln ? ETAPPEN[ln - 1].to : -1; }
  function startGp(paperFirst) {
    var all = BASE.length - 1;
    startSingle('gp', [paperFirst === false ? { k: 'free', a: 0, b: all, t: 'Ganz allein (tippen)' } : { k: 'paper', a: 0, b: all, t: 'Auf Papier' }], 'Generalprobe');
  }
  function startFit() {
    var b = upTo(); if (b < 0) { home(); return; }
    startSingle('fit', [{ k: 'gap', a: 0, b: b, lv: 0.6, t: 'Lückentext über alles' }], 'Fit halten');
  }

  /* ---------- Klicks ---------- */
  $('relView').addEventListener('click', function (e) {
    var sc = e.target.closest('[data-rels]');
    if (sc && R && R.ord && R.ord.left.length) {
      var i = +sc.getAttribute('data-rels'), need = R.cur.a + R.ord.done.length;
      if (i === need) { R.ord.done.push(i); R.ord.left = R.ord.left.filter(function (x) { return x !== i; }); drawOrd(); }
      else { R.ord.err++; sc.classList.remove('shake'); void sc.offsetWidth; sc.classList.add('shake'); }
      return;
    }
    var cl = e.target.closest('[data-relc]');
    if (cl && !cl.disabled) { var z = cl.getAttribute('data-relc'), on = !R.bad[z]; if (on) R.bad[z] = 1; else delete R.bad[z]; cl.setAttribute('aria-pressed', String(on)); cl.querySelector('.rel-ci').textContent = on ? '✗' : '✓'; return; }
    var b = e.target.closest('[data-rel]'); if (!b) return;
    var a = b.getAttribute('data-rel');
    if (a === 'home') home();
    else if (a === 'lesson') startLesson(+b.getAttribute('data-i'));
    else if (a === 'next') next();
    else if (a === 'check') check();
    else if (a === 'again') drawStep();
    else if (a === 'peek') peek();
    else if (a === 'say') say(lines().slice(R.cur.a, R.cur.b + 1));
    else if (a === 'sayall') say(lines());
    else if (a === 'pcheck') paperCheck();
    else if (a === 'pdone') paperDone();
    else if (a === 'gp') startGp();
    else if (a === 'fit') startFit();
    else if (a === 'free') { var u = upTo(); if (u >= 0) startSingle('free', [{ k: 'free', a: 0, b: u, t: 'Ganz allein' }], 'Alles Gelernte aufschreiben'); }
    else if (a === 'paper') { var u2 = upTo(); if (u2 >= 0) startSingle('free', [{ k: 'paper', a: 0, b: u2, t: 'Auf Papier' }], 'Auf Papier schreiben'); }
    else if (a === 'ver') { var S = st(); S.v = S.v === 'ev' ? 'kath' : 'ev'; save(S); home(); }
  });

  function homeTile() {
    var el = $('relTileState'); if (!el) return;
    var S = st(), ln = learnedN(S), today = lernedToday(S) || gpToday(S) || fitToday(S);
    el.textContent = (gpDone(S) ? 'Sitzt ✓ · ' : 'Etappe ' + ln + '/' + ETAPPEN.length + ' · ') + 'Klappt schon: ' + pct(S) + ' %' + (today ? ' · heute ✓' : '');
  }
  window.LU5Rel = {
    open: function () { if (mode !== 'lesson' && mode !== 'single') home(); },
    /* Tagesplan: eine Etappe pro Tag, dann Generalprobe, dann kurz fit halten */
    plan: function () {
      var S = st(), ln = learnedN(S), E = ETAPPEN[ln];
      if (!ln && dayKey() < START) return null;
      if (E) {
        if (lernedToday(S)) return { title: 'Religion: Etappe ' + ln + ' gelernt ✓', sub: 'Glaubensbekenntnis · ' + ln + ' von ' + ETAPPEN.length + ' Etappen · morgen: „' + E.name + '“', min: 10, done: true, btn: 'Ansehen', phase: 'learn' };
        return { title: 'Religion: Glaubensbekenntnis – Etappe ' + E.nr, sub: E.name + ' · lesen, hören, Lücken, aufschreiben · ca. 10 Min', min: 10, done: false, btn: 'Los', phase: 'learn' };
      }
      if (!gpDone(S)) {
        if (lernedToday(S)) return { title: 'Religion: Etappe 4 gelernt ✓', sub: 'Morgen: Generalprobe – alles aus dem Kopf aufschreiben', min: 10, done: true, btn: 'Ansehen', phase: 'learn' };
        return { title: 'Religion: Generalprobe Glaubensbekenntnis', sub: 'Ganz aus dem Kopf aufschreiben, am besten auf Papier · ca. 10 Min' + (S.gp ? ' · zuletzt ' + S.gp.p + ' %' : ''), min: 10, done: gpToday(S), btn: gpToday(S) ? 'Nochmal' : 'Los', phase: 'gp' };
      }
      return { title: 'Religion: Glaubensbekenntnis fit halten', sub: 'Lückentext über alles · ca. 5 Min', min: 5, done: fitToday(S) || gpToday(S), btn: fitToday(S) || gpToday(S) ? 'Nochmal' : 'Los', phase: 'fit' };
    },
    go: function () { var S = st(), ln = learnedN(S); if (ln < ETAPPEN.length && !lernedToday(S)) startLesson(ln); else if (ln >= ETAPPEN.length && !gpDone(S) && !lernedToday(S)) startGp(); else if (gpDone(S) && !fitToday(S) && !gpToday(S)) startFit(); else home(); },
    pct: function () { return pct(); },
    home: homeTile,
    _lineCmp: lineCmp, _wcmp: wcmp
  };
  homeTile();
  if (window.LU5Plan) window.LU5Plan();
})();

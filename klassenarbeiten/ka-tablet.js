/* =====================================================================
   Level Up 5 · Klassenarbeits-Modus am Tablet
   Wie eine echte Arbeit: keine Tipps, keine Rückmeldung während des Schreibens,
   Uhr läuft (45 Min), erst nach „Abgeben“ kommen Korrektur, Punkte, Prozent und Note.
   Inhalte: klassenarbeiten/ka-daten.js · Gespeichert nur auf diesem Gerät.
   ===================================================================== */
(function () {
  var DATA = window.LU5KA_DATA || [];
  var KEY = 'ka-tablet';
  var GRADE_WORD = { 1: 'sehr gut', 2: 'gut', 3: 'befriedigend', 4: 'ausreichend', 5: 'mangelhaft', 6: 'ungenügend' };
  var hasTTS = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function';

  /* ---------------- Speicher ---------------- */
  function load() { try { var d = JSON.parse(localStorage.getItem(KEY) || 'null'); return d && typeof d === 'object' ? d : {}; } catch (e) { return {}; } }
  var db = load();
  db.run = db.run || {}; db.res = db.res || {};
  var saveT = null;
  function saveNow() { clearTimeout(saveT); try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }
  function save() { clearTimeout(saveT); saveT = setTimeout(saveNow, 300); }
  window.addEventListener('pagehide', saveNow);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState !== 'visible') saveNow(); });

  /* ---------------- Helfer ---------------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function byId(id) { return DATA.filter(function (x) { return x.id === id; })[0]; }
  function fmtP(p) { var w = Math.floor(p + 1e-9), h = p - w > 0.25; return (w || !h ? String(w) : '') + (h ? '½' : ''); }
  function half(x) { return Math.round(x * 2) / 2; }
  function mmss(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function norm(s) { return String(s == null ? '' : s).replace(/[’‘`´]/g, '\'').replace(/[“”„]/g, '"').replace(/ /g, ' ').replace(/\s+/g, ' ').trim(); }
  function alts(a) { return String(a).split('|').map(norm); }
  /* Tippfehler-Abstand (Vertauschung zählt als 1) */
  function dist(a, b) {
    var n = a.length, m = b.length, d = [], i, j;
    if (Math.abs(n - m) > 2) return 3;
    for (i = 0; i <= n; i++) { d[i] = [i]; }
    for (j = 0; j <= m; j++) d[0][j] = j;
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) {
      var c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
    return d[n][m];
  }
  /* Grammatik-Wörter: wer ein anderes dieser Wörter schreibt, hat keinen Tippfehler, sondern das falsche Wort */
  var GRAM = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'am', 'is', 'are', 'isn\'t', 'aren\'t', 'who', 'what', 'where', 'how', 'why', 'when', 'a', 'an', 'the', 'there', 'were', 'was'];

  /* Ein Wort / eine Lücke vergleichen: 1 = richtig, 0.5 = ein Buchstabe falsch, 0 = falsch */
  function cmpWord(given, answer, box) {
    var g = norm(given).replace(/[.!?,;]+$/, '').trim(), list = alts(answer), best = { s: 0, note: '' };
    if (!g) return { s: 0, note: '', empty: true };
    var gl = g.toLowerCase();
    for (var i = 0; i < list.length; i++) {
      var a = list[i], al = a.toLowerCase();
      if (g === a) return { s: 1, note: '' };
      if (gl === al) {
        if (/^[A-Z]/.test(a) && /^[a-z]/.test(g)) {
          /* Satzanfang (His, Are, How …) zählt, Namen und Tage (Saturday, London) müssen groß sein */
          if (GRAM.indexOf(al.split(' ')[0]) >= 0) return { s: 1, note: 'Am Satzanfang groß schreiben.' };
          return { s: 0.5, note: 'Namen, Länder und Tage schreibt man groß.' };
        }
        return { s: 1, note: /^[A-Z]/.test(g) && /^[a-z]/.test(a) ? 'Hier klein schreiben.' : '' };
      }
    }
    var other = GRAM.indexOf(gl) >= 0 || (box && box.toLowerCase().split(/\s+/).indexOf(gl) >= 0);
    if (!other) {
      for (i = 0; i < list.length; i++) {
        var al2 = list[i].toLowerCase();
        if (al2.length >= 4 && dist(gl, al2) === 1) best = { s: 0.5, note: 'Fast! Ein Buchstabe stimmt nicht.' };
      }
    }
    return best;
  }

  /* Sätze vergleichen: Kurzformen werden zur Langform, damit „I’m“ und „I am“ beide zählen */
  function canon(s) {
    s = norm(s).replace(/\s+([.,!?;:])/g, '$1');
    s = s.replace(/\b(I)'m\b/gi, '$1 am')
      .replace(/\b(you|we|they)'re\b/gi, '$1 are')
      .replace(/\b(he|she|it|what|that|who|where|there|how)'s\b/gi, '$1 is')
      .replace(/\b(is|are|was|were|do|does|has|have)n't\b/gi, '$1 not')
      .replace(/\bcan't\b/gi, 'cannot')
      .replace(/\b(I|you|we|they)'ve\b/gi, '$1 have');
    return s;
  }
  function toks(s, keepCase) { var c = canon(s).replace(/[.,!?;:"]/g, ' '); if (!keepCase) c = c.toLowerCase(); return c.split(/\s+/).filter(Boolean); }
  /* Wortweiser Abstand: ein vertippter Wort kostet ½, ein falsches, fehlendes oder zusätzliches Wort 1 */
  function tokDist(a, b) {
    var n = a.length, m = b.length, d = [], i, j;
    for (i = 0; i <= n; i++) d[i] = [i];
    for (j = 0; j <= m; j++) d[0][j] = j;
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) {
      var x = a[i - 1], y = b[j - 1], c = x === y ? 0 : (x.toLowerCase() === y.toLowerCase() ? 0.5 : (Math.max(x.length, y.length) >= 4 && dist(x.toLowerCase(), y.toLowerCase()) === 1 ? 0.5 : 1));
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
    }
    return d[n][m];
  }
  function cmpSent(given, answers, part, orig) {
    var pts = part.pts || 1, g = norm(given);
    if (!g) return { s: 0, empty: true, note: '' };
    if (orig && canon(g).replace(/[.!?]+$/, '') === canon(orig).replace(/[.!?]+$/, '')) return { s: 0, note: 'Der Fehler steckt noch drin.' };
    var gt = toks(g, true), best = { s: -1, note: '' };
    answers.forEach(function (a) {
      var at = toks(a, true), d = tokDist(gt, at), dl = tokDist(toks(g), toks(a));
      var r;
      if (part.mode === 'q') {
        var order = dl === 0 ? 1 : (dl <= 0.5 ? 0.5 : 0);
        var form = /^[A-Z]/.test(g) && /\?$/.test(g) ? 1 : 0;
        r = { s: order + form, note: (order < 1 ? 'Wortstellung oder ein Wort stimmt nicht. ' : '') + (form ? '' : 'Großer Anfang und Fragezeichen am Ende nicht vergessen.') };
      } else if (part.strict) {
        r = d === 0 ? { s: pts, note: '' } : (dl === 0 ? { s: pts / 2, note: 'Richtig verbessert – aber achte auf Groß- und Kleinschreibung.' } : { s: 0, note: '' });
      } else if (pts >= 2) {
        r = { s: Math.max(0, pts - d), note: d === 0 ? '' : (dl === 0 ? 'Achte auf Groß- und Kleinschreibung.' : 'Nicht ganz – vergleiche mit der Lösung.') };
      } else {
        r = d === 0 ? { s: 1, note: '' } : (d <= 0.5 ? { s: 0.5, note: dl === 0 ? 'Achte auf Groß- und Kleinschreibung.' : 'Fast! Ein Wort ist vertippt.' } : { s: 0, note: '' });
      }
      if (r.s > best.s) best = r;
    });
    best.s = half(Math.max(0, Math.min(pts, best.s)));
    return best;
  }
  function cmpOpen(given, kw, full) {
    var g = norm(given);
    if (!g) return { s: 0, empty: true, note: '' };
    var low = canon(g).toLowerCase();
    var ok = kw.every(function (r) { return r.test(low); });
    if (!ok) return { s: 0, note: '' };
    if (full && toks(g).length < 3) return { s: 0.5, note: 'Inhalt richtig, aber bitte im ganzen Satz antworten.' };
    return { s: 1, note: '' };
  }
  function cmpSplit(given, answers) {
    var g = toks(given), best = { s: 0, note: '' };
    if (!g.length) return { s: 0, empty: true, note: '' };
    answers.forEach(function (a) {
      var at = toks(a), s = 0, n1 = g[0] === at[0], rest = g.slice(1).join(' '), arest = at.slice(1).join(' ');
      if (n1) s += 0.5;
      var r2 = rest === arest ? 0.5 : 0;
      s += r2;
      if (s > best.s) best = { s: s, note: s === 1 ? '' : (n1 ? 'Das zweite Wort stimmt nicht.' : 'Das erste Wort stimmt nicht.') };
    });
    return best;
  }

  /* ---------------- Familientext bewerten (14 P: Inhalt 5, Sprache 6, Form 3) ---------------- */
  var FAM = /\b(mum|mother|mom|dad|father|parents?|brothers?|sisters?|grandparents?|grandma|grandmother|granny|grandpa|grandfather|grandad|aunts?|uncles?|cousins?|only child|family|twins?)\b/gi;
  var NUMW = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)\b/i;
  var HOBBY = /\b(hobby|hobbies|likes?|loves?|favourite|favorite|football|handball|basketball|volleyball|tennis|gymnastics|athletics|riding|reading|swimming|singing|dancing|running|trumpet|piano|guitar|music|computer games)\b/i;
  function sentencesOf(s) { return (s.replace(/\n+/g, ' ').match(/[^.!?]+[.!?]*/g) || []).map(function (x) { return x.trim(); }).filter(function (x) { return /[A-Za-zÄÖÜäöü]{2}/.test(x); }); }
  var ERR = [
    [/\b(he|she)\s+(name|names|hobby|hobbies|favourite|mum|dad|brother|sister|dog|cat|rabbit|family|house)\b/gi, 'he/she vor einem Nomen → his/her'],
    [/\b(his|her|their|our)\s+(is|are|likes|like|has|have|lives|loves|can)\b/gi, 'Vor einem Verb steht he/she/they, nicht his/her/their'],
    [/\bI\s+(is|are)\b/g, 'I am'],
    [/\b(he|she|it)\s+(am|are)\b/gi, 'he/she/it is'],
    [/\b(they|we|you)\s+(is|am)\b/gi, 'they/we/you are'],
    [/\b(parents|grandparents|brothers|sisters|cousins|names|hobbies|cats|dogs)\s+is\b/gi, 'Mehrzahl → are'],
    [/\b(my|his|her|their|our)\s+(name|mum|dad|brother|sister|hobby|dog|cat|rabbit|budgie|favourite colour|favourite animal)\s+are\b/gi, 'eins → is'],
    [/\bI\s+have\s+\w+\s+years\b/gi, 'I am … years old (nicht „I have … years“)'],
    [/\ban\s+(dog|cat|rabbit|brother|sister|ruler|pen|pencil|budgie|guinea|big|small|nice|cute|little|parrot|snake|house|garden)\b/gi, 'a vor Mitlaut'],
    [/\ba\s+(only|apple|orange|elephant|exercise|eraser|uncle|aunt|old|English)\b/gi, 'an vor a, e, i, o, u'],
    [/\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(brother|sister|cousin|cat|dog|rabbit|budgie|pencil|ruler|pen|aunt|uncle|guinea pig|book|exercise book|friend|parrot|snake|spider|hamster)\b/gi, 'Mehrzahl-s vergessen'],
    [/\b(fishes|persons|childs|familys|hobbys|citys|countrys|peoples|mans|womans)\b/gi, 'Mehrzahl falsch'],
    [/\b(famly|familie|brudder|sista|sistr|freind|frend|favourit|favorit|grandparens|parends|perents|cusin|cousine|onkel|tante|nise|grate|frome|whit|wiht|allways|beautyful|fourty|fiveteen|eightteen|ninty|twelf|elefen|thirdteen)\b/gi, 'Rechtschreibung']
  ];
  function writeScore(text, kind) {
    var t = norm(text.replace(/\n/g, ' \n ')).replace(/ \n /g, '\n'), raw = text || '';
    var st = sentencesOf(raw), n = st.length, low = raw.toLowerCase();
    var fam = (raw.match(FAM) || []).length;
    var content = [];
    function c(label, ok, max) { content.push([label, ok ? max : 0, max]); }
    if (kind === 'email') {
      c('Anrede „Hi Joe,“ und Schluss „Bye, …“', /^\s*(hi|hello|dear)\s+joe/i.test(raw) && /\b(bye|love|best wishes|see you)\b[^]*$/i.test(raw.split('\n').slice(-2).join(' ')), 1);
    }
    c('Mehrere Familienmitglieder (mindestens 3 Familienwörter)', fam >= 3, 1);
    c('Namen genannt (… name is / names are …)', /\bnames?\s+(is|are)\b|\bthis is [A-Z]|\bis called\b/i.test(raw), 1);
    if (kind === 'pets') {
      c('Alter mit Zahlen als Wort (… years old / she is ten)', NUMW.test(low) && /\b(years old|is (one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty)\b|am (eleven|ten|twelve|nine))/i.test(raw), 1);
      c('Haustiere oder Lieblingstier', /\b(pets?|dogs?|cats?|rabbits?|budgies?|guinea pigs?|hamsters?|fish|parrots?|snakes?|horses?|favourite animal)\b/i.test(raw), 1);
      c('Sachen in der Schultasche', /schoolbag|school bag|pencil case|ruler|exercise book|rubber|sharpener|\bpen\b|pencil/i.test(raw), 1);
    } else {
      c('Alter genannt (… years old / she is nine)', /\byears old\b/i.test(raw) || /\b(is|am|are)\s+(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|\d+)\b/i.test(raw), 1);
      if (kind !== 'email') c('Hobbys oder Lieblingsdinge', HOBBY.test(raw), 1);
      else c('Hobbys, Lieblingsdinge oder Haustiere', HOBBY.test(raw) || /\b(pets?|dog|cat|rabbit|budgie|guinea pig)\b/i.test(raw), 1);
    }
    if (kind !== 'email' && kind !== 'pets') c('Etwa 10 Sätze (mindestens 9)', n >= 9, 1);
    else if (kind === 'pets') { /* 5 Punkte: Personen, Namen, Alter, Tiere, Schultasche */ }
    else { /* email: Anrede, Personen, Namen, Alter, Hobbys = 5 */ }
    var cont = content.reduce(function (s, x) { return s + x[1]; }, 0);
    if (n < 4) cont = Math.min(cont, n);
    /* Sprache */
    var errs = [];
    ERR.forEach(function (e) { var m; e[0].lastIndex = 0; while ((m = e[0].exec(raw))) { errs.push([m[0], e[1]]); if (m.index === e[0].lastIndex) e[0].lastIndex++; } });
    if (kind === 'pets') { var dm, dr = /\b\d+\b/g; while ((dm = dr.exec(raw))) { if (!/year\s*$/i.test(raw.slice(0, dm.index))) errs.push([dm[0], 'Zahlen als Wort schreiben']); } }
    var fill = Math.min(1, n / 8);
    var lang = half(Math.max(0, 6 - errs.length * 0.5) * fill);
    /* Form */
    var lines = raw.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    var bodyLines = lines.filter(function (l) { return !/^(hi|hello|dear|bye|love|best wishes|see you)\b/i.test(l); });
    var stBody = sentencesOf(bodyLines.join(' '));
    var capBad = stBody.length ? stBody.filter(function (x) { return !/^[A-ZÄÖÜ"]/.test(x); }).length : 9;
    var dotBad = stBody.length ? stBody.filter(function (x) { return !/[.!?]$/.test(x); }).length : 9;
    var smallI = /(^|[\s,(])i(\s|')/m.test(raw);
    var lowNames = (raw.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|germany|england|scotland|english|german|speyer|brighton|london|berlin)\b/g) || []);
    var apo = /\b(im|shes|hes|theyre|youre|dont|doesnt|isnt|arent|cant|whats|thats)\b/i.test(raw.replace(/[’']/g, '\''));
    var form = [
      ['Jeder Satz beginnt groß', capBad === 0 ? 1 : capBad === 1 ? 0.5 : 0, 1],
      ['Jeder Satz endet mit einem Punkt', dotBad === 0 ? 1 : dotBad === 1 ? 0.5 : 0, 1],
      ['„I“ groß · Namen, Städte, Länder, Tage groß · Apostroph (I’m, she’s)', smallI || lowNames.length || apo ? (((smallI ? 1 : 0) + (lowNames.length ? 1 : 0) + (apo ? 1 : 0)) >= 2 ? 0 : 0.5) : 1, 1]
    ];
    var formP = half(form.reduce(function (s, x) { return s + x[1]; }, 0) * fill);
    var total = half(Math.min(5, cont) + lang + formP);
    if (!raw.trim()) total = 0;
    return { total: total, max: 14, n: n, content: content, cont: Math.min(5, cont), errs: errs, lang: lang, form: form, formP: formP, fill: fill, lowNames: lowNames, smallI: smallI, apo: apo };
  }

  /* ---------------- Prüfungen aufbauen ---------------- */
  /* Jede Bewertungseinheit (Lücke, Wort, Satz …) bekommt einen Schlüssel k */
  function units(ex) {
    var out = [];
    ex.tasks.forEach(function (task, ti) {
      task.parts.forEach(function (p, pi) {
        var base = 't' + ti + 'p' + pi;
        if (p.t === 'words') p.items.forEach(function (it, i) { out.push({ k: base + 'i' + i, ti: ti, p: p, kind: 'word', ans: it[1], max: 1 }); });
        else if (p.t === 'gaps') p.lines.forEach(function (ln, i) { for (var g = 1; g < ln.length; g++) out.push({ k: base + 'i' + i + 'g' + (g - 1), ti: ti, p: p, kind: 'word', ans: ln[g], max: p.gp || 1 }); });
        else if (p.t === 'para') p.ans.forEach(function (a, i) { out.push({ k: base + 'g' + i, ti: ti, p: p, kind: 'word', ans: a, max: 1 }); });
        else if (p.t === 'listen') listenGaps(p).forEach(function (a, i) { out.push({ k: base + 'g' + i, ti: ti, p: p, kind: 'word', ans: a, max: 1, listen: true }); });
        else if (p.t === 'pick') p.items.forEach(function (it, i) { out.push({ k: base + 'i' + i, ti: ti, p: p, kind: 'pick', ans: p.opts ? it[1] : it[2], max: 1 }); });
        else if (p.t === 'sort') p.words.forEach(function (w, i) { out.push({ k: base + 'i' + i, ti: ti, p: p, kind: 'pick', ans: w[1], max: 1 }); });
        else if (p.t === 'tf') p.items.forEach(function (it, i) { out.push({ k: base + 'i' + i, ti: ti, p: p, kind: 'tf', ans: it[1], max: 1 }); });
        else if (p.t === 'open') p.items.forEach(function (it, i) { out.push({ k: base + 'i' + i, ti: ti, p: p, kind: 'open', kw: it[1], ans: it[2], max: 1 }); });
        else if (p.t === 'sent') p.items.forEach(function (it, i) { out.push({ k: base + 'i' + i, ti: ti, p: p, kind: 'sent', ans: it[1], orig: p.strict ? it[0] : null, max: p.pts || 1 }); });
        else if (p.t === 'split') p.items.forEach(function (it, i) { out.push({ k: base + 'i' + i, ti: ti, p: p, kind: 'split', ans: it[1], max: 1 }); });
        else if (p.t === 'write') out.push({ k: base + 'w', ti: ti, p: p, kind: 'write', max: 14 });
      });
    });
    return out;
  }
  function listenGaps(p) { var a = [], r = /\{([^}]+)\}/g, m; while ((m = r.exec(p.text))) a.push(m[1]); return a; }
  function listenSay(p) { return p.text.replace(/\{([^}]+)\}/g, '$1'); }

  function score(ex, run) {
    var us = units(ex), A = run.a || {}, res = {}, tot = 0, max = 0, perTask = ex.tasks.map(function () { return { got: 0, max: 0 }; });
    var noListen = !run.tts;
    us.forEach(function (u) {
      var v = A[u.k], r;
      if (u.listen && noListen) { res[u.k] = { s: 0, max: 0, skip: true }; return; }
      if (u.kind === 'word') r = cmpWord(v, u.ans, u.p.box);
      else if (u.kind === 'pick') r = { s: v === u.ans ? 1 : 0, empty: v == null };
      else if (u.kind === 'tf') r = { s: v === u.ans ? 1 : 0, empty: v == null };
      else if (u.kind === 'open') r = cmpOpen(v, u.kw, u.p.full);
      else if (u.kind === 'sent') r = cmpSent(v, u.ans, u.p, u.orig);
      else if (u.kind === 'split') r = cmpSplit(v, u.ans);
      else if (u.kind === 'write') {
        var w = writeScore(v || '', u.p.kind), adj = (run.adj && run.adj[u.k]) || 0;
        r = { s: Math.max(0, Math.min(14, half(w.total + adj))), w: w, adj: adj };
      }
      r.s = r.s * (u.max / (u.kind === 'sent' || u.kind === 'write' ? u.max : 1));
      r.max = u.max;
      res[u.k] = r; tot += r.s; max += u.max;
      perTask[u.ti].got += r.s; perTask[u.ti].max += u.max;
    });
    var pct = max ? tot / max : 0;
    return { res: res, pts: half(tot), max: max, pct: pct, grade: gradeOf(ex, pct), perTask: perTask };
  }
  function gradeOf(ex, pct) {
    for (var i = 0; i < ex.bands.length; i++) if (pct >= ex.bands[i] / ex.pdfMax - 1e-9) return i + 1;
    return 6;
  }
  function thresholds(ex) { return ex.bands.map(function (b) { return Math.round(b / ex.pdfMax * 100); }); }

  /* ---------------- Ansicht ---------------- */
  var cur = null, mode = 'run', clock = null, playing = false;
  function run() { return db.run[cur.id]; }

  /* Alle Lücken einer Aufgabe gleich breit – die Breite soll nichts verraten */
  function partWidth(p) {
    var a = [];
    if (p.t === 'words') p.items.forEach(function (it) { a.push(it[1]); });
    else if (p.t === 'gaps') p.lines.forEach(function (ln) { a = a.concat(ln.slice(1)); });
    else if (p.t === 'para') a = p.ans;
    else if (p.t === 'listen') a = listenGaps(p);
    var len = 0; a.forEach(function (x) { alts(x).forEach(function (y) { len = Math.max(len, y.length); }); });
    return Math.max(7, Math.min(20, len + 3));
  }
  var PW = 8;
  function inputHtml(k, ans, cls) {
    var w = PW;
    var v = (run().a || {})[k];
    return '<input class="ka-in ' + (cls || '') + '" data-k="' + k + '" style="width:' + w + 'ch" value="' + esc(v || '') + '" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="next" aria-label="Lücke">';
  }
  function lineHtml(text, base, ansList) {
    var parts = text.split('{}'), h = '';
    parts.forEach(function (s, i) { h += s; if (i < parts.length - 1) h += inputHtml(base + 'g' + i, ansList[i]); });
    return h;
  }
  function boxHtml(p) { return p.box ? '<p class="ka-box">' + p.box.split(' ').map(function (w) { return '<span>' + esc(w) + '</span>'; }).join('').replace('<span>How</span><span>old</span>', '<span>How old</span>') + '</p>' : ''; }
  function tipHtml(p) { return p.tip ? '<p class="ka-tip">' + esc(p.tip) + '</p>' : ''; }
  function treeHtml(tree) {
    return '<div class="ka-tree" aria-label="Stammbaum">' + tree.map(function (row) {
      return '<div class="ka-tree-row">' + row.map(function (c) { return '<div class="ka-tree-p"><span>' + esc(c[0]) + '</span><b>' + esc(c[1]) + '</b><i>' + c[2] + '</i></div>'; }).join('') + '</div>';
    }).join('<div class="ka-tree-link" aria-hidden="true"></div>') + '</div>';
  }
  function readHtml(txt) { return txt ? '<div class="ka-read">' + esc(txt).replace(/\n/g, '<br>') + '</div>' : ''; }

  function partHtml(p, base) {
    var A = run().a || {}, h = p.q ? '<p class="ka-q">' + esc(p.q) + '</p>' : '';
    PW = partWidth(p);
    h += boxHtml(p) + tipHtml(p);
    if (p.t === 'words') {
      h += '<ol class="ka-list ka-cols">' + p.items.map(function (it, i) { return '<li><span class="ka-de">' + esc(it[0]) + '</span>' + inputHtml(base + 'i' + i, it[1], p.num ? 'num' : '') + '</li>'; }).join('') + '</ol>';
    } else if (p.t === 'gaps') {
      if (p.tree) h += treeHtml(p.tree);
      h += '<ol class="ka-list">' + p.lines.map(function (ln, i) { return '<li>' + lineHtml(ln[0], base + 'i' + i, ln.slice(1)) + '</li>'; }).join('') + '</ol>';
    } else if (p.t === 'para') {
      var gi = 0, txt = p.text.split('{}'), ph = '';
      txt.forEach(function (s, i) { ph += esc(s).replace(/\n/g, '<br>'); if (i < txt.length - 1) { ph += inputHtml(base + 'g' + gi, p.ans[gi]); gi++; } });
      h += '<div class="ka-para">' + ph + '</div>';
    } else if (p.t === 'listen') {
      var gi2 = 0, lt = p.text.replace(/\{([^}]+)\}/g, function (m, w) { return '\u0000' + (gi2++) + '\u0001' + w + '\u0000'; });
      var html = esc(lt).replace(/\u0000(\d+)\u0001([^\u0000]*)\u0000/g, function (m, i, w) { return inputHtml(base + 'g' + i, w); });
      var plays = (run().plays || {})[base] || 0, left = Math.max(0, 2 - plays);
      h += '<div class="ka-listen-bar">' + (hasTTS ? '<button type="button" class="btn primary ka-play" data-play="' + base + '"' + (left ? '' : ' disabled') + '>' + (left ? '▶ Anhören <span>(noch ' + left + '×)</span>' : 'Zweimal gehört') + '</button><button type="button" class="btn small ka-stop" data-stop="1" hidden>■ Stopp</button>' : '<p class="ka-tip">Dieses Gerät kann leider nicht vorlesen. Diese Aufgabe wird nicht gewertet.</p>') + '</div>';
      h += '<div class="ka-para ka-listen-text">' + html + '</div>';
    } else if (p.t === 'pick') {
      h += '<ol class="ka-list ka-picks">' + p.items.map(function (it, i) {
        var opts = p.opts || it[1], k = base + 'i' + i;
        return '<li>' + (it[0] ? '<span class="ka-word">' + esc(it[0]) + '</span>' : '') + '<span class="ka-opts">' + opts.map(function (o, oi) { return '<button type="button" class="ka-opt" data-k="' + k + '" data-v="' + oi + '" aria-pressed="' + (A[k] === oi) + '">' + esc(o) + '</button>'; }).join('') + '</span></li>';
      }).join('') + '</ol>';
    } else if (p.t === 'sort') {
      h += '<ul class="ka-list ka-picks ka-sort">' + p.words.map(function (w, i) {
        var k = base + 'i' + i;
        return '<li><span class="ka-word">' + esc(w[0]) + '</span><span class="ka-opts">' + p.groups.map(function (g, gi) { return '<button type="button" class="ka-opt" data-k="' + k + '" data-v="' + gi + '" aria-pressed="' + (A[k] === gi) + '">' + esc(g) + '</button>'; }).join('') + '</span></li>';
      }).join('') + '</ul>';
    } else if (p.t === 'tf') {
      h += readHtml(p.text);
      h += '<ol class="ka-list ka-picks">' + p.items.map(function (it, i) {
        var k = base + 'i' + i;
        return '<li><span class="ka-word">' + esc(it[0]) + '</span><span class="ka-opts"><button type="button" class="ka-opt" data-k="' + k + '" data-v="true" aria-pressed="' + (A[k] === true) + '">true</button><button type="button" class="ka-opt" data-k="' + k + '" data-v="false" aria-pressed="' + (A[k] === false) + '">false</button></span></li>';
      }).join('') + '</ol>';
    } else if (p.t === 'open' || p.t === 'sent') {
      if (p.text) h += readHtml(p.text);
      h += '<ol class="ka-list ka-sents">' + p.items.map(function (it, i) {
        var k = base + 'i' + i;
        return '<li><span class="ka-de">' + esc(it[0]) + '</span><input class="ka-in ka-line" data-k="' + k + '" value="' + esc(A[k] || '') + '" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="next" aria-label="Antwort"></li>';
      }).join('') + '</ol>';
    } else if (p.t === 'split') {
      h += '<ol class="ka-list ka-sents">' + p.items.map(function (it, i) {
        var k = base + 'i' + i;
        return '<li><span class="ka-de ka-emoji">' + esc(it[0]) + '</span><span class="ka-splitrow">' + (p.pre ? '<span>' + esc(p.pre) + '</span>' : '') + '<input class="ka-in ka-line" data-k="' + k + '" value="' + esc(A[k] || '') + '" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="next" aria-label="Antwort"></span></li>';
      }).join('') + '</ol>';
    } else if (p.t === 'write') {
      var k2 = base + 'w';
      h += (p.help ? '<p class="ka-tip">' + esc(p.help) + '</p>' : '');
      h += '<textarea class="ka-write" data-k="' + k2 + '" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Schreib hier deinen Text …">' + esc(A[k2] || '') + '</textarea>';
      h += '<p class="ka-count" data-count="' + k2 + '"></p>';
      h += '<div class="ka-check"><b>✅ Meine Checkliste – bevor ich abgebe:</b><ul><li>Jeder Satz beginnt groß.</li><li>Jeder Satz endet mit einem Punkt.</li><li>Namen, Städte, Länder groß.</li><li>Apostroph richtig: I’m, she’s, isn’t</li><li>his / her / their richtig</li><li>is / are richtig (eins → is, mehrere → are)</li>' + (p.kind === 'pets' ? '<li>Zahlen als Wort · a / an · Mehrzahl-s (aber: fish)</li>' : '<li>ca. 10 Sätze</li>') + '</ul></div>';
    }
    return h;
  }
  function taskMax(ex, ti, run0) { var m = 0; units(ex).forEach(function (u) { if (u.ti === ti && !(u.listen && !run0.tts)) m += u.max; }); return m; }

  function renderRun() {
    var ex = cur, r = run(), host = $('katBody');
    var h = '<header class="ka-head2"><p class="ka-eyebrow">Englisch · Klasse 5 · Access 1 · ' + esc(ex.lvl) + '</p><h1>Probe-Klassenarbeit ' + ex.nr + '</h1><p>' + esc(ex.sub) + '</p>' +
      '<p class="ka-rules">⏱ ' + ex.min + ' Minuten · ✏️ Lies jede Aufgabe genau · Keine Tipps, keine Autokorrektur – wie in der echten Arbeit. Die Korrektur kommt erst nach dem Abgeben.</p></header>';
    ex.tasks.forEach(function (task, ti) {
      h += '<section class="card ka-task"><div class="ka-th"><span class="ka-tn">' + (ti + 1) + '</span><h2>' + esc(task.h) + ' <small>' + esc(task.de) + '</small></h2><span class="ka-tp">/ ' + fmtP(taskMax(ex, ti, r)) + ' P</span></div>';
      task.parts.forEach(function (p, pi) { h += partHtml(p, 't' + ti + 'p' + pi); });
      h += '</section>';
    });
    h += '<section class="card ka-submit"><p>Fertig? Lies alles noch einmal Wort für Wort durch. Dann abgeben.</p><button type="button" class="btn primary" id="katSubmit">Abgeben und korrigieren lassen</button></section>';
    host.innerHTML = h;
    host.querySelectorAll('[data-count]').forEach(updCount);
    renderClock();
  }
  function updCount(el) {
    var k = el.getAttribute('data-count'), v = (run().a || {})[k] || '';
    el.textContent = sentencesOf(v).length + ' Sätze';
  }

  function renderClock() {
    var r = run(); if (!r || !cur) return;
    var left = cur.min * 60 - (r.secs || 0), el = $('katClock');
    el.textContent = left >= 0 ? mmss(left) : '+' + mmss(-left);
    el.classList.toggle('low', left < 300 && left >= 0);
    el.classList.toggle('over', left < 0);
    $('katOver').hidden = left >= 0;
    var filled = 0, us = units(cur), A = r.a || {};
    us.forEach(function (u) { var v = A[u.k]; if (v !== undefined && v !== null && String(v).trim() !== '') filled++; });
    $('katFill').textContent = filled + ' / ' + us.length;
  }
  function tick() {
    if (!cur || mode !== 'run') return;
    var v = $('katView'); if (!v || v.hidden || document.visibilityState !== 'visible') return;
    var r = run(); r.secs = (r.secs || 0) + 1;
    if (r.secs % 10 === 0) save();
    renderClock();
  }

  /* Eingaben */
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t.closest || !t.closest('#katBody') || !cur || mode !== 'run') return;
    var k = t.getAttribute('data-k'); if (!k) return;
    var r = run(); r.a = r.a || {}; r.a[k] = t.value; save();
    if (t.classList.contains('ka-write')) { var c = document.querySelector('[data-count="' + k + '"]'); if (c) updCount(c); }
    renderClock();
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (e.key !== 'Enter' || !t.classList || !t.classList.contains('ka-in') || !t.closest('#katBody')) return;
    e.preventDefault();
    var all = Array.prototype.slice.call(document.querySelectorAll('#katBody .ka-in, #katBody .ka-write')), i = all.indexOf(t);
    if (all[i + 1]) all[i + 1].focus(); else t.blur();
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('#katView button, [data-ka]');
    if (!b) return;
    if (b.hasAttribute('data-ka')) { start(b.getAttribute('data-ka')); return; }
    if (b.classList.contains('ka-opt') && mode === 'run') {
      var k = b.getAttribute('data-k'), v = b.getAttribute('data-v'), r = run();
      r.a = r.a || {}; r.a[k] = v === 'true' ? true : v === 'false' ? false : Number(v); save();
      b.parentNode.querySelectorAll('.ka-opt').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      renderClock(); return;
    }
    if (b.hasAttribute('data-play')) { play(b.getAttribute('data-play'), b); return; }
    if (b.hasAttribute('data-stop')) { stopPlay(); return; }
    if (b.id === 'katSubmit') { askSubmit(); return; }
    if (b.id === 'katConfirmYes') { $('katConfirm').hidden = true; submit(); return; }
    if (b.id === 'katConfirmNo') { $('katConfirm').hidden = true; return; }
    if (b.id === 'katBack') { stopPlay(); saveNow(); if (window.LU5 && LU5.go) LU5.go('print'); renderCards(); return; }
    if (b.id === 'katAgain') { delete db.run[cur.id]; saveNow(); start(cur.id); return; }
    if (b.hasAttribute('data-adj')) { adjust(b.getAttribute('data-adj'), Number(b.getAttribute('data-d'))); return; }
    if (b.hasAttribute('data-practice')) { var tp = b.getAttribute('data-practice'); if (window.LU5 && LU5.startEn) LU5.startEn(tp); return; }
  });

  /* Hören: Text in Sätzen nacheinander vorlesen, höchstens zweimal */
  function stopPlay() { if (hasTTS) try { speechSynthesis.cancel(); } catch (e) {} playing = false; document.querySelectorAll('#katView .ka-stop').forEach(function (s) { s.hidden = true; }); }
  function play(base, btn) {
    var r = run(); r.plays = r.plays || {};
    if ((r.plays[base] || 0) >= 2 || playing) return;
    var ti = Number(base.match(/^t(\d+)/)[1]), pi = Number(base.match(/p(\d+)$/)[1]), p = cur.tasks[ti].parts[pi];
    var sents = listenSay(p).match(/[^.!?]+[.!?]+/g) || [listenSay(p)];
    var v = window.LU5 && LU5.voice ? LU5.voice() : null;
    r.plays[base] = (r.plays[base] || 0) + 1; save();
    playing = true; btn.disabled = true;
    var stop = btn.parentNode.querySelector('.ka-stop'); if (stop) stop.hidden = false;
    var left = 2 - r.plays[base];
    btn.innerHTML = '🔊 Hör gut zu …';
    try { speechSynthesis.cancel(); } catch (e) {}
    var i = 0;
    function done() {
      playing = false; if (stop) stop.hidden = true;
      btn.disabled = left <= 0;
      btn.innerHTML = left > 0 ? '▶ Noch einmal anhören <span>(noch ' + left + '×)</span>' : 'Zweimal gehört';
    }
    function next() {
      if (!playing) { done(); return; }
      if (i >= sents.length) { done(); return; }
      var u = new SpeechSynthesisUtterance(sents[i++].trim());
      u.lang = v ? v.lang : 'en-GB'; if (v) u.voice = v; u.rate = 0.82; u.pitch = 1;
      u.onend = function () { setTimeout(next, 450); };
      u.onerror = function () { setTimeout(next, 200); };
      speechSynthesis.speak(u);
    }
    setTimeout(next, 120);
    /* Notbremse, falls ein Gerät kein onend meldet */
    var guard = setInterval(function () { if (!playing) { clearInterval(guard); return; } try { if (!speechSynthesis.speaking && !speechSynthesis.pending && i >= sents.length) { clearInterval(guard); done(); } } catch (e) {} }, 1500);
  }

  function askSubmit() {
    var us = units(cur), A = run().a || {}, empty = 0;
    us.forEach(function (u) { var v = A[u.k]; if (u.listen && !run().tts) return; if (v === undefined || v === null || String(v).trim() === '') empty++; });
    $('katConfirmText').innerHTML = empty ? '<b>Noch ' + empty + (empty === 1 ? ' Lücke ist' : ' Lücken sind') + ' leer.</b> Willst du wirklich schon abgeben?' : '<b>Alles ausgefüllt.</b> Hast du alles noch einmal durchgelesen? Dann abgeben!';
    $('katConfirm').hidden = false;
    $('katConfirmYes').focus();
  }
  function submit() {
    stopPlay();
    var r = run(), sc = score(cur, r);
    r.done = true; r.when = Date.now();
    db.res[cur.id] = db.res[cur.id] || [];
    db.res[cur.id].push({ d: r.when, p: sc.pts, m: sc.max, g: sc.grade, s: r.secs || 0 });
    while (db.res[cur.id].length > 20) db.res[cur.id].shift();
    saveNow();
    mode = 'result';
    renderResult(true);
    window.scrollTo(0, 0);
  }
  function adjust(k, d) {
    var r = run(); r.adj = r.adj || {}; r.adj[k] = half((r.adj[k] || 0) + d);
    var sc = score(cur, r), list = db.res[cur.id] || [], last = list[list.length - 1];
    if (last && last.d === r.when) { last.p = sc.pts; last.g = sc.grade; }
    saveNow(); renderResult(false);
  }

  /* ---------------- Ergebnis und Korrektur ---------------- */
  function mark(r) { return r.skip ? '' : r.s >= r.max ? 'ok' : r.s > 0 ? 'half' : 'bad'; }
  function pts(r) { return '<span class="ka-pts ' + mark(r) + '">' + fmtP(r.s) + '/' + fmtP(r.max) + '</span>'; }
  function shown(v) { return v === undefined || v === null || String(v).trim() === '' ? '<i class="ka-empty">leer</i>' : esc(v); }
  function gapShow(r, v, ans) {
    var right = alts(ans)[0];
    if (r.s >= r.max) return '<span class="ka-g ok">' + esc(norm(v)) + '</span>' + (r.note ? '<span class="ka-note"> ' + esc(r.note) + '</span>' : '');
    return '<span class="ka-g ' + (r.s > 0 ? 'half' : 'bad') + '">' + shown(v) + '</span><span class="ka-g right">' + esc(right) + '</span>';
  }
  function reviewPart(p, base, sc, A) {
    var h = '';
    if (p.q) h += '<p class="ka-q">' + esc(p.q) + '</p>';
    if (p.t === 'words' || p.t === 'gaps' || p.t === 'para' || p.t === 'listen') {
      if (p.t === 'words') h += '<ol class="ka-list ka-cols">' + p.items.map(function (it, i) { var k = base + 'i' + i, r = sc.res[k]; return '<li><span class="ka-de">' + esc(it[0]) + '</span> ' + gapShow(r, A[k], it[1]) + '</li>'; }).join('') + '</ol>';
      if (p.t === 'gaps') h += '<ol class="ka-list">' + p.lines.map(function (ln, i) { var parts = ln[0].split('{}'), s = ''; parts.forEach(function (x, gi) { s += x; if (gi < parts.length - 1) { var k = base + 'i' + i + 'g' + gi; s += gapShow(sc.res[k], A[k], ln[gi + 1]); } }); return '<li>' + s + '</li>'; }).join('') + '</ol>';
      if (p.t === 'para' || p.t === 'listen') {
        var gi = 0, src = p.t === 'para' ? p.text : p.text.replace(/\{[^}]+\}/g, '{}'), ansL = p.t === 'para' ? p.ans : listenGaps(p), segs = src.split('{}'), s2 = '';
        segs.forEach(function (x, i) { s2 += esc(x).replace(/\n/g, '<br>'); if (i < segs.length - 1) { var k = base + 'g' + gi; s2 += sc.res[k].skip ? '<span class="ka-g right">' + esc(ansL[gi]) + '</span>' : gapShow(sc.res[k], A[k], ansL[gi]); gi++; } });
        h += '<div class="ka-para">' + s2 + '</div>';
      }
    } else if (p.t === 'pick' || p.t === 'sort' || p.t === 'tf') {
      var items = p.t === 'sort' ? p.words : p.items;
      h += '<ol class="ka-list ka-picks">' + items.map(function (it, i) {
        var k = base + 'i' + i, r = sc.res[k], opts = p.t === 'sort' ? p.groups : p.t === 'tf' ? ['true', 'false'] : (p.opts || it[1]);
        var right = p.t === 'sort' ? it[1] : p.t === 'tf' ? (it[1] ? 0 : 1) : (p.opts ? it[1] : it[2]);
        var mine = p.t === 'tf' ? (A[k] === true ? 0 : A[k] === false ? 1 : -1) : (A[k] == null ? -1 : A[k]);
        return '<li>' + (it[0] && typeof it[0] === 'string' ? '<span class="ka-word">' + esc(it[0]) + '</span>' : '') + '<span class="ka-opts">' + opts.map(function (o, oi) {
          var c = oi === right ? (oi === mine ? 'ok' : 'right') : (oi === mine ? 'bad' : '');
          return '<span class="ka-opt ro ' + c + '">' + esc(o) + '</span>';
        }).join('') + '</span>' + pts(r) + '</li>';
      }).join('') + '</ol>';
    } else if (p.t === 'open' || p.t === 'sent' || p.t === 'split') {
      h += '<ol class="ka-list ka-sents">' + p.items.map(function (it, i) {
        var k = base + 'i' + i, r = sc.res[k], sol = p.t === 'open' ? it[2] : it[1][0];
        return '<li><span class="ka-de">' + esc(it[0]) + '</span><span class="ka-ans ' + mark(r) + '">' + shown(A[k]) + '</span>' + (r.s < r.max ? '<span class="ka-sol">✓ ' + esc(sol) + '</span>' : '') + (r.note ? '<span class="ka-note">' + esc(r.note) + '</span>' : '') + pts(r) + '</li>';
      }).join('') + '</ol>';
    } else if (p.t === 'write') {
      var k2 = base + 'w', rw = sc.res[k2], w = rw.w;
      h += '<div class="ka-ans ka-wtext">' + shown(A[k2]).replace(/\n/g, '<br>') + '</div>';
      h += '<div class="ka-wgrid">';
      h += '<div><h3>Inhalt ' + fmtP(w.cont) + '/5</h3><ul class="ka-checks">' + w.content.map(function (c) { return '<li class="' + (c[1] ? 'ok' : 'bad') + '">' + esc(c[0]) + '</li>'; }).join('') + '<li class="info">' + w.n + ' Sätze</li></ul></div>';
      h += '<div><h3>Sprache ' + fmtP(w.lang) + '/6</h3><ul class="ka-checks">' + (w.errs.length ? w.errs.slice(0, 12).map(function (e) { return '<li class="bad"><b>' + esc(e[0]) + '</b> – ' + esc(e[1]) + '</li>'; }).join('') : '<li class="ok">Keine typischen Fehler gefunden</li>') + (w.fill < 1 ? '<li class="info">Text ist kurz – weniger Punkte möglich</li>' : '') + '</ul></div>';
      h += '<div><h3>Form ' + fmtP(w.formP) + '/3</h3><ul class="ka-checks">' + w.form.map(function (f) { return '<li class="' + (f[1] >= 1 ? 'ok' : f[1] > 0 ? 'half' : 'bad') + '">' + esc(f[0]) + '</li>'; }).join('') + (w.lowNames.length ? '<li class="bad">Klein geschrieben: <b>' + esc(w.lowNames.join(', ')) + '</b></li>' : '') + (w.smallI ? '<li class="bad">„i“ klein geschrieben – „I“ ist immer groß</li>' : '') + (w.apo ? '<li class="bad">Kurzform ohne Apostroph (z. B. „Im“ statt „I’m“)</li>' : '') + '</ul></div>';
      h += '</div>';
      h += '<div class="ka-adj"><p><b>Für Eltern:</b> Die App erkennt nicht jeden Fehler und nicht jede gute Idee. Lest den Text zusammen und passt die Punkte an, wenn nötig.</p><div class="ka-adj-row"><button type="button" class="btn small" data-adj="' + k2 + '" data-d="-0.5" aria-label="Einen halben Punkt weniger">− ½</button><span class="ka-adj-val">' + fmtP(rw.s) + ' / 14 P' + (rw.adj ? ' <small>(' + (rw.adj > 0 ? '+' : '−') + fmtP(Math.abs(rw.adj)) + ' angepasst)</small>' : '') + '</span><button type="button" class="btn small" data-adj="' + k2 + '" data-d="0.5" aria-label="Einen halben Punkt mehr">+ ½</button></div></div>';
    }
    return h;
  }
  function msgFor(g) {
    return g === 1 ? 'Sehr gut! Das sitzt richtig. Schau dir trotzdem die roten Stellen an – dann klappt es in der echten Arbeit genauso.'
      : g === 2 ? 'Gut gemacht! Bis zur 1 fehlt nicht viel. Unten siehst du genau, wo die Punkte geblieben sind.'
      : g === 3 ? 'Ordentlich! Jetzt weißt du genau, was du noch üben kannst. Unten gibt es zu jeder Aufgabe die passende Übung.'
      : 'Gut, dass du das jetzt geübt hast und nicht erst in der echten Arbeit. Schau dir unten die Fehler an und übe die Aufgaben mit den meisten roten Stellen.';
  }
  function renderResult(fresh) {
    var ex = cur, r = run(), sc = score(ex, r), A = r.a || {}, host = $('katBody');
    var pct = Math.round(sc.pct * 100), th = thresholds(ex);
    var h = '<section class="card ka-result g' + sc.grade + '">' +
      '<svg class="lina" viewBox="0 0 110 140" aria-hidden="true"><use href="#pennyArt"></use></svg>' +
      '<p class="ka-eyebrow">Probe-Klassenarbeit ' + ex.nr + ' · ' + esc(ex.lvl) + '</p>' +
      '<div class="ka-grade"><span>Note</span><b>' + sc.grade + '</b><em>' + GRADE_WORD[sc.grade] + '</em></div>' +
      '<p class="ka-score"><b>' + fmtP(sc.pts) + ' von ' + fmtP(sc.max) + ' Punkten</b> · ' + pct + ' %</p>' +
      '<div class="ka-bar" role="img" aria-label="' + pct + ' Prozent"><i style="width:' + pct + '%"></i></div>' +
      '<p class="ka-time">Zeit: ' + mmss(r.secs || 0) + ' Minuten' + ((r.secs || 0) > ex.min * 60 ? ' (länger als ' + ex.min + ' Minuten)' : '') + '</p>' +
      '<p class="ka-msg">' + msgFor(sc.grade) + '</p>' +
      '<details class="ka-scale"><summary>Notenschlüssel</summary><p>1 ab ' + th[0] + ' % · 2 ab ' + th[1] + ' % · 3 ab ' + th[2] + ' % · 4 ab ' + th[3] + ' % · 5 ab ' + th[4] + ' % · darunter 6. Das ist eine übliche Staffelung – die Lehrerin kann anders gewichten. Bei der Hör-Aufgabe und beim Text kann die App sich irren; Eltern können die Punkte beim Text anpassen.</p></details>' +
      '<div class="ka-sum">' + ex.tasks.map(function (t, ti) { var pt = sc.perTask[ti], ok = pt.got >= pt.max; return '<a href="#ka-t' + ti + '" class="' + (ok ? 'ok' : pt.got / Math.max(1, pt.max) >= 0.5 ? 'half' : 'bad') + '"><span>' + (ti + 1) + ' ' + esc(t.h) + '</span><b>' + fmtP(pt.got) + '/' + fmtP(pt.max) + '</b></a>'; }).join('') + '</div>' +
      '</section>';
    ex.tasks.forEach(function (task, ti) {
      var pt = sc.perTask[ti];
      h += '<section class="card ka-task ka-rev" id="ka-t' + ti + '"><div class="ka-th"><span class="ka-tn">' + (ti + 1) + '</span><h2>' + esc(task.h) + ' <small>' + esc(task.de) + '</small></h2><span class="ka-tp ' + (pt.got >= pt.max ? 'ok' : '') + '">' + fmtP(pt.got) + ' / ' + fmtP(pt.max) + ' P</span></div>';
      task.parts.forEach(function (p, pi) { h += reviewPart(p, 't' + ti + 'p' + pi, sc, A); });
      if (pt.got < pt.max && task.topic && task.topic !== 'family') h += '<button type="button" class="btn small ka-prac" data-practice="' + task.topic + '">In der App üben →</button>';
      if (task.topic === 'family') h += '<button type="button" class="btn small ka-prac" data-practice="family">Familientext weiter üben →</button>';
      h += '</section>';
    });
    h += '<section class="card ka-submit"><p>Tipp: Verbessert die Fehler gleich zusammen. Lies jeden falschen Satz laut und schreib ihn einmal richtig ins Heft – das bringt am meisten.</p><button type="button" class="btn primary" id="katAgain">Diese Arbeit neu schreiben</button><button type="button" class="btn small" id="katBack2" data-go="print">← Zur Übersicht</button></section>';
    host.innerHTML = h;
    $('katClock').textContent = 'korrigiert'; $('katClock').className = 'ka-clock done'; $('katFill').textContent = ''; $('katOver').hidden = true;
    if (fresh && sc.grade <= 2) confetti();
  }
  function confetti() {
    var c = document.createElement('div'); c.className = 'ka-confetti'; c.setAttribute('aria-hidden', 'true');
    var cols = ['#FFD54A', '#7652DB', '#1F9A60', '#E0457B', '#2563C9', '#FFB3C7'];
    for (var i = 0; i < 40; i++) { var s = document.createElement('i'); s.style.left = Math.random() * 100 + '%'; s.style.background = cols[i % cols.length]; s.style.animationDelay = Math.random() * 0.6 + 's'; s.style.animationDuration = 1.6 + Math.random() * 1.2 + 's'; c.appendChild(s); }
    document.body.appendChild(c); setTimeout(function () { c.remove(); }, 3600);
  }

  /* ---------------- Start / Übersicht ---------------- */
  function start(id) {
    cur = byId(id); if (!cur) return;
    if (!db.run[id]) db.run[id] = { a: {}, secs: 0, plays: {}, tts: hasTTS, started: Date.now() };
    var r = db.run[id];
    mode = r.done ? 'result' : 'run';
    saveNow();
    if (window.LU5 && LU5.go) LU5.go('kat');
    $('katTitle').textContent = 'Probe-Klassenarbeit ' + cur.nr;
    if (mode === 'run') renderRun(); else renderResult(false);
    window.scrollTo(0, 0);
  }
  function lastRes(id) { var l = db.res[id] || []; return l.length ? l[l.length - 1] : null; }
  function bestRes(id) { var l = db.res[id] || [], b = null; l.forEach(function (x) { if (!b || x.p / x.m > b.p / b.m) b = x; }); return b; }
  function renderCards() {
    DATA.forEach(function (ex) {
      var el = document.querySelector('[data-ka-status="' + ex.id + '"]'), btn = document.querySelector('[data-ka="' + ex.id + '"]');
      if (!el || !btn) return;
      var r = db.run[ex.id], last = lastRes(ex.id), best = bestRes(ex.id);
      var s = '';
      if (r && !r.done) s = '<b>Angefangen</b> · noch ' + mmss(Math.max(0, ex.min * 60 - (r.secs || 0))) + ' Min';
      else if (last) s = 'Zuletzt: <b>Note ' + last.g + '</b> (' + Math.round(last.p / last.m * 100) + ' %)' + (best && best !== last ? ' · beste: Note ' + best.g : '');
      el.innerHTML = s; el.hidden = !s;
      btn.textContent = r && !r.done ? 'Weiterschreiben' : r && r.done ? 'Korrektur ansehen' : 'Am Tablet schreiben';
    });
  }

  /* ---------------- Ansicht einhängen ---------------- */
  function mount() {
    if ($('katView')) return;
    var v = document.createElement('div');
    v.className = 'app view-wrap en ka-app'; v.id = 'katView'; v.hidden = true;
    v.innerHTML = '<div class="ka-bar-top"><button type="button" class="btn small" id="katBack">← Übersicht</button><span class="ka-title" id="katTitle"></span><span class="ka-fill" id="katFill"></span><span class="ka-clock" id="katClock">45:00</span></div>' +
      '<p class="ka-overmsg" id="katOver" hidden>⏰ Die Zeit ist um! In der echten Arbeit müsstest du jetzt abgeben. Schreib den Satz fertig und gib ab.</p>' +
      '<div id="katBody" class="view-wrap"></div>' +
      '<div class="ka-confirm" id="katConfirm" hidden role="dialog" aria-modal="true" aria-labelledby="katConfirmText"><div class="card"><p id="katConfirmText"></p><div class="ka-confirm-row"><button type="button" class="btn small" id="katConfirmNo">Weiterschreiben</button><button type="button" class="btn primary" id="katConfirmYes">Abgeben</button></div></div></div>';
    var pv = $('printView');
    (pv ? pv.parentNode : document.body).insertBefore(v, pv ? pv.nextSibling : null);
    /* Übersichtskarten um den Tablet-Knopf ergänzen */
    document.querySelectorAll('#printView .pr-card').forEach(function (card) {
      var a = card.querySelector('.pr-open'), m = a && a.getAttribute('href').match(/Probe-Klassenarbeit-(\d)\.pdf/); if (!m) return;
      var id = 'e' + m[1]; if (!byId(id)) return;
      a.textContent = 'PDF';
      a.classList.add('pr-pdf');
      var wrap = document.createElement('div'); wrap.className = 'pr-acts';
      a.parentNode.insertBefore(wrap, a);
      wrap.innerHTML = '<button type="button" class="pr-open pr-tab" data-ka="' + id + '">Am Tablet schreiben</button>';
      wrap.appendChild(a);
      var st = document.createElement('p'); st.className = 'pr-status'; st.setAttribute('data-ka-status', id); st.hidden = true;
      card.querySelector('.pr-txt').appendChild(st);
    });
    renderCards();
    setInterval(tick, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();

  window.LU5Ka = { start: start, cards: renderCards, _t: { score: score, writeScore: writeScore, cmpWord: cmpWord, cmpSent: cmpSent, cmpOpen: cmpOpen, cmpSplit: cmpSplit, units: units, DATA: DATA, db: function () { return db; } } };
})();

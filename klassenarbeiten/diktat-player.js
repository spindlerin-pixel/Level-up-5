/* =====================================================================
   Level Up 5 · Übungsdiktate (Diktat am 23.11.2026)
   Die App diktiert langsam wie eine Lehrerin (Satz ganz, dann in Stücken mit Schreibpausen,
   Satzzeichen werden angesagt), danach Kontrolle mit Lösung, Fehlerzahl → Note.
   Das Kind schreibt von Hand ins Heft. Daten: klassenarbeiten/diktate.js
   ===================================================================== */
(function () {
  var DATA = window.LU5DIKTATE || [], KEY = 'lu5-diktate';
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(db) { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }
  function byId(id) { return DATA.filter(function (d) { return d.id === id; })[0]; }
  function grade(f) { return f <= 1 ? 1 : f <= 3 ? 2 : f <= 6 ? 3 : f <= 9 ? 4 : f <= 12 ? 5 : 6; }
  var GW = { 1: 'sehr gut', 2: 'gut', 3: 'befriedigend', 4: 'ausreichend', 5: 'mangelhaft', 6: 'ungenügend' };
  function plain(t) { return t.replace(/\s*\/\s*/g, ' ').replace(/\s*\|\s*/g, ' ').trim(); }
  function sentences(d) { return d.text.split('|').map(function (s) { return s.trim(); }); }

  /* ---------- Stimme ---------- */
  var hasTTS = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance === 'function', voice = null;
  function vs(v) { var n = (v.name + ' ' + (v.voiceURI || '')).toLowerCase(), s = 0; if (!/^de/i.test(v.lang)) return -1; if (/premium/.test(n)) s += 40; else if (/enhanced|erweitert|natural|neural|online/.test(n)) s += 30; if (/siri/.test(n)) s += 20; if (/google deutsch/.test(n)) s += 25; if (/de-de/i.test(v.lang)) s += 5; return s; }
  function pickVoice() { if (!hasTTS) return; var l = (speechSynthesis.getVoices() || []).filter(function (v) { return vs(v) >= 0; }).sort(function (a, b) { return vs(b) - vs(a); }); voice = l[0] || null; }
  if (hasTTS) { pickVoice(); try { speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) {} }

  /* ---------- Diktier-Ablauf ---------- */
  var TEMPO = { langsam: 1.4, normal: 1, schnell: 0.7 };
  function punctWord(c) { return c === ',' ? 'Komma' : c === '.' ? 'Punkt' : c === '!' ? 'Ausrufezeichen' : c === '?' ? 'Fragezeichen' : c === ':' ? 'Doppelpunkt' : ''; }
  function buildSteps(d) {
    var st = [];
    st.push({ s: -1, say: 'Überschrift: ' + d.title, rate: 0.75, wait: 4000 + 900 * d.title.split(' ').length });
    sentences(d).forEach(function (sent, si) {
      st.push({ s: si, say: plain(sent), rate: 0.85, wait: 1500 });
      sent.split('/').forEach(function (ch) {
        ch = ch.trim(); var m = ch.match(/[,.!?:]$/), words = ch.split(/\s+/).length;
        var say = ch.replace(/[,.!?:]$/, '') + (m ? ' … ' + punctWord(m[0]) : '');
        st.push({ s: si, say: say, rate: 0.7, wait: 2200 + 1000 * words });
      });
      st[st.length - 1].wait += 1200;
    });
    st.push({ s: 99, say: 'Jetzt lese ich den ganzen Text noch einmal vor. Lies leise mit und verbessere, was du noch findest.', rate: 0.85, wait: 800 });
    st.push({ s: 99, say: d.title + '. ' + plain(d.text), rate: 0.8, wait: 0 });
    return st;
  }
  var P = null; /* Player: {d, steps, i, paused, timer, tempo} */
  function speakStep() {
    if (!P || P.paused) return;
    var stp = P.steps[P.i]; if (!stp) { finishDictation(); return; }
    renderPlayer();
    if (!hasTTS || !voice) { P.timer = setTimeout(next, 1500); return; }
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(stp.say); u.voice = voice; u.lang = voice.lang || 'de-DE'; u.rate = stp.rate;
      var my = P;
      u.onend = function () { if (P === my && !P.paused) P.timer = setTimeout(next, stp.wait * TEMPO[P.tempo]); };
      speechSynthesis.speak(u);
    } catch (e) { P.timer = setTimeout(next, 1500); }
  }
  function next() { if (!P || P.paused) return; P.i++; speakStep(); }
  function stopAll() { if (P) clearTimeout(P.timer); if (T) clearTimeout(T.timer); try { speechSynthesis.cancel(); } catch (e) {} }
  function finishDictation() { stopAll(); var id = P.d.id; P = null; showCheck(id); }

  /* ---------- Anzeige ---------- */
  var box = null, mode = 'list', curId = null;
  function results() { return load(); }
  function lastRes(id) { var r = results()[id] || []; return r[r.length - 1] || null; }
  function statusTxt(id) { var r = results()[id] || []; if (!r.length) return ''; var l = r[r.length - 1]; return 'Zuletzt: ' + l.f + ' Fehler · Note ' + l.n + (r.length > 1 ? ' · ' + r.length + '× geschrieben' : ''); }
  function renderList() {
    mode = 'list'; curId = null; if (!box) return;
    var h = '<p class="voc-eyebrow">Übungsdiktat am Montag, 23.11. · diktieren, kontrollieren, Note</p>';
    h += '<p class="voc-how">So geht’s: Heft und Stift bereitlegen. Die App diktiert langsam wie deine Lehrerin: erst den ganzen Satz, dann in kleinen Stücken mit Pausen zum Schreiben. Satzzeichen werden angesagt. Danach kontrolliert ihr mit der Lösung und tragt die Fehler ein. Mama oder Papa können auch aus dem PDF vorlesen.</p>';
    h += '<p class="de-plan"><b>Plan:</b> ab Dienstag, 17.11. jeden Tag ein Diktat (mittwochs frei), Samstag, 21.11.: zwei · Sonntag, 22.11.: das schwächste noch einmal · <b>Fehlerwörter</b> danach 3× ins Heft.</p>';
    var fw = words();
    if (fw.length) h += '<p class="de-plan"><b>📌 ' + fw.length + ' Fehlerwörter aus deinen Diktaten</b> warten aufs Üben. <button type="button" class="btn small primary" data-dk-words="1">Fehlerwörter üben</button></p>';
    h += '<p class="voc-how"><b>🔊 Ins Heft:</b> du schreibst mit der Hand wie im echten Diktat, danach kontrolliert ihr mit der Lösung. <b>⌨️ In der App:</b> du tippst Satz für Satz, die App kontrolliert alles selbst und merkt sich deine Fehlerwörter.</p>';
    h += '<div class="pr-list">' + DATA.map(function (d, k) {
      var s = statusTxt(d.id);
      return '<div class="pr-card" style="--pc:' + ['#FFD66B', '#8FD3FF', '#B9E6B0', '#FFB3C7', '#9FE3D6', '#C9B8FF'][k % 6] + '"><span class="pr-num">' + (k + 1) + '</span><div class="pr-txt"><h3>' + esc(d.title) + '<span class="pr-lvl">' + esc(d.lvl) + '</span></h3><p>' + esc(d.focus) + ' · ' + d.n + ' Wörter</p>' + (s ? '<p class="pr-status">' + esc(s) + '</p>' : '') + '</div><div class="pr-acts"><button type="button" class="pr-open pr-tab" data-dk-start="' + d.id + '">🔊 Ins Heft</button><button type="button" class="pr-open pr-tab" data-dk-type="' + d.id + '">⌨️ In der App</button><a class="pr-open" href="klassenarbeiten/diktate/Uebungsdiktat-' + (k + 1) + '.pdf" target="_blank" rel="noopener">📄 PDF</a><button type="button" class="pr-open" data-dk-check="' + d.id + '">✓ Kontrolle</button></div></div>';
    }).join('') + '</div>';
    box.innerHTML = h;
  }
  function renderPlayer() {
    if (!P || !box) return;
    var stp = P.steps[P.i] || {}, n = sentences(P.d).length;
    var where = stp.s === -1 ? 'Überschrift' : stp.s === 99 ? 'Zum Schluss: alles noch einmal' : 'Satz ' + (stp.s + 1) + ' von ' + n;
    var h = '<p class="voc-eyebrow">Übungsdiktat · ' + esc(P.d.title) + '</p>';
    h += '<p class="dk-where">' + where + '</p><div class="goalbar voc-bar"><i style="width:' + Math.round(P.i / P.steps.length * 100) + '%"></i></div>';
    if (!hasTTS || !voice) h += '<p class="voc-fb soft">Auf diesem Gerät gibt es keine deutsche Stimme. Bitte das PDF nehmen und vorlesen lassen.</p>';
    h += '<p class="voc-how">' + (P.paused ? 'Pause. Tippe auf „Weiter“, wenn du bereit bist.' : 'Schreib ins Heft. Wenn es zu schnell geht: ⏸ Pause oder „Satz nochmal“.') + '</p>';
    h += '<div class="voc-row"><button type="button" class="btn primary" data-dk-pause="1">' + (P.paused ? '▶ Weiter' : '⏸ Pause') + '</button><button type="button" class="btn" data-dk-again="1">↺ Satz nochmal</button><button type="button" class="btn small" data-dk-end="1">Fertig – kontrollieren</button></div>';
    h += '<p class="dk-tempo">Tempo: ' + Object.keys(TEMPO).map(function (t) { return '<button type="button" class="btn small' + (P.tempo === t ? ' primary' : '') + '" data-dk-tempo="' + t + '">' + t + '</button>'; }).join(' ') + '</p>';
    box.innerHTML = h;
  }
  function start(id) {
    stopAll(); var d = byId(id); if (!d) return;
    var tempo = 'normal'; try { tempo = JSON.parse(localStorage.getItem('lu5-diktat-tempo')) || 'normal'; } catch (e) {}
    P = { d: d, steps: buildSteps(d), i: 0, paused: false, timer: null, tempo: TEMPO[tempo] ? tempo : 'normal' };
    mode = 'play'; speakStep(); box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function solHtml(d) {
    var txt = esc(plain(d.text));
    d.words.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (w) {
      var re = new RegExp('(^|[^A-Za-zÄÖÜäöüß>])(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![A-Za-zÄÖÜäöüß<])');
      txt = txt.replace(re, '$1<mark>$2</mark>');
    });
    return '<p class="dk-sol"><b>' + esc(d.title) + '</b><br>' + txt + '</p>';
  }
  function showCheck(id) {
    stopAll(); P = null; mode = 'check'; curId = id; var d = byId(id); if (!d || !box) return;
    var h = '<p class="voc-eyebrow">Kontrolle · ' + esc(d.title) + '</p>';
    h += '<p class="voc-how">Erst selbst noch einmal durchlesen. Dann Wort für Wort mit der Lösung vergleichen. <mark>Markiert</mark> sind die Stolperstellen.</p>';
    h += solHtml(d);
    h += '<details class="dk-rules"><summary>So zählt man Fehler</summary><p>Jedes falsch geschriebene Wort = 1 Fehler (auch groß/klein). Gleich falsch geschriebenes Wort zählt nur 1-mal. Vergessenes Wort = 1 Fehler. Zwei fehlende Satzzeichen = 1 Fehler. „garnicht“ statt „gar nicht“ = 1 Fehler.</p></details>';
    h += '<form class="dk-form" id="dkForm"><label>Anzahl Fehler <input type="number" id="dkF" min="0" max="40" inputmode="numeric" required></label><label>Fehlerwörter (richtig geschrieben, freiwillig) <input id="dkW" autocomplete="off" placeholder="z. B. gar nicht, Mahlzeit"></label><button class="btn primary" type="submit">Note anzeigen</button></form>';
    h += '<div class="voc-row"><button type="button" class="btn" data-dk-start="' + d.id + '">🔊 Nochmal diktieren</button><button type="button" class="btn small" data-dk-list="1">Zur Übersicht</button></div>';
    box.innerHTML = h; box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function submit() {
    var f = parseInt($('dkF').value, 10); if (isNaN(f) || f < 0) return;
    var w = ($('dkW').value || '').trim(), n = grade(f), db = load();
    (db[curId] = db[curId] || []).push({ d: Date.now(), day: dayKey(), f: f, n: n, w: w }); db[curId] = db[curId].slice(-10); save(db);
    var msg = n <= 2 ? 'Super gemacht! ' : n === 3 ? 'Gut! Mit den Fehlerwörtern wird es noch besser. ' : 'Dranbleiben – jedes Diktat macht dich sicherer. ';
    box.innerHTML = '<p class="voc-grade"><span>' + n + '</span>Note im Übungsdiktat (' + GW[n] + ')</p><p>' + f + ' Fehler.</p><p class="voc-how">' + msg + (w ? '<b>Schreib diese Wörter 3× ins Heft:</b> ' + esc(w) : 'Schreib jedes Fehlerwort 3× richtig ins Heft und sag die Regel dazu.') + '</p><p class="note">Notenschlüssel: 0–1 Fehler = 1 · 2–3 = 2 · 4–6 = 3 · 7–9 = 4 · 10–12 = 5 · ab 13 = 6 (übliche Staffel, die Lehrerin kann anders werten).</p><div class="voc-row"><button type="button" class="btn primary" data-dk-list="1">Zur Übersicht</button></div>';
    if (window.LU5Plan) window.LU5Plan();
  }
  /* ================= In der App schreiben ================= */
  var TK = /[A-Za-zÄÖÜäöüß]+(?:-[A-Za-zÄÖÜäöüß]+)*|[.,!?:;]/g;
  function toks(t) { return (String(t).replace(/[’‘`´]/g, "'").match(TK) || []); }
  function isP(t) { return /^[.,!?:;]$/.test(t); }
  /* Ausrichten: Wort für Wort, mit „garnicht“ ↔ „gar nicht“ als EIN Fehler */
  function align(exp, got) {
    var n = exp.length, m = got.length, D = [], B = [], i, j;
    function w(t) { return isP(t) ? 0.5 : 1; }
    for (i = 0; i <= n; i++) { D[i] = []; B[i] = []; }
    D[0][0] = 0;
    for (i = 0; i <= n; i++) for (j = 0; j <= m; j++) {
      if (!i && !j) continue;
      var best = Infinity, op = null;
      if (i && j) { var c = exp[i - 1] === got[j - 1] ? 0 : (isP(exp[i - 1]) !== isP(got[j - 1]) ? 9 : w(exp[i - 1])); if (D[i - 1][j - 1] + c < best) { best = D[i - 1][j - 1] + c; op = 'sub'; } }
      if (i && D[i - 1][j] + w(exp[i - 1]) < best) { best = D[i - 1][j] + w(exp[i - 1]); op = 'del'; }
      if (j && D[i][j - 1] + w(got[j - 1]) < best) { best = D[i][j - 1] + w(got[j - 1]); op = 'ins'; }
      if (i >= 2 && j && (exp[i - 2] + exp[i - 1]).toLowerCase() === got[j - 1].toLowerCase() && D[i - 2][j - 1] + 1 < best) { best = D[i - 2][j - 1] + 1; op = 'join'; }
      if (i && j >= 2 && exp[i - 1].toLowerCase() === (got[j - 2] + got[j - 1]).toLowerCase() && D[i - 1][j - 2] + 1 < best) { best = D[i - 1][j - 2] + 1; op = 'split'; }
      D[i][j] = best; B[i][j] = op;
    }
    var out = []; i = n; j = m;
    while (i || j) {
      var o = B[i][j];
      if (o === 'sub') { out.unshift({ e: exp[i - 1], g: got[j - 1] }); i--; j--; }
      else if (o === 'del') { out.unshift({ e: exp[i - 1], g: null }); i--; }
      else if (o === 'ins') { out.unshift({ e: null, g: got[j - 1] }); j--; }
      else if (o === 'join') { out.unshift({ e: exp[i - 2] + ' ' + exp[i - 1], g: got[j - 1] }); i -= 2; j--; }
      else { out.unshift({ e: exp[i - 1], g: got[j - 2] + ' ' + got[j - 1] }); i--; j -= 2; }
    }
    return out;
  }
  function unitsOf(d) {
    var u = [{ label: 'Überschrift', plain: d.title, chunks: [d.title] }];
    sentences(d).forEach(function (s, i) { u.push({ label: 'Satz ' + (i + 1), plain: plain(s), chunks: s.split('/').map(function (c) { return c.trim(); }) }); });
    return u;
  }
  function evaluate(d, inputs) {
    var units = unitsOf(d), all = [], seen = {}, wordErr = 0, punctErr = 0, wrongWords = [];
    units.forEach(function (u, k) {
      var al = align(toks(u.plain), toks(inputs[k] || ''));
      al.forEach(function (a) {
        a.ok = a.e === a.g;
        if (a.ok) return;
        if ((a.e && isP(a.e)) || (!a.e && isP(a.g))) { punctErr++; return; }
        var key = (a.e || '') + '→' + (a.g || '');
        if (!seen[key]) { seen[key] = 1; wordErr++; }
        if (a.e && a.g && wrongWords.indexOf(a.e) === -1) wrongWords.push(a.e);
      });
      all.push({ al: al, k: k });
    });
    var f = wordErr + Math.floor(punctErr / 2);
    return { f: f, n: grade(f), wordErr: wordErr, punctErr: punctErr, words: wrongWords, rows: all };
  }
  function unitSteps(u) {
    if (u.label === 'Überschrift') return [{ say: 'Überschrift: ' + u.plain, rate: 0.75, wait: 0 }];
    var st = [{ say: u.plain, rate: 0.85, wait: 1400 }];
    u.chunks.forEach(function (ch) { var m = ch.match(/[,.!?:]$/), words = ch.split(/\s+/).length; st.push({ say: ch.replace(/[,.!?:]$/, '') + (m ? ' … ' + punctWord(m[0]) : ''), rate: 0.7, wait: 2600 + 1300 * words }); });
    st[st.length - 1].wait = 0;
    return st;
  }
  var T = null; /* Tipp-Diktat */
  function tSay(list, done) {
    if (!T) return; clearTimeout(T.timer); try { speechSynthesis.cancel(); } catch (e) {}
    if (!hasTTS || !voice) { if (done) done(); return; }
    var my = T, i = 0;
    (function one() {
      if (T !== my) return;
      var stp = list[i]; if (!stp) { if (done) done(); return; }
      var u = new SpeechSynthesisUtterance(stp.say); u.voice = voice; u.lang = voice.lang || 'de-DE'; u.rate = stp.rate;
      u.onend = function () { if (T !== my) return; i++; my.timer = setTimeout(one, stp.wait * TEMPO[my.tempo]); };
      try { speechSynthesis.speak(u); } catch (e) { if (done) done(); }
    })();
  }
  function tStart(id) {
    stopAll(); P = null; W = null; var d = byId(id); if (!d) return;
    var tempo = 'normal'; try { tempo = JSON.parse(localStorage.getItem('lu5-diktat-tempo')) || 'normal'; } catch (e) {}
    T = { d: d, units: unitsOf(d), u: 0, inputs: [], phase: 'write', tempo: TEMPO[tempo] ? tempo : 'normal', timer: null };
    mode = 'type'; tRender(); tSay(unitSteps(T.units[0]), tReady); box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function tReady() { var el = $('dkStat'); if (el) el.textContent = 'Fertig vorgelesen. Schreib zu Ende und prüf: groß oder klein? Satzzeichen? Dann „Weiter“.'; }
  function tInputHtml(k, v, big) { return '<textarea class="dk-in' + (big ? ' big' : '') + '" data-dk-k="' + k + '" rows="' + (big ? 3 : 2) + '" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" aria-label="Dein Satz">' + esc(v || '') + '</textarea>'; }
  function tRender() {
    if (!T || !box) return;
    var d = T.d, n = T.units.length, h = '<p class="voc-eyebrow">Übungsdiktat in der App · ' + esc(d.title) + '</p>';
    if (!hasTTS || !voice) h += '<p class="voc-fb soft">Auf diesem Gerät gibt es keine deutsche Stimme. Dann bitte jemanden aus dem PDF vorlesen lassen.</p>';
    if (T.phase === 'write') {
      var u = T.units[T.u];
      h += '<p class="dk-where">' + esc(u.label) + (T.u ? ' von ' + (n - 1) : '') + '</p><div class="goalbar voc-bar"><i style="width:' + Math.round(T.u / n * 100) + '%"></i></div>';
      if (T.u) h += '<div class="dk-done">' + T.inputs.slice(0, T.u).map(function (x) { return esc(x || '…'); }).join(' ') + '</div>';
      h += '<p class="voc-how" id="dkStat">Hör zu und tippe mit. Großbuchstaben machst du selbst mit der ⇧-Taste – die App hilft dabei nicht, wie im echten Diktat!</p>';
      h += tInputHtml(T.u, T.inputs[T.u], true);
      h += '<div class="voc-row"><button type="button" class="btn" data-dk-thear="1">↺ Nochmal hören</button><button type="button" class="btn primary" data-dk-tnext="1">' + (T.u + 1 < n ? 'Weiter →' : 'Fertig – durchlesen') + '</button></div>';
      h += '<p class="dk-tempo">Tempo: ' + Object.keys(TEMPO).map(function (t) { return '<button type="button" class="btn small' + (T.tempo === t ? ' primary' : '') + '" data-dk-ttempo="' + t + '">' + t + '</button>'; }).join(' ') + '</p>';
    } else {
      h += '<p class="dk-where">Durchlesen und verbessern</p><p class="voc-how">Wie in der Schule: Lies jeden Satz noch einmal Wort für Wort. Nomen groß? Kurz oder lang? Satzzeichen? Du kannst dir alles noch einmal vorlesen lassen.</p>';
      h += T.units.map(function (u, k) { return '<p class="dk-lbl">' + esc(u.label) + '</p>' + tInputHtml(k, T.inputs[k]); }).join('');
      h += '<div class="voc-row"><button type="button" class="btn" data-dk-tall="1">🔊 Alles noch einmal hören</button><button type="button" class="btn primary" data-dk-tsubmit="1">Abgeben und kontrollieren</button></div>';
    }
    h += '<p><button type="button" class="btn small de-quit" data-dk-list="1">Abbrechen</button></p>';
    box.innerHTML = h;
    var ta = box.querySelector('textarea.big'); if (ta) { ta.focus({ preventScroll: true }); var L = ta.value.length; ta.setSelectionRange(L, L); }
  }
  function tCollect() { if (!T) return; box.querySelectorAll('[data-dk-k]').forEach(function (el) { T.inputs[Number(el.getAttribute('data-dk-k'))] = el.value; }); }
  function tNext() {
    tCollect(); clearTimeout(T.timer); try { speechSynthesis.cancel(); } catch (e) {}
    if (T.u + 1 < T.units.length) { T.u++; tRender(); tSay(unitSteps(T.units[T.u]), tReady); }
    else { T.phase = 'review'; tRender(); }
  }
  function tSubmit() {
    tCollect(); clearTimeout(T.timer); try { speechSynthesis.cancel(); } catch (e) {}
    var d = T.d, ev = evaluate(d, T.inputs), db = load();
    (db[d.id] = db[d.id] || []).push({ d: Date.now(), day: dayKey(), f: ev.f, n: ev.n, w: ev.words.join(', '), app: 1 }); db[d.id] = db[d.id].slice(-10); save(db);
    addWords(ev.words, d);
    T = null; mode = 'result';
    var h = '<p class="voc-grade"><span>' + ev.n + '</span>Note im Übungsdiktat (' + GW[ev.n] + ')</p>';
    h += '<p>' + ev.f + ' Fehler' + (ev.punctErr ? ' (davon ' + Math.floor(ev.punctErr / 2) + ' für ' + ev.punctErr + ' Satzzeichen)' : '') + '.</p>';
    h += '<p class="voc-how">' + (ev.n <= 2 ? 'Super gemacht' : ev.n === 3 ? 'Gut! Mit den Fehlerwörtern wird es noch besser' : 'Dranbleiben – jedes Diktat macht dich sicherer') + '! <span class="dk-ok">Grün</span> = richtig. <span class="dk-bad">Rot</span> = so hast du geschrieben, darunter steht das richtige Wort.</p>';
    h += '<div class="dk-sol dk-res">' + ev.rows.map(function (row) {
      return (row.k === 0 ? '<b>' : '') + row.al.map(function (a, x) {
        var sp = x && !(a.ok && isP(a.e)) ? ' ' : '';
        if (a.ok) return sp + '<span class="dk-ok">' + esc(a.e) + '</span>';
        if (!a.e) return sp + '<span class="dk-bad dk-extra">' + esc(a.g) + '</span>';
        return sp + '<span class="dk-fix"><span class="dk-bad">' + (a.g ? esc(a.g) : '⎵') + '</span><span class="dk-right">' + esc(a.e) + '</span></span>';
      }).join('') + (row.k === 0 ? '</b><br>' : '');
    }).join(' ') + '</div>';
    if (ev.words.length) h += '<p class="de-plan"><b>Deine Fehlerwörter:</b> ' + ev.words.map(esc).join(' · ') + '<br>Sie kommen ins Fehlerwort-Training, bis du jedes zweimal richtig geschrieben hast.</p>';
    h += '<p class="note">Notenschlüssel: 0–1 Fehler = 1 · 2–3 = 2 · 4–6 = 3 · 7–9 = 4 · 10–12 = 5 · ab 13 = 6. Gleicher Fehler zählt einmal, zwei Satzzeichen = 1 Fehler. Die Lehrerin kann anders werten.</p>';
    h += '<div class="voc-row">' + (ev.words.length ? '<button type="button" class="btn primary" data-dk-words="1">Fehlerwörter jetzt üben</button>' : '') + '<button type="button" class="btn" data-dk-list="1">Zur Übersicht</button></div>';
    box.innerHTML = h; box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.LU5Plan) window.LU5Plan();
  }

  /* ---------- Fehlerwort-Training ---------- */
  var WKEY = 'lu5-diktat-woerter', W = null;
  function words() { try { return JSON.parse(localStorage.getItem(WKEY)) || []; } catch (e) { return []; } }
  function saveWords(a) { try { localStorage.setItem(WKEY, JSON.stringify(a)); } catch (e) {} }
  function addWords(list, d) {
    var a = words(), sents = sentences(d).map(plain);
    list.forEach(function (w) {
      var s = sents.filter(function (x) { return x.indexOf(w) !== -1; })[0] || '';
      var have = a.filter(function (x) { return x.w === w; })[0];
      if (have) have.ok = 0; else a.push({ w: w, s: s, ok: 0 });
    });
    saveWords(a.slice(-40));
  }
  function wStart() { stopAll(); P = null; T = null; var a = words(); if (!a.length) { renderList(); return; } W = { q: a.map(function (x) { return x.w; }), i: 0, fb: '', fbOk: null }; mode = 'words'; wRender(); wSay(); }
  function wCur() { var w = W.q[W.i]; return words().filter(function (x) { return x.w === w; })[0] || { w: w, s: '' }; }
  function wSay() { if (!hasTTS || !voice || !W || W.i >= W.q.length) return; var c = wCur(); try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(c.w + '. ' + (c.s ? c.s + ' ' : '') + c.w + '.'); u.voice = voice; u.lang = voice.lang || 'de-DE'; u.rate = 0.75; speechSynthesis.speak(u); } catch (e) {} }
  function wRender() {
    if (!W) return;
    if (W.i >= W.q.length) { W = null; var left = words().length; box.innerHTML = '<h2>Geschafft!</h2><p>' + (left ? 'Noch ' + left + ' Wörter brauchen ein zweites Mal richtig – beim nächsten Training.' : 'Alle Fehlerwörter sitzen. Stark!') + '</p><div class="voc-row"><button type="button" class="btn primary" data-dk-list="1">Zur Übersicht</button></div>'; return; }
    var c = wCur();
    var h = '<p class="voc-eyebrow">Fehlerwort-Training · ' + (W.i + 1) + ' von ' + W.q.length + '</p>';
    h += '<p class="voc-how">Hör dir das Wort im Satz an und schreib nur das Wort. Achte auf groß und klein!</p>';
    if (!hasTTS || !voice) h += '<p class="dk-sol">' + esc(c.s.replace(c.w, '___')) + '</p>';
    h += '<form class="voc-form" id="dkWForm"><input id="dkWIn" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Das Wort …" aria-label="Wort"' + (W.fbOk != null ? ' disabled' : '') + '><button class="btn primary" type="submit"' + (W.fbOk != null ? ' disabled' : '') + '>Prüfen</button></form>';
    if (W.fb) h += '<p class="voc-fb ' + (W.fbOk ? 'good' : 'soft') + '">' + W.fb + '</p>';
    h += '<div class="voc-row"><button type="button" class="btn" data-dk-wsay="1">🔊 Anhören</button>' + (W.fbOk != null ? '<button type="button" class="btn primary" data-dk-wnext="1">Weiter</button>' : '') + '<button type="button" class="btn small de-quit" data-dk-list="1">Beenden</button></div>';
    box.innerHTML = h; var inp = $('dkWIn'); if (inp && W.fbOk == null) inp.focus({ preventScroll: true });
  }
  function wCheck(v) {
    var c = wCur(); v = String(v).trim(); if (!v || W.fbOk != null) return;
    var a = words(), it = a.filter(function (x) { return x.w === c.w; })[0];
    if (v === c.w) {
      if (it) { it.ok++; if (it.ok >= 2) a = a.filter(function (x) { return x !== it; }); saveWords(a); }
      W.fbOk = true; W.fb = '✓ Richtig: <b>' + esc(c.w) + '</b>' + (it && it.ok >= 2 ? ' – sitzt jetzt!' : ' – beim nächsten Training noch einmal.');
    } else {
      if (it) { it.ok = 0; saveWords(a); }
      W.fbOk = false; W.fb = 'Richtig ist <b>' + esc(c.w) + '</b>. Du hattest: ' + esc(v) + '. Schreib es einmal ins Heft.';
    }
    wRender();
  }
  document.addEventListener('click', function (e) {
    var tb = e.target.closest && e.target.closest('[data-dk-type],[data-dk-thear],[data-dk-tnext],[data-dk-tall],[data-dk-tsubmit],[data-dk-ttempo],[data-dk-words],[data-dk-wsay],[data-dk-wnext]');
    if (!tb) return;
    if (tb.dataset.dkType) { tStart(tb.dataset.dkType); return; }
    if (tb.dataset.dkWords) { wStart(); return; }
    if (tb.dataset.dkWsay) { wSay(); return; }
    if (tb.dataset.dkWnext) { W.i++; W.fb = ''; W.fbOk = null; wRender(); wSay(); return; }
    if (!T) return;
    if (tb.dataset.dkThear) { tCollect(); tSay(T.phase === 'write' ? unitSteps(T.units[T.u]) : [], tReady); return; }
    if (tb.dataset.dkTnext) { tNext(); return; }
    if (tb.dataset.dkTall) { tCollect(); tSay([{ say: T.d.title + '. ' + plain(T.d.text), rate: 0.8, wait: 0 }]); return; }
    if (tb.dataset.dkTsubmit) { tSubmit(); return; }
    if (tb.dataset.dkTtempo) { T.tempo = tb.dataset.dkTtempo; try { localStorage.setItem('lu5-diktat-tempo', JSON.stringify(T.tempo)); } catch (e2) {} tCollect(); tRender(); return; }
  });
  document.addEventListener('submit', function (e) { if (e.target && e.target.id === 'dkWForm') { e.preventDefault(); wCheck($('dkWIn').value); } });

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-dk-start],[data-dk-check],[data-dk-pause],[data-dk-again],[data-dk-end],[data-dk-tempo],[data-dk-list]'); if (!b) return;
    if (b.dataset.dkStart) { start(b.dataset.dkStart); return; }
    if (b.dataset.dkCheck) { showCheck(b.dataset.dkCheck); return; }
    if (b.dataset.dkList) { stopAll(); P = null; T = null; W = null; renderList(); return; }
    if (!P) return;
    if (b.dataset.dkPause) { P.paused = !P.paused; if (P.paused) { stopAll(); renderPlayer(); } else speakStep(); return; }
    if (b.dataset.dkAgain) { stopAll(); var s = P.steps[P.i].s; var j = P.i; while (j > 0 && P.steps[j - 1].s === s) j--; P.i = j; P.paused = false; speakStep(); return; }
    if (b.dataset.dkEnd) { finishDictation(); return; }
    if (b.dataset.dkTempo) { P.tempo = b.dataset.dkTempo; try { localStorage.setItem('lu5-diktat-tempo', JSON.stringify(P.tempo)); } catch (e2) {} renderPlayer(); return; }
  });
  document.addEventListener('submit', function (e) { if (e.target && e.target.id === 'dkForm') { e.preventDefault(); submit(); } });

  /* ---------- für den Tagesplan ---------- */
  function planList(daysLeft, n) {
    var db = load(), k = dayKey(), out = [];
    function doneBefore(id) { return (db[id] || []).some(function (r) { return r.day < k; }); }
    function today(id) { return (db[id] || []).some(function (r) { return r.day === k; }); }
    function has(d) { return out.some(function (o) { return o.d === d; }); }
    DATA.filter(function (d) { return today(d.id); }).forEach(function (t) { out.push({ d: t, nr: DATA.indexOf(t) + 1, done: true, again: doneBefore(t.id) }); });
    while (out.length < n) {
      var open = DATA.filter(function (d) { return !doneBefore(d.id) && !today(d.id) && !has(d); });
      var anyDone = DATA.some(function (d) { return doneBefore(d.id); });
      if (open.length && !(daysLeft === 1 && anyDone)) { out.push({ d: open[0], nr: DATA.indexOf(open[0]) + 1, done: false }); continue; }
      var rest = DATA.filter(function (d) { return !has(d) && !today(d.id); });
      if (!rest.length) break;
      var worst = rest.sort(function (a, b) { var la = (db[a.id] || []).slice(-1)[0], lb = (db[b.id] || []).slice(-1)[0]; return (lb ? lb.f : -1) - (la ? la.f : -1); })[0];
      out.push({ d: worst, nr: DATA.indexOf(worst) + 1, done: false, again: true });
    }
    return out;
  }
  function planPick(daysLeft) { return planList(daysLeft, 1)[0]; }
  window.LU5Dikt = {
    open: function (id) { box = $('deDikt'); if (!box) return; if (id) { renderList(); var el = box.querySelector('[data-dk-start="' + id + '"]'); if (el) el.closest('.pr-card').classList.add('dk-hl'); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else if (mode === 'list' || !P) renderList(); },
    plan: planPick, planList: planList, count: DATA.length, _eval: function (id, inputs) { return evaluate(byId(id), inputs); }, words: words
  };
  box = $('deDikt'); renderList();
  if (window.LU5Plan) window.LU5Plan();
})();

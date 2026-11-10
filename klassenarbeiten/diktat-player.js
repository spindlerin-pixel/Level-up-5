/* =====================================================================
   Level Up 5 · Übungsdiktate (Diktat am 25.11.2026)
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
  function stopAll() { if (P) clearTimeout(P.timer); try { speechSynthesis.cancel(); } catch (e) {} }
  function finishDictation() { stopAll(); var id = P.d.id; P = null; showCheck(id); }

  /* ---------- Anzeige ---------- */
  var box = null, mode = 'list', curId = null;
  function results() { return load(); }
  function lastRes(id) { var r = results()[id] || []; return r[r.length - 1] || null; }
  function statusTxt(id) { var r = results()[id] || []; if (!r.length) return ''; var l = r[r.length - 1]; return 'Zuletzt: ' + l.f + ' Fehler · Note ' + l.n + (r.length > 1 ? ' · ' + r.length + '× geschrieben' : ''); }
  function renderList() {
    mode = 'list'; curId = null; if (!box) return;
    var h = '<p class="voc-eyebrow">Übungsdiktat am Mittwoch, 25.11. · diktieren, kontrollieren, Note</p>';
    h += '<p class="voc-how">So geht’s: Heft und Stift bereitlegen. Die App diktiert langsam wie deine Lehrerin: erst den ganzen Satz, dann in kleinen Stücken mit Pausen zum Schreiben. Satzzeichen werden angesagt. Danach kontrolliert ihr mit der Lösung und tragt die Fehler ein. Mama oder Papa können auch aus dem PDF vorlesen.</p>';
    h += '<p class="de-plan"><b>Plan:</b> ab Dienstag, 17.11. jeden Tag ein Diktat (mittwochs frei) · Dienstag, 24.11.: das schwächste noch einmal · <b>Fehlerwörter</b> danach 3× ins Heft.</p>';
    h += '<div class="pr-list">' + DATA.map(function (d, k) {
      var s = statusTxt(d.id);
      return '<div class="pr-card" style="--pc:' + ['#FFD66B', '#8FD3FF', '#B9E6B0', '#FFB3C7', '#9FE3D6', '#C9B8FF'][k % 6] + '"><span class="pr-num">' + (k + 1) + '</span><div class="pr-txt"><h3>' + esc(d.title) + '<span class="pr-lvl">' + esc(d.lvl) + '</span></h3><p>' + esc(d.focus) + ' · ' + d.n + ' Wörter</p>' + (s ? '<p class="pr-status">' + esc(s) + '</p>' : '') + '</div><div class="pr-acts"><button type="button" class="pr-open pr-tab" data-dk-start="' + d.id + '">🔊 Diktieren</button><a class="pr-open" href="klassenarbeiten/diktate/Uebungsdiktat-' + (k + 1) + '.pdf" target="_blank" rel="noopener">📄 PDF</a><button type="button" class="pr-open" data-dk-check="' + d.id + '">✓ Kontrolle</button></div></div>';
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
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-dk-start],[data-dk-check],[data-dk-pause],[data-dk-again],[data-dk-end],[data-dk-tempo],[data-dk-list]'); if (!b) return;
    if (b.dataset.dkStart) { start(b.dataset.dkStart); return; }
    if (b.dataset.dkCheck) { showCheck(b.dataset.dkCheck); return; }
    if (b.dataset.dkList) { stopAll(); P = null; renderList(); return; }
    if (!P) return;
    if (b.dataset.dkPause) { P.paused = !P.paused; if (P.paused) { stopAll(); renderPlayer(); } else speakStep(); return; }
    if (b.dataset.dkAgain) { stopAll(); var s = P.steps[P.i].s; var j = P.i; while (j > 0 && P.steps[j - 1].s === s) j--; P.i = j; P.paused = false; speakStep(); return; }
    if (b.dataset.dkEnd) { finishDictation(); return; }
    if (b.dataset.dkTempo) { P.tempo = b.dataset.dkTempo; try { localStorage.setItem('lu5-diktat-tempo', JSON.stringify(P.tempo)); } catch (e2) {} renderPlayer(); return; }
  });
  document.addEventListener('submit', function (e) { if (e.target && e.target.id === 'dkForm') { e.preventDefault(); submit(); } });

  /* ---------- für den Tagesplan ---------- */
  function planPick(daysLeft) {
    var db = load(), k = dayKey();
    function doneBefore(id) { return (db[id] || []).some(function (r) { return r.day < k; }); }
    function today(id) { return (db[id] || []).some(function (r) { return r.day === k; }); }
    var t = DATA.filter(function (d) { return today(d.id); })[0]; if (t) return { d: t, nr: DATA.indexOf(t) + 1, done: true, again: doneBefore(t.id) };
    var open = DATA.filter(function (d) { return !doneBefore(d.id); });
    if (open.length && !(daysLeft === 1 && open.length < DATA.length)) return { d: open[0], nr: DATA.indexOf(open[0]) + 1, done: false };
    var worst = DATA.slice().sort(function (a, b) { var la = (db[a.id] || []).slice(-1)[0], lb = (db[b.id] || []).slice(-1)[0]; return (lb ? lb.f : -1) - (la ? la.f : -1); })[0];
    return { d: worst, nr: DATA.indexOf(worst) + 1, done: false, again: true };
  }
  window.LU5Dikt = {
    open: function (id) { box = $('deDikt'); if (!box) return; if (id) { renderList(); var el = box.querySelector('[data-dk-start="' + id + '"]'); if (el) el.closest('.pr-card').classList.add('dk-hl'); box.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else if (mode === 'list' || !P) renderList(); },
    plan: planPick, count: DATA.length
  };
  box = $('deDikt'); renderList();
  if (window.LU5Plan) window.LU5Plan();
})();

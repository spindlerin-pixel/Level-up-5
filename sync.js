/* =====================================================================
   Level Up 5 · Geräte-Abgleich (Handy ↔ Tablet)
   Einmal verbinden (Verbindungs-Wort), danach läuft alles von allein:
   - beim Öffnen und beim Zurückkehren in die App wird der neueste Stand geholt
   - jede Änderung wird nach kurzer Zeit hochgeladen
   Jeder Speicher-Eintrag bekommt einen Zeitstempel, der neuere gewinnt.
   Muss VOR allen anderen Skripten geladen werden.
   ===================================================================== */
(function () {
  var LS; try { LS = window.localStorage; LS.getItem('x'); } catch (e) { return; }
  var ID_KEY = 'lu5-sync-id', META_KEY = 'lu5-sync-meta', LAST_KEY = 'lu5-sync-last';
  var LOCAL_ONLY = { 'lu5-sync-id': 1, 'lu5-sync-meta': 1, 'lu5-sync-last': 1, 'en-stimme': 1 };
  var API = '/api/sync';
  var proto = Object.getPrototypeOf(LS), rawSet = proto.setItem, rawRemove = proto.removeItem;
  function set(k, v) { rawSet.call(LS, k, v); }
  function del(k) { rawRemove.call(LS, k); }
  function id() { return LS.getItem(ID_KEY) || ''; }
  function meta() { try { return JSON.parse(LS.getItem(META_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function saveMeta(m) { set(META_KEY, JSON.stringify(m)); }

  /* Beim Start schreibt die App ein paar Dinge von selbst – die zählen nicht als neue Änderung */
  var quiet = true; setTimeout(function () { quiet = false; }, 2500);
  var pushTimer = null;
  function stamp(k) {
    if (LOCAL_ONLY[k] || quiet || !id()) return;
    var m = meta(); m[k] = Date.now(); saveMeta(m);
    clearTimeout(pushTimer); pushTimer = setTimeout(function () { push(); }, 1500);
  }
  proto.setItem = function (k, v) { rawSet.call(this, k, v); if (this === LS) stamp(String(k)); };
  proto.removeItem = function (k) { rawRemove.call(this, k); if (this === LS) stamp(String(k)); };

  function localKeys() {
    var m = meta(), out = {};
    for (var i = 0; i < LS.length; i++) { var k = LS.key(i); if (k && !LOCAL_ONLY[k]) out[k] = { v: LS.getItem(k), t: m[k] || 0 }; }
    for (var k2 in m) if (!(k2 in out) && !LOCAL_ONLY[k2]) out[k2] = { v: null, t: m[k2] };
    return out;
  }
  /* Neuere Einträge vom Server übernehmen. Gibt true zurück, wenn sich etwas geändert hat. */
  function apply(remote) {
    var m = meta(), changed = false;
    for (var k in remote) {
      if (LOCAL_ONLY[k]) continue;
      var e = remote[k]; if (!e || !(e.t > (m[k] || 0))) continue;
      if (e.v === null) { if (LS.getItem(k) !== null) { del(k); changed = true; } }
      else if (LS.getItem(k) !== e.v) { set(k, e.v); changed = true; }
      m[k] = e.t;
    }
    saveMeta(m);
    return changed;
  }
  function needsPush(remote) {
    var L = localKeys();
    for (var k in L) if (L[k].t > 0 && (!remote[k] || L[k].t > remote[k].t)) return true;
    return false;
  }
  function done() { set(LAST_KEY, String(Date.now())); fire(); }
  var listeners = [];
  function fire() { listeners.forEach(function (f) { try { f(); } catch (e) {} }); }

  function push(keepalive) {
    if (!id()) return Promise.resolve(false);
    var body = JSON.stringify({ id: id(), keys: localKeys() });
    return fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: body, keepalive: !!keepalive && body.length < 60000 })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { var c = apply(d.keys || {}); done(); return c; })
      .catch(function () { return false; });
  }
  /* Neuesten Stand holen; bei Änderungen die App neu laden, damit sie ihn anzeigt */
  function pull(reload) {
    if (!id()) return Promise.resolve(false);
    return fetch(API + '?id=' + encodeURIComponent(id()), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        var remote = d.keys || {}, changed = apply(remote);
        if (needsPush(remote)) push();
        done();
        if (changed && reload) {
          var last = Number(sessionStorage.getItem('lu5-sync-rl') || 0);
          if (Date.now() - last > 15000) { sessionStorage.setItem('lu5-sync-rl', String(Date.now())); location.reload(); }
        }
        return changed;
      })
      .catch(function () { return false; });
  }

  /* Verbindungs-Wort: leicht zu tippen, z. B. "sonne-tiger-27" */
  var W1 = ['sonne', 'mond', 'stern', 'wolke', 'regen', 'blitz', 'apfel', 'birne', 'kirsche', 'banane', 'zitrone', 'tomate', 'blume', 'baum', 'wiese', 'berg', 'insel', 'meer', 'fluss', 'wald'];
  var W2 = ['tiger', 'pferd', 'katze', 'hase', 'eule', 'fuchs', 'panda', 'delfin', 'pinguin', 'zebra', 'koala', 'otter', 'igel', 'biber', 'falke', 'lama', 'wal', 'dachs', 'loewe', 'elch'];
  function rnd(n) { var a = new Uint32Array(1); (window.crypto || window.msCrypto).getRandomValues(a); return a[0] % n; }
  function newCode() { return W1[rnd(W1.length)] + '-' + W2[rnd(W2.length)] + '-' + (10 + rnd(90)) + '-' + (10 + rnd(90)); }
  function norm(c) { return String(c || '').toLowerCase().trim().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

  window.LU5Sync = {
    id: id,
    last: function () { return Number(LS.getItem(LAST_KEY) || 0); },
    onChange: function (f) { listeners.push(f); },
    /* Erstes Gerät: neues Wort, der ganze Lernstand wird hochgeladen */
    create: function () {
      var c = newCode(), m = meta(), now = Date.now();
      for (var i = 0; i < LS.length; i++) { var k = LS.key(i); if (k && !LOCAL_ONLY[k]) m[k] = now; }
      set(ID_KEY, c); saveMeta(m); arm();
      return push().then(function () { return c; });
    },
    /* Weiteres Gerät: der Stand vom Server ersetzt den Stand auf diesem Gerät */
    join: function (code) {
      var c = norm(code);
      if (!/^[a-z0-9-]{8,60}$/.test(c)) return Promise.resolve({ ok: false, why: 'Das Wort sieht nicht richtig aus.' });
      return fetch(API + '?id=' + encodeURIComponent(c), { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (d) {
          var remote = d.keys || {};
          if (!Object.keys(remote).length) return { ok: false, why: 'Zu diesem Wort gibt es noch keinen Lernstand. Bitte genau so eintippen wie auf dem ersten Gerät.' };
          set(ID_KEY, c); saveMeta({});
          apply(remote); done();
          return { ok: true };
        })
        .catch(function () { return { ok: false, why: 'Keine Verbindung zum Internet. Bitte später nochmal versuchen.' }; });
    },
    leave: function () { del(ID_KEY); del(META_KEY); del(LAST_KEY); fire(); },
    now: function () { return pull(true); }
  };

  var armed = false;
  function arm() {
    if (armed) return; armed = true;
    document.addEventListener('visibilitychange', function () {
      if (!id()) return;
      if (document.visibilityState === 'visible') pull(true);
      else { clearTimeout(pushTimer); push(true); }
    });
    window.addEventListener('pagehide', function () { if (id()) push(true); });
  }
  if (id()) { arm(); pull(true); }
})();

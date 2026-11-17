/* HisaabMitra Secret Santa generator. Runs only in your browser: nothing is sent anywhere. */
(function (root) {
  'use strict';
  function clean(s) { return String(s).replace(/\s+/g, ' ').trim(); }
  function key(s) { return clean(s).toLowerCase(); }

  // Parse names (one per line). Returns {names, errors}
  function parseNames(text) {
    var names = [], seen = {}, errors = [];
    String(text || '').split(/\r?\n/).forEach(function (l) {
      var n = clean(l);
      if (!n) return;
      if (n.length > 60) n = n.slice(0, 60);
      var k = key(n);
      if (seen[k]) { errors.push('"' + n + '" is listed twice. Add a surname or initial so each name is different.'); return; }
      seen[k] = 1; names.push(n);
    });
    return { names: names, errors: errors };
  }

  // Parse exclusions: each line is a group of names (separated by , & + / or "and") who must not draw each other.
  function parseExclusions(text, names) {
    var idx = {}, pairs = [], warnings = [];
    names.forEach(function (n, i) { idx[key(n)] = i; });
    String(text || '').split(/\r?\n/).forEach(function (l) {
      if (!clean(l)) return;
      var parts = l.split(/\s*(?:,|&|\+|\/|;|\band\b)\s*/i).map(clean).filter(Boolean);
      var ids = [];
      parts.forEach(function (p) {
        if (idx.hasOwnProperty(key(p))) { var i = idx[key(p)]; if (ids.indexOf(i) < 0) ids.push(i); }
        else warnings.push('Exclusion name "' + p + '" is not in the participant list, so it was ignored.');
      });
      if (parts.length === 1) warnings.push('Exclusion line "' + clean(l) + '" needs at least two names.');
      for (var a = 0; a < ids.length; a++) for (var b = a + 1; b < ids.length; b++) pairs.push([ids[a], ids[b]]);
    });
    return { pairs: pairs, warnings: warnings };
  }

  // allowed[i][j] = true if giver i may buy for receiver j
  function buildAllowed(n, pairs) {
    var A = [];
    for (var i = 0; i < n; i++) { A.push([]); for (var j = 0; j < n; j++) A[i].push(i !== j); }
    (pairs || []).forEach(function (p) { A[p[0]][p[1]] = false; A[p[1]][p[0]] = false; });
    return A;
  }

  function shuffle(a, rnd) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function valid(perm, A) {
    if (!perm || perm.length !== A.length) return false;
    var used = {};
    for (var i = 0; i < perm.length; i++) { if (!A[i][perm[i]] || used[perm[i]]) return false; used[perm[i]] = 1; }
    return true;
  }

  // Randomised Kuhn bipartite matching: finds a valid assignment if one exists, else null.
  function match(A, rnd) {
    var n = A.length, recvOf = new Array(n).fill(-1), giverOf = new Array(n).fill(-1);
    var adj = A.map(function (row) { var c = []; row.forEach(function (ok, j) { if (ok) c.push(j); }); return shuffle(c, rnd); });
    function tryG(g, seen) {
      for (var k = 0; k < adj[g].length; k++) {
        var r = adj[g][k];
        if (seen[r]) continue; seen[r] = 1;
        if (giverOf[r] < 0 || tryG(giverOf[r], seen)) { giverOf[r] = g; recvOf[g] = r; return true; }
      }
      return false;
    }
    var order = shuffle(Array.from({ length: n }, function (_, i) { return i; }), rnd);
    for (var o = 0; o < n; o++) if (!tryG(order[o], {})) return null;
    return recvOf;
  }

  // Main: returns {ok, perm, error}. perm[i] = index of person i buys for.
  function draw(n, pairs, rnd) {
    rnd = rnd || Math.random;
    if (n < 3) return { ok: false, error: 'Add at least 3 names. With 2 people, each would simply buy for the other.' };
    var A = buildAllowed(n, pairs);
    for (var i = 0; i < n; i++) if (A[i].every(function (x) { return !x; })) return { ok: false, error: 'Person ' + (i + 1) + ' is excluded from everyone, so they cannot draw anyone. Remove some exclusions.' };
    // 1) Unbiased: random shuffles until one fits (fast when exclusions are few)
    var ids = Array.from({ length: n }, function (_, i) { return i; });
    for (var t = 0; t < 3000; t++) { var p = shuffle(ids.slice(), rnd); if (valid(p, A)) return { ok: true, perm: p }; }
    // 2) Many exclusions: exact search (also proves when it is impossible)
    var m = match(A, rnd);
    if (m && valid(m, A)) return { ok: true, perm: m };
    return { ok: false, error: 'No valid draw is possible with these exclusions. Usually one group (for example a family) is more than half of all participants. Remove an exclusion or add more people.' };
  }

  var api = { parseNames: parseNames, parseExclusions: parseExclusions, buildAllowed: buildAllowed, draw: draw, valid: valid };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  root.SecretSanta = api;

  // ---------- UI ----------
  var $ = function (i) { return document.getElementById(i); };
  if (!$('ss-form')) return;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var last = null;
  function cryptoRnd() {
    if (root.crypto && root.crypto.getRandomValues) { var u = new Uint32Array(1); root.crypto.getRandomValues(u); return u[0] / 4294967296; }
    return Math.random();
  }
  function budgetText() {
    var b = parseFloat($('ss-budget').value), c = $('ss-cur').value;
    if (!(b > 0)) return '';
    return c === 'INR' ? '₹' + b.toLocaleString('en-IN') : '$' + b.toLocaleString('en-US');
  }
  function msgFor(g, r) {
    var b = budgetText(), ev = clean($('ss-event').value);
    return 'Hi ' + g + '! For our Secret Santa' + (ev ? ' (' + ev + ')' : '') + ' you are buying a gift for ' + r + '.' + (b ? ' Budget: up to ' + b + '.' : '') + ' Keep it a secret! 🎁';
  }
  function status(html, kind) { var s = $('ss-status'); s.className = 'ss-status ' + (kind || ''); s.innerHTML = html; }
  function run(e) {
    if (e) e.preventDefault();
    var pn = parseNames($('ss-names').value);
    if (pn.errors.length) { last = null; $('ss-out').innerHTML = ''; return status(pn.errors.map(esc).join('<br>'), 'err'); }
    var ex = parseExclusions($('ss-ex').value, pn.names);
    var res = draw(pn.names.length, ex.pairs, cryptoRnd);
    if (!res.ok) { last = null; $('ss-out').innerHTML = ''; $('ss-actions').hidden = true; return status(esc(res.error.replace(/Person (\d+)/, function (_, k) { return '"' + pn.names[k - 1] + '"'; })), 'err'); }
    last = { names: pn.names, perm: res.perm };
    var b = budgetText();
    status('✅ Done! ' + pn.names.length + ' people drawn' + (ex.pairs.length ? ', ' + ex.pairs.length + ' exclusion pair(s) respected' : '') + '. Nobody has themselves.' + (b ? ' Budget: ' + esc(b) + '.' : '') + (ex.warnings.length ? '<br><small>' + ex.warnings.map(esc).join('<br>') + '</small>' : ''), 'ok');
    var h = '<ol class="ss-list">';
    pn.names.forEach(function (g, i) {
      var r = pn.names[res.perm[i]];
      h += '<li><span class="ss-g">' + esc(g) + '</span> <span class="ss-arrow" aria-hidden="true">→</span> <span class="ss-r" id="ss-r' + i + '" hidden>' + esc(r) + '</span>' +
        '<span class="ss-btns"><button type="button" class="btn ghost ss-sm" data-rev="' + i + '" aria-expanded="false" aria-controls="ss-r' + i + '">Reveal</button>' +
        '<button type="button" class="btn ghost ss-sm" data-msg="' + i + '" aria-label="Copy message for ' + esc(g) + '">Copy message</button></span></li>';
    });
    $('ss-out').innerHTML = h + '</ol>';
    $('ss-actions').hidden = false;
    $('ss-out').focus();
  }
  function copy(text, okMsg) {
    var done = function () { status(okMsg, 'ok'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) { status('Could not copy. Please select and copy manually.', 'err'); } t.remove(); }
  }
  $('ss-form').addEventListener('submit', run);
  $('ss-out').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || !last) return;
    if (b.dataset.rev) { var s = $('ss-r' + b.dataset.rev), show = s.hidden; s.hidden = !show; b.textContent = show ? 'Hide' : 'Reveal'; b.setAttribute('aria-expanded', show); }
    if (b.dataset.msg) { var i = +b.dataset.msg; copy(msgFor(last.names[i], last.names[last.perm[i]]), 'Copied the message for ' + esc(last.names[i]) + '. Paste it into WhatsApp, SMS or email to send it only to them.'); }
  });
  $('ss-copyall').addEventListener('click', function () {
    if (!last) return;
    var b = budgetText(), ev = clean($('ss-event').value);
    var t = 'Secret Santa' + (ev ? ' – ' + ev : '') + (b ? ' (budget ' + b + ')' : '') + '\n' + last.names.map(function (g, i) { return g + ' → ' + last.names[last.perm[i]]; }).join('\n');
    copy(t, 'Copied the full list (it shows every match, so keep it private).');
  });
  $('ss-print').addEventListener('click', function () {
    if (!last) return;
    var b = budgetText(), ev = clean($('ss-event').value), h = '';
    last.names.forEach(function (g, i) { h += '<div class="ss-slip"><b>' + esc(g) + '</b>, you are Secret Santa for: <span>' + esc(last.names[last.perm[i]]) + '</span>' + (b ? '<small>Budget: up to ' + esc(b) + '</small>' : '') + (ev ? '<small>' + esc(ev) + '</small>' : '') + '</div>'; });
    $('ss-slips').innerHTML = h; root.print();
  });
  $('ss-hide').addEventListener('click', function () {
    document.querySelectorAll('.ss-r').forEach(function (s) { s.hidden = true; });
    document.querySelectorAll('[data-rev]').forEach(function (b) { b.textContent = 'Reveal'; b.setAttribute('aria-expanded', 'false'); });
  });
  $('ss-again').addEventListener('click', function () { run(); });
})(typeof window !== 'undefined' ? window : this);

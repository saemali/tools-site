/* HisaabMitra Christmas Gift Budget Planner. Runs only in your browser. If "Remember on this device" is ticked,
   your list is kept in this browser's localStorage and nowhere else. Nothing is sent to any server. */
(function (root) {
  'use strict';
  var KEY = 'hm-gift-budget-v1', MAXP = 200;
  var CUR = { INR: ['₹', 'en-IN'], USD: ['$', 'en-US'], GBP: ['£', 'en-GB'], EUR: ['€', 'en-IE'], AED: ['AED', 'en-AE'], CAD: ['C$', 'en-CA'], AUD: ['A$', 'en-AU'] };
  var GROUPS = { partner: 'Partner', family: 'Family', kids: 'Kids', friends: 'Friends', work: 'Work', other: 'Other' };
  var WEIGHT = { partner: 4, family: 3, kids: 3, friends: 2, work: 1, other: 1 };
  var STATUS = { idea: 'Still to buy', bought: 'Bought', wrapped: 'Wrapped', given: 'Given' };

  function num(v) {
    if (typeof v === 'number') return isFinite(v) && v > 0 ? Math.round(v * 100) / 100 : 0;
    var n = parseFloat(String(v == null ? '' : v).replace(/[,\s₹$£€]/g, ''));
    return isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0;
  }
  function fmt(n, cur) {
    var c = CUR[cur] || CUR.INR, neg = n < 0, a = Math.abs(n), whole = Math.round(a) === a;
    var s;
    try { s = a.toLocaleString(c[1], { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 }); }
    catch (e) { s = whole ? String(a) : a.toFixed(2); }
    return (neg ? '−' : '') + c[0] + (c[0].length > 1 ? ' ' : '') + s;
  }
  function blank() { return { title: '', cur: 'INR', total: 0, extras: 0, people: [] }; }
  function person(p) {
    p = p || {};
    return {
      name: String(p.name || '').slice(0, 60), group: GROUPS[p.group] ? p.group : 'family',
      budget: num(p.budget), idea: String(p.idea || '').slice(0, 120), spent: num(p.spent),
      status: STATUS[p.status] ? p.status : 'idea'
    };
  }
  function sanitize(o) {
    var s = blank();
    if (!o || typeof o !== 'object') return s;
    s.title = String(o.title || '').slice(0, 60);
    s.cur = CUR[o.cur] ? o.cur : 'INR';
    s.total = num(o.total); s.extras = num(o.extras);
    s.people = Array.isArray(o.people) ? o.people.slice(0, MAXP).map(person) : [];
    return s;
  }
  function r2(n) { return Math.round(n * 100) / 100; }
  function summary(s) {
    var allocated = 0, giftsSpent = 0, counts = { idea: 0, bought: 0, wrapped: 0, given: 0 }, over = [], noBudget = 0;
    s.people.forEach(function (p) {
      allocated += p.budget; giftsSpent += p.spent; counts[p.status]++;
      if (p.budget > 0 && p.spent > p.budget) over.push({ name: p.name || 'Someone', by: r2(p.spent - p.budget) });
      if (!p.budget) noBudget++;
    });
    allocated = r2(allocated); giftsSpent = r2(giftsSpent);
    var budget = s.total > 0 ? s.total : r2(allocated + s.extras);
    var spent = r2(giftsSpent + s.extras);
    var planned = r2(allocated + s.extras);
    var stillPlanned = 0;
    s.people.forEach(function (p) { if (p.status === 'idea') stillPlanned += Math.max(0, p.budget - p.spent); });
    stillPlanned = r2(stillPlanned);
    return {
      budget: budget, usesTotal: s.total > 0, allocated: allocated, planned: planned, giftsSpent: giftsSpent, spent: spent,
      remaining: r2(budget - spent), unallocated: r2(budget - planned), stillPlanned: stillPlanned,
      projected: r2(spent + stillPlanned), pct: budget > 0 ? Math.round(spent / budget * 100) : 0,
      people: s.people.length, done: s.people.length - counts.idea, counts: counts, over: over, noBudget: noBudget
    };
  }
  /* Share (total - extras) between people. mode 'even' or 'weighted' (closer people get more). Whole currency units;
     leftover units go to the highest-weight people first, so the shares always add up exactly. */
  function split(total, extras, people, mode) {
    var pot = Math.floor(Math.max(0, num(total) - num(extras)));
    var n = people.length; if (!n) return [];
    var w = people.map(function (p) { return mode === 'weighted' ? (WEIGHT[p.group] || 1) : 1; });
    var W = w.reduce(function (a, b) { return a + b; }, 0);
    var raw = w.map(function (x) { return pot * x / W; });
    var out = raw.map(Math.floor), left = pot - out.reduce(function (a, b) { return a + b; }, 0);
    var order = raw.map(function (x, i) { return { i: i, f: x - Math.floor(x), w: w[i] }; })
      .sort(function (a, b) { return b.f - a.f || b.w - a.w || a.i - b.i; });
    for (var k = 0; k < left; k++) out[order[k % n].i]++;
    return out;
  }
  function cell(v) {
    if (typeof v === 'number') return String(v);
    var s = String(v == null ? '' : v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function toCSV(s) {
    var rows = [['Name', 'Group', 'Budget (' + s.cur + ')', 'Gift idea', 'Spent (' + s.cur + ')', 'Left (' + s.cur + ')', 'Status']];
    s.people.forEach(function (p) { rows.push([p.name, GROUPS[p.group], p.budget, p.idea, p.spent, r2(p.budget - p.spent), STATUS[p.status]]); });
    var m = summary(s);
    rows.push([]); rows.push(['Wrapping, cards and postage', '', '', '', s.extras]);
    rows.push(['Total budget', '', m.budget]); rows.push(['Total spent', '', '', '', m.spent]); rows.push(['Remaining', '', m.remaining]);
    return rows.map(function (r) { return r.map(cell).join(','); }).join('\r\n') + '\r\n';
  }
  function toText(s) {
    var m = summary(s), L = [(s.title || 'Christmas gift list') + ' — budget ' + fmt(m.budget, s.cur) + ', spent ' + fmt(m.spent, s.cur) + ', left ' + fmt(m.remaining, s.cur)];
    s.people.forEach(function (p) {
      L.push((p.status === 'idea' ? '☐ ' : '☑ ') + (p.name || '(no name)') + (p.idea ? ': ' + p.idea : '') + ' (' + fmt(p.spent, s.cur) + ' of ' + fmt(p.budget, s.cur) + ', ' + STATUS[p.status].toLowerCase() + ')');
    });
    if (s.extras) L.push('Wrapping, cards and postage: ' + fmt(s.extras, s.cur));
    return L.join('\n');
  }
  function example(cur) {
    var k = cur === 'INR' ? 1 : 0.025, r = function (x) { return Math.round(x * k); };
    return sanitize({ title: 'Our Christmas gifts 2026', cur: cur, total: r(12000), extras: r(800), people: [
      { name: 'Mum', group: 'family', budget: r(2500), idea: 'Large-print puzzle book + warm socks', spent: r(1900), status: 'bought' },
      { name: 'Dad', group: 'family', budget: r(2500), idea: 'Plant for the balcony', spent: 0, status: 'idea' },
      { name: 'Aisha (7)', group: 'kids', budget: r(2000), idea: 'Craft kit', spent: r(2300), status: 'wrapped' },
      { name: 'Best friend', group: 'friends', budget: r(1500), idea: 'Homemade cookies + card', spent: r(400), status: 'given' },
      { name: 'Class teacher', group: 'work', budget: r(500), idea: 'Thank-you card + chocolates', spent: 0, status: 'idea' }
    ] });
  }
  var api = { num: num, fmt: fmt, sanitize: sanitize, summary: summary, split: split, toCSV: toCSV, toText: toText, example: example, blank: blank, GROUPS: GROUPS, STATUS: STATUS, WEIGHT: WEIGHT, CUR: CUR, KEY: KEY };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  root.GiftBudget = api;

  /* ---------- browser UI ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var st = blank(), remember = true;
  function load() {
    try { var raw = localStorage.getItem(KEY); if (raw) { st = sanitize(JSON.parse(raw)); return true; } } catch (e) {}
    try { remember = localStorage.getItem(KEY + '-off') !== '1'; } catch (e) {}
    return false;
  }
  function save() {
    try { if (remember) localStorage.setItem(KEY, JSON.stringify(st)); else localStorage.removeItem(KEY); } catch (e) {}
  }
  function status(msg, kind) { var el = $('gb-status'); el.innerHTML = msg || ''; el.className = 'ss-status' + (kind ? ' ' + kind : ''); }
  function opts(map, sel) { return Object.keys(map).map(function (k) { return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + map[k] + '</option>'; }).join(''); }
  function sym() { return (CUR[st.cur] || CUR.INR)[0]; }
  function renderList() {
    var box = $('gb-list');
    if (!st.people.length) { box.innerHTML = '<p class="ss-hint">No one on your list yet. Press <b>Add a person</b>, or <b>Try an example</b> to see how it works.</p>'; return; }
    box.innerHTML = '<div class="gb-head" aria-hidden="true"><span>Name</span><span>Group</span><span>Budget</span><span>Gift idea</span><span>Spent</span><span>Status</span><span></span></div>' +
      st.people.map(function (p, i) {
        var id = 'gb' + i;
        return '<div class="gb-row" data-i="' + i + '">' +
          '<label class="gb-f gb-name"><span>Name</span><input data-k="name" maxlength="60" value="' + esc(p.name) + '" placeholder="Who?" aria-label="Name, person ' + (i + 1) + '"></label>' +
          '<label class="gb-f"><span>Group</span><select data-k="group" aria-label="Group, person ' + (i + 1) + '">' + opts(GROUPS, p.group) + '</select></label>' +
          '<label class="gb-f"><span>Budget</span><input data-k="budget" type="number" inputmode="decimal" min="0" step="any" value="' + (p.budget || '') + '" placeholder="0" aria-label="Budget, person ' + (i + 1) + '"></label>' +
          '<label class="gb-f gb-idea"><span>Gift idea</span><input data-k="idea" maxlength="120" value="' + esc(p.idea) + '" placeholder="Idea or link note" aria-label="Gift idea, person ' + (i + 1) + '"></label>' +
          '<label class="gb-f"><span>Spent</span><input data-k="spent" type="number" inputmode="decimal" min="0" step="any" value="' + (p.spent || '') + '" placeholder="0" aria-label="Spent, person ' + (i + 1) + '"></label>' +
          '<label class="gb-f"><span>Status</span><select data-k="status" aria-label="Status, person ' + (i + 1) + '">' + opts(STATUS, p.status) + '</select></label>' +
          '<button type="button" class="btn ghost ss-sm gb-del" data-del="' + i + '" aria-label="Remove ' + esc(p.name || 'person ' + (i + 1)) + '">✕</button>' +
          '<p class="gb-left" id="' + id + '-left"></p></div>';
      }).join('');
    rowNotes();
  }
  function rowNotes() {
    st.people.forEach(function (p, i) {
      var el = $('gb' + i + '-left'); if (!el) return;
      var d = r2(p.budget - p.spent);
      el.className = 'gb-left' + (p.budget && d < 0 ? ' neg' : '');
      el.textContent = !p.budget ? (p.spent ? 'Spent ' + fmt(p.spent, st.cur) + ' (no budget set)' : '') :
        d < 0 ? 'Over by ' + fmt(-d, st.cur) : fmt(d, st.cur) + ' left of ' + fmt(p.budget, st.cur);
    });
  }
  function renderSummary() {
    var m = summary(st), c = st.cur, el = $('gb-sum');
    var bar = Math.min(100, m.pct), over = m.remaining < 0;
    var h = '<p class="ss-hint" style="margin:0">' + (m.usesTotal ? 'Total budget' : 'Budget (sum of per-person budgets + extras)') + '</p>' +
      '<p class="big' + (over ? ' neg' : '') + '" style="margin-bottom:4px">' + (over ? 'Over by ' + fmt(-m.remaining, c) : fmt(m.remaining, c) + ' left') + '</p>' +
      '<div class="gb-bar" role="img" aria-label="' + m.pct + '% of budget spent"><i style="width:' + bar + '%"' + (over ? ' class="o"' : '') + '></i></div>' +
      '<div class="row"><span>Budget</span><b>' + fmt(m.budget, c) + '</b></div>' +
      '<div class="row"><span>Spent so far (gifts + extras)</span><b>' + fmt(m.spent, c) + ' · ' + m.pct + '%</b></div>' +
      '<div class="row"><span>Still planned for people not bought for yet</span><b>' + fmt(m.stillPlanned, c) + '</b></div>' +
      '<div class="row"><span>Likely total if you stick to the plan</span><b class="' + (m.projected > m.budget ? 'neg' : '') + '">' + fmt(m.projected, c) + '</b></div>';
    if (m.usesTotal) h += '<div class="row"><span>' + (m.unallocated < 0 ? 'Per-person budgets go over your total by' : 'Not yet given to anyone') + '</span><b class="' + (m.unallocated < 0 ? 'neg' : '') + '">' + fmt(Math.abs(m.unallocated), c) + '</b></div>';
    h += '<div class="row"><span>People done</span><b>' + m.done + ' of ' + m.people + '</b></div>';
    var notes = [];
    if (m.over.length) notes.push('Over budget: ' + m.over.slice(0, 5).map(function (o) { return esc(o.name) + ' (+' + fmt(o.by, c) + ')'; }).join(', ') + (m.over.length > 5 ? ' and ' + (m.over.length - 5) + ' more' : '') + '. Try trimming another gift to balance it.');
    if (m.projected > m.budget && m.budget > 0) notes.push('At this rate you will go over by ' + fmt(r2(m.projected - m.budget), c) + '. Lower a few budgets now, before you shop.');
    if (m.counts.idea && m.people) notes.push(m.counts.idea + ' ' + (m.counts.idea === 1 ? 'person' : 'people') + ' still to buy for.');
    if (m.people && !m.counts.idea && !over) notes.push('🎉 Everyone is covered and you are within budget.');
    h += notes.length ? '<ul class="gb-notes">' + notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>' : '';
    el.innerHTML = h;
    renderPrint(m);
  }
  function renderPrint(m) {
    var c = st.cur;
    $('gb-print').innerHTML = '<h1>' + esc(st.title || 'Christmas gift list') + '</h1><p class="gbp-s">Budget ' + fmt(m.budget, c) + ' · Spent ' + fmt(m.spent, c) + ' · ' + (m.remaining < 0 ? 'Over by ' + fmt(-m.remaining, c) : 'Left ' + fmt(m.remaining, c)) + (st.extras ? ' · Wrapping, cards and postage ' + fmt(st.extras, c) : '') + '</p>' +
      '<table><thead><tr><th>✓</th><th>Name</th><th>Gift idea</th><th>Budget</th><th>Spent</th><th>Bought</th><th>Wrapped</th><th>Given</th></tr></thead><tbody>' +
      (st.people.length ? st.people : [person(), person(), person(), person(), person(), person(), person(), person()]).map(function (p) {
        var b = function (on) { return '<td class="gbp-x">' + (on ? '☑' : '☐') + '</td>'; }, s = p.status;
        return '<tr><td class="gbp-x">' + (s === 'given' ? '☑' : '☐') + '</td><td>' + esc(p.name) + '</td><td>' + esc(p.idea) + '</td><td>' + (p.budget ? fmt(p.budget, c) : '') + '</td><td>' + (p.spent ? fmt(p.spent, c) : '') + '</td>' + b(s !== 'idea') + b(s === 'wrapped' || s === 'given') + b(s === 'given') + '</tr>';
      }).join('') + '</tbody></table><p class="gbp-f">Made with the free Christmas Gift Budget Planner · saemali.github.io/tools-site</p>';
  }
  function syncForm() {
    $('gb-title').value = st.title; $('gb-cur').value = st.cur; $('gb-total').value = st.total || ''; $('gb-extras').value = st.extras || '';
    $('gb-remember').checked = remember;
    [].forEach.call(document.querySelectorAll('.gb-sym'), function (e) { e.textContent = sym(); });
  }
  function all() { syncForm(); renderList(); renderSummary(); save(); }
  function update() { rowNotes(); renderSummary(); save(); }

  var had = load(); all();
  if (had) status('Welcome back. Your list was loaded from this device.', 'ok');
  $('gb-form').addEventListener('submit', function (e) { e.preventDefault(); });
  $('gb-title').addEventListener('input', function () { st.title = this.value.slice(0, 60); update(); });
  $('gb-cur').addEventListener('change', function () { st.cur = CUR[this.value] ? this.value : 'INR'; all(); });
  $('gb-total').addEventListener('input', function () { st.total = num(this.value); update(); });
  $('gb-extras').addEventListener('input', function () { st.extras = num(this.value); update(); });
  $('gb-remember').addEventListener('change', function () {
    remember = this.checked;
    try { if (remember) localStorage.removeItem(KEY + '-off'); else localStorage.setItem(KEY + '-off', '1'); } catch (e) {}
    save(); status(remember ? 'Your list will be kept in this browser on this device only.' : 'Not saving. Your list has been removed from this device and will be gone when you close the tab.', 'ok');
  });
  $('gb-list').addEventListener('input', function (e) {
    var t = e.target, row = t.closest('.gb-row'); if (!row || !t.dataset.k) return;
    var p = st.people[+row.dataset.i], k = t.dataset.k;
    if (k === 'budget' || k === 'spent') p[k] = num(t.value); else if (k === 'name' || k === 'idea') p[k] = t.value.slice(0, k === 'name' ? 60 : 120);
    update();
  });
  $('gb-list').addEventListener('change', function (e) {
    var t = e.target, row = t.closest('.gb-row'); if (!row || !t.dataset.k) return;
    var p = st.people[+row.dataset.i], k = t.dataset.k;
    if (k === 'group' && GROUPS[t.value]) p.group = t.value;
    if (k === 'status' && STATUS[t.value]) p.status = t.value;
    update();
  });
  $('gb-list').addEventListener('click', function (e) {
    var b = e.target.closest('[data-del]'); if (!b) return;
    var i = +b.dataset.del, nm = st.people[i].name || 'That person';
    st.people.splice(i, 1); renderList(); update(); status(esc(nm) + ' was removed.', 'ok');
    var nb = document.querySelector('[data-del="' + Math.min(i, st.people.length - 1) + '"]'); (nb || $('gb-add')).focus();
  });
  $('gb-add').addEventListener('click', function () {
    if (st.people.length >= MAXP) { status('That is a lot of gifts! The list holds up to ' + MAXP + ' people.', 'err'); return; }
    st.people.push(person()); renderList(); update();
    var r = document.querySelectorAll('.gb-row'); r[r.length - 1].querySelector('input').focus();
  });
  $('gb-example').addEventListener('click', function () {
    if (st.people.length && !confirm('Replace your current list with the example?')) return;
    st = example(st.cur); all(); status('Example loaded. Change anything, or press Clear all to start your own.', 'ok');
  });
  function doSplit(mode) {
    if (!st.people.length) { status('Add the people on your list first.', 'err'); return; }
    if (!st.total) { status('Type your total budget first, then press split.', 'err'); $('gb-total').focus(); return; }
    if (st.people.some(function (p) { return p.budget; }) && !confirm('Replace everyone\'s budget with the new split?')) return;
    var s = split(st.total, st.extras, st.people, mode);
    st.people.forEach(function (p, i) { p.budget = s[i]; }); renderList(); update();
    status('Shared ' + fmt(Math.floor(Math.max(0, st.total - st.extras)), st.cur) + ' ' + (mode === 'weighted' ? 'by closeness (partner 4 : family and kids 3 : friends 2 : work and others 1)' : 'evenly') + ' after setting aside ' + fmt(st.extras, st.cur) + ' for wrapping, cards and postage. Adjust any budget by hand.', 'ok');
  }
  $('gb-even').addEventListener('click', function () { doSplit('even'); });
  $('gb-weighted').addEventListener('click', function () { doSplit('weighted'); });
  $('gb-printbtn').addEventListener('click', function () { renderSummary(); window.print(); });
  $('gb-csv').addEventListener('click', function () {
    var blob = new Blob(['\ufeff' + toCSV(st)], { type: 'text/csv;charset=utf-8' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'christmas-gift-list.csv'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    status('Downloaded christmas-gift-list.csv. It opens in Excel or Google Sheets.', 'ok');
  });
  $('gb-copy').addEventListener('click', function () {
    var t = toText(st), done = function () { status('Copied. Paste it into WhatsApp, Notes or an email.', 'ok'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () { status('Could not copy. Select the list and copy it by hand.', 'err'); });
    else status('Copy is not supported in this browser.', 'err');
  });
  $('gb-clear').addEventListener('click', function () {
    if (!confirm('Clear your whole list and budget? This cannot be undone.')) return;
    var c = st.cur; st = blank(); st.cur = c; try { localStorage.removeItem(KEY); } catch (e) {} all(); status('Cleared. Start fresh whenever you are ready.', 'ok');
  });
})(typeof window !== 'undefined' ? window : this);

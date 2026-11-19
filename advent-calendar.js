/* HisaabMitra Advent Activity Calendar generator. Runs only in your browser: nothing is sent anywhere. */
(function (root) {
  'use strict';
  // k: category, a: [min age, max age], c: 0 free / 1 low-cost, o: outdoor, q: quick (about 15 min), ck: needs cooking/kitchen
  var A = [
    { t: 'Make paper snowflakes and tape them to a window', k: 'craft', a: [4, 14], c: 0, q: 1, i: '❄️' },
    { t: 'Cut out paper stars or hearts and string them into a garland', k: 'craft', a: [3, 12], c: 0, q: 1, i: '🔗' },
    { t: 'Make handprint or footprint reindeer cards for grandparents', k: 'craft', a: [2, 8], c: 1, i: '🦌' },
    { t: 'Make salt-dough ornaments (flour, salt, water), let them dry and paint them', k: 'craft', a: [3, 14], c: 0, i: '⭐' },
    { t: 'Decorate pine cones with paint or glue and glitter', k: 'craft', a: [3, 10], c: 1, i: '🌲' },
    { t: 'Draw and colour your own Christmas cards for family and friends', k: 'craft', a: [3, 14], c: 0, i: '💌' },
    { t: 'Make a bird feeder from a pine cone, seed butter and birdseed', k: 'craft', a: [4, 12], c: 1, i: '🐦' },
    { t: 'Turn toilet-roll tubes or odd socks into a family of snowmen', k: 'craft', a: [4, 12], c: 0, i: '⛄' },
    { t: 'Build a cardboard-box gingerbread house or winter village', k: 'craft', a: [5, 14], c: 0, i: '🏠' },
    { t: 'Wrap a small present together and make your own gift tag', k: 'craft', a: [4, 14], c: 0, q: 1, i: '🎁' },
    { t: 'Make a winter collage from leaves, twigs and paper scraps', k: 'craft', a: [3, 10], c: 0, i: '🍂' },
    { t: 'Make a family holiday playlist and design its album cover', k: 'music', a: [8, 14], c: 0, q: 1, i: '🎧' },
    { t: 'Bake simple biscuits or cookies and decorate them', k: 'kitchen', a: [3, 14], c: 1, ck: 1, i: '🍪' },
    { t: 'Make hot chocolate together and share one favourite memory of the year', k: 'kitchen', a: [2, 14], c: 1, q: 1, ck: 1, i: '☕' },
    { t: 'Make a fruit Christmas tree from grapes, kiwi and strawberries', k: 'kitchen', a: [3, 12], c: 1, ck: 1, i: '🍓' },
    { t: 'Make popcorn and thread a popcorn garland (older kids handle the needle)', k: 'kitchen', a: [6, 14], c: 1, ck: 1, i: '🍿' },
    { t: 'Make no-bake chocolate oat balls or coconut laddoos', k: 'kitchen', a: [4, 14], c: 1, ck: 1, i: '🥥' },
    { t: 'Make snowman or tree-shaped pancakes for breakfast', k: 'kitchen', a: [4, 14], c: 1, ck: 1, i: '🥞' },
    { t: 'Read a winter or Christmas picture book together under a blanket', k: 'cozy', a: [2, 10], c: 0, q: 1, i: '📖' },
    { t: 'Family movie night with a festive film and a homemade snack', k: 'cozy', a: [4, 14], c: 0, i: '🎬' },
    { t: 'Build a blanket fort and read stories by torchlight', k: 'cozy', a: [3, 12], c: 0, i: '🔦' },
    { t: 'Pyjama morning: breakfast in pyjamas and no rushing', k: 'cozy', a: [2, 14], c: 0, q: 1, i: '🧦' },
    { t: 'Look through old family photos and tell the stories behind them', k: 'cozy', a: [4, 14], c: 0, q: 1, i: '📷' },
    { t: 'Listen to an audiobook or story podcast while drawing', k: 'cozy', a: [4, 14], c: 0, q: 1, i: '🎙️' },
    { t: 'Bubble-bath snow: a bath full of bubbles and a winter story', k: 'cozy', a: [2, 6], c: 0, q: 1, i: '🛁' },
    { t: 'Go for an evening walk or drive to look at Christmas lights', k: 'outdoor', a: [2, 14], c: 0, o: 1, i: '✨' },
    { t: 'Take a winter nature walk and collect five interesting things', k: 'outdoor', a: [2, 12], c: 0, o: 1, i: '🌿' },
    { t: 'Put out food for the birds and count how many kinds visit', k: 'outdoor', a: [3, 14], c: 0, o: 1, q: 1, i: '🪶' },
    { t: 'Build a snowman, or if there is no snow, a leaf-and-stick sculpture', k: 'outdoor', a: [3, 12], c: 0, o: 1, i: '☃️' },
    { t: 'Have a winter picnic with a flask of hot drink in the park', k: 'outdoor', a: [3, 14], c: 1, o: 1, i: '🧺' },
    { t: 'Wrap up warm and look at the moon and stars for ten minutes', k: 'outdoor', a: [4, 14], c: 0, o: 1, q: 1, i: '🌙' },
    { t: 'Visit the library and borrow some festive books', k: 'outdoor', a: [2, 14], c: 0, o: 1, i: '📚' },
    { t: 'Make a thank-you card for a neighbour, guard or delivery person', k: 'kind', a: [3, 14], c: 0, q: 1, i: '💛' },
    { t: 'Choose toys or clothes you have outgrown to donate', k: 'kind', a: [4, 14], c: 0, i: '🧸' },
    { t: 'Video-call a grandparent or relative and sing them a song', k: 'kind', a: [2, 14], c: 0, q: 1, i: '📞' },
    { t: 'Hide a kind note or drawing for someone in the family to find', k: 'kind', a: [4, 14], c: 0, q: 1, i: '📝' },
    { t: 'Do a secret good deed for a family member', k: 'kind', a: [4, 14], c: 0, q: 1, i: '🤫' },
    { t: 'Pick a food item together for a food bank or donation box', k: 'kind', a: [4, 14], c: 1, q: 1, i: '🥫' },
    { t: 'Write or draw ten things you are thankful for this year', k: 'kind', a: [6, 14], c: 0, q: 1, i: '🙏' },
    { t: 'Family board game or card game night', k: 'game', a: [4, 14], c: 0, i: '🎲' },
    { t: 'Festive charades: act out songs, films and winter things', k: 'game', a: [5, 14], c: 0, i: '🎭' },
    { t: 'Indoor treasure hunt with clues leading to a small treat', k: 'game', a: [3, 10], c: 0, i: '🗺️' },
    { t: 'Play I spy with Christmas colours around the house', k: 'game', a: [2, 6], c: 0, q: 1, i: '👀' },
    { t: 'Freeze-dance party to festive songs', k: 'game', a: [2, 10], c: 0, q: 1, i: '💃' },
    { t: 'Play a round of holiday bingo together', k: 'game', a: [3, 14], c: 0, q: 1, i: '🔢' },
    { t: 'Tell a group story: each person adds one sentence', k: 'game', a: [4, 14], c: 0, q: 1, i: '🗣️' },
    { t: 'Start a jigsaw puzzle on the table and add to it all week', k: 'game', a: [4, 14], c: 0, i: '🧩' },
    { t: 'Rolled-sock snowball throwing contest into a laundry basket', k: 'game', a: [3, 12], c: 0, q: 1, i: '🧺' },
    { t: 'Find out how winter festivals are celebrated in another country', k: 'learn', a: [6, 14], c: 0, i: '🌍' },
    { t: 'Count the days left to Christmas and draw that many stars', k: 'learn', a: [3, 6], c: 0, q: 1, i: '🌟' },
    { t: 'Grow sugar or salt crystals on a string (a slow science treat)', k: 'learn', a: [7, 14], c: 0, i: '🔬' },
    { t: 'Learn to say Merry Christmas or Happy Holidays in three languages', k: 'learn', a: [5, 14], c: 0, q: 1, i: '🗺️' },
    { t: 'Write a letter to Santa, or a wish letter to your future self', k: 'learn', a: [4, 12], c: 0, q: 1, i: '✉️' },
    { t: 'Make a this-year time capsule: a drawing, a photo and a note', k: 'learn', a: [5, 14], c: 0, i: '📦' },
    { t: 'Sing carols or winter songs and shake homemade rice shakers', k: 'music', a: [2, 10], c: 0, q: 1, i: '🎶' },
    { t: 'Put on a mini family concert or talent show', k: 'music', a: [4, 14], c: 0, i: '🎤' },
    { t: 'Learn a new festive song with actions', k: 'music', a: [2, 8], c: 0, q: 1, i: '🎵' },
    { t: 'Sort and count the decorations by colour or shape', k: 'learn', a: [2, 5], c: 0, q: 1, i: '🔴' },
    { t: 'Play in a sensory snow tray made from cornflour and water (supervise)', k: 'craft', a: [2, 5], c: 1, i: '🥣' }
  ];
  var FIRST = { t: 'Make a paper chain with one link for every day until Christmas and tear one off each morning', k: 'start', i: '🔗', special: 1 };
  var EVE = { t: 'Christmas Eve: lay out cosy clothes, read a favourite story by torchlight and go to bed early', k: 'eve', i: '🕯️', special: 1 };
  var DAY = { t: 'Christmas Day: take a family photo and each share your favourite moment of this calendar', k: 'day', i: '🎄', special: 1 };

  var WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function rng(seed) { // mulberry32
    var s = seed >>> 0;
    return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function parseDate(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); if (!m) return null; var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])); return d.getUTCMonth() === +m[2] - 1 ? d : null; }
  function iso(d) { return d.toISOString().slice(0, 10); }
  function label(d) { return WD[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + MO[d.getUTCMonth()]; }

  // Days from start to 24 or 25 December of the same year (or the next year if start is after the end day).
  function days(startStr, endDay) {
    var s = parseDate(startStr); if (!s) return { ok: false, error: 'Please choose a valid start date.' };
    endDay = endDay === 25 ? 25 : 24;
    var y = s.getUTCFullYear(), e = new Date(Date.UTC(y, 11, endDay));
    if (s > e) return { ok: false, error: 'The start date is after ' + endDay + ' December. Pick a date in November or December.' };
    var n = Math.round((e - s) / 864e5) + 1;
    if (n > 31) return { ok: false, error: 'That is ' + n + ' days. Start on 24 November or later so the calendar is 31 days or fewer.' };
    var out = []; for (var i = 0; i < n; i++) out.push(new Date(s.getTime() + i * 864e5));
    return { ok: true, list: out };
  }

  function ageOk(a, y, o, slack) { return a.a[0] <= y + 1 + slack && a.a[1] >= Math.min(o, 14) - slack; }
  function pool(opt, slack) {
    return A.filter(function (a) {
      if (!ageOk(a, opt.youngest, opt.oldest, slack)) return false;
      if (opt.freeOnly && a.c) return false;
      if (!opt.outdoor && a.o) return false;
      if (!opt.kitchen && a.ck) return false;
      return true;
    });
  }
  function usable(opt, need) {
    var notes = [], p = pool(opt, 0);
    if (p.length < need) { p = pool(opt, 2); if (p.length >= need) notes.push('We added a few ideas meant for slightly older or younger children, so give a hand where needed.'); }
    if (p.length < need && opt.freeOnly) { p = pool(Object.assign({}, opt, { freeOnly: false }), 2); notes.push('There were not enough free ideas for this many days, so some low-cost ones are included.'); }
    return { list: p, notes: notes };
  }
  function weekend(d) { var w = d.getUTCDay(); return w === 0 || w === 6; }

  function pick(cands, d, opt, used, prevK, r) {
    var tiers = [
      function (a) { return !used[a.t] && a.k !== prevK && (!opt.quickWeekdays || weekend(d) || a.q); },
      function (a) { return !used[a.t] && (!opt.quickWeekdays || weekend(d) || a.q); },
      function (a) { return !used[a.t]; },
      function () { return true; }
    ];
    for (var t = 0; t < tiers.length; t++) {
      var c = cands.filter(tiers[t]);
      if (c.length) return c[Math.floor(r() * c.length)];
    }
    return null;
  }

  // opt: {start:'YYYY-MM-DD', endDay:24|25, youngest, oldest, freeOnly, outdoor, kitchen, quickWeekdays, seed}
  function build(opt) {
    var y = Math.max(1, Math.min(17, parseInt(opt.youngest, 10) || 3)), o = Math.max(1, Math.min(17, parseInt(opt.oldest, 10) || y));
    if (o < y) { var t = o; o = y; y = t; }
    opt = Object.assign({}, opt, { youngest: y, oldest: o });
    var ds = days(opt.start, opt.endDay); if (!ds.ok) return ds;
    var n = ds.list.length, specials = 0;
    var u = usable(opt, n), r = rng(opt.seed || 1), used = {}, prevK = '', out = [];
    ds.list.forEach(function (d, i) {
      var a, last = i === n - 1;
      if (i === 0 && n >= 5) a = FIRST;
      else if (last && d.getUTCMonth() === 11 && d.getUTCDate() === 24) a = EVE;
      else if (last && d.getUTCMonth() === 11 && d.getUTCDate() === 25) a = DAY;
      else a = pick(u.list, d, opt, used, prevK, r);
      if (opt.endDay === 25 && d.getUTCMonth() === 11 && d.getUTCDate() === 24 && !last) a = EVE;
      if (a.special) specials++; else used[a.t] = 1;
      prevK = a.k;
      out.push({ n: i + 1, date: iso(d), label: label(d), weekend: weekend(d), t: a.t, i: a.i, k: a.k, special: !!a.special });
    });
    return { ok: true, plan: out, notes: u.notes, opt: opt, poolSize: u.list.length };
  }

  // Replace one day's activity with a different unused one that fits the same rules.
  function swap(res, idx, r) {
    var day = res.plan[idx]; if (!day || day.special) return false;
    var u = usable(res.opt, res.plan.length), used = {};
    res.plan.forEach(function (p) { used[p.t] = 1; });
    var prevK = idx > 0 ? res.plan[idx - 1].k : '', d = parseDate(day.date);
    var a = pick(u.list.filter(function (x) { return x.t !== day.t; }), d, res.opt, used, prevK, r || Math.random);
    if (!a || a.t === day.t) return false;
    day.t = a.t; day.i = a.i; day.k = a.k; return true;
  }

  function toText(plan, title) {
    return (title ? title + '\n' : '') + plan.map(function (p) { return 'Day ' + p.n + ' (' + p.label + '): ' + p.t; }).join('\n');
  }
  function icsEsc(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
  function fold(line) {
    var out = [], cur = '', len = 0;
    for (var ch of line) {
      var b = ch.codePointAt(0) < 0x80 ? 1 : ch.codePointAt(0) < 0x800 ? 2 : ch.codePointAt(0) < 0x10000 ? 3 : 4;
      if (len + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; len = 0; }
      cur += ch; len += b;
    }
    out.push(cur); return out.join('\r\n ');
  }
  function toICS(plan, title, stamp) {
    stamp = stamp || '20261119T000000Z';
    var L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HisaabMitra//Advent Activity Calendar//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:' + icsEsc(title || 'Advent activity calendar')];
    plan.forEach(function (p) {
      var d = parseDate(p.date), e = new Date(d.getTime() + 864e5);
      L.push('BEGIN:VEVENT', 'UID:advent-' + p.date + '-' + p.n + '@saemali.github.io', 'DTSTAMP:' + stamp,
        'DTSTART;VALUE=DATE:' + p.date.replace(/-/g, ''), 'DTEND;VALUE=DATE:' + iso(e).replace(/-/g, ''),
        'SUMMARY:' + icsEsc('Advent day ' + p.n + ': ' + p.t), 'TRANSP:TRANSPARENT', 'END:VEVENT');
    });
    L.push('END:VCALENDAR');
    return L.map(fold).join('\r\n') + '\r\n';
  }

  var api = { ACTIVITIES: A, days: days, build: build, swap: swap, toText: toText, toICS: toICS, fold: fold, rng: rng };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  root.AdventCal = api;

  // ---------- UI ----------
  var $ = function (i) { return document.getElementById(i); };
  if (!$('ac-form')) return;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var last = null;
  function seed() { if (root.crypto && root.crypto.getRandomValues) { var u = new Uint32Array(1); root.crypto.getRandomValues(u); return u[0] || 1; } return Math.floor(Math.random() * 4294967295) + 1; }
  function status(html, kind) { var s = $('ac-status'); s.className = 'ss-status ' + (kind || ''); s.innerHTML = html; }
  function title() { var t = String($('ac-title').value || '').replace(/\s+/g, ' ').trim(); return t || 'Our advent activity calendar'; }
  function opts() {
    return { start: $('ac-start').value, endDay: +$('ac-end').value, youngest: $('ac-young').value, oldest: $('ac-old').value,
      freeOnly: $('ac-free').checked, outdoor: $('ac-outdoor').checked, kitchen: $('ac-kitchen').checked, quickWeekdays: $('ac-quick').checked, seed: seed() };
  }
  function render() {
    var h = '<h3 class="ac-title">' + esc(title()) + '</h3><ol class="ac-grid">';
    last.plan.forEach(function (p, i) {
      h += '<li class="ac-day' + (p.weekend ? ' we' : '') + (p.special ? ' sp' : '') + '"><span class="ac-n">' + p.n + '</span><span class="ac-d">' + esc(p.label) + '</span>' +
        '<span class="ac-i" aria-hidden="true">' + p.i + '</span><span class="ac-t" contenteditable="true" spellcheck="true" role="textbox" aria-label="Activity for day ' + p.n + ', editable" data-edit="' + i + '">' + esc(p.t) + '</span>' +
        (p.special ? '' : '<button type="button" class="btn ghost ss-sm ac-swap" data-swap="' + i + '" aria-label="Swap the activity for day ' + p.n + '">🔀 Swap</button>') + '</li>';
    });
    $('ac-out').innerHTML = h + '</ol>';
    $('ac-actions').hidden = false;
  }
  function run(e) {
    if (e) e.preventDefault();
    var res = build(opts());
    if (!res.ok) { last = null; $('ac-out').innerHTML = ''; $('ac-actions').hidden = true; return status(esc(res.error), 'err'); }
    last = res; render();
    status('✅ Your ' + res.plan.length + '-day calendar is ready. Tap any activity to change the words, or press Swap for a new idea.' + (res.notes.length ? '<br><small>' + res.notes.map(esc).join('<br>') + '</small>' : ''), 'ok');
    $('ac-out').focus();
  }
  function copy(text, okMsg) {
    var done = function () { status(okMsg, 'ok'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (er) { status('Could not copy. Please select and copy manually.', 'err'); } t.remove(); }
  }
  function printAs(kind) {
    if (!last) return;
    var h = '<div class="acp-' + kind + '">' + (kind === 'cal' ? '<h1>' + esc(title()) + '</h1>' : '');
    last.plan.forEach(function (p) { h += '<div class="acp-c"><b>' + p.n + '</b><small>' + esc(p.label) + '</small><span class="acp-i">' + p.i + '</span><p>' + esc(p.t) + '</p></div>'; });
    $('ac-print').innerHTML = h + '</div>'; root.print();
  }
  $('ac-form').addEventListener('submit', run);
  $('ac-out').addEventListener('input', function (e) { var i = e.target.dataset && e.target.dataset.edit; if (last && i != null) last.plan[+i].t = e.target.textContent.replace(/\s+/g, ' ').trim(); });
  $('ac-out').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-swap]'); if (!b || !last) return;
    var i = +b.dataset.swap;
    if (swap(last, i)) { render(); var nb = document.querySelector('[data-swap="' + i + '"]'); if (nb) nb.focus(); status('Day ' + (i + 1) + ' now says: ' + esc(last.plan[i].t), 'ok'); }
    else status('No other idea fits your settings for that day. Tap the text to write your own.', 'err');
  });
  $('ac-shuffle').addEventListener('click', function () { run(); });
  $('ac-copy').addEventListener('click', function () { if (last) copy(toText(last.plan, title()), 'Copied the list. Paste it into WhatsApp, Notes or an email.'); });
  $('ac-pcal').addEventListener('click', function () { printAs('cal'); });
  $('ac-pcards').addEventListener('click', function () { printAs('cards'); });
  $('ac-ics').addEventListener('click', function () {
    if (!last) return;
    var now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    var blob = new Blob([toICS(last.plan, title(), now)], { type: 'text/calendar' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'advent-activity-calendar.ics'; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    status('Downloaded advent-activity-calendar.ics. Open it to add each day as an all-day event in Google, Apple or Outlook Calendar.', 'ok');
  });
})(typeof window !== 'undefined' ? window : this);

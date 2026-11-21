/* HisaabMitra Christmas Bingo Card Generator: runs fully in the browser, nothing is sent anywhere. */
(function (root) {
  'use strict';
  var PRESETS = {
    christmas: ['Angel','Bells','Candy cane','Carols','Chimney','Christmas tree','Cocoa','Cookies','Elf','Fireplace','Garland','Gingerbread','Gift','Hot chocolate','Holly','Icicle','Jingle bells','Lights','Mistletoe','Mittens','North Pole','Nutcracker','Ornament','Present','Reindeer','Ribbon','Rudolph','Santa','Sleigh','Snowball','Snowflake','Snowman','Stocking','Star','Tinsel','Toys','Wreath','Wrapping paper','Scarf','Sledge','Candle','Bow','Card','Pine cone','Turkey','Pudding','Eggnog','Mince pie','Cracker','Wish list','Workshop','Snow globe','Boots','Hat','Igloo','Penguin','Polar bear','Robin','Frost','Winter','Carrot nose','Milk and cookies','Advent calendar','Family','Feast','Fairy lights','Peppermint','Popcorn string','Choir','Ice skates','Sweater','Gift tags','Tree topper','Chestnuts','Countdown'],
    office: ['Secret Santa','Ugly sweater','Out of office','Year-end review','Team lunch','Holiday card','Gift exchange','Cake in the kitchen','Someone wears a hat','Video call','Mince pie','Coffee run','Last meeting','Thank-you note','Party playlist','Group photo','Desk decorations','Tinsel','Snacks','Reply all','Calendar invite','New Year plans','Budget talk','Fairy lights','Someone is late','Bonus talk','Leftover cookies','Cheers','Mute button','Holiday playlist','Wrapping paper','Gift card','Name tags','Board game','Karaoke','Raffle','Sweater contest','Hot chocolate','Office tree','Paper snowflake','Team toast','Thank you','Selfie','Quiz','Dance move'],
    kids: ['Santa','Elf','Star','Bell','Tree','Gift','Snow','Hat','Bow','Sock','Toy','Cake','Moon','Deer','Sled','Box','Card','Pie','Mitten','Candy','Cookie','Angel','Holly','Lights','Snowman','Present','Reindeer','Candle','Wreath','Penguin','Bear','Drum','Train','Doll','Ball','Kite','Boot','Scarf','Milk','Owl']
  };

  function hashSeed(str) { // FNV-1a 32-bit
    var h = 2166136261 >>> 0; str = String(str);
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function rng(seed) { // mulberry32
    var a = hashSeed(seed);
    return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function shuffle(arr, r) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function parseWords(text) {
    var seen = {}, out = [], dup = 0;
    String(text || '').split(/[\n,;]+/).forEach(function (w) {
      w = w.replace(/\s+/g, ' ').trim().slice(0, 40);
      if (!w) return; var k = w.toLowerCase();
      if (seen[k]) { dup++; return; } seen[k] = 1; out.push(w);
    });
    return { words: out, duplicates: dup };
  }
  function cellsNeeded(size, free) { return size * size - (free && size % 2 === 1 ? 1 : 0); }
  function comb(n, k) { if (k < 0 || k > n) return 0; k = Math.min(k, n - k); var c = 1; for (var i = 1; i <= k; i++) { c = c * (n - k + i) / i; if (c > 1e15) return Infinity; } return Math.round(c); }

  // Returns {cards:[[cell,...]], error}
  function makeCards(opts) {
    var size = opts.size | 0, n = opts.count | 0, free = !!opts.free && size % 2 === 1;
    if ([3, 4, 5].indexOf(size) < 0) return { error: 'Choose a 3×3, 4×4 or 5×5 grid.' };
    if (n < 1 || n > 200) return { error: 'Choose between 1 and 200 cards.' };
    var r = rng(opts.seed || 'bingo'), cards = [], keys = {}, need = cellsNeeded(size, free), mid = Math.floor(size * size / 2);
    if (opts.mode === 'numbers') {
      if (size !== 5) return { error: 'Number bingo (B-I-N-G-O, 1 to 75) uses a 5×5 grid.' };
      var tries = 0;
      while (cards.length < n) {
        if (++tries > n * 50) return { error: 'Could not make that many different cards.' };
        var cols = []; for (var c = 0; c < 5; c++) { var pool = []; for (var v = c * 15 + 1; v <= c * 15 + 15; v++) pool.push(v); cols.push(shuffle(pool, r).slice(0, 5)); }
        var grid = []; for (var row = 0; row < 5; row++) for (var c2 = 0; c2 < 5; c2++) grid.push(String(cols[c2][row]));
        if (free) grid[mid] = 'FREE';
        var key = grid.join('|'); if (keys[key]) continue; keys[key] = 1; cards.push(grid);
      }
      return { cards: cards, size: size, free: free };
    }
    var words = opts.words || [];
    if (words.length < need) return { error: 'You need at least ' + need + ' different words for a ' + size + '×' + size + ' card' + (free ? ' with a free centre' : '') + '. You have ' + words.length + '.' };
    if (comb(words.length, need) < n) return { error: 'With ' + words.length + ' words you can only make ' + comb(words.length, need) + ' different card' + (comb(words.length, need) === 1 ? '' : 's') + '. Add more words or make fewer cards.' };
    var t2 = 0;
    while (cards.length < n) {
      if (++t2 > n * 200) return { error: 'Could not make that many different cards. Add more words.' };
      var pick = shuffle(words, r).slice(0, need);
      var setKey = pick.map(function (w) { return w.toLowerCase(); }).sort().join('|');
      if (keys[setKey]) continue; keys[setKey] = 1;
      var g = pick.slice(); if (free) g.splice(mid, 0, 'FREE');
      cards.push(g);
    }
    return { cards: cards, size: size, free: free };
  }
  function callOrder(opts) {
    var r = rng((opts.seed || 'bingo') + '|calls');
    if (opts.mode === 'numbers') { var L = 'BINGO', a = []; for (var v = 1; v <= 75; v++) a.push(L[Math.floor((v - 1) / 15)] + '-' + v); return shuffle(a, r); }
    return shuffle(opts.words || [], r);
  }
  function hasBingo(card, size, marked) { // marked: set of lowercased words
    function m(i) { var w = card[i]; return w === 'FREE' || !!marked[String(w).toLowerCase()]; }
    var i, j, ok;
    for (i = 0; i < size; i++) { ok = true; for (j = 0; j < size; j++) if (!m(i * size + j)) ok = false; if (ok) return true; }
    for (j = 0; j < size; j++) { ok = true; for (i = 0; i < size; i++) if (!m(i * size + j)) ok = false; if (ok) return true; }
    ok = true; for (i = 0; i < size; i++) if (!m(i * size + i)) ok = false; if (ok) return true;
    ok = true; for (i = 0; i < size; i++) if (!m(i * size + size - 1 - i)) ok = false; return ok;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function cardHTML(card, size, title, num, mode) {
    var h = '<div class="bc"><div class="bc-t">' + esc(title) + '</div>';
    if (mode === 'numbers') h += '<div class="bc-g bc-h" style="--n:5"><b>B</b><b>I</b><b>N</b><b>G</b><b>O</b></div>';
    h += '<div class="bc-g" style="--n:' + size + '">';
    card.forEach(function (w) { h += w === 'FREE' ? '<span class="bc-free">★<br>FREE</span>' : '<span>' + esc(w) + '</span>'; });
    return h + '</div><div class="bc-n">Card ' + num + '</div></div>';
  }
  var api = { PRESETS: PRESETS, parseWords: parseWords, makeCards: makeCards, callOrder: callOrder, hasBingo: hasBingo, cellsNeeded: cellsNeeded, comb: comb, esc: esc, cardHTML: cardHTML, rng: rng };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  root.HMBingo = api;

  // ---------- UI ----------
  var $ = function (id) { return document.getElementById(id); };
  var state = { cards: [], calls: [], called: 0, seed: '' };
  function newSeed() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }
  function opts() {
    var mode = $('bg-preset').value;
    var size = +$('bg-size').value;
    return { mode: mode === 'numbers' ? 'numbers' : 'words', size: size, count: +$('bg-count').value, free: $('bg-free').checked, seed: state.seed, words: parseWords($('bg-words').value).words, title: $('bg-title').value.trim() || 'Christmas Bingo', perPage: +$('bg-pp').value };
  }
  function loadPreset() {
    var p = $('bg-preset').value;
    $('bg-wordbox').hidden = p === 'numbers';
    if (p === 'numbers') { $('bg-size').value = '5'; }
    else if (PRESETS[p]) { $('bg-words').value = PRESETS[p].join('\n'); if (p === 'kids' && $('bg-size').value === '5') $('bg-size').value = '4'; }
    build();
  }
  function build() {
    var o = opts(), st = $('bg-status');
    var pw = parseWords($('bg-words').value);
    $('bg-wc').textContent = o.mode === 'numbers' ? '' : pw.words.length + ' different words' + (pw.duplicates ? ' (' + pw.duplicates + ' duplicate' + (pw.duplicates > 1 ? 's' : '') + ' ignored)' : '') + ' · each card needs ' + cellsNeeded(o.size, o.free);
    var res = makeCards(o);
    if (res.error) { st.className = 'ss-status err'; st.textContent = res.error; state.cards = []; $('bg-preview').innerHTML = ''; $('bg-print-cards').disabled = true; $('bg-print-calls').disabled = true; return; }
    state.cards = res.cards; state.size = res.size; state.o = o;
    state.calls = callOrder(o); state.called = 0; renderCaller();
    st.className = 'ss-status ok';
    st.textContent = '✅ ' + res.cards.length + ' different ' + o.size + '×' + o.size + ' card' + (res.cards.length > 1 ? 's' : '') + ' ready · set code ' + state.seed + ' (type the same code later to get the same cards again).';
    var show = res.cards.slice(0, 2), h = '';
    show.forEach(function (c, i) { h += cardHTML(c, res.size, o.title, i + 1, o.mode); });
    $('bg-preview').innerHTML = h;
    $('bg-more').textContent = res.cards.length > 2 ? 'Showing cards 1 and 2 of ' + res.cards.length + '. All of them print.' : '';
    $('bg-print-cards').disabled = false; $('bg-print-calls').disabled = false;
  }
  function renderCaller() {
    var cur = state.called ? state.calls[state.called - 1] : '—';
    $('bg-current').textContent = cur;
    $('bg-ccount').textContent = state.called + ' of ' + state.calls.length + ' called';
    $('bg-history').textContent = state.calls.slice(0, Math.max(0, state.called - 1)).reverse().join(' · ');
    $('bg-next').disabled = state.called >= state.calls.length;
  }
  function printWhat(kind) {
    var o = state.o, out = $('bg-print'), h = '';
    if (kind === 'cards') {
      out.className = 'pp' + o.perPage;
      state.cards.forEach(function (c, i) {
        if (i % o.perPage === 0) h += (i ? '</div>' : '') + '<div class="bp-page">';
        h += cardHTML(c, state.size, o.title, i + 1, o.mode);
      });
      h += '</div>';
    } else {
      out.className = 'ppcalls';
      h = '<h1>' + esc(o.title) + ': caller sheet</h1><p>Read out in this order and tick each one. Set code ' + esc(state.seed) + ', ' + state.cards.length + ' cards.</p><ol class="bp-calls">';
      state.calls.forEach(function (w) { h += '<li>☐ ' + esc(w) + '</li>'; });
      h += '</ol><h2>Cut-out call slips</h2><div class="bp-slips">';
      state.calls.forEach(function (w) { h += '<span>' + esc(w) + '</span>'; });
      h += '</div>';
    }
    out.innerHTML = h;
    window.print();
  }
  function init() {
    state.seed = newSeed(); $('bg-seed').value = state.seed;
    $('bg-words').value = PRESETS.christmas.join('\n');
    ['bg-size', 'bg-count', 'bg-free', 'bg-title', 'bg-pp'].forEach(function (id) { $(id).addEventListener('change', build); });
    $('bg-title').addEventListener('input', build);
    $('bg-words').addEventListener('input', function () { clearTimeout(state.t); state.t = setTimeout(build, 300); });
    $('bg-preset').addEventListener('change', loadPreset);
    $('bg-seed').addEventListener('change', function () { var v = $('bg-seed').value.trim().toUpperCase().slice(0, 12); state.seed = v || newSeed(); $('bg-seed').value = state.seed; build(); });
    $('bg-shuffle').addEventListener('click', function () { state.seed = newSeed(); $('bg-seed').value = state.seed; build(); });
    $('bg-next').addEventListener('click', function () { if (state.called < state.calls.length) { state.called++; renderCaller(); } });
    $('bg-reset').addEventListener('click', function () { state.called = 0; renderCaller(); });
    $('bg-print-cards').addEventListener('click', function () { printWhat('cards'); });
    $('bg-print-calls').addEventListener('click', function () { printWhat('calls'); });
    $('bg-form').addEventListener('submit', function (e) { e.preventDefault(); build(); });
    build();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(this);

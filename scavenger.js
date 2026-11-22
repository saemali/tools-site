/* HisaabMitra Christmas Scavenger Hunt Clue Generator: runs fully in the browser, nothing is sent anywhere, no tracking. */
(function (root) {
  'use strict';
  // [id, hiding spot (answer key), emoji, keyword for hint, where, easy clue, [medium clues], hard riddle]
  var RAW = [
    ['pillow', 'Under a pillow', '🛏️', 'pillow', 'in', 'Where do you rest your sleepy head?/Look under the pillow on the bed!', ['At night it’s soft beneath your head,/so check beneath it on the bed.', 'Fluffy and puffy, white or blue,/lift up a pillow, a clue waits for you!'], 'I spend each night beneath your dreams,/I’m stuffed with feathers, sewn at the seams.'],
    ['fridge', 'In the fridge (front shelf)', '🧊', 'fridge', 'in', 'Brrr, it’s cold, where the milk goes too!/Open the fridge to find your clue.', ['Where milk and cheese stay nice and cold,/your next clue waits, if you are bold!', 'It hums all day, it’s cold inside,/behind its door your clue will hide.'], 'My light goes on each time you call,/I keep the butter coolest of all.'],
    ['shoe', 'Inside a shoe', '👟', 'shoe', 'in', 'One, two, buckle my shoe!/Look inside a shoe for a clue.', ['They go wherever your feet go,/so peek inside a shoe, down by the toe!', 'Laces, buckles, straps that stick,/check inside a shoe, be quick!'], 'I have a tongue but cannot talk,/I go with you on every walk.'],
    ['bookshelf', 'On the bookshelf', '📚', 'bookshelf', 'in', 'Stories with pictures, big and small,/look on the bookshelf by the wall!', ['Where stories sleep in tidy rows,/your next clue’s hiding, goodness knows!', 'Dragons, pirates, princes too,/the bookshelf has your next clue.'], 'I hold a thousand tales but never say a word,/my rows of spines are seen but never heard.'],
    ['sofa', 'Under a sofa cushion', '🛋️', 'sofa', 'in', 'Where we sit to watch TV,/under a cushion, what will you see?', ['Coins and crumbs fall down here too,/lift a sofa cushion for your clue!', 'Where the family sits to rest,/under a cushion waits your next test.'], 'I have arms but cannot hug,/I sit all day beside the rug.'],
    ['toybox', 'In the toy box', '🧸', 'toy box', 'in', 'Teddy, blocks and cars that zoom,/look in the toy box in your room!', ['When playtime ends they go inside,/the toy box is where clues can hide!', 'Dolls and dinos, balls and trains,/search the toy box, use your brains!'], 'Puzzles, robots, plastic bricks,/I’m the chest where playtime sits.'],
    ['clock', 'Next to a clock', '⏰', 'clock', 'in', 'Tick-tock, tick-tock!/Find your clue beside the clock.', ['It has a face and hands but no nose,/tick by tick, around it goes.', 'Tick, tock, what’s the time?/Check the clock for the next rhyme!'], 'I have a face but never smile,/my hands keep moving all the while.'],
    ['mirror', 'On a mirror', '🪞', 'mirror', 'in', 'Who’s that smiling back at you?/Look at the mirror for your clue!', ['Wave hello and it waves too,/check the mirror for your clue.', 'Brush your hair and check your grin,/the mirror’s where your clue has been.'], 'I copy everything you do,/but left is right when I look at you.'],
    ['laundry', 'In the laundry basket', '🧺', 'laundry basket', 'in', 'Muddy socks and grubby shirts,/look in the laundry basket first!', ['Where clothes wait for their soapy spin,/the laundry basket has a clue within.', 'Fold and wash and hang to dry,/the laundry basket’s where clues lie.'], 'I hold the week’s forgotten socks,/a woven, grubby, open box.'],
    ['remote', 'Under the TV remote', '📺', 'remote', 'in', 'Click! The cartoons come on bright./Look under the remote, left or right!', ['Click for cartoons, click for news,/under the remote is your next clue.', 'Everybody wants to hold me tight/to pick the film on movie night.'], 'I change the picture with one press,/and I’m the thing that’s lost the most, I guess.'],
    ['stocking', 'In a Christmas stocking', '🎅', 'stocking', 'in', 'A big red sock hung up with care,/look inside, your clue is there!', ['It’s hung up by the chimney with care,/peek inside, your clue is there!', 'Santa fills me Christmas Eve,/look inside before you leave!'], 'I’m a sock that no one wears,/I hang and wait for Santa’s wares.'],
    ['cookiejar', 'In the cookie or biscuit jar', '🍪', 'cookie jar', 'in', 'Crunchy cookies, yum yum yum!/Check the cookie jar, here I come!', ['Where crunchy treats are kept up high,/peek in the cookie jar, don’t be shy!', 'Chocolate chip and ginger too,/the cookie jar has hidden your clue!'], 'I’m round and full of crumbs and treats,/my lid goes clink when someone eats.'],
    ['sockdrawer', 'In the sock drawer', '🧦', 'sock drawer', 'in', 'Pairs of socks, all warm and neat,/check the drawer for your feet!', ['Stripes and spots and odd ones too,/the sock drawer’s hiding your next clue.', 'Open the drawer where socks are kept,/your clue is there where pairs have slept.'], 'I’m full of pairs but some have fled,/the missing ones went somewhere instead.'],
    ['toothbrush', 'By the toothbrushes', '🪥', 'toothbrush', 'in', 'Brush, brush, morning and night!/Look by the toothbrush, shiny and white.', ['Brush your teeth, the top and bottom,/clues by the toothbrush? Go and spot ’em!', 'Minty bubbles, sparkly grin,/check where your toothbrush has been.'], 'I’ve bristles like a tiny broom,/I keep your smile in the bathroom.'],
    ['lamp', 'Under a lamp', '💡', 'lamp', 'in', 'Click it on, it’s warm and bright,/look below the lamp’s light!', ['When it’s dark I shine for you,/under the lamp you’ll find a clue.', 'Flip the switch, the room’s aglow,/check the lamp and look below!'], 'I wear a shade but not for the sun,/I stand all night till night is done.'],
    ['plant', 'By a house plant', '🪴', 'plant', 'in', 'Green leaves growing in a pot,/look by the plant, is it there or not?', ['It sips its water, loves the light,/check by the house plant, left or right!', 'Leafy and green in a pot of clay,/check by the plant without delay!'], 'I’m green and grow but never walk,/I drink all day but never talk.'],
    ['windowsill', 'On a windowsill', '🪟', 'window', 'in', 'Look outside, what can you see?/Check the window, that’s the key!', ['Where you watch for snow and birds,/check the windowsill for words!', 'Peek through glass at the world outside,/on the sill your clue will hide.'], 'I let you see but keep out the cold,/my ledge holds secrets, so I’m told.'],
    ['stairs', 'On the bottom stair', '🪜', 'stairs', 'in', 'Up and down, step by step,/check the bottom stair, yep yep!', ['Step by step you climb up there,/so look at the very bottom stair.', 'Up to bed and down for tea,/the bottom step has a clue for thee!'], 'You climb me up, you walk me down,/I never move, but I lift you off the ground.'],
    ['chair', 'Under a dining chair', '🪑', 'chair', 'in', 'Where we sit to eat our lunch,/look under a chair, munch munch!', ['Where you sit for Christmas dinner,/look underneath to find a winner!', 'Four legs and a back but it can’t walk,/look under a chair, no time to talk!'], 'I’ve four legs and a back but never walk,/I’m pulled up to the table when people talk.'],
    ['bed', 'Under the bed', '🛌', 'bed', 'in', 'Where you sleep at night, sleepyhead,/look underneath your cosy bed!', ['No monsters here, just dust and fluff,/look under the bed, you’re clever enough!', 'Where you snooze the whole night through,/underneath the bed’s your clue!'], 'I have a head and a foot, yet I never stand,/look under me where the dust bunnies land.'],
    ['bathtub', 'In the bathtub (dry)', '🛁', 'bath', 'in', 'Splish, splash, rubber duck too,/look in the bath for your next clue!', ['Where rubber ducks go for a swim,/look in the bathtub, the clue’s within!', 'Bubbles, splashes, soap and steam,/check the bath, it’s not a dream!'], 'I’m filled and drained but never drink,/and I’m much bigger than the sink.'],
    ['hat', 'Under a hat', '🧢', 'hat', 'in', 'Woolly ones keep ears all snug,/find a hat and give it a tug!', ['Wear it in the winter cold,/a hat is hiding clues, I’m told.', 'Bobble, beanie, cap or crown,/lift a hat and look right down!'], 'I sit on top when winds blow cold,/lift me up, a clue I hold.'],
    ['coat', 'In a coat pocket', '🧥', 'coat', 'in', 'Zip it up when it’s cold outside,/in a coat pocket a clue will hide!', ['Before you go out in the cold,/check a coat pocket, so I’m told!', 'Buttons, zips and a hood too,/feel in the pockets for a clue.'], 'I hang by the door and wait for snow,/check my pockets before you go.'],
    ['cereal', 'Behind the cereal box', '🥣', 'cereal', 'in', 'Breakfast flakes go crunch, crunch, crunch!/Look behind the cereal box before lunch!', ['Morning crunch with milk to pour,/look behind the cereal, not the door!', 'What do you eat at breakfast time?/Behind the cereal’s your next rhyme!'], 'I’m full of flakes yet never snow,/at breakfast time I’m first to go.'],
    ['fruitbowl', 'In the fruit bowl', '🍎', 'fruit bowl', 'in', 'Apples, bananas, oranges too,/the fruit bowl is hiding your clue!', ['An apple a day, the doctors say,/so check the fruit bowl right away!', 'Round and yellow, red and green,/the fruit bowl’s where the clue is seen.'], 'I hold the healthy snacks you skip/for chocolate bars and crisps to dip.'],
    ['picture', 'Behind a picture frame', '🖼️', 'picture', 'in', 'Smiling faces on the wall,/look behind a picture, big or small!', ['Family faces on the wall,/check behind a frame, that’s all!', 'Photos smiling, hung up high,/peek behind a frame, don’t be shy!'], 'I hold a memory, frozen tight,/behind my back a clue’s in sight.'],
    ['umbrella', 'Next to an umbrella', '☂️', 'umbrella', 'in', 'Drip, drop, rain’s on the way,/find the umbrella, hip hooray!', ['When it rains it keeps you dry,/find the umbrella standing by.', 'Open it wide when rain clouds frown,/find the umbrella, then look down!'], 'I’m only useful when it’s wet,/I’ve ribs, but I’m no skeleton yet.'],
    ['doormat', 'Under the front doormat', '🚪', 'doormat', 'out', 'Wipe your feet, it says hello!/Look under the mat, down below!', ['Wipe your boots before you come in,/under the doormat the clue has been.', 'It says welcome at the door,/look underneath it on the floor!'], 'Everyone steps on me, yet I say hello,/lift me up and look below.'],
    ['mailbox', 'In the letterbox or mailbox', '📬', 'mailbox', 'out', 'Letters and cards come here each day,/check the mailbox right away!', ['Where Christmas cards arrive each day,/the letterbox has a clue, hooray!', 'Cards from Granny, notes for Dad,/check the mailbox, you’ll be glad!'], 'A stranger feeds me every day,/with cards and parcels on their way.'],
    ['flowerpot', 'Beside a flower pot', '🌼', 'flower pot', 'out', 'Pretty flowers in a pot,/look beside it, is it there or not?', ['Where petals bloom in pots of clay,/check beside them, then run and play!', 'Daisies, roses, soil and dirt,/check the flower pot, it won’t hurt!'], 'Made of clay, I hold the earth,/and help the seeds give flowers birth.'],
    ['bench', 'On the garden bench or chair', '🪵', 'bench', 'out', 'Sit down outside and take a rest,/check the garden bench, it’s the best!', ['Where you sit outside in the sun,/check the bench, then run, run, run!', 'An outdoor seat for two or three,/check the bench and you will see!'], 'I’m a seat that sleeps outdoors,/with planks for a back and planks for floors.'],
    ['treetrunk', 'At the bottom of a tree', '🌳', 'tree', 'out', 'Tall and brown with leaves up high,/check the bottom of the tree nearby!', ['Squirrels climb it, birds sing there,/check its roots with special care!', 'Roots below and branches high,/check the tree trunk, don’t walk by!'], 'I’ve bark but I never bite,/my roots hold on with all their might.'],
    ['bike', 'On the bicycle seat or basket', '🚲', 'bicycle', 'out', 'Two wheels, ring-a-ding-ding!/Check the bike and its bell will ring!', ['Pedal fast and ring the bell,/check the bike, you’re doing well!', 'Two round wheels and handlebars,/check the bike, you superstars!'], 'I’ve two wheels and a chain but no motor to roar,/my bell goes ring when you ride out the door.'],
    ['wateringcan', 'By the watering can', '🌱', 'watering can', 'out', 'Splash the flowers, give them a drink,/check the watering can, wink wink!', ['It gives the plants a drink each day,/check the watering can right away!', 'Long spout, handle, splishy-splash,/check the watering can in a flash!'], 'I have a long nose and I make it rain,/the garden thanks me again and again.'],
    ['gate', 'On the garden gate', '🏡', 'gate', 'out', 'Open, close, creak and swing,/check the gate for the next thing!', ['It creaks and swings and latches shut,/check the gate, no ifs or buts!', 'Click the latch and swing it wide,/on the gate your clue will hide.'], 'I’m a door without a house,/I squeak a little like a mouse.'],
    ['birdfeeder', 'By the bird feeder', '🐦', 'bird feeder', 'out', 'Tweet, tweet! The birds want seeds,/check the bird feeder, yes indeed!', ['Where robins come for seeds to eat,/check the feeder, tweet tweet tweet!', 'Birdies flutter, peck and munch,/the feeder’s where they have their lunch.'], 'A café for the feathered crowd,/where sparrows chatter long and loud.'],
    ['stone', 'Under a flat stone', '🪨', 'stone', 'out', 'Grey and flat, it sits alone,/look under a little stone!', ['Lift a flat stone, gently now,/your clue is under there, and how!', 'Bugs and beetles love it here,/under a stone, the clue is near!'], 'I’ve sat here longer than you’ve been alive,/lift me and watch the beetles dive.'],
    ['washingline', 'On the washing line (with a peg)', '👕', 'washing line', 'out', 'Peg the shirts up in the sun,/check the washing line, what fun!', ['Where wet clothes dance in the breeze,/check the washing line, if you please!', 'Pegs and socks hung up to dry,/check the line, it’s way up high!'], 'I hold up shirts but have no arms,/the breeze and sunshine are my charms.'],
    ['step', 'On the front step', '🏠', 'step', 'out', 'Stomp, stomp, up to the door,/check the front step, then look for more!', ['Where visitors stop to knock and wait,/check the front step, don’t be late!', 'Up one step to ring the bell,/check right here, you’re doing well!'], 'Every guest has stood on me/before they knocked for Christmas tea.'],
    ['car', 'Under a wiper of the parked car', '🚗', 'car', 'out', 'Beep, beep! Vroom, vroom!/Check the car, then zoom, zoom!', ['Swish, swish, wiping rain away,/check the car’s wiper right away!', 'Four wheels parked out on the drive,/check the windscreen, look alive!'], 'When raindrops fall I wave goodbye,/I swish left and right to keep the glass dry.'],
    ['swing', 'On the swing', '🛝', 'swing', 'out', 'Up and down, high and low,/check the swing, off you go!', ['Back and forth up to the sky,/check the swing, you’ll fly so high!', 'Push me high and watch me sway,/check the swing, then shout hooray!'], 'I fly you forward, then fly you back,/but never leave my ropes or track.']
  ];
  // Final gift spots: [id, name, emoji, keyword, where, easy, medium, hard, spot ids it replaces]
  var RAWF = [
    ['tree', 'Under the Christmas tree', '🎄', 'tree', 'in', 'Lights and baubles, shiny and bright,/your present’s under the tree tonight!', 'Lights that twinkle, a star on top,/under the tree is your final stop!', 'I’m green all year, in lights each December,/look under my branches for a gift to remember!', []],
    ['wardrobe', 'In a wardrobe or closet', '🚪', 'wardrobe', 'in', 'Where your clothes hang in a row,/open the wardrobe, there you go!', 'Where coats and dresses hang inside,/the wardrobe’s where your gift will hide!', 'Behind my doors the hangers sway,/your present’s here, hip hip hooray!', ['coat']],
    ['curtains', 'Behind the curtains', '🪟', 'curtains', 'in', 'Open, close, they swish and sway,/your gift’s behind the curtains today!', 'Pull them open, pull them tight,/behind the curtains is your gift tonight!', 'We hang in pairs and close at night,/behind us waits your last delight.', ['windowsill']],
    ['underbed', 'Under the bed', '🛌', 'bed', 'in', 'Where you sleep at night, sleepyhead,/your present’s under your cosy bed!', 'No monsters here, just one surprise,/look under the bed and rub your eyes!', 'I have a head and a foot, yet I never stand,/look under me for the best gift in the land.', ['bed', 'pillow']],
    ['shed', 'In the garden shed or garage', '🏚️', 'shed', 'out', 'Spades and rakes and garden tools,/check the shed, you followed the rules!', 'Where bikes and tools are put away,/the shed has your present today!', 'I’m a little house where no one sleeps,/where rakes and spades are what I keep.', ['bike', 'wateringcan']]
  ];
  var SPOTS = RAW.map(function (r) { return { id: r[0], name: r[1], emoji: r[2], key: r[3], where: r[4], easy: [r[5]], medium: r[6], hard: [r[7]] }; });
  var FINALS = RAWF.map(function (r) { return { id: r[0], name: r[1], emoji: r[2], key: r[3], where: r[4], easy: [r[5]], medium: [r[6]], hard: [r[7]], excludes: r[8] }; });
  var BANDS = {
    '3-5': { label: 'Ages 3–5', order: ['easy', 'medium'], emoji: true, hint: false, suggest: [3, 6] },
    '6-8': { label: 'Ages 6–8', order: ['medium', 'easy'], emoji: false, hint: false, suggest: [5, 10] },
    '9-12': { label: 'Ages 9–12', order: ['hard', 'medium'], emoji: false, hint: true, suggest: [6, 12] },
    'teen': { label: 'Teens & adults', order: ['hard', 'medium'], emoji: false, hint: false, suggest: [8, 15] }
  };
  var MIN_CLUES = 2, MAX_CLUES = 20;
  var byId = {}; SPOTS.forEach(function (s) { byId[s.id] = s; });
  var finalById = {}; FINALS.forEach(function (f) { finalById[f.id] = f; });

  function hashSeed(str) { var h = 2166136261 >>> 0; str = String(str); for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function rng(seed) { var a = hashSeed(seed); return function () { a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function band(b) { return BANDS[b] || BANDS['6-8']; }
  // every wording available for a spot in a band, best fit first
  function variants(spot, b) { var out = []; band(b).order.forEach(function (tier) { (spot[tier] || []).forEach(function (t) { if (out.indexOf(t) < 0) out.push(t); }); }); return out; }
  function hintFor(spot) { var k = spot.key.replace(/[^a-z ]/gi, ''); var letters = k.replace(/ /g, '').length; return 'Hint: ' + (k.indexOf(' ') >= 0 ? 'two words, ' : '') + letters + ' letters, starts with ' + k.charAt(0).toUpperCase(); }
  function cleanText(s, max) { return String(s == null ? '' : s).replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim().slice(0, max || 300); }

  function finalSpot(o) {
    if (o.finalId === 'custom') {
      var name = cleanText(o.finalName, 60) || 'The secret present spot';
      var txt = cleanText(o.finalClue, 300);
      if (!txt) txt = 'One last place for you to go,/' + name.charAt(0).toLowerCase() + name.slice(1) + ', I think you know!';
      return { id: 'custom', name: name, emoji: '🎁', key: '', where: 'any', easy: [txt], medium: [txt], hard: [txt], excludes: [], custom: true };
    }
    return finalById[o.finalId] || finalById.tree;
  }
  function pool(o, fin) {
    var skip = {}; (o.skip || []).forEach(function (id) { skip[id] = 1; }); (fin.excludes || []).forEach(function (id) { skip[id] = 1; });
    var setting = o.setting || 'in';
    return SPOTS.filter(function (s) { return !skip[s.id] && (setting === 'both' || s.where === setting); });
  }
  function maxClues(o) { return Math.min(MAX_CLUES, pool(o, finalSpot(o)).length + 1); }

  // Build a hunt. Clue k sends the players to clue[k].spot; card k is hidden at clue[k-1].spot (card 1 is handed over).
  function makeHunt(o) {
    o = o || {};
    var count = o.count | 0, b = BANDS[o.band] ? o.band : '6-8';
    var fin = finalSpot(o), p = pool(o, fin), max = Math.min(MAX_CLUES, p.length + 1);
    if (count < MIN_CLUES || count > MAX_CLUES) return { error: 'Choose between ' + MIN_CLUES + ' and ' + MAX_CLUES + ' clues.' };
    if (count > max) return { error: 'There are only ' + p.length + ' hiding spots left with these settings, so the most clues you can have is ' + max + '. Turn some skipped spots back on, choose “indoors and outdoors”, or make fewer clues.' };
    var r = rng((o.seed || 'hunt') + '|' + b + '|' + (o.setting || 'in'));
    var picked = shuffle(p, r).slice(0, count - 1);
    var clues = picked.map(function (s) { var v = variants(s, b), tierLen = (s[band(b).order[0]] || []).length || 1; return { spot: s, v: Math.floor(r() * tierLen) % v.length }; });
    clues.push({ spot: fin, v: 0, isFinal: true });
    return { band: b, setting: o.setting || 'in', seed: o.seed || 'hunt', title: cleanText(o.title, 50) || 'Christmas Treasure Hunt', clues: clues.map(function (c, i) { return decorate(c, i, clues, b); }) };
  }
  function decorate(c, i, list, b) {
    var cfg = band(b), v = variants(c.spot, b);
    return { n: i + 1, spotId: c.spot.id, spot: c.spot, isFinal: !!c.isFinal, v: c.v, text: c.edited != null ? c.edited : v[c.v % v.length], edited: c.edited != null,
      emoji: cfg.emoji ? c.spot.emoji : '', hint: cfg.hint && !c.spot.custom ? hintFor(c.spot) : '',
      leadsTo: c.spot.name, hideAt: i === 0 ? 'Hand to the player(s) to start' : list[i - 1].spot.name };
  }
  function relink(h) { var raw = h.clues.map(function (c) { return { spot: c.spot, v: c.v, isFinal: c.isFinal, edited: c.edited ? c.text : null }; }); h.clues = raw.map(function (c, i) { return decorate(c, i, raw, h.band); }); return h; }
  function clone(h) { return { band: h.band, setting: h.setting, seed: h.seed, title: h.title, clues: h.clues.slice() }; }

  // Replace the spot of clue idx with an unused one. Returns {hunt} or {error}.
  function swapSpot(h, idx, o, salt) {
    var c = h.clues[idx]; if (!c || c.isFinal) return { error: 'The last clue always leads to the present. Change the present spot in the settings instead.' };
    var used = {}; h.clues.forEach(function (x) { used[x.spotId] = 1; });
    var fin = h.clues[h.clues.length - 1].spot;
    var free = pool(o || { setting: h.setting }, fin).filter(function (s) { return !used[s.id]; });
    if (!free.length) return { error: 'Every hiding spot is already used. Turn on more spots or choose indoors and outdoors.' };
    var r = rng(h.seed + '|swap|' + idx + '|' + (salt || 0)), s = free[Math.floor(r() * free.length)];
    var n = clone(h); n.clues[idx] = { spot: s, v: 0, isFinal: false, edited: false, text: '' }; return { hunt: relink(n) };
  }
  function reword(h, idx) {
    var c = h.clues[idx]; if (!c) return { error: 'No such clue.' };
    var v = variants(c.spot, h.band), n = clone(h);
    n.clues[idx] = { spot: c.spot, v: (c.v + 1) % v.length, isFinal: c.isFinal, edited: false, text: '' }; return { hunt: relink(n), changed: v.length > 1 };
  }
  function editClue(h, idx, text) {
    var c = h.clues[idx]; if (!c) return { error: 'No such clue.' };
    var t = cleanText(text, 300), n = clone(h);
    n.clues[idx] = { spot: c.spot, v: c.v, isFinal: c.isFinal, edited: !!t, text: t }; return { hunt: relink(n) };
  }
  function lines(t) { return String(t).split(/\s*[\/\n]\s*/).filter(Boolean); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }
  function cardHTML(c, total, title) {
    var h = '<div class="sh-card' + (c.isFinal ? ' sh-final' : '') + '"><div class="sh-top"><span>' + esc(title) + '</span><b>' + (c.isFinal ? '🎁 Last clue!' : 'Clue ' + c.n + ' of ' + total) + '</b></div>';
    if (c.emoji) h += '<div class="sh-emo" aria-hidden="true">' + c.emoji + '</div>';
    h += '<p class="sh-txt">' + lines(c.text).map(esc).join('<br>') + '</p>';
    if (c.hint) h += '<p class="sh-hintl">' + esc(c.hint) + '</p>';
    return h + '</div>';
  }
  function keyHTML(h) {
    var t = '<table class="sh-key"><thead><tr><th>Card</th><th>Hide this card…</th><th>Its clue leads to…</th></tr></thead><tbody>';
    h.clues.forEach(function (c) { t += '<tr><td>' + c.n + '</td><td>' + esc(c.hideAt) + '</td><td>' + (c.isFinal ? '🎁 ' : '') + esc(c.leadsTo) + (c.isFinal ? ' (put the present here)' : '') + '</td></tr>'; });
    return t + '</tbody></table>';
  }
  function huntText(h) {
    var out = [h.title + ' (' + band(h.band).label + ', ' + h.clues.length + ' clues, code ' + h.seed + ')', ''];
    h.clues.forEach(function (c) { out.push((c.isFinal ? 'LAST CLUE' : 'Clue ' + c.n) + ':'); lines(c.text).forEach(function (l) { out.push('  ' + l); }); if (c.hint) out.push('  (' + c.hint + ')'); out.push(''); });
    out.push('ANSWER KEY (for the grown-up only)');
    h.clues.forEach(function (c) { out.push(c.n + '. Hide at: ' + c.hideAt + ' -> leads to: ' + c.leadsTo + (c.isFinal ? ' (present)' : '')); });
    out.push('', 'Made with the free Christmas Scavenger Hunt Clue Generator: https://saemali.github.io/tools-site/christmas-scavenger-hunt-generator.html');
    return out.join('\n');
  }
  var api = { SPOTS: SPOTS, FINALS: FINALS, BANDS: BANDS, MIN_CLUES: MIN_CLUES, MAX_CLUES: MAX_CLUES, makeHunt: makeHunt, swapSpot: swapSpot, reword: reword, editClue: editClue, variants: variants, hintFor: hintFor, maxClues: maxClues, pool: pool, finalSpot: finalSpot, cardHTML: cardHTML, keyHTML: keyHTML, huntText: huntText, lines: lines, esc: esc, rng: rng };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }
  root.HMHunt = api;

  // ---------- UI ----------
  var $ = function (id) { return document.getElementById(id); };
  var st = { hunt: null, seed: '', salt: 0 };
  function newSeed() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }
  function skipped() { return Array.prototype.slice.call(document.querySelectorAll('#sh-skips input:not(:checked)')).map(function (e) { return e.value; }); }
  function opts() {
    return { setting: $('sh-setting').value, band: $('sh-band').value, count: +$('sh-count').value, seed: st.seed, finalId: $('sh-final').value, finalName: $('sh-fname').value, finalClue: $('sh-fclue').value, title: $('sh-title').value, skip: skipped() };
  }
  function renderSkips() {
    var setting = $('sh-setting').value, prev = {}; Array.prototype.forEach.call(document.querySelectorAll('#sh-skips input'), function (e) { prev[e.value] = e.checked; });
    $('sh-skips').innerHTML = SPOTS.filter(function (s) { return setting === 'both' || s.where === setting; }).map(function (s) {
      var on = prev[s.id] !== false; return '<label><input type="checkbox" value="' + s.id + '"' + (on ? ' checked' : '') + '> ' + s.emoji + ' ' + esc(s.name) + '</label>';
    }).join('');
  }
  function status(msg, err) { var e = $('sh-status'); e.textContent = msg; e.className = 'ss-status' + (msg ? (err ? ' err' : ' ok') : ''); }
  function build() {
    $('sh-custombox').hidden = $('sh-final').value !== 'custom';
    var o = opts(), mx = maxClues(o); $('sh-count').max = mx; $('sh-max').textContent = 'Up to ' + mx + ' with these settings.';
    var res = makeHunt(o);
    if (res.error) { st.hunt = null; status(res.error, true); $('sh-cards').innerHTML = ''; $('sh-keywrap').innerHTML = ''; toggle(true); return; }
    st.hunt = res; st.salt = 0; render();
  }
  function toggle(dis) { ['sh-print-cards', 'sh-print-key', 'sh-copy'].forEach(function (id) { $(id).disabled = dis; }); }
  function render() {
    var h = st.hunt, b = BANDS[h.band], n = h.clues.length, last = h.clues[n - 1].leadsTo, msg = n + ' clue cards for ' + b.label.replace('Ages', 'ages').replace('Teens', 'teens') + ', ending at: ' + last + '. Set code ' + h.seed + '.';
    if (n < b.suggest[0] || n > b.suggest[1]) msg += ' Tip: ' + b.suggest[0] + '–' + b.suggest[1] + ' clues suits ' + b.label.replace('Ages', 'ages').replace('Teens', 'teens') + ' best.';
    status(msg, false); toggle(false);
    $('sh-cards').innerHTML = h.clues.map(function (c, i) {
      return '<div class="sh-item">' + cardHTML(c, n, h.title) + '<p class="sh-where">📍 Hide at: <b>' + esc(c.hideAt) + '</b><br>➡️ Leads to: <b>' + esc(c.leadsTo) + '</b>' + (c.edited ? ' <span class="sh-ed">(edited)</span>' : '') + '</p>' +
        '<div class="sh-btns"><button type="button" class="btn ghost ss-sm" data-act="reword" data-i="' + i + '">🔁 Reword</button>' + (c.isFinal ? '' : '<button type="button" class="btn ghost ss-sm" data-act="swap" data-i="' + i + '">📍 Different spot</button>') + '<button type="button" class="btn ghost ss-sm" data-act="edit" data-i="' + i + '">✏️ Edit</button></div>' +
        '<div class="sh-editbox" id="sh-edit-' + i + '" hidden><label for="sh-ta-' + i + '">Your clue (use a new line or / between lines)</label><textarea id="sh-ta-' + i + '" maxlength="300">' + esc(lines(c.text).join('\n')) + '</textarea><div class="sh-btns"><button type="button" class="btn ss-sm" data-act="save" data-i="' + i + '">Save</button><button type="button" class="btn ghost ss-sm" data-act="cancel" data-i="' + i + '">Cancel</button></div></div></div>';
    }).join('');
    $('sh-keywrap').innerHTML = keyHTML(h);
  }
  function onCard(e) {
    var bt = e.target.closest('button[data-act]'); if (!bt || !st.hunt) return;
    var i = +bt.getAttribute('data-i'), act = bt.getAttribute('data-act'), r;
    if (act === 'edit') { $('sh-edit-' + i).hidden = false; $('sh-ta-' + i).focus(); return; }
    if (act === 'cancel') { $('sh-edit-' + i).hidden = true; return; }
    if (act === 'save') r = editClue(st.hunt, i, $('sh-ta-' + i).value);
    if (act === 'reword') r = reword(st.hunt, i);
    if (act === 'swap') r = swapSpot(st.hunt, i, opts(), ++st.salt);
    if (r.error) { status(r.error, true); return; }
    st.hunt = r.hunt; render();
    var nb = document.querySelector('#sh-cards button[data-act="' + (act === 'save' ? 'edit' : act) + '"][data-i="' + i + '"]'); if (nb) nb.focus();
  }
  function printWhat(what) {
    if (!st.hunt) return; var h = st.hunt, pp = +$('sh-pp').value, out = '';
    if (what === 'cards') {
      for (var i = 0; i < h.clues.length; i += pp) out += '<div class="sp-page"><div class="sp-grid">' + h.clues.slice(i, i + pp).map(function (c) { return cardHTML(c, h.clues.length, h.title); }).join('') + '</div></div>';
      $('sh-print').className = 'pp' + pp;
    } else {
      out = '<div class="sp-page"><h1>' + esc(h.title) + ': answer key</h1><p>For the grown-up only. Set code ' + esc(h.seed) + ', ' + esc(BANDS[h.band].label) + '. Hide each card at the place in the middle column, and put the present at the last spot.</p>' + keyHTML(h) + '<p>Tick each spot as you hide it. Count the cards before you start: ' + h.clues.length + ' cards.</p></div>';
      $('sh-print').className = 'ppkey';
    }
    $('sh-print').innerHTML = out; window.print();
  }
  function copyText() {
    if (!st.hunt) return; var t = huntText(st.hunt), done = function () { status('Copied the clues and answer key as text.', false); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(done, fallback); else fallback();
    function fallback() { var ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (er) { status('Copy failed. Select the answer key and copy it by hand.', true); } document.body.removeChild(ta); }
  }
  function init() {
    st.seed = newSeed(); $('sh-seed').value = st.seed;
    $('sh-final').innerHTML = FINALS.map(function (f) { return '<option value="' + f.id + '">' + f.emoji + ' ' + esc(f.name) + (f.where === 'out' ? ' (outdoors)' : '') + '</option>'; }).join('') + '<option value="custom">✏️ Somewhere else (type it)</option>';
    renderSkips();
    $('sh-setting').addEventListener('change', function () { renderSkips(); build(); });
    ['sh-band', 'sh-count', 'sh-final', 'sh-pp'].forEach(function (id) { $(id).addEventListener('change', build); });
    ['sh-title', 'sh-fname', 'sh-fclue'].forEach(function (id) { $(id).addEventListener('input', function () { clearTimeout(st.t); st.t = setTimeout(build, 300); }); });
    $('sh-skips').addEventListener('change', build);
    $('sh-seed').addEventListener('change', function () { var v = $('sh-seed').value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12); st.seed = v || newSeed(); $('sh-seed').value = st.seed; build(); });
    $('sh-shuffle').addEventListener('click', function () { st.seed = newSeed(); $('sh-seed').value = st.seed; build(); });
    $('sh-cards').addEventListener('click', onCard);
    $('sh-print-cards').addEventListener('click', function () { printWhat('cards'); });
    $('sh-print-key').addEventListener('click', function () { printWhat('key'); });
    $('sh-copy').addEventListener('click', copyText);
    $('sh-form').addEventListener('submit', function (e) { e.preventDefault(); build(); });
    build();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(this);

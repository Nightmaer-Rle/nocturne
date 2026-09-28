/* ═══════════════════════════════════════════════════════════
   NOCTURNE — tools/test-engine.js
   Headless playthrough of all twenty cases against the real
   engine. Run:  node tools/test-engine.js
   Exits non-zero on the first failed expectation.
   ═══════════════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const JS = path.join(ROOT, 'assets', 'js');

let failures = 0;
let checks = 0;

function ok(label, condition, detail) {
  checks += 1;
  if (condition) {
    console.log('  \x1b[32mPASS\x1b[0m  ' + label);
  } else {
    failures += 1;
    console.log('  \x1b[31mFAIL\x1b[0m  ' + label + (detail ? '  \x1b[2m' + detail + '\x1b[0m' : ''));
  }
}

function section(title) {
  console.log('\n\x1b[1m' + title + '\x1b[0m');
}

/* ── Minimal browser shim ────────────────────────────────── */

const localStorage = {};
localStorage.getItem = k => (k in localStorage ? localStorage[k] : null);
localStorage.setItem = (k, v) => { localStorage[k] = String(v); };
localStorage.removeItem = k => { delete localStorage[k]; };

const sandbox = {
  localStorage: localStorage,
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  document: { addEventListener() {} },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: () => 0,
  clearInterval: clearInterval,
  console: console
};

/* The runtime files end with `})(window)`, so make the sandbox
   refer to itself. `vm.createContext` proxies property access, so
   assignments made through `window` are visible to `sandbox`. */
sandbox.window = sandbox;

const ctx = vm.createContext(sandbox);

const LOAD = ['util.js', 'data.js', 'cases-a.js', 'cases-b.js', 'cases-c.js', 'cases-d.js', 'cases-e.js', 'engine.js'];
for (const file of LOAD) {
  vm.runInContext(fs.readFileSync(path.join(JS, file), 'utf8'), ctx, { filename: file });
}

/* `global.X = X` assignments land on the sandbox; top-level `const`
   bindings stay VM-lexical, so those must be read via runInContext. */
const Engine = sandbox.Engine;
const ALL = vm.runInContext('ALL_CASES', ctx).slice().sort((a, b) => a.id - b.id);
const TIER_ORDER = vm.runInContext('TIER_ORDER', ctx);

/* ── Registry integrity ──────────────────────────────────── */

section('Registry');

ok('20 cases loaded', ALL.length === 20, 'got ' + ALL.length);
ok('case ids are 1..20 with no gaps',
  ALL.every((c, i) => c.id === i + 1));
ok('every case has a positive merit', ALL.every(c => c.merit > 0));
ok('every case has clues, locations and suspects',
  ALL.every(c => c.clues.length > 0 && c.locations.length > 0 && c.suspects.length > 0));
ok('no clue id is reused inside a case',
  ALL.every(c => new Set(c.clues.map(x => x.id)).size === c.clues.length));
ok('every exam points at a real clue or is flagged dead',
  ALL.every(c => c.locations.every(l => l.exams.every(x => x.dead || c.clues.some(k => k.id === x.clue)))));
ok('every truth.culprit is a real suspect',
  ALL.every(c => c.suspects.some(s => s.id === c.truth.culprit)));
ok('every truth.motive is one of the case motives',
  ALL.every(c => c.motives.indexOf(c.truth.motive) !== -1));
ok('every truth.method is one of the case methods',
  ALL.every(c => c.methods.indexOf(c.truth.method) !== -1));
ok('every truth.key clue exists',
  ALL.every(c => c.truth.key.every(id => c.clues.some(k => k.id === id))));
ok('every confront entry is reachable and reveals a real clue',
  ALL.every(c => Object.keys(c.confront).every(sid =>
    c.suspects.some(s => s.id === sid) &&
    Object.keys(c.confront[sid]).every(cid =>
      c.clues.some(k => k.id === cid) &&
      (!c.confront[sid][cid].reveals || c.clues.some(k => k.id === c.confront[sid][cid].reveals))))));
ok('every clue is discoverable by examination or confrontation',
  ALL.every(c => {
    const viaExam = new Set(c.locations.flatMap(l => l.exams).filter(x => x.clue).map(x => x.clue));
    const viaConfront = new Set(Object.values(c.confront).flatMap(n => Object.values(n).map(e => e.reveals).filter(Boolean)));
    return c.clues.every(k => viaExam.has(k.id) || viaConfront.has(k.id));
  }));
ok('tier counts are 5 / 7 / 5 / 3', (() => {
  const n = { easy: 0, medium: 0, hard: 0, expert: 0 };
  ALL.forEach(c => { n[c.tier] += 1; });
  return n.easy === 5 && n.medium === 7 && n.hard === 5 && n.expert === 3;
})(), JSON.stringify(ALL.reduce((a, c) => { a[c.tier] = (a[c.tier] || 0) + 1; return a; }, {})));

/* ── Unlocking ───────────────────────────────────────────── */

section('Progression');

ok('only case 1 is unlocked on a fresh profile', Engine.isUnlocked(1));
ok('case 2 is locked on a fresh profile', !Engine.isUnlocked(2));
ok('Engine.start(2) is refused while locked', Engine.start(2) === null);
ok('Engine.start(1) succeeds', !!Engine.start(1));
ok('case 2 unlocks once case 1 is closed', (() => {
  Engine.accuse({ culprit: 's1', motive: 'x', method: 'y', evidence: [] });
  return Engine.isUnlocked(2);
})());

/* ── Per-case perfect playthrough ────────────────────────── */

section('Perfect playthroughs (all 20 cases)');

const merits = [];

for (const c of ALL) {
  const run = Engine.start(c.id);
  if (!run) { ok('case ' + c.id + ' starts', false, 'locked'); continue; }

  /* A flawless run: every hotspot that yields something, every pairing
     that has a reaction, nothing wasted. This must return exactly par. */
  let examined = 0;
  for (const loc of c.locations) {
    Engine.enter(loc.id);
    for (const x of loc.exams) {
      if (x.dead) continue;
      Engine.examine(x.id); examined += 1;
    }
  }

  let confronted = 0;
  for (const s of c.suspects) {
    for (let pass = 0; pass < 2; pass++) {
      for (const k of c.clues) {
        if (Engine.confrontAvailable(s.id, k.id)) { Engine.confront(s.id, k.id); confronted += 1; }
      }
    }
  }

  const allFound = run.found.length === c.clues.length;
  const keyFound = c.truth.key.every(id => run.found.indexOf(id) !== -1);
  const wasted = run.deadEnds.length + run.failedConfront;

  const result = Engine.accuse({
    culprit: c.truth.culprit,
    motive: c.truth.motive,
    method: c.truth.method,
    evidence: run.found.slice()
  });

  const label = 'case ' + String(c.id).padStart(2, '0') + ' ' + (c.title.length > 30 ? c.title.slice(0, 30) + '…' : c.title);
  const good = allFound && keyFound && wasted === 0 && result.solved && result.stars === 3 && result.score === c.merit;

  ok(label, good,
    'examined ' + examined + ', confronted ' + confronted +
    ', clues ' + run.found.length + '/' + c.clues.length +
    ', wasted ' + wasted +
    ', stars ' + result.stars + ', ' + result.score + '/' + c.merit);

  merits.push(result.score);
}

/* A blind run — one that trips every dead end, like a player who cannot
   tell in advance — must still reach three stars, but must not reach par. */
section('Blind run tolerance (case 1)');

(function blind() {
  const c = ALL[0];
  const run = Engine.start(c.id);
  for (const loc of c.locations) {
    Engine.enter(loc.id);
    for (const x of loc.exams) Engine.examine(x.id);
  }
  for (const s of c.suspects) {
    for (const k of c.clues) if (Engine.confrontAvailable(s.id, k.id)) Engine.confront(s.id, k.id);
  }
  const res = Engine.accuse({
    culprit: c.truth.culprit, motive: c.truth.motive, method: c.truth.method, evidence: run.found.slice()
  });
  const deadCount = c.locations.flatMap(l => l.exams).filter(x => x.dead).length;
  ok('a blind run still clears three stars', res.stars === 3, 'got ' + res.stars);
  ok('a blind run loses merit to dead ends', res.score < c.merit, res.score + ' of ' + c.merit);
  ok('the dead ends it tripped are the ones in the data', res.deadEnds === deadCount, res.deadEnds + ' vs ' + deadCount);
  Engine.start(c.id);
  Engine.accuse({ culprit: c.truth.culprit, motive: c.truth.motive, method: c.truth.method, evidence: [] });
})();

/* ── Career state after a full clear ─────────────────────── */

section('Career');

const total = merits.reduce((a, b) => a + b, 0);
const par = ALL.reduce((a, c) => a + c.merit, 0);
ok('all 20 cases closed', Engine.closedCount() === 20, 'got ' + Engine.closedCount());
ok('total merit equals the sum of every case par', Engine.totalMerit() === par,
  Engine.totalMerit() + ' vs ' + par);
ok('total stars is 60', Engine.totalStars() === 60, 'got ' + Engine.totalStars());
ok('every tier reports complete', TIER_ORDER.every(t => Engine.tierProgress(t).complete));
ok('no case is left on the "next" pointer', Engine.nextCase() === null);

const rank = Engine.rank();
ok('final rank is Commissioner', rank.badge === 'A' && rank.title === 'Commissioner',
  rank.badge + ' ' + rank.title);

const ach = Engine.achievements();
const earned = ach.filter(a => a.earned).map(a => a.id);
ok('first-case earned', earned.indexOf('first-case') !== -1);
ok('first-perfect earned', earned.indexOf('first-perfect') !== -1);
ok('ten-stars earned', earned.indexOf('ten-stars') !== -1);
ok('no-hints earned', earned.indexOf('no-hints') !== -1);
ok('tier1..tier4 earned', ['tier1', 'tier2', 'tier3', 'tier4'].every(id => earned.indexOf(id) !== -1));
ok('all-closed earned', earned.indexOf('all-closed') !== -1);
ok('archivist earned (every key clue found on every case)', earned.indexOf('archivist') !== -1);

/* ── Scoring shape ───────────────────────────────────────── */

section('Scoring');

const c1 = ALL[0];

/* Wrong culprit is never rewarded. */
(function wrongCulprit() {
  const run = Engine.start(c1.id);
  const liar = c1.suspects.find(s => s.id !== c1.truth.culprit);
  run.found = c1.clues.map(k => k.id);
  const res = Engine.score({ culprit: liar.id, motive: c1.truth.motive, method: c1.truth.method, evidence: c1.clues.map(k => k.id) });
  ok('naming the wrong person yields 0 stars', res.stars === 0, 'got ' + res.stars);
  ok('naming the wrong person still banks the non-culprit rows', res.score > 0 && res.score < c1.merit,
    'got ' + res.score + ' of ' + c1.merit);
})();

/* Evidence you never found cannot be cited. */
(function uncitedEvidence() {
  const run = Engine.start(c1.id);
  const res = Engine.score({ culprit: c1.truth.culprit, motive: c1.truth.motive, method: c1.truth.method, evidence: c1.truth.key });
  ok('citing evidence you did not find scores nothing', res.keyCited === 0, 'got ' + res.keyCited);
  ok('a bare-bones accusation is one star, not more', res.stars === 1, 'got ' + res.stars);
  ok('a bare-bones accusation lands near half of par', res.ratio > 0.45 && res.ratio < 0.56,
    'ratio ' + res.ratio.toFixed(3));
})();

/* Penalties bite. */
(function penalties() {
  const run = Engine.start(c1.id);
  run.hintsUsed = 3;
  run.deadEnds = ['a', 'b'];
  run.failedConfront = 2;
  const res = Engine.score({ culprit: c1.truth.culprit, motive: c1.truth.motive, method: c1.truth.method, evidence: run.found });
  const debits = res.rows.filter(r => r.pts < 0);
  ok('penalties appear as debit rows', debits.length === 3, 'got ' + debits.length);
  ok('penalties reduce the total', res.score < res.merit);
})();

/* Best score is kept, never overwritten by a worse run. */
(function bestIsKept() {
  const before = Engine.caseRecord(c1.id);
  const worst = before.score;
  Engine.start(c1.id);
  Engine.accuse({ culprit: c1.id === 1 ? 's2' : 's1', motive: 'anything', method: 'wrong', evidence: [] });
  const after = Engine.caseRecord(c1.id);
  ok('a worse replay never lowers the stored best', after.score === worst, worst + ' -> ' + after.score);
  ok('a solved case stays solved after a failed replay', after.solved === true);
})();

/* ── Save / resume ───────────────────────────────────────── */

section('Save and resume');

(function saveResume() {
  const target = ALL[4];
  Engine.start(target.id);
  Engine.enter(target.locations[0].id);
  for (const x of target.locations[0].exams) Engine.examine(x.id);
  const before = {
    found: Engine.run.found.length,
    examined: Engine.run.examined.length,
    timeLeft: Engine.run.timeLeft
  };
  ok('a run is written to storage', Engine.hasSave());

  Engine.run = null;
  const info = Engine.savedInfo();
  ok('savedInfo describes the open file', info && info.data.id === target.id, 'got ' + (info && info.data.id));

  const restored = Engine.resumeSave();
  ok('resume restores the same case', restored && restored.caseId === target.id);
  ok('resume restores found clues', restored.found.length === before.found, restored.found.length + ' vs ' + before.found);
  ok('resume restores examined hotspots', restored.examined.length === before.examined);
  ok('resume restores the clock', restored.timeLeft === before.timeLeft);
  ok('a restored run starts paused', restored.paused === true);
})();

/* ── Deadline expiry ─────────────────────────────────────── */

section('Deadline');

(function expiry() {
  const timed = ALL.find(c => c.deadline > 0);
  const run = Engine.start(timed.id);
  ok('starting a timed case sets a clock', run.deadline === timed.deadline && run.timeLeft === timed.deadline);
  run.timeLeft = 2;
  Engine.tick(5);
  ok('the clock stops at zero', run.timeLeft === 0);
  ok('expiry ends the run', run.finished === true && run.expired === true);

  const res = Engine.accuse({ culprit: timed.truth.culprit, motive: timed.truth.motive, method: timed.truth.method, evidence: run.found });
  ok('an expired case scores nothing', res.score === 0 && res.stars === 0);
  ok('an expired case reports itself as expired', res.expired === true);
  ok('an expired case still reveals the truth', !!res.truth);
})();

(function pauseStopsClock() {
  const timed = ALL.find(c => c.deadline > 0);
  const run = Engine.start(timed.id);
  const at = run.timeLeft;
  Engine.pause();
  Engine.tick(30);
  ok('a paused run does not lose time', run.timeLeft === at, at + ' -> ' + run.timeLeft);
  Engine.resume();
  Engine.tick(10);
  ok('a resumed run loses time again', run.timeLeft === at - 10, 'got ' + run.timeLeft);
  Engine.abandon();
  ok('abandoning clears the save', !Engine.hasSave());
})();

/* ── Hint policy ─────────────────────────────────────────── */

section('Hint policy');

(function hints() {
  const run = Engine.start(1);
  Engine.setHintPolicy('off');
  ok('hints are unavailable when off', Engine.hint() === null && !Engine.hintAvailable());
  Engine.setHintPolicy('limited');
  ok('the first hint is available', typeof Engine.hint() === 'string');
  ok('a second hint is refused', Engine.hint() === null && !Engine.hintAvailable());
  Engine.setHintPolicy('on');
  ok('hints are unlimited again', typeof Engine.hint() === 'string');
  ok('the run counts its hints', run.hintsUsed === 2, 'got ' + run.hintsUsed);
  Engine.abandon();
})();

/* ── Confrontation bookkeeping ───────────────────────────── */

section('Confrontations');

(function confrontBookkeeping() {
  const target = ALL[0];
  const run = Engine.start(target.id);
  const sid = target.truth.culprit;
  const entry = target.confront[sid] && Object.keys(target.confront[sid])[0];
  if (!entry) { ok('case 1 has a confrontation for the culprit', false); return; }

  const first = Engine.confront(sid, entry);
  ok('a valid pairing succeeds', first.ok === true);
  ok('a valid pairing is marked as used', Engine.confrontAvailable(sid, entry) === false);

  const again = Engine.confront(sid, entry);
  ok('repeating a pairing is flagged, not replayed', again.ok === true && again.repeat === true);
  ok('a repeated pairing does not duplicate the evidence', run.found.filter(id => id === first.revealed.id).length === 1);

  const logsBefore = run.log.length;
  Engine.confront(sid, entry);
  ok('a repeated pairing adds no new log line', run.log.length === logsBefore);

  const stranger = target.suspects.find(s => !target.confront[s.id]);
  if (stranger) {
    const quiet = Engine.confront(stranger.id, target.clues[0].id);
    ok('someone with no reactions says nothing', quiet.ok === false && quiet.reason === 'silent');
  }
  Engine.abandon();
})();

/* ── Board ───────────────────────────────────────────────── */

section('Hall of records');

(function board() {
  const rows = Engine.localBoard();
  ok('the board has rows', rows.length > 0);
  ok('exactly one row is flagged as you', rows.filter(r => r.you).length === 1);
  ok('the board is sorted by Tier IV clearance', rows.every((r, i) => i === 0 || rows[i - 1].tier4 >= r.tier4));
  ok('every row names a detective', rows.every(r => typeof r.callsign === 'string' && r.callsign.length > 0));
})();

/* ── Verdict ─────────────────────────────────────────────── */

console.log('\n' + (failures === 0
  ? '\x1b[32m' + checks + ' checks passed.\x1b[0m'
  : '\x1b[31m' + failures + ' of ' + checks + ' checks FAILED.\x1b[0m'));

process.exit(failures === 0 ? 0 : 1);

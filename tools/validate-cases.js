#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════
   NOCTURNE — tools/validate-cases.js
   Cross-checks assets/js/data.js + cases-a..e.js without a browser.

     node tools/validate-cases.js          # report
     node tools/validate-cases.js --quiet  # only errors

   Exits non-zero if any error is found. Warnings never fail the run.
   ═══════════════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'assets', 'js');
const ORDER = ['data.js', 'cases-a.js', 'cases-b.js', 'cases-c.js', 'cases-d.js', 'cases-e.js'];

const QUIET = process.argv.includes('--quiet');

// The tier each case number is meant to sit in. Cheap guard against a case
// file being split in the wrong place.
const EXPECTED_TIER = {
  1: 'easy', 2: 'easy', 3: 'easy', 4: 'easy', 5: 'easy',
  6: 'medium', 7: 'medium', 8: 'medium', 9: 'medium', 10: 'medium', 11: 'medium', 12: 'medium',
  13: 'hard', 14: 'hard', 15: 'hard', 16: 'hard', 17: 'hard',
  18: 'expert', 19: 'expert', 20: 'expert',
};

const TOTAL_CASES = 20;

// ---------- load ----------
const ctx = vm.createContext({ console });
for (const f of ORDER) {
  const p = path.join(ROOT, f);
  try {
    vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: p });
  } catch (e) {
    console.error('FATAL: ' + f + ' did not evaluate: ' + e.message);
    process.exit(2);
  }
}

// Top-level `const` lands in the context's lexical scope, not on the context
// object, so pull the bindings out with one extra script.
const M = vm.runInContext(
  '({ ALL_CASES, TIERS, TIER_ORDER, RANKS, ACHIEVEMENTS, QUOTES, KIND_LABEL })',
  ctx
);
const ALL_CASES = M.ALL_CASES;

const errs = [];
const warns = [];
const E = m => errs.push(m);
const W = m => warns.push(m);

if (!ALL_CASES) {
  console.error('FATAL: ALL_CASES is not defined — did the case files load?');
  process.exit(2);
}

// ---------- registry ----------
const ids = ALL_CASES.map(c => c.id);
for (const v of new Set(ids)) {
  if (ids.filter(x => x === v).length > 1) E('duplicate case id: ' + v);
}
const missing = [];
for (let i = 1; i <= TOTAL_CASES; i++) if (!ids.includes(i)) missing.push(i);
if (missing.length) E('missing case ids: ' + missing.join(', '));
if (ids.length !== TOTAL_CASES) E('expected ' + TOTAL_CASES + ' cases, found ' + ids.length);

for (const [i, a] of (M.ACHIEVEMENTS || []).entries()) {
  if (!a.id) E('achievement[' + i + '] has no id');
  if (!a.name) E('achievement ' + (a.id || i) + ' has no name');
}
if (!M.QUOTES || !M.QUOTES.length) W('QUOTES is empty');

// ---------- per case ----------
for (const c of ALL_CASES) {
  const tag = 'case ' + c.id + ' (' + (c.title || '?') + ')';

  // required shape
  for (const k of ['id', 'tier', 'title', 'date', 'weather', 'place', 'client', 'fee',
    'brief', 'setup', 'deadline', 'suspects', 'motives', 'methods',
    'locations', 'clues', 'confront', 'truth', 'hint', 'merit']) {
    if (c[k] === undefined || c[k] === null) E(tag + ': missing required field "' + k + '"');
  }
  if (c.tier && M.TIER_ORDER.indexOf(c.tier) === -1) E(tag + ': unknown tier "' + c.tier + '"');
  if (EXPECTED_TIER[c.id] && c.tier !== EXPECTED_TIER[c.id]) {
    E(tag + ': tier "' + c.tier + '" should be "' + EXPECTED_TIER[c.id] + '"');
  }
  if (c.tier === 'easy' && c.deadline) W(tag + ': easy case has a nonzero deadline (' + c.deadline + ')');
  if (typeof c.deadline === 'number' && c.deadline > 0 && c.deadline < 1800) {
    W(tag + ': suspiciously short deadline (' + c.deadline + 's)');
  }
  if (typeof c.merit !== 'number') W(tag + ': merit is not a number');
  for (const k of ['brief', 'motives', 'methods', 'suspects', 'locations', 'clues']) {
    if (c[k] && !Array.isArray(c[k])) E(tag + ': ' + k + ' is not an array');
  }
  if (c.brief && c.brief.length < 2) W(tag + ': brief has fewer than 2 paragraphs');

  // suspects
  const sIds = new Set();
  for (const [i, s] of (c.suspects || []).entries()) {
    if (!s.id) { E(tag + ': suspect[' + i + '] has no id'); continue; }
    if (sIds.has(s.id)) E(tag + ': duplicate suspect id ' + s.id);
    sIds.add(s.id);
    for (const k of ['name', 'role', 'note']) if (!s[k]) E(tag + ': suspect ' + s.id + ' missing "' + k + '"');
    if (s.face && [...String(s.face)].length !== 1) W(tag + ': suspect ' + s.id + ' face is not a single character');
  }
  if (sIds.size < 3) W(tag + ': only ' + sIds.size + ' suspects');
  for (const k of ['motives', 'methods']) {
    if (c[k] && c.suspects && c[k].length !== c.suspects.length) {
      W(tag + ': ' + k + ' (' + c[k].length + ') != suspects (' + c.suspects.length + ')');
    }
  }

  // locations / clues
  const lIds = new Set();
  const clueIds = new Set();
  const examIds = new Set();
  const clueFrom = Object.create(null);
  const presentAt = Object.create(null);

  for (const cl of c.clues || []) {
    if (!cl.id) { E(tag + ': a clue has no id'); continue; }
    if (clueIds.has(cl.id)) E(tag + ': duplicate clue id ' + cl.id);
    clueIds.add(cl.id);
    for (const k of ['name', 'type', 'text']) if (!cl[k]) E(tag + ': clue ' + cl.id + ' missing "' + k + '"');
    clueFrom[cl.id] = cl.from;
  }

  for (const [li, l] of (c.locations || []).entries()) {
    if (!l.id) { E(tag + ': location[' + li + '] has no id'); continue; }
    if (lIds.has(l.id)) E(tag + ': duplicate location id ' + l.id);
    lIds.add(l.id);
    if (!l.name) E(tag + ': location ' + l.id + ' has no name');
    if (!l.desc) W(tag + ': location ' + l.id + ' has no desc');
    if (!l.exams || !l.exams.length) W(tag + ': location ' + l.id + ' has no exams');

    presentAt[l.id] = l.present || [];
    for (const p of presentAt[l.id]) {
      if (!sIds.has(p)) E(tag + ': location ' + l.id + ' present[] names unknown suspect ' + p);
    }

    for (const [xi, x] of (l.exams || []).entries()) {
      if (!x.id) { E(tag + ': ' + l.id + ' exam[' + xi + '] has no id'); continue; }
      if (examIds.has(x.id)) E(tag + ': duplicate exam id ' + x.id);
      examIds.add(x.id);
      if (!x.name) W(tag + ': exam ' + x.id + ' has no name');
      if (x.clue) {
        if (!clueIds.has(x.clue)) {
          E(tag + ': exam ' + x.id + ' points at unknown clue ' + x.clue);
        } else if (clueFrom[x.clue] !== l.id) {
          E(tag + ': exam ' + x.id + ' is in ' + l.id + ' but yields clue ' + x.clue + ' which comes from ' + clueFrom[x.clue]);
        }
      } else if (!x.dead) {
        E(tag + ': exam ' + x.id + ' has neither a clue nor dead:true');
      }
    }
  }

  const yielded = new Set();
  for (const l of c.locations || []) for (const x of l.exams || []) if (x.clue) yielded.add(x.clue);
  for (const cid of clueIds) if (!yielded.has(cid)) E(tag + ': clue ' + cid + ' is unreachable — no exam yields it');

  // confrontation
  if (!c.confront || typeof c.confront !== 'object') E(tag + ': confront missing or not an object');
  const confronted = new Set();
  for (const [sid, node] of Object.entries(c.confront || {})) {
    if (!sIds.has(sid)) { E(tag + ': confront key ' + sid + ' is not a suspect'); continue; }
    confronted.add(sid);
    const entries = Object.entries(node);
    if (!entries.length) { W(tag + ': confront[' + sid + '] is empty'); continue; }
    for (const [cKey, v] of entries) {
      if (!clueIds.has(cKey)) E(tag + ': confront[' + sid + '] keyed on unknown clue ' + cKey);
      if (!v || !v.line) E(tag + ': confront[' + sid + '][' + cKey + '] has no line');
      if (v && v.reveals) {
        if (!clueIds.has(v.reveals)) {
          E(tag + ': confront[' + sid + '][' + cKey + '] reveals unknown clue ' + v.reveals);
        } else {
          const at = clueFrom[v.reveals];
          if (presentAt[at] && presentAt[at].length && presentAt[at].indexOf(sid) === -1) {
            W(tag + ': confront[' + sid + '] reveals ' + v.reveals + ' from ' + at + ', where ' + sid + ' is not present');
          }
        }
      }
    }
  }
  for (const sid of sIds) if (!confronted.has(sid)) W(tag + ': suspect ' + sid + ' has no confrontation dialogue');

  // truth
  const t = c.truth;
  if (t) {
    if (t.culprit && !sIds.has(t.culprit)) E(tag + ': truth.culprit "' + t.culprit + '" is not a suspect');
    if (t.culprit && !confronted.has(t.culprit)) E(tag + ': the culprit ' + t.culprit + ' cannot be confronted');
    for (const k of ['motive', 'method', 'narrative', 'reveal']) {
      if (!t[k]) E(tag + ': truth.' + k + ' is missing');
    }
    if (t.motive && c.motives && c.motives.indexOf(t.motive) === -1) {
      W(tag + ': truth.motive is not one of the offered motives — the player can never score it');
    }
    if (t.method && c.methods && c.methods.indexOf(t.method) === -1) {
      W(tag + ': truth.method is not one of the offered methods — the player can never score it');
    }
    if (!Array.isArray(t.key) || !t.key.length) E(tag + ': truth.key is missing or empty');
    else for (const k of t.key) if (!clueIds.has(k)) E(tag + ': truth.key names unknown clue ' + k);
  }

  // rendered text sanity
  const text = [].concat(
    c.brief || [],
    [c.setup, c.hint],
    (c.locations || []).map(l => l.desc),
    (c.clues || []).map(x => x.text),
    (c.suspects || []).map(s => s.note),
    Object.values(c.confront || {}).flatMap(n => Object.values(n).map(v => v && v.line)),
    [t && t.narrative, t && t.reveal]
  ).filter(Boolean).join('\n');

  const junk = [...new Set(text.match(/[\uFFFD\u0000-\u0008\u000B\u000C\u000E-\u001F]/g) || [])];
  if (junk.length) {
    E(tag + ': text contains control/replacement characters: ' +
      junk.map(ch => 'U+' + ch.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' '));
  }
  if (text.includes('\\"')) E(tag + ': text contains a literal backslash-quote (\\")');
  if (text.includes('" "')) E(tag + ': text contains a stray double quote (")');
}

// ---------- report ----------
if (!QUIET) {
  console.log('NOCTURNE case data — ' + ALL_CASES.length + ' cases');
  console.log('tiers: ' + M.TIER_ORDER.map(t => t + '=' + ALL_CASES.filter(c => c.tier === t).length).join('  '));
  console.log('');
  console.log('  #  tier      title');
  for (const c of [...ALL_CASES].sort((a, b) => a.id - b.id)) {
    console.log(
      '  ' + String(c.id).padStart(2) + '  ' + String(c.tier || '?').padEnd(8) +
      ' ' + (c.title || '?') +
      '  [S' + (c.suspects || []).length +
      ' L' + (c.locations || []).length +
      ' C' + (c.clues || []).length +
      ' merit ' + c.merit + ']'
    );
  }
  console.log('');
}

console.log('errors: ' + errs.length);
for (const e of errs) console.log('  ! ' + e);

if (!QUIET) {
  console.log('');
  console.log('warnings: ' + warns.length);
  for (const w of warns) console.log('  ~ ' + w);
}

process.exit(errs.length ? 1 : 0);

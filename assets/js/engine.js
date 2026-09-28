/* ═══════════════════════════════════════════════════════════
   NOCTURNE — engine.js
   Game state, investigation rules, deduction scoring, career
   progression. Emits on U.bus; renders nothing itself.
   ═══════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const Engine = {
    run: null,
    config: { hintPolicy: 'on', autosave: true },
    SAVE_KEY: 'run',
    PROFILE_KEY: 'profile'
  };

  const ALL = () => ALL_CASES.slice().sort((a, b) => a.id - b.id);
  const TIER_LIST = () => TIER_ORDER.map(id => Object.assign({ cases: ALL().filter(c => c.tier === id) }, TIERS[id]));

  /* ── Registry ────────────────────────────────────────── */

  Engine.cases = ALL;
  Engine.tiers = TIER_LIST;
  Engine.achievementList = () => ACHIEVEMENTS;
  Engine.kindLabel = kind => KIND_LABEL[kind] || 'Evidence';
  Engine.clue = (data, id) => U.byId(data.clues, id);
  Engine.suspect = (data, id) => U.byId(data.suspects, id);
  Engine.location = (data, id) => U.byId(data.locations, id);
  Engine.exam = function (data, id) {
    for (const l of data.locations) {
      const x = U.byId(l.exams, id);
      if (x) return x;
    }
    return null;
  };
  Engine.caseById = id => U.byId(ALL(), Number(id));

  Engine.roman = tier => (TIERS[tier] && TIERS[tier].roman) || '?';

  /* ── Career profile ──────────────────────────────────── */

  function blankProfile() {
    return { v: 1, callsign: '', closed: {}, achievements: {}, plays: 0 };
  }

  Engine.profile = function () {
    const p = U.store.get(Engine.PROFILE_KEY, null);
    if (!p || typeof p !== 'object' || !p.closed) return blankProfile();
    p.closed = p.closed || {};
    p.achievements = p.achievements || {};
    p.callsign = p.callsign || '';
    return p;
  };

  Engine.saveProfile = function (p) {
    U.store.set(Engine.PROFILE_KEY, p || Engine.profile());
  };

  Engine.isUnlocked = function (caseId) {
    const id = Number(caseId);
    if (id <= 1) return true;
    const p = Engine.profile();
    return !!(p.closed[id - 1] && p.closed[id - 1].solved);
  };

  /** The next case the player has not yet closed, or null. */
  Engine.nextCase = function () {
    const p = Engine.profile();
    for (const c of ALL()) if (!p.closed[c.id] || !p.closed[c.id].solved) return c;
    return null;
  };

  Engine.closedCount = function () {
    const p = Engine.profile();
    return ALL().filter(c => p.closed[c.id] && p.closed[c.id].solved).length;
  };

  Engine.totalMerit = function () {
    const p = Engine.profile();
    return ALL().reduce((sum, c) => sum + ((p.closed[c.id] && p.closed[c.id].score) || 0), 0);
  };

  Engine.totalStars = function () {
    const p = Engine.profile();
    return ALL().reduce((sum, c) => sum + ((p.closed[c.id] && p.closed[c.id].stars) || 0), 0);
  };

  Engine.perfectCount = function () {
    const p = Engine.profile();
    return ALL().filter(c => p.closed[c.id] && p.closed[c.id].stars === 3).length;
  };

  Engine.caseRecord = function (caseId) {
    const p = Engine.profile();
    return p.closed[Number(caseId)] || null;
  };

  Engine.rank = function () {
    const merit = Engine.totalMerit();
    let current = RANKS[0];
    let next = null;
    for (let i = 0; i < RANKS.length; i++) {
      if (merit >= RANKS[i].at) { current = RANKS[i]; next = RANKS[i + 1] || null; }
    }
    const floor = current.at;
    const ceiling = next ? next.at : current.at;
    return {
      badge: current.badge,
      title: current.title,
      next: next ? next.title : null,
      merit,
      floor,
      ceiling,
      pct: ceiling > floor ? U.clamp((merit - floor) / (ceiling - floor), 0, 1) : 1
    };
  };

  Engine.tierProgress = function (tierId) {
    const p = Engine.profile();
    const list = ALL().filter(c => c.tier === tierId);
    const done = list.filter(c => p.closed[c.id] && p.closed[c.id].solved).length;
    return { total: list.length, done, complete: done === list.length && list.length > 0 };
  };

  Engine.achievements = function () {
    const p = Engine.profile();
    return ACHIEVEMENTS.map(a => Object.assign({}, a, { earned: !!p.achievements[a.id], at: p.achievements[a.id] || null }));
  };

  /* ── Run lifecycle ───────────────────────────────────── */

  function freshRun(data) {
    return {
      caseId: data.id,
      data: data,
      found: [],
      examined: [],
      deadEnds: [],
      used: [],
      log: [],
      notes: '',
      deadline: data.deadline > 0 ? data.deadline : 0,
      timeLeft: data.deadline > 0 ? data.deadline : 0,
      hintsUsed: 0,
      failedConfront: 0,
      startedAt: Date.now(),
      elapsed: 0,
      locationId: null,
      paused: false,
      finished: false,
      expired: false,
      result: null
    };
  }

  Engine.start = function (caseId, opts) {
    const data = Engine.caseById(caseId);
    if (!data) return null;
    if (!Engine.isUnlocked(data.id)) return null;

    const p = Engine.profile();
    if (p.closed[data.id] && p.closed[data.id].solved && !(opts && opts.silent)) {
      grant('wrong-turn');
    }
    p.plays = (p.plays || 0) + 1;
    Engine.saveProfile(p);

    Engine.run = freshRun(data);
    Engine.saveRun();
    U.bus.emit('run:start', Engine.run);
    return Engine.run;
  };

  Engine.abandon = function () {
    Engine.run = null;
    U.store.del(Engine.SAVE_KEY);
    U.bus.emit('run:abandon');
  };

  Engine.pause = function () {
    if (!Engine.run || Engine.run.finished) return;
    Engine.run.paused = true;
    Engine.saveRun();
    U.bus.emit('run:pause');
  };

  Engine.resume = function () {
    if (!Engine.run || Engine.run.finished) return;
    Engine.run.paused = false;
    Engine.saveRun();
    U.bus.emit('run:resume');
  };

  Engine.setNotes = function (text) {
    if (!Engine.run) return;
    Engine.run.notes = String(text || '');
    Engine.saveRun();
  };

  Engine.setHintPolicy = function (policy) {
    Engine.config.hintPolicy = policy;
  };

  /* ── Clock ───────────────────────────────────────────── */

  Engine.tick = function (seconds) {
    const run = Engine.run;
    if (!run || run.paused || run.finished) return;
    if (!run.deadline) return;

    run.timeLeft = Math.max(0, run.timeLeft - seconds);
    run.elapsed += seconds;

    if (run.timeLeft <= 0 && !run.expired) {
      run.expired = true;
      run.finished = true;
      Engine.saveRun();
      U.bus.emit('run:expired', run);
    } else {
      U.bus.emit('run:tick', run);
    }
  };

  Engine.timeRatio = function () {
    const run = Engine.run;
    if (!run || !run.deadline) return 1;
    return U.clamp(run.timeLeft / run.deadline, 0, 1);
  };

  /* ── Investigation ───────────────────────────────────── */

  Engine.enter = function (locId) {
    if (!Engine.run) return null;
    const loc = Engine.location(Engine.run.data, locId);
    if (!loc) return null;
    Engine.run.locationId = loc.id;
    U.bus.emit('run:enter', loc);
    return loc;
  };

  Engine.examine = function (examId) {
    const run = Engine.run;
    if (!run) return { kind: 'none' };
    const exam = Engine.exam(run.data, examId);
    if (!exam) return { kind: 'none' };

    if (run.examined.indexOf(examId) !== -1) {
      const known = exam.clue ? Engine.clue(run.data, exam.clue) : null;
      return { kind: 'repeat', exam: exam, clue: known };
    }

    run.examined.push(examId);
    Engine.saveRun();

    if (exam.dead || !exam.clue) {
      if (run.deadEnds.indexOf(examId) === -1) run.deadEnds.push(examId);
      U.bus.emit('run:deadend', { exam: exam, locationId: run.locationId });
      return { kind: 'dead', exam: exam };
    }

    const clue = Engine.clue(run.data, exam.clue);
    const isNew = run.found.indexOf(exam.clue) === -1;
    if (isNew) {
      run.found.push(exam.clue);
      pushLog({
        who: 'Evidence recovered',
        txt: clue.name,
        src: Engine.location(run.data, clue.from) ? Engine.location(run.data, clue.from).name : '',
        tone: 'good',
        locId: clue.from
      });
    }
    U.bus.emit('run:clue', { clue: clue, isNew: isNew, locationId: clue.from });
    Engine.saveRun();
    return { kind: 'clue', exam: exam, clue: clue, isNew: isNew };
  };

  function pushLog(entry) {
    if (!Engine.run) return;
    Engine.run.log.push(Object.assign({ at: Date.now() }, entry));
    if (Engine.run.log.length > 200) Engine.run.log.shift();
  }

  Engine.pushLog = pushLog;

  Engine.sceneLog = function (locId) {
    if (!Engine.run) return [];
    return Engine.run.log.filter(e => !locId || e.locId === locId);
  };

  /**
   * Present a piece of evidence to somebody. Each pairing is a one-shot:
   * once used it will not fire again, and its replies come in a fixed order
   * of escalating pressure rather than at random.
   */
  Engine.confront = function (suspectId, clueId) {
    const run = Engine.run;
    if (!run) return { ok: false, reason: 'no-run' };

    const person = Engine.suspect(run.data, suspectId);
    const clue = Engine.clue(run.data, clueId);
    if (!person || !clue) return { ok: false, reason: 'unknown' };

    const node = run.data.confront[suspectId];
    if (!node) return { ok: false, reason: 'silent', person: person };

    const entry = node[clueId];
    if (!entry) {
      run.failedConfront += 1;
      pushLog({ who: person.name, txt: 'says nothing that helps.', src: clue.name, tone: 'bad', locId: run.locationId });
      U.bus.emit('run:confront', { person: person, clue: clue, ok: false });
      Engine.saveRun();
      return { ok: false, reason: 'nothing', person: person, clue: clue };
    }

    const pairKey = suspectId + '/' + clueId;
    const repeat = run.used.indexOf(pairKey) !== -1;
    if (!repeat) {
      run.used.push(pairKey);
      pushLog({ who: person.name, txt: entry.line, src: clue.name, tone: 'good', locId: run.locationId });
    }

    let revealed = null;
    let isNew = false;
    if (entry.reveals) {
      const r = Engine.clue(run.data, entry.reveals);
      if (r) {
        revealed = r;
        if (run.found.indexOf(r.id) === -1) {
          run.found.push(r.id);
          isNew = true;
          pushLog({
            who: 'Evidence recovered',
            txt: r.name,
            src: Engine.location(run.data, r.from) ? Engine.location(run.data, r.from).name : '',
            tone: 'good',
            locId: r.from
          });
        }
      }
    }

    U.bus.emit('run:confront', { person: person, clue: clue, ok: true, revealed: revealed, isNew: isNew, repeat: repeat });
    Engine.saveRun();
    return { ok: true, line: entry.line, person: person, clue: clue, revealed: revealed, isNew: isNew, repeat: repeat };
  };

  /** Can this pairing still produce something? Used to enable the button. */
  Engine.confrontAvailable = function (suspectId, clueId) {
    const run = Engine.run;
    if (!run) return false;
    const node = run.data.confront[suspectId];
    return !!(node && node[clueId] && run.used.indexOf(suspectId + '/' + clueId) === -1);
  };

  Engine.hint = function () {
    const run = Engine.run;
    if (!run || !run.data.hint) return null;
    if (Engine.config.hintPolicy === 'off') return null;
    if (Engine.config.hintPolicy === 'limited' && run.hintsUsed >= 1) return null;
    run.hintsUsed += 1;
    Engine.saveRun();
    U.bus.emit('run:hint', run.data.hint);
    return run.data.hint;
  };

  Engine.hintAvailable = function () {
    const run = Engine.run;
    if (!run) return false;
    if (Engine.config.hintPolicy === 'off') return false;
    if (Engine.config.hintPolicy === 'limited' && run.hintsUsed >= 1) return false;
    return true;
  };

  /* ── Deduction ───────────────────────────────────────── */

  /**
   * Weights are chosen so that naming the right person is worth having but
   * is not the whole game: a correct name with no evidence behind it lands
   * near 0.52 and earns one star, while a full file earns all three. Both
   * sets sum to 1, so a flawless run returns exactly `merit`.
   */
  function weightsFor(timed) {
    return timed
      ? { culprit: 0.30, motive: 0.10, method: 0.10, key: 0.26, thorough: 0.14, time: 0.10 }
      : { culprit: 0.30, motive: 0.11, method: 0.11, key: 0.28, thorough: 0.20, time: 0 };
  }

  /**
   * Score an accusation. Every award is a fraction of the case's `merit`,
   * which is also its par, so a perfect run returns exactly that number and
   * the career ladder in RANKS lines up with a full campaign.
   */
  Engine.score = function (choice) {
    const run = Engine.run;
    const d = run.data;
    const t = d.truth;
    const merit = d.merit || 1000;
    const timed = d.deadline > 0;
    const w = weightsFor(timed);
    const found = new Set(run.found);
    const cited = new Set(choice.evidence || []);

    const rows = [];
    const push = (label, pts, ok, note) => rows.push({ label: label, pts: Math.round(pts), ok: ok, note: note || '' });

    const culpritRight = choice.culprit === t.culprit;
    push('Culprit named correctly', w.culprit * merit * (culpritRight ? 1 : 0), culpritRight,
      culpritRight ? (Engine.suspect(d, t.culprit) || {}).name || '' : 'wrong person');

    const motiveRight = choice.motive === t.motive;
    push('Motive established', w.motive * merit * (motiveRight ? 1 : 0), motiveRight);

    const methodRight = choice.method === t.method;
    push('Method established', w.method * merit * (methodRight ? 1 : 0), methodRight);

    const keyTotal = t.key.length;
    const keyCited = t.key.filter(id => cited.has(id) && found.has(id)).length;
    push('Key evidence cited', w.key * merit * (keyTotal ? keyCited / keyTotal : 0), keyCited === keyTotal && keyTotal > 0,
      keyCited + '/' + keyTotal);

    const allTotal = d.clues.length;
    const allFound = d.clues.filter(c => found.has(c.id)).length;
    push('Evidence gathered', w.thorough * merit * (allTotal ? allFound / allTotal : 0), allFound === allTotal,
      allFound + '/' + allTotal);

    if (timed) {
      const ratio = Engine.timeRatio();
      push('Time remaining', w.time * merit * ratio, ratio > 0.25, U.fmtSpan(run.timeLeft));
    }

    let total = rows.reduce((s, r) => s + r.pts, 0);

    if (run.hintsUsed > 0) {
      const pen = Math.round(w.culprit * merit * 0.23 * run.hintsUsed);
      rows.push({ label: 'Hints consulted (' + run.hintsUsed + ')', pts: -pen, ok: false, note: 'consulted ' + run.hintsUsed });
      total -= pen;
    }
    if (run.deadEnds.length > 0) {
      const pen = Math.round(w.culprit * merit * 0.055 * run.deadEnds.length);
      rows.push({ label: 'Dead ends (' + run.deadEnds.length + ')', pts: -pen, ok: false, note: 'nothing there' });
      total -= pen;
    }
    if (run.failedConfront > 0) {
      const pen = Math.round(w.culprit * merit * 0.085 * run.failedConfront);
      rows.push({ label: 'Failed confrontations (' + run.failedConfront + ')', pts: -pen, ok: false, note: 'said nothing' });
      total -= pen;
    }

    total = U.clamp(Math.round(total), 0, merit);
    const ratio = merit > 0 ? total / merit : 0;

    let stars = 0;
    if (culpritRight) stars = ratio >= 0.8 ? 3 : ratio >= 0.55 ? 2 : 1;

    const grade = !culpritRight ? 'F'
      : ratio >= 0.95 ? 'S'
        : ratio >= 0.8 ? 'A'
          : ratio >= 0.65 ? 'B'
            : ratio >= 0.55 ? 'C' : 'D';

    rows.push({ label: 'Merit earned', pts: total, ok: true, total: true, note: 'par ' + merit });

    return {
      solved: culpritRight,
      culprit: culpritRight,
      motive: motiveRight,
      method: methodRight,
      score: total,
      merit: merit,
      ratio: ratio,
      stars: stars,
      grade: grade,
      rows: rows,
      truth: t,
      elapsed: run.elapsed,
      hintsUsed: run.hintsUsed,
      deadEnds: run.deadEnds.length,
      failedConfront: run.failedConfront,
      evidenceFound: allFound,
      evidenceTotal: allTotal,
      keyCited: keyCited,
      keyTotal: keyTotal
    };
  };

  /** Submit an accusation, bank the result, and end the run. */
  Engine.accuse = function (choice) {
    const run = Engine.run;
    if (!run) return null;

    const result = run.expired
      ? {
        solved: false, culprit: false, motive: false, method: false,
        score: 0, merit: run.data.merit, ratio: 0, stars: 0, grade: 'F',
        rows: [{ label: 'The deadline passed', pts: 0, ok: false, note: 'no submission' },
          { label: 'Merit earned', pts: 0, ok: true, total: true, note: 'par ' + run.data.merit }],
        truth: run.data.truth, elapsed: run.elapsed, hintsUsed: run.hintsUsed,
        deadEnds: run.deadEnds.length, failedConject: run.failedConfront,
        evidenceFound: run.found.length, evidenceTotal: run.data.clues.length,
        keyCited: 0, keyTotal: run.data.truth.key.length, expired: true
      }
      : Engine.score(choice);

    run.finished = true;
    run.result = result;
    run.paused = true;

    const p = Engine.profile();
    const prev = p.closed[run.caseId];
    const better = !prev || result.score > prev.score;
    p.closed[run.caseId] = {
      solved: !!(prev && prev.solved) || result.solved,
      score: Math.max(prev ? prev.score : 0, result.score),
      stars: Math.max(prev ? prev.stars : 0, result.stars),
      merit: run.data.merit,
      at: Date.now(),
      plays: ((prev && prev.plays) || 0) + 1
    };
    Engine.saveProfile(p);

    grantAfterResult(result, run);

    U.store.del(Engine.SAVE_KEY);
    U.bus.emit('run:verdict', result);
    return result;
  };

  /* ── Commendations ───────────────────────────────────── */

  function grant(id) {
    const p = Engine.profile();
    if (p.achievements[id]) return false;
    p.achievements[id] = Date.now();
    Engine.saveProfile(p);
    U.bus.emit('ach:unlock', U.byId(ACHIEVEMENTS, id));
    return true;
  }

  function grantAfterResult(result, run) {
    if (result.solved) {
      grant('first-case');
      if (result.stars === 3) grant('first-perfect');
      if (run.hintsUsed === 0) grant('no-hints');
      if (run.deadline > 0 && run.timeLeft >= 60) grant('speed');
      if (run.data.truth.key.every(k => run.found.indexOf(k) !== -1)) grant('archivist');
    }
    if (Engine.totalStars() >= 10) grant('ten-stars');

    for (const tier of TIER_ORDER) {
      const prog = Engine.tierProgress(tier);
      if (prog.complete) grant('tier' + (TIER_ORDER.indexOf(tier) + 1));
    }
    if (Engine.closedCount() >= Engine.cases().length) grant('all-closed');
  }

  /* ── Persistence of the active run ───────────────────── */

  Engine.saveRun = function () {
    if (!Engine.run || !Engine.config.autosave) return;
    const r = Engine.run;
    U.store.set(Engine.SAVE_KEY, {
      v: 1,
      caseId: r.caseId,
      found: r.found,
      examined: r.examined,
      deadEnds: r.deadEnds,
      used: r.used,
      log: r.log,
      notes: r.notes,
      timeLeft: r.timeLeft,
      elapsed: r.elapsed,
      startedAt: r.startedAt,
      locationId: r.locationId,
      hintsUsed: r.hintsUsed,
      failedConfront: r.failedConfront,
      expired: r.expired
    });
  };

  Engine.hasSave = function () {
    const s = U.store.get(Engine.SAVE_KEY, null);
    return !!(s && s.caseId && !s.expired && !s.finished && Engine.caseById(s.caseId));
  };

  Engine.savedInfo = function () {
    const s = U.store.get(Engine.SAVE_KEY, null);
    if (!s) return null;
    const data = Engine.caseById(s.caseId);
    if (!data) return null;
    return {
      data: data,
      found: (s.found || []).length,
      total: data.clues.length,
      timeLeft: s.timeLeft || 0,
      deadline: data.deadline || 0
    };
  };

  Engine.resumeSave = function () {
    const s = U.store.get(Engine.SAVE_KEY, null);
    const data = s && Engine.caseById(s.caseId);
    if (!data) return null;

    Engine.run = {
      caseId: data.id,
      data: data,
      found: s.found || [],
      examined: s.examined || [],
      deadEnds: s.deadEnds || [],
      used: s.used || [],
      log: s.log || [],
      notes: s.notes || '',
      deadline: data.deadline > 0 ? data.deadline : 0,
      timeLeft: s.timeLeft == null ? data.deadline : s.timeLeft,
      hintsUsed: s.hintsUsed || 0,
      failedConfront: s.failedConfront || 0,
      startedAt: s.startedAt || Date.now(),
      elapsed: s.elapsed || 0,
      locationId: s.locationId || null,
      paused: true,
      finished: false,
      expired: !!s.expired,
      result: null
    };
    U.bus.emit('run:start', Engine.run);
    return Engine.run;
  };

  Engine.wipe = function () {
    U.store.wipe();
    Engine.run = null;
  };

  /* ── Local standings ─────────────────────────────────── */

  const ARCHIVE = [
    { callsign: 'H. VANCE', tier4: 3, cases: 20, stars: 51, merit: 18000 },
    { callsign: 'M. DELACROIX', tier4: 3, cases: 20, stars: 47, merit: 16240 },
    { callsign: 'R. OKONKWO', tier4: 3, cases: 20, stars: 44, merit: 15110 },
    { callsign: 'J. FENWICK', tier4: 3, cases: 20, stars: 39, merit: 12870 },
    { callsign: 'A. BRANNIGAN', tier4: 2, cases: 17, stars: 34, merit: 10930 },
    { callsign: 'S. KOVAL', tier4: 2, cases: 15, stars: 29, merit: 8940 },
    { callsign: 'E. NAKASHIMA', tier4: 1, cases: 12, stars: 24, merit: 6410 },
    { callsign: 'P. LINDQVIST', tier4: 1, cases: 9, stars: 17, merit: 3980 },
    { callsign: 'D. AMARI', tier4: 0, cases: 6, stars: 11, merit: 2140 },
    { callsign: 'T. HOLLOWAY', tier4: 0, cases: 3, stars: 5, merit: 830 }
  ];

  Engine.archive = function () { return ARCHIVE.slice(); };

  /** Local standings: the archive plus this machine's own record. */
  Engine.localBoard = function () {
    const p = Engine.profile();
    const expert = ALL().filter(c => c.tier === 'expert');
    const mine = {
      callsign: p.callsign || 'UNSIGNED',
      tier4: expert.filter(c => p.closed[c.id] && p.closed[c.id].solved).length,
      cases: Engine.closedCount(),
      stars: Engine.totalStars(),
      merit: Engine.totalMerit(),
      you: true
    };
    const rows = ARCHIVE.concat([mine]);
    rows.sort((a, b) => (b.tier4 - a.tier4) || (b.cases - a.cases) || (b.stars - a.stars) || (b.merit - a.merit));
    return rows;
  };

  global.Engine = Engine;

})(window);

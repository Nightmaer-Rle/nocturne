/* ═══════════════════════════════════════════════════════════
   NOCTURNE — tools/test-ui.js
   End-to-end smoke test of the real markup and the real
   runtime, driven through jsdom: boot, case files, briefing,
   investigation, journal, confrontation, accusation, verdict.

   Requires jsdom:   npm install jsdom
   Run:              node tools/test-ui.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

let JSDOM;
let VirtualConsole;
let requestInterceptor;
try {
  ({ JSDOM, VirtualConsole, requestInterceptor } = require('jsdom'));
} catch (e) {
  console.log('\x1b[33mjsdom is not installed — skipping the UI test.\x1b[0m');
  console.log('Run:  npm install jsdom');
  process.exit(0);
}

const SCRIPTS = [
  'assets/js/util.js', 'assets/js/audio.js', 'assets/js/rain.js', 'assets/js/data.js',
  'assets/js/cases-a.js', 'assets/js/cases-b.js', 'assets/js/cases-c.js',
  'assets/js/cases-d.js', 'assets/js/cases-e.js',
  'assets/js/engine.js', 'assets/js/ui.js', 'assets/js/main.js'
];

let failures = 0;
let checks = 0;

function ok(label, condition, detail) {
  checks += 1;
  if (condition) console.log('  \x1b[32mPASS\x1b[0m  ' + label);
  else {
    failures += 1;
    console.log('  \x1b[31mFAIL\x1b[0m  ' + label + (detail ? '  \x1b[2m' + detail + '\x1b[0m' : ''));
  }
}

function section(title) { console.log('\n\x1b[1m' + title + '\x1b[0m'); }

const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ── Stubs for APIs jsdom does not implement ────────────── */

function canvasStub() {
  const noop = () => {};
  return {
    canvas: null,
    setTransform: noop, clearRect: noop, beginPath: noop, moveTo: noop,
    lineTo: noop, stroke: noop, ellipse: noop, save: noop, restore: noop,
    fill: noop, fillRect: noop, translate: noop, scale: noop, arc: noop
  };
}

function audioStub() {
  const param = () => ({
    value: 0,
    setValueAtTime: () => {}, linearRampToValueAtTime: () => {},
    exponentialRampToValueAtTime: () => {}, setTargetAtTime: () => {},
    cancelScheduledValues: () => {}
  });
  const node = extra => Object.assign({
    /* Real Web Audio returns the destination so calls can chain. */
    connect: dest => dest,
    disconnect: () => {},
    gain: param(), frequency: param(), detune: param(), Q: param()
  }, extra || {});

  class FakeCtx {
    constructor() {
      this.currentTime = 0;
      this.state = 'running';
      this.sampleRate = 44100;
      this.destination = node();
    }
    resume() { this.state = 'running'; return Promise.resolve(); }
    createGain() { return node(); }
    createOscillator() { return node({ type: 'sine', start: () => {}, stop: () => {} }); }
    createBiquadFilter() { return node({ type: 'lowpass' }); }
    createBufferSource() { return node({ buffer: null, loop: false, start: () => {}, stop: () => {} }); }
    createBuffer(ch, len) {
      const data = new Float32Array(len);
      return { length: len, numberOfChannels: ch, sampleRate: 44100, getChannelData: () => data };
    }
  }
  return FakeCtx;
}

/* ── Harness ─────────────────────────────────────────────── */

/** Serves index.html's real <script src> tags straight off disk. */
function localFiles() {
  return requestInterceptor(request => {
    let u;
    try { u = new URL(request.url); } catch (e) { return null; }
    if (u.hostname !== 'localhost' && u.hostname !== '127.0.0.1') {
      /* Block the web font CDN; the game must not need it. */
      return new Response('', { status: 200, headers: { 'Content-Type': 'text/css' } });
    }
    const rel = decodeURIComponent(u.pathname).replace(/^\/+/, '');
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
    const type = file.endsWith('.js') ? 'application/javascript'
      : file.endsWith('.css') ? 'text/css'
        : 'application/octet-stream';
    return new Response(fs.readFileSync(file), { status: 200, headers: { 'Content-Type': type } });
  });
}

async function runPass(label, opts) {
  section(label);

  const scriptErrors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', e => {
    if (/Could not load/.test(e.message)) return;
    scriptErrors.push(e.message);
  });

  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), {
    url: 'http://localhost:8000/index.html',
    runScripts: 'dangerously',
    resources: { interceptors: [localFiles()] },
    pretendToBeVisual: true,
    virtualConsole: virtualConsole,
    beforeParse(window) {
      const ctx2d = canvasStub();
      window.HTMLCanvasElement.prototype.getContext = function () { ctx2d.canvas = this; return ctx2d; };
      if (opts.audio) {
        window.AudioContext = audioStub();
        window.webkitAudioContext = window.AudioContext;
      }
      if (opts.noFetch) {
        window.fetch = undefined;
      } else {
        window.fetch = () => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ rows: [{ callsign: 'TEST', tier4: 1, cases: 2, stars: 5, merit: 900 }] })
        });
      }
      window.devicePixelRatio = 2;
    }
  });

  const { window } = dom;
  const errors = [];
  window.addEventListener('error', e => errors.push(String(e.error || e.message)));

  const $ = sel => window.document.querySelector(sel);
  const $$ = sel => Array.from(window.document.querySelectorAll(sel));
  const active = () => $$('.screen.screen--active').map(n => n.dataset.screen);
  const click = sel => { const n = typeof sel === 'string' ? $(sel) : sel; if (!n) throw new Error('no element for ' + sel); n.click(); return n; };
  const text = sel => ($(sel) ? $(sel).textContent.trim() : '');
  /** Set a <select> or checkbox the way a person would, firing the change event. */
  const setField = (sel, value) => {
    const el = $(sel);
    if (!el) { ok('field exists: ' + sel, false); return; }
    if (el.type === 'checkbox') el.checked = !!value;
    else el.value = value;
    el.dispatchEvent(new window.Event('change', { bubbles: true }));
  };

  /* ── Boot ── */
  const tags = Array.from(window.document.querySelectorAll('script[src]')).map(s => s.getAttribute('src'));
  ok('index.html loads the runtime in the expected order', tags.join(',') === SCRIPTS.join(','), tags.join(', '));
  ok('every script resolved off disk', scriptErrors.length === 0, scriptErrors.slice(0, 2).join(' | '));

  await sleep(2200);
  ok('boot finishes and lands on the menu', active().join(',') === 'menu', 'active: ' + active().join(',') || '(none)');
  ok('the title screen is dismissed', !$('#screen-boot').classList.contains('screen--active'));
  ok('the background is told to leave with the title screen',
    window.document.documentElement.dataset.booted === 'on',
    'data-booted=' + window.document.documentElement.dataset.booted);
  const rain = window.document.getElementById('rain-canvas');
  ok('the rain is gone once loaded', window.getComputedStyle(rain).opacity === '0',
    'opacity ' + window.getComputedStyle(rain).opacity);
  ok('nothing is still drawing the rain', window.eval('Rain').running === false);
  ok('the rain cannot be brought back', window.eval('Rain').dismissed === true);
  ok('no script errors during boot', errors.length === 0, errors.join(' | '));

  /* ── Menu ── */
  ok('the rank plate shows the opening rank', text('#rank-title') === 'Probationary Cadet', text('#rank-title'));
  ok('badge is R', text('#rank-badge') === 'R');
  ok('merit starts at zero', text('#stat-merit') === '0', text('#stat-merit'));
  ok('a quote is shown', text('#menu-quote').length > 10);
  ok('resume is disabled with no save', $('[data-nav="continue"]').disabled === true);

  /* credits */
  click('#screen-menu [data-nav="credits"]');
  ok('credits opens', active().join(',') === 'credits', active().join(','));
  ok('credits has content', text('#screen-credits').length > 120, text('#screen-credits').length + ' chars');
  click('#screen-credits [data-nav="menu"]');
  ok('credits returns to the menu', active().join(',') === 'menu', active().join(','));

  /* keyboard shortcut */
  window.document.dispatchEvent(new window.KeyboardEvent('keydown', { key: '1', bubbles: true }));
  ok('pressing 1 opens the case files', active().join(',') === 'cases', active().join(','));

  /* ── Case files ── */
  const cards = $$('#cases-grid .case-card');
  ok('all 20 case cards render', cards.length === 20, 'got ' + cards.length);
  ok('only case 1 is unlocked', $$('#cases-grid .case-card.is-locked').length === 19,
    'locked: ' + $$('#cases-grid .case-card.is-locked').length);
  ok('case 1 is flagged as next', $$('#cases-grid .case-card.is-next').length === 1);

  /* tier filter */
  click('#tier-filter [data-tier="expert"]');
  ok('filtering to Tier IV shows three locked files', $$('#cases-grid .case-card').length === 3,
    'got ' + $$('#cases-grid .case-card').length);
  click('#tier-filter [data-tier="all"]');
  ok('the filter resets', $$('#cases-grid .case-card').length === 20);

  /* locked case refuses to open */
  click('#cases-grid [data-case="7"]');
  ok('a locked file will not open', active().join(',') === 'cases');
  ok('refusing a locked file explains why', $$('#toasts .toast').length > 0);

  /* ── Briefing ── */
  click('#cases-grid [data-case="1"]');
  ok('a case file opens its briefing', active().join(',') === 'briefing', active().join(','));
  const caseData = window.eval('ALL_CASES').find(c => c.id === 1);
  ok('the briefing shows the title', text('#brief-title') === caseData.title);
  ok('the briefing shows both narrative paragraphs', $$('#brief-body p').length >= 2);
  ok('the parties are listed', $$('#brief-parties .party').length === 4);
  ok('terms of engagement are shown', $$('#brief-terms .term').length === 4);
  ok('difficulty is shown', $$('#brief-difficulty .dots i').length === 4);

  click('#brief-begin');
  ok('opening the case enters the hub', active().join(',') === 'hub', active().join(','));
  ok('the HUD names the case', text('#hud-name') === caseData.title);
  ok('the evidence tally starts empty', text('#hud-clues') === 'Evidence 0/' + caseData.clues.length, text('#hud-clues'));
  ok('every location is on the map', $$('#loc-grid .loc').length === caseData.locations.length);
  ok('persons of interest are listed', $$('#hub-suspects .suspect').length === caseData.suspects.length);
  ok('the thread starts empty', text('#hub-thread').length > 0);
  ok('an untimed case hides the clock', $('#hud-clock-wrap').hidden === true);

  /* ── Investigate every location ── */
  for (const loc of caseData.locations) {
    click('#loc-grid [data-loc="' + loc.id + '"]');
    ok('entering ' + loc.name, active().indexOf('scene') !== -1, active().join(','));
    ok('  the scene shows its hotspots', $$('#scene-exams .exam').length === loc.exams.length,
      'got ' + $$('#scene-exams .exam').length + ' want ' + loc.exams.length);

    for (const x of loc.exams) {
      click('#scene-exams [data-exam="' + x.id + '"]');
      if ($('#modal').hidden === false) click('#modal-acts .btn');
    }
    click('#scene-close');
  }
  ok('the evidence tally grew', text('#hud-clues') !== 'Evidence 0/' + caseData.clues.length, text('#hud-clues'));

  /* a repeated hotspot does not re-award */
  click('#loc-grid [data-loc="' + caseData.locations[0].id + '"]');
  const live = caseData.locations[0].exams[0];
  click('#scene-exams [data-exam="' + live.id + '"]');
  ok('a re-examined hotspot is marked done', $$('#scene-exams .exam.is-done').length === caseData.locations[0].exams.length,
    'done: ' + $$('#scene-exams .exam.is-done').length);
  click('#scene-close');

  /* ── Journal ── */
  click('#hub-journal');
  ok('the journal opens', active().indexOf('journal') !== -1, active().join(','));
  const foundCount = window.eval('Engine').run.found.length;
  ok('the journal lists recovered evidence', $$('#evidence-grid .ev-card').length === foundCount,
    'got ' + $$('#evidence-grid .ev-card').length + ' want ' + foundCount);
  ok('the evidence tab count matches', text('#tab-n-evidence') === String(foundCount));
  ok('suspect cards render', $$('#journal-suspects .suspect').length === caseData.suspects.length);
  ok('location notes render', $$('#journal-locations .loc-note').length === caseData.locations.length);

  /* search + filter */
  $('#evidence-search').value = 'zzzz-no-such-thing';
  $('#evidence-search').dispatchEvent(new window.Event('input', { bubbles: true }));
  await sleep(260);
  ok('searching for nonsense empties the grid', $$('#evidence-grid .ev-card').length === 0);
  ok('an empty result shows the empty state', !!$('#evidence-grid .empty'));
  $('#evidence-search').value = '';
  $('#evidence-search').dispatchEvent(new window.Event('input', { bubbles: true }));
  await sleep(260);
  ok('clearing the search restores the grid', $$('#evidence-grid .ev-card').length === foundCount);

  /* tabs */
  click('#journal-tabs [data-tab="notes"]');
  ok('the notes tab activates', $('.tabpane[data-pane="notes"]').classList.contains('is-active'));
  $('#notes-area').value = 'The lamp is the whole case.';
  $('#notes-area').dispatchEvent(new window.Event('input', { bubbles: true }));
  await sleep(500);
  ok('notes reach the engine run', window.eval('Engine').run.notes === 'The lamp is the whole case.');
  click('#journal-tabs [data-tab="evidence"]');
  click('#journal-close');
  ok('the journal closes back to the hub', active().join(',') === 'hub', active().join(','));

  /* ── Confrontation ── */
  const confront = caseData.confront;
  let presents = 0;
  for (const sid of Object.keys(confront)) {
    const loc = caseData.locations.find(l => (l.present || []).indexOf(sid) !== -1);
    if (!loc) continue;
    click('#loc-grid [data-loc="' + loc.id + '"]');
    const presentBtn = $('#scene-suspects [data-present="' + sid + '"]');
    if (!presentBtn) { click('#scene-close'); continue; }
    presentBtn.click();
    ok('  the present dialog for ' + sid + ' opens', $('#modal').hidden === false);
    const give = $('#modal-body [data-give]:not([disabled])');
    if (give) {
      ok('  it offers something they will react to', !!give);
      give.click();
      presents += 1;
      ok('  the conversation is logged', $$('#scene-log .log__entry').length > 0);
    } else {
      ok('  it explains that nothing they hold means anything', /nothing/i.test($('#modal-body').textContent));
      click('#modal-acts .btn');
    }
    click('#scene-close');
  }
  ok('at least one confrontation happened', presents > 0, 'presents: ' + presents);

  /* ── Hint ── */
  click('#hub-hint');
  ok('the hint dialog opens', $('#modal').hidden === false && /file/i.test($('#modal-title').textContent));
  click('#modal-acts .btn');
  ok('a hint was spent', window.eval('Engine').run.hintsUsed === 1, String(window.eval('Engine').run.hintsUsed));
  /* The default policy is "on" — unlimited hints, so the button stays armed. */
  ok('the hint button stays armed while the policy is unlimited', $('#hub-hint').disabled === false);

  /* Change the policy through the real settings control and come back. */
  click('#hub-menu');
  click('#screen-pause [data-nav="settings"]');
  setField('#s-hints', 'limited');
  ok('the policy reaches the engine', window.eval('Engine').config.hintPolicy === 'limited');
  click('#settings-close');
  click('#screen-pause [data-nav="resume"]');
  ok('the hint button disables once the limited allowance is gone', $('#hub-hint').disabled === true);
  /* A disabled button is inert: no hint, no modal, no state change. */
  const hintsBefore = window.eval('Engine').run.hintsUsed;
  click('#hub-hint');
  ok('a spent allowance cannot be pressed', $('#modal').hidden === true && window.eval('Engine').run.hintsUsed === hintsBefore,
    'modal ' + !$('#modal').hidden + ', hints ' + window.eval('Engine').run.hintsUsed + '/' + hintsBefore);

  setField('#s-hints', 'on');
  click('#hub-menu');
  click('#screen-pause [data-nav="settings"]');
  click('#settings-close');
  click('#screen-pause [data-nav="resume"]');
  ok('unlimited hints are restored', $('#hub-hint').disabled === false);
  click('#hub-hint');
  ok('a second hint is served', /file/i.test(text('#modal-title')), text('#modal-title'));
  click('#modal-acts .btn');

  /* ── Pause ── */
  click('#hub-menu');
  ok('the pause overlay opens', active().indexOf('pause') !== -1, active().join(','));
  ok('pause stops the clock', window.eval('Engine').run.paused === true);
  click('#screen-pause [data-nav="resume"]');
  ok('resume returns to the hub', active().join(',') === 'hub', active().join(','));
  ok('resume restarts the clock', window.eval('Engine').run.paused === false);

  /* ── Accusation ── */
  click('#hub-accuse');
  ok('the accusation opens', active().indexOf('accuse') !== -1, active().join(','));
  ok('four progress steps render', $$('#accuse-progress .accuse__step').length === 4);
  ok('submit is blocked before anything is chosen', $('#accuse-submit').disabled === true);
  ok('the summary shows everything unset', $$('#accuse-body .accuse__summary dd.miss').length === 4);

  click('#accuse-body [data-pick-culprit="' + caseData.truth.culprit + '"]');
  ok('choosing a person advances', $('#accuse-submit').disabled === false);
  click('#accuse-submit');
  ok('step two is the motive', $$('#accuse-body [data-pick-motive]').length === caseData.motives.length,
    'got ' + $$('#accuse-body [data-pick-motive]').length);

  click('#accuse-body [data-pick-motive="' + caseData.truth.motive + '"]');
  click('#accuse-submit');
  ok('step three is the method', $$('#accuse-body [data-pick-method]').length === caseData.methods.length);

  click('#accuse-body [data-pick-method="' + caseData.truth.method + '"]');
  click('#accuse-submit');
  ok('step four is the evidence', $$('#accuse-body .ev-pick-list .ev-card').length === foundCount,
    'got ' + $$('#accuse-body .ev-pick-list .ev-card').length + ' want ' + foundCount);
  ok('the warning turns hot when nothing is cited', $('#accuse-warn').classList.contains('is-hot'));

  const evidence = window.eval('Engine').run.found;
  for (const id of evidence) click('#accuse-body [data-clue="' + id + '"]');
  ok('citing evidence calms the warning', !$('#accuse-warn').classList.contains('is-hot'));
  ok('the summary lists the citation', /item/.test($('#accuse-body .accuse__summary').textContent));

  click('#accuse-submit');
  ok('submitting asks for a signature', $('#modal').hidden === false && /sign here/i.test($('#modal-title').textContent));
  click('#modal-acts .btn--danger');

  /* ── Verdict ── */
  ok('the verdict screen is shown', active().join(',') === 'verdict', active().join(','));
  ok('the banner reads Case Closed', text('#verdict-banner') === 'Case Closed', text('#verdict-banner'));
  ok('a grade is shown', /^[SABCDF]$/.test(text('#verdict-grade')), text('#verdict-grade'));

  /* This run was deliberately sloppy: every hotspot examined (dead ends
     included), every present handed over, two hints consulted. The engine
     must dock merit for all of it, so the stars must follow the ratio. */
  const rec = window.eval('Engine').profile().closed[caseData.id];
  const ratio = rec.score / caseData.merit;
  const wantStars = ratio >= 0.8 ? 3 : ratio >= 0.55 ? 2 : 1;
  ok('merit was docked below par', rec.score < caseData.merit, rec.score + ' / ' + caseData.merit);
  ok('the career banked exactly the case score', window.eval('Engine').totalMerit() === rec.score,
    window.eval('Engine').totalMerit() + ' vs ' + rec.score);
  ok('the lit stars follow the score ratio', $$('#verdict-stars i.on').length === wantStars,
    'lit ' + $$('#verdict-stars i.on').length + ', want ' + wantStars + ' at ' + rec.score + '/' + caseData.merit);
  ok('the case is recorded as solved', rec.solved === true);
  ok('the score is reported against par', text('#verdict-score').indexOf(String(caseData.merit).replace(/\B(?=(\d{3})+(?!\d))/g, ',')) !== -1,
    text('#verdict-score'));
  ok('the breakdown has rows', $$('#verdict-breakdown .row').length >= 6);
  ok('the total row is marked', $$('#verdict-breakdown .row.is-total').length === 1);
  ok('the truth names the culprit', text('#verdict-truth').indexOf((caseData.suspects.find(s => s.id === caseData.truth.culprit) || {}).name) !== -1);
  ok('the truth states the motive', text('#verdict-truth').indexOf(caseData.truth.motive) !== -1);
  ok('the truth states the method', text('#verdict-truth').indexOf(caseData.truth.method) !== -1);

  /* ── Career consequences ── */
  click('#verdict-next');
  ok('the next file opens its briefing', active().join(',') === 'briefing' && text('#brief-title').length > 0,
    active().join(',') + ' / ' + text('#brief-title'));
  ok('it is case 2', $('#brief-stamp').textContent === 'FILE 02', $('#brief-stamp').textContent);

  click('#screen-briefing [data-nav="cases"]');
  ok('case 1 is now marked done', $('#cases-grid [data-case="1"]').classList.contains('is-done'));
  ok('case 2 is no longer locked', !$('#cases-grid [data-case="2"]').classList.contains('is-locked'));
  ok('case 1 shows the stars it earned', $$('#cases-grid [data-case="1"] .stars i.on').length === rec.stars,
    'lit ' + $$('#cases-grid [data-case="1"] .stars i.on').length + ' want ' + rec.stars);
  ok('the campaign meter moved', $('#campaign-fill').style.width !== '0%', $('#campaign-fill').style.width);
  ok('the closed tally is one', text('#campaign-count') === '1', text('#campaign-count'));

  /* ── Dossier ── */
  click('#screen-cases [data-nav="menu"]');
  click('#screen-menu [data-nav="dossier"]');
  ok('the dossier renders', active().join(',') === 'dossier', active().join(','));
  ok('service rows appear', $$('#dossier-stats .row').length >= 6);
  ok('commendations render', $$('#dossier-achievements .ach').length === 12, 'got ' + $$('#dossier-achievements .ach').length);
  ok('at least one commendation is unlocked', $$('#dossier-achievements .ach.is-unlocked').length > 0);
  ok('four tiers are listed', $$('#dossier-tiers .tier-row').length === 4);
  /* Tier I holds five files and only one is closed, so it is open, not done. */
  ok('Tier I is open but unfinished', $$('#dossier-tiers .tier-row')[0].classList.contains('is-open') &&
    !$$('#dossier-tiers .tier-row')[0].classList.contains('is-done'), $$('#dossier-tiers .tier-row')[0].className);
  ok('Tier I counts its progress', /1\/5/.test($$('#dossier-tiers .tier-row')[0].textContent),
    $$('#dossier-tiers .tier-row')[0].textContent.replace(/\s+/g, ' ').trim());
  ok('later tiers are untouched', $$('#dossier-tiers .tier-row')[1].textContent.indexOf('0/') !== -1);

  /* ── Board ── */
  click('#screen-dossier [data-nav="menu"]');
  click('#screen-menu [data-nav="board"]');
  ok('the board renders', active().join(',') === 'board', active().join(','));
  ok('standings rows appear', $$('#board-body tr').length > 5, 'got ' + $$('#board-body tr').length);
  ok('exactly one row is you', $$('#board-body tr.is-you').length === 1);

  $('#callsign').value = 'R. SLATE';
  $('#callsign').dispatchEvent(new window.Event('input', { bubbles: true }));
  await sleep(450);
  click('#board-sync');
  await sleep(250);
  ok('sync reports the outcome in the note', /ledger/i.test(text('#board-note')), text('#board-note'));
  if (opts.noFetch) {
    ok('without fetch it falls back to the local archive', /unreachable/i.test(text('#board-note')));
  } else {
    ok('with a server it reports a sync', /synced/i.test(text('#board-note')));
  }

  /* ── Settings ── */
  click('#screen-board [data-nav="menu"]');
  click('#screen-menu [data-nav="settings"]');
  ok('settings opens', active().indexOf('settings') !== -1, active().join(','));
  ok('the music slider reflects state', $('#s-music').value === '45', $('#s-music').value);

  $('#s-accents').value = 'teal';
  $('#s-accents').dispatchEvent(new window.Event('change', { bubbles: true }));
  ok('the accent theme applies', window.document.documentElement.dataset.theme === 'teal',
    window.document.documentElement.dataset.theme);

  $('#s-motion').checked = false;
  $('#s-motion').dispatchEvent(new window.Event('change', { bubbles: true }));
  ok('motion can be switched off', window.document.documentElement.dataset.motion === 'off');
  $('#s-motion').checked = true;
  $('#s-motion').dispatchEvent(new window.Event('change', { bubbles: true }));

  $('#s-rain').checked = false;
  $('#s-rain').dispatchEvent(new window.Event('change', { bubbles: true }));
  ok('rain can be switched off', window.document.documentElement.dataset.rain === 'off');
  $('#s-rain').checked = true;
  $('#s-rain').dispatchEvent(new window.Event('change', { bubbles: true }));

  $('#s-textsize').value = '120';
  $('#s-textsize').dispatchEvent(new window.Event('input', { bubbles: true }));
  ok('text size applies', window.document.documentElement.style.getPropertyValue('--text-scale') === '1.2',
    window.document.documentElement.style.getPropertyValue('--text-scale'));
  $('#s-textsize').value = '100';
  $('#s-textsize').dispatchEvent(new window.Event('input', { bubbles: true }));

  ok('settings persist to storage', window.localStorage.getItem('nocturne.settings') !== null);
  click('#screen-settings [data-nav="menu"]');
  ok('done returns to the menu', active().join(',') === 'menu', active().join(','));

  /* ── Save and resume ── */
  click('#screen-menu [data-nav="cases"]');
  click('#cases-grid [data-case="2"]');
  click('#brief-begin');
  const loc2 = window.eval('Engine').run.data.locations[0];
  click('#loc-grid [data-loc="' + loc2.id + '"]');
  click('#scene-exams [data-exam]');
  click('#scene-close');
  const savedCount = window.eval('Engine').run.found.length;
  ok('progress is saved', window.localStorage.getItem('nocturne.run') !== null);
  ok('a resumable save exists while the case is open', window.eval('Engine').hasSave() === true);

  /* Leaving for the case files from the pause menu abandons the run. */
  click('#hub-menu');
  click('#screen-pause [data-nav="cases"]');
  ok('abandoning discards the saved run', window.localStorage.getItem('nocturne.run') === null &&
    window.eval('Engine').run === null);
  ok('abandoning returns to the case files', active().join(',') === 'cases', active().join(','));

  /* Leaving for the menu keeps the run, paused and resumable. */
  click('#cases-grid [data-case="2"]');
  click('#brief-begin');
  click('#loc-grid [data-loc="' + loc2.id + '"]');
  click('#scene-exams [data-exam]');
  click('#scene-close');
  click('#hub-menu');
  click('#screen-pause [data-nav="menu"]');
  ok('leaving for the menu keeps the case', active().join(',') === 'menu' && window.eval('Engine').run !== null,
    active().join(','));
  ok('the run is left paused, not running', window.eval('Engine').run.paused === true);
  ok('resume is offered on the menu', $('[data-nav="continue"]').disabled === false);
  click('#screen-menu [data-nav="continue"]');
  ok('resume reopens the case', active().join(',') === 'hub', active().join(','));
  ok('resume restores the evidence tally', text('#hud-clues').indexOf(String(savedCount)) !== -1, text('#hud-clues'));
  ok('resume restores the case number', text('#hud-no') === 'CASE 02', text('#hud-no'));
  ok('resume restarts the clock', window.eval('Engine').run.paused === false);

  /* ── Wipe ── */
  click('#hub-menu');
  click('#screen-pause [data-nav="settings"]');
  click('#s-wipe');
  ok('erase asks first', $('#modal').hidden === false && /erase/i.test($('#modal-title').textContent));
  click('#modal-acts .btn--danger');
  ok('erasing clears storage', window.localStorage.getItem('nocturne.run') === null &&
    window.localStorage.getItem('nocturne.profile') === null);
  ok('erasing returns to the menu', active().join(',') === 'menu', active().join(','));
  ok('erasing resets the career', text('#stat-closed') === '0', text('#stat-closed'));
  ok('resume is disabled again', $('[data-nav="continue"]').disabled === true);

  /* ── No errors anywhere ── */
  ok('no uncaught errors during the whole run', errors.length === 0, errors.slice(0, 3).join(' | '));
  ok('no script errors reported by the parser', scriptErrors.length === 0, scriptErrors.slice(0, 3).join(' | '));

  window.close();
}

(async function () {
  await runPass('Full playthrough (audio + fetch available)', { audio: true });
  await runPass('Degraded environment (no Web Audio, no fetch)', { audio: false, noFetch: true });

  console.log('\n' + (failures === 0
    ? '\x1b[32m' + checks + ' checks passed.\x1b[0m'
    : '\x1b[31m' + failures + ' of ' + checks + ' checks FAILED.\x1b[0m'));
  process.exit(failures === 0 ? 0 : 1);
})();

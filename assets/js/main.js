/* ═══════════════════════════════════════════════════════════
   NOCTURNE — main.js
   Bootstrap, routing, settings, input, and the case clock.
   ═══════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const OVERLAYS = ['scene', 'journal', 'accuse', 'settings', 'pause'];
  const SET_KEY = 'settings';

  const App = {
    base: 'boot',
    overlay: null,
    stack: [],
    settings: null,
    clockTimer: 0
  };

  const $ = U.$;
  const esc = U.esc;
  const isOverlay = name => OVERLAYS.indexOf(name) !== -1;

  /* ── Routing ─────────────────────────────────────────── */

  function activeScreens() {
    const list = [App.base].concat(App.stack, App.overlay ? [App.overlay] : []);
    return U.uniq(list.filter(Boolean));
  }

  function paint() {
    const on = activeScreens();
    U.$$('.screen').forEach(node => {
      const name = node.dataset.screen;
      node.classList.toggle('screen--active', on.indexOf(name) !== -1);
    });
    if (on.indexOf(App.overlay) === -1) App.overlay = null;
    const top = App.overlay || App.base;
    const el = U.$('.screen[data-screen="' + top + '"]');
    if (el) el.scrollTop = 0;
    document.body.dataset.screen = top;
  }

  App.go = function (name, opts) {
    if (name === 'boot') return;
    if (isOverlay(name)) {
      if (App.overlay === name) {
        if (App.stack.pop() === undefined) { App.overlay = null; App.go(name, { replace: true }); return; }
      } else if (App.overlay) {
        if (!(opts && opts.replace)) App.stack.push(App.overlay);
      }
      App.overlay = name;
    } else {
      App.stack.length = 0;
      App.overlay = null;
      App.base = name;
    }
    render(name);
    paint();
  };

  /** Close the top overlay, returning to whatever opened it — or to the
      base screen if it was opened from the base screen. */
  function back() {
    App.overlay = App.stack.pop() || null;
    render(App.overlay || App.base);
    paint();
    SFX.play('click');
    return true;
  }

  App.back = back;

  /* ── Per-screen render on entry ──────────────────────── */

  function render(name) {
    switch (name) {
      case 'menu': UI.renderMenu(); break;
      case 'cases': UI.renderCases(); break;
      case 'dossier': UI.renderDossier(); break;
      case 'board': UI.renderBoard(); break;
      case 'briefing': UI.renderBrief(UI.briefId); break;
      case 'hub': UI.renderHub(); break;
      case 'scene': UI.renderScene(); break;
      case 'journal': UI.renderJournal(); break;
      case 'accuse': UI.renderAccuse(); break;
      case 'verdict': UI.renderVerdict(Engine.run && Engine.run.result); break;
      default: break;
    }
  }

  /** Re-render whatever is on top, plus the hub beneath it. */
  function refresh() {
    if (App.base === 'hub') UI.renderHub();
    if (App.overlay === 'scene') UI.renderScene();
    if (App.overlay === 'journal') UI.renderJournal();
    if (App.overlay === 'accuse') UI.renderAccuse();
  }

  /* ── Settings ────────────────────────────────────────── */

  const DEFAULTS = {
    music: 45, sfx: 70, rain: true, motion: true, textsize: 100,
    hints: 'on', autosave: 'on', accent: 'amber'
  };

  function loadSettings() {
    const s = Object.assign({}, DEFAULTS, U.store.get(SET_KEY, {}));
    App.settings = s;
    return s;
  }

  function rangeFill(input) {
    const min = Number(input.min || 0);
    const max = Number(input.max || 100);
    const pct = ((Number(input.value) - min) / (max - min)) * 100;
    input.style.setProperty('--fill', pct + '%');
  }

  function paintSettings() {
    const s = App.settings;
    $('#s-music').value = s.music;
    $('#s-sfx').value = s.sfx;
    $('#s-rain').checked = s.rain;
    $('#s-motion').checked = s.motion;
    $('#s-textsize').value = s.textsize;
    $('#s-hints').value = s.hints;
    $('#s-autosave').value = s.autosave;
    $('#s-accents').value = s.accent;
    $('#o-music').textContent = s.music;
    $('#o-sfx').textContent = s.sfx;
    $('#o-textsize').textContent = s.textsize + '%';
    U.$$('#screen-settings input[type="range"]').forEach(rangeFill);
  }

  function applySettings() {
    const s = App.settings;
    const root = document.documentElement;
    root.dataset.theme = s.accent === 'amber' ? 'noir' : s.accent;
    root.dataset.motion = s.motion ? 'on' : 'off';
    root.dataset.rain = s.rain ? 'on' : 'off';
    root.style.setProperty('--text-scale', String(s.textsize / 100));

    SFX.setMusic(s.music);
    SFX.setSfx(s.sfx);
    Engine.setHintPolicy(s.hints);
    Engine.config.autosave = s.autosave === 'on';

    if (s.rain) Rain.setEnabled(true); else Rain.setEnabled(false);
    /* A policy change can strand the hub's hint button in its old state. */
    if (App.base === 'hub' && !App.overlay) refresh();
  }

  function saveSettings() {
    U.store.set(SET_KEY, App.settings);
    applySettings();
  }

  /* ── Ambience by tier ────────────────────────────────── */

  const RAIN_BY_TIER = { easy: 0.35, medium: 0.55, hard: 0.75, expert: 0.95 };

  function tuneAmbience() {
    const run = Engine.run;
    const tier = run ? run.data.tier : (App.base === 'board' || App.base === 'credits' ? 'easy' : 'medium');
    const level = RAIN_BY_TIER[tier] == null ? 0.5 : RAIN_BY_TIER[tier];
    if (App.settings.rain) {
      Rain.setIntensity(level);
      SFX.setAmbience(level);
    }
  }

  /* ── The clock ───────────────────────────────────────── */

  function startClock() {
    if (App.clockTimer) return;
    App.clockTimer = global.setInterval(() => {
      if (!Engine.run || Engine.run.paused || Engine.run.finished) return;
      if (App.base !== 'hub') return;
      Engine.tick(1);
    }, 1000);
  }

  /* ── Interactions ────────────────────────────────────── */

  function onExamine(examId) {
    const res = Engine.examine(examId);
    if (res.kind === 'none') return;
    if (res.kind === 'repeat') {
      SFX.play('page');
      if (res.clue) UI.showClue(res.clue, false);
      else UI.toast('Nothing there', 'You have already had your answer.', 'note');
      return;
    }
    if (res.kind === 'dead') {
      SFX.play('dead');
      UI.toast('Nothing', res.exam.note || 'It leads nowhere.', 'bad');
      refresh();
      return;
    }
    SFX.play(res.isNew ? 'reveal' : 'clue');
    UI.showClue(res.clue, res.isNew);
    refresh();
  }

  function onHint() {
    const hint = Engine.hint();
    if (!hint) {
      UI.toast('The file is shut', Engine.config.hintPolicy === 'off' ? 'Hints are switched off in settings.' : 'You have used your allowance for this case.', 'note');
      return;
    }
    SFX.play('hint');
    UI.modal({
      title: 'From the file',
      sound: 'hint',
      body: '<p style="color:var(--tx);line-height:1.8">' + esc(hint) + '</p>' +
        '<p style="font-size:.76rem;color:var(--tx-faint);margin-top:1rem">Consulting the file costs you. It is meant to.</p>'
    });
    refresh();
  }

  function nextCaseId() {
    const next = Engine.nextCase();
    return next ? next.id : null;
  }

  function onVerdictButtons() {
    const id = Engine.run ? Engine.run.caseId : null;
    return id;
  }

  /* ── Board sync ──────────────────────────────────────── */

  function syncBoard() {
    const p = Engine.profile();
    const btn = $('#board-sync');
    const note = $('#board-note');
    const expert = Engine.cases().filter(c => c.tier === 'expert');
    const payload = {
      callsign: (p.callsign || '').trim() || 'UNSIGNED',
      tier4: expert.filter(c => p.closed[c.id] && p.closed[c.id].solved).length,
      cases: Engine.closedCount(),
      stars: Engine.totalStars(),
      merit: Engine.totalMerit()
    };
    btn.disabled = true;
    note.textContent = 'Opening a line to the ledger…';

    const offline = reason => {
      btn.disabled = false;
      UI.renderBoard(Engine.localBoard(), 'Ledger unreachable (' + reason + '). Showing this machine’s archive.');
      SFX.play('bad');
    };

    if (typeof global.fetch !== 'function') {
      offline('no fetch in this browser');
      return;
    }

    global.fetch('api/standings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(data => {
        btn.disabled = false;
        const rows = (data && data.rows) || [];
        UI.renderBoard(rows, 'Synced with the Ledger Server. Your record is filed under "' + payload.callsign + '".');
        SFX.play('clue');
      })
      .catch(err => offline(err.message || String(err)));
  }

  /* ── Event wiring ────────────────────────────────────── */

  function wire() {
    /* Navigation */
    U.on(document, 'click', function (e) {
      const nav = e.target.closest('[data-nav]');
      if (!nav) return;
      const to = nav.dataset.nav;
      SFX.play('click');

      if (to === 'continue') {
        if (Engine.hasSave()) {
          Engine.resumeSave();
          Engine.resume();
          App.go('hub');
        }
        return;
      }
      if (to === 'resume') {
        Engine.resume();
        App.go('hub');
        return;
      }
      if (to === 'cases' && App.overlay === 'pause') Engine.abandon();
      if (to === 'journal' && App.overlay === 'pause') { Engine.resume(); }
      /* Leaving for the menu keeps the investigation: the run stays paused and
         saved, and the menu offers it back under Resume. */
      if (to === 'menu' && App.overlay === 'pause') Engine.pause();
      App.go(to);
    });

    /* Case files */
    U.delegate(document, 'click', '[data-case]', function (e, hit) {
      const id = Number(hit.dataset.case);
      if (!Engine.isUnlocked(id)) {
        SFX.play('bad');
        UI.toast('Sealed', 'File ' + U.pad2(id) + ' is not open to you. Close the case before it.', 'bad');
        return;
      }
      SFX.play('open');
      UI.briefId = id;
      App.go('briefing');
    });

    U.on($('#brief-begin'), 'click', function () {
      const id = UI.briefId;
      if (Engine.start(id)) {
        SFX.play('open');
        App.go('hub');
        tuneAmbience();
      }
    });

    U.delegate($('#tier-filter'), 'click', 'button', function (e, hit) {
      UI.tierFilter = hit.dataset.tier;
      U.$$('#tier-filter button').forEach(b => b.classList.toggle('is-active', b === hit));
      SFX.play('click');
      UI.renderCases();
    });

    /* Hub */
    U.delegate($('#loc-grid'), 'click', '[data-loc]', function (e, hit) {
      const loc = Engine.enter(hit.dataset.loc);
      if (!loc) return;
      UI.sceneLocId = loc.id;
      SFX.play('open');
      App.go('scene');
    });

    U.on($('#hub-hint'), 'click', onHint);
    U.on($('#hub-journal'), 'click', function () { SFX.play('page'); App.go('journal'); });
    U.on($('#hub-accuse'), 'click', openAccuse);
    U.on($('#hub-accuse-2'), 'click', openAccuse);
    U.on($('#hub-menu'), 'click', function () { SFX.play('click'); Engine.pause(); App.go('pause'); });

    /* Scene */
    U.delegate($('#scene-exams'), 'click', '[data-exam]', function (e, hit) { onExamine(hit.dataset.exam); });
    U.delegate($('#scene-suspects'), 'click', '[data-present]', function (e, hit) {
      SFX.play('click');
      App.sceneSuspect = hit.dataset.present;
      UI.presentPicker(hit.dataset.present);
    });
    U.on($('#scene-close'), 'click', function () { SFX.play('click'); back(); });
    U.delegate(document, 'click', '[data-give]', function (e, hit) {
      const sid = App.sceneSuspect;
      UI.closeModal();
      if (sid) UI.doPresent(sid, hit.dataset.give);
    });

    /* Journal */
    U.on($('#journal-close'), 'click', function () { SFX.play('click'); back(); });
    U.delegate($('#journal-tabs'), 'click', 'button', function (e, hit) {
      const tab = hit.dataset.tab;
      U.$$('#journal-tabs button').forEach(b => b.classList.toggle('is-active', b === hit));
      U.$$('.tabpane', $('#screen-journal')).forEach(p => p.classList.toggle('is-active', p.dataset.pane === tab));
      SFX.play('click');
    });
    U.on($('#evidence-search'), 'input', U.debounce(function () { UI.renderJournal(); }, 180));
    U.on($('#evidence-filter'), 'change', function () { UI.renderJournal(); SFX.play('click'); });
    U.on($('#notes-area'), 'input', U.debounce(function (e) { Engine.setNotes(e.target.value); }, 400));

    U.delegate($('#evidence-grid'), 'click', '[data-clue]', function (e, hit) {
      const clue = Engine.clue(Engine.run.data, hit.dataset.clue);
      if (clue) { SFX.play('page'); UI.showClue(clue, false); }
    });

    /* Accusation */
    U.on($('#accuse-close'), 'click', function () { SFX.play('click'); back(); });
    U.on($('#accuse-reset'), 'click', function () {
      UI.accuse = { step: 0, culprit: null, motive: null, method: null, evidence: [] };
      SFX.play('page');
      UI.renderAccuse();
    });
    U.on($('#accuse-submit'), 'click', function () {
      if (!UI.accuseNext()) {
        const a = UI.accuse;
        UI.modal({
          title: 'Sign here',
          body: '<p style="color:var(--tx-lo);line-height:1.7">Once this goes in, the file closes on your terms. ' +
            'You can reopen it afterwards, but the record keeps only your best.</p>',
          actions: [
            { label: 'Not yet' },
            {
              label: 'Sign and submit', danger: true, onClick: function () {
                SFX.play('stamp');
                Engine.accuse({ culprit: a.culprit, motive: a.motive, method: a.method, evidence: a.evidence });
              }
            }
          ]
        });
      }
    });
    U.delegate($('#accuse-body'), 'click', '[data-pick-culprit]', function (e, hit) { UI.accusePick('culprit', hit.dataset.pickCulprit); });
    U.delegate($('#accuse-body'), 'click', '[data-pick-motive]', function (e, hit) { UI.accusePick('motive', hit.dataset.pickMotive); });
    U.delegate($('#accuse-body'), 'click', '[data-pick-method]', function (e, hit) { UI.accusePick('method', hit.dataset.pickMethod); });
    U.delegate($('#accuse-body'), 'click', '[data-clue]', function (e, hit) { UI.accuseToggleEvidence(hit.dataset.clue); });

    /* Verdict */
    U.on($('#verdict-retry'), 'click', function () {
      const id = onVerdictButtons();
      if (id && Engine.start(id)) { SFX.play('open'); App.go('hub'); }
    });
    U.on($('#verdict-next'), 'click', function () {
      const id = nextCaseId();
      if (id == null) {
        App.go('menu');
        UI.toast('The book is complete', 'Twenty files, twenty names. Go and drink.', 'good');
        return;
      }
      UI.briefId = id;
      App.go('briefing');
    });

    /* Settings */
    U.on($('#settings-close'), 'click', function () { SFX.play('click'); back(); });
    U.on($('#s-music'), 'input', function (e) { App.settings.music = Number(e.target.value); $('#o-music').textContent = e.target.value; rangeFill(e.target); SFX.setMusic(e.target.value); saveSettings(); });
    U.on($('#s-sfx'), 'input', function (e) { App.settings.sfx = Number(e.target.value); $('#o-sfx').textContent = e.target.value; rangeFill(e.target); SFX.setSfx(e.target.value); saveSettings(); });
    U.on($('#s-sfx'), 'change', function () { SFX.play('click'); });
    U.on($('#s-rain'), 'change', function (e) { App.settings.rain = e.target.checked; saveSettings(); if (e.target.checked) { SFX.play('click'); tuneAmbience(); } });
    U.on($('#s-motion'), 'change', function (e) { App.settings.motion = e.target.checked; saveSettings(); });
    U.on($('#s-textsize'), 'input', function (e) { App.settings.textsize = Number(e.target.value); $('#o-textsize').textContent = e.target.value + '%'; rangeFill(e.target); saveSettings(); });
    U.on($('#s-hints'), 'change', function (e) { App.settings.hints = e.target.value; saveSettings(); if (Engine.run) refresh(); });
    U.on($('#s-autosave'), 'change', function (e) { App.settings.autosave = e.target.value; saveSettings(); });
    U.on($('#s-accents'), 'change', function (e) { App.settings.accent = e.target.value; saveSettings(); SFX.play('click'); });
    U.on($('#s-wipe'), 'click', function () {
      UI.modal({
        title: 'Erase all records?',
        body: '<p style="color:var(--tx-lo);line-height:1.7">Every case you have closed, every commendation, every note in every journal. Gone. ' +
          'There is no recovering it from here.</p>',
        actions: [
          { label: 'Keep my records' },
          {
            label: 'Erase everything', danger: true, onClick: function () {
              Engine.wipe();
              loadSettings();
              applySettings();
              paintSettings();
              App.base = 'menu';
              App.stack.length = 0;
              App.overlay = null;
              App.go('menu');
              UI.toast('Erased', 'The book is blank again.', 'bad');
            }
          }
        ]
      });
    });

    /* Board */
    U.on($('#callsign'), 'input', U.debounce(function (e) {
      const p = Engine.profile();
      p.callsign = e.target.value.slice(0, 18);
      Engine.saveProfile(p);
    }, 350));
    U.on($('#board-sync'), 'click', function () { SFX.play('click'); syncBoard(); });

    /* Modal backdrop */
    U.on($('#modal'), 'click', function (e) { if (e.target.id === 'modal') UI.closeModal(); });

    /* Engine events */
    U.bus.on('run:tick', function () { if (App.base === 'hub' && App.overlay !== 'journal') UI.updateHud(); });
    U.bus.on('run:expired', function (r) {
      SFX.play('lose');
      Engine.accuse({});
    });
    U.bus.on('run:verdict', function (result) {
      SFX.play(result.solved ? 'win' : 'lose');
      Engine.verdictCaseId = Engine.run ? Engine.run.caseId : null;
      UI.renderVerdict(result);
      App.go('verdict');
      if (result.solved) tuneAmbience();
    });
    U.bus.on('ach:unlock', function (a) {
      if (!a) return;
      setTimeout(function () {
        UI.toast('Commendation — ' + a.name, a.desc, 'good');
        SFX.play('clue');
      }, 900);
    });

    /* Keyboard */
    U.on(document, 'keydown', function (e) {
      const t = e.target;
      if (t && t.matches && t.matches('input, textarea, select')) {
        if (e.key === 'Escape') t.blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Escape') {
        if (!$('#modal').hidden) { UI.closeModal(); return; }
        if (App.overlay === 'pause') { Engine.resume(); back(); return; }
        if (App.overlay) { back(); return; }
        if (App.base === 'hub') { Engine.pause(); App.go('pause'); return; }
        if (App.base !== 'menu') { App.go('menu'); return; }
      }

      if (App.base === 'menu') {
        if (e.key === '1') App.go('cases');
        else if (e.key === '2') { if (Engine.hasSave()) { Engine.resumeSave(); Engine.resume(); App.go('hub'); } }
        else if (e.key === '3') App.go('dossier');
        else if (e.key === '4') App.go('board');
        return;
      }

      if (App.base === 'hub' && !App.overlay) {
        if (e.key === 'h' || e.key === 'H') onHint();
        else if (e.key === 'j' || e.key === 'J') { App.go('journal'); }
        else if (e.key === 'a' || e.key === 'A') openAccuse();
      }

      if (App.overlay === 'accuse') {
        if (e.key === 'Enter') { const s = $('#accuse-submit'); if (!s.disabled) s.click(); }
        if (e.key === 'Backspace') { UI.accuseBack(); }
      }
    });

    /* First gesture unlocks audio */
    const unlock = function () {
      SFX.unlock();
      SFX.play('open');
      global.removeEventListener('pointerdown', unlock);
      global.removeEventListener('keydown', unlock);
    };
    global.addEventListener('pointerdown', unlock);
    global.addEventListener('keydown', unlock);
  }

  function openAccuse() {
    if (!Engine.run) return;
    SFX.play('click');
    UI.openAccuse();
    App.go('accuse');
  }

  /* ── Boot ────────────────────────────────────────────── */

  function boot() {
    const fill = $('#boot-fill');
    const status = $('#boot-status');
    const lines = [
      'Opening the casebook…',
      'Filing twenty reports…',
      'Folding the maps…',
      'Letting in the rain…'
    ];
    const STEPS = lines.length;
    let step = 0;

    loadSettings();
    applySettings();
    Rain.mount($('#rain-canvas'));
    paintSettings();
    wire();
    startClock();

    const tick = global.setInterval(() => {
      step += 1;
      const pct = Math.round((step / STEPS) * 100);
      fill.style.width = pct + '%';
      status.textContent = lines[Math.min(lines.length - 1, step - 1)];
      if (step >= STEPS) {
        global.clearInterval(tick);
        global.setTimeout(function () {
          SFX.unlock();
          tuneAmbience();
          /* The title screen is over; the rain leaves with it. */
          document.documentElement.dataset.booted = 'on';
          Rain.dismiss();
          App.base = 'menu';
          App.go('menu');
        }, 420);
      }
    }, 260);
  }

  App.wipe = function () {
    Engine.wipe();
    loadSettings();
    applySettings();
    paintSettings();
    App.go('menu');
  };

  global.App = App;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})(window);

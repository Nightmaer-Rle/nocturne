/* ═══════════════════════════════════════════════════════════
   NOCTURNE — ui.js
   Renderers for every screen. Reads Engine state, writes DOM,
   and dispatches user intent back through Engine.
   ═══════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const UI = {
    tierFilter: 'all',
    briefId: null,
    sceneLocId: null,
    journalFrom: null,
    accuse: { step: 0, culprit: null, motive: null, method: null, evidence: [] }
  };

  const ACCUSE_STEPS = 4;

  const $ = U.$;
  const esc = U.esc;

  function mount(sel, html) {
    const node = typeof sel === 'string' ? $(sel) : sel;
    if (node) node.innerHTML = html;
    return node;
  }

  function stars(n, total) {
    let out = '';
    for (let i = 0; i < (total || 3); i++) out += '<i class="' + (i < n ? 'on' : '') + '">★</i>';
    return '<span class="stars">' + out + '</span>';
  }

  function bigStars(n) {
    let out = '';
    for (let i = 0; i < 3; i++) out += '<i class="' + (i < n ? 'on' : '') + '">★</i>';
    return out;
  }

  function dots(level, cold) {
    let out = '';
    for (let i = 1; i <= 4; i++) out += '<i class="' + (i <= level ? 'on' : '') + '"> </i>';
    return '<span class="dots ' + (cold ? 'dots--cold' : 'dots--hot') + '">' + out + '</span>';
  }

  const TIER_LEVEL = { easy: 1, medium: 2, hard: 3, expert: 4 };

  function statRows(rows) {
    return rows.map(r => {
      const cls = r.total ? 'is-total' : (r.pts < 0 ? 'is-debit' : (r.ok ? 'is-credit' : ''));
      return '<div class="row ' + cls + '"><dt>' + esc(r.label) +
        (r.note ? ' <span style="opacity:.6">&middot; ' + esc(r.note) + '</span>' : '') +
        '</dt><dd>' + (r.pts < 0 ? '−' : '+') + U.fmtNum(Math.abs(r.pts)) + '</dd></div>';
    }).join('');
  }

  /* ══════════════════════════════════════════════════════
     TOASTS + MODAL
     ══════════════════════════════════════════════════════ */

  const ICON = { good: '✓', bad: '✕', note: '✎' };

  UI.toast = function (title, msg, tone) {
    const host = $('#toasts');
    if (!host) return;
    const kind = tone || 'note';
    const node = U.el('div', {
      class: 'toast toast--' + kind,
      html: '<span class="toast__icon">' + (ICON[kind] || '·') + '</span>' +
        '<div class="toast__body"><p class="toast__title">' + esc(title) + '</p>' +
        (msg ? '<p class="toast__msg">' + esc(msg) + '</p>' : '') + '</div>'
    });
    host.appendChild(node);
    SFX.play(kind === 'good' ? 'clue' : kind === 'bad' ? 'bad' : 'page');
    setTimeout(() => {
      node.classList.add('is-out');
      setTimeout(() => node.remove(), 320);
    }, kind === 'good' ? 5200 : 3800);
  };

  UI.modal = function (opts) {
    const host = $('#modal');
    $('#modal-title').textContent = opts.title || '';
    mount('#modal-body', opts.body || '');
    const acts = $('#modal-acts');
    U.clear(acts);
    (opts.actions || [{ label: 'Close' }]).forEach(a => {
      acts.appendChild(U.el('button', {
        class: 'btn ' + (a.primary ? 'btn--primary' : a.danger ? 'btn--danger' : 'btn--ghost'),
        text: a.label,
        onclick: () => {
          UI.closeModal();
          if (a.onClick) a.onClick();
        }
      }));
    });
    host.hidden = false;
    if (opts.sound) SFX.play(opts.sound);
    return host;
  };

  UI.closeModal = function () {
    const host = $('#modal');
    if (host) host.hidden = true;
  };

  /* ══════════════════════════════════════════════════════
     MENU
     ══════════════════════════════════════════════════════ */

  UI.renderMenu = function () {
    const rank = Engine.rank();
    $('#rank-badge').textContent = rank.badge;
    $('#rank-title').textContent = rank.title;
    $('#rank-xp').textContent = U.fmtNum(rank.merit);
    $('#rank-xp-max').textContent = U.fmtNum(rank.ceiling);
    $('#rank-fill').style.width = (rank.pct * 100).toFixed(1) + '%';
    $('#stat-closed').textContent = Engine.closedCount();
    $('#stat-perfect').textContent = Engine.perfectCount();
    $('#stat-merit').textContent = U.fmtNum(Engine.totalMerit());

    const q = U.pick(QUOTES);
    $('#menu-quote').textContent = '“' + q + '”';

    const save = Engine.savedInfo();
    const btn = U.$('[data-nav="continue"]');
    const label = $('#resume-label');
    if (save) {
      btn.disabled = false;
      label.textContent = '— File ' + U.pad2(save.data.id) + ', ' + save.found + '/' + save.total + ' clues';
    } else {
      btn.disabled = true;
      label.textContent = '— nothing open';
    }
  };

  /* ══════════════════════════════════════════════════════
     CASE FILES
     ══════════════════════════════════════════════════════ */

  UI.renderCases = function () {
    const profile = Engine.profile();
    const next = Engine.nextCase();
    const total = Engine.cases().length;

    const pct = (Engine.closedCount() / total) * 100;
    $('#campaign-fill').style.width = pct.toFixed(1) + '%';
    $('#campaign-count').textContent = Engine.closedCount();
    $('#campaign-stars').textContent = Engine.totalStars();

    const list = Engine.cases().filter(c => UI.tierFilter === 'all' || c.tier === UI.tierFilter);
    mount('#cases-grid', list.map((c, i) => {
      const rec = profile.closed[c.id];
      const done = rec && rec.solved;
      const unlocked = Engine.isUnlocked(c.id);
      const tier = TIERS[c.tier];
      const cls = ['case-card'];
      if (!unlocked) cls.push('is-locked');
      else if (done) cls.push('is-done');
      else if (next && c.id === next.id) cls.push('is-next');
      return '<button class="' + cls.join(' ') + '" data-case="' + c.id + '" style="animation-delay:' + (i * 28) + 'ms">' +
        (unlocked ? '' : '<span class="case-card__lock">🔒</span>') +
        '<span class="case-card__top">' +
        '<span class="case-card__no">File ' + U.pad2(c.id) + '</span>' +
        '<span class="case-card__tier tier-' + c.tier + '">Tier ' + tier.roman + '</span>' +
        '</span>' +
        '<span class="case-card__title">' + esc(c.title) + '</span>' +
        '<span class="case-card__brief">' + esc(c.brief[0]) + '</span>' +
        '<span class="case-card__foot">' +
        '<span class="case-card__meta"><b>' + c.clues.length + '</b> clues &middot; <b>' +
        c.locations.length + '</b> places &middot; ' + c.suspects.length + ' people</span>' +
        stars(done ? rec.stars : 0) +
        '</span></button>';
    }).join('') || '<p class="empty">No files at this tier.</p>');
  };

  /* ══════════════════════════════════════════════════════
     DOSSIER
     ══════════════════════════════════════════════════════ */

  UI.renderDossier = function () {
    const total = Engine.cases().length;
    const p = Engine.profile();
    const avg = Engine.closedCount() ? Math.round(Engine.totalMerit() / Engine.closedCount()) : 0;

    mount('#dossier-stats', statRows([
      { label: 'Cases closed', pts: Engine.closedCount() + ' / ' + total, ok: true },
      { label: 'Perfect deductions (3★)', pts: Engine.perfectCount(), ok: Engine.perfectCount() > 0 },
      { label: 'Stars earned', pts: Engine.totalStars() + ' / ' + (total * 3), ok: true },
      { label: 'Total merit', pts: Engine.totalMerit(), ok: true },
      { label: 'Average merit per case', pts: avg, ok: true },
      { label: 'Cases reopened', pts: Object.keys(p.closed).reduce((s, id) => s + Math.max(0, (p.closed[id].plays || 1) - 1), 0), ok: false },
      { label: 'Current standing', pts: Engine.rank().badge + ' — ' + Engine.rank().title, ok: true, total: true }
    ]));

    mount('#dossier-achievements', Engine.achievements().map(a =>
      '<div class="ach ' + (a.earned ? 'is-unlocked' : '') + '">' +
      '<span class="ach__icon">' + (a.earned ? a.icon : '🔒') + '</span>' +
      '<div><p class="ach__name">' + esc(a.name) + '</p>' +
      '<p class="ach__desc">' + esc(a.desc) + (a.earned ? ' — ' + U.fmtSpan((Date.now() - a.at) / 1000) + ' ago' : '') + '</p></div></div>'
    ).join(''));

    mount('#dossier-tiers', Engine.tiers().map(t => {
      const prog = Engine.tierProgress(t.id);
      const pct = (prog.done / prog.total) * 100;
      return '<div class="tier-row ' + (prog.complete ? 'is-done' : prog.done ? 'is-open' : '') + '">' +
        '<div class="tier-row__head"><span class="tier-row__name">Tier ' + t.roman + ' — ' + esc(t.name) + '</span>' +
        '<span class="tier-row__score">' + prog.done + '/' + prog.total + '</span></div>' +
        '<div class="meter"><i style="width:' + pct.toFixed(1) + '%"></i></div>' +
        '<p style="font-size:.76rem;color:var(--tx-lo)">' + esc(t.blurb) + '</p></div>';
    }).join(''));
  };

  /* ══════════════════════════════════════════════════════
     HALL OF RECORDS
     ══════════════════════════════════════════════════════ */

  UI.renderBoard = function (rows, note) {
    const list = rows || Engine.localBoard();
    mount('#board-body', list.map((r, i) =>
      '<tr class="' + (r.you ? 'is-you' : '') + '">' +
      '<td class="num">' + (i + 1) + '</td>' +
      '<td class="who">' + esc(r.callsign) + (r.you ? ' <span style="color:var(--accent);font-size:.7em">◆ you</span>' : '') + '</td>' +
      '<td class="sc">' + r.tier4 + ' / 3</td>' +
      '<td class="sc">' + r.cases + '</td>' +
      '<td class="sc">' + r.stars + '</td>' +
      '<td class="sc">' + U.fmtNum(r.merit) + '</td></tr>'
    ).join(''));

    if (note) $('#board-note').textContent = note;

    const p = Engine.profile();
    const input = $('#callsign');
    if (document.activeElement !== input) input.value = p.callsign || '';
  };

  /* ══════════════════════════════════════════════════════
     BRIEFING
     ══════════════════════════════════════════════════════ */

  UI.renderBrief = function (caseId) {
    const c = Engine.caseById(caseId);
    if (!c) return;
    UI.briefId = caseId;
    const tier = TIERS[c.tier];

    $('#brief-stamp').textContent = 'FILE ' + U.pad2(c.id);
    $('#brief-kicker').textContent = 'Case File — Tier ' + tier.roman;
    $('#brief-title').textContent = c.title;
    $('#brief-meta').textContent = [c.date, c.place].filter(Boolean).join(' · ');

    mount('#brief-body', c.brief.map(p => '<p>' + esc(p) + '</p>').join('') +
      (c.setup ? '<p><em>' + esc(c.setup) + '</em></p>' : ''));

    mount('#brief-parties', [
      ['Client', c.client],
      ['Fee', c.fee],
      ['Weather', c.weather],
      ['Party', c.place]
    ].filter(r => r[1]).map(r =>
      '<div class="party"><span class="party__k">' + esc(r[0]) + '</span><span class="party__v">' + esc(r[1]) + '</span></div>'
    ).join(''));

    mount('#brief-terms', [
      ['Clues in the file', c.clues.length],
      ['Places to work', c.locations.length],
      ['People of interest', c.suspects.length],
      ['Deadline', c.deadline > 0 ? U.fmtSpan(c.deadline) : 'none']
    ].map((r, i) => '<div class="term"><span>' + esc(r[0]) + '</span><b' +
      (i === 3 && c.deadline > 0 ? ' class="warn"' : '') + '>' + esc(String(r[1])) + '</b></div>'
    ).join(''));

    mount('#brief-difficulty',
      '<div class="difficulty__label"><span>Tier ' + tier.roman + ' — ' + esc(tier.name) + '</span>' +
      dots(TIER_LEVEL[c.tier], c.tier === 'easy' || c.tier === 'medium') + '</div>' +
      '<p style="font-size:.78rem;color:var(--tx-lo);line-height:1.5">' + esc(tier.blurb) + '</p>' +
      '<p class="term" style="border:0;padding:0"><span>Merit on offer</span><b>' + U.fmtNum(c.merit) + '</b></p>');
  };

  /* ══════════════════════════════════════════════════════
     HUB
     ══════════════════════════════════════════════════════ */

  function presentHere(loc) {
    return (loc.present || []).map(id => Engine.suspect(Engine.run.data, id)).filter(Boolean);
  }

  function locState(loc) {
    const run = Engine.run;
    const total = loc.exams.length;
    const done = loc.exams.filter(x => run.examined.indexOf(x.id) !== -1).length;
    return { total: total, done: done, complete: total > 0 && done === total };
  }

  function clearedSuspect(sid) {
    const run = Engine.run;
    const node = run.data.confront[sid] || {};
    const pairs = run.found.filter(cid => node[cid]);
    if (!pairs.length) return false;
    return pairs.every(cid => run.used.indexOf(sid + '/' + cid) !== -1);
  }

  UI.renderHub = function () {
    const run = Engine.run;
    if (!run) return;
    const d = run.data;

    $('#hud-no').textContent = 'CASE ' + U.pad2(d.id);
    $('#hud-name').textContent = d.title;
    $('#hud-clues').textContent = 'Evidence ' + run.found.length + '/' + d.clues.length;

    const clockWrap = $('#hud-clock-wrap');
    if (d.deadline > 0) {
      clockWrap.hidden = false;
      $('#hud-clock').textContent = U.fmtClock(run.timeLeft);
      const pct = Engine.timeRatio() * 100;
      $('#hud-clock-fill').style.width = pct.toFixed(1) + '%';
      const low = Engine.timeRatio() < 0.15;
      clockWrap.classList.toggle('is-low', low);
      $('#hud-clock-fill').parentElement.classList.toggle('is-low', low);
      if (low) SFX.play('tick');
    } else {
      clockWrap.hidden = true;
    }

    $('#hub-brief').textContent = d.brief[0];

    mount('#loc-grid', d.locations.map((loc, i) => {
      const st = locState(loc);
      return '<button class="loc ' + (st.complete ? 'is-done' : '') + '" data-loc="' + esc(loc.id) +
        '" style="animation-delay:' + (i * 30) + 'ms">' +
        (st.complete ? '<span class="loc__state">✓</span>' : '') +
        '<span class="loc__no">Location ' + U.pad2(i + 1) + '</span>' +
        '<span class="loc__name">' + esc(loc.name) + '</span>' +
        '<span class="loc__desc">' + esc(loc.desc) + '</span>' +
        '<span class="loc__bar">' +
        '<span class="loc__count">' + st.done + '/' + st.total + ' searched</span>' +
        '<span class="loc__faces">' + presentHere(loc).map(s =>
          '<span title="' + esc(s.name) + '">' + esc(U.initials(s.name)) + '</span>').join('') + '</span>' +
        '</span></button>';
    }).join(''));

    mount('#hub-suspects', d.suspects.map(s => {
      const where = d.locations.filter(l => (l.present || []).indexOf(s.id) !== -1);
      return '<div class="suspect ' + (clearedSuspect(s.id) ? 'is-suspect-cleared' : '') + '">' +
        '<span class="suspect__face">' + esc(s.face || U.initials(s.name)) + '</span>' +
        '<div><p class="suspect__name">' + esc(s.name) + '</p>' +
        '<p class="suspect__role">' + esc(s.role) + '</p>' +
        '<p class="suspect__mood">' + (clearedSuspect(s.id) ? 'cleared' : where.length ? 'at ' + esc(where[0].name) : 'not located') + '</p></div></div>';
    }).join(''));

    const thread = run.log.slice(-9).reverse();
    mount('#hub-thread', thread.length
      ? thread.map(e => '<li><b>' + esc(e.who) + '</b> ' + esc(e.txt) + '</li>').join('')
      : '<li><b>The thread is empty.</b> Start looking.</li>');

    const pct = (run.found.length / d.clues.length) * 100;
    $('#hub-progress').style.width = pct.toFixed(1) + '%';

    const hintBtn = $('#hub-hint');
    hintBtn.disabled = !Engine.hintAvailable();
    hintBtn.title = Engine.hintAvailable() ? 'Consult the file (H)' : 'No further help available';
  };

  /* Cheap per-second refresh: clock, evidence tally, progress bar only. */
  UI.updateHud = function () {
    const run = Engine.run;
    if (!run) return;
    $('#hud-clues').textContent = 'Evidence ' + run.found.length + '/' + run.data.clues.length;
    const wrap = $('#hud-clock-wrap');
    if (run.deadline > 0) {
      wrap.hidden = false;
      $('#hud-clock').textContent = U.fmtClock(run.timeLeft);
      $('#hud-clock-fill').style.width = (Engine.timeRatio() * 100).toFixed(1) + '%';
      const low = Engine.timeRatio() < 0.15;
      wrap.classList.toggle('is-low', low);
      $('#hud-clock-fill').parentElement.classList.toggle('is-low', low);
      if (low) SFX.play('tick');
    }
    $('#hub-progress').style.width = ((run.found.length / run.data.clues.length) * 100).toFixed(1) + '%';
  };

  /* ══════════════════════════════════════════════════════
     SCENE
     ══════════════════════════════════════════════════════ */

  UI.renderScene = function () {
    const run = Engine.run;
    if (!run || !UI.sceneLocId) return;
    const loc = Engine.location(run.data, UI.sceneLocId);
    if (!loc) return;

    const idx = run.data.locations.indexOf(loc) + 1;
    $('#scene-kicker').textContent = 'Location ' + U.pad2(idx);
    $('#scene-title').textContent = loc.name;
    $('#scene-desc').textContent = loc.desc;

    const done = loc.exams.filter(x => run.examined.indexOf(x.id) !== -1).length;
    $('#scene-exam-count').textContent = done + '/' + loc.exams.length;

    mount('#scene-exams', loc.exams.map(x => {
      const seen = run.examined.indexOf(x.id) !== -1;
      const isDead = !!x.dead;
      return '<button class="exam ' + (seen ? 'is-done ' : '') + (isDead ? 'is-dead' : '') +
        '" data-exam="' + esc(x.id) + '">' +
        '<span class="exam__ico">' + esc(x.icon || '·') + '</span>' +
        '<span><span class="exam__name">' + esc(x.name) + '</span><br>' +
        '<span class="exam__note">' + esc(x.note || '') + '</span></span>' +
        '<span class="exam__mark">' + (seen ? (isDead ? '✕' : '✓') : '›') + '</span></button>';
    }).join(''));

    const people = presentHere(loc);
    $('#scene-suspect-count').textContent = people.length + ' present';

    mount('#scene-suspects', people.length
      ? people.map(s => '<div class="present">' +
        '<span class="present__face">' + esc(s.face || U.initials(s.name)) + '</span>' +
        '<div><p class="present__name">' + esc(s.name) + '</p>' +
        '<p class="exam__note">' + esc(s.role) + '</p></div>' +
        '<span class="present__acts"><button class="mini-btn" data-present="' + esc(s.id) + '">Present</button></span>' +
        '</div>').join('')
      : '<p class="empty">Nobody here. A good place to think.</p>');

    const log = Engine.sceneLog(loc.id);
    mount('#scene-log', log.map(e =>
      '<div class="log__entry tone-' + esc(e.tone || 'good') + '">' +
      '<p class="log__who">' + esc(e.who) + '</p>' +
      '<p class="log__txt">' + esc(e.txt) + '</p>' +
      (e.src ? '<p class="log__src">re: ' + esc(e.src) + '</p>' : '') +
      '</div>').join(''));

    const logBox = $('#scene-log');
    if (logBox) logBox.scrollTop = logBox.scrollHeight;
  };

  /* ══════════════════════════════════════════════════════
     JOURNAL
     ══════════════════════════════════════════════════════ */

  function evidenceCard(clue, extraClass) {
    const where = Engine.location(Engine.run.data, clue.from);
    return '<button class="ev-card ' + (extraClass || '') + '" data-clue="' + esc(clue.id) + '" data-kind="' +
      esc(Engine.kindLabel(clue.type)) + '">' +
      '<span class="ev-card__name">' + esc(clue.name) + '</span>' +
      '<span class="ev-card__text">' + esc(clue.text) + '</span>' +
      '<span class="ev-card__where">' + esc(where ? where.name : 'unknown') + '</span>' +
      '</button>';
  }

  UI.renderJournal = function () {
    const run = Engine.run;
    if (!run) return;
    const d = run.data;

    $('#journal-title').textContent = 'Case Journal — File ' + U.pad2(d.id);
    $('#tab-n-evidence').textContent = run.found.length;
    $('#tab-n-suspects').textContent = d.suspects.length;

    const q = ($('#evidence-search').value || '').toLowerCase();
    const type = $('#evidence-filter').value;
    const list = run.found
      .map(id => Engine.clue(d, id)).filter(Boolean)
      .filter(c => (type === 'all' || c.type === type))
      .filter(c => !q || (c.name + ' ' + c.text).toLowerCase().indexOf(q) !== -1);

    mount('#evidence-grid', list.length
      ? list.map(c => evidenceCard(c)).join('')
      : '<p class="empty">Nothing recovered yet. Go and look at something.</p>');

    mount('#journal-suspects', d.suspects.map(s => {
      const where = d.locations.filter(l => (l.present || []).indexOf(s.id) !== -1);
      return '<div class="suspect ' + (clearedSuspect(s.id) ? 'is-suspect-cleared' : '') + '">' +
        '<span class="suspect__face">' + esc(s.face || U.initials(s.name)) + '</span>' +
        '<div><p class="suspect__name">' + esc(s.name) + '</p>' +
        '<p class="suspect__role">' + esc(s.role) + '</p>' +
        '<p class="exam__note" style="margin-top:.3rem">' + esc(s.note || '') + '</p>' +
        '<p class="suspect__mood">' + (where.length ? 'at ' + esc(where[0].name) : 'not located') + '</p></div></div>';
    }).join(''));

    mount('#journal-locations', d.locations.map(loc => {
      const st = locState(loc);
      const found = loc.exams.filter(x => !x.dead && x.clue)
        .filter(x => run.found.indexOf(x.clue) !== -1);
      return '<div class="loc-note">' +
        '<div class="loc-note__head"><span class="loc-note__name">' + esc(loc.name) + '</span>' +
        '<span class="loc-note__count">' + st.done + '/' + st.total + ' searched</span></div>' +
        (found.length
          ? '<ul class="loc-note__found">' + found.map(x =>
            '<li>' + esc((Engine.clue(d, x.clue) || {}).name || x.name) + '</li>').join('') + '</ul>'
          : '<p style="font-size:.78rem;color:var(--tx-faint)">Nothing of consequence recovered here yet.</p>') +
        '<p style="font-size:.78rem;color:var(--tx-lo)">' + esc(loc.desc) + '</p></div>';
    }).join(''));

    const notes = $('#notes-area');
    if (document.activeElement !== notes) notes.value = run.notes || '';
  };

  /* ── Presenting evidence ─────────────────────────────── */

  UI.presentPicker = function (suspectId) {
    const run = Engine.run;
    const person = Engine.suspect(run.data, suspectId);
    const node = run.data.confront[suspectId];
    if (!person) return;

    if (!node) {
      UI.modal({
        title: person.name,
        body: '<p style="color:var(--tx-lo)">They have nothing to say to you. Or nothing worth hearing.</p>'
      });
      return;
    }

    const found = run.found.map(id => Engine.clue(run.data, id)).filter(Boolean);
    const usable = found.filter(c => node[c.id]);
    const spent = found.filter(c => node[c.id] && run.used.indexOf(suspectId + '/' + c.id) !== -1);

    if (!found.length) {
      UI.modal({
        title: person.name,
        body: '<p style="color:var(--tx-lo)">You have nothing worth their attention. Search first, then talk.</p>'
      });
      return;
    }

    const body = '<p style="color:var(--tx-lo);margin-bottom:.8rem">What do you put in front of ' +
      esc(person.name) + '?</p><div class="ev-pick-list">' +
      found.map(c => {
        const live = !!node[c.id] && run.used.indexOf(suspectId + '/' + c.id) === -1;
        return '<button class="ev-card ' + (live ? 'is-key' : '') + '" data-kind="' +
          esc(Engine.kindLabel(c.type)) + '" data-give="' + esc(c.id) + '"' +
          (live ? '' : ' disabled style="opacity:.45"') + '>' +
          '<span class="ev-card__name">' + esc(c.name) + '</span>' +
          '<span class="ev-card__text">' + (live ? esc(c.text) : 'Already spent on them.') + '</span>' +
          '<span class="ev-card__where">' + (node[c.id] ? (run.used.indexOf(suspectId + '/' + c.id) === -1 ? 'may land' : 'said all they know') : 'means nothing to them') + '</span></button>';
      }).join('') + '</div>' +
      '<p style="font-size:.76rem;color:var(--tx-faint);margin-top:.7rem">' +
      (usable.length
        ? usable.length + ' of ' + found.length + ' items in your file mean something to ' + esc(person.name) + '.'
        : 'Nothing you hold means anything to ' + esc(person.name) + '.') +
      (spent.length ? ' ' + spent.length + ' already spent.' : '') + '</p>';

    UI.modal({ title: person.name, body: body });
  };

  UI.doPresent = function (suspectId, clueId) {
    const res = Engine.confront(suspectId, clueId);
    if (!res.ok) {
      if (res.reason === 'silent') UI.toast('Nothing', 'They are not talking.', 'note');
      else if (res.reason === 'nothing') UI.toast('Nothing', 'It means nothing to them. Effort spent, nothing gained.', 'bad');
      UI.renderScene();
      return;
    }
    SFX.play(res.revealed ? 'reveal' : 'clue');
    UI.renderScene();
    if (res.revealed) {
      UI.toast('Evidence recovered', res.revealed.name, 'good');
    } else {
      UI.toast(res.person.name, res.line, 'note');
    }
  };

  /* ══════════════════════════════════════════════════════
     ACCUSATION
     ══════════════════════════════════════════════════════ */

  UI.openAccuse = function () {
    const run = Engine.run;
    if (!run) return;
    UI.accuse = { step: 0, culprit: null, motive: null, method: null, evidence: [] };
    UI.renderAccuse();
  };

  function accuseProgress() {
    let out = '';
    for (let i = 0; i < ACCUSE_STEPS; i++) {
      out += '<i class="accuse__step ' + (i < UI.accuse.step ? 'is-done' : i === UI.accuse.step ? 'is-now' : '') + '"></i>';
    }
    return out;
  }

  function optList(items, picked, attr) {
    return '<div class="opt-list">' + items.map(o =>
      '<button class="opt ' + (picked === o.value ? 'is-picked' : '') + '" data-' + attr + '="' + esc(o.value) + '">' +
      (o.face ? '<span class="opt__face">' + esc(o.face) + '</span>' : '<span class="opt__face">' + esc(U.initials(o.label)) + '</span>') +
      '<span><span class="opt__name">' + esc(o.label) + '</span>' +
      (o.sub ? '<br><span class="opt__sub">' + esc(o.sub) + '</span>' : '') + '</span>' +
      '<span class="opt__box"></span></button>'
    ).join('') + '</div>';
  }

  function accuseSummary() {
    const a = UI.accuse;
    const d = Engine.run.data;
    const name = a.culprit ? (Engine.suspect(d, a.culprit) || {}).name : null;
    const rows = [
      ['The person', name],
      ['The motive', a.motive],
      ['The method', a.method],
      ['Evidence cited', a.evidence.length ? a.evidence.length + ' item' + (a.evidence.length === 1 ? '' : 's') : null]
    ];
    return '<div class="accuse__summary"><h4>So far</h4><dl>' +
      rows.map(r => '<div class="row"><dt>' + esc(r[0]) + '</dt><dd class="' + (r[1] ? '' : 'miss') + '">' +
        (r[1] ? esc(r[1]) : 'not yet') + '</dd></div>').join('') + '</dl></div>';
  }

  UI.renderAccuse = function () {
    const run = Engine.run;
    if (!run) return;
    const d = run.data;
    const a = UI.accuse;
    const step = U.clamp(a.step, 0, ACCUSE_STEPS - 1);

    $('#accuse-progress').innerHTML = accuseProgress();
    $('#accuse-reset').style.visibility = (a.step === 0 && !a.culprit) ? 'hidden' : 'visible';

    let body = accuseSummary();
    let title = '';
    let hint = '';

    if (step === 0) {
      title = 'Name the person.';
      hint = 'One of them did it. You only get one name, and the prosecutor will not ask twice.';
      body += '<div class="step"><h3 class="step__q">' + title + '</h3>' +
        '<p class="step__hint">' + hint + '</p>' +
        optList(d.suspects.map(s => ({ value: s.id, label: s.name, sub: s.role, face: s.face })), a.culprit, 'pick-culprit') +
        '</div>';
    } else if (step === 1) {
      title = 'Why.';
      hint = 'Fear, money, shame, love. Pick the reason that would survive a courtroom.';
      body += '<div class="step"><h3 class="step__q">' + title + '</h3>' +
        '<p class="step__hint">' + hint + '</p>' +
        optList(d.motives.map(m => ({ value: m, label: m })), a.motive, 'pick-motive') +
        '</div>';
    } else if (step === 2) {
      title = 'How.';
      hint = 'The detail that makes it this and not something else.';
      body += '<div class="step"><h3 class="step__q">' + title + '</h3>' +
        '<p class="step__hint">' + hint + '</p>' +
        optList(d.methods.map(m => ({ value: m, label: m })), a.method, 'pick-method') +
        '</div>';
    } else {
      title = 'Prove it.';
      hint = 'Cite what you recovered. Only what you found counts, and only what you cite scores.';
      const found = run.found.map(id => Engine.clue(d, id)).filter(Boolean);
      body += '<div class="step"><h3 class="step__q">' + title + '</h3>' +
        '<p class="step__hint">' + hint + '</p>' +
        (found.length
          ? '<div class="ev-pick-list">' + found.map(c => evidenceCard(c, a.evidence.indexOf(c.id) !== -1 ? 'is-picked' : '')).join('') + '</div>'
          : '<p class="empty">You have recovered nothing. You may still submit, but you will be guessing.</p>') +
        '</div>';
    }

    mount('#accuse-body', body);

    const ready = !!a.culprit && !!a.motive && !!a.method;
    const warn = $('#accuse-warn');
    const submit = $('#accuse-submit');

    if (step < ACCUSE_STEPS - 1) {
      const answered = [a.culprit, a.motive, a.method][step];
      submit.disabled = !answered;
      submit.textContent = step === ACCUSE_STEPS - 2 ? 'Review the charge sheet' : 'Next';
      warn.classList.remove('is-hot');
      warn.textContent = step === ACCUSE_STEPS - 2
        ? 'The last page. You can still change your mind.'
        : 'An accusation without evidence is a libel suit waiting to happen.';
    } else {
      submit.disabled = !ready;
      submit.textContent = 'Submit to the Prosecutor';
      const none = !a.evidence.length;
      warn.classList.toggle('is-hot', none);
      warn.textContent = none
        ? 'You are about to accuse a man on no evidence at all.'
        : a.evidence.length + ' piece' + (a.evidence.length === 1 ? '' : 's') + ' of evidence cited.';
    }
  };

  UI.accusePick = function (key, value) {
    UI.accuse[key] = value;
    SFX.play('click');
    UI.renderAccuse();
  };

  UI.accuseToggleEvidence = function (clueId) {
    const list = UI.accuse.evidence;
    const i = list.indexOf(clueId);
    if (i === -1) list.push(clueId); else list.splice(i, 1);
    SFX.play('click');
    UI.renderAccuse();
  };

  UI.accuseNext = function () {
    const a = UI.accuse;
    if (a.step < ACCUSE_STEPS - 1) {
      a.step += 1;
      SFX.play('page');
      UI.renderAccuse();
      return true;
    }
    return false;
  };

  UI.accuseBack = function () {
    if (UI.accuse.step > 0) {
      UI.accuse.step -= 1;
      SFX.play('page');
      UI.renderAccuse();
      return true;
    }
    return false;
  };

  /* ══════════════════════════════════════════════════════
     VERDICT
     ══════════════════════════════════════════════════════ */

  UI.renderVerdict = function (result) {
    const run = Engine.run;
    const d = run ? run.data : Engine.caseById(Engine.verdictCaseId);
    const prev = Engine.caseRecord(d.id);
    const improved = result.score > 0 && (!prev || result.score >= prev.score);

    const banner = $('#verdict-banner');
    if (result.expired) {
      banner.className = 'verdict__banner bad';
      banner.textContent = 'Time Expired';
    } else if (result.solved) {
      banner.className = 'verdict__banner good';
      banner.textContent = 'Case Closed';
    } else {
      banner.className = 'verdict__banner mid';
      banner.textContent = 'Charge Laid';
    }

    $('#verdict-title').textContent = result.solved
      ? 'You named the right person, and you could prove it.'
      : (result.expired
        ? 'The file closed without your name on it.'
        : 'You named the wrong person. Somebody else walks.');

    $('#verdict-stars').innerHTML = bigStars(result.stars);
    $('#verdict-grade').textContent = result.grade;
    $('#verdict-score').textContent = U.fmtNum(result.score) + ' of ' + U.fmtNum(result.merit) + ' merit';

    mount('#verdict-breakdown', statRows(result.rows));

    const t = d.truth;
    const culprit = Engine.suspect(d, t.culprit) || {};
    mount('#verdict-truth',
      '<h4>The culprit</h4><p><strong>' + esc(culprit.name || '?') + '</strong> — ' + esc(culprit.role || '') + '</p>' +
      '<h4>The motive</h4><p>' + esc(t.motive) + '</p>' +
      '<h4>The method</h4><p>' + esc(t.method) + '</p>' +
      (t.narrative ? '<h4>How it happened</h4><p>' + esc(t.narrative) + '</p>' : '') +
      (t.reveal ? '<h4>What they said</h4><p>' + esc(t.reveal) + '</p>' : '') +
      (improved ? '<p style="margin-top:1rem;color:var(--sage);font-size:.8rem">A new personal best on this file.</p>' : ''));
  };

  /* ══════════════════════════════════════════════════════
     CLUE PRESENTATION (shared)
     ══════════════════════════════════════════════════════ */

  UI.showClue = function (clue, fresh) {
    const where = Engine.location(Engine.run.data, clue.from);
    UI.modal({
      title: clue.name,
      sound: fresh ? 'clue' : 'page',
      body: '<p style="color:var(--accent);font-family:var(--f-type);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;margin-bottom:.6rem">' +
        esc(Engine.kindLabel(clue.type)) + ' &middot; ' + esc(where ? where.name : 'unknown') + '</p>' +
        '<p style="color:var(--tx);line-height:1.75">' + esc(clue.text) + '</p>' +
        (fresh ? '<p style="margin-top:1rem;color:var(--sage);font-size:.78rem">Recovered. It is in the journal now.</p>' : ''),
      actions: [{ label: 'Close', primary: true }, { label: 'Open journal', onClick: () => App.go('journal') }]
    });
  };

  global.UI = UI;

})(window);

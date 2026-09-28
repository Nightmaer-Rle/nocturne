/* ═══════════════════════════════════════════════════════════
   NOCTURNE — util.js
   Primitives: DOM, storage, events, formatting. No game logic.
   ═══════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const U = {};

  /* ── DOM ─────────────────────────────────────────────── */

  U.$ = (sel, root) => (root || document).querySelector(sel);
  U.$$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  U.esc = function (value) {
    if (value == null) return '';
    return String(value).replace(/[&<>"']/g, c => ESCAPES[c]);
  };

  U.el = function (tag, attrs, html) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const key in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
        const val = attrs[key];
        if (val == null || val === false) continue;
        if (key === 'class') node.className = val;
        else if (key === 'text') node.textContent = val;
        else if (key === 'html') node.innerHTML = val;
        else if (key === 'dataset') { for (const d in val) node.dataset[d] = val[d]; }
        else if (key.slice(0, 2) === 'on' && typeof val === 'function') {
          node.addEventListener(key.slice(2).toLowerCase(), val);
        } else if (val === true) node.setAttribute(key, '');
        else node.setAttribute(key, val);
      }
    }
    if (html != null) node.innerHTML = html;
    return node;
  };

  U.clear = function (node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
    return node;
  };

  U.on = function (target, type, handler, opts) {
    target.addEventListener(type, handler, opts);
    return () => target.removeEventListener(type, handler, opts);
  };

  /** Delegated listener: fires when the event target is inside sel. */
  U.delegate = function (root, type, sel, handler) {
    return U.on(root, type, function (e) {
      const hit = e.target.closest(sel);
      if (hit && root.contains(hit)) handler(e, hit);
    });
  };

  /* ── Numbers ─────────────────────────────────────────── */

  U.clamp = (n, lo, hi) => (n < lo ? lo : n > hi ? hi : n);
  U.pad2 = n => (n < 10 ? '0' + n : String(n));
  U.rand = (lo, hi) => lo + Math.random() * (hi - lo);
  U.randInt = (lo, hi) => Math.floor(lo + Math.random() * (hi - lo + 1));
  U.pick = arr => arr[Math.floor(Math.random() * arr.length)];

  U.shuffle = function (arr) {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  };

  U.uniq = arr => arr.filter((v, i) => arr.indexOf(v) === i);

  U.sum = arr => arr.reduce((a, b) => a + (Number(b) || 0), 0);

  /* ── Formatting ──────────────────────────────────────── */

  /** 95 -> "1:35", 3935 -> "1:05:35" */
  U.fmtClock = function (seconds) {
    const s = Math.max(0, Math.round(Number(seconds) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    return h > 0 ? h + ':' + U.pad2(m) + ':' + U.pad2(r) : U.pad2(m) + ':' + U.pad2(r);
  };

  /** 3840 -> "1h 4m", 240 -> "4m" */
  U.fmtSpan = function (seconds) {
    const s = Math.max(0, Math.round(Number(seconds) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.round((s % 3600) / 60);
    if (h && m) return h + 'h ' + m + 'm';
    if (h) return h + 'h';
    return m + 'm';
  };

  U.fmtNum = n => (Number(n) || 0).toLocaleString('en-GB');

  U.initials = function (name) {
    return String(name || '?')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
  };

  /** "1" -> "1st" */
  U.ordinal = function (n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  U.stars = function (earned, total) {
    let out = '';
    for (let i = 0; i < (total || 3); i++) out += i < earned ? '★' : '☆';
    return out;
  };

  /* ── Environment ─────────────────────────────────────── */

  U.motionQuery = global.matchMedia ? global.matchMedia('(prefers-reduced-motion: reduce)') : null;
  U.prefersReducedMotion = () => !!(U.motionQuery && U.motionQuery.matches);
  U.isTouch = () => global.matchMedia ? global.matchMedia('(hover: none)').matches : false;

  /* ── Timing ──────────────────────────────────────────── */

  U.debounce = function (fn, wait) {
    let t = 0;
    return function () {
      const args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(() => fn.apply(self, args), wait || 120);
    };
  };

  U.throttle = function (fn, wait) {
    let last = 0, timer = 0;
    return function () {
      const args = arguments, self = this, now = Date.now();
      const gap = now - last;
      if (gap >= wait) { last = now; fn.apply(self, args); }
      else if (!timer) {
        timer = setTimeout(() => { timer = 0; last = Date.now(); fn.apply(self, args); }, wait - gap);
      }
    };
  };

  /* ── Storage ─────────────────────────────────────────── */

  const NS = 'nocturne.';

  U.store = {
    get(key, fallback) {
      try {
        const raw = global.localStorage.getItem(NS + key);
        if (raw == null) return fallback;
        const val = JSON.parse(raw);
        return val == null ? fallback : val;
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        global.localStorage.setItem(NS + key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn('[nocturne] could not persist "' + key + '"', e);
        return false;
      }
    },
    del(key) {
      try { global.localStorage.removeItem(NS + key); } catch (e) { /* private mode */ }
    },
    keys() {
      try {
        return Object.keys(global.localStorage).filter(k => k.slice(0, NS.length) === NS);
      } catch (e) {
        return [];
      }
    },
    wipe() {
      U.store.keys().forEach(k => { try { global.localStorage.removeItem(k); } catch (e) { /* ignore */ } });
    }
  };

  /* ── Event bus ───────────────────────────────────────── */

  function makeBus() {
    const channels = new Map();
    return {
      on(evt, fn) {
        if (!channels.has(evt)) channels.set(evt, new Set());
        channels.get(evt).add(fn);
        return () => this.off(evt, fn);
      },
      off(evt, fn) {
        const set = channels.get(evt);
        if (set) set.delete(fn);
      },
      once(evt, fn) {
        const off = this.on(evt, function (payload) { off(); fn(payload); });
        return off;
      },
      emit(evt, payload) {
        const set = channels.get(evt);
        if (!set) return;
        for (const fn of Array.from(set)) {
          try { fn(payload); } catch (e) { console.error('[nocturne:' + evt + ']', e); }
        }
      }
    };
  }

  U.bus = makeBus();

  /* ── Collections ─────────────────────────────────────── */

  U.groupBy = function (arr, keyFn) {
    const out = new Map();
    for (const item of arr) {
      const k = keyFn(item);
      if (!out.has(k)) out.set(k, []);
      out.get(k).push(item);
    }
    return out;
  };

  U.byId = function (arr, id) {
    for (const item of arr) if (item && item.id === id) return item;
    return null;
  };

  global.U = U;

})(window);

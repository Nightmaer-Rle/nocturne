/* ═══════════════════════════════════════════════════════════
   NOCTURNE — rain.js
   Canvas rain. Stops itself when the tab is hidden or the user
   has asked for reduced motion.
   ═══════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const Rain = {
    canvas: null,
    ctx: null,
    enabled: true,
    dismissed: false,
    running: false,
    intensity: 0.6,
    drops: [],
    splashes: [],
    _raf: 0,
    _last: 0,
    _w: 0,
    _h: 0,
    _dpr: 1
  };

  const MAX_DROPS = 260;

  function resize() {
    if (!Rain.canvas) return;
    const dpr = Math.min(global.devicePixelRatio || 1, 2);
    const w = Rain.canvas.clientWidth || global.innerWidth;
    const h = Rain.canvas.clientHeight || global.innerHeight;
    Rain._dpr = dpr;
    Rain._w = w;
    Rain._h = h;
    Rain.canvas.width = Math.floor(w * dpr);
    Rain.canvas.height = Math.floor(h * dpr);
    if (Rain.ctx) Rain.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function makeDrop(atTop) {
    const speed = Rain.rand(0.55, 1);
    return {
      x: Rain.rand(0, Rain._w),
      y: atTop ? Rain.rand(-Rain._h, 0) : Rain.rand(-40, Rain._h),
      len: Rain.rand(9, 26) * (0.6 + speed * 0.6),
      speed: speed * Rain.rand(760, 1180),
      alpha: Rain.rand(0.12, 0.4),
      wind: Rain.rand(-0.28, 0.1)
    };
  }

  function seed() {
    const want = Math.round(MAX_DROPS * Rain.intensity);
    Rain.drops.length = 0;
    for (let i = 0; i < want; i++) Rain.drops.push(makeDrop(false));
  }

  function step(dt) {
    const ctx = Rain.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, Rain._w, Rain._h);
    ctx.lineCap = 'round';

    for (const d of Rain.drops) {
      d.y += d.speed * dt;
      d.x += d.speed * d.wind * dt;

      if (d.y > Rain._h) {
        if (Rain.intensity > 0.45 && Math.random() < 0.22) {
          Rain.splashes.push({ x: d.x, y: Rain._h - Rain.rand(0, 6), r: 0, a: d.alpha * 0.5 });
        }
        Object.assign(d, makeDrop(true));
        d.y = Rain.rand(-60, -10);
        d.x = Rain.rand(-40, Rain._w + 40);
        continue;
      }
      if (d.x < -60 || d.x > Rain._w + 60) { d.x = Rain.rand(0, Rain._w); }

      ctx.strokeStyle = 'rgba(186,206,232,' + d.alpha.toFixed(3) + ')';
      ctx.lineWidth = Rain.rand(0.7, 1.5);
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.wind * d.len, d.y - d.len);
      ctx.stroke();
    }

    for (let i = Rain.splashes.length - 1; i >= 0; i--) {
      const s = Rain.splashes[i];
      s.r += 42 * dt;
      s.a -= 0.55 * dt;
      if (s.a <= 0 || s.r > 22) { Rain.splashes.splice(i, 1); continue; }
      ctx.strokeStyle = 'rgba(160,186,220,' + s.a.toFixed(3) + ')';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(s.x, s.y, s.r, s.r * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function frame(now) {
    if (!Rain.running) return;
    const dt = Math.min(0.05, (now - Rain._last) / 1000 || 0.016);
    Rain._last = now;
    step(dt);
    Rain._raf = global.requestAnimationFrame(frame);
  }

  Rain.mount = function (canvas) {
    Rain.canvas = canvas;
    if (!canvas || !canvas.getContext) return;
    Rain.ctx = canvas.getContext('2d');
    resize();

    global.addEventListener('resize', U.debounce(resize, 150));
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) Rain.stop();
      else if (Rain.enabled) Rain.start();
    });

    if (U.motionQuery && U.motionQuery.addEventListener) {
      U.motionQuery.addEventListener('change', () => {
        if (U.prefersReducedMotion()) Rain.stop();
        else if (Rain.enabled) Rain.start();
      });
    }
  };

  Rain.start = function () {
    if (Rain.running || Rain.dismissed || !Rain.canvas || !Rain.ctx) return;
    if (U.prefersReducedMotion()) return;
    Rain.running = true;
    Rain._last = performance.now();
    Rain._raf = global.requestAnimationFrame(frame);
  };

  Rain.stop = function () {
    Rain.running = false;
    if (Rain._raf) global.cancelAnimationFrame(Rain._raf);
    Rain._raf = 0;
    if (Rain.ctx) Rain.ctx.clearRect(0, 0, Rain._w, Rain._h);
  };

  /** The title screen is over. The rain was a backdrop for the loading
      screen only; it leaves for good and no setting brings it back, so
      nothing is left repainting a canvas nobody can see. */
  Rain.dismiss = function () {
    Rain.dismissed = true;
    Rain.stop();
  };

  Rain.setEnabled = function (on) {
    Rain.enabled = !!on;
    if (on) { resize(); Rain.start(); }
    else Rain.stop();
  };

  /** 0..1 — ties heavier cases to heavier weather. */
  Rain.setIntensity = function (v) {
    Rain.intensity = U.clamp(Number(v) || 0, 0, 1);
    seed();
  };

  Object.defineProperty(Rain, 'rand', { value: (lo, hi) => lo + Math.random() * (hi - lo) });

  global.Rain = Rain;

})(window);

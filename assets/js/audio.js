/* ═══════════════════════════════════════════════════════════
   NOCTURNE — audio.js
   Every sound is synthesised at runtime through Web Audio.
   No audio files are downloaded or bundled.
   ═══════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const SFX = {
    ctx: null,
    ready: false,
    unlocked: false,
    volumes: { music: 45, sfx: 70, enabled: true },
    _ambience: null,
    _lastTick: 0
  };

  const AC = global.AudioContext || global.webkitAudioContext;

  /* ── Graph ───────────────────────────────────────────── */

  function build() {
    if (SFX.ready || !AC) return SFX.ready;

    let ctx;
    try { ctx = new AC(); } catch (e) { return false; }

    const master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    const music = ctx.createGain();
    music.gain.value = SFX.volumes.music / 100 * 0.5;
    music.connect(master);

    const sfx = ctx.createGain();
    sfx.gain.value = SFX.volumes.sfx / 100 * 0.7;
    sfx.connect(master);

    SFX.ctx = ctx;
    SFX.master = master;
    SFX.musicBus = music;
    SFX.sfxBus = sfx;
    SFX.ready = true;
    return true;
  }

  /** Call from a real user gesture; browsers refuse to start audio otherwise. */
  SFX.unlock = function () {
    if (!build()) return Promise.resolve(false);
    if (SFX.ctx.state === 'suspended') SFX.ctx.resume().catch(() => {});
    SFX.unlocked = true;
    if (SFX._ambienceRequested) SFX.startAmbience(SFX._ambienceRequested);
    return Promise.resolve(true);
  };

  SFX.setMusic = function (v) {
    SFX.volumes.music = U.clamp(Number(v) || 0, 0, 100);
    if (SFX.ready) SFX.musicBus.gain.value = SFX.volumes.music / 100 * 0.5;
  };

  SFX.setSfx = function (v) {
    SFX.volumes.sfx = U.clamp(Number(v) || 0, 0, 100);
    if (SFX.ready) SFX.sfxBus.gain.value = SFX.volumes.sfx / 100 * 0.7;
  };

  SFX.setEnabled = function (on) {
    SFX.volumes.enabled = !!on;
    if (!SFX.ready) return;
    const t = SFX.ctx.currentTime;
    SFX.master.gain.cancelScheduledValues(t);
    SFX.master.gain.setTargetAtTime(on ? 0.9 : 0, t, 0.12);
  };

  /* ── Voices ──────────────────────────────────────────── */

  function noiseBuffer(seconds) {
    const ctx = SFX.ctx;
    const len = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** A filtered noise burst: the basis of every percussive sound here. */
  function noise(opts) {
    if (!SFX.ready || !SFX.volumes.enabled || SFX.volumes.sfx <= 0) return;
    const ctx = SFX.ctx;
    const t0 = ctx.currentTime + (opts.delay || 0);
    const dur = opts.dur || 0.12;

    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(dur + 0.05);
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = opts.filter || 'bandpass';
    filter.frequency.value = opts.freq || 1400;
    filter.Q.value = opts.q == null ? 1 : opts.q;
    if (opts.sweepTo) {
      filter.frequency.setValueAtTime(opts.freq || 1400, t0);
      filter.frequency.exponentialRampToValueAtTime(opts.sweepTo, t0 + dur);
    }

    const gain = ctx.createGain();
    const peak = opts.gain == null ? 0.3 : opts.gain;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + (opts.attack || 0.006));
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    src.connect(filter).connect(gain).connect(opts.bus || SFX.sfxBus);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }

  /** A shaped oscillator tone. */
  function tone(opts) {
    if (!SFX.ready || !SFX.volumes.enabled || SFX.volumes.sfx <= 0) return;
    const ctx = SFX.ctx;
    const t0 = ctx.currentTime + (opts.delay || 0);
    const dur = opts.dur || 0.2;

    const osc = ctx.createOscillator();
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(opts.freq || 440, t0);
    if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);

    const gain = ctx.createGain();
    const peak = opts.gain == null ? 0.16 : opts.gain;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + (opts.attack || 0.01));
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(gain).connect(opts.bus || SFX.sfxBus);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  /* ── Ambience ────────────────────────────────────────── */

  /** rain: band-limited noise with a slow swell. drone: two detuned low tones. */
  SFX.startAmbience = function (intensity) {
    if (!SFX.ready) { SFX._ambienceRequested = intensity; return; }
    if (SFX._ambience) return;
    if (SFX.volumes.music <= 0) return;

    const ctx = SFX.ctx;
    const level = U.clamp(intensity == null ? 0.6 : intensity, 0, 1);

    const rain = ctx.createBufferSource();
    rain.buffer = noiseBuffer(4);
    rain.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1600 + level * 1800;
    rainFilter.Q.value = 0.35;

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.055 * level;

    const swell = ctx.createOscillator();
    swell.frequency.value = 0.07;
    const swellDepth = ctx.createGain();
    swellDepth.gain.value = 0.022 * level;
    swell.connect(swellDepth).connect(rainGain.gain);

    rain.connect(rainFilter).connect(rainGain).connect(SFX.musicBus);
    rain.start();
    swell.start();

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.028 * level;
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 320;
    droneFilter.connect(droneGain).connect(SFX.musicBus);

    const voices = [55, 82.5, 110.3].map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 2 ? 'triangle' : 'sine';
      osc.frequency.value = f;
      osc.detune.value = (i - 1) * 7;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.5 : i === 1 ? 0.28 : 0.14;
      osc.connect(g).connect(droneFilter);
      osc.start();
      return osc;
    });

    SFX._ambience = { rain, swell, voices };
  };

  SFX.stopAmbience = function () {
    const a = SFX._ambience;
    if (!a) return;
    SFX._ambience = null;
    SFX._ambienceRequested = null;
    const stopAt = SFX.ctx.currentTime + 0.4;
    try {
      a.rain.stop(stopAt);
      a.swell.stop(stopAt);
      a.voices.forEach(v => v.stop(stopAt));
    } catch (e) { /* already stopped */ }
  };

  SFX.setAmbience = function (intensity) {
    SFX._ambienceRequested = intensity;
    if (!SFX._ambience) { SFX.startAmbience(intensity); return; }
    if (!SFX.ready) return;
    const t = SFX.ctx.currentTime;
    SFX.musicBus.gain.setTargetAtTime(SFX.volumes.music / 100 * 0.5 * U.clamp(intensity, 0, 1), t, 0.6);
  };

  /* ── Cues ────────────────────────────────────────────── */

  const CUES = {
    click() { noise({ freq: 2600, q: 2.2, dur: 0.045, gain: 0.16 }); },

    page() { noise({ freq: 900, sweepTo: 2600, q: 0.8, dur: 0.19, gain: 0.12, attack: 0.02 }); },

    open() {
      tone({ freq: 180, to: 320, type: 'sine', dur: 0.24, gain: 0.1 });
      noise({ freq: 700, sweepTo: 1800, dur: 0.2, gain: 0.08 });
    },

    clue() {
      tone({ freq: 587.33, type: 'triangle', dur: 0.16, gain: 0.13 });
      tone({ freq: 880, type: 'triangle', dur: 0.26, gain: 0.1, delay: 0.09 });
    },

    reveal() {
      tone({ freq: 440, type: 'sine', dur: 0.2, gain: 0.12 });
      tone({ freq: 554.37, type: 'sine', dur: 0.2, gain: 0.11, delay: 0.1 });
      tone({ freq: 659.25, type: 'sine', dur: 0.42, gain: 0.12, delay: 0.2 });
    },

    dead() {
      tone({ freq: 196, to: 138, type: 'sawtooth', dur: 0.3, gain: 0.09 });
      noise({ freq: 320, q: 0.6, dur: 0.26, gain: 0.14 });
    },

    bad() {
      tone({ freq: 233.08, type: 'square', dur: 0.16, gain: 0.07 });
      tone({ freq: 220, type: 'square', dur: 0.4, gain: 0.07, delay: 0.13 });
    },

    stamp() {
      noise({ freq: 180, filter: 'lowpass', q: 0.7, dur: 0.3, gain: 0.34, attack: 0.004 });
      tone({ freq: 90, to: 46, type: 'sine', dur: 0.32, gain: 0.2 });
    },

    tick() {
      const now = Date.now();
      if (now - SFX._lastTick < 900) return;
      SFX._lastTick = now;
      noise({ freq: 3400, q: 3, dur: 0.03, gain: 0.07 });
    },

    win() {
      [392, 523.25, 659.25, 783.99].forEach((f, i) => {
        tone({ freq: f, type: 'triangle', dur: 0.7, gain: 0.11, delay: i * 0.11 });
      });
    },

    lose() {
      [329.63, 261.63, 196, 155.56].forEach((f, i) => {
        tone({ freq: f, type: 'sine', dur: 0.85, gain: 0.12, delay: i * 0.15 });
      });
    },

    hint() {
      tone({ freq: 1046.5, type: 'sine', dur: 0.2, gain: 0.08 });
      tone({ freq: 1318.5, type: 'sine', dur: 0.32, gain: 0.07, delay: 0.1 });
    }
  };

  SFX.play = function (name) {
    if (!SFX.ready) build();
    if (!SFX.ready || !SFX.unlocked) return;
    const cue = CUES[name];
    if (cue) { try { cue(); } catch (e) { console.warn('[nocturne] cue "' + name + '" failed', e); } }
  };

  global.SFX = SFX;

})(window);

# NOCTURNE

A browser mystery game. Twenty cases, four tiers, one rain-soaked town, and a
desk that never stops filling with paper.

You are handed a file. You walk the locations, examine what is there, decide
what it means, and eventually accuse someone. The game scores *how* you closed
the case, not merely whether you were right — a correct accusation built on
guesswork is worth very little.

## Running it

There is nothing to build and nothing to install.

**With the server** (recommended — enables the Hall of Records ledger):

```
python server/app.py
```

Then open <http://localhost:8000/>.

```
python server/app.py --port 8080     # different port
python server/app.py --host 0.0.0.0   # reachable from other machines
```

**Without the server**: open `index.html` directly in a browser. Everything
works. Saves live in `localStorage`, and the Hall of Records falls back to a
local archive with a note saying the ledger was unreachable.

Requires a modern browser. There is no build step, bundler, framework, or
network dependency — the only external request is a web font, and the game
looks correct without it.

## Playing

| | |
|---|---|
| Open a location | Click a card on the hub |
| Examine something | Click a hotspot in a location |
| Present evidence | Open the journal, select a clue, then click a suspect |
| Consult the file | <kbd>H</kbd> — a hint, at a cost |
| Journal | <kbd>J</kbd> |
| Accuse | <kbd>A</kbd> |
| Pause / close | <kbd>Esc</kbd> |
| Case files · resume · dossier · records | <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> from the menu |
| Accusation | <kbd>Enter</kbd> to continue, <kbd>Backspace</kbd> to step back |

Saves are written automatically as you work. Leaving for the menu keeps your
investigation; **Abandon** throws it away on purpose. A timed case that runs out
of hours closes against you.

### How a case is scored

Each case has a **merit** value. A clean solve earns all of it:

| | Untimed | Timed |
|---|---|---|
| Right suspect | 30% | 30% |
| Right motive | 11% | 10% |
| Right method | 11% | 10% |
| The key piece of evidence | 28% | 26% |
| Thoroughness — every relevant lead followed | 20% | 14% |
| Time remaining | — | 10% |

Dead ends, hints, and confrontations that go nowhere are each docked a slice of
the case's merit. Three stars need 80% of it, two need 55%.

Your **career** keeps the best result for every case, so replaying a file can
only help you. Ranks run from Probationary Cadet to Commissioner.

## Layout

```
index.html               the whole app shell — every screen, one page
assets/css/
  base.css               tokens, reset, typography, accessibility
  components.css         buttons, panels, modals, toasts, meters
  screens.css            per-screen layout
assets/js/
  util.js                DOM, formatting, storage, events      (global: U)
  audio.js               Web Audio; rain, drone, UI cues       (global: SFX)
  rain.js                canvas rain                           (global: Rain)
  data.js                tiers, ranks, achievements, ALL_CASES
  cases-a..e.js          the twenty case files
  engine.js              state, scoring, progression, saves   (global: Engine)
  ui.js                  rendering                             (global: UI)
  main.js                boot, routing, input, clock          (global: App)
server/app.py            static host + Ledger API
tools/                   validators and tests
```

The scripts are plain classic scripts sharing globals and must load in the
order above — `index.html` already does. There is no module graph to keep
consistent.

## The Ledger API

Optional. The game degrades cleanly when it is absent.

| | |
|---|---|
| `GET /api/standings` | every filed record, Tier IV clearance first |
| `POST /api/standings` | file a record; returns the whole ledger |
| `GET /api/health` | liveness |
| `GET /api/save/<callsign>` | fetch a stored career |
| `PUT /api/save/<callsign>` | store a career |
| `DELETE /api/save/<callsign>` | forget a career |

```bash
curl -X POST http://localhost:8000/api/standings \
     -H 'Content-Type: application/json' \
     -d '{"callsign":"HOLMES","tier4":3,"cases":20,"stars":60,"merit":18800}'
```

A record is only ever improved, never replaced by a worse one. Data is written
to `server/data/` as JSON, atomically, and the folder is created on first run.

## Tests

```bash
node tools/validate-cases.js          # case-data integrity, no dependencies
node tools/validate-cases.js --quiet   # just the error count
node tools/test-engine.js             # scoring, progression, saves, all 20 cases
```

`tools/test-ui.js` drives the real page in jsdom — boot, investigation,
journal, confrontation, accusation, verdict, career, board, settings, resume,
wipe — twice, once with Web Audio and `fetch` and once with both missing:

```bash
npm install jsdom
node tools/test-ui.js
```

Without jsdom it exits cleanly and says so. It is the only dependency in the
project and nothing in the game needs it.

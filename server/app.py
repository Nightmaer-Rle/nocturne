#!/usr/bin/env python3
"""
NOCTURNE — static server and Ledger API.

Serves the game straight off disk and adds the two network services the
front end can use when it is present:

  GET   /api/standings     every filed record, best first
  POST  /api/standings     file (or update) one record, return the ledger
  GET   /api/save/<code>   fetch a stored career for a callsign
  PUT   /api/save/<code>   store a career for a callsign
  DELETE/api/save/<code>   forget a stored career

Nothing here is required to play. Open index.html directly and every
feature still works from localStorage; the API only mirrors records so
they can be compared on one machine's ledger. If the server is missing,
the front end says so and falls back to the local archive.

Usage:
    python server/app.py                 # http://localhost:8000
    python server/app.py --port 8080
    python server/app.py --host 0.0.0.0  # reachable from the network
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import threading
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
STANDINGS_FILE = os.path.join(DATA_DIR, "standings.json")
SAVE_DIR = os.path.join(DATA_DIR, "saves")

MAX_BODY = 256 * 1024  # a save blob is small; anything larger is a mistake
MAX_ROWS = 500
MAX_SAVES = 500

MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".txt": "text/plain; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".map": "application/json; charset=utf-8",
}

# A callsign may only become a file name, so keep it boring.
SAFE_CODE = re.compile(r"[^A-Za-z0-9_-]+")

_write_lock = threading.Lock()


# ── storage ────────────────────────────────────────────────────────────


def _read_json(path: str, fallback):
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (FileNotFoundError, json.JSONDecodeError, OSError):
        return fallback


def _write_json(path: str, payload) -> bool:
    """Write atomically so a crash mid-save cannot corrupt the file."""
    tmp = path + ".tmp"
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(payload, fh, indent=2, ensure_ascii=False)
            fh.write("\n")
        os.replace(tmp, path)
        return True
    except OSError as exc:
        print(f"[nocturne] could not write {path}: {exc}", file=sys.stderr)
        try:
            os.remove(tmp)
        except OSError:
            pass
        return False


def load_standings() -> list:
    rows = _read_json(STANDINGS_FILE, [])
    if not isinstance(rows, list):
        return []
    return [r for r in rows if isinstance(r, dict)]


def file_row(row: dict) -> dict:
    """Normalise a submitted record and keep only the best per callsign."""
    def as_int(value, low, high):
        try:
            n = int(value)
        except (TypeError, ValueError):
            return 0
        return max(0, min(high, n))

    callsign = str(row.get("callsign") or "").strip()[:24]
    if not callsign:
        return {}

    return {
        "callsign": callsign,
        "tier4": as_int(row.get("tier4"), 0, 3),
        "cases": as_int(row.get("cases"), 0, 20),
        "stars": as_int(row.get("stars"), 0, 60),
        "merit": as_int(row.get("merit"), 0, 10_000_000),
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }


def sort_standings(rows: list) -> list:
    """Tier IV clearance first, then stars, then merit, then name."""
    return sorted(
        rows,
        key=lambda r: (
            -int(r.get("tier4") or 0),
            -int(r.get("stars") or 0),
            -int(r.get("merit") or 0),
            str(r.get("callsign") or "").upper(),
        ),
    )


def file_standing(row: dict) -> list:
    """Insert or improve a record, then return the sorted ledger."""
    clean = file_row(row)
    if not clean:
        return sort_standings(load_standings())

    rows = load_standings()
    for index, existing in enumerate(rows):
        if str(existing.get("callsign", "")).upper() == clean["callsign"].upper():
            # A worse result never overwrites a better one.
            if (clean["tier4"], clean["stars"], clean["merit"]) >= (
                int(existing.get("tier4") or 0),
                int(existing.get("stars") or 0),
                int(existing.get("merit") or 0),
            ):
                rows[index] = clean
            break
    else:
        rows.append(clean)

    rows = sort_standings(rows)[:MAX_ROWS]
    with _write_lock:
        _write_json(STANDINGS_FILE, rows)
    return rows


def save_path(callsign: str) -> str | None:
    code = SAFE_CODE.sub("", str(callsign or ""))[:24]
    if not code:
        return None
    return os.path.join(SAVE_DIR, code + ".json")


# ── request handling ───────────────────────────────────────────────────


class Handler(BaseHTTPRequestHandler):
    server_version = "Nocturne/1.0"
    protocol_version = "HTTP/1.1"

    # ── helpers ──

    def _send(self, status, body: bytes, content_type: str, extra=None):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Content-Type-Options", "nosniff")
        for key, value in (extra or {}).items():
            self.send_header(key, value)
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def _json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self._send(status, body, "application/json; charset=utf-8",
                   {"Cache-Control": "no-store"})

    def _fail(self, status, message):
        self._json(status, {"ok": False, "error": message})

    def _body(self):
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            return None, "Content-Length is not a number"
        if length <= 0:
            return None, "empty body"
        if length > MAX_BODY:
            return None, "body too large"
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode("utf-8")), None
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            return None, f"invalid JSON: {exc}"

    def log_message(self, fmt, *args):
        sys.stderr.write("[nocturne] %s %s\n" % (self.address_string(), fmt % args))

    # ── static files ──

    def _resolve(self, path: str):
        """Map a URL path to a file inside ROOT, or None if it escapes."""
        rel = unquote(path).lstrip("/")
        if not rel:
            rel = "index.html"
        target = os.path.normpath(os.path.join(ROOT, rel))
        if target != ROOT and not target.startswith(ROOT + os.sep):
            return None
        if os.path.isdir(target):
            target = os.path.join(target, "index.html")
        return target if os.path.isfile(target) else None

    def _serve_static(self, path: str):
        target = self._resolve(path)
        if target is None:
            # A missing file that looks like an app route still gets the shell,
            # so deep links keep working.
            if "." not in os.path.basename(path):
                target = os.path.join(ROOT, "index.html")
            if target is None or not os.path.isfile(target):
                self._send(HTTPStatus.NOT_FOUND, b"404 Not Found",
                           "text/plain; charset=utf-8")
                return
        try:
            with open(target, "rb") as fh:
                body = fh.read()
        except OSError as exc:
            self._send(HTTPStatus.INTERNAL_SERVER_ERROR,
                       f"500 {exc}".encode("utf-8"), "text/plain; charset=utf-8")
            return

        ext = os.path.splitext(target)[1].lower()
        self._send(HTTPStatus.OK, body, MIME.get(ext, "application/octet-stream"),
                   {"Cache-Control": "no-cache"})

    # ── verbs ──

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        route = urlparse(self.path).path

        if route == "/api/standings":
            return self._json(HTTPStatus.OK, {"ok": True, "rows": sort_standings(load_standings())})

        if route == "/api/health":
            return self._json(HTTPStatus.OK, {"ok": True, "service": "nocturne-ledger"})

        if route.startswith("/api/save/"):
            path = save_path(route[len("/api/save/"):])
            if path is None:
                return self._fail(HTTPStatus.BAD_REQUEST, "a callsign is required")
            if not os.path.isfile(path):
                return self._json(HTTPStatus.OK, {"ok": True, "found": False, "save": None})
            return self._json(HTTPStatus.OK, {"ok": True, "found": True, "save": _read_json(path, None)})

        if route.startswith("/api/"):
            return self._fail(HTTPStatus.NOT_FOUND, "no such endpoint")

        return self._serve_static(route)

    def do_POST(self):
        route = urlparse(self.path).path

        if route == "/api/standings":
            payload, error = self._body()
            if error:
                return self._fail(HTTPStatus.BAD_REQUEST, error)
            if not isinstance(payload, dict):
                return self._fail(HTTPStatus.BAD_REQUEST, "expected a JSON object")
            if not str(payload.get("callsign") or "").strip():
                return self._fail(HTTPStatus.BAD_REQUEST, "callsign is required")
            rows = file_standing(payload)
            return self._json(HTTPStatus.OK, {"ok": True, "rows": rows, "count": len(rows)})

        if route.startswith("/api/save/"):
            return self._put_save(route)

        if route.startswith("/api/"):
            return self._fail(HTTPStatus.NOT_FOUND, "no such endpoint")

        return self._fail(HTTPStatus.METHOD_NOT_ALLOWED, "use GET for that path")

    def do_PUT(self):
        route = urlparse(self.path).path
        if route.startswith("/api/save/"):
            return self._put_save(route)
        if route.startswith("/api/"):
            return self._fail(HTTPStatus.NOT_FOUND, "no such endpoint")
        return self._fail(HTTPStatus.METHOD_NOT_ALLOWED, "use GET for that path")

    def do_DELETE(self):
        route = urlparse(self.path).path
        if route.startswith("/api/save/"):
            path = save_path(route[len("/api/save/"):])
            if path is None:
                return self._fail(HTTPStatus.BAD_REQUEST, "a callsign is required")
            try:
                os.remove(path)
            except FileNotFoundError:
                pass
            except OSError as exc:
                return self._fail(HTTPStatus.INTERNAL_SERVER_ERROR, str(exc))
            return self._json(HTTPStatus.OK, {"ok": True, "deleted": True})
        if route.startswith("/api/"):
            return self._fail(HTTPStatus.NOT_FOUND, "no such endpoint")
        return self._fail(HTTPStatus.METHOD_NOT_ALLOWED, "use GET for that path")

    def _put_save(self, route: str):
        path = save_path(route[len("/api/save/"):])
        if path is None:
            return self._fail(HTTPStatus.BAD_REQUEST, "a callsign is required")
        payload, error = self._body()
        if error:
            return self._fail(HTTPStatus.BAD_REQUEST, error)
        if not isinstance(payload, dict):
            return self._fail(HTTPStatus.BAD_REQUEST, "expected a JSON object")

        stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
        with _write_lock:
            try:
                os.makedirs(SAVE_DIR, exist_ok=True)
                existing = len([n for n in os.listdir(SAVE_DIR) if n.endswith(".json")])
            except OSError:
                existing = 0
            if existing >= MAX_SAVES and not os.path.isfile(path):
                return self._fail(HTTPStatus.INSUFFICIENT_STORAGE, "the filing cabinet is full")
            stored = {"callsign": os.path.basename(path)[:-5], "updated": stamp, "save": payload}
            if not _write_json(path, stored):
                return self._fail(HTTPStatus.INTERNAL_SERVER_ERROR, "could not store the save")
        return self._json(HTTPStatus.OK, {"ok": True, "stored": True, "updated": stamp})


# ── entry point ────────────────────────────────────────────────────────


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="Serve NOCTURNE and the Ledger API.")
    parser.add_argument("--host", default="127.0.0.1",
                        help="interface to bind (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=8000,
                        help="port to bind (default: 8000)")
    args = parser.parse_args(argv)

    if not os.path.isfile(os.path.join(ROOT, "index.html")):
        print(f"[nocturne] no index.html in {ROOT}", file=sys.stderr)
        return 1

    for folder in (DATA_DIR, SAVE_DIR):
        os.makedirs(folder, exist_ok=True)
    if not os.path.isfile(STANDINGS_FILE):
        _write_json(STANDINGS_FILE, [])

    try:
        httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    except OSError as exc:
        print(f"[nocturne] cannot bind {args.host}:{args.port} — {exc}", file=sys.stderr)
        return 1

    shown = "localhost" if args.host in ("127.0.0.1", "0.0.0.0") else args.host
    print(f"[nocturne] serving {ROOT}")
    print(f"[nocturne] http://{shown}:{args.port}/")
    print(f"[nocturne] ledger data in {DATA_DIR}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[nocturne] closing the office.")
    finally:
        httpd.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

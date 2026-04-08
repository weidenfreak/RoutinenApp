# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page PWA for a 4-year-old child's morning/evening routine. No build step — edit files directly and open `index.html` in a browser.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Entire app: inline CSS + HTML + JS |
| `sw.js` | Service Worker — offline cache (same-origin only) |
| `manifest.json` | PWA manifest — fullscreen, fox icon |

## Local Dev

Open `index.html` directly via `file://` **or** serve with any static server:
```bash
python3 -m http.server 8080
# → http://localhost:8080
```
Service Worker only registers over `https://` or `localhost`. For `file://` the SW is skipped but everything else works.

## Architecture (`index.html`)

**State** lives in `localStorage` under key `routinenapp`. Reset happens automatically when the date changes (daily routine reset).

**Screens**: `#screen-home` → `#screen-routine` → `#overlay-completion` (fixed overlay).  
Active screen gets class `.active`; all others `display:none`.

**Key functions:**
- `showRoutine(mode)` — switches to routine screen, calls `renderRoutine()`, starts badge interval, resumes timer if needed, triggers weather check
- `renderRoutine()` — rebuilds `#routine-body` innerHTML from state; called on every state change
- `finishTask(mode, id)` — marks task done, saves, triggers completion if all done
- `checkWeather()` — fetches Open-Meteo for Eutin (lat 54.133 / lon 10.624) once per day after 06:00; sets `state.sunscreenEnabled` based on UV ≥ 3 or sunshine > 4 h; silent fail when offline

**Timer**: JS-driven (`setInterval` 500 ms), state stored as `{ timerStart: timestamp, timerDuration: seconds }`. Survives page reload/lock via `resumeTimer()`.

**Parent settings**: Long-press (2.5 s) on the `#settings-btn` gear icon (bottom-right, opacity 0.3).

## Deployment (GitHub Pages)

```bash
git init && git add . && git commit -m "init"
# create repo on GitHub, then:
git remote add origin https://github.com/<user>/RoutinenApp.git
git push -u origin main
# enable Pages: Settings → Pages → Branch main / root /
```

Cache version in `sw.js` (`const CACHE = 'routinen-v1'`) must be bumped when assets change so users get the updated version.

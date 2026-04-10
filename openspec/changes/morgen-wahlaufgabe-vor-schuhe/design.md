## Context

Die App ist eine Single-Page PWA ohne Build-Schritt (`index.html` mit inline CSS + JS).
Aufgaben sind in `TASKS.morning.mandatory` als Array definiert; das letzte Element trägt `isLast:true` und wird immer ans Ende sortiert. `TASKS.morning.choice` existiert bereits (aktuell leer) — dort landen Bonus-Aufgaben nach dem Abendritual, nicht für unseren Fall.

Der globale Routine-Timer läuft als Countdown über `timerStart`/`timerDuration` im State. Pro Aufgabe gibt es keine eigene Timer-Instanz; das Abarbeiten einer Aufgabe geschieht über `finishTask(mode, id)`.

## Goals / Non-Goals

**Goals:**
- Eine neue Pflichtaufgabe `free-time` in `TASKS.morning.mandatory` direkt vor `go` (Jacke & Schuhe) einfügen
- Beim ersten Antippen erscheint ein Auswahl-Overlay mit 3 Optionen (Keks essen 🍪, Spielen 🎮, Buch lesen 📖)
- Gewählte Option wird im State (`state.morning.freeTimeChoice`) gespeichert und als Aufgabentext + Emoji angezeigt
- Der Kind-Timer der Aufgabe beträgt 5 Minuten; nach Tippen auf „Fertig" wird die Aufgabe abgeschlossen

**Non-Goals:**
- Kein eigener Per-Aufgaben-Countdown (der globale Routine-Timer bleibt unverändert)
- Die drei Optionen sind fest kodiert, nicht über Elterneinstellungen konfigurierbar
- Kein Zurücksetzen der Wahl ohne Tagesneustart

## Decisions

**Aufgabe als `isPicker`-Pflichtaufgabe** — nicht als Choice-Task.  
Der bestehende `choice`-Mechanismus dient Bonus-Aufgaben am Routinenende. Unsere Aufgabe ist mandatory und muss vor `go` erscheinen. Lösung: Neues Flag `isPicker:true` im Aufgabenobjekt.  
Alternative: Neuer Aufgabentyp `picker` — abgelehnt, zu viel Abstraktion für einen Einzelfall.

**Auswahl-Overlay: neues schlankes `#overlay-free-time-pick`** — nicht das bestehende `#overlay-choice-pick` wiederverwenden.  
Das bestehende Overlay ist ans Abend-Flow gekoppelt (`showChoicePick` → `confirmChoice` → `selectChoice`). Ein separates Overlay verhindert Seiteneffekte und ist einfacher zu lesen.

**State-Feld `state.morning.freeTimeChoice`** (String `'cookie'|'play'|'book'|null`).  
Wird bei `newRoutine()` initialisiert, täglich zurückgesetzt.

**Renderlogik in `renderRoutine()`**: Wenn `isPicker && !freeTimeChoice` → Task-Row zeigt Tap-Hinweis statt Fertig-Button. Tap öffnet Overlay. Sobald Wahl gespeichert, zeigt die Row die gewählte Option mit normalem Fertig-Button.

## Risks / Trade-offs

- [Aufgaben-Reihenfolge] `syncOrder` und `getDefaultOrder` müssen die neue Aufgabe korrekt vor `go` einfügen → sicherstellen, dass `free-time` in der mandatory-Liste **vor** dem `isLast`-Element steht (was durch Array-Reihenfolge bereits garantiert ist).
- [Tagesreset] `freeTimeChoice` muss in `newRoutine()` auf `null` initialisiert werden, sonst bleibt die gestrige Wahl stehen.

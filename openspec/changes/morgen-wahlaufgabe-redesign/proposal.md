## Why

Die erste Implementierung der Morgen-Wahlaufgabe wurde als einfaches `isPicker`-Flag gebaut. Das funktioniert nicht wie erwartet. Die Wahlaufgabe soll stattdessen identisch zum Abend-Wahlaufgaben-System funktionieren: Auswahl jederzeit vorwählbar + tauschbar, und wenn die Pflichtaufgaben (bis auf Jacke & Schuhe) erledigt sind, fragt der feiernde Fuchs nochmal nach.

## What Changes

- Bisherige Implementierung (`isPicker`, `FREE_TIME_OPTIONS`, `renderPickerRow`, `#overlay-free-time-pick`, `freeTimeChoice`) wird entfernt
- `TASKS.morning.choice` erhält die 3 Optionen: 🍪 Keks essen, 🎮 Spielen, 📖 Buch lesen (je 5 min)
- `renderRoutine` für Morgen bekommt denselben Aufbau wie Abend: Pflichtaufgaben → Wahlaufgabe (Picker oder gewählte Aufgabe) → Jacke & Schuhe (letzter Schritt)
- `finishTask` löst für Morgen ein Choice-Overlay mit Fuchs aus, wenn alle Pflichtaufgaben **außer** `go` erledigt sind
- `selectChoice` wird auf `currentMode` verallgemeinert (funktioniert für Morgen + Abend)
- Auswahl bleibt täglich erhalten (wie Abend: `choiceId` in `state.morning`, wird bei Tagesreset zurückgesetzt)

## Capabilities

### New Capabilities

- `morgen-wahlaufgabe-v2`: Morgen-Wahlaufgabe die wie Abend-Wahlaufgabe funktioniert — Picker inline, Fuchs-Overlay nach Pflichtprogramm, tauschbar

### Modified Capabilities

<!-- keine bestehenden Specs vorhanden -->

## Impact

- `index.html`: TASKS, renderRoutine (morning branch), finishTask, selectChoice, bestehender `#overlay-choice-pick` kann wiederverwendet werden
- Entfernt: ~80 Zeilen der ersten Implementierung

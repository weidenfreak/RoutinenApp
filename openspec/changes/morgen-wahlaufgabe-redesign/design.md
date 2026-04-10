## Context

Die App ist eine Single-Page PWA (kein Build-Schritt). Der Abend-Flow ist das Vorbild:
- `TASKS.evening.choice` = Array von Optionen
- `state.evening.choiceId` = gewählte Option (in `newRoutine()` mit `null` initialisiert, täglich zurückgesetzt)
- `renderRoutine` für Abend: Pflichtaufgaben → `renderChoiceRow` (wenn choiceId) oder `renderChoicePicker`
- `finishTask` → `allMandatoryDone` → `showBedtime()` (mit Fuchs + Auswahl)
- `selectChoice(id)` setzt `state.evening.choiceId` und `syncOrder`

Für Morgen soll exakt dieser Mechanismus gelten, mit zwei Unterschieden:
1. Der Trigger für das Fuchs-Overlay ist nicht `allMandatoryDone` (alle inkl. `go`), sondern "alle Pflichtaufgaben außer `go`"
2. Die Wahlaufgabe erscheint in der Liste ZWISCHEN den normalen Pflichtaufgaben und `go`

## Goals / Non-Goals

**Goals:**
- `TASKS.morning.choice` mit 3 Optionen befüllen (je 5 min)
- `renderRoutine` morning branch: wie Abend, aber `go` kommt nach der Wahlaufgabe
- `finishTask`: neuer Trigger `allPreGoMandatoryDone('morning')` → `showMorningChoicePick()`
- `selectChoice(id)` auf `currentMode` verallgemeinern
- Bestehenden `#overlay-choice-pick` für Morgen wiederverwenden (andere Texte)
- Erste Implementierung (`isPicker`, `renderPickerRow`, `#overlay-free-time-pick` etc.) vollständig entfernen

**Non-Goals:**
- Auswahl über Tagesgrenzen hinweg persistent halten
- Konfigurierbarkeit der 3 Optionen durch Eltern

## Decisions

**`allPreGoMandatoryDone(mode)`** — neue Hilfsfunktion statt Änderung von `allMandatoryDone`.  
`allMandatoryDone` bleibt unverändert (für Abend). Neue Funktion prüft nur die nicht-`isLast`-Pflichtaufgaben.

**`selectChoice` auf `currentMode` verallgemeinern** — statt `state.evening.choiceId` wird `state[currentMode].choiceId` gesetzt. `syncOrder` wird mit `currentMode` aufgerufen.

**`showMorningChoicePick()`** — nutzt dasselbe `#overlay-choice-pick` HTML, setzt aber einen anderen Titel-Text ("Freie Zeit! Was möchtest du machen?"). Schließen des Overlays ohne Wahl ist erlaubt (Auswahl kann inline erfolgen).

**`renderRoutine` morning branch** — vollständig neu wie Abend:
```
mandatory (non-last) → renderChoiceRow oder renderChoicePicker → go (renderRow)
```

## Risks / Trade-offs

- [selectChoice Verallgemeinerung] `selectChoice` ruft aktuell `syncOrder('evening')` auf. Nach Änderung auf `currentMode` muss sichergestellt sein, dass `currentMode` beim Aufruf korrekt gesetzt ist (ist es, da die Funktion nur aus renderRoutine-Buttons heraus aufgerufen wird).
- [Tageswechsel] `choiceId` in `state.morning` wird durch `newRoutine()` auf `null` zurückgesetzt → ok.
- [Migration] Bestehende gespeicherte States mit `freeTimeChoice` werden beim Laden ignoriert (kein Schaden).

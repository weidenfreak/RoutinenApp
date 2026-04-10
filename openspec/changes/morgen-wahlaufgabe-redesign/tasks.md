## 1. Alte Implementierung entfernen

- [ ] 1.1 `{ id:'free-time', ... isPicker:true }` aus `TASKS.morning.mandatory` entfernen
- [ ] 1.2 `FREE_TIME_OPTIONS`-Konstante entfernen
- [ ] 1.3 `freeTimeChoice:null` aus `newRoutine()` entfernen
- [ ] 1.4 Migration-Code in `showRoutine` entfernen (`free-time`-Check)
- [ ] 1.5 `isPicker`-Zweig in `renderRoutine` morning branch entfernen
- [ ] 1.6 Funktionen `renderPickerRow`, `showFreeTimePick`, `closeFreeTimePick`, `confirmFreeTimeChoice` entfernen
- [ ] 1.7 HTML `#overlay-free-time-pick` und zugehöriges CSS entfernen

## 2. Neue Optionen definieren

- [ ] 2.1 `TASKS.morning.choice` mit 3 Optionen befüllen: `[{id:'cookie', emoji:'🍪', label:'Keks essen', duration:5}, {id:'play', emoji:'🎮', label:'Spielen', duration:5}, {id:'book', emoji:'📖', label:'Buch lesen', duration:5}]`

## 3. renderRoutine morning branch

- [ ] 3.1 Morning branch wie Abend umbauen: Pflichtaufgaben (non-last aus order) → `renderChoiceRow` oder `renderChoicePicker` → `go` per `renderRow`

## 4. Trigger für Fuchs-Overlay

- [ ] 4.1 Hilfsfunktion `allPreGoMandatoryDone(mode)` schreiben: prüft ob alle Pflichtaufgaben mit `!isLast` erledigt sind
- [ ] 4.2 In `finishTask`: für morning `allPreGoMandatoryDone('morning')` prüfen → `showMorningChoicePick()` aufrufen (statt sofort `showCompletion`)
- [ ] 4.3 Bestehende morning-Completion-Logik anpassen: `allMandatoryDone('morning')` → `showCompletion()` bleibt, wird aber erst nach go+Wahlaufgabe ausgelöst

## 5. Overlay und selectChoice

- [ ] 5.1 `selectChoice(id)` verallgemeinern: `state.evening` → `state[currentMode]`, `syncOrder('evening')` → `syncOrder(currentMode)`
- [ ] 5.2 Funktion `showMorningChoicePick()` schreiben: befüllt `#overlay-choice-pick` mit morning-Optionen und passenden Texten, blendet es ein
- [ ] 5.3 `showChoicePick()` (Abend) prüfen: stellt sicher dass es weiterhin nur `TASKS.evening.choice` verwendet (nicht durch Verallgemeinerung kaputt gegangen)

## 6. Verifikation

- [ ] 6.1 Morgenroutine: Picker erscheint vor "Jacke + Schuhe"
- [ ] 6.2 Option wählen → gewählte Aufgabe mit Tausch-Buttons
- [ ] 6.3 Tausch-Button → andere Option wird angezeigt
- [ ] 6.4 Alle Pflichtaufgaben (außer go) abhaken → Fuchs-Overlay erscheint
- [ ] 6.5 Option im Overlay wählen → Overlay schließt, Aufgabe ist gewählt
- [ ] 6.6 `go` abhaken → Abschluss-Overlay erscheint
- [ ] 6.7 Abendroutine funktioniert weiterhin korrekt (Regression)

## 1. Aufgabendefinition

- [x] 1.1 Neues Aufgabenobjekt `{ id:'free-time', emoji:'⭐', label:'Freie Zeit', duration:5, isPicker:true }` in `TASKS.morning.mandatory` direkt vor dem `go`-Eintrag einfügen
- [x] 1.2 Die drei Optionen als Konstante definieren: `FREE_TIME_OPTIONS = [{id:'cookie', emoji:'🍪', label:'Keks essen'}, {id:'play', emoji:'🎮', label:'Spielen'}, {id:'book', emoji:'📖', label:'Buch lesen'}]`

## 2. State-Erweiterung

- [x] 2.1 In `newRoutine()` das Feld `freeTimeChoice: null` hinzufügen, damit es beim Tagesreset automatisch zurückgesetzt wird

## 3. Auswahl-Overlay (HTML)

- [x] 3.1 Neues Overlay `#overlay-free-time-pick` nach dem bestehenden `#overlay-choice-pick` im HTML einfügen mit: Fuchs-SVG, Titel, drei Auswahl-Buttons (Emoji + Name)
- [x] 3.2 CSS für das neue Overlay ergänzen (kann die bestehenden `.choice-pick-*`-Klassen wiederverwenden)

## 4. Render-Logik

- [x] 4.1 In `renderRoutine()` erkennen, wenn `task.isPicker` gesetzt ist, und abhängig von `state.morning.freeTimeChoice`:
  - Kein Fertig-Button + Tap-Hinweis anzeigen, wenn noch keine Wahl getroffen
  - Emoji und Label der gewählten Option anzeigen + normaler Fertig-Button, wenn Wahl vorhanden

## 5. Overlay-Logik (JS)

- [x] 5.1 Funktion `showFreeTimePick()` schreiben: Overlay einblenden, Buttons mit `FREE_TIME_OPTIONS` rendern
- [x] 5.2 Funktion `confirmFreeTimeChoice(id)` schreiben: `state.morning.freeTimeChoice = id` setzen, speichern, Overlay schließen, `renderRoutine()` aufrufen
- [x] 5.3 Tap-Handler für die `free-time`-Aufgabe in `renderRoutine()` verdrahten: Tap → `showFreeTimePick()` (nur wenn noch keine Wahl)

## 6. Verifikation

- [x] 6.1 Morgenroutine öffnen → Wahlaufgabe erscheint vor "Jacke + Schuhe"
- [x] 6.2 Wahlaufgabe antippen → Overlay mit 3 Optionen erscheint
- [x] 6.3 Option wählen → Aufgabe zeigt gewähltes Emoji + Label + Fertig-Button
- [x] 6.4 "Fertig" tippen → Aufgabe wird als erledigt markiert, Routine läuft weiter
- [x] 6.5 Seite neu laden → gewählte Option bleibt erhalten

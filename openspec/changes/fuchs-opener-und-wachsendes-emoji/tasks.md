## 1. HTML: Opener-Overlay und Emoji-Element

- [x] 1.1 Neues `#overlay-morning-opener` HTML-Element anlegen (analog `#overlay-choice-pick`): Fuchs-Container, Titel "Was machen wir heute?", 3 Optionsbuttons
- [x] 1.2 Element `#morning-activity-emoji` im Routine-Header einfügen (zwischen Fuchs-Buddy und Einstellungs-Button)

## 2. CSS: Emoji-Stufen und Overlay-Styling

- [x] 2.1 CSS für `#morning-activity-emoji`: `transition: font-size 0.4s ease`, Startgröße `1.4rem`, standardmäßig `opacity: 0`
- [x] 2.2 CSS-Klassen für die 4 Emoji-Stufen (`.emoji-stage-1` bis `.emoji-stage-4`) mit den font-sizes aus dem Design
- [x] 2.3 CSS für `#overlay-morning-opener` (analog `#overlay-choice-pick`, kann dieselben Klassen nutzen)

## 3. JS: Fuchs-Opener

- [x] 3.1 Funktion `showMorningOpener()` schreiben: befüllt `#overlay-morning-opener` mit Fuchs-SVG und den verfügbaren choice-Optionen, fügt einmalige Wink-Klasse hinzu, blendet Overlay ein
- [x] 3.2 In `showRoutine('morning')`: wenn `state.morning.choiceId === null` → `setTimeout(() => showMorningOpener(), 300)`
- [x] 3.3 Opener-Buttons rufen `confirmChoice(id)` auf (schließt Overlay und setzt Wahl)
- [x] 3.4 `confirmChoice` schließt auch `#overlay-morning-opener` (falls noch nicht durch `hidden`-Klasse gehandhabt)

## 4. JS: Wachsendes Emoji

- [x] 4.1 Funktion `updateMorningActivityEmoji()` schreiben: liest `state.morning.choiceId` und Anzahl erledigter non-last mandatory tasks, setzt Emoji-Text und passende Stufen-Klasse
- [x] 4.2 `updateMorningActivityEmoji()` in `finishTask` für mode `'morning'` aufrufen (nach `renderRoutine()`)
- [x] 4.3 `updateMorningActivityEmoji()` in `renderRoutine()` morning-Branch aufrufen (damit Emoji beim Re-Render korrekt ist)
- [x] 4.4 `updateMorningActivityEmoji()` in `confirmChoice` aufrufen (damit Emoji sofort nach Wahl erscheint)

## 5. CSS: Fuchs-Wink-Animation

- [x] 5.1 Keyframe-Animation `fox-wave` definieren (leichte Rotation des SVG, einmalig, nicht loopend)
- [x] 5.2 Klasse `.fox-waving` mit `animation: fox-wave 0.6s ease forwards` anlegen
- [x] 5.3 In `showMorningOpener()` Klasse `.fox-waving` zum Fuchs-Container hinzufügen

## 6. Verifikation

- [x] 6.1 Morgenroutine öffnen ohne Wahl → Opener-Overlay erscheint nach kurzer Pause
- [x] 6.2 Option wählen → Overlay schließt, Emoji erscheint klein
- [x] 6.3 Pflichtaufgaben abhaken → Emoji wächst stufenweise (weiche Transition sichtbar)
- [x] 6.4 Bei `choiceId` bereits gesetzt (Reload) → kein Opener, Emoji zeigt korrekte Stufe
- [x] 6.5 Abendroutine öffnen → kein Emoji sichtbar
- [x] 6.6 Bestehende Fuchs-Emoji-Reaktionen beim Abhaken funktionieren weiterhin

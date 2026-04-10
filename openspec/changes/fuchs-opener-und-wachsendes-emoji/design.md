## Context

Single-Page PWA, kein Build-Schritt. Der Fuchs (`BUDDY_SVG`) ist bereits als SVG inline vorhanden und wird in mehreren Overlays genutzt. Die Morgenroutine hat bereits:
- `showRoutine('morning')` als Einstiegspunkt
- `state.morning.choiceId` für die gewählte Aktivität
- `TASKS.morning.choice` mit 3 Optionen
- `confirmChoice(id)` / `selectChoice(id)` für die Auswahl
- Fuchs-Reaktionen beim Abhaken via `foxReact(remaining)`

## Goals / Non-Goals

**Goals:**
- Fuchs-Opener: neues `#overlay-morning-opener` Overlay, das in `showRoutine('morning')` gezeigt wird wenn `choiceId === null`
- Wachsendes Emoji: neues Element `#morning-activity-emoji` im Routine-Header, Größe = Funktion der erledigten Pflichtaufgaben
- Opener ist schnell und nicht ablenkend — kein Loop, kein Sound, keine wartende Animation danach
- Emoji-Wachstum per CSS-Transition (weich, nicht abrupt)

**Non-Goals:**
- Zeitbasiertes Schrumpfen des Emojis
- Änderungen an der Abendroutine
- Neue Fuchs-Animationen (vorhandene bleiben, keine neuen)
- Text oder Zahlen im Emoji-Bereich

## Decisions

**Opener als eigenes Overlay** (`#overlay-morning-opener`), nicht das bestehende `#overlay-choice-pick`.
Das bestehende Overlay ist für "nach Pflichtaufgaben" gedacht (anderer Text, anderer Kontext). Saubere Trennung.

**Opener-Trigger in `showRoutine('morning')`**: Wenn `state.morning.choiceId === null` → nach kurzem Delay (300ms, damit die Routine-UI gerendert ist) das Opener-Overlay zeigen.

**Wachsendes Emoji: 4 Stufen** basierend auf erledigten Pflichtaufgaben (exkl. `go`):
```
0   erledigt  → font-size: 1.4rem  (klein, fast nicht sichtbar)
1-2 erledigt  → font-size: 2.2rem
3-4 erledigt  → font-size: 3.2rem
5+  erledigt  → font-size: 4.5rem  (groß und präsent)
```
CSS `transition: font-size 0.4s ease` für weiches Wachsen.

**Emoji-Position**: Rechts neben dem Fuchs-Buddy im Header, oder als eigenständiges Element zwischen Fuchs und Einstellungs-Button. Genug Abstand damit es nicht mit der Uhrzeit kollidiert.

**Emoji-Update**: `renderRoutine()` ruft bereits `updateTimeDisplay()` auf — alternativ in `finishTask()` direkt ein `updateMorningActivityEmoji()` aufrufen nach dem Rendern.

**Opener schließt wenn Wahl getroffen**: `confirmChoice(id)` schließt das Overlay und schreibt die Wahl — dieser Flow bleibt unverändert. Das Opener-Overlay ruft denselben `confirmChoice` auf.

## Risks / Trade-offs

- [Screen-Binding] Der Opener darf nicht zu viel Aufmerksamkeit ziehen. Lösung: kurze Fuchs-Animation (einmal winken, nicht loopen), dann ruhig bleiben bis getippt wird.
- [Reload mid-routine] Wenn die Seite neu geladen wird während die Routine läuft und choiceId bereits gesetzt ist, erscheint der Opener nicht → korrekt.
- [Opener + wachsendes Emoji gleichzeitig] Beim ersten Laden ist choiceId null → kein Emoji sichtbar bis gewählt → dann erscheint es klein → wächst. Das ist der gewünschte Flow.

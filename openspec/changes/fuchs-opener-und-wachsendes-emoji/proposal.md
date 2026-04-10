## Why

Die App begleitet ein 4-jähriges Kind mit hohem Autonomiebedürfnis und PDA-nahem Profil durch die Morgenroutine. Der Fuchs ist für sie eine echte Beziehungsfigur ("sie wollte ihn mitnehmen"). Zwei Verbesserungen machen die Routine kindgerechter:

1. **Fuchs-Opener**: Die Wahlaufgabe wird gemeinsam mit dem Fuchs *am Anfang* gewählt — nicht erst als Belohnung am Ende. Das rahmt die Routine als "was machen wir heute zusammen" statt "was darf ich wenn ich fertig bin". Für ein Kind das Anforderungen ausweicht ist der Unterschied erheblich.

2. **Wachsendes Emoji**: Statt eines abstrakten Zeitbalkens (den eine 4-Jährige ohne Lesefähigkeit nicht versteht) wächst das Emoji der gewählten Aktivität mit jeder erledigten Pflichtaufgabe. Rein aufgabenbasiert — kein Schrumpfen, kein Druck, nur: "ich habe etwas getan und mein Keks wird größer."

## What Changes

- Wenn die Morgenroutine geöffnet wird und noch keine Wahl getroffen wurde: kurzes Fuchs-Overlay fragt "Was machen wir heute?" mit den drei Wahloptionen
- Das Overlay ist schnell (≤5 Sekunden Interaktion) und schließt nach der Wahl automatisch
- Im Routine-Header erscheint das Emoji der gewählten Aktivität, das mit jeder erledigten Pflichtaufgabe wächst (klein → mittel → groß)
- Bestehende Fuchs-Reaktionen beim Abhaken (Emoji-Bubbles) bleiben erhalten
- Bestehende Hüpf-Animation des Fuchses bleibt erhalten
- Bei bereits getroffener Wahl (z.B. nach Reload) wird der Opener übersprungen

## Capabilities

### New Capabilities

- `morgen-fuchs-opener`: Fuchs-Overlay zu Beginn der Morgenroutine für gemeinsame Wahlaufgaben-Auswahl
- `wachsendes-aktivitaets-emoji`: Emoji der gewählten Aktivität im Header wächst mit jeder erledigten Pflichtaufgabe

### Modified Capabilities

<!-- keine bestehenden Specs betroffen -->

## Impact

- `index.html`: `showRoutine('morning')` triggert Opener-Overlay wenn `choiceId === null`; neues HTML-Element im Routine-Header für das wachsende Emoji; CSS für Emoji-Größenstufen mit Transition
- Nur Morgenroutine betroffen — Abendroutine bleibt unverändert

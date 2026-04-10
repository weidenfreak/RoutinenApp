## Why

In der Morgenroutine gibt es nach dem Anziehen noch eine kurze Wartezeit, bevor das Kind Jacke und Schuhe anziehen muss. Diese 5 Minuten sollen sinnvoll genutzt werden, indem das Kind selbst zwischen drei entspannten Aktivitäten wählen darf — das stärkt die Eigenständigkeit und macht den Übergang zum Verlassen des Hauses angenehmer.

## What Changes

- Vor der Aufgabe "Jacke & Schuhe" in der Morgenroutine wird eine neue Wahlaufgabe eingefügt
- Die Wahlaufgabe zeigt drei Optionen zur Auswahl: 🍪 Keks essen, 🎮 Spielen, 📖 Buch lesen
- Die gewählte Option startet einen 5-Minuten-Timer
- Nach Ablauf des Timers gilt die Aufgabe als erledigt und die Routine geht weiter

## Capabilities

### New Capabilities

- `morgen-wahlaufgabe`: Wahlaufgabe mit 3 Optionen und 5-Minuten-Timer, fest in der Morgenroutine vor "Jacke & Schuhe" eingebaut

### Modified Capabilities

<!-- keine bestehenden Specs vorhanden -->

## Impact

- `index.html`: Aufgabenliste der Morgenroutine erweitern; neue Wahlaufgabe vor dem "Jacke & Schuhe"-Task einfügen; Timer-Logik für die Wahlaufgabe einbauen
- Keine neuen Abhängigkeiten, kein Build-Schritt nötig

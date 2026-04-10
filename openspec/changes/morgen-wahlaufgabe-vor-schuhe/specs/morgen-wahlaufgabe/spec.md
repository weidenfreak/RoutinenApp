## ADDED Requirements

### Requirement: Wahlaufgabe erscheint vor "Jacke & Schuhe"
In der Morgenroutine SHALL eine Pflichtaufgabe mit `id:'free-time'` und `duration:5` direkt vor der `go`-Aufgabe (Jacke + Schuhe + Los) angezeigt werden.

#### Scenario: Aufgabe ist in der richtigen Position
- **WHEN** die Morgenroutine gerendert wird
- **THEN** erscheint die Wahlaufgabe an vorletzter Stelle, unmittelbar vor "Jacke + Schuhe + Los"

---

### Requirement: Auswahl-Overlay bei erstem Antippen
Solange keine Aktivität gewählt wurde, SHALL das Antippen der Wahlaufgabe ein Overlay mit drei Optionen öffnen: 🍪 Keks essen, 🎮 Spielen, 📖 Buch lesen.

#### Scenario: Overlay öffnet sich beim ersten Tap
- **WHEN** das Kind auf die Wahlaufgabe tippt und noch keine Wahl getroffen wurde
- **THEN** erscheint das Auswahl-Overlay mit allen drei Optionen sichtbar

#### Scenario: Kein Fertig-Button vor der Wahl
- **WHEN** die Wahlaufgabe angezeigt wird und noch keine Aktivität gewählt wurde
- **THEN** zeigt die Aufgaben-Row keinen "Fertig"-Button, sondern einen Tap-Hinweis

---

### Requirement: Gewählte Aktivität wird gespeichert und angezeigt
Nach der Auswahl SHALL die Aufgaben-Row das Emoji und den Namen der gewählten Aktivität anzeigen. Die Wahl MUST in `state.morning.freeTimeChoice` gespeichert werden.

#### Scenario: Aufgabe zeigt gewählte Option
- **WHEN** das Kind "🎮 Spielen" wählt
- **THEN** zeigt die Aufgaben-Row das Emoji 🎮 und den Text "Spielen" sowie einen Fertig-Button

#### Scenario: Wahl überlebt einen Seiten-Reload
- **WHEN** die Wahl getroffen und die Seite neu geladen wird
- **THEN** zeigt die Wahlaufgabe weiterhin die zuvor gewählte Aktivität

---

### Requirement: Aufgabe nach Wahl normal abschließbar
Nach der Auswahl SHALL die Wahlaufgabe über den normalen "Fertig"-Button abgeschlossen werden können, genau wie alle anderen Pflichtaufgaben.

#### Scenario: Fertig-Button schließt die Aufgabe ab
- **WHEN** das Kind auf "Fertig" tippt nachdem eine Aktivität gewählt wurde
- **THEN** wird die Aufgabe als erledigt markiert und die Routine-Ansicht aktualisiert

---

### Requirement: Tagesreset setzt die Wahl zurück
Bei einem Tagesreset SHALL `state.morning.freeTimeChoice` auf `null` zurückgesetzt werden, sodass am nächsten Morgen wieder eine Wahl möglich ist.

#### Scenario: Neue Wahl am nächsten Tag
- **WHEN** die App am nächsten Tag geöffnet wird (Datum hat sich geändert)
- **THEN** zeigt die Wahlaufgabe kein gespeichertes Ergebnis und öffnet das Overlay beim nächsten Tap

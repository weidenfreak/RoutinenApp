## ADDED Requirements

### Requirement: Wahlaufgabe erscheint zwischen Pflichtaufgaben und Jacke+Schuhe
In der Morgenroutine SHALL die Wahlaufgabe (Picker oder gewählte Option) direkt vor "Jacke + Schuhe + Los!" erscheinen — analog zur Abend-Wahlaufgabe.

#### Scenario: Picker vor erster Wahl
- **WHEN** die Morgenroutine gerendert wird und noch keine Wahlaufgabe gewählt wurde
- **THEN** erscheint ein Auswahlbereich mit den 3 Optionen (🍪 🎮 📖), gefolgt von "Jacke + Schuhe + Los!"

#### Scenario: Gewählte Aufgabe mit Tausch-Option
- **WHEN** eine Wahlaufgabe gewählt wurde
- **THEN** zeigt die Liste die gewählte Aufgabe mit Emoji + Name + Tausch-Buttons für die anderen Optionen, gefolgt von "Jacke + Schuhe + Los!"

---

### Requirement: Fuchs-Overlay nach Pflichtprogramm
Wenn alle Pflichtaufgaben **außer** "Jacke + Schuhe" erledigt sind, SHALL das Fuchs-Overlay erscheinen und fragen, welche Aktivität gemacht werden soll.

#### Scenario: Overlay erscheint nach letzter Pflichtaufgabe
- **WHEN** das Kind die letzte Pflichtaufgabe vor "Jacke + Schuhe" (z.B. Sonnencreme oder Anziehen) abhakt
- **THEN** erscheint das Fuchs-Overlay mit den 3 Wahloptionen

#### Scenario: Overlay erscheint nicht mehr wenn schon gewählt
- **WHEN** eine Wahlaufgabe bereits gewählt wurde und dann eine weitere Pflichtaufgabe abgehakt wird
- **THEN** erscheint das Fuchs-Overlay erneut zum Bestätigen / Wechseln

---

### Requirement: Wahlaufgabe ist jederzeit vorwählbar und tauschbar
Die Wahlaufgabe KANN schon gewählt werden, bevor alle Pflichtaufgaben erledigt sind. Die Auswahl SHALL jederzeit per Tausch-Button gewechselt werden können.

#### Scenario: Vorwählen möglich
- **WHEN** noch nicht alle Pflichtaufgaben erledigt sind
- **THEN** kann das Kind bereits eine der 3 Optionen im Picker wählen

#### Scenario: Tauschen möglich
- **WHEN** eine Wahlaufgabe bereits gewählt wurde
- **THEN** sind Tausch-Buttons für die anderen Optionen sichtbar und funktionsfähig

---

### Requirement: Tagesreset setzt die Wahl zurück
Bei einem Tagesreset SHALL `state.morning.choiceId` auf `null` zurückgesetzt werden.

#### Scenario: Neue Wahl am nächsten Tag
- **WHEN** die App am nächsten Tag geöffnet wird
- **THEN** zeigt die Morgenroutine wieder den Picker statt der gestrigen Wahl

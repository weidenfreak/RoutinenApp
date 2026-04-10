## ADDED Requirements

### Requirement: Emoji der gewählten Aktivität wächst mit erledigten Pflichtaufgaben
Im Routine-Header SHALL ein Element `#morning-activity-emoji` das Emoji der gewählten Morgen-Wahlaufgabe anzeigen, das mit jeder erledigten Pflichtaufgabe (exkl. `go`) größer wird.

#### Scenario: Emoji erscheint nach Wahl klein
- **WHEN** eine Wahlaufgabe gewählt wurde und noch keine Pflichtaufgabe erledigt ist
- **THEN** zeigt `#morning-activity-emoji` das gewählte Emoji in `font-size: 1.4rem`

#### Scenario: Emoji wächst mit erledigten Aufgaben — Stufe 2
- **WHEN** 1–2 Pflichtaufgaben (exkl. `go`) erledigt wurden
- **THEN** zeigt `#morning-activity-emoji` das Emoji in `font-size: 2.2rem`

#### Scenario: Emoji wächst mit erledigten Aufgaben — Stufe 3
- **WHEN** 3–4 Pflichtaufgaben (exkl. `go`) erledigt wurden
- **THEN** zeigt `#morning-activity-emoji` das Emoji in `font-size: 3.2rem`

#### Scenario: Emoji ist voll gewachsen
- **WHEN** 5 oder mehr Pflichtaufgaben (exkl. `go`) erledigt wurden
- **THEN** zeigt `#morning-activity-emoji` das Emoji in `font-size: 4.5rem`

### Requirement: Emoji-Wachstum erfolgt per CSS-Transition
Die Größenänderung SHALL weich animiert sein, nicht abrupt.

#### Scenario: Weiche Größenänderung
- **WHEN** sich die Anzahl erledigter Pflichtaufgaben ändert
- **THEN** ändert sich die Schriftgröße des Emojis mit einer `transition: font-size 0.4s ease`

### Requirement: Emoji ist nicht sichtbar wenn keine Wahl getroffen wurde
Solange `state.morning.choiceId === null`, SHALL `#morning-activity-emoji` nicht sichtbar sein.

#### Scenario: Emoji ausgeblendet ohne Wahl
- **WHEN** die Morgenroutine angezeigt wird und noch keine Wahlaufgabe gewählt wurde
- **THEN** ist `#morning-activity-emoji` nicht sichtbar (opacity 0 oder display none)

#### Scenario: Emoji erscheint nach Wahl
- **WHEN** eine Wahlaufgabe gewählt wird
- **THEN** wird `#morning-activity-emoji` sichtbar und zeigt das Emoji in Stufe 1

### Requirement: Emoji zeigt nur in der Morgenroutine
Das wachsende Emoji-Element ist nur für die Morgenroutine vorgesehen und SHALL in der Abendroutine nicht erscheinen.

#### Scenario: Kein Emoji in der Abendroutine
- **WHEN** die Abendroutine aktiv ist
- **THEN** ist `#morning-activity-emoji` nicht sichtbar

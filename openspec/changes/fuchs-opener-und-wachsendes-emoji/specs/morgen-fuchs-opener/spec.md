## ADDED Requirements

### Requirement: Fuchs-Opener erscheint beim Start der Morgenroutine
Wenn die Morgenroutine geöffnet wird und noch keine Wahlaufgabe gewählt wurde, SHALL ein Overlay (`#overlay-morning-opener`) erscheinen, das gemeinsam mit dem Fuchs die Wahlaufgabe auswählen lässt.

#### Scenario: Opener bei erstem Öffnen ohne Wahl
- **WHEN** `showRoutine('morning')` aufgerufen wird und `state.morning.choiceId === null`
- **THEN** erscheint nach 300 ms das Overlay `#overlay-morning-opener` mit dem Fuchs und den 3 Wahloptionen

#### Scenario: Opener wird übersprungen wenn Wahl bereits getroffen
- **WHEN** `showRoutine('morning')` aufgerufen wird und `state.morning.choiceId !== null`
- **THEN** erscheint das Opener-Overlay nicht

#### Scenario: Opener wird übersprungen nach Reload mit gesetzter Wahl
- **WHEN** die Seite neu geladen wird während die Morgenroutine aktiv ist und `choiceId` bereits gesetzt ist
- **THEN** erscheint das Opener-Overlay nicht

### Requirement: Wahl im Opener schließt das Overlay
Nach der Wahl im Opener-Overlay SHALL das Overlay sofort schließen und die gewählte Aufgabe in der Routine gesetzt sein.

#### Scenario: Wahl treffen schließt Overlay
- **WHEN** eine der 3 Optionen im Opener-Overlay angetippt wird
- **THEN** schließt das Overlay, `state.morning.choiceId` ist gesetzt und die Routine zeigt die gewählte Aufgabe

### Requirement: Fuchs-Animation im Opener ist kurz und nicht ablenkend
Die Fuchs-Animation im Opener SHALL einmalig abspielen (nicht loopen) und danach ruhig bleiben bis der Nutzer tippt.

#### Scenario: Animation läuft einmal
- **WHEN** das Opener-Overlay erscheint
- **THEN** winkt der Fuchs einmal und bleibt dann statisch bis eine Option gewählt wird

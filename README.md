# FireForceDefense

---

Alle Inhalte vor dem 30. Mai 2021 sind aus dem vorherigen Sommersemester übernommen.  
Ab dem 30. Mai 2021 wurden neue Inhalte erstellt.

---

FireForceDefense ist ein webbasiertes Singleplayer-Tower-Defense-Spiel.
Es wurde im Rahmen der Studienarbeit für das Studienfach _Projektmanagement und Agile Entwicklungsmethoden_ von Thomas Ammann, Cameron Barbee, Tobias Schotter, Sebastian Schuscha, Philipp Stangl und Thomas Stangl initial angefertigt.

Die Projektarbeit im Fach _Web-Anwendungsentwicklung_ dient nun im aktuellen Semster dazu, FireForceDefense weiterzuentwickeln.

![Screenshot FireForceDefense](./sys-doc/screenshot.png)

## Workflow

**Hinweis:** Alle arbeiten mit dem "Haupt"-Repository, Forks sind nicht notwendig!

Im Folgenden werden nur die grundlegenden Schritte beschrieben, Informationen zu weiteren Vorgängen (Rebase, Amend Commits, etc.) sind beispielsweise hier zu finden: [https://git-scm.com/docs](https://git-scm.com/docs)

### Voraussetzungen:
- Installation von git
- Generierung eines SSH-Schlüssels
- Hinterlegen des öffentlichen SSH-Schlüssels in den GitLab-Einstellungen

### Einrichtung

1. Klonen des Repositorys:  
   `git clone git@git.oth-aw.de:wae-team-rot/fireforcedefense.git`
2. Wechseln ins Arbeitsverzeichnis:  
   `cd fireforcedefense`
3. Setzen der Benutzer-Einstellungen:  
   `git config user.name "Max Mustermann"`  
   `git config user.email "m.mustermann@oth-aw.de"`
   
Das Arbeitsverzeichnis kann nun in der gewünschten IDE geöffnet werden.
Empfohlen ist JetBrains PhpStorm.

Das Monorepo besteht aus zwei Teilprojekten: `backend` und `frontend`.

Die Abhängigkeiten können in beiden Teilprojekten wie folgt installiert werden:

```bash
cd sys-src/backend # Wechsel ins Backend-Teilprojekt-Verzeichnis
npm install # Installation der Abhängigkeiten

cd ../.. # Wechsel zurück ins Haupt-Arbeitsverzeichnis

cd sys-src/frontend # Wechsel ins Frontend-Teilprojekt-Verzeichnis
npm install # Installation der Abhängigkeiten
```

In beiden Teilprojekten stehen jeweils folgende Kommandos zur Verfügung:

|Kommando|Beschreibung|
|---|---|
|`npm run build`|Baut das Projekt.|
|`npm run start`|Baut das Projekt und startet es.|
|`npm run lint`|Überprüft den Codestyle und merkt Verstöße dagegen an.|
|`npm run format`|Versucht, Verstöße gegen den Codestyle zu beheben und merkt die übrigen Verstöße an.|
|`npm run test`|Führt die Tests aus.|
|`docker-compose up`| Führt das Projekt in Docker Container aus.|

### Entwicklung einer Änderung

1. Auschecken des `main`-Zweiges als Basis:  
   `git checkout main`
2. Aktualisieren des `main`-Zweiges:  
   `git pull`
3. Erstellen und Auschecken eines neuen Zweiges zur Entwicklung der Änderung:  
   `git checkout -b c0f7/hello-world`  
   _Benennungsschema:_ `<vierstellige OTH-Kennung>/<kurze Bezeichnung>`; die kurze Bezeichnung sollte in Kleinbuchstaben mit einem Bindestrich als Worttrenner geschrieben werden
4. Vornehmen der gewünschten Änderungen.
5. Vormerken der Änderungen mittels `git add .` (Anstelle des Punkts kann auch eine spezifischere Pfadangabe erfolgen.)
6. Commit mittels `git commit`  
   Bitte auf eine aussagekräftige Commit message achten; bevorzugt auf Englisch verfassen.
7. Pushen des Zweiges ins Haupt-Repository:  
   `git push`
8. Erstellung eines Merge Requests in GitLab

### Merge Requests

1. Die vorgeschlagene Änderung sollte im MR gut erklärt werden. Falls der MR eine offene Aufgabe schließt, sollte dies in der Beschreibung mittels `Closes #<Issue-Nummer>` (z.B. `Closes #42`) erkennbar gemacht werden. Damit wird beim Mergen des MRs automatisch das entsprechende Issue geschlossen.
2. Jeder MR muss von mindestens einem anderen Teammitglied begutachtet und approved werden.
3. Merge Requests werden nur von Philipp Stangl und Thomas Stangl gemergt. Eigene MRs darf man nicht selbst mergen.
4. Vor dem Mergen müssen Diskussionen abgeschlossen und die Pipelines erfolgreich sein.
5. Änderungsvorschläge dürfen ohne Absprache nicht direkt in die Zweige anderer Teammitglieder (erkennbar am Kürzel) gepusht werden, stattdessen kann beispielsweise die GitLab-Suggestion-Funktionalität verwendet werden.
6. Niemand darf direkt in den `main`-Zweig pushen.


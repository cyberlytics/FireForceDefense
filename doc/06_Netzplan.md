# Netzplan

```mermaid
graph LR
        1.1[1.1<br>Pflichtenheft]
        1.2[1.2<br>Konzeptuelles<br>Datenmodell]
        1.3[1.3<br>Use Cases]
        2.1[2.1<br>BO-Spezifikation]
        2.2[2.2<br>Interaktions-<br>Diagramme]
        3.1.1[3.1.1<br>Frameworks<br>auswählen]
        3.1.2[3.1.2<br>Entwicklungsumgebung<br>einrichten]
        3.1.3[3.1.3<br>Testumgebung<br>einrichten]
        3.2.1[3.2.1<br>Menü]
        3.2.2[3.2.2<br>Backend]
        3.2.3[3.2.3<br>Levelauswahl]
        3.4.1[3.4.1<br>Spielansicht]
        3.4.2[3.4.2<br>Zelltypen]
        3.4.3[3.4.3<br>Inhaltstypen]
        3.4.4[3.4.4<br>Levelablauf]
        3.4.5[3.4.5<br>Bauen]
        3.4.6[3.4.6<br>Feuer-<br>Logik]
        3.4.7[3.4.7<br>Effekte]
        3.4.8[3.4.8<br>Währung]
        3.4.9[3.4.9<br>Verschiedene Level]
        3.4.10[3.4.10<br>Systemtest]
        3.3.1[3.3.1<br>Graphiken<br>erstellen]
        3.3.2[3.3.2<br>Sound]
        3.3.3[3.3.3<br>Aufpolieren<br>Teil 1]
        3.3.4[3.3.4<br>Aufpolieren<br>Teil 2]

        a((Projekt-<br>start))
        b(( ))
        c(( ))
        d(( ))

        1.1 --> a
        1.2 --> a
        1.3 --> a
        a --> 2.1
        a --> 2.2
        3.1.1 --> 3.1.2
        3.1.2 --> 3.1.3
        2.1 --> b
        2.2 --> b
        3.1.2 --> b
        b --> 3.2.1
        b --> 3.2.2
        b --> 3.2.3
        b --> 3.4.1
        3.2.1 --> c
        3.2.2 --> c
        3.2.3 --> c
        3.4.1 --> c
        c --> 3.4.2
        c --> 3.4.3
        c --> 3.4.4
        3.4.3 --> 3.4.5
        c --> 3.4.6
        c --> 3.4.7
        c --> 3.4.8
        b --> 3.3.1
        3.1.3 --> c
        3.3.1 --> c
        3.4.2 --> d
        3.4.5 --> d
        3.4.4 --> d
        3.4.6 --> d
        3.4.7 --> d
        3.4.8 --> d
        c --> 3.3.3
        3.3.3 --> d
        d --> 3.4.9
        d --> 3.4.10
        b --> 3.3.2
        3.3.2 --> c
        d --> 3.3.4
```

# Vorgangsknoten

| Nr.<br>1.1 | **Pflichtenheft** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>14.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>21.5.|
|**SAZ**<br>14.5. | **Freier Puffer**<br> | **SEZ**<br>21.5.|

| Nr.<br>1.2 | **Konzeptuelles Datenmodell** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>14.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>21.5.|
|**SAZ**<br>14.5. | **Freier Puffer**<br> | **SEZ**<br>21.5.|

| Nr.<br>1.3 | **Use Cases** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>14.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>21.5.|
|**SAZ**<br>14.5. | **Freier Puffer**<br> | **SEZ**<br>21.5.|

| Nr.<br>2.1 | **BO-Spezifikation** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>21.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>28.5.|
|**SAZ**<br>21.5. | **Freier Puffer**<br> | **SEZ**<br>28.5.|

| Nr.<br>2.2 | **Interaktionsdiagramme erstellen** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>21.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>28.5.|
|**SAZ**<br>21.5. | **Freier Puffer**<br> | **SEZ**<br>28.5.|

| Nr.<br>3.1.1 | **Frameworks/Bibiliotheken auswählen** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>14.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>21.5.|
|**SAZ**<br>14.5. | **Freier Puffer**<br> | **SEZ**<br>21.5.|

| Nr.<br>3.1.2 | **Entwicklungsumgebung einrichten** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>21.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>28.5.|
|**SAZ**<br>21.5. | **Freier Puffer**<br> | **SEZ**<br>28.5.|

| Nr.<br>3.1.3 | **Testumgebung einrichten** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>28.5. | **Gesamtpuffer**<br>1W | **FEZ**<br>4.6.|
|**SAZ**<br>4.6. | **Freier Puffer**<br> | **SEZ**<br>11.6.|

| Nr.<br>3.2.1 | **Menü/Startbildschirm erstellen** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>28.5. | **Gesamtpuffer**<br>1W | **FEZ**<br>4.6.|
|**SAZ**<br>4.6. | **Freier Puffer**<br> | **SEZ**<br>11.6.|

| Nr.<br>3.2.2 | **Backend zur Spielstand-Speicherung** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>28.5. | **Gesamtpuffer**<br>1W | **FEZ**<br>4.6.|
|**SAZ**<br>4.6. | **Freier Puffer**<br> | **SEZ**<br>11.6.|

| Nr.<br>3.2.3 | **Gesamt-Kartenansicht für Levelauswahl** | **Dauer**<br>2W |
|:---:|:---:|:---:|
|**FAZ**<br>28.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>11.6.|
|**SAZ**<br>28.5. | **Freier Puffer**<br> | **SEZ**<br>11.6.|

| Nr.<br>3.3.1 | **Graphiken erstellen** | **Dauer**<br>2W |
|:---:|:---:|:---:|
|**FAZ**<br>28.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>11.6.|
|**SAZ**<br>28.5. | **Freier Puffer**<br> | **SEZ**<br>11.6.|

| Nr.<br>3.3.2 | **Soundeffekte/Musik auswählen** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>28.5. | **Gesamtpuffer**<br>1W | **FEZ**<br>4.6.|
|**SAZ**<br>4.6. | **Freier Puffer**<br> | **SEZ**<br>11.6.|

| Nr.<br>3.3.3 | **Graphik aufpolieren (Teil 1)** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>11.6. | **Gesamtpuffer**<br>1W | **FEZ**<br>18.6.|
|**SAZ**<br>18.6. | **Freier Puffer**<br> | **SEZ**<br>25.6.|

| Nr.<br>3.3.4 | **Graphik aufpolieren (Teil 2)** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>25.6. | **Gesamtpuffer**<br>0W | **FEZ**<br>2.7.|
|**SAZ**<br>25.6. | **Freier Puffer**<br> | **SEZ**<br>2.7.|

| Nr.<br>3.4.1 | **Spielansicht erstellen** | **Dauer**<br>2W |
|:---:|:---:|:---:|
|**FAZ**<br>28.5. | **Gesamtpuffer**<br>0W | **FEZ**<br>11.6.|
|**SAZ**<br>28.5. | **Freier Puffer**<br> | **SEZ**<br>11.6.|

| Nr.<br>3.4.2 | **Zelltypen definieren** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>11.6. | **Gesamtpuffer**<br>1W | **FEZ**<br>18.6.|
|**SAZ**<br>18.6. | **Freier Puffer**<br> | **SEZ**<br>25.6.|

| Nr.<br>3.4.3 | **Inhaltstypen definieren** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>11.6. | **Gesamtpuffer**<br>0W | **FEZ**<br>18.6.|
|**SAZ**<br>11.6. | **Freier Puffer**<br> | **SEZ**<br>18.6.|

| Nr.<br>3.4.4 | **Levelablauf-Logik** | **Dauer**<br>2W |
|:---:|:---:|:---:|
|**FAZ**<br>11.6. | **Gesamtpuffer**<br>0W | **FEZ**<br>25.6.|
|**SAZ**<br>11.6. | **Freier Puffer**<br> | **SEZ**<br>25.6.|

| Nr.<br>3.4.5 | **Bau-Funktionalität** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>18.6. | **Gesamtpuffer**<br>0W | **FEZ**<br>25.6.|
|**SAZ**<br>18.6. | **Freier Puffer**<br> | **SEZ**<br>25.6.|

| Nr.<br>3.4.6 | **Feuer-Logik** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>11.6. | **Gesamtpuffer**<br>1W | **FEZ**<br>18.6.|
|**SAZ**<br>18.6. | **Freier Puffer**<br> | **SEZ**<br>25.6.|

| Nr.<br>3.4.7 | **Effekte** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>11.6. | **Gesamtpuffer**<br>1W | **FEZ**<br>18.6.|
|**SAZ**<br>18.6. | **Freier Puffer**<br> | **SEZ**<br>25.6.|

| Nr.<br>3.4.8 | **Währung** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>11.6. | **Gesamtpuffer**<br>1W | **FEZ**<br>18.6.|
|**SAZ**<br>18.6. | **Freier Puffer**<br> | **SEZ**<br>25.6.|

| Nr.<br>3.4.9 | **Verschiedene Level** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>25.6. | **Gesamtpuffer**<br>0W | **FEZ**<br>2.7.|
|**SAZ**<br>25.6. | **Freier Puffer**<br> | **SEZ**<br>2.7.|

| Nr.<br>3.4.10 | **Systemtest** | **Dauer**<br>1W |
|:---:|:---:|:---:|
|**FAZ**<br>25.6. | **Gesamtpuffer**<br>0W | **FEZ**<br>2.7.|
|**SAZ**<br>25.6. | **Freier Puffer**<br> | **SEZ**<br>2.7.|


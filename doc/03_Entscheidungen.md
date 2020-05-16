# Entscheidungen
Bisher wurden folgende Entscheidungen getroffen:

 * **Plattformunabhängigkeit** \
   Sowohl die Entwicklung, als auch die fertige Anwendung soll plattformunabhängig sein.
   Dabei sind insbesondere Windows, macOS und Linux zu unterstützen.
 * **Programmiersprache: Typescript** \
   Die Anwendung ist als Web-Anwendung gedacht und wird mit der Programmiersprache Typescript realisiert.
 * **Programmierumgebung** \
   Die meisten Projektteilnehmer verwenden PhpStorm, es können allerdings auch andere Programme verwendet werden.
 * **Frameworks** \
   Als Framework wird Vue.js verwendet. Auf eine Game-Engine wird verzichtet.
   Weitere (kleinere) Bibliotheken können bei Bedarf hinzugefügt werden.
 * **Testumgebung** \
   Als Testumgebung wird `ts-jest` verwendet.
 * **Tools für die Dokumentation** \
   Aus dem Punkt der Plattformunabhängigkeit ergibt sich, 
   dass für die Dokumentation keine Microsoft Office Programme verwendet werden. \
   Stattdessen ist die Verwendung der Markup-Sprache "[GitLab Flavored Markdown](https://gitlab.com/gitlab-org/gitlab/blob/master/doc/user/markdown.md)"
   empfohlen. \
   Diagramme können mittels [Mermaid](https://gitlab.com/gitlab-org/gitlab/blob/master/doc/user/markdown.md#mermaid)
   eingefügt werden. Dies ist insbesondere auch für die Klassendiagramme nützlich.

Die Entscheidungen zum Spieldesign werden in einem weiteren Dokument festgehalten.

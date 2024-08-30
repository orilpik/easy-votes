# Easy Votes

Aquest projecte permet crear i gestionar una enquesta amb una sola pregunta i quatre opcions de resposta. Els resultats de l'enquesta es mostren en un gràfic de barres, i els administradors poden modificar la pregunta i les opcions, buidar les dades i descarregar els resultats en format Excel.

## Característiques

- **Creació d'Enquestes**: Es pot definir una pregunta i quatre opcions de resposta.
- **Votació**: Els usuaris poden votar i veure els resultats en temps real.
- **Gestió per a Administradors**:
  - Modificació de la pregunta i opcions.
  - Buidatge de dades anteriors.
  - Descàrrega dels resultats en format Excel.

## Tecnologies Utilitzades

- **HTML/CSS**: Per a la interfície d'usuari.
- **JavaScript**: Per a la lògica de la pàgina i la gestió de l'enquesta.
- **PHP**: Per a la gestió del backend, incloent l'emmagatzematge de dades.
- **JSON**: Per a l'emmagatzematge de la configuració de l'enquesta i els vots.
- **Chart.js**: Per a la visualització dels resultats en un gràfic de barres.
- **SheetJS (xlsx)**: Per a la generació i descàrrega de fitxers Excel amb els resultats.

## Instal·lació i Configuració

1. **Clonar el repositori**:
   ```bash
   git clone https://github.com/orilpik/easy-votes.git
   cd easy-votes

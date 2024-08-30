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
   ```

2. **Configura els fitxers**:
   - **`survey.json`**: Aquest fitxer ha de contenir la pregunta i les opcions inicials de l'enquesta. Exemple:
     ```json
     {
         "question": "Quin és el teu color preferit?",
         "options": ["Rojo", "Azul", "Verde", "Amarillo"]
     }
     ```
   - **`votes.json`**: Aquest fitxer començarà buit:
     ```json
     []
     ```

3. **Configura el servidor**:
   - Assegura't que el servidor tingui PHP instal·lat i configurat correctament.
   - Còpia els fitxers del projecte al directori del servidor.

4. **Permisos**:
   - Assegura't que els fitxers `survey.json` i `votes.json` tinguin els permisos adequats perquè el servidor pugui llegir i escriure.

## Ús

1. **Interfície d'Usuari**:
   - Els usuaris poden accedir a la pàgina principal per veure l'enquesta, votar i veure els resultats.

2. **Accés d'Administrador**:
   - Afegiu `?mode=admin` a l'URL per accedir a les funcionalitats d'administració (ex: `https://urquiabas.com/votacions/?mode=admin`).
   - En mode administrador, podreu modificar la pregunta i opcions, buidar les dades anteriors i descarregar els resultats.

3. **Inserció en Altres Pàgines**:
   - Podeu inserir l'enquesta en altres pàgines mitjançant un `iframe`. Exemple:
     ```html
     <iframe src="https://urquiabas.com/votacions/" style="width: 100%; height: 100vh; border: none;" onload="this.style.height = this.contentWindow.document.body.scrollHeight + 'px';"></iframe>
     ```
   - Assegureu-vos que el domini és de confiança si l'insertareu en plataformes com SharePoint.

## Contribució

Les contribucions són benvingudes! Si voleu col·laborar:

1. **Fork** el projecte.
2. Creeu una branca amb les vostres funcions:
   ```bash
   git checkout -b feature/nova-funcio
   ```
3. **Commit** els canvis:
   ```bash
   git commit -m "Afegida una nova funció"
   ```
4. **Push** a la branca:
   ```bash
   git push origin feature/nova-funcio
   ```
5. Obriu una **Pull Request**.

## Llicència

Aquest projecte està llicenciat sota la llicència [Creative Commons Zero](LICENSE).


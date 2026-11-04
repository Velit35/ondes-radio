# Ondes Radio

Mes radios, où que je sois : https://radio.horolaj.fr

## Ajouter ou modifier une radio

Tout se passe dans `radios.json`, directement sur github.com (ça marche aussi depuis le téléphone) :

1. Ouvre `radios.json`, puis clique sur le crayon (« Edit this file »).
2. Copie un bloc existant, colle-le et change les valeurs :

```json
{
  "name": "Nom de la radio",
  "url": "https://adresse-du-flux.mp3",
  "country": "France",
  "city": "Rennes",
  "codec": "MP3",
  "bitrate": 128,
  "logo": "logos/nom-du-fichier.jpg"
},
```

3. Clique sur « Commit changes ». Le site est à jour une à deux minutes plus tard.

L'ordre des blocs dans le fichier = l'ordre dans l'app.

### Les pièges à éviter

- Une **virgule** entre chaque bloc `{ … }`, mais **pas après le dernier**.
- Des **guillemets droits** `"` autour des textes (pas « » ni “ ”).
- `bitrate` est un nombre sans guillemets (`128`). Mets `0` si tu ne le connais pas.
- Préfère les adresses de flux en **https** : les flux en http peuvent être bloqués par le navigateur.
- Si l'app n'affiche plus aucune radio après une modification, c'est presque toujours une virgule ou un guillemet : colle le fichier sur https://jsonlint.com pour trouver l'erreur.

## Ajouter une pochette

1. Ouvre le dossier `logos`, puis « Add file » → « Upload files ».
2. Dépose l'image (carrée de préférence, pas d'espaces ni d'accents dans le nom).
3. Dans `radios.json`, mets `"logo": "logos/le-fichier.jpg"` sur la radio concernée.

## Fichiers

- `index.html` : l'app
- `radios.json` : la liste des radios
- `logos/` : les pochettes
- `manifest.webmanifest`, `sw.js`, `icon-*.png`, `apple-touch-icon.png` : installation sur le téléphone
- `CNAME` : le nom de domaine (radio.horolaj.fr)

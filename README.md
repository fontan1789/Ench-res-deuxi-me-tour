# Le deuxième tour d'enchères avec ClaudIA

Quiz de bridge consacré au **deuxième tour d'enchères** dans le système SEF 2024.
120 donnes réparties en six banques de vingt, application web autonome, installable
sur téléphone et utilisable hors connexion.

## Les six banques

| Banque | Critère | Donnes |
|---|---|---|
| En silence adverse | situation : les adversaires se taisent | 20 |
| Après intervention | situation : les adversaires parlent | 20 |
| Mains unicolores | profil de main | 20 |
| Mains bicolores | profil de main | 20 |
| Mains régulières et semi-régulières | profil de main | 20 |
| Deux réponses défendables | donnes à arbitrage | 20 |

## Les deux modes

- **Révision** — cinq donnes tirées dans la banque choisie, sans répétition. Passé dix
  réponses dans une banque, les donnes ratées y ressortent jusqu'à quatre fois plus
  souvent. Le ciblage est propre à chaque banque.
- **Jeu à la table** — parties de vingt donnes tirées dans l'ensemble, barre de
  progression, score de chaque partie conservé.

La saisie du joueur est comparée automatiquement à la réponse retenue dans les deux
modes. Une annonce défendable mais non retenue par le SEF est signalée comme telle,
et comptée comme ratée.

## Fichiers

    index.html              application complète (banque, moteur, interface)
    manifest.webmanifest    métadonnées d'installation
    sw.js                   service worker : fonctionnement hors connexion
    icon-180.png            icône iOS (écran d'accueil)
    icon-192.png            icône du navigateur et d'Android
    icon-512.png            icône Android haute définition et maskable

## Mise en ligne sur GitHub Pages

1. Créer un dépôt et y déposer les six fichiers **à la racine**.
2. *Settings* → *Pages* → *Source* : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
3. Attendre la publication, puis ouvrir l'adresse indiquée depuis le téléphone.
4. Installation : sur Android, le bouton de la page de garde ouvre la boîte de dialogue
   native ; sur iPhone, *Partager* → *Sur l'écran d'accueil*.

L'installation exige HTTPS : elle ne fonctionne pas en ouvrant le fichier local.

## Après chaque modification

Incrémenter la constante `CACHE` en tête de `sw.js` (`deuxieme-tour-v1` → `v2`, etc.).
Sans cela, les appareils qui ont déjà installé l'app continueront de servir l'ancienne
version depuis leur cache.

## Données du joueur

Prénom, score cumulé, statistiques par donne et parties jouées sont enregistrés dans le
navigateur, sous le préfixe `sef2etour:`. Rien ne quitte l'appareil, rien n'est partagé
avec l'app SEF, qui utilise son propre préfixe.

## Contrôle de la banque

Au chargement, un validateur vérifie chaque donne : treize cartes, thème connu,
identifiant unique, séquence d'enchères croissante, réponse suffisante, alternative
distincte de la réponse retenue. Toute anomalie bloquante s'affiche en bandeau rouge en
haut de la page ; les redondances de contenu sont signalées dans la console.

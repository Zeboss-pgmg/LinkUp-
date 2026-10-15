# SkillSwap — prototype scolaire

Document de référence pour reprendre la conception de l’application. Il rassemble les décisions discutées depuis le 12 octobre 2026. La première version web a été autorisée puis réalisée le 14 octobre 2026 avec React, TypeScript et Vite.

## Concept

SkillSwap est une startup fictive créée pour un projet de gestion au lycée. Sa plateforme permet de proposer et de demander des services, de partager ses compétences et d’échanger du temps sans nécessairement payer avec de l’argent.

Exemples : soutien scolaire, langues, aide informatique, montage vidéo, graphisme, couture, cuisine, conseils de CV et autres services quotidiens ou créatifs. Une proposition de service d’ongles a également servi d’exemple visuel pendant la conception.

Le public envisagé est celui des jeunes en général, avec la possibilité d’étendre le concept à tous les publics. La tranche d’âge précise reste à définir.

Les valeurs sont l’entraide, l’accessibilité, la confiance, le partage et l’apprentissage par la pratique.

L’application doit à la fois présenter la startup pour l’école et démontrer l’expérience d’une plateforme d’échange. Une courte présentation du modèle économique est souhaitée ; son contenu reste à définir. Le délai annoncé est de deux semaines à partir de cette discussion.

## Deux modes d’échange

- **Échange direct :** deux personnes conviennent des services qu’elles se rendent mutuellement, par exemple de l’aide en anglais contre du montage vidéo.
- **Crédits fictifs :** une personne gagne des crédits en réalisant un service, puis peut les utiliser auprès d’un autre membre. Il n’est pas nécessaire que les deux personnes s’aident réciproquement.

Le concept initial nomme ces crédits **SkillCoins** ; le nom **LinkCoins** a ensuite été utilisé. Le nom définitif reste à confirmer ; cette première version utilise « points LinkUp », selon la formulation récente du porteur du projet.

La règle « une heure = un crédit » est une possibilité initiale, pas une décision validée. La tarification, les fractions d’heure et les règles de l’échange direct restent ouvertes.

## Annonces et parcours

La personne qui a besoin d’un service publie une annonce précisant :

- le service recherché ;
- le service proposé en échange, s’il y en a un ;
- le temps prévu ;
- la rémunération en crédits fictifs ;
- la plateforme ou le moyen prévu pour communiquer.

Le parcours envisagé : découvrir un profil ou un service, demander ou proposer de l’aide, choisir l’échange direct ou les crédits fictifs, convenir des conditions, puis confirmer la réalisation. Les règles d’acceptation, d’annulation et de confirmation restent à définir.

Une messagerie entre amis inspirée d’Instagram et des appels inspirés de Teams ont été évoqués. Ce sont des possibilités, pas des fonctionnalités validées.

## Organisation de l’application

- **Accueil / Découverte :** la première page permet de parcourir les profils.
- **Découverte :** une section pour parcourir des profils, avec un profil principal à la fois et la possibilité de « matcher » pour échanger des services. La présentation s’inspire des applications de rencontre, mais le match porte sur l’entraide.
- **Profil :** section personnelle, avec présentation, compétences, annonces, personnalisation et points LinkUp.
- **Messages :** conversations autour des services et entre amis. Le premier DM ouvre directement une conversation.
- **Calendrier :** accessible par un bouton discret allongé dans le profil ; panneau presque plein écran sur téléphone et fenêtre centrée sur ordinateur. Il ne constitue pas un onglet supplémentaire.

Une courte présentation du projet et une piste de modèle économique à discuter sont accessibles depuis le profil et le badge « Démo scolaire ».

## Direction artistique

L’ambiance recherchée est claire, aérée, douce, inspirée d’Apple et du glassmorphisme. Les fonctionnalités et leurs interactions doivent être soignées, avec une expérience fluide.

Les références visuelles privilégiées sont :

- des écrans clairs présentant des portraits et des notifications, avec des touches pastel ;
- une composition rose associant verre dépoli, surfaces blanches et noires, grande typographie et boutons arrondis.

Principes envisagés : beaucoup d’espace, hiérarchie lisible, portraits et images mis en valeur, surfaces légèrement transparentes, contours fins, formes arrondies et animations discrètes. Les couleurs exactes, dimensions, bordures et proportions ne sont pas fixées. Le rose sert d’exemple, pas de couleur obligatoire.

Chaque section possède son propre thème, personnalisable selon les souhaits de l’utilisateur. L’étendue de cette personnalisation reste à préciser.

### Ambiance du profil dans la découverte

Le propriétaire choisit et modifie l’ambiance depuis son profil. Elle fonctionne comme une bannière qui se prolonge dans le décor autour de la carte.

Les photos et le background doivent s’accorder. Exemple : des photos roses de réalisations d’ongles accompagnées de quelques touches de rose dans le décor. Les couleurs ne sont pas nécessairement extraites automatiquement : le choix appartient à la personne.

La découverte présente un profil principal entouré de son ambiance. Lorsque l’on passe au profil suivant, le profil et son décor associé changent ensemble.

Les schémas transmis expliquent uniquement ces relations et la hiérarchie du contenu. Ils ne constituent pas des maquettes fidèles : ne pas reprendre leurs rectangles, dimensions, bordures ou positions comme des spécifications définitives. Le comportement du thème de navigation pendant la découverte reste à préciser.

### Carte de profil et reveal

- Une **grande photo principale**, choisie par le propriétaire, domine le recto. Elle peut représenter la personne ou son travail, par exemple une réalisation d’ongles.
- Le recto présente aussi le service et les informations essentielles. Leur disposition exacte reste à concevoir.
- Il est possible de **matcher depuis le recto**. Le contrôle précis reste à définir.
- Le verso révèle les informations supplémentaires. Son contenu exact reste à arrêter.
- **Aucun bouton « Voir les infos ».** Le retournement est déclenché par un glissement du doigt vers la droite (**→**) ou en diagonale vers le haut à droite (**↗**).
- Le passage au profil suivant se fait par un **glissement vers le bas (↓)**.
- L’animation de retournement doit être propre, douce et réactive au geste.

Comportements proposés à préciser lors de la conception : rotation suivant le doigt, seuil de validation du geste, retour à la position initiale si le geste est insuffisant et mouvement inverse pour revenir au recto. La navigation à la souris et au clavier, ainsi que l’alternative avec animations réduites, restent à définir sans remettre en cause le geste principal.

### Fluidité

Limiter les effets de flou coûteux, adapter les images à leur affichage et privilégier des animations courtes. La fluidité devra être vérifiée sur téléphone et ordinateur ; elle ne peut pas être garantie avant implémentation et mesure.

## Cadre du prototype

- Projet scolaire fictif, pas un véritable marché de services.
- Profils et annonces fictifs ; inscription simulée retenue pour la démonstration.
- Aucun paiement réel, transfert d’argent ou système de crédits ayant une valeur réelle.
- Ne pas collecter de véritables informations personnelles sensibles ni exposer d’adresses, de numéros de téléphone ou de coordonnées privées.
- Prévoir des considérations de confiance adaptées au public : signalement, modération et conseils de prudence. Les détails restent à définir ; ne pas prétendre garantir la sécurité.
- Tout objectif de croissance inventé doit être clairement indiqué comme une **projection fictive**.
- Ne pas inventer de statistiques factuelles sur le marché.

## Décisions encore ouvertes

- Nom définitif des crédits : SkillCoins ou LinkCoins.
- Tranche d’âge et langue finale de l’interface ; les échanges de conception sont actuellement en français.
- L’éventuel besoin de sections supplémentaires ; trois onglets sont désormais définis.
- Palettes, décors, logo, typographie et paramètres de personnalisation.
- Contenu détaillé du recto et du verso, contrôle du match et règles qui suivent un match.
- Règles des crédits, durées, annulation et confirmation des services.
- Place de la messagerie, des amis et des appels dans le prototype.
- Fonctions de signalement et de modération à démontrer.
- Présentation du modèle économique.
- Distribution iOS/Android native ultérieure. La première version est web, pensée pour iPhone et utilisable sur ordinateur, avec stockage local sur chaque appareil.

## Reprise et dépôt

Le dépôt GitHub fourni est `Zeboss-pgmg/LinkUp-`. Il doit conserver le futur code pour permettre sa récupération sur le PC du porteur du projet.

À la reprise, lire ce document et les éventuelles instructions du dépôt avant de travailler. Continuer à préciser le produit avec le porteur du projet. Ne pas choisir une technologie ni prendre une décision produit majeure sans lui demander. Le développement de la première version a été explicitement autorisé. Les décisions produit majeures encore ouvertes doivent rester discutées avec le porteur du projet.

Dans les tâches cloud, utiliser le checkout existant : chaque tâche dispose déjà d’un environnement isolé. Ne pas créer de worktree sauf demande explicite.


## Première version — lancement

Prérequis : Node.js 22 ou 24 et npm. Depuis la racine du dépôt :

```sh
npm ci
npm run dev
```

Pour produire la version à héberger :

```sh
npm run build
npm run preview
```

Le dossier `dist/` peut être publié sur un hébergement statique HTTPS. La publication n’est pas réalisée par le simple push GitHub. Sur iPhone : ouvrir l’adresse HTTPS dans Safari, puis Partager → Sur l’écran d’accueil. Il s’agit d’une application web, pas d’une application native ni d’une publication App Store. Le fonctionnement hors connexion est préparé par un service worker après le premier chargement complet ; il doit être vérifié dans le navigateur utilisé.

### Fonctionnalités réalisées

- Quatre membres fictifs présentant douze services, ambiances coordonnées et filtres par compétences.
- Geste à droite ou diagonal haut-droite pour retourner la carte ; geste inverse pour le recto ; geste vers le bas pour le profil suivant. Alternative ordinateur : flèches du clavier sur la carte et bouton de profil suivant.
- Signe d’intérêt avec état « en attente » ; la démo ne simule pas une véritable acceptation par un autre utilisateur.
- Conversations locales, sans transmission réseau ni interlocuteur réel.
- Réservation fictive depuis une conversation, choix échange direct ou points, débit simulé, remboursement après annulation et confirmation de réalisation.
- Calendrier d’exemple en octobre 2026, consultable par mois. Les créneaux proposés sont fixes pour la démonstration.
- Modification du profil fictif et quatre ambiances au choix pour le profil et la messagerie. Le choix indépendant de thèmes pour toutes les sections et l’import de bannières restent à développer.
- Signalement simulé, blocage local et conseils de prudence. Aucune modération réelle.
- Données conservées dans le stockage local du navigateur : aucun compte, serveur, paiement ou appel réel. La sauvegarde GitHub conserve le code, pas les conversations locales.

Les noms, compétences et messages sont fictifs. Le visuel d’ongles est généré pour ce prototype ; les portraits sont également générés et fictifs. Les visuels de services autres que les ongles sont des illustrations SVG créées pour le projet. Toutes les images et polices sont livrées localement. Les polices Bricolage Grotesque et IBM Plex Sans sont fournies via leurs paquets Fontsource ; leurs licences sont incluses dans ces paquets.

### Vérification

```sh
npm test
```

Les tests Playwright utilisent Chromium installé à `/usr/bin/chromium` dans l’environnement cloud. Sur un autre ordinateur, définir `CHROMIUM_PATH` vers un exécutable Chromium/Chrome, ou adapter `playwright.config.ts` pour utiliser un navigateur Playwright installé. Les captures sont générées dans `test-results/` et ne sont pas versionnées.

La compilation TypeScript et production ainsi que les parcours de découverte, message, réservation, annulation, thèmes et persistance sont vérifiés sous Chromium aux dimensions d’iPhone et d’ordinateur. Un essai sur un véritable iPhone/Safari reste nécessaire pour confirmer les performances et le comportement tactile iOS.

### Aperçus de la première version

[Vue iPhone](docs/apercu-iphone.png) · [Vue ordinateur](docs/apercu-desktop.png)

![Première version sur iPhone](docs/apercu-iphone.png)

### Publication GitHub Pages

Une version compilée est préparée sur la branche `gh-pages`. Pour activer l’hébergement : dans Settings → Pages du dépôt, choisir **Deploy from a branch**, branche **gh-pages**, dossier **/(root)**, puis **Save**. GitHub affiche ensuite l’adresse publiée. L’adresse attendue est `https://zeboss-pgmg.github.io/LinkUp-/`, mais elle n’est active qu’après activation et déploiement par GitHub. Les chemins relatifs ont été vérifiés en servant la version compilée sous un sous-dossier.

Après une modification du code, il faudra reconstruire et mettre à jour la branche `gh-pages` ; le push de `main` seul ne met pas à jour cette version statique.

### Déploiement Vercel (option retenue)

Le dépôt contient `vercel.json` avec les paramètres Vite : installation `npm ci`, compilation `npm run build`, sortie `dist/`.

Depuis un compte Vercel, importer `Zeboss-pgmg/LinkUp-` avec l’intégration GitHub et choisir la branche de production `main`, sans sous-dossier racine ni variables secrètes. Autoriser l’accès au dépôt s’il est privé, puis lancer Deploy. Vercel fournit l’adresse HTTPS après le déploiement. Les prochains pushs sur `main` pourront déclencher les mises à jour automatiquement.

Le dépôt et sa configuration sont prêts ; cela ne signifie pas que le projet a déjà été importé ou publié sur Vercel.


## Révision du 15 octobre 2026 — guide et expérience mobile

- La présentation initiale devient un guide de trois étapes, avec un bouton **Accéder à l’appli**. La navigation de l’app n’apparaît qu’après cette action. L’entrée est mémorisée sur cet appareil ; le guide reste accessible depuis le profil.
- L’app démarre sur la découverte plein écran, séparée de la présentation. Carte et commandes s’adaptent à la hauteur disponible, y compris sur petit iPhone ; l’interface tient dans le viewport sans défilement de la page de découverte.
- Les avatars dessinés sont remplacés par des photos de profil générées pour les quatre personnages fictifs. Le texte et les informations du verso sont conservés, comme demandé. Aucun portrait ne représente un utilisateur réel.
- Typographie revue : Bricolage Grotesque pour les titres, IBM Plex Sans pour les textes. Suppression de l’italique décoratif, vocabulaire de services plus direct et polices livrées localement.
- Messagerie adaptée au viewport visuel du téléphone ; la navigation s’efface lorsque le clavier réduit fortement la place disponible.
- Tests : parcours d’échange existants, guide et retour au guide, persistance, absence de chevauchement entre commandes et navigation sur plusieurs tailles d’iPhone, et glissements avec événements tactiles Chromium.

Les images affichées sont optimisées en WebP (portraits de 256 pixels, visuel principal limité à 1000 pixels de large). Les originaux générés ont été conservés dans l’environnement de création, hors du dépôt.

Les tests tactiles Chromium ne remplacent pas une validation sur Safari/iPhone réel. Le push GitHub déclenche la mise à jour Vercel si le projet est connecté à la branche `main` ; l’état de ce déploiement doit être vérifié dans Vercel.

[Aperçu du guide d’entrée](docs/guide-iphone.png) · [Verso du profil avec photo](docs/verso-iphone.png)


### Finitions du guide et des interactions

Le guide est désormais compact : ses trois étapes et le bouton d’entrée tiennent dans le viewport aux dimensions testées de 320 × 568, 390 × 844 et 430 × 932. Le visuel se retourne à l’étape correspondante. Pour ouvrir directement le guide même après l’avoir passé, ajouter `?guide=1` à l’adresse ; ce paramètre est retiré à l’entrée dans l’app.

La découverte accompagne le glissement du doigt, affiche une indication de geste et anime le passage au profil suivant. La sélection de navigation glisse entre les trois onglets. Les animations sont désactivées lorsque la réduction des mouvements est demandée.

Les conversations rappellent le service et proposent des amorces de message : elles remplissent le champ sans envoyer automatiquement. La discussion défile jusqu’au dernier message. Le profil permet de choisir un des portraits fictifs de démonstration, avec sauvegarde locale.

La compilation et dix tests de parcours et de disposition sont utilisés pour valider ces changements. La vérification sur un iPhone/Safari réel reste à effectuer.


## Catalogue, annonces et distribution mobile — 15 octobre 2026

La navigation possède maintenant quatre destinations : **Découverte, Explorer, Messages et Profil**. Le catalogue comporte huit catégories : Beauté & création, Photo & vidéo, Art & artisanat, Musique, Cours & langues, Numérique, Cuisine et Vie pratique. La recherche ignore la casse et les accents. Les quatre membres fictifs proposent plusieurs services ; les conversations de démonstration sont liées au service choisi.

Les favoris sont indépendants des signes d’intérêt. Le profil rassemble les favoris, intérêts envoyés, annonces et échanges terminés. Les annonces peuvent proposer un service ou demander de l’aide, avec durée, points fictifs, mode d’échange et ambiance. Elles peuvent être modifiées, archivées et réactivées. **Elles restent sur cet appareil, sans publication à d’autres membres.**

Pour tester le rôle de prestataire : créer une annonce de service, ouvrir Mes annonces, choisir Tester une demande, accepter la demande fictive et confirmer la réalisation dans le calendrier. Les crédits sont gagnés une seule fois à la fin. Les réservations en tant que demandeur continuent de débiter les crédits puis de les restituer en cas d’annulation.

Les profils bloqués peuvent être débloqués. Le profil donne accès aux instructions d’installation et à la suppression des seules données SkillSwap de démonstration. Les pages publiques `privacy.html`, `support.html` et `conditions.html` décrivent le périmètre et les limites.

### Version web installable

Le build inclut un service worker avec cache des ressources locales. Après le premier chargement complet, l’app peut se rouvrir hors connexion. Une mise à jour disponible est proposée à l’utilisateur, sans recharger automatiquement une saisie en cours. Le fonctionnement hors connexion est vérifié sur le build de production avec :

```sh
npm run test:offline
```

Les tests ordinaires (`npm test`) utilisent le serveur de développement, où le service worker n’est pas activé. Les nouvelles dépendances restent verrouillées par `package-lock.json`.

### Projets natifs

Les projets **iOS et Android** sont inclus. La cible iOS est `fr.zeboss.skillswap`, avec ressources embarquées, icônes et écran de lancement. La version web et ces projets partagent la même application React. Le projet iOS est synchronisé, mais **aucun binaire iOS n’a été compilé ou signé** dans ce cloud Linux. Le porteur du projet a confirmé ne pas encore disposer de Mac ni de compte Apple Developer.

Lire [les instructions de publication Apple](docs/APPLE_RELEASE.md) pour les étapes restantes, les propositions de fiche et les limites. La publication App Store n’est pas effectuée. La version web peut être utilisée indépendamment de cette démarche.

```sh
npm run native:sync
npm run ios:open
# ou
npm run android:open
```

Les fichiers de ressources copiées dans les projets natifs ne sont pas versionnés : `native:sync` les régénère. Les sources Xcode et Android Studio sont conservées. Ne jamais ajouter de certificats ou de secrets de signature. Les icônes natives peuvent être recréées depuis le dessin vectoriel avec `npm run assets:native` ; cet outil de développement nécessite Chromium/Chrome ou un navigateur Playwright installé.

[Aperçu Explorer](docs/explorer-iphone.png) · [Aperçu du profil enrichi](docs/profil-iphone.png)

Validation de cette révision : quinze tests de parcours web réussis, un test de production hors connexion réussi, compilation TypeScript/Vite réussie et synchronisation Capacitor iOS/Android réussie. Aucun binaire natif compilé ou signé ; test réel Safari/iPhone et publication App Store restent à effectuer.


## Identité SkillSwap — papier, encre, citron

L’interface partagée adopte une palette stable : papier `#f4f1e8`, vert encre `#193d32` et citron `#ddf879`. Les titres utilisent Bricolage Grotesque et les textes IBM Plex Sans, inclus localement via Fontsource. Le monogramme, les icônes d’installation et les ressources natives suivent cette identité. Les ambiances personnelles des profils restent personnalisables et continuent d’accompagner leurs photos.

Explorer présente un catalogue de domaines, sans les anciens halos et cercles décoratifs. Sa première entrée, **Créer une compétence**, ouvre un formulaire dédié à une offre de savoir-faire. La compétence est enregistrée comme annonce fictive et apparaît dans les compétences du profil tant qu’elle est active ; elle peut être modifiée ou archivée avec les autres annonces. Aucune publication à de vrais utilisateurs n’a lieu.

Les licences des deux polices sont également distribuées dans `public/licenses/`. Validation de cette révision : seize tests de parcours web et un test hors connexion réussis ; build et synchronisation des projets mobiles réussis.


### Défilement et passe Impeccable — 15 octobre 2026

La découverte accepte désormais le glissement vers le haut **ou vers le bas** pour avancer. La molette et le trackpad changent de profil, dans les deux sens ; une rafale et son inertie ne doivent déclencher qu’un changement. Les gestes horizontaux de retournement sont conservés. Si les informations du verso dépassent sur un petit écran, un glissement vers le haut les fait défiler ; une fois revenu en haut, le glissement vers le bas passe au profil suivant.

Explorer et Profil défilent dans leur zone de contenu, avec une navigation fixe. Chaque changement d’onglet démarre en haut de sa page. Les tests vérifient aussi le défilement après fermeture d’une fenêtre et le glissement à travers les boutons des catégories sans les activer.

Passe de finition guidée par [Impeccable](https://github.com/pbakaus/impeccable) (skill 4.6.0, références Adapt/Polish et Craft floor ; moteur 0.1.15, commandes context/detect). L’identité papier/encre/citron et les polices existantes sont conservées. Les numéros décoratifs et surtitres de la découverte et du catalogue sont retirés ; les favoris ont une zone tactile agrandie. Sur ordinateur, le catalogue occupe davantage de largeur, avec quatre colonnes. Aucun outil Impeccable ne s’exécute dans l’application livrée.

Les vérifications de gestes utilisent des événements tactiles synthétisés dans Chromium, et les captures des viewports émulés. La validation sur un iPhone/Safari réel reste à faire.

[Explorer sur iPhone](docs/explorer-iphone.png) · [Explorer sur ordinateur](docs/explorer-desktop.png)

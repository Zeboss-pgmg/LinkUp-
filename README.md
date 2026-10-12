# SkillSwap — prototype scolaire

Document de référence pour reprendre la conception de l’application. Il rassemble les décisions discutées le 12 octobre 2026. Aucun code applicatif n’a encore été écrit et aucune technologie n’a été choisie.

## Concept

SkillSwap est une startup fictive créée pour un projet de gestion au lycée. Sa plateforme permet de proposer et de demander des services, de partager ses compétences et d’échanger du temps sans nécessairement payer avec de l’argent.

Exemples : soutien scolaire, langues, aide informatique, montage vidéo, graphisme, couture, cuisine, conseils de CV et autres services quotidiens ou créatifs. Une proposition de service d’ongles a également servi d’exemple visuel pendant la conception.

Le public envisagé est celui des jeunes en général, avec la possibilité d’étendre le concept à tous les publics. La tranche d’âge précise reste à définir.

Les valeurs sont l’entraide, l’accessibilité, la confiance, le partage et l’apprentissage par la pratique.

L’application doit à la fois présenter la startup pour l’école et démontrer l’expérience d’une plateforme d’échange. Une courte présentation du modèle économique est souhaitée ; son contenu reste à définir. Le délai annoncé est de deux semaines à partir de cette discussion.

## Deux modes d’échange

- **Échange direct :** deux personnes conviennent des services qu’elles se rendent mutuellement, par exemple de l’aide en anglais contre du montage vidéo.
- **Crédits fictifs :** une personne gagne des crédits en réalisant un service, puis peut les utiliser auprès d’un autre membre. Il n’est pas nécessaire que les deux personnes s’aident réciproquement.

Le concept initial nomme ces crédits **SkillCoins** ; le nom **LinkCoins** a ensuite été utilisé. Le nom définitif reste à confirmer.

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

- **Accueil : notre profil personnel.** L’accueil n’est pas une page de présentation commerciale de la startup.
- **Découverte :** une section pour parcourir des profils, avec un profil principal à la fois et la possibilité de « matcher » pour échanger des services. La présentation s’inspire des applications de rencontre, mais le match porte sur l’entraide.
- **Trois autres parties :** à définir par le porteur du projet. Ne pas les inventer lors de l’implémentation.

Le placement de la présentation du modèle économique reste à décider.

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
- Les trois autres sections et leur contenu.
- Palettes, décors, logo, typographie et paramètres de personnalisation.
- Contenu détaillé du recto et du verso, contrôle du match et règles qui suivent un match.
- Règles des crédits, durées, annulation et confirmation des services.
- Place de la messagerie, des amis et des appels dans le prototype.
- Fonctions de signalement et de modération à démontrer.
- Présentation du modèle économique.
- Technologie, stockage de la démonstration et fonctionnement sur ordinateur.

## Reprise et dépôt

Le dépôt GitHub fourni est `Zeboss-pgmg/LinkUp-`. Il doit conserver le futur code pour permettre sa récupération sur le PC du porteur du projet.

À la reprise, lire ce document et les éventuelles instructions du dépôt avant de travailler. Continuer à préciser le produit avec le porteur du projet. Ne pas choisir une technologie ni prendre une décision produit majeure sans lui demander. La discussion reste actuellement en phase de conception ; ce README ne donne pas à lui seul l’autorisation de commencer l’application.

Dans les tâches cloud, utiliser le checkout existant : chaque tâche dispose déjà d’un environnement isolé. Ne pas créer de worktree sauf demande explicite.

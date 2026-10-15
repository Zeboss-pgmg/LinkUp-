# SkillSwap — préparation de la distribution Apple

## Ce qui est livré

- Application React/TypeScript, version web et ressources embarquées.
- Projet iOS Capacitor 8 dans `ios/App/App.xcodeproj` ; dépendances natives gérées par Swift Package Manager.
- Identifiant proposé : `fr.zeboss.skillswap`. À confirmer dans le compte Apple Developer avant la première publication.
- Version `0.1.0`, numéro de build `1`, icône iOS opaque de 1024 pixels et écran de lancement SkillSwap.
- iPhone en portrait ; configuration iPad issue du projet Capacitor, à tester sur simulateur et appareil.
- Le projet généré vise iOS 15 et versions ultérieures. Utiliser une version de Xcode et des SDK acceptée par Apple au moment de la soumission.
- Projet Android également généré ; aucun APK/AAB compilé ou signé dans cette session.

Les ressources web sont copiées dans l’app : aucun `server.url` pointant vers Vercel n’est utilisé. L’application native n’est donc pas un raccourci dépendant du site distant. Le fonctionnement reste celui d’un prototype scolaire local.

## Validation déjà effectuée dans le cloud Linux

- Installation npm, compilation TypeScript et bundle de production.
- Parcours web automatisés et gestes tactiles Chromium.
- Génération des projets iOS et Android ; synchronisation des ressources Capacitor.
- Contrôle du fonctionnement hors connexion de la version web.

**Non effectué :** compilation Xcode, exécution du binaire iOS, signature, archive IPA, TestFlight, publication App Store ou validation par Apple. Ces étapes sont bloquées par l’absence de Mac/Xcode et de compte Apple Developer, confirmée par le porteur du projet. La synchronisation Capacitor ne prouve pas qu’un binaire iOS compile.

## Sur un Mac avec Xcode

Cloner le dépôt existant, utiliser Node.js 22 ou 24 et exécuter depuis sa racine :

```sh
npm ci
npm run native:sync
npm run ios:open
```

`native:sync` recompile le web et met à jour les deux projets natifs. Les fichiers copiés sont ignorés par Git et régénérés sur chaque poste. Xcode ouvre `ios/App/App.xcodeproj`, qui résout les dépendances Swift Package Manager.

1. Dans la cible **App**, ouvrir **Signing & Capabilities**, choisir l’équipe Apple Developer et confirmer l’identifiant de bundle définitif.
2. Garder la signature gérée par Xcode ; ne jamais placer de certificats, clés ou mots de passe dans le dépôt.
3. Tester sur un véritable iPhone et sur les simulateurs correspondant aux appareils distribués : zones de sécurité, gestes au recto/verso, recherche, clavier, annonces, messages, calendrier, suppression des données et démarrage hors connexion.
4. Vérifier aussi les préférences de taille de texte, VoiceOver, la réduction des animations et les liens d’aide/confidentialité. Les tests Chromium ne les remplacent pas.
5. Passer en configuration **Release**, choisir une destination de type appareil iOS, puis **Product → Archive**.
6. Dans Organizer, valider l’archive et envoyer à App Store Connect. Résoudre les alertes réelles de Xcode ; ne pas désactiver les contrôles de signature ou de transport.
7. Distribuer d’abord via TestFlight, corriger les problèmes observés, puis soumettre la fiche App Store et le binaire.

Références officielles : [Capacitor iOS](https://capacitorjs.com/docs/ios), [Apple Developer](https://developer.apple.com/programs/), [App Store Connect](https://appstoreconnect.apple.com/), [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/).

## Éléments à finaliser avant une soumission

- Compte Apple Developer et équipe de signature. Aucun compte n’est connecté dans cette session.
- Identifiant et nom d’application disponibles dans ce compte.
- Coordonnées réelles de l’éditeur et du contact de support. La page d’aide scolaire actuelle doit être complétée avec un moyen de contact utilisable avant une diffusion publique App Store ; ne pas inventer d’adresse.
- Déclarations App Privacy et classification d’âge remplies honnêtement selon la version réellement soumise et les SDK présents.
- Captures issues de la véritable application iOS aux dimensions demandées par App Store Connect. Les images `docs/apercu-*.png` sont des captures navigateur et ne constituent pas une validation native.
- Vérification du manifeste de confidentialité des SDK au moment de l’archive. Capacitor fournit les siens ; tout nouveau plugin peut ajouter des obligations.

Les signatures et clés de distribution doivent être configurées dans Xcode/App Store Connect ou un coffre de CI adapté, jamais en clair dans le code ou dans une conversation.

## Proposition de fiche à relire

**Nom :** SkillSwap

**Sous-titre :** Partage tes compétences

**Catégorie envisagée :** Éducation, à confirmer lors de l’inscription.

**Description de démonstration :**

> Découvre le concept SkillSwap : une façon de partager des compétences et d’apprendre grâce à l’entraide. Explore un catalogue fictif, retourne les cartes de profils, conserve des favoris et crée tes propres annonces de démonstration. Essaie une conversation, un échange direct ou une réservation avec des points fictifs, puis retrouve le rendez-vous dans le calendrier.
>
> SkillSwap est un prototype scolaire. Les profils sont fictifs, les messages restent sur l’appareil et aucun véritable service n’est réservé. Les points n’ont aucune valeur monétaire. Aucun compte ni paiement réel n’est nécessaire.

**URL de confidentialité proposée après déploiement :** `https://link-up-lilac.vercel.app/privacy.html`

**URL d’aide proposée après déploiement :** `https://link-up-lilac.vercel.app/support.html`

**Notes destinées à l’examinateur :**

> Il s’agit d’une démonstration pédagogique locale, sans compte de connexion. Le bouton Accéder à l’appli ouvre le catalogue. Pour tester la publication et les points : publier une annonce fictive depuis le bouton +, ouvrir le profil, choisir Tester une demande sur cette annonce, accepter puis confirmer la réalisation dans le calendrier. Les échanges et signalements ne sont pas transmis à de véritables utilisateurs ou modérateurs. La suppression des données de démonstration est accessible dans le profil.

Ne pas présenter ces fonctions comme une plateforme réellement ouverte à des membres. Une éventuelle ouverture à des utilisateurs réels constituerait un autre projet : comptes, serveur, protection des données, modération effective et règles pour les mineurs. Apple décide de l’acceptation d’une soumission ; un habillage Capacitor ou un prototype scolaire ne garantit pas l’acceptation, notamment au titre des exigences de complétude et de fonctionnalité minimale.

## Android

Le projet est dans `android/`, avec SDK minimum 24 et SDK de compilation/cible 36, conformément au modèle Capacitor installé. Sur un poste équipé d’Android Studio et des SDK requis :

```sh
npm ci
npm run native:sync
npm run android:open
```

La compilation et la signature Android restent à réaliser ; aucun fichier de signature n’est inclus.

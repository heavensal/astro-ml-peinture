# Finalisation ML Entreprise Peinture

## Livré dans cette PR

- Dépendances actualisées avec lockfile, Node 24 et pnpm 11 ; vérification des types et CI de PR.
- Direction visuelle peinture : tons minéraux / terre cuite, composition abstraite, navigation, prestations, étapes du chantier, secteur et demande de devis.
- Formulaire adapté : identité, contact, commune, prestation, surface, période, message et 3 photos compressées ; états d’envoi, erreurs, timeout, clavier et conservation du brouillon.
- i18next conservé, FR seul réellement publié ; suppression de la page anglaise générée même lorsque le mode multilingue était désactivé.
- FAQ et avis ContentForge opt-in sans contenu fictif ; adaptateur articles préparé sans publication de blog.
- Canonical, carte sociale PNG, JSON-LD HousePainter / Service, robots, sitemap, llms.txt, 404 et routes légales FR.

## 1. Réponses attendues d’Adam / du client

| Question | Emplacement / conséquence |
| --- | --- |
| Quel domaine définitif et quel hébergeur : GitHub Pages, LWS ou autre ? | `SITE_URL`, `SITE_BASE`, DNS et mentions légales |
| Le nom, le 06 11 03 03 69 et contact@mlpeinture.fr sont-ils confirmés ? | `src/site.config.ts` ; valeurs reprises du dépôt, non vérifiées |
| Quelle raison sociale, adresse professionnelle et SIRET complet ? | Config, mentions légales, futur PostalAddress ; le numéro RM existant n’est pas un SIRET à 14 chiffres |
| Quels services sont réellement proposés : extérieur, fissures, sinistres, boiseries ? | Dictionnaire FR et choix du formulaire |
| Quel secteur exact et quels frais de déplacement ? | Section secteur et `areaServed` ; pas de pages villes inventées |
| Devis gratuit ? Quel délai réaliste ? Quelle ancienneté et quelles assurances vérifiables ? | Valider les mentions restantes ; promesse « 24 h » et ancienneté retirées des textes principaux |
| Quels logos, photos de chantiers et autorisations de publication ? | Remplacer la composition abstraite ; fournir 3 à 6 réalisations légendées, sans faux avant/après |
| Quel compte/site ContentForge, destinataire et token public limité à send_form ? | Débloque l’envoi réel ; jamais de token privé dans le navigateur |
| Quelle conservation des demandes, quels sous-traitants et quel médiateur ? | Compléter les documents légaux et la politique de données |
| Existe-t-il une fiche Google Business Profile et des profils officiels ? | Ajouter les URL confirmées à `sameAs` et harmoniser les coordonnées |

## 2. `.env` et paramètres encore nécessaires

Aucun `.env` de production ni secret du dépôt n’a été consulté. Les valeurs à fournir sont :

| Variable | Action |
| --- | --- |
| `SITE_URL` | Domaine HTTPS confirmé ; actuellement origine GitHub Pages de prévisualisation |
| `SITE_BASE` | `/` pour domaine personnalisé, `/astro-ml-peinture/` pour Pages projet |
| `PUBLIC_SITE_INDEXABLE` | Garder `false` en préproduction ; `true` seulement après validation |
| `PUBLIC_CONTACT_FORM_URL` | Confirmer l’endpoint `/api/v1/send_form` et les origines CORS autorisées |
| `PUBLIC_CONTACT_FORM_TOKEN` | Manquant : token public limité aux envois du site |
| `CONTENTFORGE_API_TOKEN` | Facultatif, privé, requis uniquement pour lecture FAQ/avis/articles |
| `CONTENTFORGE_URL` | Confirmer l’URL du backend si différente de la valeur proposée |
| `CONTENTFORGE_FAQ_ENABLED`, `CONTENTFORGE_REVIEWS_ENABLED` | Laisser `false` pour le périmètre initial |
| `CONTENTFORGE_ARTICLES_ENABLED` | Laisser `false` : adaptateur seulement, pas de blog dans cette livraison |

Les secrets SMTP, destinataire et quotas se configurent **sur ContentForge**, pas sur le site statique. Reproduire la configuration dans GitHub Actions (Repository variables / secrets) puis reconstruire.

## 3. Étapes avant publication

1. Valider les coordonnées, services, secteur et direction visuelle ; relire tous les textes.
2. Remplacer les coquilles légales `[À compléter…]` et les `TODO:` avec les informations approuvées. Faire valider les documents selon les prestations réellement proposées.
3. Ajouter les photos et le logo validés, dimensions explicites, formats optimisés et textes alternatifs ; régénérer la carte sociale si nécessaire.
4. Configurer ContentForge : token send-only, CORS, destinataire, validation serveur, quotas / anti-spam et taille maximale des requêtes (3 photos en base64).
5. Effectuer un envoi réel avec et sans photos sur mobile ; vérifier la réception, les champs, les pièces jointes, les erreurs et l’absence de doublons. Aucun email réel n’a été envoyé durant le développement.
6. Exécuter `pnpm check`, `pnpm test`, `pnpm build`, `pnpm check:build`, puis `pnpm check:launch`. Ce dernier échoue tant que les coquilles/configurations bloquantes subsistent.
7. Valider le rendu sur mobile et desktop, clavier / lecteur d’écran, Safari, performances et contraste. Vérifier le comportement de compression sur les appareils du client.
8. Configurer domaine / HTTPS / redirections, passer `PUBLIC_SITE_INDEXABLE=true`, reconstruire, contrôler robots et sitemap du domaine final. Hébergement statique : ajouter une redirection 301 serveur pour les anciennes URL si possible.
9. Vérifier Search Console, Bing Webmaster Tools, données structurées et fiche Google Business Profile. Soumettre le sitemap après validation ; ni Schema.org ni llms.txt ne garantissent un résultat enrichi ou une citation IA.

## 4. Évolutions optionnelles

- FAQ / avis : activer uniquement sur demande, publier des contenus authentiques approuvés et vérifier le rebuild ContentForge.
- Blog : compléter templates et routes, sanitiser le HTML CMS, tester index/article et sitemap avant activation.
- Anglais : revoir entièrement le dictionnaire historique, traduire aussi les pages légales et formulaires, créer les routes puis les hreflang réciproques.
- Réalisations : créer une galerie de vrais chantiers avec légendes et autorisations ; pas d’images présentées comme des preuves de travaux sans validation.

## Validation de cette livraison

- Installation avec lockfile figé, `astro check` sans erreur ni avertissement, 3 tests de garde-fous des photos et build statique validés.
- Contrôles HTML : français seul, un H1, canonical, JSON-LD parsable, image OG présente, routes légales, absence de faux témoignages et de blog.
- Construction testée avec sous-dossier GitHub Pages et avec domaine racine + indexation activée ; sitemap de production limité à l’accueil.
- `check:launch` échoue volontairement et énumère les informations manquantes.
- Vérification visuelle automatisée non réalisée : navigateur Chromium indisponible et téléchargement inexploitable dans cet environnement. La recette mobile/desktop reste à effectuer.
- Livraison du formulaire non validée contre le backend réel : token et configuration ContentForge nécessaires. Aucun envoi réel effectué.

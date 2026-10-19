# ML Entreprise Peinture

Site vitrine statique Astro, orienté peinture et rénovation à Marseille. Référence fonctionnelle : `heavensal/arm-services-astro` (formulaire ContentForge, séparation des sections et configuration CMS).

## Développement

Node 24, pnpm 11.25.0. `nvm use`, puis :

```sh
pnpm install --frozen-lockfile
cp .env.example .env
pnpm dev
```

```sh
pnpm check       # Astro / TypeScript
pnpm test        # Garde-fous des pièces jointes
pnpm build
pnpm check:build # Contrôles des fichiers générés
pnpm check:launch # Échoue volontairement tant que les informations de lancement manquent
```

## Architecture

- `src/components/` : une section par sujet ; formulaire séparé des champs et du contrôleur.
- `src/i18n/locales/fr.json` : textes visibles via `getFixedT('fr')` ; FR seul publié.
- `src/site.config.ts` : identité, contact et zones issus du dépôt initial, à confirmer.
- `src/lib/contactForm.ts` : état du formulaire, timeout, protection des doubles envois, conservation du brouillon sur erreur.
- `src/lib/resizeContactPhotos.ts` : 3 JPEG/PNG/WebP, 25 Mo maximum chacun avant compression ; JPEG de 1600 px maximum et 900 Kio maximum transmis.
- `src/lib/contentforge*.ts` : FAQ, avis et adaptateur de résumés d’articles optionnels.
- `src/lib/seo.ts` : graphe HousePainter / WebSite / WebPage / Service.
- `scripts/generate-og.mjs` : régénère la carte sociale PNG à partir du SVG éditable.
- `docs/PLAN_FINALISATION.md` : questions, informations manquantes et étapes de livraison.

## Configuration et sécurité

Toutes les variables sont documentées dans `.env.example`. Elles sont lues au **build** : un changement impose une reconstruction. Les variables `PUBLIC_*` sont publiques.

Le formulaire utilise le contrat `POST send_form` de la référence ARM : `from_email`, `from_name`, `subject`, `message`, `fields`, `attachments`. Le token public doit uniquement autoriser l’envoi pour ce site. Le token privé `CONTENTFORGE_API_TOKEN` ne doit jamais être placé dans une variable `PUBLIC_*`.

CORS, validation serveur, quotas, contrôle des fichiers et protection anti-spam doivent être configurés sur ContentForge. Le honeypot et les contrôles navigateur ne remplacent pas ces protections. Aucun envoi réel n’est effectué par les tests.

Sans configuration du formulaire, un message accessible propose le téléphone et l’email. Les photos sont redimensionnées côté navigateur ; aucune donnée personnelle n’est stockée localement par le site.

## Contenu et langues

FAQ et avis sont désactivés par défaut ; aucune donnée fictive n’est utilisée en fallback. L’activation exige le drapeau correspondant, le token privé et du contenu approuvé dans ContentForge. Une panne API masque le bloc avec un délai maximum de 8 secondes.

Le blog **n’est pas publié**. Son adaptateur est préparé, mais activer le drapeau ne crée aucune page : les templates, la sanitisation HTML et les routes restent à réaliser si le blog est demandé.

FR uniquement : aucune route `/en/`, aucun hreflang EN. L’ancien dictionnaire anglais est une référence de migration non chargée ; il devra être entièrement revu avant d’ajouter une langue au registre et ses routes. `ENABLE_MULTILANG` est remplacé par le registre explicite `locales`.

## SEO / GEO

Canonicals, Open Graph PNG, sitemap, robots, HTML sémantique et données structurées cohérentes. `llms.txt` est une aide éditoriale expérimentale, sans garantie de citation ou classement par une IA. Aucune note, adresse, certification ou ancienneté non confirmée n’est ajoutée au JSON-LD.

L’indexation est désactivée par défaut. `SITE_URL` et `SITE_BASE` contrôlent l’origine et le sous-dossier, notamment GitHub Pages. Les anciennes URL légales redirigent vers les URL françaises (redirections HTML sur hébergement statique ; configurer des 301 serveur si disponibles).

## Livraison

La CI des PR vérifie les types, les tests et la construction sans secret. Le workflow Pages publie seulement sur `main` / `master`. Reporter les variables `.env` dans les variables/secrets GitHub indiqués dans le workflow. Ne pas activer l’indexation avant validation du plan de finalisation.

Migration : Astro 7.4, Tailwind 4.3, i18next 26.5 ; TypeScript 6 est retenu car `astro check` refuse actuellement TypeScript 7. Guide : https://docs.astro.build/en/guides/upgrade-to/v7/ .

# Détail des agents du pool

Chaque agent est configuré dans `agents.config.json`. Ce document décrit leur rôle, leurs entrées/sorties et comment les connecter à **Squid Research** et **LPPP-generator**.

---

## 1. Agent Qualification

- **Id** : `qualification`
- **Source** : Squid Research  
- **Cible** : LPPP-generator (en amont de la génération)

**Rôle**  
À partir des opportunités et entreprises fournies par Squid Research, applique des règles (score minimum, présence société/rôle) pour produire une liste de **leads qualifiés** pour lesquels une landing page de démarchage a du sens.

**Entrées**  
- `opportunities` : offres / opportunités (API ou export Squid Research)  
- `companies` : entreprises enrichies (Module Enriched si disponible)

**Sorties**  
- `qualified_leads` : liste d’identifiants (ou objets) cibles pour LPPP-generator

**Utilisation CV / stratégique**  
- Montre la capacité à **structurer un funnel** (données → qualification → action).  
- Idéal en pitch « acquisition + produit » : données Squid Research → qualification → landings LPPP automatisées.

---

## 2. Agent Génération Landing

- **Id** : `landing-generator`
- **Source** : Squid Research (contexte cible)  
- **Cible** : LPPP-generator

**Rôle**  
Pour chaque lead qualifié, appelle LPPP-generator pour générer (et éventuellement déployer) une landing page de candidature / prospection personnalisée (ex. template LPPP-standard, données entreprise).

**Entrées**  
- `qualified_leads` : sortie de l’agent Qualification  
- `company_context` : nom, secteur, proposition de valeur (depuis Squid Research ou Module Enriched)

**Sorties**  
- `landing_url` : URL de la landing générée  
- `deploy_status` : succès / échec (si LPPP-generator le renvoie)

**Utilisation CV / stratégique**  
- « Automatisation de la génération de landing pages (LPPP-generator) à partir des opportunités qualifiées (Squid Research). »  
- Stack : orchestration agents + APIs (Squid Research, LPPP-generator), données contextualisées.

---

## 3. Agent Actualisation des données (ex-Sync Opportunités)

- **Id** : `sync-opportunities`
- **Source** : Squid Research  
- **Cible** : aucune (sortie consommée par les autres agents)

**Rôle**  
- **À l’allumage** et **toutes les 20 minutes** : contrôle l’actualisation des données par rapport à **LPPP-generator** et **Squid Research**.
- Synchronise opportunités et entreprises depuis Squid Research vers le pool (cache local ou file).
- Vérifie la cohérence des données côté LPPP-generator (templates, dernières générations) et côté Squid Research (dernières mises à jour).

**Entrées**  
- Aucune (il tire tout depuis Squid Research et interroge LPPP-generator pour le statut)

**Sorties**  
- `opportunities` : liste des opportunités à jour  
- `companies` : liste des entreprises (enrichies si disponible)  
- `actualisation_report` : rapport de fraîcheur des données (Squid Research + LPPP-generator)

**Paramètres**  
- `run_on_startup` : true  
- `interval_minutes` : 20  
- `check_lppp_generator` : true  
- `check_squid_research` : true  

**Utilisation CV / stratégique**  
- « Pipeline de données avec contrôle d’actualisation toutes les 20 min (Squid Research + LPPP-generator), synchronisation automatique pour alimenter la génération de landings. »

---

## 4. Agent Enrichissement données

- **Id** : `data-enricher`
- **Source** : Squid Research  
- **Cible** : Squid Research (ou cache partagé pour LPPP)

**Rôle**  
Enrichit entreprises et candidatures (contexte, résumés) pour améliorer la **qualité des données** utilisées par les autres agents et par LPPP-generator (textes plus pertinents, moins « creux »).

**Entrées**  
- `companies`  
- `applications` (candidatures)

**Sorties**  
- `enriched_context` : champs additionnels (résumé, secteur, pain points) utilisables dans les landings et dans Squid Research.

**Paramètres**  
- `use_module_enriched` : s’appuyer sur le Module Enriched (INSEE, Pappers, etc.) si disponible.

**Utilisation CV / stratégique**  
- « Enrichissement des données (Squid Research, Module Enriched) pour améliorer la pertinence des contenus générés (landing pages, démarchage). »  
- Lien direct avec ta volonté d’avoir des **datas concrètes, contextualisées, utilisables en CV**.

---

## 5. Agent Graphiste

- **Id** : `graphiste`
- **Source** : Squid Research (contexte)  
- **Cible** : LPPP-generator (specs visuelles)

**Rôle**  
Produit des **pages à fort impact visuel (effet waouh)** et des **infographies de qualité**, facilement compréhensibles, en **gardant les contextes** métier et les messages clés (secteur, KPI, parcours).

**Droit explicite – éléments des autres projets**  
Le Graphiste a le **droit de récupérer des éléments issus des autres projets** pour améliorer, étayer et rendre plus cohérent le style visuel. Cela inclut notamment :  
- **Images** utilisées pour les fonds d’écran et **fonds de pages**  
- **Éléments graphiques** repris d’autres livrables  
- **CSS** du site ou d’autres projets  
- Tout autre **asset** utile (polices, icônes, palettes)  

Les sources autorisées sont définies dans la config (`asset_sources` : LPPP-generator, Squid Research, SquidCommunication, other_projects). Aucune invention : les assets doivent exister et être sourcés (règle « Ne jamais halluciner », voir GOVERNANCE.md).

**Entrées**  
- `enriched_context`, `qualified_leads`, `company_context`, `cross_project_assets` (optionnel, selon config)

**Sorties**  
- `visual_assets` : visuels, hero, sections  
- `infographics` : funnel, KPI, timeline (templates paramétrables)  
- `page_design_specs` : spécifications pour LPPP-generator

**Paramètres**  
- `style_guide` : charte-pool  
- `infographic_templates` : funnel, kpi, timeline  
- `wow_effects` : hero, stats, testimonials  
- `allow_cross_project_assets` : true  
- `asset_sources` : lppp_generator, squid_research, squid_communication, other_projects  
- `asset_types` : images, backgrounds, page_backgrounds, graphic_elements, css, fonts  

**Utilisation CV / stratégique**  
- « Conception de pages à fort impact et d’infographies claires (contexte préservé) pour landings et supports de démarchage ; réutilisation d’assets cross-projets pour cohérence visuelle. »

---

## 6. Agent Rédacteur en chef

- **Id** : `redacteur-en-chef`
- **Source** : contenus produits par le pool  
- **Cible** : LPPP-generator (contenus validés)

**Rôle**  
Contrôle la **cohésion du style rédactionnel** et la **qualité rédactionnelle** sur l’ensemble des contenus (landings, infographies, textes générés). Valide ton, clarté et cohérence avant publication.

**Entrées**  
- `visual_assets`, `landing_copy`, `infographics`

**Sorties**  
- `approved_content` : contenus validés  
- `style_report` : rapport de cohésion  
- `corrections` : propositions de correction

**Paramètres**  
- `tone` : professionnel-bienveillant  
- `check_cohesion` : true  
- `check_quality` : true  

**Utilisation CV / stratégique**  
- « Contrôle éditorial et cohésion rédactionnelle sur l’ensemble des livrables (landings, infographies) pour une qualité homogène. »

---

## Connexion à Squid Research, LPPP-generator et SquidCommunication

- **Squid Research** : exposer des endpoints (ou exports) pour `opportunities`, `companies`, `applications`. Le pool lit ces données et peut éventuellement écrire (statuts, champs enrichis).  
- **LPPP-generator** : exposer un endpoint (ex. `POST /api/generate`) acceptant une cible + contexte et renvoyant `landing_url` (+ optionnellement `deploy_status`).  
- **SquidCommunication** : **liaison d’information** avec le projet SquidCommunication. Exposer des endpoints (ou flux) pour `content`, `messages`, `context` afin d’alimenter le pool en contenu et contexte communication (messages, ton, éléments réutilisables). Le pool peut consommer ces données pour cohérence des messages et du style avec les autres projets.

Une fois les URLs et clés définies dans les variables d’environnement (`SQUID_RESEARCH_*`, `LPPP_GENERATOR_*`, `SQUID_COMMUNICATION_*`), un script d’orchestration (Node ou autre) peut :  
1. **À l’allumage et toutes les 20 min** : lancer `sync-opportunities` (actualisation Squid Research + SquidCommunication + LPPP-generator)  
2. Lancer `data-enricher`  
3. Lancer `qualification`  
4. Lancer `graphiste` (pages waouh + infographies ; récupération d’assets cross-projets autorisée)  
5. Lancer `redacteur-en-chef` (validation cohésion et qualité rédactionnelle)  
6. Lancer `landing-generator` pour chaque lead qualifié  

Cela donne un flux **propre, exploitable et stratégique** : Squid Research + SquidCommunication + LPPP-generator reliés par un pool d’agents (sous supervision Chef de projet, règle « Ne jamais halluciner »), avec des données à jour et une qualité visuelle et rédactionnelle contrôlée.

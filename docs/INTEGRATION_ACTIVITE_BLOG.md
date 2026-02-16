# Intégration page activité ↔ blog personnel

> Document de référence pour l’orchestrateur et l’équipe technique — mise en relation de la page d’activité (SquidCommunication) et du blog (ce site) pour échange d’informations.

**Dernière mise à jour** : 2026-02-16

---

## Avis à toute l’équipe

**À surveiller en priorité** : la page d’activité SquidCommunication et le blog personnel (ce dépôt) doivent être tenus à jour pour refléter **l’activité Squid Research** et la **communication LinkedIn**. Toute l’équipe (orchestrateur, Tech Lead, Rédacteur en chef, Sync) est concernée : actualiser les données du blog à partir des logs, du registre d’articles et des publications LinkedIn lorsque c’est pertinent. Voir les sections suivantes pour les chemins et les flux.

---

## 1. Chemins relatifs et complets

### Racine SquidCommunication (page d’activité, registre, logs)

| Contexte | Racine |
|----------|--------|
| **SquidCommunication** | ` /home/lucas/tools/squidCommunication` (ou chemin local équivalent) |

### Arborescence des principaux fichiers (SquidCommunication)

```
squidCommunication/
├── communication_log.md      # Journal communication
├── articles-complete.json    # Registre principal des articles
├── articles-pedagogiques.json
├── articles/                 # Dossiers par article (campaign.json + article.md)
│   └── <slug>/
│       ├── campaign.json
│       └── article.md
├── docs/
│   ├── INTEGRATION_ACTIVITE_BLOG.md
│   └── PUBLICATION_LOG.md
└── landing/                  # Si applicable
```

### Ce dépôt (landing page + blog Squid Research)

| Contexte | Racine |
|----------|--------|
| **Landing / Blog** | Racine du dépôt `landingpageCvPagePerso` |

Principaux chemins **dans ce dépôt** :

| Usage | Fichier / dossier |
|-------|-------------------|
| Données articles blog FR | `public/data/articles.json` |
| Données articles blog EN | `public/data/articles-en.json` |
| Pages blog | `public/blog-squid-research.html`, `public/en/blog-squid-research.html` |
| Articles HTML | `public/articles/*.html`, `public/en/articles/*.html` |
| Pool d’agents (orchestrateur) | `pool-agents/`, `scripts/run-pool-agents.js` |

### Tableau des chemins pour intégration

| Élément | SquidCommunication | Ce dépôt (blog) |
|---------|--------------------|-----------------|
| Registre articles | `articles-complete.json` | — |
| Articles pédagogiques | `articles-pedagogiques.json` | — |
| Feed / source articles | `articles/*/campaign.json` + `article.md` | `public/data/articles.json`, `articles-en.json` |
| Blog / landing | — | `public/blog-squid-research.html`, `public/` |
| Doc intégration | `docs/INTEGRATION_ACTIVITE_BLOG.md` | `docs/INTEGRATION_ACTIVITE_BLOG.md` (ce fichier) |

---

## 2. Les différents logs

À consulter pour actualiser l’activité et la communication.

| Log | Chemin (SquidCommunication) | Usage |
|-----|-----------------------------|--------|
| Journal communication | `communication_log.md` | Activité et échanges communication |
| Journal publication | `docs/PUBLICATION_LOG.md` | Publications, sorties, dates |
| Logs Git | `.git/logs/` | Historique commits (squidCommunication ou ce dépôt) |

L’orchestrateur et l’équipe technique peuvent s’appuyer sur ces logs pour synchroniser le **blog personnel** (articles, éditorial, « en chantier ») avec l’activité réelle Squid Research et LinkedIn.

---

## 3. Registre des articles (SquidCommunication)

| Registre | Fichier | Usage |
|----------|---------|--------|
| Principal | `articles-complete.json` | 97 articles (14 publiés, 44 prêts, 71 brouillons) — source de vérité côté activité |
| Pédagogique | `articles-pedagogiques.json` | 40 articles pédagogiques |
| Feed blog | `articles/*/campaign.json` + `article.md` | Source pour le blog (Next.js ou export vers ce blog) |

**Point d’attention** : une disconnexion est documentée : `articles-complete.json` n’est pas encore synchronisé automatiquement avec le contenu de `articles/`. Toute synchro vers le blog (ce dépôt) doit tenir compte de cet écart tant qu’il n’est pas résolu.

---

## 4. Intégration activité ↔ blog

- Le **blog** (ce dépôt) consomme les articles depuis **ce dépôt** : `public/data/articles.json` et `public/data/articles-en.json`. Pour enrichir le blog à partir de SquidCommunication, l’orchestrateur ou le Rédacteur en chef peut importer / faire correspondre des entrées depuis `articles-complete.json` ou `articles/*/campaign.json` vers ces JSON.
- Le **registre principal** côté activité reste `articles-complete.json` (SquidCommunication).
- **Chemins relatifs depuis `landing/`** (si on travaille depuis un sous-dossier SquidCommunication) : `../articles-complete.json`, `../articles/`, `../docs/`.
- **Page à surveiller** : la page d’activité (SquidCommunication) et la communication LinkedIn doivent alimenter les mises à jour du blog (nouveaux articles, statuts « publié » / « en chantier », liens LinkedIn). Voir **AVIS ÉQUIPE** en tête de document.

---

## 5. Rôle de l’orchestrateur et de l’équipe technique

- **Orchestrateur** : lors de l’actualisation (démarrage, boucle 20 min), prendre en compte la disponibilité des logs et du registre SquidCommunication pour signaler ou déclencher une mise à jour du blog si configuré.
- **Tech Lead** : documenter ou automatiser les chemins d’export (SquidCommunication → `public/data/articles*.json`) si une synchro est mise en place.
- **Rédacteur en chef** : s’appuyer sur les logs et le registre pour proposer ou valider les articles à publier sur le blog et la cohérence avec LinkedIn.

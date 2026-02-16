# Pool d’agents – Squid Research × LPPP-generator × SquidCommunication

Ce pool d’agents relie **Squid Research** (recherche d’emploi / opportunités), **LPPP-generator** (génération automatisée de landing pages pour la démarchage) et **SquidCommunication** (liaison d’information : contenu, messages, contexte), afin d’enrichir les données et d’améliorer la qualité du contenu utilisable (CV, datas, prospection). **Sous supervision du Chef de projet** : tous les agents travaillent en temps réel tout en étant cadrés ; **règle pour tous : Ne jamais halluciner** (voir GOVERNANCE.md).

## Objectifs

- **Données de qualité** : exploiter les sorties de Squid Research (entreprises, offres, candidatures) pour alimenter la génération de landings.
- **Démarchage structuré** : déclencher la création de landing pages ciblées (LPPP-generator) à partir des opportunités qualifiées (Squid Research).
- **Liaison SquidCommunication** : alimenter le pool en contenu et contexte communication pour cohérence des messages et du style avec les autres projets.
- **Un seul flux** : un pool d’agents orchestrés, supervisés par le Chef de projet, avec une charte « Ne jamais halluciner » pour tout le monde.

## Architecture haute niveau

```
┌─────────────────────┐     ┌─────────────────────┐
│   Squid Research    │────▶│                    │     ┌─────────────────────┐
│ (opportunités,      │     │  Pool d’agents     │────▶│  LPPP-generator     │
│  entreprises,       │◀────│  (qualification,  │◀────│ (landing pages      │
│  candidatures)      │     │   sync, génération)│     │  automatisées)      │
└─────────────────────┘     │  Sous supervision  │     └─────────────────────┘
                           │  Chef de projet    │
┌─────────────────────┐     │  « Ne jamais       │     ┌─────────────────────┐
│ SquidCommunication  │────▶│   halluciner »     │────▶│  (liaison info)     │
│ (contenu, messages, │◀────│                    │◀────│                     │
│  contexte)           │     └─────────────────────┘     └─────────────────────┘
└─────────────────────┘
```

- **Squid Research** : source de vérité (offres, entreprises, enrichissement Module Enriched, recherche LinkedIn, etc.).
- **SquidCommunication** : liaison d’information (contenu, messages, contexte) vers et depuis le pool pour cohérence communication.
- **LPPP-generator** : génération de landing pages de candidature / prospection (ex. FitClem, 0Flow, Yuwell, Ackuracy).
- **Pool d’agents** : orchestration, qualification, flux de données ; **Chef de projet** pour supervision temps réel et respect de la règle « Ne jamais halluciner » (GOVERNANCE.md).

## Fichiers du pool

| Fichier | Rôle |
|--------|------|
| `agents.config.json` | Définition des agents, sources (Squid Research, SquidCommunication, LPPP-generator), gouvernance (Chef de projet, règle « Ne jamais halluciner »), paramètres Graphiste (assets cross-projets). |
| `GOVERNANCE.md` | Chef de projet (supervision temps réel), règle « Ne jamais halluciner » pour tous les agents. |
| `AGENTS.md` | Description détaillée de chaque agent (entrées, sorties, usage) ; droits du Graphiste (récupération d’éléments d’autres projets) ; liaison SquidCommunication. |
| `EQUIPE-RACI.md` | Équipe et matrice RACI (Chef de projet, Chef d’équipe, Graphiste, Rédacteur en chef, Sync/Actualisation, SquidCommunication). |
| `PROCEDURES.md` | Procédures opérationnelles (pompes) : supervision, actualisation, chaîne de production, qualité, SquidCommunication. |
| `SCRUM.md` | Réunion Scrum : cadence, ordre du jour, optimisation des rôles et fonctions. |

## Prérequis

- **Squid Research** : API ou moyen d’accès (webhooks, export, base) pour lire les opportunités / entreprises et éventuellement écrire des statuts.
- **LPPP-generator** : API ou CLI pour lancer la génération d’une landing (entrée : cible, contexte, template).
- **SquidCommunication** : API ou flux pour la liaison d’information (contenu, messages, contexte) – optionnel mais recommandé pour cohérence.

Variables d’environnement recommandées (à définir où tu exécutes le pool) :

- `SQUID_RESEARCH_API_URL` – base URL de l’API Squid Research (si applicable).
- `SQUID_RESEARCH_API_KEY` – token d’authentification (si applicable).
- `SQUID_COMMUNICATION_URL` – base URL de l’API ou du service SquidCommunication (liaison d’information).
- `SQUID_COMMUNICATION_API_KEY` – token SquidCommunication (si applicable).
- `LPPP_GENERATOR_URL` – URL du service LPPP-generator (API ou endpoint d’appel).
- `LPPP_GENERATOR_API_KEY` – token LPPP-generator (si applicable).

## Exécution

- Voir `AGENTS.md` pour le rôle de chaque agent.
- À la racine du projet : `npm run agents` (ou `node scripts/run-pool-agents.js`). Le script lit `agents.config.json` et enchaîne les agents (sync → enricher → qualification → graphiste → rédacteur en chef → landing-generator). Brancher les appels réels aux APIs en étendant `scripts/run-pool-agents.js`.
- Définir `SQUID_RESEARCH_API_URL`, `LPPP_GENERATOR_URL` et `SQUID_COMMUNICATION_URL` (et clés si besoin) pour activer les connexions. Voir GOVERNANCE.md pour la supervision Chef de projet et la règle « Ne jamais halluciner ».

## Suite

- Enrichir `agents.config.json` avec de nouveaux agents (ex. nettoyage de données, scoring, envoi email).
- Connecter d’autres outils (n8n, Make, Flowise) en consommant la même config pour garder une seule source de vérité.

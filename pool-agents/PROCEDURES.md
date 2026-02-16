# Procédures opérationnelles (pompes) – Pool d’agents

Document établi avec le **Chef d’équipe** et le **Chef de projet** pour que toute l’équipe fonctionne au mieux, sans rien oublier d’important. À adapter selon le contexte (humain seul ou équipe élargie).

**Règle s’appliquant à tous** : **Ne jamais halluciner** – tout le monde (agents et rôles) est concerné ; le Chef de projet supervise pour cadrer et empêcher les sorties non sourcées (voir GOVERNANCE.md).

---

## 0. Supervision par le Chef de projet

| Étape | Responsable | Action |
|-------|-------------|--------|
| 0.1 | Chef de projet | Superviser **en temps réel** l’exécution des agents : cadrage, cohérence des sorties avec les sources (Squid Research, LPPP-generator, SquidCommunication, assets existants). |
| 0.2 | Chef de projet | Faire respecter la règle **« Ne jamais halluciner »** : aucune donnée ou contenu inventé ; tout doit être sourcé ou dérivé de la config et des procédures. |
| 0.3 | Tous les agents | Effectuer leurs tâches sous ce cadre ; en cas de doute sur une source, demander validation ou utiliser uniquement des données/config explicites. |

---

## 1. Au démarrage (allumage)

| Étape | Responsable | Action |
|-------|-------------|--------|
| 1.1 | Orchestrateur | Lancer **Agent Actualisation** (sync-opportunities) avec `run_on_startup: true`. Vérifier que Squid Research et LPPP-generator répondent. |
| 1.2 | Tech Lead | Vérifier les variables d’environnement (`SQUID_RESEARCH_*`, `LPPP_GENERATOR_*`, `SQUID_COMMUNICATION_*`). |
| 1.3 | Orchestrateur | Enchaîner : actualisation → enricher → qualification → graphiste → rédacteur en chef → landing-generator (selon config). |
| 1.4 | Chef d’équipe | S’assurer que les procédures et le RACI sont à jour (voir EQUIPE-RACI.md). |

---

## 2. Toutes les 20 minutes (actualisation)

| Étape | Responsable | Action |
|-------|-------------|--------|
| 2.1 | Agent Actualisation | Contrôler l’actualisation des données par rapport à **Squid Research** (opportunités, entreprises, applications). |
| 2.2 | Agent Actualisation | Contrôler l’actualisation par rapport à **SquidCommunication** (contenu, messages, contexte) si la liaison est activée. |
| 2.3 | Agent Actualisation | Contrôler l’actualisation par rapport à **LPPP-generator** (templates, dernières générations, cohérence). |
| 2.4 | Orchestrateur | Produire un **rapport d’actualisation** (actualisation_report). En cas d’écart ou d’erreur : log + alerte (optionnel). |
| 2.5 | Tech Lead | S’assurer que l’intervalle (20 min) et les checks (Squid Research, SquidCommunication, LPPP-generator) sont bien configurés dans `agents.config.json`. |

---

## 3. Chaîne de production des contenus

| Étape | Responsable | Action |
|-------|-------------|--------|
| 3.1 | Sync / Actualisation | Données à jour (opportunities, companies). |
| 3.2 | Data-enricher | Contexte enrichi pour chaque cible. |
| 3.3 | Qualification | Liste des leads qualifiés. |
| 3.4 | **Graphiste** | Pages à effet waouh + infographies de qualité, compréhensibles, contexte gardé. Récupération d’éléments des autres projets autorisée (images, fonds de pages, CSS, assets) pour cohérence visuelle – sans halluciner, uniquement assets existants et sourcés. |
| 3.5 | **Rédacteur en chef** | Contrôle cohésion du style et qualité rédactionnelle ; validation ou corrections. |
| 3.6 | Landing-generator | Génération des landings (contenus validés). |
| 3.7 | LPPP-generator | Déploiement / publication. |

Rien ne part en production sans passage par **Graphiste** (visuel) et **Rédacteur en chef** (texte).

---

## 4. Qualité et cohérence

| Étape | Responsable | Action |
|-------|-------------|--------|
| 4.1 | Rédacteur en chef | Vérifier ton, clarté, cohérence sur tous les contenus (landings, infographies). |
| 4.2 | Graphiste | Respect de la charte (style_guide) et des contextes métier dans les infographies ; usage d’assets cross-projets uniquement sourcés (pas d’invention). |
| 4.3 | Data / Qualité | Validation des sorties (données alimentant les landings et le CV). |
| 4.4 | Chef de projet | Vérifier que la règle « Ne jamais halluciner » est respectée sur toutes les sorties. |
| 4.5 | Chef d’équipe | Vérifier que les rôles et le RACI sont appliqués (voir réunion Scrum). |

---

## 5. Incidents et monitoring

| Étape | Responsable | Action |
|-------|-------------|--------|
| 5.1 | Orchestrateur | Détecter les erreurs (APIs down, timeouts). |
| 5.2 | Tech Lead | Corriger, relancer, adapter la config. |
| 5.3 | Chef d’équipe | Escalade si blocage ou décision à prendre. |
| 5.4 | Tous | Consulter EQUIPE-RACI.md (activité 14 – Incidents) et PROCEDURES.md. |

---

## 6. Réunion Scrum (rôles et optimisation)

- **Cadence** : voir SCRUM.md.
- **Objectif** : que chacun discute et optimise ses rôles et fonctions.
- **Chef d’équipe** : anime et valide les décisions ; met à jour les pompes (ce document) et le RACI si besoin.

---

## Checklist « rien d’important oublié »

- [ ] **Supervision Chef de projet** : cadrage temps réel, règle « Ne jamais halluciner » appliquée à tous les agents (GOVERNANCE.md).
- [ ] Actualisation à l’allumage et toutes les 20 min (Squid Research + SquidCommunication + LPPP-generator).
- [ ] Graphiste : pages waouh + infographies qualité, contextes gardés ; récupération d’assets cross-projets autorisée (fonds, CSS, images) – uniquement sourcés.
- [ ] Rédacteur en chef : cohésion style + qualité rédactionnelle sur tout le contenu.
- [ ] Liaison SquidCommunication : information/contexte communication disponible pour le pool si configurée.
- [ ] Procédures (pompes) à jour et connues de l’équipe.
- [ ] RACI à jour (EQUIPE-RACI.md) et réunion Scrum planifiée (SCRUM.md).

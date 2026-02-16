# Équipe et RACI – Pool d’agents (Squid Research × LPPP-generator × SquidCommunication)

**R** = Responsible (réalise la tâche) · **A** = Accountable (décide, valide) · **C** = Consulted (donne un avis) · **I** = Informed (tenu au courant)

**Règle s’appliquant à tous** : **Ne jamais halluciner** – tout le monde (agents et rôles) est concerné ; le Chef de projet supervise pour cadrer et empêcher les sorties non sourcées.

---

## Rôles de l’équipe

| Rôle | Type | Description |
|------|------|-------------|
| **Chef de projet** | Humain | Sous sa supervision, tous les agents effectuent leurs tâches en temps réel. Il les supervise systématiquement pour les cadrer et empêcher qu’ils fassent n’importe quoi. Garant de la règle « Ne jamais halluciner » pour l’ensemble du pool. |
| **Chef d’équipe** | Humain | Coordination de l’équipe, procédures (pompes), réunions Scrum, priorisation et optimisation des rôles. S’assure que rien d’important n’est oublié et que toute l’équipe fonctionne au mieux. |
| **Responsable produit** | Humain | Priorités, backlog, critères de qualification et de succès. Valide les règles métier. |
| **Tech Lead / Dev** | Humain | Architecture du pool, orchestration, intégration APIs, run des agents (dont actualisation 20 min), maintenance du code et de la config. |
| **Data / Qualité données** | Humain | Règles d’enrichissement, validation des sorties. |
| **Squid Research** | Système | Source des opportunités, entreprises, candidatures. |
| **SquidCommunication** | Système | Liaison d’information : contenu, messages, contexte communication (projet lié au pool). |
| **LPPP-generator** | Système | Génération et déploiement des landing pages. |
| **Orchestrateur (pool)** | Système | Exécution des agents (sync à l’allumage + 20 min, enricher, qualification, graphiste, rédacteur en chef, landing-generator), gestion des erreurs. |
| **Agent Graphiste** | Système | Pages à effet waouh, infographies de qualité ; droit de récupérer des éléments des autres projets (images, fonds, CSS, assets) pour cohérence visuelle. |
| **Agent Rédacteur en chef** | Système | Contrôle de la cohésion du style et de la qualité rédactionnelle sur l’ensemble des contenus. |

---

## Matrice RACI – Activités

| Activité | Chef de projet | Chef d’équipe | Resp. produit | Tech Lead / Dev | Data / Qualité | Graphiste | Réd. en chef | Sync / Actualisation | Squid R. | Squid Com. | LPPP-gen | Orchestrateur |
|----------|----------------|----------------|----------------|-----------------|----------------|-----------|--------------|----------------------|----------|------------|----------|----------------|
| **0. Supervision temps réel / cadrage / « Ne jamais halluciner »** | **A** / **R** | C | I | C | I | **R** (cadré) | **R** (cadré) | **R** (cadré) | I | I | I | **R** (cadré) |
| **1. Stratégie et priorités** | **A** | **A** | **R** | C | C | I | I | I | I | I | I | I |
| **2. Procédures (pompes)** | C | **R** / **A** | C | C | C | C | C | C | I | I | I | I |
| **3. Config des agents** | C | C | C | **R** / **A** | C | I | I | I | I | I | I | I |
| **4. Actualisation (démarrage + 20 min)** | I | I | I | **A** | I | I | I | **R** | **R** (données) | **R** (contexte) | **R** (statut) | **R** (exécute) |
| **5. Sync opportunités** | I | I | I | **A** | I | I | I | **R** | **R** | I | I | **R** |
| **6. Enrichissement** | I | I | I | **A** | **R** (règles) | I | I | I | **R** | C | I | **R** |
| **7. Qualification** | I | I | **A** | **R** | **R** (critères) | I | I | I | **R** | I | I | **R** |
| **8. Design pages / infographies (waouh)** | I | I | C | **A** | I | **R** | C | I | I | I | I | **R** (déclenche) |
| **9. Contrôle éditorial (cohésion, qualité)** | I | I | C | **A** | I | C | **R** | I | I | I | I | **R** (déclenche) |
| **10. Génération landings** | I | I | I | **A** | I | I | I | I | I | I | **R** | **R** |
| **11. Déploiement** | I | I | I | **A** | I | I | I | I | I | I | **R** | I |
| **12. Monitoring** | **A** (cadrage) | **A** (KPIs équipe) | C | **R** (outils) | **R** (qualité) | I | I | **R** (rapport) | I | I | I | **R** |
| **13. Évolution des agents** | **A** | **A** | **R** (priorisation) | **R** (dev) | C | C | C | I | I | I | I | I |
| **14. Incidents** | **A** (escalade) | **A** (escalade) | I | **R** (correction) | I | I | I | **R** (détection) | C | C | C | **R** |
| **15. Réunion Scrum (rôles, optimisation)** | **R** / **A** | **R** / **A** | **R** | **R** | **R** | **R** | **R** | **R** | I | I | I | I |

---

## Légende

- **Supervision (0)** : le Chef de projet supervise en temps réel tous les agents pour les cadrer et faire respecter la règle « Ne jamais halluciner » (voir GOVERNANCE.md).
- **Actualisation (4)** : à l’allumage et toutes les 20 min, l’agent Sync/Actualisation contrôle la fraîcheur des données (Squid Research, SquidCommunication, LPPP-generator). Tech Lead est redevable du bon réglage (intervalle, run_on_startup).
- **Design (8)** : l’agent Graphiste produit pages waouh et infographies ; il a le droit de récupérer des éléments des autres projets (images, fonds, CSS) pour cohérence visuelle. Rédacteur en chef est consulté pour la cohérence texte/visuel.
- **Contrôle éditorial (9)** : l’agent Rédacteur en chef valide cohésion et qualité rédactionnelle ; Graphiste est consulté.
- **Procédures (2)** : le Chef d’équipe pilote les pompes (procédures opérationnelles) en lien avec Tech Lead et les autres rôles.
- **Réunion Scrum (15)** : toute l’équipe (rôles humains + agents représentés par leur responsable) discute et optimise rôles et fonctions. Chef d’équipe et Chef de projet animent et valident les décisions.
- **SquidCommunication** : liaison d’information avec le projet SquidCommunication (contenu, messages, contexte) ; voir agents.config.json et README.

---

## Récap une personne seule (Lucas)

Si une seule personne porte les rôles humains :

| Rôle fusionné | RACI à garder en tête |
|---------------|------------------------|
| **Chef de projet + Chef d’équipe + Resp. produit + Data** | **A** sur supervision, stratégie, priorités, procédures (pompes), Scrum, règle « Ne jamais halluciner ». **R** sur définition des critères et qualité. |
| **Tech Lead / Dev** | **R** / **A** sur config, orchestration, actualisation 20 min, run, monitoring et incidents. |

Les colonnes **Squid Research**, **SquidCommunication**, **LPPP-generator**, **Orchestrateur**, **Agent Graphiste**, **Agent Rédacteur en chef** et **Sync/Actualisation** restent des responsabilités système (agents exécutés par l’orchestrateur).

# Réunion Scrum – Pool d’agents

Objectif : que **chacun discute et optimise ses rôles et fonctions** pour que toute l’équipe fonctionne au mieux. Animée par le **Chef d’équipe**.

---

## Cadence proposée

- **Réunion courte (15–20 min)** : hebdo ou bi-hebdo.
- **Réunion d’optimisation des rôles (30–45 min)** : après chaque release ou changement majeur (nouveaux agents, changement de procédures).

Adaptable selon que tu travailles seul (rétro sur tes propres rôles) ou en équipe.

---

## Ordre du jour type

1. **Tour de table (rôles)**  
   Chacun dit en 1–2 min :  
   - Ce pour quoi il est **Responsible** ou **Accountable** cette période.  
   - Un point de friction ou un oubli éventuel (procédure, agent, donnée).

2. **Actualisation (20 min) et Sync**  
   - Tech Lead / Orchestrateur : le run « à l’allumage + toutes les 20 min » se passe bien ? Squid Research et LPPP-generator sont bien contrôlés ?  
   - Ajuster `interval_minutes`, `run_on_startup`, `check_*` si besoin.

3. **Graphiste et Rédacteur en chef**  
   - Graphiste : les pages waouh et infographies sont bien intégrées dans la chaîne ? Contextes préservés ?  
   - Rédacteur en chef : la cohésion et la qualité rédactionnelle sont-elles vérifiées sur tous les livrables ?  
   - Décisions : ordre d’exécution (graphiste avant rédacteur ou parallèle), critères de validation.

4. **Procédures (pompes)**  
   - Chef d’équipe : rappel des procédures importantes (PROCEDURES.md).  
   - Quelque chose à ajouter ou modifier pour ne rien oublier ?

5. **Optimisation des rôles et fonctions**  
   - Chacun propose une amélioration de son rôle ou d’un autre (RACI).  
   - Chef d’équipe valide et met à jour EQUIPE-RACI.md et PROCEDURES.md.

6. **Prochaines actions**  
   - Qui fait quoi d’ici la prochaine réunion (tasks, config, doc).

---

## Rôles représentés en réunion

| Rôle | Qui en parle | Sujets clés |
|------|----------------|-------------|
| Chef d’équipe | Humain | Animation, procédures, priorisation, décisions. |
| Responsable produit | Humain | Priorités, critères de qualification, KPIs. |
| Tech Lead / Dev | Humain | Orchestration, actualisation 20 min, config, incidents. |
| Data / Qualité | Humain | Règles d’enrichissement, qualité des sorties. |
| Agent Actualisation | Représenté par Tech Lead | Fréquence, Squid Research + LPPP-generator. |
| Agent Graphiste | Représenté par Resp. produit ou Tech Lead | Pages waouh, infographies, contextes. |
| Agent Rédacteur en chef | Représenté par Resp. produit ou Data | Cohésion, qualité rédactionnelle. |

---

## Après la réunion

- Mise à jour de **EQUIPE-RACI.md** si les rôles ou le RACI ont changé.
- Mise à jour de **PROCEDURES.md** (pompes) si une étape a été ajoutée ou modifiée.
- Mise à jour de **agents.config.json** si les paramètres des agents (ex. actualisation, graphiste, rédacteur en chef) ont été ajustés.

Cela permet à toute l’équipe (agents + humains) de rester alignée et d’optimiser en continu les rôles et les fonctions.

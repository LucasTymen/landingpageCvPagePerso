# Gouvernance du pool – Chef de projet et règle « Ne jamais halluciner »

## Chef de projet (supervision)

- **Rôle** : Sous sa supervision, **tous les agents** effectuent leurs tâches **en temps réel**. Il les **supervise systématiquement** pour les cadrer et **empêcher qu’ils fassent n’importe quoi**.
- **Périmètre** : Chaque agent (sync, enricher, qualification, graphiste, rédacteur en chef, landing-generator) est soumis à ce cadre. Le Chef de projet valide que les sorties restent cohérentes avec les sources et les règles du pool.
- **Lien avec la config** : `agents.config.json` → `governance.supervisor: "chef_de_projet"`, `supervision_mode: "real_time"`.

## Règle : Ne jamais halluciner

- **Portée** : **Tout le monde** est concerné – tous les agents et tous les rôles (humains et système).
- **Principe** : Aucune information, donnée ou contenu **inventé** ou **non sourcé**. Les sorties doivent reposer sur :
  - les **sources réelles** du pool (Squid Research, LPPP-generator, SquidCommunication),
  - les **assets existants** (images, CSS, textes déjà validés),
  - les **règles et paramètres** définis dans la config et les procédures.
- **Application** : Le Chef de projet (ou le processus de supervision) doit pouvoir contrôler que les agents ne produisent pas de contenu « hors piste ». En cas de doute, privilégier la vérification ou la demande de source explicite.

## Résumé

| Élément | Description |
|--------|-------------|
| **Supervision** | Chef de projet, temps réel, tous les agents cadrés. |
| **Interdiction** | Ne jamais halluciner – tout le monde concerné. |
| **Sources autorisées** | Squid Research, LPPP-generator, SquidCommunication, assets existants et config. |

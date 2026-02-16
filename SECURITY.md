# Sécurité des dépendances

## Next.js (Red Hat / CVE)

- **Alerte Red Hat** : la dépendance `next` (ex. 16.0.7) peut être signalée avec 2 vulnérabilités Medium (rhtpa/osv-github).
- **Action effectuée** : mise à jour vers **next@16.0.10** (correctifs CVE-2025-55183, CVE-2025-55184 – RSC).
- **Recommandation** : pour corriger aussi les vulnérabilités High signalées par `npm audit`, passer à **next@16.1.6** : `npm install next@16.1.6`
- **Références** : Next.js Security Update Dec 11 2025, CVE-2025-66478. Lancer `npm audit` régulièrement.

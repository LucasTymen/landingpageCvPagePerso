# Conventions de développement - Landing Page CV

## 🔄 Synchronisation des traductions

**RÈGLE ABSOLUE** : Toute modification sur les pages françaises DOIT être synchronisée immédiatement sur les pages anglaises correspondantes.

### Pages à synchroniser systématiquement :
- Navigation principale (header)
- Footer
- Structure des pages
- Liens internes
- Boutons et CTAs
- Nouvelles fonctionnalités

### Structure des fichiers :
- Français : `/public/[page].html`
- Anglais : `/public/en/[page].html`

### Exemple de synchronisation :
Si vous ajoutez un lien dans `/public/index.html`, ajoutez-le aussi dans `/public/en/index.html` avec la traduction appropriée.

---

## 📝 Blog - Structure et ordre des articles

### Ordre des articles
Les articles du blog doivent **TOUJOURS** être classés du **plus récent au plus ancien**.

- Le premier article affiché doit être le plus récent
- Les nouveaux articles doivent être ajoutés **en haut** de la liste
- Format de date : `📅 [Date complète]` (ex: `📅 24 novembre 2025`)

### Structure HTML pour un nouvel article :
```html
<!-- Article X : [Titre] -->
<article class="bogoss-card">
  <div class="bogoss-card-header">
    <h2>[Titre de l'article]</h2>
    <div class="article-meta">
      <span>📅 [Date]</span>
      <span>•</span>
      <span>⏱️ [Temps de lecture]</span>
      <span>•</span>
      <span>🏷️ [Tags]</span>
    </div>
  </div>
  <div class="bogoss-card-body">
    <!-- Contenu de l'article -->
  </div>
</article>
```

### Fichiers du blog :
- Français : `/public/blog-squid-research.html`
- Anglais : `/public/en/blog-squid-research.html` (à créer si nécessaire)

---

## 🔗 Liens de navigation

### Lien "Projet en cours" / "Current Project"
Le lien dans la navigation principale doit **TOUJOURS** pointer vers :
- Français : `/blog-squid-research.html`
- Anglais : `/en/blog-squid-research.html`

**NE PAS** utiliser `/squid-research.html` pour ce lien de navigation.

---

## 📊 Approche de développement

### Principes fondamentaux

1. **Approche positive et constructive**
   - Proposer des solutions plutôt que de pointer uniquement les problèmes
   - Encourager les améliorations progressives
   - Valoriser les bonnes pratiques existantes

2. **Data-driven (basé sur les données)**
   - Toujours vérifier les faits avant de proposer des changements
   - Utiliser les outils de recherche du codebase pour comprendre le contexte
   - Ne pas faire d'hypothèses sans vérification
   - Citer les fichiers et lignes de code pertinents

3. **Sans hallucination**
   - Ne jamais inventer de fonctionnalités qui n'existent pas
   - Ne pas supposer l'existence de fichiers ou de configurations
   - Vérifier systématiquement avec les outils de recherche avant d'affirmer quelque chose
   - Si quelque chose est incertain, le vérifier d'abord

### Processus de vérification avant modification :
1. ✅ Rechercher dans le codebase pour comprendre le contexte
2. ✅ Lire les fichiers concernés avant modification
3. ✅ Vérifier les dépendances et impacts
4. ✅ Tester la cohérence avec l'existant
5. ✅ Synchroniser les traductions

---

## 🎯 Checklist avant commit

- [ ] Modifications synchronisées FR/EN
- [ ] Liens de navigation vérifiés
- [ ] Articles du blog dans le bon ordre (plus récent en premier)
- [ ] Pas d'hypothèses non vérifiées
- [ ] Approche constructive et data-driven
- [ ] Tests visuels effectués si possible

---

## 📌 Notes importantes

- Le lien "Projet en cours" pointe vers le **blog**, pas vers la page projet
- Les articles du blog sont triés du **plus récent au plus ancien**
- Toute modification doit être **systématiquement synchronisée** entre FR et EN
- Toujours vérifier les faits avant de modifier ou d'affirmer quelque chose


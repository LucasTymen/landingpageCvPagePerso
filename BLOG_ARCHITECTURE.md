# Architecture du Blog SquidResearch

## 📁 Structure proposée

```
public/
├── blog-squid-research.html          # Page d'accueil du blog (liste des articles)
├── articles/                          # Dossier des articles individuels
│   ├── 2025-11-24-episode-4-holehe.html
│   ├── 2025-11-24-episode-3-seo-billing.html
│   ├── 2025-11-24-episode-2-module-enriched.html
│   └── 2025-11-24-episode-1-genese.html
├── assets/
│   ├── js/
│   │   └── blog.js                   # Script de chargement dynamique des articles
│   └── css/
│       └── blog.css                  # Styles spécifiques au blog
└── data/
    └── articles.json                 # Métadonnées de tous les articles (généré automatiquement)
```

## 🎯 Fonctionnalités à implémenter

### 1. **Système de métadonnées (JSON)**
Chaque article aura un fichier JSON avec ses métadonnées :
```json
{
  "id": "episode-4-holehe",
  "title": "Épisode 4 : Intégration holehe",
  "slug": "episode-4-holehe",
  "date": "2025-11-24T10:00:00Z",
  "updated": "2025-11-24T15:30:00Z",
  "author": "Lucas Tymen",
  "tags": ["ENRICHED", "holehe", "Kali Linux", "Tests"],
  "category": "Développement",
  "readTime": 5,
  "excerpt": "L'intégration de holehe dans le système ENRICHED...",
  "image": "/assets/images/blog/holehe-preview.jpg",
  "featured": true,
  "published": true
}
```

### 2. **Page d'accueil du blog**
- Grid de cards d'articles (plus récent en premier)
- Filtrage par catégorie/tags
- Recherche par mots-clés
- Pagination (si > 12 articles)
- Tri par date, popularité, temps de lecture

### 3. **Pages d'articles individuelles**
- URL propre : `/articles/[slug].html`
- Navigation précédent/suivant
- Articles liés (même catégorie/tags)
- Partage social (Twitter, LinkedIn, etc.)
- Temps de lecture estimé
- Date de publication et dernière mise à jour
- Auteur avec lien vers profil
- Table des matières (si article long)

### 4. **Script de génération automatique**
- `scripts/generate-blog.js` : Scanne le dossier articles/
- Génère `data/articles.json` avec toutes les métadonnées
- Trie par timestamp (plus récent en premier)
- Valide la structure des articles

### 5. **SEO & Performance**
- Meta tags Open Graph pour chaque article
- Twitter Cards
- Schema.org Article markup
- Sitemap.xml avec tous les articles
- RSS feed (`/blog-squid-research.xml`)
- Lazy loading des images
- Optimisation des images (WebP)

### 6. **Fonctionnalités avancées**
- **Filtrage** : Par catégorie, tags, date
- **Recherche** : Recherche full-text dans les articles
- **Articles liés** : Suggestions basées sur tags/catégories
- **Statistiques** : Nombre de vues (via GA4)
- **Commentaires** : Intégration optionnelle (Disqus, Giscus)
- **Newsletter** : Formulaire d'inscription
- **Archives** : Vue par mois/année

### 7. **Multilingue**
- Version FR : `/blog-squid-research.html`
- Version EN : `/en/blog-squid-research.html`
- Articles traduits dans `/en/articles/`
- Synchronisation automatique des métadonnées

### 8. **Design & UX**
- Cards avec hover effects
- Images de preview pour chaque article
- Badges pour catégories/tags
- Indicateur "Nouveau" pour articles récents (< 7 jours)
- Indicateur "Mis à jour" si updated récent
- Dark mode (optionnel)
- Mode lecture (focus sur le contenu)

## 📝 Format des articles

### Structure HTML d'un article
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>[Titre] | Blog SquidResearch</title>
  <meta name="description" content="[Excerpt]">
  <!-- Meta tags Open Graph, Twitter Cards, etc. -->
</head>
<body>
  <article class="blog-article">
    <header class="article-header">
      <div class="article-meta">
        <span class="category">[Catégorie]</span>
        <time datetime="[ISO date]">[Date formatée]</time>
        <span class="read-time">⏱️ [X] min</span>
      </div>
      <h1>[Titre]</h1>
      <p class="excerpt">[Excerpt]</p>
      <div class="tags">
        <span class="tag">[Tag 1]</span>
        <span class="tag">[Tag 2]</span>
      </div>
    </header>
    
    <div class="article-content">
      <!-- Contenu de l'article -->
    </div>
    
    <footer class="article-footer">
      <div class="share-buttons">
        <!-- Boutons de partage -->
      </div>
      <nav class="article-nav">
        <a href="[article-precedent]" class="prev">← Précédent</a>
        <a href="[article-suivant]" class="next">Suivant →</a>
      </nav>
      <div class="related-articles">
        <!-- Articles liés -->
      </div>
    </footer>
  </article>
</body>
</html>
```

## 🔧 Scripts utilitaires

### `scripts/generate-blog.js`
- Scanne `public/articles/` et `public/en/articles/`
- Extrait les métadonnées de chaque article
- Génère `public/data/articles.json` et `public/data/articles-en.json`
- Valide la structure
- Trie par date (plus récent en premier)

### `scripts/create-article.js`
- Template pour créer un nouvel article
- Génère le fichier HTML avec structure de base
- Crée le fichier JSON de métadonnées
- Ajoute au bon endroit (tri par date)

## 📊 Données à tracker

- Nombre de vues par article (GA4)
- Temps de lecture moyen
- Taux de rebond
- Articles les plus populaires
- Tags les plus consultés

## 🚀 Avantages de cette architecture

1. **Scalable** : Facile d'ajouter de nouveaux articles
2. **Maintenable** : Structure claire et organisée
3. **SEO-friendly** : URLs propres, meta tags, sitemap
4. **Performant** : Chargement dynamique, lazy loading
5. **Flexible** : Facile d'ajouter de nouvelles fonctionnalités
6. **Multilingue** : Support FR/EN natif
7. **Data-driven** : Métadonnées structurées pour analytics

## 📌 Checklist d'implémentation

- [ ] Créer la structure de dossiers
- [ ] Migrer les articles existants vers `/articles/`
- [ ] Créer le système de métadonnées JSON
- [ ] Développer la page d'accueil avec cards
- [ ] Créer le template d'article individuel
- [ ] Implémenter le script de génération
- [ ] Ajouter le filtrage et la recherche
- [ ] Implémenter la navigation entre articles
- [ ] Ajouter les articles liés
- [ ] Créer le RSS feed
- [ ] Optimiser le SEO
- [ ] Synchroniser la version EN
- [ ] Tester et valider


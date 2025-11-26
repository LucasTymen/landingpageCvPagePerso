# Blog SquidResearch - Guide d'utilisation

## 📁 Structure

```
public/
├── blog-squid-research.html      # Page d'accueil du blog
├── articles/                      # Articles individuels
│   ├── 2025-11-24-episode-4-holehe.html
│   ├── 2025-11-24-episode-3-seo-billing.html
│   ├── 2025-11-24-episode-2-module-enriched.html
│   └── 2025-11-24-episode-1-genese.html
├── data/
│   ├── articles.json              # Fichier centralisé (généré automatiquement)
│   └── articles/                  # Métadonnées individuelles
│       ├── 2025-11-24-episode-4-holehe.json
│       ├── 2025-11-24-episode-3-seo-billing.json
│       ├── 2025-11-24-episode-2-module-enriched.json
│       └── 2025-11-24-episode-1-genese.json
└── scripts/
    └── generate-blog.js           # Script de génération automatique
```

## ✨ Fonctionnalités

- ✅ Articles organisés par timestamp (plus récent en premier)
- ✅ Page d'accueil avec cards dynamiques
- ✅ Filtrage par catégorie et tags
- ✅ Recherche full-text
- ✅ Navigation entre articles (précédent/suivant)
- ✅ Partage social (Twitter, LinkedIn)
- ✅ SEO optimisé (Open Graph, Twitter Cards, Schema.org)
- ✅ Responsive design

## 📝 Ajouter un nouvel article

### 1. Créer le fichier HTML de l'article

Créer un fichier dans `/public/articles/` avec le format :
```
YYYY-MM-DD-[slug].html
```

Exemple : `2025-11-25-nouvelle-fonctionnalite.html`

### 2. Créer le fichier JSON de métadonnées

Créer un fichier dans `/public/data/articles/` avec le même nom :
```
YYYY-MM-DD-[slug].json
```

Exemple de structure JSON :
```json
{
  "id": "nouvelle-fonctionnalite",
  "slug": "2025-11-25-nouvelle-fonctionnalite",
  "title": "Titre de l'article",
  "excerpt": "Résumé court de l'article...",
  "date": "2025-11-25T10:00:00+01:00",
  "updated": "2025-11-25T10:00:00+01:00",
  "author": "Lucas Tymen",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "category": "Développement",
  "readTime": 5,
  "image": null,
  "featured": false,
  "published": true,
  "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
}
```

### 3. Générer le fichier articles.json

Exécuter le script de génération :
```bash
node public/scripts/generate-blog.js
```

Ou depuis la racine du projet :
```bash
cd public && node scripts/generate-blog.js
```

Le script va :
- Scanner tous les fichiers JSON dans `/data/articles/`
- Valider leur structure
- Les trier par date (plus récent en premier)
- Générer `/data/articles.json`

## 🎨 Personnalisation

### Gradients pour les cards

Chaque article peut avoir son propre gradient dans le JSON :
- `"gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"` (violet)
- `"gradient": "linear-gradient(135deg, #10b981 0%, #059669 100%)"` (vert)
- `"gradient": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"` (orange)
- `"gradient": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"` (violet foncé)

### Catégories disponibles

- Développement
- Architecture
- Optimisation
- Tests
- (Ajoutez les vôtres)

## 🔄 Workflow recommandé

1. Créer le fichier HTML de l'article
2. Créer le fichier JSON de métadonnées
3. Exécuter `generate-blog.js` pour mettre à jour `articles.json`
4. Tester localement
5. Commit et push

## 📌 Notes importantes

- Les articles sont **automatiquement triés** du plus récent au plus ancien
- Seuls les articles avec `"published": true` apparaissent sur le blog
- Le champ `date` doit être au format ISO 8601
- Le `slug` doit correspondre au nom du fichier HTML (sans extension)


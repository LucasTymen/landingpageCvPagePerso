# Landing Page CV Personnel - Lucas Tymen

Site web personnel présentant mes compétences en optimisation et automatisation.

## 🚀 Technologies

- **Next.js** 16.0.7 (versions sécurisées)
- **React** 19.2.1 (versions sécurisées)
- **TypeScript** (optionnel)

## 📦 Installation

```bash
npm install
```

## 🛠️ Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build

```bash
npm run build
npm start
```

## 🌐 Traductions (FR / EN)

Le site est bilingue. **Une seule source de contenu** pour les pages dynamiques (ex. Projets) :  
`public/content/site-content.json` (clés `fr` et `en`).

### Quand tu modifies le contenu

1. **Éditer** `public/content/site-content.json` : ajoute ou modifie le contenu dans la clé **`fr`** (titres, projets, landing pages, etc.).
2. **Traduire automatiquement** la clé **`en`** :
   ```bash
   node scripts/translate-content.js
   ```
   Ou avec [DeepL](https://www.deepl.com/pro-api) (meilleure qualité) :
   ```bash
   DEEPL_AUTH_KEY=ta-clé node scripts/translate-content.js
   ```
   Sans clé, le script tente d’utiliser LibreTranslate (gratuit).

Les pages `/projets.html` et `/en/projects.html` chargent ce JSON et affichent la langue selon `lang` du HTML. **Dès que tu mets à jour le JSON et relances la traduction, tout le site reste à jour en FR et EN.**

## 🚢 Déploiement (Vercel)

Le déploiement est déclenché par **GitHub**. Toujours pousser sur **origin** (GitHub) pour que Vercel prenne en compte les changements :

```bash
git push
```

- **origin** = GitHub → déclenche Vercel  
- **gitlab** = GitLab (miroir optionnel) : `git push gitlab main` si tu veux garder les deux à jour.

## 🔒 Sécurité

Ce projet utilise les versions sécurisées de Next.js et React recommandées par Vercel :
- Next.js 16.0.7
- React 19.2.1


#!/usr/bin/env node

/**
 * Script de génération automatique des fichiers articles.json (FR et EN)
 * Scanne les dossiers data/articles/ et data/articles-en/ et génère les fichiers JSON centralisés
 * 
 * Usage: node scripts/generate-blog.js
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR_FR = path.join(__dirname, '../data/articles');
const ARTICLES_DIR_EN = path.join(__dirname, '../data/articles-en');
const OUTPUT_FILE_FR = path.join(__dirname, '../data/articles.json');
const OUTPUT_FILE_EN = path.join(__dirname, '../data/articles-en.json');

function generateBlogIndex(lang = 'fr') {
  const articlesDir = lang === 'en' ? ARTICLES_DIR_EN : ARTICLES_DIR_FR;
  const outputFile = lang === 'en' ? OUTPUT_FILE_EN : OUTPUT_FILE_FR;
  const langLabel = lang === 'en' ? 'EN' : 'FR';
  
  console.log(`🔍 Scan du dossier articles ${langLabel}...`);
  
  // Vérifier que le dossier existe
  if (!fs.existsSync(articlesDir)) {
    console.error(`❌ Le dossier ${articlesDir} n'existe pas`);
    return;
  }
  
  // Lire tous les fichiers JSON
  const files = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(articlesDir, file));
  
  if (files.length === 0) {
    console.warn(`⚠️  Aucun fichier JSON trouvé dans le dossier articles ${langLabel}`);
    return;
  }
  
  console.log(`📄 ${files.length} fichier(s) JSON trouvé(s) (${langLabel})`);
  
  // Charger tous les articles
  const articles = [];
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const article = JSON.parse(content);
      
      // Valider les champs requis
      if (!article.id || !article.slug || !article.title || !article.date) {
        console.warn(`⚠️  Article invalide dans ${file}: champs requis manquants`);
        return;
      }
      
      articles.push(article);
      console.log(`  ✅ ${article.title}`);
    } catch (error) {
      console.error(`❌ Erreur lors de la lecture de ${file}:`, error.message);
    }
  });
  
  // Trier par date (plus récent en premier)
  articles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  
  // Filtrer uniquement les articles publiés
  const publishedArticles = articles.filter(a => a.published !== false);
  
  console.log(`\n📊 ${publishedArticles.length} article(s) publié(s) sur ${articles.length} total (${langLabel})`);
  
  // Écrire le fichier JSON
  try {
    fs.writeFileSync(
      outputFile,
      JSON.stringify(publishedArticles, null, 2),
      'utf8'
    );
    console.log(`\n✅ Fichier ${outputFile} généré avec succès !`);
    console.log(`   Articles triés du plus récent au plus ancien (${langLabel})`);
  } catch (error) {
    console.error(`❌ Erreur lors de l'écriture du fichier:`, error.message);
    process.exit(1);
  }
}

function generateAll() {
  console.log('🚀 Génération des index de blog (FR et EN)\n');
  generateBlogIndex('fr');
  console.log('\n');
  generateBlogIndex('en');
  console.log('\n✨ Génération terminée !');
}

// Exécuter le script
if (require.main === module) {
  generateAll();
}

module.exports = { generateBlogIndex, generateAll };


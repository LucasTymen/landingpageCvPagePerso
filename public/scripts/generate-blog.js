#!/usr/bin/env node

/**
 * Script de génération automatique du fichier articles.json
 * Scanne le dossier data/articles/ et génère un fichier JSON centralisé
 * 
 * Usage: node scripts/generate-blog.js
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '../data/articles');
const OUTPUT_FILE = path.join(__dirname, '../data/articles.json');

function generateBlogIndex() {
  console.log('🔍 Scan du dossier articles...');
  
  // Vérifier que le dossier existe
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.error(`❌ Le dossier ${ARTICLES_DIR} n'existe pas`);
    process.exit(1);
  }
  
  // Lire tous les fichiers JSON
  const files = fs.readdirSync(ARTICLES_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(ARTICLES_DIR, file));
  
  if (files.length === 0) {
    console.warn('⚠️  Aucun fichier JSON trouvé dans le dossier articles');
    return;
  }
  
  console.log(`📄 ${files.length} fichier(s) JSON trouvé(s)`);
  
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
  
  console.log(`\n📊 ${publishedArticles.length} article(s) publié(s) sur ${articles.length} total`);
  
  // Écrire le fichier JSON
  try {
    fs.writeFileSync(
      OUTPUT_FILE,
      JSON.stringify(publishedArticles, null, 2),
      'utf8'
    );
    console.log(`\n✅ Fichier ${OUTPUT_FILE} généré avec succès !`);
    console.log(`   Articles triés du plus récent au plus ancien`);
  } catch (error) {
    console.error(`❌ Erreur lors de l'écriture du fichier:`, error.message);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  generateBlogIndex();
}

module.exports = { generateBlogIndex };


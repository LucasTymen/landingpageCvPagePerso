#!/usr/bin/env python3
"""
Script pour ajouter Google Analytics 4 (gtag.js) à toutes les pages HTML
"""

import os
import re
from pathlib import Path

# Configuration GA4
GA4_CODE = '''    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NR6L88V61P"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-NR6L88V61P');
    </script>'''

def add_ga4_to_file(file_path):
    """Ajoute GA4 à un fichier HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Vérifier si GA4 est déjà présent
        if 'G-NR6L88V61P' in content and 'gtag(' in content:
            print(f"✅ GA4 déjà présent dans {file_path}")
            return
        
        # Ajouter GA4 après GTM dans le head
        gtm_pattern = r'(<!-- End Google Tag Manager -->)'
        if re.search(gtm_pattern, content):
            content = re.sub(
                gtm_pattern, 
                r'\1\n' + GA4_CODE + '\n', 
                content
            )
            print(f"✅ GA4 ajouté à {file_path}")
        else:
            print(f"⚠️  Pas de GTM trouvé dans {file_path}")
            return
        
        # Sauvegarder le fichier modifié
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
    except Exception as e:
        print(f"❌ Erreur avec {file_path}: {e}")

def main():
    """Fonction principale"""
    public_dir = Path('public')
    
    if not public_dir.exists():
        print("❌ Dossier 'public' non trouvé")
        return
    
    # Trouver tous les fichiers HTML
    html_files = list(public_dir.glob('*.html'))
    
    if not html_files:
        print("❌ Aucun fichier HTML trouvé dans le dossier public")
        return
    
    print(f"🔍 {len(html_files)} fichiers HTML trouvés")
    
    for html_file in html_files:
        add_ga4_to_file(html_file)
    
    print("\n🎉 Traitement terminé !")

if __name__ == "__main__":
    main()

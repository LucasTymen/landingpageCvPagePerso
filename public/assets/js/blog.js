// Blog JavaScript - Chargement dynamique des articles

let allArticles = [];
let filteredArticles = [];

// Charger les articles depuis le JSON
async function loadArticles() {
  try {
    const response = await fetch('/data/articles.json');
    allArticles = await response.json();
    // Trier par date (plus récent en premier)
    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    filteredArticles = [...allArticles];
    renderArticles();
    renderFilters();
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error);
  }
}

// Rendre les articles dans la grille
function renderArticles() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  if (filteredArticles.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 3rem;">Aucun article trouvé.</p>';
    return;
  }
  
  // Séparer les articles publiés et les teasers
  const publishedArticles = filteredArticles.filter(a => a.published);
  const teaserArticles = filteredArticles.filter(a => !a.published);
  
  let index = 0;
  
  // Afficher les articles publiés (structure identique aux projets)
  publishedArticles.forEach(article => {
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.setAttribute('data-reveal', '');
    card.style.setProperty('--d', `${index * 0.1}s`);
    
    const date = new Date(article.date);
    const dateStr = date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    card.innerHTML = `
      <h3>${article.title}</h3>
      <p><strong>${article.category || 'Article'}</strong> — ${article.excerpt}</p>
      <p style="color:var(--accent);font-weight:700">📅 ${dateStr} • ⏱️ ${article.readTime} min</p>
      ${article.tags && article.tags.length > 0 ? `
        <div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${article.tags.slice(0, 3).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
      <a class="cta cta-small" href="/articles/${article.slug}.html">Lire l'article</a>
    `;
    
    grid.appendChild(card);
    index++;
  });
  
  // Afficher les teasers (articles en chantier)
  teaserArticles.forEach(article => {
    const card = document.createElement('article');
    card.className = 'card reveal blog-teaser-card';
    card.setAttribute('data-reveal', '');
    card.style.setProperty('--d', `${index * 0.1}s`);
    
    const date = new Date(article.date);
    const dateStr = date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    card.innerHTML = `
      <span class="blog-teaser-badge">🏗️ En chantier</span>
      <h3>${article.title}</h3>
      <p><strong>${article.category || 'Article'}</strong> — ${article.excerpt}</p>
      <p style="color:var(--muted);font-weight:700">📅 ${dateStr} • ⏱️ ${article.readTime} min</p>
      ${article.tags && article.tags.length > 0 ? `
        <div style="margin: 1rem 0; display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${article.tags.slice(0, 3).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
    `;
    
    grid.appendChild(card);
    index++;
  });
  
  // Réinitialiser les animations
  setTimeout(() => {
    const newNodes = document.querySelectorAll('[data-reveal]:not(.in)');
    if ('IntersectionObserver' in window && newNodes.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
      newNodes.forEach(el => io.observe(el));
    }
  }, 100);
}

// Rendre les filtres
function renderFilters() {
  const filtersContainer = document.getElementById('blog-filters');
  if (!filtersContainer) return;
  
  // Extraire toutes les catégories et tags uniques
  const categories = [...new Set(allArticles.map(a => a.category).filter(Boolean))];
  const allTags = [...new Set(allArticles.flatMap(a => a.tags || []))];
  
  let filtersHTML = `
    <div class="blog-filter-group">
      <span class="blog-filter-label">Catégories:</span>
      <button class="blog-filter-button active" data-filter="category" data-value="all">Tous</button>
      ${categories.map(cat => `
        <button class="blog-filter-button" data-filter="category" data-value="${cat}">${cat}</button>
      `).join('')}
    </div>
    <div class="blog-filter-group">
      <span class="blog-filter-label">Tags:</span>
      <button class="blog-filter-button active" data-filter="tag" data-value="all">Tous</button>
      ${allTags.slice(0, 10).map(tag => `
        <button class="blog-filter-button" data-filter="tag" data-value="${tag}">${tag}</button>
      `).join('')}
    </div>
    <div class="blog-search">
      <input type="text" id="blog-search-input" placeholder="Rechercher un article...">
    </div>
  `;
  
  filtersContainer.innerHTML = filtersHTML;
  
  // Ajouter les event listeners
  document.querySelectorAll('.blog-filter-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll(`.blog-filter-button[data-filter="${btn.dataset.filter}"]`).forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      applyFilters();
    });
  });
  
  const searchInput = document.getElementById('blog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(applyFilters, 300));
  }
}

// Appliquer les filtres
function applyFilters() {
  const activeCategory = document.querySelector('.blog-filter-button[data-filter="category"].active')?.dataset.value;
  const activeTag = document.querySelector('.blog-filter-button[data-filter="tag"].active')?.dataset.value;
  const searchTerm = document.getElementById('blog-search-input')?.value.toLowerCase() || '';
  
  filteredArticles = allArticles.filter(article => {
    // Filtre par catégorie
    if (activeCategory && activeCategory !== 'all' && article.category !== activeCategory) {
      return false;
    }
    
    // Filtre par tag
    if (activeTag && activeTag !== 'all' && !article.tags?.includes(activeTag)) {
      return false;
    }
    
    // Filtre par recherche
    if (searchTerm) {
      const searchableText = `${article.title} ${article.excerpt} ${article.tags?.join(' ')}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });
  
  renderArticles();
}

// Fonction debounce pour la recherche
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Navigation entre articles (pour les pages d'articles individuels)
async function loadArticleNavigation() {
  const currentSlug = window.location.pathname.split('/').pop().replace('.html', '');
  
  try {
    const response = await fetch('/data/articles.json');
    const articles = await response.json();
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const currentIndex = articles.findIndex(a => a.slug === currentSlug);
    if (currentIndex === -1) return;
    
    const navContainer = document.getElementById('article-nav');
    if (!navContainer) return;
    
    let navHTML = '';
    
    // Article précédent
    if (currentIndex < articles.length - 1) {
      const prevArticle = articles[currentIndex + 1];
      navHTML += `
        <a href="/articles/${prevArticle.slug}.html" class="article-nav-link prev">
          <span class="nav-label">← Précédent</span>
          <span class="nav-title">${prevArticle.title}</span>
        </a>
      `;
    } else {
      navHTML += '<div></div>';
    }
    
    // Article suivant
    if (currentIndex > 0) {
      const nextArticle = articles[currentIndex - 1];
      navHTML += `
        <a href="/articles/${nextArticle.slug}.html" class="article-nav-link next">
          <span class="nav-label">Suivant →</span>
          <span class="nav-title">${nextArticle.title}</span>
        </a>
      `;
    }
    
    navContainer.innerHTML = navHTML;
  } catch (error) {
    console.error('Erreur lors du chargement de la navigation:', error);
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Si on est sur la page d'accueil du blog
  if (document.getElementById('blog-grid')) {
    loadArticles();
  }
  
  // Si on est sur une page d'article individuel
  if (document.getElementById('article-nav')) {
    loadArticleNavigation();
  }
});


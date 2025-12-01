const sampleProjects = [
  { 
    title: "Squid Research - Assistant recherche d'emploi", 
    tag: "Django + IA + Docker", 
    impact: "9 services Docker • 88% tests", 
    brief: "Plateforme d'automatisation intelligente avec Module Enriched (multi-sources), recherche LinkedIn, OAuth email, architecture Docker scalable. 29 tests unitaires, 88% couverture.", 
    link: "/squid-research.html" 
  },
  { 
    title: "Origin Traiteur - Automatisation Intelligente", 
    tag: "n8n + IA + PostgreSQL", 
    impact: "2 agents IA • Validation multi-canal", 
    brief: "Système d'automatisation avec 2 agents IA (Analyseur + Rédacteur) pour relancer automatiquement les devis. Architecture PostgreSQL, validation multi-canal (Gmail + Slack), tableau récapitulatif avec actions interactives.", 
    link: "#" 
  },
  { 
    title: "Parazar - Scraper automatisé", 
    tag: "Growth Hacking", 
    impact: "1er de promo", 
    brief: "Développement d'un scraper automatisé pour collecter des offres d'emploi tech avec dashboard de suivi des performances.", 
    link: "/parazar.html" 
  },
  { 
    title: "Avtis - Spoutnik65 Astral", 
    tag: "Projet d'études", 
    impact: "Présentation complète", 
    brief: "Projet d'études avec présentation détaillée des solutions développées et des résultats obtenus.", 
    link: "/avtis.html" 
  },
  { 
    title: "Engage Paris - Performance Max", 
    tag: "Google Ads", 
    impact: "Multi-régional", 
    brief: "Création et déploiement d'une campagne Google Ads Performance Max avec ciblage géographique multi-régional.", 
    link: "/engage-paris.html" 
  },
  { 
    title: "SEO & Analytics - Blog personnel", 
    tag: "Optimisation", 
    impact: "+40% trafic", 
    brief: "Analyse et amélioration du SEO d'un blog personnel avec utilisation de Google Analytics et Looker Studio.", 
    link: "/seo-project.html" 
  }
];

const grid = document.getElementById('projects-grid');
if (grid){
  sampleProjects.forEach((p, i) => {
    const el = document.createElement('article');
    el.className = 'card reveal';
    el.setAttribute('data-reveal', '');
    el.style.setProperty('--d', `${0.05 + i * 0.1}s`);
    el.innerHTML = `
      <h3>${p.title}</h3>
      <p><strong>${p.tag}</strong> — ${p.brief}</p>
      <p style="color:var(--accent);font-weight:700">${p.impact}</p>
      <a class="cta cta-small" href="${p.link}">Détails</a>
    `;
    grid.appendChild(el);
  });
  
  // Re-initialize animations for dynamically created elements
  setTimeout(() => {
    const newNodes = document.querySelectorAll('[data-reveal]:not(.in)');
    if ('IntersectionObserver' in window && newNodes.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            const el = entry.target;
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      }, { threshold: .15, rootMargin: '0px 0px -10% 0px' });
      newNodes.forEach(el => io.observe(el));
    }
  }, 100);
}



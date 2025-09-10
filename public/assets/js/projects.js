const sampleProjects = [
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
  },
  { 
    title: "Squid Research - Assistant recherche d'emploi", 
    tag: "Django + IA", 
    impact: "Backend fonctionnel", 
    brief: "Application web d'assistance à la recherche d'emploi avec automatisation IA. Django + n8n + Flowise pour optimiser CV, lettres de motivation et suivi de candidatures.", 
    link: "/squid-research.html" 
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
}



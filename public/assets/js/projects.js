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
    link: "/origin-traiteur.html" 
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

/** Landing pages commerciales : candidatures / livrables sous forme de sites dédiés */
const landingPagesCommerciales = [
  {
    title: "FitClem — Responsable Marketing Digital",
    sector: "Lifestyle / Fitness / Compléments",
    summary: "Lecture avancée de l'appareil marketing et propositions de valeur : étude complète (PESTEL, SWOT, Porter, concurrence), estimation SEO 132–324 k€/an, plan KPI 0–30 j / 30–60 j, proposition iconographique (rose poudré, orange CTA) et playbook claims.",
    tech: ["Next.js", "Vercel", "SEO", "Étude marketing", "KPI"],
    url: "https://lppp-fit-clem.vercel.app/",
    impact: "Étude marketing + SEO + plan d'action"
  },
  {
    title: "Ackuracy",
    sector: "Cybersécurité / Conformité",
    summary: "Landing candidature avec propositions de valeur alignées sur la charte graphique Ackuracy : positionnement, preuves et offre claire pour le recruteur.",
    tech: ["Next.js", "Vercel", "Charte Ackuracy", "UX"],
    url: "https://lppp-ackuracy-j7gfptes9-lucas-tymens-projects.vercel.app/",
    impact: "Propositions de valeur + charte marque"
  },
  {
    title: "0Flow — De la donnée à l'action automatisée",
    sector: "IA / BPA / Automatisation",
    summary: "Rapport d'audit d'automatisation offert : enjeux connecteurs, RGPD et cybersécurité, Python Glue Code, LLM Ops. Positionnement « spécialiste de la colle » entre outils, avec angle cybersécurité et maintenance des API.",
    tech: ["Next.js", "Vercel", "Python", "n8n", "Flowise", "SEO"],
    url: "https://lppp-0flow.vercel.app/",
    impact: "Audit automatisation + angle cybersécurité"
  },
  {
    title: "Yuwell — Portfolio charte graphique",
    sector: "Pharmacie / Équipement médical",
    summary: "Étude graphique pour dispositifs médicaux : système couleur par gamme produit, principes de design, charte graphique (palettes HEX, RGB, Pantone) et study cases structurés.",
    tech: ["HTML/CSS", "Design system", "Charte graphique", "Study case"],
    url: "https://lppp-yuwell-portfolio.vercel.app/",
    impact: "Charte graphique & design par gamme"
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
    
    // Empêcher le comportement par défaut pour les liens "#"
    const link = el.querySelector('a[href="#"]');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    }
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

// Landing pages commerciales
const landingGrid = document.getElementById('landing-pages-grid');
if (landingGrid && typeof landingPagesCommerciales !== 'undefined') {
  landingPagesCommerciales.forEach((lp, i) => {
    const article = document.createElement('article');
    article.className = 'card landing-page-card reveal';
    article.setAttribute('data-reveal', '');
    article.style.setProperty('--d', `${0.05 + i * 0.08}s`);
    const techTags = (lp.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join('');
    article.innerHTML = `
      <div class="landing-page-card-header">
        <h3>${lp.title}</h3>
        <span class="landing-page-sector">${lp.sector}</span>
      </div>
      <p class="landing-page-summary">${lp.summary}</p>
      <p class="landing-page-impact"><strong>${lp.impact}</strong></p>
      <div class="landing-page-tech">${techTags}</div>
      <a class="cta cta-small" href="${lp.url}" target="_blank" rel="noopener noreferrer">Voir la landing →</a>
    `;
    landingGrid.appendChild(article);
  });
  setTimeout(() => {
    const lpReveals = landingGrid.querySelectorAll('[data-reveal]:not(.in)');
    if ('IntersectionObserver' in window && lpReveals.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: .15, rootMargin: '0px 0px -10% 0px' });
      lpReveals.forEach(el => io.observe(el));
    }
  }, 100);
}



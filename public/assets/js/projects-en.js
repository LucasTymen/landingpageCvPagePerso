const sampleProjects = [
  { 
    title: "Squid Research - Job Search Assistant", 
    tag: "Django + AI + Docker", 
    impact: "9 Docker services • 88% tests", 
    brief: "Intelligent automation platform with Enriched Module (multi-sources), LinkedIn search, OAuth email, scalable Docker architecture. 29 unit tests, 88% coverage.", 
    link: "/en/squid-research.html" 
  },
  { 
    title: "Origin Traiteur - Intelligent Automation", 
    tag: "n8n + AI + PostgreSQL", 
    impact: "2 AI agents • Multi-channel validation", 
    brief: "Automation system with 2 AI agents (Analyzer + Writer) to automatically follow up on pending quotes. PostgreSQL architecture, multi-channel validation (Gmail + Slack), summary table with interactive actions.", 
    link: "/en/origin-traiteur.html" 
  },
  { 
    title: "Parazar - Dating Site", 
    tag: "Growth Hacking", 
    impact: "🏆 1st Place - 20/20", 
    brief: "Complete automation solution for a dating platform with matching algorithm, SEO optimization, and email deliverability improvements.", 
    link: "/en/parazar.html" 
  },
  { 
    title: "Avtis - Spoutnik65 Astral", 
    tag: "Study Project", 
    impact: "🏅 1st Team", 
    brief: "Containerized architecture project with Django + n8n + Flowise, GitLab CI/CD, and intelligent LLM workflows for business processes.", 
    link: "/en/avtis.html" 
  },
  { 
    title: "Engage Paris - Training", 
    tag: "Google Ads", 
    impact: "🥈 2nd Place UX/SEO", 
    brief: "Multi-regional Google Ads Performance Max campaign with optimized landing page and complete tracking setup.", 
    link: "/en/engage-paris.html" 
  },
  { 
    title: "SEO & Analytics - Personal Blog", 
    tag: "Optimization", 
    impact: "+40% traffic", 
    brief: "Analysis and improvement of personal blog SEO using Google Analytics and Looker Studio.", 
    link: "/en/seo-project.html" 
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
      <a class="cta cta-small" href="${p.link}">Details</a>
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

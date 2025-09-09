const sampleProjects = [
  { title: "+60% MQL en 90 jours", tag: "B2B SaaS", impact: "+60% MQL", brief: "Refonte lead scoring, paid + content, LP testing, routing SDR.", link: "#" },
  { title: "CAC -35% paid social", tag: "DTC", impact: "-35% CAC", brief: "Refonte creative engine, audiences, MMM light, incréments.", link: "#" },
  { title: "+22% activation onboarding", tag: "Produit", impact: "+22%", brief: "Emails/FTUX orientés aha moment, checklists, segmentation.", link: "#" }
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



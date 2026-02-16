/**
 * Page Projets / Projects — contenu depuis /content/site-content.json
 * Langue = document.documentElement.lang (fr | en)
 */
(function () {
  var lang = (document.documentElement.getAttribute('lang') || 'fr').slice(0, 2);
  if (lang !== 'fr' && lang !== 'en') lang = 'fr';

  function render(content) {
    if (!content || !content.projectsPage) return;
    var p = content.projectsPage;

    // Titres (une seule source)
    var titleEl = document.getElementById('projects-page-title');
    var subtitleEl = document.getElementById('projects-subtitle');
    var landingTitleEl = document.getElementById('landing-pages-title');
    var landingDescEl = document.getElementById('landing-pages-desc');
    if (titleEl) titleEl.textContent = p.title;
    if (subtitleEl) subtitleEl.textContent = p.subtitle;
    if (landingTitleEl) landingTitleEl.textContent = p.landingSectionTitle;
    if (landingDescEl) landingDescEl.textContent = p.landingSectionDescription;

    var detailsCta = p.detailsCta || 'Détails';
    var landingCta = p.landingCta || 'Voir la landing →';

    // Grille projets
    var grid = document.getElementById('projects-grid');
    if (grid && p.projects && p.projects.length) {
      grid.innerHTML = '';
      p.projects.forEach(function (proj, i) {
        var el = document.createElement('article');
        el.className = 'card reveal';
        el.setAttribute('data-reveal', '');
        el.style.setProperty('--d', (0.05 + i * 0.1) + 's');
        el.innerHTML =
          '<h3>' + escapeHtml(proj.title) + '</h3>' +
          '<p><strong>' + escapeHtml(proj.tag) + '</strong> — ' + escapeHtml(proj.brief) + '</p>' +
          '<p style="color:var(--accent);font-weight:700">' + escapeHtml(proj.impact) + '</p>' +
          '<a class="cta cta-small" href="' + escapeHtml(proj.link) + '">' + escapeHtml(detailsCta) + '</a>';
        grid.appendChild(el);
      });
      runReveal(grid);
    }

    // Grille landing pages
    var landingGrid = document.getElementById('landing-pages-grid');
    if (landingGrid && p.landingPages && p.landingPages.length) {
      landingGrid.innerHTML = '';
      p.landingPages.forEach(function (lp, i) {
        var article = document.createElement('article');
        article.className = 'card landing-page-card reveal';
        article.setAttribute('data-reveal', '');
        article.style.setProperty('--d', (0.05 + i * 0.08) + 's');
        var techTags = (lp.tech || []).map(function (t) { return '<span class="tech-tag">' + escapeHtml(t) + '</span>'; }).join('');
        article.innerHTML =
          '<div class="landing-page-card-header">' +
            '<h3>' + escapeHtml(lp.title) + '</h3>' +
            '<span class="landing-page-sector">' + escapeHtml(lp.sector) + '</span>' +
          '</div>' +
          '<p class="landing-page-summary">' + escapeHtml(lp.summary) + '</p>' +
          '<p class="landing-page-impact"><strong>' + escapeHtml(lp.impact) + '</strong></p>' +
          '<div class="landing-page-tech">' + techTags + '</div>' +
          '<a class="cta cta-small" href="' + escapeHtml(lp.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(landingCta) + '</a>';
        landingGrid.appendChild(article);
      });
      runReveal(landingGrid);
    }
  }

  function escapeHtml(s) {
    if (s == null) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function runReveal(container) {
    if (!container) return;
    setTimeout(function () {
      var nodes = container.querySelectorAll('[data-reveal]:not(.in)');
      if (typeof IntersectionObserver !== 'undefined' && nodes.length) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
        nodes.forEach(function (el) { io.observe(el); });
      }
    }, 100);
  }

  fetch('/content/site-content.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var content = data[lang] || data.fr;
      render(content);
    })
    .catch(function () {
      // Fallback si JSON absent : contenu FR minimal
      render({
        projectsPage: {
          title: lang === 'en' ? 'Projects & Case Studies' : 'Projets & études de cas',
          subtitle: lang === 'en' ? 'Growth Marketing, Full Stack Development and Web Design' : 'Growth Marketing, Développement Full Stack et Design Web',
          landingSectionTitle: lang === 'en' ? 'Commercial landing pages' : 'Landing pages commerciales',
          landingSectionDescription: lang === 'en' ? 'Application deliverables as dedicated sites.' : 'Candidatures et livrables sous forme de sites dédiés.',
          detailsCta: lang === 'en' ? 'Details' : 'Détails',
          landingCta: lang === 'en' ? 'View landing →' : 'Voir la landing →',
          projects: [],
          landingPages: []
        }
      });
    });
})();

// Charts and Infographics JavaScript for Parazar Project

class ParazarCharts {
  constructor() {
    this.tooltip = null;
    this.particles = [];
    this.init();
  }

  init() {
    this.createTooltip();
    this.createParticles();
    this.setupEventListeners();
    this.animateOnScroll();
  }

  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    this.tooltip.id = 'chart-tooltip';
    document.body.appendChild(this.tooltip);
  }

  createParticles() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles';
      container.appendChild(particlesContainer);
      
      this.generateParticles(particlesContainer);
    });
  }

  generateParticles(container) {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(particle);
    }

    // Continuous particle generation
    setInterval(() => {
      if (container.querySelectorAll('.particle').length < 20) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 8000);
      }
    }, 3000);
  }

  setupEventListeners() {
    // Data points hover effects
    const dataPoints = document.querySelectorAll('.data-point, .timeline-milestone');
    dataPoints.forEach(point => {
      point.addEventListener('mouseenter', (e) => this.showTooltip(e));
      point.addEventListener('mouseleave', () => this.hideTooltip());
      point.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
    });

    // Component boxes hover effects
    const componentBoxes = document.querySelectorAll('.component-box');
    componentBoxes.forEach(box => {
      box.addEventListener('mouseenter', (e) => this.showTooltip(e));
      box.addEventListener('mouseleave', () => this.hideTooltip());
      box.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
    });
  }

  showTooltip(event) {
    const element = event.target;
    const data = this.getElementData(element);
    
    if (data) {
      this.tooltip.innerHTML = data.content;
      this.tooltip.style.opacity = '1';
    }
  }

  hideTooltip() {
    this.tooltip.style.opacity = '0';
  }

  updateTooltipPosition(event) {
    this.tooltip.style.left = event.pageX + 10 + 'px';
    this.tooltip.style.top = event.pageY - 40 + 'px';
  }

  getElementData(element) {
    const dataset = element.dataset;
    
    if (dataset.value && dataset.week) {
      return {
        content: `<strong>Semaine ${dataset.week}</strong><br>Score SEO: ${dataset.value}/10`
      };
    }
    
    if (dataset.component) {
      return {
        content: `<strong>${dataset.component}</strong><br>${dataset.description || ''}`
      };
    }
    
    if (dataset.milestone) {
      return {
        content: `<strong>${dataset.milestone}</strong><br>${dataset.description || ''}`
      };
    }
    
    return null;
  }

  animateOnScroll() {
    const cards = document.querySelectorAll('.metric-card, .technique-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
      card.style.transform = 'translateY(20px)';
      card.style.opacity = '0';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });
  }

  // SEO Performance Chart
  createSEOPerformanceChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svg = `
      <svg class="chart-svg seo-chart" viewBox="0 0 800 350">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00bcd4"/>
            <stop offset="50%" style="stop-color:#6cf0ff"/>
            <stop offset="100%" style="stop-color:#0097a7"/>
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6cf0ff" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        
        <!-- Grid -->
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <!-- Axes -->
        <line x1="80" y1="300" x2="720" y2="300" stroke="#8bb3c7" stroke-width="2"/>
        <line x1="80" y1="300" x2="80" y2="50" stroke="#8bb3c7" stroke-width="2"/>
        
        <!-- Y-axis labels -->
        <text x="70" y="300" class="axis-label">0</text>
        <text x="70" y="250" class="axis-label">2</text>
        <text x="70" y="200" class="axis-label">4</text>
        <text x="70" y="150" class="axis-label">6</text>
        <text x="70" y="100" class="axis-label">8</text>
        <text x="70" y="60" class="axis-label">10</text>
        
        <!-- X-axis labels -->
        <text x="200" y="325" class="axis-label">Semaine 1</text>
        <text x="400" y="325" class="axis-label">Semaine 2</text>
        <text x="600" y="325" class="axis-label">Semaine 3</text>
        
        <!-- Curve -->
        <path d="M 200,162 Q 300,130 400,82 Q 500,40 600,10" class="curve-path"/>
        
        <!-- Data points -->
        <circle cx="200" cy="162" r="8" class="data-point" data-value="4.6" data-week="1"/>
        <circle cx="400" cy="82" r="8" class="data-point" data-value="7.2" data-week="2"/>
        <circle cx="600" cy="10" r="8" class="data-point" data-value="10.0" data-week="3"/>
        
        <!-- Icons -->
        <g transform="translate(180,140)">
          <circle r="15" fill="#6cf0ff" opacity="0.2"/>
          <path d="M-6,-8 L6,-8 L8,0 L6,8 L-6,8 L-8,0 Z M0,-4 L0,4" stroke="#6cf0ff" stroke-width="2" fill="none"/>
        </g>
        
        <g transform="translate(580,0)">
          <circle r="15" fill="#4caf50" opacity="0.2"/>
          <path d="M-6,0 L-2,4 L6,-4" stroke="#4caf50" stroke-width="3" fill="none"/>
        </g>
      </svg>
    `;
    
    container.innerHTML = svg;
  }

  // Architecture Diagram
  createArchitectureDiagram(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svg = `
      <svg class="chart-svg architecture-diagram" viewBox="0 0 800 500">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6cf0ff"/>
          </marker>
        </defs>
        
        <!-- Sources -->
        <rect x="50" y="50" width="120" height="80" class="component-box" data-component="Sources" data-description="LinkedIn, Indeed, WTTJ"/>
        <text x="110" y="95" class="component-text">Sources</text>
        
        <!-- Scraper -->
        <rect x="250" y="50" width="120" height="80" class="component-box" data-component="Scraper" data-description="Python + Scrapy + Selenium"/>
        <text x="310" y="95" class="component-text">Scraper</text>
        
        <!-- Database -->
        <rect x="450" y="50" width="120" height="80" class="component-box" data-component="Base de données" data-description="SQL pour stockage"/>
        <text x="510" y="95" class="component-text">Base SQL</text>
        
        <!-- Dashboard -->
        <rect x="650" y="50" width="120" height="80" class="component-box" data-component="Dashboard" data-description="Looker Studio"/>
        <text x="710" y="95" class="component-text">Dashboard</text>
        
        <!-- Automation -->
        <rect x="150" y="200" width="120" height="80" class="component-box" data-component="Automatisation" data-description="Zapier + APIs"/>
        <text x="210" y="245" class="component-text">Zapier</text>
        
        <!-- Analytics -->
        <rect x="350" y="200" width="120" height="80" class="component-box" data-component="Analytics" data-description="Métriques de performance"/>
        <text x="410" y="245" class="component-text">Analytics</text>
        
        <!-- Flow arrows -->
        <path d="M 170 90 L 250 90" class="flow-arrow"/>
        <path d="M 370 90 L 450 90" class="flow-arrow"/>
        <path d="M 570 90 L 650 90" class="flow-arrow"/>
        <path d="M 310 130 L 210 200" class="flow-arrow"/>
        <path d="M 510 130 L 410 200" class="flow-arrow"/>
      </svg>
    `;
    
    container.innerHTML = svg;
  }

  // Timeline Chart
  createTimelineChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const svg = `
      <svg class="chart-svg timeline-chart" viewBox="0 0 800 200">
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00bcd4"/>
            <stop offset="100%" style="stop-color:#6cf0ff"/>
          </linearGradient>
        </defs>
        
        <!-- Timeline track -->
        <rect x="50" y="90" width="700" height="20" class="timeline-track"/>
        <rect x="50" y="90" width="700" height="20" class="timeline-progress"/>
        
        <!-- Milestones -->
        <circle cx="150" cy="100" r="12" class="timeline-milestone" data-milestone="Semaine 1" data-description="Audit SEO initial"/>
        <circle cx="400" cy="100" r="12" class="timeline-milestone" data-milestone="Semaine 2" data-description="Optimisations techniques"/>
        <circle cx="650" cy="100" r="12" class="timeline-milestone" data-milestone="Semaine 3" data-description="Résultats finaux"/>
        
        <!-- Labels -->
        <text x="150" y="140" class="axis-label">Début</text>
        <text x="400" y="140" class="axis-label">Optimisation</text>
        <text x="650" y="140" class="axis-label">Final</text>
      </svg>
    `;
    
    container.innerHTML = svg;
  }
}

  // Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const charts = new ParazarCharts();
  
  // Create charts if containers exist
  if (document.getElementById('seo-performance-chart')) {
    charts.createSEOPerformanceChart('seo-performance-chart');
  }
  
  if (document.getElementById('architecture-diagram')) {
    charts.createArchitectureDiagram('architecture-diagram');
  }
  
  if (document.getElementById('timeline-chart')) {
    charts.createTimelineChart('timeline-chart');
  }
  
  // Initialize SEO particles system
  if (document.getElementById('particles-seo')) {
    charts.initializeSEOParticles();
  }
  
  // Initialize main SEO particles system
  if (document.getElementById('particles-seo-main')) {
    charts.initializeMainSEOParticles();
  }
});

// Additional SEO particles system
ParazarCharts.prototype.initializeSEOParticles = function() {
  const container = document.getElementById('particles-seo');
  if (!container) return;
  
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(particle);
  }
  
  // Continuous particle generation
  setInterval(() => {
    if (container.querySelectorAll('.particle').length < 30) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 8000);
    }
  }, 2000);
};

// Main SEO particles system (complete integration)
ParazarCharts.prototype.initializeMainSEOParticles = function() {
  const container = document.getElementById('particles-seo-main');
  if (!container) return;
  
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(particle);
  }
  
  // Continuous particle generation
  setInterval(() => {
    if (container.querySelectorAll('.particle').length < 30) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 8000);
    }
  }, 2000);
  
  // Tooltip system for data points
  const tooltip = document.getElementById('chart-tooltip');
  const dataPoints = document.querySelectorAll('.data-point');
  
  dataPoints.forEach(point => {
    point.addEventListener('mouseenter', (e) => {
      const value = e.target.dataset.value;
      const week = e.target.dataset.week;
      tooltip.innerHTML = `<strong>Semaine ${week}</strong><br>Score SEO: ${value}/10`;
      tooltip.style.opacity = '1';
    });
    
    point.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
    
    point.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.pageX + 10 + 'px';
      tooltip.style.top = e.pageY - 40 + 'px';
    });
  });
  
  // Animate cards on scroll
  const cards = document.querySelectorAll('.metric-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
      }
    });
  });
  
  cards.forEach(card => {
    card.style.transform = 'translateY(20px)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
};

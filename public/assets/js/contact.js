// Contact form handling - sécurisé sans injection SQL
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const title = document.getElementById('contact-title');
  const subtitle = document.getElementById('contact-subtitle');
  
  // Check if this is an audit request
  const urlParams = new URLSearchParams(window.location.search);
  const isAudit = urlParams.get('audit') === 'gratuit';
  
  if (isAudit) {
    if (title) title.textContent = '🎯 Audit Gratuit de vos Processus';
    if (subtitle) subtitle.textContent = 'Découvrez les opportunités d\'optimisation de votre entreprise. Réponse sous 24h.';
    
    // Add audit-specific fields
    const formContainer = form.parentNode;
    const auditInfo = document.createElement('div');
    auditInfo.style.cssText = 'background: rgba(108, 240, 255, 0.1); border: 1px solid rgba(108, 240, 255, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 24px;';
    auditInfo.innerHTML = `
      <h3 style="color: var(--accent); margin: 0 0 12px 0; font-size: 18px;">🎯 Ce que vous obtiendrez :</h3>
      <ul style="margin: 0; padding-left: 20px; color: var(--muted);">
        <li>Analyse de 3 processus clés de votre entreprise</li>
        <li>Estimation des économies potentielles</li>
        <li>Plan d'action priorisé avec recommandations techniques</li>
        <li>Durée : 30 minutes • Réponse sous 24h • 100% gratuit</li>
      </ul>
    `;
    formContainer.insertBefore(auditInfo, form);
  }
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Récupération et validation des données
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validation côté client
      if (!name || !email || !message) {
        showStatus('Veuillez remplir tous les champs.', 'error');
        return;
      }
      
      if (name.length < 2) {
        showStatus('Le nom doit contenir au moins 2 caractères.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showStatus('Veuillez entrer une adresse email valide.', 'error');
        return;
      }
      
      if (message.length < 10) {
        showStatus('Le message doit contenir au moins 10 caractères.', 'error');
        return;
      }
      
      // Protection contre l'injection (sanitisation basique)
      const sanitizedName = sanitizeInput(name);
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedMessage = sanitizeInput(message);
      
      // Simulation d'envoi (en production, envoyer vers un serveur sécurisé)
      showStatus('Envoi en cours...', 'info');
      
      setTimeout(() => {
        // Créer un mailto sécurisé
        const subject = isAudit ? 
          `Demande d'audit gratuit - ${sanitizedName}` :
          `Contact depuis le site - ${sanitizedName}`;
        const body = isAudit ?
          `Demande d'audit gratuit de processus\n\nNom: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}\n\n---\nDemande d'audit gratuit - Réponse sous 24h` :
          `Nom: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`;
        const mailtoLink = `mailto:lucas.tymen@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Ouvrir le client email
        window.location.href = mailtoLink;
        
        const successMessage = isAudit ?
          'Demande d\'audit envoyée ! Votre client email s\'ouvre. Je vous répondrai dans les 24h avec votre analyse personnalisée.' :
          'Votre client email s\'ouvre. Vous pouvez envoyer le message directement.';
        
        showStatus(successMessage, 'success');
        form.reset();
      }, 1000);
    });
  }
  
  function showStatus(message, type) {
    status.textContent = message;
    status.style.display = 'block';
    status.style.background = type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 
                             type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 
                             'rgba(0, 225, 255, 0.1)';
    status.style.borderColor = type === 'error' ? '#ff0000' : 
                               type === 'success' ? '#00ff00' : 
                               'var(--accent)';
    status.style.color = type === 'error' ? '#ff0000' : 
                        type === 'success' ? '#00ff00' : 
                        'var(--accent)';
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function sanitizeInput(input) {
    // Suppression des caractères potentiellement dangereux
    return input
      .replace(/[<>]/g, '') // Supprime < et >
      .replace(/javascript:/gi, '') // Supprime javascript:
      .replace(/on\w+=/gi, '') // Supprime les attributs onclick, onload, etc.
      .substring(0, 1000); // Limite la longueur
  }
});



// Contact form handling - sécurisé sans injection SQL
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
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
        const subject = encodeURIComponent(`Contact depuis le site - ${sanitizedName}`);
        const body = encodeURIComponent(`Nom: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`);
        const mailtoLink = `mailto:lucas.tymen@gmail.com?subject=${subject}&body=${body}`;
        
        // Ouvrir le client email
        window.location.href = mailtoLink;
        
        showStatus('Votre client email s\'ouvre. Vous pouvez envoyer le message directement.', 'success');
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



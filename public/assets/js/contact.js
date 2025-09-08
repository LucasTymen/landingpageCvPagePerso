const form = document.getElementById('contact-form');
if (form){
  form.addEventListener('submit', (e) => {
    // Allow normal submit but add UX feedback
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Envoi…';
    setTimeout(() => { btn.disabled = false; btn.textContent = 'Envoyer'; }, 4000);
  });
}



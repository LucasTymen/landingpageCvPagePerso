// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;
  const id = target.getAttribute('href');
  const el = document.querySelector(id);
  if (el){
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
  }
});

// Subtle parallax on hero orbs
const orbs = document.querySelectorAll('.orb');
window.addEventListener('mousemove', (e) => {
  const { innerWidth:w, innerHeight:h } = window;
  const x = (e.clientX - w/2) / w;
  const y = (e.clientY - h/2) / h;
  orbs.forEach((orb, i) => {
    const depth = (i+1) * 8;
    orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});



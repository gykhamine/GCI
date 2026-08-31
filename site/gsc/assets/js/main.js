// Gykhamine — main JS
(function () {
  // Burger menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  // Contact form (front-only demo — pas d'envoi réel)
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      if (!name || !email || !message) {
        msg.textContent = 'Merci de remplir les champs obligatoires (nom, email, message).';
        msg.className = 'form-msg err';
        return;
      }
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok) {
        msg.textContent = 'Adresse email invalide.';
        msg.className = 'form-msg err';
        return;
      }
      msg.textContent = 'Merci ! Votre message a bien été préparé. (Démo : connectez un service de formulaires côté backend pour l\'envoi réel.)';
      msg.className = 'form-msg ok';
      form.reset();
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.card, .value, .kpi, .service-block, .two-col > div').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });
})();

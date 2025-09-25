document.addEventListener('DOMContentLoaded', function () {

  const titles = [
    'Mahasiswa',
    'Frontend Developer',
    'Backend Developer',
    'Fullstack Developer',
    'Mobile Developer',
    'Violet Lovers',
    'All Role',
    'InsyaAllah'
  ];
  let idx = 0;
  const titleEl = document.getElementById('rotating-title');

  function changeTitle() {
    titleEl.classList.add('shift');

    setTimeout(() => {
      idx = (idx + 1) % titles.length;
      titleEl.textContent = titles[idx];

      titleEl.classList.remove('shift');
    }, 260); 
  }

  const rotateInterval = setInterval(changeTitle, 2200);

  titleEl.addEventListener('mouseenter', () => clearInterval(rotateInterval));
  titleEl.addEventListener('focus', () => clearInterval(rotateInterval));

  const ham = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  ham.addEventListener('click', () => {
    const shown = mobileMenu.hasAttribute('hidden') ? false : true;
    if (shown) {
      mobileMenu.setAttribute('hidden', '');
    } else {
      mobileMenu.removeAttribute('hidden');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (!mobileMenu.hasAttribute('hidden')) mobileMenu.setAttribute('hidden', '');
    });
  });

  const eduCards = document.querySelectorAll('.edu-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  eduCards.forEach(card => observer.observe(card));

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  (function adaptSkillsTrack() {
    const track = document.getElementById('skills-track');
    if (!track) return;
    const viewportWidth = document.querySelector('.skills-viewport').offsetWidth;
    if (track.scrollWidth < viewportWidth * 1.5) {
      const html = track.innerHTML;
      track.innerHTML = html + html + html + html + html; 
    }
  })();

  const certCards = document.querySelectorAll('.cert-card');
  const certObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('show');
        }, i * 200); // delay biar muncul satu-satu
        certObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  certCards.forEach(card => certObserver.observe(card));

});

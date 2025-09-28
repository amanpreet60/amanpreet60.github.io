// main.js — smooth nav highlight and footer year
document.addEventListener('DOMContentLoaded', function () {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav link active state using IntersectionObserver
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links
    .map(l => {
      const id = l.getAttribute('href')?.replace('#','');
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const options = {
      root: null,
      rootMargin: '0px 0px -40% 0px', // trigger a bit earlier
      threshold: 0
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (link) {
          if (entry.isIntersecting) {
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    }, options);

    sections.forEach(s => obs.observe(s));
  } else {
    // fallback: add click behavior to highlight
    links.forEach(l => l.addEventListener('click', () => {
      links.forEach(x => x.classList.remove('active'));
      l.classList.add('active');
    }));
  }
});

// Mobile navigation menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.nav-hamburger');

  if (navLinks) navLinks.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.nav-hamburger');

  document.querySelectorAll('.nav-link, .nav-cta').forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    });
  });

  // Services two-panel logic
  const layout = document.querySelector('.services-layout');
  const panel = document.getElementById('servicePanel');
  const panelContent = document.getElementById('panelContent');
  const panelClose = panel ? panel.querySelector('.panel-close') : null;
  const cards = [...document.querySelectorAll('.service-card[data-service]')];

  if (!layout || !panel || !panelContent) return;

  let activeId = null;

  function openService(id) {
    const source = document.getElementById('detail-' + id);
    if (!source) return;

    cards.forEach((c) => c.setAttribute('aria-expanded', 'false'));
    const card = cards.find((c) => c.dataset.service === id);
    if (card) card.setAttribute('aria-expanded', 'true');

    panelContent.innerHTML = source.innerHTML;
    panel.hidden = false;
    panel.style.animation = 'none';
    panel.offsetHeight;
    panel.style.animation = '';
    layout.classList.add('panel-open');
    activeId = id;
  }

  function closePanel() {
    cards.forEach((c) => c.setAttribute('aria-expanded', 'false'));
    panel.hidden = true;
    layout.classList.remove('panel-open');
    activeId = null;
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.service;
      if (activeId === id) {
        closePanel();
      } else {
        openService(id);
      }
    });
  });

  if (panelClose) {
    panelClose.addEventListener('click', closePanel);
  }
});

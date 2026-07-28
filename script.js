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

  const buttons = [...document.querySelectorAll('.learn-more[aria-controls]')];

  function closePanel(button, immediate = false) {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const card = button.closest('.service-card');
    if (!panel) return;

    button.setAttribute('aria-expanded', 'false');
    button.childNodes[0].nodeValue = 'Learn More ';
    card?.classList.remove('is-active');

    if (immediate) {
      panel.hidden = true;
      panel.classList.remove('is-opening', 'is-closing');
      return;
    }

    panel.classList.remove('is-opening');
    panel.classList.add('is-closing');
    window.setTimeout(() => {
      panel.hidden = true;
      panel.classList.remove('is-closing');
    }, 250);
  }

  function openPanel(button) {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const card = button.closest('.service-card');
    if (!panel) return;

    buttons.forEach((otherButton) => {
      if (otherButton !== button && otherButton.getAttribute('aria-expanded') === 'true') {
        closePanel(otherButton, true);
      }
    });

    button.setAttribute('aria-expanded', 'true');
    button.childNodes[0].nodeValue = 'Show Less ';
    card?.classList.add('is-active');
    panel.hidden = false;
    panel.classList.remove('is-closing');

    requestAnimationFrame(() => {
      panel.classList.add('is-opening');
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      if (isOpen) closePanel(button);
      else openPanel(button);
    });
  });

  document.querySelectorAll('.service-panel-close').forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
      const panel = closeButton.closest('.service-details');
      const button = buttons.find(
        (candidate) => candidate.getAttribute('aria-controls') === panel?.id
      );
      if (button) closePanel(button);
    });
  });
});

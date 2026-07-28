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

  const buttons = [...document.querySelectorAll('.learn-more')];

  function collapsePanel(button) {
    const card = button.closest('.service-card');
    const details = card.querySelector('.service-details');
    if (!details) return;

    button.setAttribute('aria-expanded', 'false');
    button.childNodes[0].nodeValue = 'Learn More ';
    card.classList.remove('is-expanded');

    details.style.maxHeight = details.scrollHeight + 'px';
    requestAnimationFrame(() => {
      details.style.maxHeight = '0';
    });
  }

  function expandPanel(button) {
    const card = button.closest('.service-card');
    const details = card.querySelector('.service-details');
    if (!details) return;

    buttons.forEach((otherButton) => {
      if (otherButton !== button && otherButton.getAttribute('aria-expanded') === 'true') {
        collapsePanel(otherButton);
      }
    });

    button.setAttribute('aria-expanded', 'true');
    button.childNodes[0].nodeValue = 'Show Less ';
    card.classList.add('is-expanded');

    details.style.maxHeight = details.scrollHeight + 'px';

    const onEnd = () => {
      if (button.getAttribute('aria-expanded') === 'true') {
        details.style.maxHeight = 'none';
      }
      details.removeEventListener('transitionend', onEnd);
    };
    details.addEventListener('transitionend', onEnd);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      if (isOpen) collapsePanel(button);
      else expandPanel(button);
    });
  });
});

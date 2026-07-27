// Mobile navigation menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.nav-hamburger');

  if (navLinks) navLinks.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open');
}

// Close the mobile menu after selecting a navigation link
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.nav-hamburger');

  document.querySelectorAll('.nav-link, .nav-cta').forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
    });
  });
});

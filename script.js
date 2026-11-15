// GVX TECH interactions and lightweight animations (no 3D artwork replacement).
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Scroll-in effects for the content sections.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Gentle pointer parallax moves only the frame/effects, never edits the source artwork.
const visual = document.querySelector('.hero-visual');
const artFrame = document.querySelector('.robot-art-frame');
if (visual && artFrame && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  visual.addEventListener('pointermove', event => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    artFrame.style.setProperty('--pointer-x', `${x * 8}px`);
    artFrame.style.setProperty('--pointer-y', `${y * 8}px`);
  });
  visual.addEventListener('pointerleave', () => {
    artFrame.style.setProperty('--pointer-x', '0px');
    artFrame.style.setProperty('--pointer-y', '0px');
  });
}

// Contact form prepares an email enquiry. Replace with your official inbox before launch.
const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`GVX TECH Website Enquiry - ${data.get('service')}`);
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('message') || 'Not provided'}`
  );
  window.location.href = `mailto:hello@gvxtech.com?subject=${subject}&body=${body}`;
  const note = document.getElementById('formNote');
  if (note) note.textContent = 'Your email app should open with the enquiry details. Replace hello@gvxtech.com with your official email before publishing.';
});

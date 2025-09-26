// tiny helpers + nav state + footer year
const $ = (s, c=document) => c.querySelector(s);

document.addEventListener('DOMContentLoaded', () => {
  // active nav link by path
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const page = a.getAttribute('href');
    if (page === here) a.classList.add('active');
  });

  // year
  $('#year') && ($('#year').textContent = new Date().getFullYear());
});

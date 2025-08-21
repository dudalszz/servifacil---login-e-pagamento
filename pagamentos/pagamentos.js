document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');

  if (!hamburger || !sidebar) return;

  // Abre/fecha sidebar ao clicar no botão
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('active');
  });

  // Fecha sidebar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!sidebar.classList.contains('active')) return;
    if (sidebar.contains(e.target) || hamburger.contains(e.target)) return;
    sidebar.classList.remove('active');
  });

  // Se redimensionar para desktop, garante sidebar aberta
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('active');
    }
  });
});

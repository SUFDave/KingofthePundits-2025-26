// Main interactivity: page routing + expand/collapse for stats + mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const pages = {
    'home': document.getElementById('home'),
    'league-tables': document.getElementById('league-tables'),
    'weekly-picks': document.getElementById('weekly-picks'),
  };

  // Simple client-side routing (no hashes)
  function showPage(name){
    Object.values(pages).forEach(p => p.classList.add('hidden'));
    const page = pages[name];
    if(page) page.classList.remove('hidden');
    // update active links
    document.querySelectorAll('.nav-list a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === name);
    });
  }

  // Init default
  showPage('home');

  // Nav link clicks
  document.querySelectorAll('.nav-list a[data-page]').forEach(a => {
    a.addEventListener('click', function(e){
      e.preventDefault();
      const page = this.dataset.page;
      showPage(page);
      // collapse mobile menu if open
      document.getElementById('primary-menu').classList.remove('show');
      document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
    });
  });

  // Stat toggles
  document.querySelectorAll('.stat-toggle').forEach(btn => {
    btn.addEventListener('click', function(){
      const target = this.dataset.target;
      const el = document.getElementById(target);
      if(!el) return;
      const isHidden = el.classList.toggle('hidden');
      // rotate icon
      const icon = this.querySelector('.toggle-icon');
      if(icon) icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(45deg)';
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', function(){
    const menu = document.getElementById('primary-menu');
    const isShown = menu.classList.toggle('show');
    this.setAttribute('aria-expanded', isShown ? 'true' : 'false');
  });

});

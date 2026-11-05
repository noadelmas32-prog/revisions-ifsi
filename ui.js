// Navigation téléphone : bouton « Plus » et retour en haut de page.
(()=>{
  const nav=document.querySelector('nav[aria-label="Navigation principale"]');
  const more=document.getElementById('nav-more');
  if(!nav||!more)return;
  const close=()=>{nav.classList.remove('more-open');more.setAttribute('aria-expanded','false')};
  const syncMore=()=>more.classList.toggle('active',!!nav.querySelector('button[data-secondary].active'));
  more.addEventListener('click',e=>{e.stopPropagation();const open=!nav.classList.contains('more-open');nav.classList.toggle('more-open',open);more.setAttribute('aria-expanded',String(open))});
  nav.addEventListener('click',e=>{const b=e.target.closest('button[data-page]');if(!b)return;close();setTimeout(syncMore,0);if(window.matchMedia('(max-width:850px)').matches)window.scrollTo({top:0})});
  document.addEventListener('click',e=>{if(!nav.contains(e.target))close();setTimeout(syncMore,0)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();

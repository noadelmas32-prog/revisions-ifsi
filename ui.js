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

// Secret : toucher 5 fois la croix du logo (ou taper « secret » dans la recherche).
(()=>{
  const dlg=document.getElementById('secret-dialog'),mark=document.querySelector('.brand-mark');
  if(!dlg||!mark)return;
  const show=()=>{if(!dlg.open)dlg.showModal();mark.classList.add('secret-pop');setTimeout(()=>mark.classList.remove('secret-pop'),600)};
  let taps=0,timer;
  mark.style.cursor='pointer';
  mark.addEventListener('click',()=>{taps++;clearTimeout(timer);mark.classList.remove('secret-tap');void mark.offsetWidth;mark.classList.add('secret-tap');if(taps>=5){taps=0;show()}timer=setTimeout(()=>taps=0,2500)});
  document.getElementById('secret-close')?.addEventListener('click',()=>dlg.close());
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
  document.getElementById('site-search')?.addEventListener('input',e=>{if(e.target.value.trim().toLowerCase()==='secret')show()});
})();

let installPrompt=null;
const installButton=document.getElementById('install-app');
const installDialog=document.getElementById('install-dialog');
const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
if(standalone())installButton.hidden=true;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;installButton.hidden=false});
window.addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true;installDialog.close()});
installButton.addEventListener('click',async()=>{
 if(installPrompt){const prompt=installPrompt;installPrompt=null;await prompt.prompt();await prompt.userChoice;return;}
 const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 document.getElementById('install-steps').textContent=ios?'Ouvre ce site dans Safari. Appuie sur le bouton Partager, puis sur « Sur l’écran d’accueil ». Active « Ouvrir comme app » si cette option apparaît, puis appuie sur « Ajouter ».':'Dans le menu de ton navigateur, choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ». Si cette option n’apparaît pas, ouvre le site dans Chrome ou Edge et réessaie.';
 installDialog.showModal();
});
document.getElementById('close-install').addEventListener('click',()=>installDialog.close());
installDialog.addEventListener('click',event=>{if(event.target===installDialog){const rect=installDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)installDialog.close()}});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));

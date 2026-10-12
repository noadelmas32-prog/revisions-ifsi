const CACHE='ifsi-qcm-mobile-v26';
const ASSETS=['/','/index.html','/style.css','/data.js','/courses.js','/app.js','/interactions.js','/images/cellule.webp','/images/autoclave.webp','/images/membrane.webp','/images/coeur-fr.webp','/images/meiose.webp','/images/systemes-1.webp','/images/systemes-2.webp','/images/hygiene-mains.webp','/images/phospholipide.webp','/images/plans-anatomiques.webp','/images/regions-corps.webp','/images/eau.webp','/images/dilution.webp','/images/bacterie.webp','/images/diffusion.webp','/images/coeur.webp','/images/epithelium.webp','/images/conjonctif.webp','/images/muscles.webp','/images/nerveux.webp','/install.js','/manifest.webmanifest','/favicon.svg','/icon-192.png','/icon-512.png','/icon-maskable.png','/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ifsi-qcm-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const url=new URL(event.request.url);if(!ASSETS.includes(url.pathname))return;
 event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)))}return response}).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match('/'):Response.error()))));
});

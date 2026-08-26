(async function(){
  const names = ['logo','fachada','g1','g2','g3','g4','g5','g6','g7','g8'];
  const map = {};
  await Promise.all(names.map(async n=>{
    try {
      const r = await fetch('img/'+n+'.b64');
      const t = await r.text();
      map[n] = 'data:image/jpeg;base64,'+t.trim();
    } catch(e){}
  }));
  document.querySelectorAll('img[src^="img/"]').forEach(img=>{
    const m = img.getAttribute('src').match(/img\/(\w+)\.jpg/);
    if(m && map[m[1]]) img.src = map[m[1]];
  });
  if(window.__setCarouselSources && map.g1){
    window.__setCarouselSources(names.filter(n=>n.startsWith('g')).map(n=>map[n]));
  }
  const pixel = document.getElementById('pixelSrcImg');
  if(pixel && map.fachada) pixel.src = map.fachada;
})();

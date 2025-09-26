// Renders cards from gallery.json into #gallery
function openImgModal(src, caption){
  const m = document.getElementById('imgModal');
  document.getElementById('imgModalImg').src = src;
  document.getElementById('imgModalCap').textContent = caption || '';
  m.style.display = 'flex';
}
function closeImgModal(){ document.getElementById('imgModal').style.display='none'; }

document.addEventListener('DOMContentLoaded', async () => {
  const wrap = document.getElementById('gallery');
  if (!wrap) return;
  try{
    const data = await fetch('gallery.json').then(r => r.json());
    // expected shape: [{src:"assets/img/waffle.png", caption:"Waffle sandwich"}, ...]
    const html = data.map(it => `
      <article class="card">
        <img loading="lazy" src="${it.src}" alt="${it.caption||''}" />
        <div class="row space"><h3>${it.caption||'Untitled'}</h3>
          <div class="actions"><a class="btn" href="${it.src}" download>Download</a>
          <button class="btn" onclick="openImgModal('${it.src.replace(/'/g,"\\'")}', '${(it.caption||'').replace(/'/g,"\\'")}')">View</button></div>
        </div>
      </article>
    `).join('');
    wrap.innerHTML = html;
  }catch(err){
    wrap.innerHTML = `<p class="muted">Couldn’t load gallery.json</p>`;
    console.error(err);
  }
});

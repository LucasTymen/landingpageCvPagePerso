(async function renderCV(){
  try{
    // Prefer markdown if present, fallback to HTML
    const mdResp = await fetch('/resources/lucas_cv_markdown(1).md');
    if (mdResp.ok){
      const text = await mdResp.text();
      document.getElementById('cv-container').innerHTML = marked.parse(text);
      return;
    }
  }catch(_){/* ignore */}
  try{
    const htmlResp = await fetch('/resources/lucas_cv_html(1).html');
    if (htmlResp.ok){
      const html = await htmlResp.text();
      document.getElementById('cv-container').innerHTML = html;
      return;
    }
  }catch(err){
    console.error(err);
  }
  document.getElementById('cv-container').textContent = "Impossible de charger le CV pour le moment.";
})();



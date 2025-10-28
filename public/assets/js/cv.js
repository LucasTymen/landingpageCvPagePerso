(async function renderCV(){
  try{
    // Determine language based on current path
    const isEnglish = window.location.pathname.startsWith('/en/');
    const mdFile = isEnglish ? '/lucas_cv_markdown_en.md' : '/lucas_cv_markdown(1).md';
    const fallbackText = isEnglish ? "Unable to load resume at the moment." : "Impossible de charger le CV pour le moment.";
    
    // Prefer markdown if present, fallback to HTML
    const mdResp = await fetch(mdFile);
    if (mdResp.ok){
      const text = await mdResp.text();
      document.getElementById('cv-container').innerHTML = marked.parse(text);
      return;
    }
  }catch(_){/* ignore */}
  try{
    const htmlResp = await fetch('/lucas_cv_html(1).html');
    if (htmlResp.ok){
      const html = await htmlResp.text();
      document.getElementById('cv-container').innerHTML = html;
      return;
    }
  }catch(err){
    console.error(err);
  }
  document.getElementById('cv-container').textContent = fallbackText;
})();



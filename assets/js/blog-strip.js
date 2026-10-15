/* Faixa dos últimos artigos de Saúde. Insere conteúdo antes do rodapé existente. */
(function(){
  "use strict";
  if(document.getElementById("geb-blog-health"))return;
  const css=document.createElement("link");
  css.rel="stylesheet";css.href="/assets/css/blog-strip.css";document.head.append(css);
  const section=document.createElement("section");
  section.id="geb-blog-health";
  section.className="geb-blog-health";
  section.setAttribute("aria-labelledby","geb-blog-health-title");
  const container=document.createElement("div");container.className="geb-blog-health__container";
  const top=document.createElement("div");top.className="geb-blog-health__top";
  const intro=document.createElement("div");
  const eyebrow=document.createElement("span");eyebrow.className="geb-blog-health__eyebrow";eyebrow.textContent="BLOG GEB · SAÚDE";
  const title=document.createElement("h2");title.id="geb-blog-health-title";title.className="geb-blog-health__title";title.textContent="Conteúdos para cuidar e refletir";
  const subtitle=document.createElement("p");subtitle.className="geb-blog-health__intro";subtitle.textContent="Conheça os três artigos mais recentes da editoria Saúde do Blog GEB.";
  intro.append(eyebrow,title,subtitle);
  const all=document.createElement("a");
  all.href="https://blog.grupoeduardabispo.com.br/?categoria=Sa%C3%BAde";
  all.className="geb-blog-health__all";all.textContent="Ver todos os artigos de Saúde →";
  top.append(intro,all);
  const frame=document.createElement("iframe");
  frame.className="geb-blog-health__frame";
  frame.title="Três artigos mais recentes do Blog GEB na categoria Saúde";
  frame.src="https://blog.grupoeduardabispo.com.br/assets/embed.html?categoria=Sa%C3%BAde&limite=3";
  frame.loading="lazy";frame.setAttribute("referrerpolicy","strict-origin-when-cross-origin");
  container.append(top,frame);section.append(container);
  const footer=document.querySelector("footer");
  if(footer){footer.parentNode.insertBefore(section,footer);}
  else{const main=document.querySelector("main");if(main)main.after(section);else document.body.append(section);}
  window.addEventListener("message",function(e){
    if(e.origin!=="https://blog.grupoeduardabispo.com.br"||e.source!==frame.contentWindow)return;
    const data=e.data;
    if(!data||data.type!=="geb-blog-embed-height")return;
    const h=Number(data.height);
    if(Number.isFinite(h)&&h>=100&&h<=5000)frame.style.height=Math.ceil(h)+"px";
  });
})();

(function(){
  const APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbw9AOUITXXFUgxs2dc_9IkSCF733FUKri7FkLiKCpqal2YHhH4ftuk-ykIO0gIm1tpy/exec";
  const forms=document.querySelectorAll('.capture-form');

  forms.forEach(form=>{
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      if(!form.reportValidity()) return;

      const button=form.querySelector('button[type="submit"]');
      const feedback=form.querySelector('.form-feedback');
      const service=form.dataset.service;
      const destination=form.dataset.destination||'';

      // Pré-abre a nova aba durante a ação do usuário para evitar bloqueio de pop-up.
      const destinationWindow=destination ? window.open('about:blank','_blank') : null;
      if(destinationWindow) destinationWindow.opener=null;

      const payload={
        nome:form.nome.value.trim(),
        whatsapp:form.whatsapp.value.trim(),
        email:form.email.value.trim(),
        servicoResultado:service,
        origem:form.origem.value,
        etapa:'Novo'
      };

      button.disabled=true;
      feedback.textContent='Registrando seus dados...';

      try{
        await fetch(APPS_SCRIPT_URL,{
          method:'POST',
          mode:'no-cors',
          headers:{'Content-Type':'text/plain;charset=utf-8'},
          body:JSON.stringify(payload)
        });

        if(service==='psicoterapia'){
          if(destinationWindow) destinationWindow.close();
          const offer=document.getElementById('oferta-psicoterapia');
          offer.hidden=false;
          offer.scrollIntoView({behavior:'smooth',block:'start'});
          feedback.textContent='Cadastro concluído. Confira abaixo o valor e as condições.';
        }else if(destination){
          feedback.textContent='Cadastro concluído. A oferta foi aberta em uma nova aba.';
          if(destinationWindow){
            destinationWindow.location.replace(destination);
          }else{
            const link=document.createElement('a');
            link.href=destination;
            link.target='_blank';
            link.rel='noopener noreferrer';
            link.click();
          }
        }
      }catch(err){
        if(destinationWindow) destinationWindow.close();
        feedback.textContent='Não foi possível registrar seus dados agora. Tente novamente.';
      }finally{
        button.disabled=false;
      }
    });
  });
})();
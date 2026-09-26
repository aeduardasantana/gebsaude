(function(){
  const APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbx_c00-BZDd4ulwCfNsAFZh_h5IjzW0qradQtN0l97lbqE6CG8Noi2XHhA7NDoPsMPE/exec";
  const forms=document.querySelectorAll('.capture-form');

  forms.forEach(form=>{
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      if(!form.reportValidity()) return;

      const button=form.querySelector('button[type="submit"]');
      const feedback=form.querySelector('.form-feedback');
      const service=form.dataset.service;
      const destination=form.dataset.destination||'';
      const emailField=form.elements.email;

      const destinationWindow=destination ? window.open('about:blank','_blank') : null;
      if(destinationWindow) destinationWindow.opener=null;

      const payload={
        nome:form.nome.value.trim(),
        whatsapp:form.whatsapp.value.trim(),
        email:emailField ? emailField.value.trim() : '',
        servicoResultado:service,
        origem:form.origem.value,
        etapa:'Novo',
        consentimento:form.consentimento.checked ? 'sim' : 'nao',
        pagina:location.href,
        dataHora:new Date().toISOString()
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

        form.reset();

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
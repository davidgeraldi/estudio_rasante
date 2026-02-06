document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById("forms");
    // const campoObrigatorio = document.querySelectorAll('.obrigatorio');
    const inputs = document.querySelectorAll(".inputs");
    const botaoEnviar = document.getElementsByClassName('btn-submit');
    if (formulario) {
        inputs.forEach(input => {
            input.addEventListener('blur', (event) => {
                // O event.target é o input que acabou de perder o foco
                const campoDesteInput = event.target.nextElementSibling;
    
                if (event.target.value.trim() === '') {
                    campoDesteInput.classList.remove("desativado");
                } 
                else {
                    campoDesteInput.classList.add("desativado");
                }
            });
        });
    
        formulario.addEventListener('submit', event => {
            event.preventDefault(); // Para o envio automático
    
            const serviceID = 'service_96nhrla';
            const templateID = 'template_p3tl8pa';
    
            // 1. Criamos uma variável para controlar se o formulário está válido
            let formularioValido = true;
    
            // 2. Verificamos TODOS os inputs de uma vez só
            inputs.forEach(input => {
                const msgErro = input.nextElementSibling; // O parágrafo de erro que vimos antes
    
                if (input.value.trim() === '') {
                    formularioValido = false;
                    // Mostra o alerta visual para este campo específico
                    if (msgErro) msgErro.classList.remove("desativado");
                } 
                else {
                    // Esconde o alerta se o campo estiver preenchido
                    if (msgErro) msgErro.classList.add("desativado");
                }
            });
    
            // 3. Só envia o e-mail se DEPOIS do loop o formulário continuar válido
            if (formularioValido) {
                // Feedback visual para o usuário não clicar duas vezes
                botaoEnviar.innerText = "Enviando...";
                botaoEnviar.disabled = true;
    
                emailjs.sendForm(serviceID, templateID, formulario)
                    .then(() => {
                        alert('Email enviado para a empresa!');
                        formulario.reset();
                    })
                    .catch((err) => {
                        alert('Falha ao enviar: ' + JSON.stringify(err));
                    })
                    .finally(() => {
                        // Restaura o botão independente de sucesso ou erro
                        botaoEnviar.innerText = "Enviar";
                        botaoEnviar.disabled = false;
                    });
            } 
        });
    }
});
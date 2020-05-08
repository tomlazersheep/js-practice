//Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const enviarBtn = document.getElementById('enviar');
const formularioEmail = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

//Funciones
const inicioApp = () => {
}

const setOk = (nodeObj) => {
    nodeObj.style.borderBottomColor = 'green';
    nodeObj.classList.remove('error');
}

const setError = (nodeObj) => {
    nodeObj.style.borderBottomColor = 'red';
    nodeObj.classList.add('error');
}

const validateField = (e) => {
    //validar mensaje
    e.target.classList.remove('not-initialized');
    if (e.target.value.length) {
        setOk(e.target);
    } else {
        setError(e.target);
    }

    //Check for @ at emails
    if (e.target.type == 'email') {
        if (e.target.value.includes('@')) {
            setOk(e.target);
        } else {
            setError(e.target);
        }
    }


    if (!document.querySelectorAll('.error').length && 
        !document.querySelectorAll('.not-initialized').length) {
        enviarBtn.disabled = false;
    } else {
        enviarBtn.disabled = true;
    } 
}

const submitEmail = (e) => {
    e.preventDefault();
    console.log('envian2222');
    
    document.getElementById('spinner').style.display = 'block';

    const sent = document.createElement('img');
    sent.src = 'img/mail.gif';
    sent.style.display = 'block';

    setTimeout(()=> {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('loaders').appendChild(sent);

        setTimeout(()=>{
            sent.remove();
            formularioEmail.reset();
        }, 2000);
    }, 3000);
}

function resetForm(e) {
    e.preventDefault();
    formularioEmail.reset();
    email.classList.remove('error');
    email.classList.add('not-initialized');
    asunto.classList.remove('error');
    asunto.classList.add('not-initialized');
    mensaje.classList.remove('error');
    mensaje.classList.add('not-initialized');
    enviarBtn.disabled = 'true';
}

//EventListeners

(function(){
    document.addEventListener('DOMContentLoaded', inicioApp);
    email.addEventListener('input', validateField);
    asunto.addEventListener('input', validateField);
    mensaje.addEventListener('input', validateField);
    formularioEmail.addEventListener('submit', submitEmail);
    resetBtn.addEventListener('click', resetForm);
})();
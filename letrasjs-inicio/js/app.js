import { 
    Interface, 
    form, 
    formContainer, 
    messageContainer, 
    resultContainer 
} from './interfaz.js';

import { Api } from './api.js';

const apiLyrics = new Api('https://api.lyrics.ovh/v1');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //get data 

    const artist = document.getElementById('artista').value;
    const song = document.getElementById('cancion').value;

    if (artist && song) {
        apiLyrics.requestLyrics(artist, song)
        .then((response)=> {
            response.json().then( responseJson => {
                if (response.status == 200) {
                    resultContainer.innerHTML = responseJson.lyrics;
                } else {
                    messageContainer.innerHTML = 'No se encontró la canción.';
                    messageContainer.classList.add('error');
                    setTimeout(() => {
                        messageContainer.innerHTML = '';
                        messageContainer.classList.remove('error');
                    }, 3000);
                }
            });
        });
    } else {
        messageContainer.innerHTML = 'Hay algún campo vacío...';
        messageContainer.classList.add('error');
        setTimeout(()=>{
            messageContainer.innerHTML = '';
            messageContainer.classList.remove('error');
        },3000);
    }
});
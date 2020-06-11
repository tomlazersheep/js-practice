const cargarNombre = (e) => {
    e.preventDefault();
    const pais = document.querySelector('#origen option:checked').value;
    const genero = document.querySelector('#genero option:checked').value;
    const numero = document.getElementById('numero').value;
    
    if(pais && genero && numero){
        let url = 'http://uinames.com/api/?';
        url += `region=${pais}&`;
        url += `gender=${genero}&`;
        url += `amount=${numero}`;
        console.log(url);
        
    }
        
}


document.getElementById('generar-nombre').addEventListener('submit',cargarNombre);
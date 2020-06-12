document.getElementById('txtBtn').addEventListener('click',textAPI);
document.getElementById('jsonBtn').addEventListener('click', jsonAPI);
document.getElementById('apiBTN').addEventListener('click',apiAPI);

function textAPI(){
    fetch('datos.txt').then((response) => {
        return (response.text());
    }).then(data =>{
        console.log(data);
        
    });
}

function jsonAPI(e){
    e.preventDefault();
    fetch('empleados.json')
    .then( response => {
        return response.json();
    }).then(data => {
        console.log(data);
        
    });
}

function apiAPI(e){
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
    })
    .catch(arg => console.log(arg));
}



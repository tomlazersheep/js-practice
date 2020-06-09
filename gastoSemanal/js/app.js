//consts
const presupuestoUsuario = prompt('cual es tu presuspuesto semanal?');
let cantidadPresupuesto, ui; 

//Classes
class Presupuesto {
    constructor (presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //restar del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad)
    }
}

class Interfaz {
    insertarPresupuesto(cantidad) {
        document.getElementById('total').innerText = cantidad;
    }
    insertarRestante(cantidad) {
        document.getElementById('restante').innerText = cantidad;
    }
    imprimirMensaje(mensaje = 'Mensaje random yay!', tipo = 'alert-success') {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert', tipo);
        divMensaje.appendChild(document.createTextNode(mensaje));
        document.querySelector('.primario').insertBefore(divMensaje, document.getElementById('agregar-gasto'));
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
    agregarGasto(nombre,importe){
        const gastoLi = document.createElement('li');
        gastoLi.classList.add('list-group','item-d-flex','justify-content-between','align-items-center');
        gastoLi.innerHTML = `
            ${nombre} <span class="badge badge-primary badge-pill">$${importe}</span>
        `;
        document.querySelector('#gastos ul').appendChild(gastoLi);
    }
    acomodarColorRestante(presup){
        const restante = document.querySelector('.restante');
        
        if(presup.restante < 0){
            restante.classList.remove('alert-success','alert-warning');
            restante.classList.add('alert-danger');
        }else if (presup.restante < (presup.presupuesto*0.25)) {
            
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        } 
    }
}

//Eventos 

//al arrancar Set Up
document.addEventListener('DOMContentLoaded', ()=> {
    if (!presupuestoUsuario || presupuestoUsuario == '') {
        window.location.reload();
    }
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
    ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    ui.insertarRestante(cantidadPresupuesto.restante)
});

// Al agregar gasto 

document.getElementById('agregar-gasto').addEventListener('submit',(e)=>{
    e.preventDefault();
    const nombreGasto = document.getElementById('gasto').value;
    const importeGasto = document.getElementById('cantidad').value;

    if (nombreGasto && importeGasto) {
        ui.imprimirMensaje('Correcto','alert-success');
        ui.insertarRestante(cantidadPresupuesto.presupuestoRestante(importeGasto));
        ui.agregarGasto(nombreGasto,importeGasto);
        ui.acomodarColorRestante(cantidadPresupuesto);
        document.getElementById('agregar-gasto').reset();
        
    } else {
        ui.imprimirMensaje('Te falta alguna cosa crack','alert-danger');
    }
    
});
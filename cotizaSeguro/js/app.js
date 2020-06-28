
document.addEventListener('DOMContentLoaded', function(){
    function Seguro(marca, anio, plan){
        this.marca = marca;
        this.anio = anio;
        this.plan = plan;
    }
    const base = 2000;
    const multiplicadoresPorModelo = [1, 1.15, 1.05, 1.35];
    const marcasPorIndex = ['','Americano','Asiatico', 'Europeo'];

    Seguro.prototype.cotizarSeguro = function(){
        let precio = base * multiplicadoresPorModelo[this.marca];
        const antiguedad = new Date().getFullYear() - this.anio;
        precio *= (1 - (antiguedad*0.03));
        precio = this.plan == 'completo' ? precio*1.6 : precio*1.3;
        
        return precio;
    }

    function Interfaz(){}

    Interfaz.prototype.mostrarError = function(mensaje, tipo) {
        const response = document.createElement('div');
        response.classList.add(tipo == 'error' ? 'error' : 'correcto', 'mensaje');
        response.innerHTML = mensaje;
        formulario.insertBefore(response, document.querySelector('.form-group'));
        setTimeout(function() {
            const error = document.querySelector('.error')
            if (error) {
                error.remove();   
            }
            const correcto = document.querySelector('.correcto');
            if (correcto) {
                correcto.remove();    
            }
        },3000);
    }

    Interfaz.prototype.mostrarSeguro = function(seguro, total ){
        const resultado = document.getElementById('resultado');
        
        if (resultado.children.length) {
            console.log(resultado.children);
            
            Array.from(resultado.children).forEach((child) => child.remove());
        }

        const resultado4Insert = document.createElement('div');
        resultado4Insert.innerHTML = `
            Tu Seguro:
            <br>Marca ${marcasPorIndex[seguro.marca]}
            <br>Anio ${seguro.anio}
            <br>Tipo de Seguro: ${seguro.plan}
            <br>Cotizacion: $ ${total}
        `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){
            spinner.style.display = 'none';
            
            resultado.appendChild(resultado4Insert);
        },800);
        
    }

    const formulario = document.getElementById('cotizar-seguro');
    formulario.addEventListener('submit',function(e) {
        e.preventDefault();

        const marca = document.getElementById('marca');
        const marcaSeleccionada = marca.options[marca.selectedIndex].value;
        const yearSelected = document.getElementById('anio').options[document.getElementById('anio').selectedIndex].value;
        const planSeleccionado = document.querySelector('input[name="tipo"]:checked').value;
        
        const interfaz = new Interfaz();
        
        if (marcaSeleccionada == '' || yearSelected == 'default') {
            interfaz.mostrarError('faltan datos amigo vofi vofi','error');
        } else {
            const seguro = new Seguro(marcaSeleccionada,yearSelected,planSeleccionado);
            interfaz.mostrarSeguro(seguro, seguro.cotizarSeguro());
            
        }

    });

    const maxYear = new Date().getFullYear();
    const minYear = maxYear - 20;
    
    const yearList = document.getElementById('anio');
    const option0 = document.createElement('option');
    option0.textContent = 'Anio';
    option0.value = 'default';
    yearList.appendChild(option0);
    
    for (let y = maxYear; y >= minYear; y--) {
        const option = document.createElement('option');
        option.textContent = String(y);
        option.value = String(y);
        
        yearList.appendChild(option);    
    }

});
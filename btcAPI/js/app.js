// instancias de interfaces y conexiones a apis
const ui = new Interface();
const api = new API('1312864c52493452484c24775b0c93ff9b670c3d20647124032a40fbd8b786f2');

//generar options para las criptomonedas
api.getCryptoCoinsFromAPI().then(data => {
    ui.buildCryptoOptions(data.Data)
});


// leer formulario
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', e => {
    e.preventDefault();

    //leer moneda
    const monedaSelect = document.getElementById('moneda');
    const monedaSelected = monedaSelect.options[monedaSelect.selectedIndex].value;
    
    const cryptoSelect = document.getElementById('criptomoneda');
    const cryptoSelected = cryptoSelect.options[cryptoSelect.selectedIndex].value;

    if (monedaSelected && cryptoSelected) {
        //campos llenos, continuar
        ui.showLoader(true);
        api.getCryptoValueBySymbol(monedaSelected, cryptoSelected).then(conversion => {
            setTimeout(()=>{
                ui.showLoader(false);
                ui.showResult(monedaSelected, cryptoSelected, conversion.RAW[cryptoSelected][monedaSelected]);
            },2000);
        });
        
    } else {
        // campo vacio
        ui.showMessage('Ambos campos son obligatorios','alert bg-danger text-center');
    }

})
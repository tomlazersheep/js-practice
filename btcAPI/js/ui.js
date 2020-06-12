class Interface {
    showMessage(message = '', classes = '') {
        const div = document.createElement('div');
        div.className = classes;
        div.appendChild(document.createTextNode(message));
        document.querySelector('.mensajes').appendChild(div);
        setTimeout(()=> div.remove() ,2000);
    }

    buildCryptoOptions(cryptoCoinsData) {
        let options = `<option value="">Elige Criptomoneda</option>`;
        Object.entries(cryptoCoinsData).forEach(elem => {
            options += `<option value="${elem[1].Symbol}">${elem[1].CoinName}</option>`;
        });
        document.getElementById('criptomoneda').innerHTML = options;
        //codigo de ejemplo que me parece una garcha pero esta interesante el for
        /*
        for ( const [key, value] of Object.entries(cryptoCoinsData) ) {
            bla bla bla mi for each la rompe
        }
        */
    }

    showResult(fiatSymbol, cryptoSymbol, conversionData){
        console.log(conversionData);
        
        const price = conversionData.PRICE.toFixed(2);
        const pct = conversionData.CHANGEPCTDAY.toFixed(2);
        const lastUpdated = new Date(conversionData.LASTUPDATE * 1000).toLocaleDateString('es-AR');
        const htmlTemplate = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El precio de ${conversionData.FROMSYMBOL} a moneda 
                    ${conversionData.TOSYMBOL} es de: $ ${price}</p>
                    <p>Variación último día %${pct}</p>
                    <p>Última actualización: ${lastUpdated}</p>
                </div>
            </div>
        `;

        document.getElementById('resultado').innerHTML = htmlTemplate;
    }

    showLoader(flag){
        const spinner = document.querySelector('.contenido-spinner');
        if (flag) {
            spinner.style.display = 'block';
        } else {
            spinner.style.display = 'none';
        }
    }
}
class API {
    constructor(APIkey) {
        this.APIkey = APIkey;
    }
    async getCryptoCoinsFromAPI() {
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.APIkey}`;

        const cryptoCoinsResponse = await fetch(url);

        const cryptoCoinsData = await cryptoCoinsResponse.json();

        return cryptoCoinsData;
    }

    async getCryptoValueBySymbol(fiatSymbol,cryptoSymbol) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbol}&tsyms=${fiatSymbol}&api_key=${this.APIkey}`;
        
        const conversionResponse = await fetch(url);
        
        return await conversionResponse.json();
    }
}
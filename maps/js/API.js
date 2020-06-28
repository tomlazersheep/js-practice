class UI {
    constructor() {

        this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([-34.6131500, -58.3772300], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;

    }

    async getProvinces() {
        const provincesResponse = await fetch('http://apis.datos.gob.ar/georef/api/provincias');
        return await provincesResponse.json();
    }

    showPins(data) {
        this.markers.clearLayers();
        data.forEach(provincia => {
            // destructuring
            const {id, nombre, centroide: {lat, lon}} = provincia;
            // create marker
            const marker = new L.marker([lat,lon]);
            // bind popup to marker
            marker.bindPopup(`Id: ${id} <br/> Nombre: ${nombre}`).openPopup();
            // add marker as a layer
            this.markers.addLayer(marker);
            
        });
        this.markers.addTo(this.mapa);
    }
    searchOnApi(data) {
        this.getProvinces().then((response)=>{
            const provincesRaw = response.provincias;
            const provincesProcessed = provincesRaw.filter((province)=> province.nombre.toLowerCase().includes(data.toLowerCase()));
            this.showPins(provincesProcessed);
        });
    }

}
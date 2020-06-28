document.addEventListener('DOMContentLoaded',()=> {
    const ui = new UI();
    ui.getProvinces().then(provinces => {
        ui.showPins(provinces.provincias);
    });
    const searchInput =  document.querySelector('#buscar input');

    searchInput.addEventListener('input', (e) => {
        e.preventDefault();
        if (searchInput.value.length > 4) {
            ui.searchOnApi(searchInput.value);
        } else if (searchInput.value.length == 0) {
            ui.getProvinces().then(provinces => {
                ui.showPins(provinces.provincias);
            });     
        }
        
    });
});
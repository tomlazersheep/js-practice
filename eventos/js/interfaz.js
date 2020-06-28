class Interface {

    printCategories(data) {
        let htmlCatergories = '';
        htmlCatergories += `<option value="">Seleccionar Categoría</option>`;
        data.forEach(category => {
            htmlCatergories += `<option value="${category.id}">${category.name}</option>`;
        });
        const selectCategories = document.getElementById('listado-categorias');
        selectCategories.innerHTML = htmlCatergories;
    }
    
}
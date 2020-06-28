const eventbriteApi = new EventBrite();
const ui = new Interface();

//Start Up categories
eventbriteApi.getCategories().then(categoriesData => {
    ui.printCategories(categoriesData.categories);
}).catch(error => {
    console.log(error);
});

//Form submit with button click
document.getElementById('buscarBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    const searchTerm = document.getElementById('evento').value;
    const categorySelect = document.getElementById('listado-categorias')
    const selectedCategory = categorySelect.options[categorySelect.selectedIndex].value;
    
    eventbriteApi.getEvents(searchTerm,selectedCategory)
    .then(events => {
        console.log(events);
        
    });
    
});
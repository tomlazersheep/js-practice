class EventBrite {
    constructor(){
        this.token_auth = 'LLXP47CTASNQS4QH43AA';
        this.order = 'date';
    }

    async getCategories() {
        const categoriesResponse = await fetch(`https://www.eventbriteapi.com/v3/categories?token=${this.token_auth}`);
        return await categoriesResponse.json();
    }

    async getEvents(searchTerm, selectedCategory){
        let url = `https://www.eventbriteapi.com/v3/events/search/?token=${this.token_auth}`;
        url += `&category_id=${selectedCategory}&q=${searchTerm}`;
        const eventsResponse = await fetch(url);
        return await eventsResponse.json();
    }
}
const KEY = '23221080-2cf2140e9411e0421a0100dec';
const BASE_URL = 'https://pixabay.com/api/';

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhoto() {
        const url = `${BASE_URL}&key=${KEY}&q=${this.searchQuery}&per_page=12&page=${this.page}`;
        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
                this.page += 1;
                return hits;

            });

    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}
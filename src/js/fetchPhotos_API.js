export default class NewsApiService {
  _BASE_URL = 'https://pixabay.com/api/';
  _API_KEY = '34198243-210bab7eda00f7845d389eb7b';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPhotos() {
    try {
      const response = await fetch(
        `${this._BASE_URL}?key=${this._API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      this.incrementPage();
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
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

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34198243-210bab7eda00f7845d389eb7b';
let page = 1;

async function fetchPhotos(valueSearch) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${valueSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    page += 1;
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export { fetchPhotos };

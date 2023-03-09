import { refs } from './js/refs.js';
import NewsApiService from './js/fetchPhotos_API.js';
import { createSearchMarkup } from './js/createMarkup.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

loadBtnHidden();

const Api_Service = new NewsApiService();

const onSearchForm = e => {
  e.preventDefault();

  clearMarkupContainer();
  Api_Service.query = e.currentTarget.elements.searchQuery.value.trim();
  Api_Service.resetPage();

  if (Api_Service.query === '') {
    Notiflix.Notify.failure('Please enter your search data.');
    return;
  }

  fetchPhotosMap();

  refs.searchForm.reset();
};

const onLoadMore = () => {
  fetchPhotosMap();
};

let currentPageHits = 0;

const fetchPhotosMap = async () => {
  const response = await Api_Service.fetchPhotos();
  try {
    currentPageHits += response.hits.length;
    response.hits.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        createSearchMarkup({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        });
      }
    );
    notifyNotImages(response);
    notifyTotalHits(response);
    notifyEndImagesHits(response);
    loadMoreBtnAppears(response);
  } catch (error) {
    console.log(error);
  }
};

const clearMarkupContainer = () => {
  refs.photoCardsMarkup.innerHTML = '';
};

const notifyNotImages = response => {
  if (response.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
};

let hasNotiflixBeenShown = false;

const notifyTotalHits = response => {
  if (!hasNotiflixBeenShown) {
    loadBtnHidden();
    Notiflix.Notify.info(`Hooray! We found ${response.totalHits} images.`);
    hasNotiflixBeenShown = true;
    return;
  }
};

const notifyEndImagesHits = response => {
  if (currentPageHits >= response.totalHits) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
};

const loadMoreBtnAppears = response => {
  if (response.totalHits > 40)
    setTimeout(() => {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }, 500);
};

function loadBtnHidden() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

const lightBoxImages = evt => {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  let gallery = new SimpleLightbox('.gallery .photo-card__image', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  gallery.refresh();
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.photoCardsMarkup.addEventListener('click', lightBoxImages);

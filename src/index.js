import { refs } from './js/refs.js';
import NewsApiService from './js/fetchPhotos_API.js';
import { renderSearchMarkup } from './js/markup-service.js';
import Notiflix from 'notiflix';

let currentPageHits = 0;

const Api_Service = new NewsApiService();

const onSearchForm = async e => {
  e.preventDefault();

  clearMarkupContainer();
  Api_Service.query = e.currentTarget.elements.searchQuery.value.trim();
  Api_Service.resetPage();

  if (Api_Service.query === '') {
    Notiflix.Notify.failure('Please enter your search data.');
    loadBtnHidden();
    return;
  }

  try {
    const { hits, totalHits } = await Api_Service.fetchPhotos();
    currentPageHits = hits.length;
    renderSearchMarkup(hits);
    loadBtnRemoveHidden();
    notifyNotImages(hits);
    notifyTotalHits(totalHits);
    notifyEndImagesHits(currentPageHits, totalHits);
  } catch (error) {
    console.log(error);
  }

  refs.searchForm.reset();
};

const onLoadMore = async () => {
  try {
    const { hits, totalHits } = await Api_Service.fetchPhotos();
    renderSearchMarkup(hits);
    currentPageHits += hits.length;
    notifyEndImagesHits(currentPageHits, totalHits);
  } catch (error) {
    console.log(error);
  }
};

function loadBtnHidden() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function loadBtnRemoveHidden() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

const clearMarkupContainer = () => {
  refs.photoCardsMarkup.innerHTML = '';
};

const notifyNotImages = hits => {
  if (hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadBtnHidden();
    return;
  }
};

const notifyTotalHits = totalHits => {
  if (totalHits > 0) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    return;
  }
};

const notifyEndImagesHits = (currentPageHits, totalHits) => {
  if (currentPageHits >= totalHits) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadBtnHidden();
    return;
  }
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

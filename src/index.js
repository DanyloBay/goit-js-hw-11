import { refs } from './js/refs.js';
import { fetchPhotos } from './js/fetchPhotos.js';
import Notiflix from 'notiflix';

const onSearchForm = e => {
  e.preventDefault();

  const valueInSearchField = e.currentTarget.elements.searchQuery.value.trim();

  fetchPhotos(valueInSearchField).then(response => {
    if (response.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
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
  });

  refs.searchForm.reset();
};

const createSearchMarkup = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  const cardMarkup = `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
          </div>`;

  refs.photoCardsMarkup.insertAdjacentHTML('beforeend', cardMarkup);
};

refs.searchForm.addEventListener('submit', onSearchForm);

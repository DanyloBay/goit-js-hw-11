import { refs } from './js/refs.js';
import { fetchPhotos } from './js/fetchPhotos.js';
import { createSearchMarkup } from './js/createMarkup.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

let valueInSearchField = '';

refs.loadMoreBtn.classList.add('is-hidden');

const onSearchForm = e => {
  e.preventDefault();

  valueInSearchField = e.currentTarget.elements.searchQuery.value.trim();

  if (valueInSearchField === '') {
    Notiflix.Notify.failure('Please enter your search data.');
    return;
  }

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

  setTimeout(() => {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }, 500);
};

const onLoadMore = () => {
  fetchPhotos(valueInSearchField).then(response => {
    if (response.hits.length === response.totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
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
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// if (currentValue !== valueInSearchField) {
//   resetPage();
//   return;
// }

// const lightBoxImages = e => {
//   e.preventDefault();

//   let gallery = new SimpleLightbox('.gallery .gallery__item');
//   gallery.on('show.simplelightbox', {
//     captions: true,
//     captionsData: 'alt',
//     captionPosition: 'bottom',
//     captionDelay: 250,
//   });

//   gallery.refresh();
// };

import { refs } from './refs.js';

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
            <a class="photo-card__image" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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

export { createSearchMarkup };

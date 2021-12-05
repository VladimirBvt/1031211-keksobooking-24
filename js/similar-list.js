import {noticesRandom} from './data.js';

// создание и отрисовка похожих объявлений
const cardsContainer = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarNotices = noticesRandom;
const clearPhotosContainer = function () {
  const photoContainer = similarCardTemplate.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
};
clearPhotosContainer();

const Default = {
  TYPE: 'bungalow',
  PRICE: 1000,
  ROOMS: 2,
  CAPACITY: 2,
};

const getNoticeRank = (notice) => {
  const typeInput = document.querySelector('[name="type"]');
  const priceInput = document.querySelector('[name="price"]');
  const roomsInput = document.querySelector('[name="rooms"]');
  const capacityInput = document.querySelector('[name="capacity"]');

  let rank = 0;

  if (notice.offer.type === typeInput.value || Default.TYPE) {
    rank += 5;
  }
  if (notice.offer.price === priceInput.value || Default.PRICE) {
    rank += 3;
  }
  if (notice.offer.rooms === roomsInput.value || Default.ROOMS) {
    rank += 2;
  }
  if (notice.offer.guests === capacityInput.value || Default.CAPACITY) {
    rank += 2;
  }

  return rank;
};
getNoticeRank();

export {cardsContainer, similarNotices};

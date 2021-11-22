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


export {cardsContainer, similarNotices};

import {noticesRandom} from './data.js';

const cardsContainer = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarNotices = noticesRandom;
const similarListFragment = document.createDocumentFragment();

const createPhotos = function (someNotice) {
  const getSources = someNotice.offer.photos;
  getSources.forEach((source) => {
    const image = document.createElement('img');
    image.src = source;
    image.alt = 'Фото жилья';
    image.classList.add('popup__photo');
    return image;
  });
};

similarNotices.forEach((notice) => {
  const noticeElement = similarCardTemplate.cloneNode(true);
  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = `${notice.offer.price} ₽/ночь`;
  noticeElement.querySelector('.popup__type').textContent = notice.offer.type;
  noticeElement.querySelector('.popup__text--capacity').textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;
  noticeElement.querySelector('.popup__text--time').textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;
  noticeElement.querySelector('.popup__features').textContent = notice.offer.features; // ! нужно будет найти src картинок фич и отобразить их
  noticeElement.querySelector('.popup__description').textContent = notice.offer.description;
  if (notice.offer.photos.length > 0) {
    const photosContainer = noticeElement.querySelector('.popup__photos');
    //TODO Не ясен вывод
    const photos = createPhotos(notice);
    console.log(photos);
    //photosContainer.appendChild(photos);
  }
  similarListFragment.appendChild(noticeElement);
});

cardsContainer.appendChild(similarListFragment);

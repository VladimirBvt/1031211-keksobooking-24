import {noticesRandom} from './data.js';

const cardsContainer = document.querySelector('.map__canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarNotices = noticesRandom;
const similarListFragment = document.createDocumentFragment();
const clearPhotosContainer = function () {
  const photoContainer = similarCardTemplate.querySelector('.popup__photos');
  photoContainer.innerHTML = '';
};
clearPhotosContainer();

similarNotices.forEach((notice) => {
  const noticeElement = similarCardTemplate.cloneNode(true);
  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = `${notice.offer.price} ₽/ночь`;
  noticeElement.querySelector('.popup__type').textContent = notice.offer.type;
  noticeElement.querySelector('.popup__text--capacity').textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;
  noticeElement.querySelector('.popup__text--time').textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;
  const featuresContainer = noticeElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const featuresNotice = notice.offer.features;
  const modifiers = featuresNotice.map((feature) => `popup__feature--${feature}`);
  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
  const description = noticeElement.querySelector('.popup__description');
  description.textContent = notice.offer.description || description.remove();
  const photosContainer = noticeElement.querySelector('.popup__photos');
  const sources = notice.offer.photos;
  for (let i = 0; i < notice.offer.photos.length; i ++) {
    const image = document.createElement('img');
    image.src = sources[i];
    image.classList.add('popup__photo');
    image.alt = 'Фото жилья';
    image.width = 45;
    image.height = 40;
    photosContainer.appendChild(image);
  }
  similarListFragment.appendChild(noticeElement);
});

cardsContainer.appendChild(similarListFragment);


export {cardsContainer};

import {getRandomIntInclusive, getRandomArbitrary, getArrayWithUniqueElements, getUserNumbers} from './util.js';

/*const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];*/

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TYPES = [
  {
    palace: 'Дворец',
  },
  {
    flat: 'Квартира',
  },
  {
    house: 'Дом',
  },
  {
    bungalow: 'Бунгало',
  },
  {
    hotel: 'Отель',
  },
];

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const ArrayUserNumbers = getUserNumbers();

const SIMILAR_ANNOUNCEMENT_COUNT = 10;

const getType = function () {
  const type = TYPES[getRandomIntInclusive(0, TYPES.length - 1)];
  const valuesType = Object.values(type);
  return valuesType[0];
};

const createAnnouncement = () => {
  const getRandomPhotosLength = getRandomIntInclusive(0, PHOTOS.length);
  const getRandomArrayPhotos = () => PHOTOS[getRandomIntInclusive(0, PHOTOS.length - 1)];
  const getRandomFeaturesLength = getRandomIntInclusive(0, FEATURES.length);
  const getRandomArrayFeatures = () => FEATURES[getRandomIntInclusive(0, FEATURES.length - 1)];
  const getRandomLat = () => getRandomArbitrary(MIN_LAT, MAX_LAT, 5);
  const getRandomLng = () => getRandomArbitrary(MIN_LNG, MAX_LNG, 5);
  /*const createPhotos = function () {
    const getSources = Array.from({length: getRandomPhotosLength}, getRandomArrayPhotos);
    return console.log(getSources);
  };
  createPhotos();*/

  return {
    author: {
      avatar: `img/avatars/user${ArrayUserNumbers.shift()}.png`,
    },
    offer: {
      title: 'Заголовок предложения',
      address: `${getRandomLat()}, ${getRandomLng()}`,
      price: getRandomIntInclusive(0, Number.MAX_SAFE_INTEGER),
      type: getType(),
      rooms: getRandomIntInclusive(0, Number.MAX_SAFE_INTEGER),
      guests: getRandomIntInclusive(0, Number.MAX_SAFE_INTEGER),
      checkin: TIMES[0],
      checkout: TIMES[2],
      features: getArrayWithUniqueElements(Array.from({length: getRandomFeaturesLength}, getRandomArrayFeatures)),
      description: 'описание помещения',
      photos: Array.from({length: getRandomPhotosLength}, getRandomArrayPhotos),
    },
    location: {
      lat: getRandomLat(),
      lng: getRandomLng(),
    },
  };
};

const noticesRandom = Array.from({length: SIMILAR_ANNOUNCEMENT_COUNT}, createAnnouncement);

export {createAnnouncement, ArrayUserNumbers, noticesRandom};

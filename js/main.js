//Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(min, max) {
  //max <= min ? console.log('Ошибка. Введите значение большее, чем min.');
  if (max <= min) {
    // eslint-disable-next-line no-console
    console.log('Ошибка. Введите значение большее, чем min.');
  } else {
    min < 0 ? (min *= -1) : min;
    max < 0 ? (max *= -1) : max;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
}
getRandomIntInclusive();

//Функция, возвращающая число, округленное до указанного в  zeros количества знаков после запятой.
function rounding(num, zeros) {
  const factor = +(`1e${ zeros}`);
  return Math.round(num * factor) /factor;
}

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. decimalPlaces - количество знаков после запятой.
function getRandomArbitrary(min, max, decimalPlaces) {
  if (max <= min) {
    // eslint-disable-next-line no-console
    console.log('Ошибка. Введите значение большее, чем min.');
  }
  min < 0 ? (min *= -1) : min;
  max < 0 ? (max *= -1) : max;
  const result = Math.random() * (max - min) + min;
  return rounding(result, decimalPlaces);
}
getRandomArbitrary();

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

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

// функция принимающая массив и возвращающая случайный элемент этого массива.
/*const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];
getRandomArrayElement();*/

// функция, принимающая массив и возвращающая этот массив с удаленными из него повторяющимися элементами.
const getArrayWithUniqueElements = (array) => {
  const set = new Set(array);
  return array = Array.from(set);
};

// функция, возвращающая массив неповторяющихся двузначных номеров пользователей в рандомизированном порядке (для отображения аватара от 01 до 10).
const getUserNumbers = () => {
  const userNumbers = [];
  let arrayNumbers = [];
  let set;
  while (arrayNumbers.length < 10) {
    const number = getRandomIntInclusive(1, 10);
    const userNumber = number < 10 ? `0${number}` : `${number}`;
    userNumbers.push(userNumber);
    set = new Set(userNumbers);
    arrayNumbers = Array.from(set);
  }
  return arrayNumbers;
};
const ArrayUserNumbers = getUserNumbers();

const SIMILAR_ANNOUNCEMENT_COUNT = 10;

const createAnnouncement = () => {
  const getRandomPhotosLength = getRandomIntInclusive(0, PHOTOS.length);
  const getRandomArrayPhotos = () => PHOTOS[getRandomIntInclusive(0, PHOTOS.length - 1)];
  const getRandomFeaturesLength = getRandomIntInclusive(0, FEATURES.length);
  const getRandomArrayFeatures = () => FEATURES[getRandomIntInclusive(0, FEATURES.length - 1)];
  const getRandomLat = () => getRandomArbitrary(35.65000, 35.70000, 5);
  const getRandomLng = () => getRandomArbitrary(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${ArrayUserNumbers.shift()}.png`,
    },
    offer: {
      title: 'Заголовок предложения',
      address: `${getRandomLat()}, ${getRandomLng()}`,
      price: getRandomIntInclusive(0, Number.MAX_SAFE_INTEGER),
      type: TYPES[getRandomIntInclusive(0, TYPES.length - 1)],
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

Array.from({length: SIMILAR_ANNOUNCEMENT_COUNT}, createAnnouncement);

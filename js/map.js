import {enableActivity} from './user-form.js';
import {TYPES} from './data.js';

const mymap = L.map('map-canvas')
  .on('load', () => {
    enableActivity();
  })
  .setView({
    lat: 35.7,
    lng: 139.425,
  }, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
}).addTo(mymap);

// функция, принимающая объект похожего объявления и возвращающая попап-баллун с данными этого объекта
const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  // поиск нужной строки типа жилья в объекте-справочнике по его ключу, сравнивая его со строкой, приходящей из похожего объявления
  const getType = () => {
    const keyType = point.offer.type;
    for (let i = 0; i < TYPES.length; i ++) {
      for (const key in TYPES[i]) {
        if (key === keyType) {
          return TYPES[i][key];
        }
      }
    }
  };
  popupElement.querySelector('.popup__type').textContent = getType();
  popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты на ${point.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;

  const description = point.offer.description;
  if (description) {
    popupElement.querySelector('.popup__description').textContent = point.offer.description;
  }

  const featureContainer = popupElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  if (point.offer.features) {
    const modifiers = point.offer.features.map((feature) => `popup__feature--${feature}`);
    featureList.forEach((featureItem) => {
      const modifier = featureItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featureItem.remove();
      }
    });
    if (point.offer.features.length === 0) {
      featureContainer.classList.add('hidden');
    }
  }
  return popupElement;
};

// создание иконки для главного маркера
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создание главной метки
const mainMarker = L.marker(
  {
    lat: 35.7,
    lng: 139.425,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// размещение главной метки на карту
mainMarker.addTo(mymap);

// функция возврата главного маркера на первоначальное положение
const returnOriginPositionMarker = () => {
  mainMarker.setLatLng({
    lat: 35.7,
    lng: 139.425,
  });
};

// по событию перемещения главной метки, меняется содержимое поля Адрес в форме
const address = document.querySelector('#address');
address.value = '35.7, 139.425';

mainMarker.on('moveend', (evt) => {
  let coordinateLat = evt.target.getLatLng().lat;
  let coordinateLng = evt.target.getLatLng().lng;
  if (!Number.isInteger(coordinateLat)) {
    coordinateLat = coordinateLat.toFixed(5);
  }
  if (!Number.isInteger(coordinateLng)) {
    coordinateLng = coordinateLng.toFixed(5);
  }
  address.value = `${coordinateLat}, ${coordinateLng}`;
});

// создание иконки для обычных меток
const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// создание обычных меток объявлений на основании списка похожих объявлений и размещение их на карте, а также создание баллуна к каждому из этих объявлений
const renderMarkerNotices = (similarNotices) => {
  similarNotices.forEach((similarNotice) => {
    const marker = L.marker(
      {
        lat: similarNotice.location.lat,
        lng: similarNotice.location.lng,
      },
      {
        icon: markerIcon,
      },
    );

    marker.addTo(mymap);
    marker.bindPopup(createCustomPopup(similarNotice));
  });
};

const renderMarkerNotices1 = (similarNotices) => {
  L.map('map-canvas')
    .on('load', () => {
      enableActivity();
    })
    .setView({
      lat: 35.7,
      lng: 139.425,
    }, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  }).addTo(mymap);
  similarNotices.forEach((similarNotice) => {
    const marker = L.marker(
      {
        lat: similarNotice.location.lat,
        lng: similarNotice.location.lng,
      },
      {
        icon: markerIcon,
      },
    );

    marker.addTo(mymap);
    marker.bindPopup(createCustomPopup(similarNotice));
  });
};


export {renderMarkerNotices, renderMarkerNotices1, mymap, returnOriginPositionMarker};

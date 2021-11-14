import {cardsContainer} from './similar-list.js';
import {TYPES, TIMES} from './data.js';
//import {mymap} from './map.js';

const notices = cardsContainer.querySelectorAll('.popup');
const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
const formFilters = document.querySelector('.map__filters');
const formFiltersElements = document.querySelectorAll('.map__filter');
const formFiltersElementFeatures = document.querySelector('.map__features');

// функция, переводящая страницу в неактивное состояние
const enableInactivity = function () {
  notices.forEach((notice) => notice.classList.add('hidden'));
  form.classList.add('ad-form--disabled');
  formElements.forEach((formElement) => formElement.setAttribute('disabled', 'disabled'));
  formFilters.classList.add('ad-form--disabled');
  formFiltersElements.forEach((formFiltersElement) => formFiltersElement.setAttribute('disabled', 'disabled'));
  formFiltersElementFeatures.setAttribute('disabled', 'disabled');
};
enableInactivity();

// функция, переводящая страницу в активное состояние
const enableActivity = function () {
  notices.forEach((notice) => notice.classList.remove('hidden'));
  form.classList.remove('ad-form--disabled');
  formElements.forEach((formElement) => formElement.removeAttribute('disabled'));
  formFilters.classList.remove('ad-form--disabled');
  formFiltersElements.forEach((formFiltersElement) => formFiltersElement.removeAttribute('disabled'));
  formFiltersElementFeatures.removeAttribute('disabled');
};
enableActivity();

// валидация формы объявления
const title = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

title.addEventListener('input', () => {
  const valueLength = title.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - valueLength } символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } символов`);
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

// валидация полей количества комнат и вместимости гостей при помощи физического ограничения возможности выбора неправильного варианта
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const capacityItems = capacity.querySelectorAll('option');

roomNumber.addEventListener('change', () => {
  if (roomNumber.value === '1') {
    capacity.value = '1';
    capacityItems.forEach((capacityItem) => {
      if (capacityItem.value !== '1') {
        capacityItem.disabled = true;
      } else {
        capacityItem.disabled = false;
      }
    });
  } else if (roomNumber.value === '2') {
    capacity.value = '1';
    capacityItems.forEach((capacityItem) => {
      if (capacityItem.value === '3' || capacityItem.value === '0') {
        capacityItem.disabled = true;
      } else {
        capacityItem.disabled = false;
      }
    });
  } else if (roomNumber.value === '3') {
    capacity.value = '1';
    capacityItems.forEach((capacityItem) => {
      if (capacityItem.value === '0') {
        capacityItem.disabled = true;
      } else {
        capacityItem.disabled = false;
      }
    });
  } else if (roomNumber.value === '100') {
    capacityItems.forEach((capacityItem) => {
      capacity.value = '0';
      if (capacityItem.value !== '0') {
        capacityItem.disabled = true;
      } else {
        capacityItem.disabled = false;
      }
    });
  } else {
    capacityItems.forEach((capacityItem) => {
      capacityItem.disabled = false;
    });
  }
});

const MIN_PRICES = ['0', '1000', '3000', '5000', '10000'];

// изменение поля ввода "типа жилья" меняет в поле ввода "цена за ночь" минимальную цену и плейсхолдер
const price = document.querySelector('#price');
const typeOfHousing = document.querySelector('#type');

typeOfHousing.addEventListener('change', () => {
  for (let i = 0; i < TYPES.length; i ++) {
    const minPrice = MIN_PRICES[i];
    const type = TYPES[i];
    const types = Object.keys(type);
    if (typeOfHousing.value === types[0]) {
      price.setAttribute('min', minPrice);
      price.setAttribute('placeholder', minPrice);
    }
  }
});

// синхронизация полей времени заезда и выезда
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change',() => {
  for (let i = 0; i < TIMES.length; i ++) {
    const time = TIMES[i];
    if (timeIn.value === time) {
      timeOut.value = time;
    }
  }
});

timeOut.addEventListener('change', () => {
  for (let i = 0; i < TIMES.length; i ++) {
    const time = TIMES[i];
    if (timeOut.value === time) {
      timeIn.value = time;
    }
  }
});

// объявление функции отправки формы методом AJAX
// eslint-disable-next-line no-unused-vars
const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ).then(() => onSuccess)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  });
};

// закрытие баллуна

// возвращение всех полей формы в первоначальное состояние

// возвращение метки адреса в исходное состояние

export {enableActivity, enableInactivity, setUserFormSubmit};

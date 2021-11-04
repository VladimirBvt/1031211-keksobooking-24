import {cardsContainer} from './popup.js';

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

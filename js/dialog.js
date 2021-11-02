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

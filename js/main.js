import './map.js';
import './util.js';
import './data.js';
import './similar-list.js';
import './user-form.js';
import {renderMarkerNotices, mymap} from './map.js';
import {setUserFormSubmit} from './user-form.js';
import {showAlert} from './util.js';

const form = document.querySelector('.ad-form');

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((notices) => {
    renderMarkerNotices(notices);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      mymap.closePopup();
    });
  })
  .catch((err) => {
    showAlert(err);
  });

// отправка формы
setUserFormSubmit();

import './util.js';
import './data.js';
import './similar-list.js';
import './user-form.js';
import './map.js';
import {renderMarkerNotices, mymap} from './map.js';
import {setUserFormSubmit} from './user-form.js';

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
    // eslint-disable-next-line no-console
    console.error(err);
  });
// 123456789012345678901234567890
// отправка формы
setUserFormSubmit();

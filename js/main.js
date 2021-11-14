import './util.js';
import './data.js';
import './similar-list.js';
import './user-form.js';
import './map.js';
import {renderMarkerNotices} from './map.js';
import {setUserFormSubmit} from './user-form.js';

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((notices) => {
    renderMarkerNotices(notices);
  });

// отправка формы
setUserFormSubmit();

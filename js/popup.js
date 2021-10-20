import {createAnnouncement} from './data';

createAnnouncement();

const announcementContainer = document.querySelector('.map__canvas');
announcementContainer;
const templateCard = document.querySelector('#card').content.querySelector('.popup');
const newCard = templateCard.cloneNode(true);
newCard;
//console.log(newCard);

export * from './popup';

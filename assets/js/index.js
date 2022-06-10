/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */

import { Keyboard } from './keyboard.js';
import { engKeyboard } from './languages/en.js';
import { ruKeyboard } from './languages/ru.js';
import { chinKeyboard } from './languages/chin.js';

const langArr = [engKeyboard, ruKeyboard, chinKeyboard];
const language = ['English', 'Russian', 'Chinese'];

const JSONData = {
  langArrData: sessionStorage.getItem('language') !== null
    ? JSON.parse(sessionStorage.getItem('language'))
    : langArr[0],
  langName: sessionStorage.getItem('languageName') !== null
    ? JSON.parse(sessionStorage.getItem('languageName'))
    : language[0],
};

const keyboard = new Keyboard(JSONData.langArrData, JSONData.langName);
keyboard.init();

document.addEventListener('click', (event) => {
  if (event.target.className === 'keyboard__key') {
    keyboard.addHandler(event.target.dataset.keyCode);
    keyboard.cursor();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    const indexCur = language.indexOf(keyboard.languageText);
    const indexNext = indexCur === langArr.length - 1 ? 0 : indexCur + 1;
    keyboard.changeLanguage(langArr[indexNext], language[indexNext]);

    document
      .querySelector('.keyboard__key-capslock')
      .classList.remove('keyboard__key--active');
    document
      .querySelectorAll('.keyboard__key-shift')
      .forEach((key) => key.classList.remove('keyboard__key--active'));
  }

  document
    .querySelector(`.keyboard__key[data-key-code="${event.code}"]`)
    .classList.add('keyboard__key--pressed');

  event.preventDefault();
  keyboard.addHandler(event.code);

  if (event.shiftKey) {
    document
      .querySelector('.keyboard__key-capslock')
      .classList.remove('keyboard__key--active');
    if (!keyboard.shift) {
      document
        .querySelectorAll('.keyboard__key-shift')
        .forEach((key) => key.classList.remove('keyboard__key--active'));
    } else {
      document
        .querySelector(`.keyboard__key[data-key-code="${event.code}"]`)
        .classList.toggle('keyboard__key--active');
    }
  }

  if (event.code === 'CapsLock') {
    document
      .querySelectorAll('.keyboard__key-shift')
      .forEach((key) => key.classList.remove('keyboard__key--active'));
    document
      .querySelector(`.keyboard__key[data-key-code="${event.code}"]`)
      .classList.toggle('keyboard__key--active');
  }

  keyboard.cursor();
});

document.addEventListener('keyup', (event) => {
  document.querySelectorAll('.keyboard__key').forEach((element) => {
    if (!event.ctrlKey || !event.shiftKey) {
      element.classList.remove('keyboard__key--pressed');
    }
    event.stopPropagation();
  });
});

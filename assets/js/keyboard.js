/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */

import { createMainHtml, addToHtmlSpecialClass } from './create-html.js';

const body = document.querySelector('body');

export class Keyboard {
  constructor(lang, langName) {
    this.textAreaValue = '';
    this.capsLock = false;
    this.shift = false;
    this.keyboardLanguage = lang;
    this.languageText = langName;
  }

  init() {
    body.insertAdjacentHTML('afterbegin', createMainHtml(this.languageText));
    this.createKeys(this.keyboardLanguage);
    this.addSpecificClass();
  }

  createKeys(lang) {
    const keysWrapper = document.querySelector('.keyboard__keys');
    keysWrapper.insertAdjacentHTML(
      'beforeend',
      this.generateKeys(lang).join(''),
    );
  }

  createKeyHtml(keyData) {
    return `<button type="button" class="keyboard__key" data-key-code="${
      keyData.code
    }">${this.keyWrite(keyData)}</button>`;
  }

  keyWrite(key) {
    if (this.shift) return key.shift;
    if (this.capsLock) {
      return key.functional === 'false' ? key.small.toUpperCase() : key.small;
    }
    return key.small;
  }

  generateKeys(lang) {
    const keyArr = [];
    lang.forEach((key) => {
      const keyElement = this.createKeyHtml(key);
      keyArr.push(keyElement);
    });
    return keyArr;
  }

  updateKeys(lang) {
    const newMarkup = this.generateKeys(lang).join('');
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(
      document.querySelectorAll('.keyboard__keys > *'),
    );
    newElements.forEach((newEl, i) => {
      const currentEl = curElements[i];

      // update changed text
      if (
        !newEl.isEqualNode(currentEl)
        && newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }
    });
  }

  addSpecificClass() {
    const keysList = document.querySelectorAll('.keyboard__key');
    keysList.forEach((key) => addToHtmlSpecialClass(key));
  }

  addHandler(data) {
    const display = document.querySelector('.keyboard__textarea');

    switch (data) {
      case 'Backspace':
        this.textAreaValue = this.textAreaValue.slice(0, -1);
        display.textContent = this.textAreaValue;

        break;

      case 'Tab':
        this.textAreaValue += '\t';
        display.textContent = this.textAreaValue;

        break;

      case 'CapsLock':
        if (this.shift) {
          this.toggleShift();
          document
            .querySelectorAll('.keyboard__key-shift')
            .forEach((key) => key.classList.remove('keyboard__key--pressed'));
          document
            .querySelector('.keyboard__key-capslock')
            .classList.remove('.keyboard__key--pressed');
        }
        this.toggleCapsLock();
        document
          .querySelector(`.keyboard__key[data-key-code="${data}"]`)
          .classList.toggle('keyboard__key--pressed');

        break;

      case 'Enter':
        this.textAreaValue += '\n';
        display.textContent = this.textAreaValue;

        break;

      case 'ShiftLeft':
        if (this.capsLock) {
          this.toggleCapsLock();
          document
            .querySelector('.keyboard__key-capslock')
            .classList.remove('keyboard__key--pressed');
          document
            .querySelectorAll('.keyboard__key-shift')
            .forEach((key) => key.classList.remove('keyboard__key--pressed'));
        }
        this.toggleShift();
        document
          .querySelector(`.keyboard__key[data-key-code="${data}"]`)
          .classList.toggle('keyboard__key--pressed');

        break;

      case 'ShiftRight':
        if (this.capsLock) {
          this.toggleCapsLock();
          document
            .querySelector('.keyboard__key-capslock')
            .classList.remove('keyboard__key--pressed');
        }
        this.toggleShift();
        document
          .querySelector(`.keyboard__key[data-key-code="${data}"]`)
          .classList.toggle('keyboard__key--pressed');

        break;

      case 'ControlLeft':
      case 'ControlRight':
      case 'AltLeft':
      case 'AltRight':
        break;
      case 'ArrowUp':
        this.textAreaValue += '↑';
        display.textContent = this.textAreaValue;

        break;
      case 'ArrowDown':
        this.textAreaValue += '↓';
        display.textContent = this.textAreaValue;
        break;
      case 'ArrowLeft':
        this.textAreaValue += '←';
        display.textContent = this.textAreaValue;

        break;
      case 'ArrowRight':
        this.textAreaValue += '→';
        display.textContent = this.textAreaValue;

        break;

      case 'Space':
        this.textAreaValue += ' ';
        display.textContent = this.textAreaValue;

        break;

      default:
        this.textAreaValue += document.querySelector(
          `.keyboard__key[data-key-code="${data}"]`,
        ).textContent;
        display.textContent = this.textAreaValue;

        break;
    }
  }

  toggleCapsLock() {
    this.capsLock = !this.capsLock;
    this.updateKeys(this.keyboardLanguage);
    this.addSpecificClass();
  }

  toggleShift() {
    this.shift = !this.shift;
    this.updateKeys(this.keyboardLanguage);
    this.addSpecificClass();
  }

  cursor(selectionStart, selectionEnd) {
    const display = document.querySelector('.keyboard__textarea');
    const end = display.value.length;
    display.setSelectionRange(selectionStart ?? end, selectionEnd ?? end);
    display.focus();
  }

  changeLanguage(lang, langName) {
    this.shift = false;
    this.capsLock = false;

    this.keyboardLanguage = lang;
    this.languageText = langName;

    document.querySelector('.keyboard__language').innerHTML = this.languageText;
    this.updateKeys(this.keyboardLanguage);
    this.addSpecificClass();
    sessionStorage.setItem('language', JSON.stringify(this.keyboardLanguage));
    sessionStorage.setItem('languageName', JSON.stringify(this.languageText));
  }
}

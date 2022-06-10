/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

export const createMainHtml = lang => {
  return `
    <header>
      <h1 class="main-title">Virtual Keyboard</h1>
      <div class="keyboard__text-wrapper">
        <span class="keyboard__language">${lang}</span
        ><span class="keyboard__text"
          >to change language press: Ctrl + Alt</span
        >
      </div>
    </header>
    <main>
      <div class="keyboard">
        <textarea autofocus class="keyboard__textarea"></textarea>
        <div class="keyboard__keys">
        </div>
      </div>
    </main>`;
};

const createIconHTML = iconName => {
  return `<span class="material-icons">${iconName}</span>`;
};

export const addToHtmlSpecialClass = key => {
  switch (key.dataset.keyCode) {
    case 'Backspace':
      key.classList.add('keyboard__key-backspace');
      key.innerHTML = createIconHTML('backspace');

      break;

    case 'Tab':
      key.classList.add('keyboard__key-tab');
      key.innerHTML = createIconHTML('swap_horiz');

      break;

    case 'CapsLock':
      key.classList.add('keyboard__key-capslock');
      key.textContent = 'CapsLock';

      break;

    case 'Enter':
      key.classList.add('keyboard__key-enter');
      key.innerHTML = createIconHTML('keyboard_return');

      break;

    case 'ShiftLeft':
      key.classList.add('keyboard__key-shift', 'keyboard__key-shiftleft');
      key.innerHTML = createIconHTML('vertical_align_top');

      break;

    case 'ShiftRight':
      key.classList.add('keyboard__key-shift', 'keyboard__key-shiftright');
      key.innerHTML = createIconHTML('vertical_align_top');

      break;

    case 'Backslash':
      key.classList.add('keyboard__key-long');
      break;

    case 'Space':
      key.classList.add('keyboard__key-space');
      key.innerHTML = createIconHTML('space_bar');
      break;

    case 'ArrowUp':
      key.classList.add('keyboard__key-arrow', 'keyboard__key-arrowUp');
      key.innerHTML = createIconHTML('keyboard_arrow_up');
      break;

    case 'ArrowDown':
      key.classList.add('keyboard__key-arrow', 'keyboard__key-arrowDown');
      key.innerHTML = createIconHTML('keyboard_arrow_down');
      break;

    case 'ArrowLeft':
      key.classList.add('keyboard__key-arrow', 'keyboard__key-arrowLeft');
      key.innerHTML = createIconHTML('keyboard_arrow_left');
      break;

    case 'ArrowRight':
      key.classList.add('keyboard__key-arrow', 'keyboard__key-arrowRight');
      key.innerHTML = createIconHTML('keyboard_arrow_right');
      break;

    default:
  }
};

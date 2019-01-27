'use strict'

/* -------- Модальное окно обратной связи -------- */

let link = document.querySelector('.feedback-link');
let popup = document.querySelector('.feedback-pop-up');
let overlay = document.querySelector('.overlay');
let closer = popup.querySelector('.feedback-cancel');
let form = popup.querySelector('form');

let userName = popup.querySelector('.feedback-user-name');
let email = popup.querySelector('.feedback-email');
let userText = popup.querySelector('#feedback-text');

let storage = localStorage.getItem('login');

// Показать модальное окно при клике на ссылку
link.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  overlay.classList.add("overlay-show");

  // Запомнить юзера и поставить фокус
  if(storage) {
    userName.value = storage;
    email.focus();
  } else {
    userName.focus();
  }

});

// Закрыть модальное окно при клике на крестик
closer.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('modal-show');
  popup.classList.remove('modal-error');
  overlay.classList.remove('overlay-show');
});

// Проверить заполненность формы
form.addEventListener('submit', function(evt) {
  if (!userName.value || !email.value || !userText.value) {
    evt.preventDefault();
    popup.classList.add('modal-error');

    let inpArr = [];
    inpArr.push(userName);
    inpArr.push(email);
    inpArr.push(userText);
    for (let inp of inpArr) {
      if (!inp.value) inp.classList.add('empty');
      inp.addEventListener('input', function() {
        if (this.value) {
          this.classList.remove('empty');
        } else {
          this.classList.add('empty');
        }
      });
    }

  } else {
    localStorage.setItem('login', userName.value);
  }
});

// Закрыть модальное окно по Esc
window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {

    if(popup.classList.contains('modal-show') ||
       overlay.classList.contains('overlay-show')) {

        popup.classList.remove('modal-show');
        popup.classList.remove('modal-error');
        overlay.classList.remove('overlay-show');
    }

  }
});
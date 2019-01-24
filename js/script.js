'use strict'

/* -------- Модальное окно обратной связи -------- */

let link = document.querySelector('.feedback-link');
let popup = document.querySelector('.feedback-pop-up');
let overlay = document.querySelector('.overlay');
let closer = popup.querySelector('.feedback-cancel');
let form = popup.querySelector('form');

/* Поля ввода */
let userName = popup.querySelector('.feedback-user-name');
let email = popup.querySelector('.feedback-email');
let userText = popup.querySelector('#feedback-text');

let storage = localStorage.getItem('login');

/* Показать модальное окно при клике на ссылку */
link.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  overlay.classList.add("overlay-show");

  /* Запомнить юзера и поставить фокус */
  if(storage) {
    userName.value = storage;
    email.focus();
  } else {
    userName.focus();
  }

});

/* Закрыть модальное окно при клике на крестик */
closer.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove('modal-error');
  overlay.classList.remove("overlay-show");
});

/* Проверить заполненность формы */
form.addEventListener('submit', function(evt) {
  if (!userName.value || !email.value || !userText.value) {
    evt.preventDefault();
    popup.classList.add('modal-error');
    alert('Перед отправкой нужно заполнить все поля формы');
  } else {
    localStorage.setItem('login', userName.value);
  }
});

/* Закрыть модальное окно по Esc */
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


/* --------------------- Слайдер ----------------------- */

let btn1 = document.querySelector('.slide-btn-1');
let btn2 = document.querySelector('.slide-btn-2');
let btn3 = document.querySelector('.slide-btn-3');

let sld1 = document.querySelector('.slide-1');
let sld2 = document.querySelector('.slide-2');
let sld3 = document.querySelector('.slide-3');

let body = document.body;
var timerIdAfterClick;

/* Установить стандартное время показа слайда */
let sliderTime = 5000;

/* Установить задержку смены слайдов после клика юзера */
let sliderDelay = 10000;

function showSlide1() {
  if (!btn1.classList.contains('active-slide-btn')) {
    btn1.classList.add('active-slide-btn');
    btn2.classList.remove('active-slide-btn');
    btn3.classList.remove('active-slide-btn');

    sld1.classList.add('current-slide');
    sld2.classList.remove('current-slide');
    sld3.classList.remove('current-slide');

    body.className = 'first-color';
  }
}

function showSlide2() {
  if (!btn2.classList.contains('active-slide-btn')) {
    btn2.classList.add('active-slide-btn');
    btn1.classList.remove('active-slide-btn');
    btn3.classList.remove('active-slide-btn');

    sld2.classList.add('current-slide');
    sld1.classList.remove('current-slide');
    sld3.classList.remove('current-slide');

    body.className = 'second-color';
  }
}

function showSlide3() {
  if (!btn3.classList.contains('active-slide-btn')) {
    btn3.classList.add('active-slide-btn');
    btn1.classList.remove('active-slide-btn');
    btn2.classList.remove('active-slide-btn');

    sld3.classList.add('current-slide');
    sld1.classList.remove('current-slide');
    sld2.classList.remove('current-slide');

    body.className = 'third-color';
  }
}

function showNext() {
  if (btn1.classList.contains('active-slide-btn')) {
    showSlide2();
    return;
  }
  if (btn2.classList.contains('active-slide-btn')) {
    showSlide3();
    return;
  }
  if (btn3.classList.contains('active-slide-btn')) {
    showSlide1();
    return;
  }
}

/* Обработчики клика на кнопки */
btn1.addEventListener('click', function() {
  clearInterval(timerId);
  clearTimeout(timerIdAfterClick);
  showSlide1()
  timerIdAfterClick = setTimeout(function() {
    timerId = setInterval(showNext, sliderTime);
  }, sliderDelay);
});

btn2.addEventListener('click', function() {
  clearInterval(timerId);
  clearTimeout(timerIdAfterClick);
  showSlide2()
  timerIdAfterClick = setTimeout(function() {
    timerId = setInterval(showNext, sliderTime);
  }, sliderDelay);
});

btn3.addEventListener('click', function() {
  clearInterval(timerId);
  clearTimeout(timerIdAfterClick);
  showSlide3()
  timerIdAfterClick = setTimeout(function() {
    timerId = setInterval(showNext, sliderTime);
  }, sliderDelay);
});

/* Запустить слайдер в цикл */
var timerId = setInterval(showNext, sliderTime);
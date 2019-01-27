/* -------------- Слайдер на главной ---------------- */

// Установить стандартное время показа слайда
let sliderTime = 5000;
// Установить задержку смены слайдов после клика юзера
let sliderDelay = 10000;

let btn1 = document.querySelector('.slide-btn-1');
let btn2 = document.querySelector('.slide-btn-2');
let btn3 = document.querySelector('.slide-btn-3');
let sld1 = document.querySelector('.slide-1');
let sld2 = document.querySelector('.slide-2');
let sld3 = document.querySelector('.slide-3');
let body = document.body;
var timerIdAfterClick;

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

// ручное переключение слайдов
let switcher = document.querySelector('.slides-switches');
switcher.addEventListener('click', function(evt) {

  let targetBtn = +evt.target.classList[1].slice(-1);

  clearInterval(timerId);
  clearTimeout(timerIdAfterClick);

  switch (targetBtn) {
    case 1: showSlide1(); break;
    case 2: showSlide2(); break;
    case 3: showSlide3(); break;
  }

  timerIdAfterClick = setTimeout(function() {
    timerId = setInterval(showNext, sliderTime);
  }, sliderDelay);
});

// Запустить слайдер в цикл
var timerId = setInterval(showNext, sliderTime);
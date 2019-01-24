/* ------- Слайдер ранжирования цены -------- */

// задать градацию цен для слайдера
// (единица равна сотне рублей)
let gradation = 6;

// вписать максимальную цену в документ
document.querySelector('.price-ranging .end-price').innerHTML = gradation * 100;

// ползунки в переменные
let thumb1 = document.querySelector('.thumb-1');
let thumb2 = document.querySelector('.thumb-2');

// слушаем вжатие клавиши на ползунки
thumb1.addEventListener('mousedown', moveThumb);
thumb2.addEventListener('mousedown', moveThumb);

function moveThumb(evt) {
  // обрабатываем только левую клавишу мышы
  if (evt.which != 1) return;
  evt.preventDefault();

  let target = evt.target;
  let slider = target.closest('.ranging-slider');
  let innerBar = slider.querySelector('.inner-bar');

  // получаем размер шкалы
  let scaleDivision = (slider.offsetWidth) / (gradation - 1);

  // ограничители сдвига
  if (target.classList.contains('thumb-1')) {
    var leftBound = -(target.offsetWidth / 2);
    var rightBound = thumb2.getBoundingClientRect().left - slider.getBoundingClientRect().left - target.offsetWidth;
  }
  if (target.classList.contains('thumb-2')) {
    var leftBound = thumb1.getBoundingClientRect().right - slider.getBoundingClientRect().left;
    var rightBound = slider.offsetWidth + target.offsetWidth / 2 - target.offsetWidth;
  }

  // сдвиг курсора на ползунке по горизонтали
  let shiftX = evt.clientX - target.getBoundingClientRect().left;

  // захватить элемент под курсор
  catchUnderCursor(evt.clientX);

  function catchUnderCursor(PositionX) {

    let newPosition = PositionX - slider.getBoundingClientRect().left - shiftX;
    if (newPosition < leftBound) newPosition = leftBound;
    if (newPosition > rightBound) newPosition = rightBound;
    target.style.left = newPosition + 'px';

    // для первого ползунка...
    if (target.classList.contains('thumb-1')) {

      // двигаем inner-bar
      innerBar.style.left = newPosition + target.offsetWidth / 2 + 'px';

      // корректная точка отсчета в пикселях относительно величины слайдера
      let leftPoint = newPosition + target.offsetWidth / 2;

      // получить деление шкалы
      let scalePoint = Math.floor(leftPoint / scaleDivision);

      // отобразить цену
      document.querySelector('.price-ranging .start-price').innerHTML = scalePoint * 100 + 100;
    }

    // для второго ползунка...
    if (target.classList.contains('thumb-2')) {

      // двигаем inner-bar
      innerBar.style.right = slider.offsetWidth - newPosition + 'px';

      // корректная точка отсчета в пикселях относительно величины слайдера
      let rightPoint = newPosition  + target.offsetWidth / 2;

      // получить деление шкалы
      let scalePoint = Math.floor(rightPoint / scaleDivision);

      // отобразить цену
      document.querySelector('.price-ranging .end-price').innerHTML = scalePoint * 100 + 100;
    }
  }

  // двигаем ползунок с движением курсора
  document.body.addEventListener('mousemove', moveAt);

  function moveAt(evt) {
    catchUnderCursor(evt.clientX);
  }
  
  // обрываем прослушку движения при отжатии мыши
  document.body.onmouseup = function() {
    document.body.removeEventListener('mousemove', moveAt);
    document.body.onmouseup = null;
  }
}
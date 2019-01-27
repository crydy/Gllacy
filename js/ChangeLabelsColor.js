/*------ Смена цвета лейблов над инпутами ------*/

// накопить коллекцию инпутов
let inputsList = document.querySelectorAll('input');
let inputs = Array.from(inputsList);

// добавить в массив textarea из формы обратной связи
let txtarea = document.getElementById('feedback-text');
inputs.push(txtarea);

// перебрать инпуты
for (let input of inputs) {
  // обработать только некоторые обозначенные типы
  if(input.type == 'search'
  || input.type == 'email'
  || input.type == 'password'
  || input.type == 'text'
  || input.type == 'textarea') {
    // для каждого получить соответсвующий лэйбл
    let label = document.querySelector(`label[for="${input.id}"]`);
    
    // слушаем каждый инпут, если поле не пустое -
    // перекрашиваем label и убираем рамку
    input.addEventListener('input', function() {
      if(this.value) {
        label.style.color = '#999999';
        this.style.boxShadow = 'none';
      }
      if(!this.value) {
        label.style.color = '';
        this.style.boxShadow = '';
      }
    })
  }
}
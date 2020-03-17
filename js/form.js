'use strict';

(function () {

  var SEND_URL = 'https://js.dump.academy/keksobooking4444';

  var TYPE_COST = {
    'flat': '1000',
    'bungalo': '0',
    'house': '5000',
    'palace': '10000'
  };

  var ROOMS_CAPASITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var adForm = window.default.adForm;
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');

  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var roomNumberChangeHandler = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (ROOMS_CAPASITY[roomNumber.value][0] === item.value);
        item.hidden = !(ROOMS_CAPASITY[roomNumber.value].indexOf(item.value) >= 0);
      });
    }
  };

  roomNumberChangeHandler();

  var typeChangeHandler = function () {
    var minPrice = TYPE_COST[type.value];
    price.min = minPrice;
    price.placeholder = minPrice;
  };

  typeChangeHandler();


  function timeinChangeHandler() {
    timeout.value = timein.value;
  }

  function timeoutChangeHandler() {
    timein.value = timeout.value;
  }

  timein.addEventListener('change', timeinChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);

  type.addEventListener('change', typeChangeHandler);

  roomNumber.addEventListener('change', roomNumberChangeHandler);


  var submitButton = adForm.querySelector('.ad-form__submit');

  var onSuccessElementClick = function (evt) {
    roomNumberChangeHandler();
    window.map.setDeactiveState();
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
    }
  };

  var onSuccess = function () {
    var successElement = document.querySelector('#success').content.querySelector('.success');
    var template = successElement.cloneNode(true);

    template.addEventListener('click', onSuccessElementClick);

    document.body.appendChild(template);
  };

  var onErrorElementClick = function (evt) {
    roomNumberChangeHandler();
    window.map.setDeactiveState();
    var error = document.querySelector('.error');
    if (error) {
      var onError = function () {
        alert('Error');
      };
  };

  var onError = function () {
    var errorElement = document.querySelector('#error').content.querySelector('.error');
    var template = errorElement.cloneNode(true);

    template.addEventListener('click', onErrorElementClick);

    document.body.appendChild(template);
  };

  var onError = function () {
    alert('Error');
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();

    window.backend.save(SEND_URL, onSuccess, onError, new FormData(adForm), 'POST');
  };

  submitButton.addEventListener('click', onSubmitButtonClick);

})();

'use strict';

(function () {

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

  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

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

})();

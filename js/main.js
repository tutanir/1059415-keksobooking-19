'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var removeActiveClass = function () {
    var activePin = map.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var closePopup = function () {
    var popup = map.querySelector('.popup');

    if (popup) {
      popup.remove();
    }

    removeActiveClass();
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      fragment.appendChild(renderPin(window.data.adverts[i]));
    }
    mapPins.appendChild(fragment);
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filterContainer = map.querySelector('.map__filters-container');

  var onCardEscKeyDown = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();

      document.removeEventListener('keydown', onCardEscKeyDown);
    }
  };

  var fields = document.querySelectorAll('fieldset, .map__filter');

  var setDisabledState = function () {
    fields.forEach(function (field) {
      field.disabled = !field.disabled;
    });
  };

  setDisabledState();

  var pinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');


  var setAddress = function (state) {
    var Pin = {
      width: 65,
      height: 87
    };
    var address = adForm.querySelector('#address');
    address.value = (state) ? (parseInt(pinMain.style.left, 10) + Math.round(Pin.width / 2)) + ', ' + (parseInt(pinMain.style.top, 10) + Pin.height) : (parseInt(pinMain.style.left, 10) + Math.round(Pin.width / 2)) + ', ' + (parseInt(pinMain.style.top, 10) + Math.round(Pin.width / 2));
  };

  var setActiveState = function () {
    map.classList.remove('map--faded');
    setDisabledState();
    renderPins();
    setAddress(true);

    adForm.classList.remove('ad-form--disabled');

    pinMain.removeEventListener('mousedown', onMainPinMouseDown);
    pinMain.removeEventListener('keydown', onMainPinKeyDown);
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      setActiveState();
    }
  };

  var onMainPinMouseDown = function () {
    setActiveState();
  };

  pinMain.addEventListener('mousedown', onMainPinMouseDown);
  pinMain.addEventListener('keydown', onMainPinKeyDown);

  setAddress(false);

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

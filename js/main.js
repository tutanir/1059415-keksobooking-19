'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var MAX_COUNT = 5;
  var pins = [];

  var map = document.querySelector('.map');

  var fields = document.querySelectorAll('fieldset, .map__filter');

  var setDisabledState = function () {
    fields.forEach(function (field) {
      field.disabled = !field.disabled;
    });
  };

  setDisabledState();

  var pinMain = map.querySelector('.map__pin--main');
  var adForm = window.default.adForm;
  var Pin = {
    width: 65,
    height: 87,
    x: pinMain.style.left,
    y: pinMain.style.top
  };


  var setAddress = function (state) {
    var address = adForm.querySelector('#address');
    address.value = (state) ? (parseInt(pinMain.style.left, 10) + Math.round(Pin.width / 2)) + ', ' + (parseInt(pinMain.style.top, 10) + Pin.height) : (parseInt(pinMain.style.left, 10) + Math.round(Pin.width / 2)) + ', ' + (parseInt(pinMain.style.top, 10) + Math.round(Pin.width / 2));
  };

  var setActiveState = function () {
    map.classList.remove('map--faded');
    setDisabledState();
    window.backend.load(GET_URL, onSuccess, onError);
    setAddress(true);

    adForm.classList.remove('ad-form--disabled');

    pinMain.removeEventListener('mousedown', onMainPinMouseDown);
    pinMain.removeEventListener('keydown', onMainPinKeyDown);
  };

  var setDeactiveState = function () {
    map.classList.add('map--faded');
    setDisabledState();
    adForm.reset();

    pinMain.style.left = Pin.x;
    pinMain.style.top = Pin.y;

    setAddress(false);
    adForm.classList.add('ad-form--disabled');

    window.pin.remove();
    window.card.close();

    pinMain.addEventListener('mousedown', onMainPinMouseDown);
    pinMain.addEventListener('keydown', onMainPinKeyDown);
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

  var onSuccess = function (data) {
    pins = data.slice(0, MAX_COUNT);

    window.pin.render(pins);
  };

  var onError = function () {};

  window.map = {
    pinMain: pinMain,
    setAddress: setAddress,
    setDeactiveState: setDeactiveState
  };

})();

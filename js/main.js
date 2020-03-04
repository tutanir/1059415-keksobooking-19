'use strict';

var COUNT = 8;
var Price = {
  MIN: 1000,
  MAX: 10000
};

var adverts = [];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var intRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffleArray = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];

var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var FOTO_ROOMS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

var addArray = function () {
  for (var i = 0; i < COUNT; i++) {
    adverts.push({
      'author': {
        avatar: './img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок ' + i,
        'address': '600, 350',
        'price': intRandom(Price.MIN, Price.MAX),
        'type': TYPE_HOUSING[intRandom(0, (TYPE_HOUSING.length - 1))],
        'rooms': intRandom(1, 10),
        'guests': intRandom(1, 10),
        'checkin': CHECKIN[intRandom(0, (CHECKIN.length - 1))],
        'checkout': CHECKOUT[intRandom(0, (CHECKOUT.length - 1))],
        'features': shuffleArray(FACILITIES).slice(0, intRandom(1, FACILITIES.length)),
        'description': 'описание',
        'photos': shuffleArray(FOTO_ROOMS).slice(0, intRandom(0, (FOTO_ROOMS.length - 1)))
      },
      'location': {
        'x': intRandom(1, map.offsetWidth),
        'y': intRandom(130, 630)
      }
    });
  }
};

addArray();

var renderPin = function (pin) {
  var nodeElement = pinTemplate.cloneNode(true);
  nodeElement.style.left = (pin.location.x - nodeElement.offsetWidth / 2) + 'px';
  nodeElement.style.top = (pin.location.y - nodeElement.offsetHeight) + 'px';
  var img = nodeElement.querySelector('img');
  img.src = pin.author.avatar;
  return nodeElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  mapPins.appendChild(fragment);
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterContainer = map.querySelector('.map__filters-container');


var renderCard = function (pin) {
  var nodeElement = cardTemplate.cloneNode(true);

  nodeElement.querySelector('img').src = pin.author.avatar;
  nodeElement.querySelector('.popup__title').textContent = pin.offer.title;
  nodeElement.querySelector('.popup__text--address').textContent = pin.offer.address;
  nodeElement.querySelector('.popup__text--price').textContent = pin.offer.price;
  nodeElement.querySelector('.popup__description').textContent = pin.offer.description;
  nodeElement.querySelector('.popup__type').textContent = pin.offer.type;
  nodeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  nodeElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';

  var features = nodeElement.querySelectorAll('.popup__feature');

  for (var i = 0; i < features.length; i++) {
    if (pin.offer.features.indexOf(features[i].classList[1].replace('popup__feature--', '')) === -1) {
      features[i].remove();
    }
  }

  var photo = nodeElement.querySelector('.popup__photos');
  photo.innerHTML = '';

  for (i = 0; i < pin.offer.photos.length; i++) {
    var img = document.createElement('img');
    img.src = pin.offer.photos[i];
    img.alt = 'Фотография жилья';
    img.width = 45;
    img.height = 40;
    img.classList.add('popup__photo');

    photo.appendChild(img);
  }

  filterContainer.before(nodeElement);
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

var = TYPE_COST = {
  'flat': '1000',
  'bungalo': '0',
  'hous': '5000',
  'palase': '10000'
};
var = ROOMS_CAPASITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var type = document.querySelector('#type');
var price = document.querySelector('#price');

typeChangeHandler();

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

roomNumberChangeHandler = function () {
  if (capasity.options.length > 0) {
    [].forEach.call(capasity.options, function (item) {
      item.selected = (ROOMS_CAPASITY[roomNumber.value][0] === item.value) ? true : false;
      item.hidden = (ROOMS_CAPASITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
    });
  }
};

roomNumber.addEventListener() {
  var minPrice = TYPE_COST[type.value];
  price.min = minPrice;
  price.value = minPrice;
  price.placeholder = minPrice;
}

function timeinChangeHandler() {
  timeout.value = timein.value;
}

function timeoutChangeHandler() {
  timein.value = timeout.value;
}

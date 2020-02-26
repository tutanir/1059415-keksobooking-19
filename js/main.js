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

var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];

var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var FOTO_ROOMS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

map.classList.remove('map--faded');


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
        'features': FACILITIES,
        'description': 'описание',
        'photos': FOTO_ROOMS
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

renderPins();

'use strict';

(function () {
  var COUNT = 8;

  var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];

  var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var FOTO_ROOMS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var CHECKIN = ['12:00', '13:00', '14:00'];

  var CHECKOUT = ['12:00', '13:00', '14:00'];

  var adverts = [];

  var Price = {
    MIN: 1000,
    MAX: 10000
  };

  var map = window.default.map;

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

  window.data = {
    adverts: adverts
  };
})();

'use strict';


var map = document.querySelector('.map');

var intRandom = function (min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var TIPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];

var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var FOTO_ROOMS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var CHECKIN = [(12:00), (13:00), (14:00)];

var CHECKOUT = [(12:00), (13:00), (14:00)];

map.classList.remove('map--faded');

var objectDescription = [
  {
     author: {
     avatar: 'img/avatars/user/0 + (i+1) + '.png'
   },
     offer: {
     title: 'заголовок предложения',
     address: 'location.600, location.350',
     price: (intRandom()),
     type: 'TIPE_HOUSING[Math.floor(Math.random()]',
     rooms: ('Math.floor(Math.random() * 10) + 1;' + 'комнат'),
     guests: ('Math.floor(Math.random() * 10) + 1;' + 'гостей'),
     checkin: 'CHECKIN[Math.floor(Math.random()]',
     checkout: 'CHECKOUT[Math.floor(Math.random()]',
     features: FACILITIES[Math.floor(Math.random() * TIPE_HOUSING.length)],
     description: 'описание',
     photos: FOTO_ROOMS[Math.floor(Math.random() * FOTO_ROOMS.length)],
     },

     "location": {
     "x": intRandom(1, map.offsetWidth),
     "y": intRandom(130, 630)
     }
  }
];

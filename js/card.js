'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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

    var removeActiveClass = function () {
      var activePin = window.default.map.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    };

    var closePopup = function () {
      var popup = window.default.map.querySelector('.popup');

      if (popup) {
        popup.remove();
      }

      removeActiveClass();
    };

    var closeButton = nodeElement.querySelector('.popup__close');

    closeButton.addEventListener('click', function () {
      closePopup();
    });

    var onCardEscKeyDown = function (evt) {
      if (evt.key === 'Escape') {
        closePopup();

        document.removeEventListener('keydown', onCardEscKeyDown);
      }
    };

    document.addEventListener('keydown', onCardEscKeyDown);

    var filterContainer = window.default.map.querySelector('.map__filters-container');

    filterContainer.before(nodeElement);
  };
})();

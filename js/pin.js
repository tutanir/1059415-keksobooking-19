'use strict';

(function () {

  var map = window.default.map;
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var nodeElement = pinTemplate.cloneNode(true);
    nodeElement.style.left = (pin.location.x - nodeElement.offsetWidth / 2) + 'px';
    nodeElement.style.top = (pin.location.y - nodeElement.offsetHeight) + 'px';
    var img = nodeElement.querySelector('img');
    img.src = pin.author.avatar;

    nodeElement.addEventListener('click', function (evt) {
      window.card.close();
      window.card.render(pin);

      evt.currentTarget.classList.add('map__pin--active');
    });

    return nodeElement;
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPin(data[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.renderPins = renderPins;

})();

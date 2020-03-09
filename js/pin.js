'use strict';

(function () {
  var renderPin = function (pin) {
    var nodeElement = pinTemplate.cloneNode(true);
    nodeElement.style.left = (pin.location.x - nodeElement.offsetWidth / 2) + 'px';
    nodeElement.style.top = (pin.location.y - nodeElement.offsetHeight) + 'px';
    var img = nodeElement.querySelector('img');
    img.src = pin.author.avatar;

    nodeElement.addEventListener('click', function (evt) {
      closePopup();
      renderCard(pin);

      evt.currentTarget.classList.add('map__pin--active');
    });

    return nodeElement;
  };
  
})();

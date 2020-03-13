'use strict';


(function () {
  var mainPin = window.map.pinMain;
  var mapWidth = window.default.map.offsetWidth;

  var Range = {
    MIN: 130,
    MAX: 630
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var topOffset = mainPin.offsetTop - shift.y;
      var leftOffset = mainPin.offsetLeft - shift.x;

      leftOffset = (leftOffset < 1) ? leftOffset = 1 : leftOffset;
      leftOffset = (leftOffset > (mapWidth - mainPin.offsetWidth)) ? leftOffset = (mapWidth - mainPin.offsetWidth) : leftOffset;

      topOffset = (topOffset < (Range.MIN - mainPin.offsetHeight)) ? topOffset = (Range.MIN - mainPin.offsetHeight) : topOffset;
      topOffset = (topOffset > (Range.MAX - mainPin.offsetHeight)) ? topOffset = (Range.MAX - mainPin.offsetHeight) : topOffset;

      mainPin.style.top = topOffset + 'px';
      mainPin.style.left = leftOffset + 'px';

      window.map.setAddress(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

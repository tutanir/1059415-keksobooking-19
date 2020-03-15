'use strict';

(function () {
  var TIMEOUT = 10000;

  var Codes = {
    ok: 200
  };

  var request = function (url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === Codes.ok) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT; // 10s
    xhr.open('GET', url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    load: request,
    save: request
  };
})();

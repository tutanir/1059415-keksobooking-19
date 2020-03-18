'use strict';

(function () {
  var priceMap = {
    'low': {
      start: 0,
      and: 10000
    },
    'middle': {
      start: 10000,
      and: 50000
    },
    'high': {
      start: 50000,
      and: Infinity
    }
  };

  filterElements = Array.from(document.querySelector('map__filters').children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap(filter.value).start && data.offer.type < priceMap(filter.value).end;
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      var checkListElements = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));

      return.checkListElements.every(function (it) {
        return data.offer.features.some(function (features) {
          return feature === it.value;
        });
      });
    }
  };

  var filterData = function (data) {
    return data.filter(function (item) {
      return filterElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  window.filter =filterData;
})();

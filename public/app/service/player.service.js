app.factory('playerService', [function() {
  'use strict';

  var playersNumber = 0;

  return {
    newPlayer: function(isDealer, nick) {
      ++playersNumber;

      if (isDealer) {
        return new Dealer();

      } else {
        return new Player(nick);
      }
    },
    removePlayer: function() {
      --playersNumber;
    },
    countPlayers: function() {
      return playersNumber;
    }
  };
}]);

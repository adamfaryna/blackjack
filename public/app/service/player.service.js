app.factory('playerService', [function() {
  'use strict';

  var playersNumber = 0;

  return {
    newPlayer: function(isDealer, nick) {
      ++playersNumber;

      if (isDealer) {
        return new Dealer();

      } else {
        var player = new Player(nick);
        player.prototype = new Dealer();
        return player;
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

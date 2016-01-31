app.factory('playerService', [function() {
  'use strict';

  function Player() {

  }

  function Dealer() {

  }

  Dealer.prototype = Player;

  return {
    newPlayer: function (isDealer) {
      return isDealer ? new Dealer() : new Player();
    }
  };
}]);

'use strict';

app.factory('playerService', [function() {
  function Dealer() {
    this.nick = 'Dealer';
    this.cards = [];
  }

  Dealer.prototype.cardsSum = function() {
    var sum = 0;
    var aces = 0;

    this.cards.forEach(function(card) {
      if (card.value === 1) {
        ++aces;
      }

      sum += card.value > 10 ? 10 : card.value;
    });

    for (var i = 0; i != aces; i++) {
      if (sum + 10 > 21) {
        break;
      }

      sum += 10;
    }

    return sum;
  };

  function Player(nick) {
    Dealer.call(this);
    this.nick = nick;
    this.inGame = true;
    this.insuranceBought = false;
  }

  Player.prototype = Object.create(Dealer.prototype);
  Player.prototype.constructor = Player;

  return {
    newPlayer: function(isDealer, nick) {
      return isDealer === true ? new Dealer() : new Player(nick);
    }
  };
}]);

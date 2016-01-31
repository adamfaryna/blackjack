app.factory('deckService', [function() {

  function Card(color, value) {
    this.color = color;
    this.value = value;
  }

  function Deck() {
    this.cards = [];

    for (var c = 1; c != 5; c++) {
      for (var v = 1; v != 14; v++) {
        this.cards.push(new Card(c, v));
      }
    }
  }

  Deck.prototype.shuffle = function() {
    for(var j, x, i = this.cards.length; i;) {
      j = Math.floor(Math.random() * i);
      x = this.cards[--i];
      this.cards[i] = this.cards[j];
      this.cards[j] = x;
    }
  };

  Deck.prototype.getCard = function() {
    return this.cards.pop();
  };

  return {
    newDeck: function() {
      return new Deck();
    }
  };
}]);

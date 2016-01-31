app.directive('playerTable', ['componentsPath', 'deckService', function(componentsPath, deckService) {
  return {
    restrict: 'E',
    scope: {
      player: '=',
      isActive: '@'
    },
    templateUrl: componentsPath + '/playerTable/playerTable.html',
    link: function(scope, elm, attrs) {

      scope.$on('hit', function(e, playerNick) {
        if (scope.player.nick === playerNick) {
          scope.hit();
        }
      });

      scope.hit = function() {
        var card = deckService.getDeck().getCard();
        var cardElem = $('<card>');

        if (scope.player.cards.length === 0 && !(scope.player instanceof Player)) {
          cardElem.attr('class', 'hidden');

        } else {
          cardElem.attr({
            color: card.color,
            value: card.value
          });
        }

        $('.cards-holder', elm).append(cardElem);
        scope.player.cards.push(card);

        if (scope.player.cardsSum() > 21) {
          scope.player.loses += 1;
          scope.player.inGame = false;
          alert(scope.player.nick + ' loses!');
          scope.stand();
        }
      };

      scope.stand = function() {
        scope.$emit('stand');
      };

      scope.buyInsurance = function() {
        scope.player.insuranceBought = true;
      };

      scope.showCommands = function() {
        return (scope.player instanceof Player) && scope.isActive === 'true' && scope.player.inGame;
      };
    }
  };
}]);

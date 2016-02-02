'use strict';

app.directive('playerTable', ['componentsPath', 'deckService', function(componentsPath, deckService) {
  return {
    restrict: 'E',
    scope: {
      player: '=',
      isActive: '@'
    },
    templateUrl: componentsPath + '/playerTable/playerTable.html',
    link: function(scope, elm) {
      scope.$on('hit', function(e, playerNick) {
        if (scope.player.nick === playerNick) {
          scope.hit();
        }
      });

      scope.$on('show-dealer-cards', function() {
        if (isDealer()) {
          $('.cards-holder .hidden', elm).attr({
            color: scope.player.cards[0].color,
            value: scope.player.cards[0].value
          }).removeClass('hidden');

          while (scope.player.cardsSum() < 18) {
            scope.hit();
          }

          scope.$emit('dealer-shown-cards');
        }
      });

      scope.hit = function() {
        var card = deckService.getDeck().getCard();
        var cardElem = $('<card>');

        if (scope.player.cards.length === 0 && isDealer()) {
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
          if (isDealer()) {
            scope.$emit('dealer-loses');

          } else {
            scope.playerLoses();
          }
        }
      };

      scope.stand = function() {
        scope.$emit('stand');
      };

      scope.playerLoses = function() {
        scope.$emit('player-loses', scope.player.nick);
      };

      scope.buyInsurance = function() {
        scope.player.insuranceBought = true;
      };

      scope.showCommands = function() {
        return scope.isActive === 'true' && scope.player.inGame;
      };

      function isDealer() {
        return scope.player.nick === 'Dealer';
      }
    }
  };
}]);

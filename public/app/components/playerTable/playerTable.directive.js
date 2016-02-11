'use strict';

angular.module('blackjack').directive('playerTable', ['componentsPath', 'deckService', function(componentsPath, deckService) {
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

      scope.$on('clear-table', function (e, playerNick) {
        if (scope.player.nick === playerNick) {
          $('.cards-holder', elm).empty();
        }
      });

      scope.$on('show-dealer-cards', function() {
        if (scope.player.isDealer()) {
          $('.cards-holder .hidden', elm).attr({
            color: scope.player.cards[0].color,
            value: scope.player.cards[0].value
          }).removeClass('hidden');

          while (scope.player.cardsSum() < 18) {
            if (!scope.hit()) {
              return;
            }
          }

          scope.$emit('dealer-shown-cards');
        }
      });

      scope.hit = function() {
        var card = deckService.getDeck().getCard();
        var cardElem = $('<card>');

        if (scope.player.cards.length === 0 && scope.player.isDealer()) {
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
          if (scope.player.isDealer()) {
            scope.$emit('dealer-loses');
            return false;

          } else {
            scope.$emit('player-loses', scope.player.nick);
          }
        }

        return true;
      };

      scope.stand = function() {
        scope.$emit('stand');
      };

      scope.buyInsurance = function() {
        scope.player.insuranceBought = true;
      };

      scope.showCommands = function() {
        return scope.isActive === 'true' && scope.player.inGame;
      };
    }
  };
}]);

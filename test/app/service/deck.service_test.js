'use strict';

describe('blackjack module', function () {
  beforeEach(function () {
    module('blackjack');
    jasmine.addMatchers({
      toEqualCardsOrder: function () {
        return {
          compare: function (actual, expected) {
            var result = {};
            for (var i = 0; i !== actual.cards.length; i++) {
              if (actual.cards[i] !== expected.cards[i]) {
                result.pass = true;
                break;
              }
            }

            if (!result.pass) {
              result.message = 'Cards are in the same order';
            }

            return result;
          }
        };
      }
    });
  });

  describe('deck service', function () {
    it('should create deck', inject(function (deckService) {
      expect(deckService.newDeck()).toBeDefined();
    }));

    describe('that can create deck', function () {
      it('that has 52 cards', inject(function (deckService) {
        var deck = deckService.newDeck();
        expect(deck.cards.length).toBe(52);
      }));

      it('that could be shuffled', inject(function (deckService) {
        var deck = deckService.newDeck();
        var deckBefore = angular.copy(deck);

        var shuffleCount = 0;
        do {
          deck.shuffle();

        } while (shuffleCount++ !== 10); // ten time for sure

        expect(deck).toEqualCardsOrder(deckBefore);
      }));
    });
  });
});

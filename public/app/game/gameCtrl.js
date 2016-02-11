'use strict';

angular.module('blackjack').controller('GameCtrl', ['$q', '$scope', '$rootScope' ,'playerService', 'infoService', 'deckService', function ($q, $scope, $rootScope, playerService, infoService, deckService) {

  function Game() {
    this.stage = 0;
    this.players = [];
    this.currentPlayerIndex = 1;
    this.players.push(playerService.newPlayer(true));
    this.deck = deckService.newDeck();
    this.deck.shuffle();
  }

  Game.prototype.deal = function() {
    var self = this;
    self.stage = 1;

    this.players.forEach(function(player, index) {
      infoService.info('Player ' + index);

      for (var i = 0; i !== 2; i++) {
        $rootScope.$broadcast('hit', player.nick);
      }
    });

    self.buyHitStand();
  };

  Game.prototype.buyHitStand = function() {
    infoService.info('Buy insurance, Hit or Stand');
    this.stage = 2;
  };

  Game.prototype.checkDealer = function() {
    this.stage = 3;
    $rootScope.$broadcast('show-dealer-cards');
  };

  function anyPlayersLeftInGame() {
    for (var i = 1; i !== $scope.game.players.length; i++) {
      if ($scope.game.players[i].inGame) {
        return true;
      }
    }

    return false;
  }

  function clearDealerTable() {
    $rootScope.$broadcast('clear-table', 'Dealer');
  }

  function showDialog(message) {
    var deferred = $q.defer();

    $('body').on('dialogclose', function() {
      $('body').off('dialogclose');
      deferred.resolve();
    });

    $rootScope.$broadcast('show-dialog', {
      message: message
    });

    return deferred.promise;
  }

  function finishGame() {
    return showDialog('Game finished! Time for tea.').then(function() {
      clearDealerTable();
      infoService.info('');
      $scope.game = new Game();
    });
  }

  function dealerWins() {
    showDialog('Dealer wins!');
    finishGame();
  }

  function anotherPlayerTurn() {
    $scope.game.currentPlayerIndex += 1;

    if ($scope.game.players.length === $scope.game.currentPlayerIndex) {
      if (!anyPlayersLeftInGame()) {
        dealerWins();
        return;
      }

      $scope.game.checkDealer();
    }
  }

  $scope.addPlayer = function() {
    if ($scope.newPlayerName) {
      for (var i = 0; i !== $scope.game.players.length; i++) {
        if ($scope.game.players[i].nick === $scope.newPlayerName || 'Dealer' === $scope.newPlayerName) {
          showDialog('Player ' + $scope.newPlayerName + ' already exists, choose other name.');
          $scope.newPlayerName = '';
          return false;
        }
      }

      $scope.game.players.push(playerService.newPlayer(false, $scope.newPlayerName));
      $scope.newPlayerName = '';
    }
  };

  $scope.play = function () {
    if ($scope.game.players.length === 1) {
      showDialog('You must add at least one player.');
      return false;
    }

    $scope.game.deal();
  };

  $scope.$on('dealer-loses', function() {
    var info = 'Dealer loses! ';

    for (var i = 1; i !== $scope.game.players.length; i++) {
      var player = $scope.game.players[i];

      if (player.inGame) {
        info += ' ' + player.nick;
      }
    }

    showDialog(info + ' all players wins!').then(finishGame);
  });

  $scope.$on('stand', anotherPlayerTurn);

  $scope.$on('player-loses', function(e, playerNick) {
    for (var i = 1; i !== $scope.game.players.length; i++) {
      var player = $scope.game.players[i];

      if (player.nick === playerNick) {
        player.inGame = false;
        player.loses += 1;
        showDialog('Player ' + player.nick + ' loses!');
        break;
      }
    }

    anotherPlayerTurn();
  });

  $scope.$on('dealer-shown-cards', function() {
    $scope.game.stage = 4;
    var dealerCardSum = $scope.game.players[0].cardsSum();
    var message = '';

    for (var i = 1; i !== $scope.game.players.length; i++) {
      var playerCardSum = $scope.game.players[i].cardsSum();

      if (dealerCardSum === playerCardSum) {
        message += ' Player ' + $scope.game.players[i].nick + ' tie with Dealer!';

      } else if (dealerCardSum < playerCardSum) {
        message += ' Player ' + $scope.game.players[i].nick + ' wins!';

      } else {
        message += ' Player ' + $scope.game.players[i].nick + ' loses!';
      }
    }

    infoService.info(message);
    finishGame();
  });

  $scope.game = new Game();
  $scope.newPlayerName = '';
}]);

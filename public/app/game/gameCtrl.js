app.controller('GameCtrl', ['$scope', 'playerService', 'infoService', 'deckService', '$timeout', function ($scope, playerService, infoService, deckService, $timeout) {
  'use strict';

  $scope.game = new Game();
  //$scope.gameOn = false;
  //$scope.insuranceBought = false;
  $scope.newPlayerName = '';

  var currentGame;

  var gameStages = {
    0: 'not started',
    1: 'deal',
    2: 'buy / hit / stand',
    3: 'check dealer',
    4: 'result'
  };

  function Game() {
    this.stage = 0;
    this.currentPlayerIndex = 1;
    this.players = [];
    this.players.push(playerService.newPlayer(true));
    this.deck = deckService.newDeck();
    this.deck.shuffle();
  }

  Game.prototype.deal = function() {
    var self = this;
    self.stage = 1;

    //infoService.info('Lets deal!');

    this.players.forEach(function(player, index) {
      infoService.info('Player ' + index);

      for (var i = 0; i != 2; i++) {
        $scope.$broadcast('hit', player.nick);
      }
    });

    self.buyHitStand();
  };

  Game.prototype.buyHitStand = function() {
    var self = this;
    self.stage = 2;

    infoService.info('Buy insurance, Hit or Stand');

    $scope.$on('stand', function () {
      if (self.players.length === self.currentPlayerIndex) {
        self.currentPlayerIndex = 1;
        self.checkDealer();
        return;
      }

      self.currentPlayerIndex += 1;
    });
  };

  Game.prototype.checkDealer = function() {
    self.stage = 3;
  };

  $scope.addPlayer = function() {
    if ($scope.newPlayerName) {
      for (var i = 0; i != $scope.game.players.length; i++) {
        if ($scope.game.players[i].nick === $scope.newPlayerName) {
          alert('User ' + $scope.newPlayerName + ' already exists, choose other name.');
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
      alert('You must add at least one player.');
      return false;
    }

    $scope.game.deal();
  };
}]);

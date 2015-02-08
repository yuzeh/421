define([], function () {
  function randomDie() {
    return 1 + Math.floor(6 * Math.random());
  }

  function Round() {
    this.rollHistory = [];
  }

  Round.prototype.isDone = function() {
    return this.rollHistory.length >= 3;
  }

  Round.prototype.getLastRoll = function() {
    if (this.rollHistory.length === 0) {
      return null;
    } else {
      return this.rollHistory[this.rollHistory.length - 1];
    }
  }

  /**
   * @param indicesToKeep an array of indices to keep (prevent from changing).
   */
  Round.prototype.roll = function (indicesToKeep) {
    if (this.rollHistory.length >= 3) {
      throw new Error("Round is already done!");
    }

    var previousRoll = this.getLastRoll();
    if (!previousRoll || !indicesToKeep) {
      indicesToKeep = [];
    }

    var dice = [];
    for (var i = 0; i < 3; ++i) {
      if (indicesToKeep.indexOf(i) < 0) {
        dice.push(randomDie());
      } else {
        dice.push(previousRoll[i]);
      }
    }

    this.rollHistory.push(dice);
    return dice;
  };

  // Stretch: implement full game simulator
  function Game(numRounds, playerNames) {
    this.numRounds = numRounds;
    this.playerNames = playerNames;
  }

  return { Round: Round, };
});

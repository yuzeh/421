define(['math'], function (math) {
  // Convenience macros
  function set(m, ind, val) {
    if (ind.constructor === Array) {
      m.subset(math.index.apply(math.index, ind), val);
    } else {
      m.subset(math.index(ind), val);
    }
  }

  function get(m, ind) {
    if (ind.constructor === Array) {
      return m.subset(math.index.apply(math.index, ind));
    } else {
      return m.subset(math.index(ind));
    }
  }

  function idiv(x, y) { return Math.floor(x / y); }

  var SCORES;
  var TRANSITIONS;
  var TRANSITIONS_TIMES_SCORES;

  function diceToIndex(a, b, c) {
    return ((c - 1) * 6 + (b - 1)) * 6 + (a - 1);
  }

  function indexToDice(index) {
    var x = index;
    var a = (x % 6) + 1; x = idiv(x, 6);
    var b = (x % 6) + 1; x = idiv(x, 6);
    var c = (x % 6) + 1;
    return [a, b, c];
  }

  function maskToIndex(a, b, c) {
    var index = 0;
    if (a) index += 1;
    if (b) index += 2;
    if (c) index += 4;
    return index;
  }

  function indexToMask(index) {
    return [
      (index & (1 >> 0)) !== 0,
      (index & (1 >> 1)) !== 0,
      (index & (1 >> 2)) !== 0,
    ];
  }

  /** Returns the score of the three dice. Does not take into account certain rules. */
  function score(a, b, c) {
    var dice = [a, b, c];
    dice.sort();
    var x = dice[0], y = dice[1], z = dice[2];
    if (x === 1 && y === 2 && z === 4) {
      return (a === 2) ? 10 : 8;
    } else if (x === y && x === z) {
      return (x === 1) ? 7 : x;
    } else if (x === 1 && y === 1) {
      return z;
    } else if (x + 1 === y && y + 1 === z) {
      return 3;
    } else {
      return 1;
    }
  }

  function init() {
    initScores();
    initTransitions();
    initProducts();
  }

  function initScores() {
    SCORES = math.zeros(216);
    for (var i = 0; i < 216; ++i) {
      var dice = indexToDice(i);
      var s = score(dice[0], dice[1], dice[2]);
      set(SCORES, i, s);
    }
  }

  function initTransitions() {
    TRANSITIONS = [];
    for (var i = 0; i < 8; ++i) {
      var r = indexToMask(i);
      var m = math.zeros(216, 216);
      var denom = 1;
      for (var j = 0; j < r.length; ++j) {
        if (r[j]) {
          denom *= 6;
        }
      }

      for (var s = 0; s < 216; ++s) {
        var source = indexToDice(s);
        for (var d = 0; d < 216; ++d) {
          var destination = indexToDice(d);
          var value;
          if (!r[0] && (source[0] != destination[0])) {
            value = 0;
          } else if (!r[1] && (source[1] != destination[1])) {
            value = 0;
          } else if (!r[2] && (source[2] != destination[2])) {
            value = 0;
          } else {
            value = 1.0 / denom;
          }
          set(m, [d, s], value);
        }
      }
      TRANSITIONS.push(m);
    }
  }

  function initProducts() {
    TRANSITIONS_TIMES_SCORES = [];
    for (var i = 0; i < 8; ++i) {
      var m = math.multiply(TRANSITIONS[i], SCORES);
      TRANSITIONS_TIMES_SCORES.push(m);
    }
  }

  function getBestChoiceSecondRoll(d1, d2, d3) {
    var index = diceToIndex(d1, d2, d3);
    var bestIndex = 0;
    var bestScore = 0;
    for (var i = 0; i < 8; ++i) {
      var score = get(TRANSITIONS_TIMES_SCORES[i], index);
      if (score > bestScore) {
        bestIndex = i;
        bestScore = score;
      }
    }
    return [indexToMask(bestIndex), bestScore];
  }

  return {
    init: init,
    getTransition: function(i) { return TRANSITIONS[i]; },
    getScores: function() { return SCORES; },
    getBestChoiceSecondRoll: getBestChoiceSecondRoll,
  };
})

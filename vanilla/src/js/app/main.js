requirejs.config({
  baseUrl: '../',
  paths: {
    app: 'js/app',
    jquery: 'lib/jquery/jquery',
    bootstrap: 'lib/bootstrap/bootstrap',
    math: 'lib/mathjs/math.min',
  },
  shim: {
    'bootstrap': ['jquery'],
  },
});

require(['jquery', 'app/calc'], function ($, calc) {
  var DIE_TO_IMAGE = {
    1: {
      large: 'images/die-1-large.png',
      small: 'images/die-1.png',
    },
    2: {
      large: 'images/die-2-large.png',
      small: 'images/die-2.png',
    },
    3: {
      large: 'images/die-3-large.png',
      small: 'images/die-3.png',
    },
    4: {
      large: 'images/die-4-large.png',
      small: 'images/die-4.png',
    },
    5: {
      large: 'images/die-5-large.png',
      small: 'images/die-5.png',
    },
    6: {
      large: 'images/die-6-large.png',
      small: 'images/die-6.png',
    },
  };

  function maskToFlavorText(mask) {
    var a = mask[0], b = mask[1], c = mask[2];
    if (a && b && c) {
      return 'Everything';
    } else if (a && b && !c) {
      return '1, 2';
    } else if (a && !b && c) {
      return '1, 3';
    } else if (a && !b && !c) {
      return '1';
    } else if (!a && b && c) {
      return '2, 3';
    } else if (!a && b && !c) {
      return '2';
    } else if (!a && !b && c) {
      return '3';
    } else {
      return 'Nothing';
    }
  }

  function getDice() {
    return [
      $('#die-image-1').data('die-value'),
      $('#die-image-2').data('die-value'),
      $('#die-image-3').data('die-value'),
    ];
  }

  function round(n) {
    return Math.round(n * 1000) / 1000;
  }

  function render() {
    var d1 = $('#die-image-1').data('die-value');
    var d2 = $('#die-image-2').data('die-value');
    var d3 = $('#die-image-3').data('die-value');

    $('#die-image-1').attr('src', DIE_TO_IMAGE[d1].large);
    $('#die-image-2').attr('src', DIE_TO_IMAGE[d2].small);
    $('#die-image-3').attr('src', DIE_TO_IMAGE[d3].small);

    $('.die-num-1').text(d1);
    $('.die-num-2').text(d2);
    $('.die-num-3').text(d3);

    var results = recomputeBestChoices();

    $('#first-reroll').text(maskToFlavorText(results.first.mask));
    $('#first-expected').text(round(results.first.expected));
    $('#second-reroll').text(maskToFlavorText(results.second.mask));
    $('#second-expected').text(round(results.second.expected));
  }

  function recomputeBestChoices() {
    var dice = getDice();
    var a = dice[0];
    var b = dice[1];
    var c = dice[2];
    var firstResult = calc.getBestFirstRollChoice(a, b, c);
    var secondResult = calc.getBestSecondRollChoice(a, b, c);

    function resultToOut(result) {
      return {
        mask: result[0],
        expected: result[1],
      };
    }

    return {
      first: resultToOut(firstResult),
      second: resultToOut(secondResult),
    };
  }

  function incrementDieData($die) {
    var value = $die.data('die-value');
    var newValue = value == 6 ? 1 : (value + 1);
    $die.data('die-value', newValue);
  }

  $(document).ready(function() {
    calc.init(function() {
      ['#die-image-1', '#die-image-2', '#die-image-3'].forEach(function (selector) {
        var $die = $(selector);
        $die.on('click', function() {
          incrementDieData($die);
          render();
        });
      });
    });
  });
});

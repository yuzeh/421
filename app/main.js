requirejs.config({
  baseUrl: 'lib',
  paths: {
    'app': '../app',
    'math': 'mathjs/math.min',
    'jquery': 'jquery/jquery',
  },
});

require(['jquery', 'app/calc'], function ($, calc) {
  // Die 1 is the big die
  var $d1 = $('#die1');
  var $d2 = $('#die2');
  var $d3 = $('#die3');

  var $s1 = $('#display1');
  var $s2 = $('#display2');
  var $s3 = $('#display3');

  var $secondChoice = $('#second-roll-choice');
  var $secondExpected = $('#second-roll-expected');
  var $firstChoice = $('#first-roll-choice');
  var $firstExpected = $('#first-roll-expected');

  calc.init();

  $('#submit').on('click', function() {
    var d1 = Number($d1.val());
    var d2 = Number($d2.val());
    var d3 = Number($d3.val());

    $s1.html(String(d1));
    $s2.html(String(d2));
    $s3.html(String(d3));

    var bestFirst = calc.getBestFirstRollChoice(d1, d2, d3);
    var bestSecond = calc.getBestSecondChoiceRoll(d1, d2, d3);
    $firstChoice.html(maskToFlavorText(bestFirst[0]));
    $firstExpected.html(String(bestFirst[1]));
    $secondChoice.html(maskToFlavorText(bestSecond[0]))
    $secondExpected.html(String(bestSecond[1]));

  });

  function maskToFlavorText(mask) {
    var a = mask[0], b = mask[1], c = mask[2];
    if (a && b && c) {
      return 'all of them';
    } else if (a && b && !c) {
      return 'both first and second';
    } else if (a && !b && c) {
      return 'both first and third';
    } else if (a && !b && !c) {
      return 'just the first one';
    } else if (!a && b && c) {
      return 'both second and third';
    } else if (!a && b && !c) {
      return 'just the second one';
    } else if (!a && !b && c) {
      return 'just the third one';
    } else {
      return 'none of them';
    }
  }

});

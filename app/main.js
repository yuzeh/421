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

  calc.init();

  $('#submit').on('click', function() {
    var d1 = Number($d1.val());
    var d2 = Number($d2.val());
    var d3 = Number($d3.val());

    $s1.html(String(d1));
    $s2.html(String(d2));
    $s3.html(String(d3));

    var bestChoiceSecond = calc.getBestChoiceSecondRoll(d1, d2, d3);
    console.log(bestChoiceSecond);
  });

});

define(['jquery', 'app/calc', 'react'], function ($, calc, React) {
  var SPACE = ' ';
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

  function round(n) {
    return Math.round(n * 1000) / 1000;
  }

  var Die = React.createClass({
    render: function() {
      var size = this.props.size;
      var value = this.props.value;
      var handleClick = this.props.handleClick;
      return (
        <div className="col-xs-2">
          <img src={DIE_TO_IMAGE[value][size]} onClick={handleClick} />
        </div>
      );
    },
  });

  var DiceDisplay = React.createClass({
    diceSizes: ['large', 'small', 'small'],

    render: function() {
      return (
        <div className="row">
          <div className="col-xs-3"></div>
          {this.props.dice.map(function(value, i) {
            var size = this.diceSizes[i];
            return (
              <Die
                size={size}
                value={value}
                key={i}
                ref={'die-' + i}
                handleClick={this.props.handleDieChange.bind(null, i)}
              />
            );
          }, this)}
          <div className="col-xs-3"></div>
        </div>
      );
    },
  });

  var ResultTable = React.createClass({
    render: function() {
      return (
        <table className="table">
          <caption>
            When you roll a{SPACE}
            <strong>{this.props.dice[0]}</strong> -{SPACE}
            <strong>{this.props.dice[1]}</strong> -{SPACE}
            <strong>{this.props.dice[2]}</strong>{SPACE}
            (big <strong>{this.props.dice[0]}</strong>)...
          </caption>
          <thead>
            <tr>
              <th>On what roll?</th>
              <th>Reroll...</th>
              <th><em>E[</em>score<em>]</em></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">First</th>
              <td>{this.props.results.first.mask}</td>
              <td>{this.props.results.first.expected}</td>
            </tr>
            <tr>
              <th scope="row">Second</th>
              <td>{this.props.results.second.mask}</td>
              <td>{this.props.results.second.expected}</td>
            </tr>
          </tbody>
        </table>
      );
    },
  });

  var Calculator = React.createClass({
    maskToFlavorText: function(mask) {
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
    },

    resultToOut: function(result) {
      return {
        mask: this.maskToFlavorText(result[0]),
        expected: round(result[1]),
      };
    },

    handleDieChange: function(dieKey) {
      var dice = this.state.dice.slice();
      {
        var dieValue = dice[dieKey];
        var newDieValue = dieValue >= 6 ? 1 : (dieValue + 1);
        dice[dieKey] = newDieValue;
      }

      var a = dice[0];
      var b = dice[1];
      var c = dice[2];
      var firstResult = calc.getBestFirstRollChoice(a, b, c);
      var secondResult = calc.getBestSecondRollChoice(a, b, c);
      this.setState({
        dice: dice,
        results: {
          first: this.resultToOut(firstResult),
          second: this.resultToOut(secondResult),
        },
      });
    },

    getInitialState: function() {
      return {
        dice: [2, 4, 1],
        results: {
          first: {
            mask: '-',
            expected: '-',
          },
          second: {
            mask: '-',
            expected: '-',
          },
        },
      };
    },

    render: function() {
      return (
        <div className="col-xs-12">
          <DiceDisplay
            dice={this.state.dice}
            handleDieChange={this.handleDieChange}
          />
          <hr />
          <ResultTable
            dice={this.state.dice}
            ref="resultsTable"
            results={this.state.results}
          />
        </div>
      );
    },
  });

  $(document).ready(function() {
    calc.init(function() {
      React.render(
        <Calculator />,
        document.getElementById('content')
      );
    });
  });
});

/* React modules */
var React = require('react');
var ChallengeParameters = require('./ChallengeParameters.jsx'); // get test parameters from ChallengeParameters and then pass into KATester module

// code adapted from https://www.npmjs.com/package/react-codemirror
//var Codemirror = require('react-codemirror');

/* KATester testing API */
var KATester = require('../testing-utils/KATester');

var ChallengeFramework = React.createClass({

  getInitialState: function() {
    return {
      parameters: null,
      code: ""      
    }
  },

  updateCode: function(newCode) {
    this.setState({
      code: newCode
    });
  },

  render: function() {
    var options = {
      lineNumbers: true
    };

    return (
      <div className="ChallengeFramework">
        <h1> Khan Academy CS Challenge Framework </h1>
        <ChallengeParameters />
        <textarea name="description" onChange={this.updateCode} value={this.state.code} />
      </div>
    );
  }
});

module.exports = ChallengeFramework;

// KATester.mustHave( "var x = 42; for (var i = 0; i < 10; i++ ) { console.log( \"Hello world\" ) }; while ( true ) { console.log( \"Hooray!\" ) } if ( 5 < 3 ) { console.log (\"What is going on?\") } else { console.log( \"It's all good\"); }", null );
// <Codemirror value={this.state.code} onChange={this.updateCode} options={options} /> 
//         <textarea rows="4" cols="50" onChange={this.updateCode} value={this.state.code}> </textarea>

/* React modules */
var React = require('react');
var ReactDOM = require('react-dom');
var AceEditor = require('react-ace');
var brace = require('brace');
require('brace/mode/javascript');
require('brace/theme/github');

/* KATester testing API */
var KATester = require('../testing-utils/KATester.js');
// while ( true ) { console.log( \"Hooray!\" ); }
//var results = KATester.matchRequirements("var x = 42; while ( true ) { console.log( \"Hooray!\" ); } if ( 5 < 3 ) { console.log (\"What is going on?\"); } else { console.log( \"It's all good\"); }", ['ForStatement'], true );
var results = KATester.matchRequirements( "for(var i = 0; i < 10; i++) { if( true ) { hooray(); if (false) { boo(); } } } while(true) { hello(); }",
                                          "VariableDeclaration", true );

var ChallengeFramework = React.createClass({

  getInitialState: function() {
    return {
      code: ""    
    }
  },

  updateCode: function(newCode) {
    //KATester.mustHave( newCode, {"req1" : "ForStatement"} );
  },

  render: function() {
    return (
      <div className="ChallengeFramework">
        <h1> Khan Academy CS Challenge Framework </h1>
        <AceEditor mode="javascript" theme="github" ref="code" />
      </div>
    );
  }
});

module.exports = ChallengeFramework;

// KATester.mustHave( "var x = 42; for (var i = 0; i < 10; i++ ) { console.log( \"Hello world\" ) }; while ( true ) { console.log( \"Hooray!\" ) } if ( 5 < 3 ) { console.log (\"What is going on?\") } else { console.log( \"It's all good\"); }", null );

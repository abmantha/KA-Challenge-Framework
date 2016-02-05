/* React modules */
var React = require('react');
var ReactDOM = require('react-dom');
var AceEditor = require('react-ace');
var brace = require('brace');
require('brace/mode/javascript');
require('brace/theme/github');

/* KATester testing API */
var KATester = require('../testing-utils/KATester.js');
//var results = KATester.matchRequirements( "for(var i = 0; i < 10; i++) { bye(); hello();} while(true) { hello(); }", "VariableDeclaration", true );
//var results = KATester.matchRequirements( "var x = 42; for (var i = 0; i < 10; i++ ) { console.log( \"Hello world\" ); } while ( true ) { console.log( \"Hooray!\" ); } if ( 5 < 3 ) { console.log (\"What is going on?\"); } else { console.log( \"It's all good\"); }", "", true );
//var results = KATester.matchRequirements( "if( true ) { hooray(); if (false) { boo(); } }", "", true );
//var results = KATester.matchRequirements( "var x = 42;", "", true );
//var results = KATester.matchRequirements( "var i = {}", "", true );

// var results = KATester.check( "if( true ) { hooray(); if (false) { boo(); } }", "IfStatement", "WhileStatement", "IfStatement[CallExpression|IfStatement[CallExpression]]" );
// console.log( "WhiteListTest: " + results.passedWhiteList );
// console.log( "BlackListTest: " + results.passedBlackList );
// console.log( "StructureTest: " + results.passedStructureTest );

var ChallengeFramework = React.createClass({

  getInitialState: function() {
    return {
      whiteListTest: "VariableDeclaration",
      blackListTest: "ForStatement",
      roughStructureTest: "VariableDeclaration",
      whiteListResult: false,
      blackListResult: false,
      roughStructureResult: false
    };
  },

  updateCode: function(newCode) {
    setTimeout( function() {
      var results = KATester.check( newCode, "VariableDeclaration", "ForStatement", "VariableDeclaration" );
      this.setChange({
        whiteListResult: results.passedWhiteList,
        blackListResult: results.passedBlackList,
        roughStructureResult: results.passedStructureTest
      });
    }, 2000 );
  },

  render: function() {
    return (
      <div className="ChallengeFramework">
        <h1> Khan Academy CS Challenge Framework </h1>
        <AceEditor mode="javascript" theme="github" onChange={this.updateCode} />
        <div className="results">
          <p> White list result: {this.state.whiteListResult} </p>
          <p> Black list result: {this.state.blackListResult} </p>
          <p> Rough structure result: {this.state.roughStructureResult} </p>
        </div>
      </div>
    );
  }
});

module.exports = ChallengeFramework;

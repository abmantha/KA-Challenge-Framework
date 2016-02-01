/* Khan Academy CS Challenge Framework */
var esprima = require('esprima');

var KATester = (function() {
  mustHave = function( code, requirements ) {
    console.log( "Calling mustHave from KATester module" );

    // Tier 1 - Check that code requirements match the statistics produced from tree traversal
    // 1. Generate AST
    // 2. Traverse AST and build program statistics - code adapted from http://sevinf.github.io/blog/2012/09/29/esprima-tutorial/
    // 3. Compare requirements to AST
    var AST = esprima.parse( code );
    var programStats = {};
    var addToStatistics = function(nodeType) {
      if ( !programStats[nodeType] ) {
        programStats[nodeType] = { invocations: 0 };
      }
      programStats[nodeType].invocations++;
    };

    /* AST Types to store: 
      - IfStatement
      - SwitchStatement
      - WhileStatement
      - ForStatement
      - VariableDeclaration
      - FunctionDeclaration
      - Literal
        - String
        - boolean
        - null
        - number
        - RegExp
    */
    traverse(AST, function(node) {
      addToStatistics(node.type);
    });

    for( var k in programStats ) {
      console.log( "Syntax Type: " + k + " invoked: " + programStats[k].invocations );
    }

  };

  mustNotHave = function() {
    console.log( "Calling mustNotHave from KATester module" );
  };

  determineStructure = function() {
    console.log( "Calling determineStructure from KATester module" );
  };


  // 2. Traverse AST and build program statistics - code adapted from http://sevinf.github.io/blog/2012/09/29/esprima-tutorial/  
  traverse = function(astNode, funct) {
    funct(astNode);
    for ( var n in astNode ) {
      if ( astNode.hasOwnProperty(n) ) {
        var childNode = astNode[n];
        if ( typeof childNode === 'object' && childNode !== 'null' ) {
          if ( Array.isArray(childNode) ) {
            childNode.forEach(function(i) {
              traverse(i, funct);
            });
          } else {
            traverse(childNode, funct);
          }
        }
      }
    }
  };

  return {
    mustHave: mustHave,
    mustNotHave: mustNotHave,
    determineStructure: determineStructure
  };
}());

module.exports = KATester;

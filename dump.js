/* Khan Academy CS Challenge Framework */
var esprima = require('esprima');
var _ = require('underscore');

var KATester = (function() {
  // code = string
  // requirements = array of { Type: functional component objects, Frequency: }
  mustHave = function( code, requirements ) {
    console.log( "Calling mustHave from KATester module" );

    // Tier 1 - Check that code requirements match the statistics produced from tree traversal
    // 1. Generate AST
    // 2. Traverse AST and build program statistics - code adapted from http://sevinf.github.io/blog/2012/09/29/esprima-tutorial/
    // 3. Compare requirements to AST
    var AST = esprima.parse( code );
    var programStats = {};
    var addToStatistics = function(node) {
      // if (!_.contains(programStats, node)) {
      //   programStats.push( {type: node.type, frequency: 0} );
      // }
      // _.find(programStats, node).frequency++;

      if ( !programStats[node] ) {
        programStats[node] = { frequency: 0 };
      }
      programStats[node].frequency++;
    };
    traverse(AST, function(node) { addToStatistics(node.type); });

    for ( var i in programStats ) {
      console.log( i + ": " + programStats[i].frequency );
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



/* 
  Syntax = {
      AssignmentExpression: 'AssignmentExpression',
      ArrayExpression: 'ArrayExpression',
      BlockStatement: 'BlockStatement',
      BinaryExpression: 'BinaryExpression',
      BreakStatement: 'BreakStatement',
      CallExpression: 'CallExpression',
      CatchClause: 'CatchClause',
      ConditionalExpression: 'ConditionalExpression',
      ContinueStatement: 'ContinueStatement',
      DoWhileStatement: 'DoWhileStatement',
      DebuggerStatement: 'DebuggerStatement',
      EmptyStatement: 'EmptyStatement',
      ExpressionStatement: 'ExpressionStatement',
      ForStatement: 'ForStatement',
      ForInStatement: 'ForInStatement',
      FunctionDeclaration: 'FunctionDeclaration',
      FunctionExpression: 'FunctionExpression',
      Identifier: 'Identifier',
      IfStatement: 'IfStatement',
      Literal: 'Literal',
      LabeledStatement: 'LabeledStatement',
      LogicalExpression: 'LogicalExpression',
      MemberExpression: 'MemberExpression',
      NewExpression: 'NewExpression',
      ObjectExpression: 'ObjectExpression',
      Program: 'Program',
      Property: 'Property',
      ReturnStatement: 'ReturnStatement',
      SequenceExpression: 'SequenceExpression',
      SwitchStatement: 'SwitchStatement',
      SwitchCase: 'SwitchCase',
      ThisExpression: 'ThisExpression',
      ThrowStatement: 'ThrowStatement',
      TryStatement: 'TryStatement',
      UnaryExpression: 'UnaryExpression',
      UpdateExpression: 'UpdateExpression',
      VariableDeclaration: 'VariableDeclaration',
      VariableDeclarator: 'VariableDeclarator',
      WhileStatement: 'WhileStatement',
      WithStatement: 'WithStatement'
  };

switch (id.length) {
  case 2:
      return (id === 'if') || (id === 'in') || (id === 'do');
  case 3:
      return (id === 'var') || (id === 'for') || (id === 'new') ||
          (id === 'try') || (id === 'let');
  case 4:
      return (id === 'this') || (id === 'else') || (id === 'case') ||
          (id === 'void') || (id === 'with') || (id === 'enum');
  case 5:
      return (id === 'while') || (id === 'break') || (id === 'catch') ||
          (id === 'throw') || (id === 'const') || (id === 'yield') ||
          (id === 'class') || (id === 'super');
  case 6:
      return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
          (id === 'switch') || (id === 'export') || (id === 'import');
  case 7:
      return (id === 'default') || (id === 'finally') || (id === 'extends');
  case 8:
      return (id === 'function') || (id === 'continue') || (id === 'debugger');
  case 10:
      return (id === 'instanceof');
  default:
      return false;
  }
*/


// ========================================================================================================================================================================


/* Khan Academy CS Challenge Framework */
var esprima = require('esprima');
var _ = require('underscore');

var KATester = (function() {
  traverseAST = function( astNode, callback ) {
    callback(astNode.type);
    _.each( astNode, function(childNode) {
      if ( typeof childNode === 'object' && childNode !== null ) {
        if ( Array.isArray(childNode) ) {
          _.each(childNode, function(c) {
            traverseAST(c, callback);
          });
        } else {  
          traverseAST(childNode, callback);
        }
      }
    });
  }

  // code = string
  // requirements = array of syntax types ({ Type: functional component objects, Frequency: })
  // 0 - whitelist; 1 - blacklist
  // mustContain = true (whitelist), = false (blacklist)
  matchRequirements = function( code, requirements, mustContain ) {
    console.log( "Calling mustHave from KATester module" );
    console.log( "Code: " + code );
    _.each( requirements, function(node) {
      console.log( "Requirement: " + node );
    })

    /* Generate the program's AST */
    var programAST = esprima.parse( code );

    console.log( "ProgramAST: " + JSON.stringify(programAST, null, 4) );

    /* Create the set to hold unique syntax structures */
    var programSyntaxSet = new Set();

    /* Traverse the AST and insert new elements to our syntax set */
    traverseAST(programAST, function(node) {
      programSyntaxSet.add( node );
    });





    /* Compare requirements to actual code structure*/
    var passed = true;
    // if ( requirements.length > 0 ) {
    //   if ( mustContain ) {  //white list functionality
    //     console.log( "Beginning white list check." );
    //     _.each(requirements, function(req) {
    //       if ( !programSyntaxSet.has(req) ) {
    //         console.log( "Failed white list" );
    //         passed = false; /* Unsuccessful - does not have component */
    //         return;
    //       }
    //     });
    //   } else {  //black list functionality
    //     console.log( "Beginning black list check." );
    //     _.each(requirements, function(req) {
    //       if ( programSyntaxSet.has(req) ) {
    //         console.log( "Failed black list" );
    //         passed = false; /* Unsuccessful - has component */
    //         return;
    //       }
    //     });
    //   }
    // }

    if ( requirements.length > 0 ) {
      if ( mustContain ) {
        console.log( "Initializing white list test." );
        for (var req in requirements ) {
          if ( requirements.hasOwnProperty(req) ) {
            if ( !programSyntaxSet.has(req) ) {
              console.log( "Failed white list" );
              passed = false; 
              break;
            }
          }
        }
      } else {
        console.log( "Initializing black list test." );
        for ( var req in requirements) {
          if ( requirements.hasOwnProperty(req) ) {
            if ( programSyntaxSet.has(req) ) {
              console.log( "failed black list" );
              passed = false;
              break;
            }
          }
        }
      }
    }

    return passed; /* Successful */
  };

  determineStructure = function() {
    console.log( "Calling determineStructure from KATester module" );
  };

  /* 
    Requirements - specify a nested or non-nested type
      {
        {
          "type" : ForStatement,
          "nested" : {
  
          },
          "seen" : false
        },
        "satisfied" : false
      }

    Verify: 
      If end and requirements satisfied
        - return true
      If end and requirements not satisfied
        - return false
      For every node in subtree
        - Get curr node
          - If curr in requirement
              indicate that it's been seen
          - If curr is an Array
              recurse on curr kids
            else 
              recurse on curr
  */

  verify = function( astNode, requirements ) {
    /* how to check end of tree */

  }

  return {
    matchRequirements: matchRequirements,
    determineStructure: determineStructure
  };
}());

module.exports = KATester;



/* 
  Syntax = {
      AssignmentExpression: 'AssignmentExpression',
      ArrayExpression: 'ArrayExpression',
      BlockStatement: 'BlockStatement',
      BinaryExpression: 'BinaryExpression',
      BreakStatement: 'BreakStatement',
      CallExpression: 'CallExpression',
      CatchClause: 'CatchClause',
      ConditionalExpression: 'ConditionalExpression',
      ContinueStatement: 'ContinueStatement',
      DoWhileStatement: 'DoWhileStatement',
      DebuggerStatement: 'DebuggerStatement',
      EmptyStatement: 'EmptyStatement',
      ExpressionStatement: 'ExpressionStatement',
      ForStatement: 'ForStatement',
      ForInStatement: 'ForInStatement',
      FunctionDeclaration: 'FunctionDeclaration',
      FunctionExpression: 'FunctionExpression',
      Identifier: 'Identifier',
      IfStatement: 'IfStatement',
      Literal: 'Literal',
      LabeledStatement: 'LabeledStatement',
      LogicalExpression: 'LogicalExpression',
      MemberExpression: 'MemberExpression',
      NewExpression: 'NewExpression',
      ObjectExpression: 'ObjectExpression',
      Program: 'Program',
      Property: 'Property',
      ReturnStatement: 'ReturnStatement',
      SequenceExpression: 'SequenceExpression',
      SwitchStatement: 'SwitchStatement',
      SwitchCase: 'SwitchCase',
      ThisExpression: 'ThisExpression',
      ThrowStatement: 'ThrowStatement',
      TryStatement: 'TryStatement',
      UnaryExpression: 'UnaryExpression',
      UpdateExpression: 'UpdateExpression',
      VariableDeclaration: 'VariableDeclaration',
      VariableDeclarator: 'VariableDeclarator',
      WhileStatement: 'WhileStatement',
      WithStatement: 'WithStatement'
  };

switch (id.length) {
  case 2:
      return (id === 'if') || (id === 'in') || (id === 'do');
  case 3:
      return (id === 'var') || (id === 'for') || (id === 'new') ||
          (id === 'try') || (id === 'let');
  case 4:
      return (id === 'this') || (id === 'else') || (id === 'case') ||
          (id === 'void') || (id === 'with') || (id === 'enum');
  case 5:
      return (id === 'while') || (id === 'break') || (id === 'catch') ||
          (id === 'throw') || (id === 'const') || (id === 'yield') ||
          (id === 'class') || (id === 'super');
  case 6:
      return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
          (id === 'switch') || (id === 'export') || (id === 'import');
  case 7:
      return (id === 'default') || (id === 'finally') || (id === 'extends');
  case 8:
      return (id === 'function') || (id === 'continue') || (id === 'debugger');
  case 10:
      return (id === 'instanceof');
  default:
      return false;
  }
*/


/* Testing API Information: 
  
  KATester.mustHave( code, requirements ) & KATester.mustNotHave( code, requirements ) =====> single and nested structures
    - code => string
    - requirements => array of component objects
      - every object contains: 
        * Type of syntax
        * Frequency of use
        * Nested structure (e.g. for loop containing an if statement)

    * example requirements: 
      var reqs = [
        {
          type: ForStatement,
          nested: {}
        },
        {
          type: WhileStatement,
          nested: {}
        },
        {
          type: IfStatement,
          nested: {}
        }
      ];

      E.g. To access the IfStatement type: 
        var ifStatementNode = reqs[2];
        var ifType = ifStatementNode.type;
        var ifFreq = ifStatementNode.frequency;
        var ifNested = ifStatementNode.nested;

  =======================================================

    Main Structures - TODO: Have time to handle all functionality later on
        WhileStatement
        {
          type: WhileStatement,
          body: {
            type: BlockStatement,
            body: []
          }
        }
        
        ForStatement
        {
          type: ForStatement,
          init: {},
          test: {},
          update: {},
          body: {
            type: BlockStatement,
            body: []
          }
        }

        IfStatement
        {
          type: IfStatement
          consequent: {
            type: BlockStatement,
            body: []
          }
        }

        ExpressionStatement
        {
          type: ExpressionStatement,
          expression: {
            // CallExpression, FunctionExpression, etc.
          }
        }

        VariableDeclaration
        {
          type: VariableDeclaration,
          declarations: [
            type: VariableDeclarator,
            id: {},
            init: {
              type: FunctionExpression,
              id: {},
              body: {
                type: BlockStatement,
                body: []
              },
              generator: boolean,
              expression: boolean
            }
          ]
        }

        FunctionDeclaration
        {
          type: FunctionDeclaration,
          id: {
            type: Identifier,
            name: 
          },
          params: [],
          defaults: [],
          body {
            type: BlockStatement,
            body: []
          },
          generator: boolean,
          expression: boolean
        }

  =======================================================

    ESTree Hierarchy

      Statement
        ExpressionStatement
          type, expression --> type, value

        BlockStatement
          type, body

  KATester.verifyStructure( code, requirements ) =====> nested structures only?
    - code => code
    - requirements => 

    * Need to think about checking these structures
*/
